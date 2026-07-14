import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import type { SxProps, Theme } from "@mui/material"
import { GenericRow } from "../../molecules/GenericRow/GenericRow"
import type {  GenericTableColumn } from "../../molecules/GenericCell/GenericCell"
import { hceBorderRadius, hceClinicalColors, hceColors, hceTypography, hceUi } from "../../tokens/hce.tokens"
import { useMemo } from "react"

const SCROLLBAR_WIDTH = 19

// El header (TableCell) se pinta con hceUi.textPrimaryTable — mismo token
// que usa headerCellSx.backgroundColor más abajo. El borde perimetral de la
// tabla debe coincidir exactamente con ese color, no con hceClinicalColors
// .tableHeaderBg / .headerBg (tokens de azul "similares" pero no son el que
// realmente se renderiza en el header de este componente).
const TABLE_BORDER_COLOR = hceUi.textPrimaryTable
const TABLE_RADIUS = hceBorderRadius.md

interface GenericTableProps<T> {
  rows: T[]
  columns: GenericTableColumn<T>[]
  getRowId: (row: T) => string
  maxHeight?: number | string

  getRowSx?: (row: T, index: number) => SxProps<Theme>
    /**
  * Permite marcar una fila como alerta sin amarrar la tabla
   * a un campo específico como row_alert_color.
   */
  rowAlertGetter?: (row: T) => boolean

   /**
   * Permite ordenar las filas sin que la tabla conozca reglas de negocio.
   * Ejemplo Monitor: prioridad ascendente y luego fecha/hora de atención.
   */
  sortComparator?: (a: T, b: T) => number


}


const getColumnWidth = (width?: number | string) => {
  if (typeof width === "number") return `${width}px`
  return width ?? "auto"
}

const   getTableWidthNumber = <T,>(columns: GenericTableColumn<T>[]) => {
  return columns.reduce((total, column) => {
    if (typeof column.width === "number") {
      return total + column.width
    }

    return total
  }, 0)
}
const headerCellSx = {
  height: 44,
  backgroundColor: hceUi.textPrimaryTable,
  color: `${hceColors.neutro.white[100]} !important`,
  //borderBottom: "none",
  borderLeft: "1px solid #ffff",
  
  zIndex: 1,
  fontSize: hceTypography.size.md,
  fontWeight: hceTypography.weight.medium,
  whiteSpace: "wrap",
  fontFamily: hceTypography.fontFamily,
  textTransform: "none !important",


 
}


export const GenericTable = <T,>({
  rows,
  columns,
  getRowId,
  maxHeight,
  getRowSx,
  rowAlertGetter,
  sortComparator,
 
}: GenericTableProps<T>) => {
  const sortedRows = useMemo(() => {
    if (!sortComparator) return rows

    return [...rows].sort(sortComparator)
  }, [rows, sortComparator])

 const tableWidth = useMemo(() => {
  return getTableWidthNumber(columns)
}, [columns])

const tableMinWidth = `${tableWidth}px`
const tableWrapperWidth = `${tableWidth + SCROLLBAR_WIDTH}px`

const renderColGroup = () => (
  <colgroup>
    {columns.map((column) => (
      <col
        key={column.key}
        style={{
          width: getColumnWidth(column.width),
        }}
      />
    ))}
  </colgroup>
)
  
 return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflowX: "auto",
        overflowY: "hidden",
      }}
    >
      <Box
        sx={{
          width: '100%',
          minWidth: tableWrapperWidth,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          minHeight: 0,
          // Borde perimetral de toda la tabla (header + body) del mismo color
          // que el fondo del header, y el único lugar donde se redondean las
          // esquinas EXTERNAS (arriba vía este overflow:hidden, abajo vía el
          // radius propio de la última fila — ver Table del body más abajo).
          border: `1px solid ${TABLE_BORDER_COLOR}`,
          borderRadius: TABLE_RADIUS,
          overflow: "hidden",
        }}
      >
        {/* HEADER FIJO */}
        <Box
          sx={{
            width: "100%",
            flexShrink: 0,
            overflowY: "scroll",
            overflowX: "hidden",
            scrollbarGutter: "stable",
            borderTopLeftRadius: TABLE_RADIUS,
            borderTopRightRadius: TABLE_RADIUS,

            "&::-webkit-scrollbar": {
              width: `${SCROLLBAR_WIDTH}px`,
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "transparent",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "transparent",
            },
          }}
        >
          <Table
            aria-label="generic table header"
            sx={{
              tableLayout: "fixed",
              width: '100%',
              minWidth: tableMinWidth,
              borderCollapse: "separate",
              borderSpacing: 0,
              // El theme (MuiTable.styleOverrides.root) fuerza borderRadius: xl
              // + overflow:hidden en TODO <Table>. Como este componente separa
              // header y body en dos <Table> independientes, ese radius global
              // redondeaba también la esquina INTERNA (abajo del header) — se
              // anula acá; el radius externo (arriba) ya lo da el Box padre.
              borderRadius: 0,
            }}
          >
            {renderColGroup()}

            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.key}
                    align={column.align}
                    sx={{
                      ...headerCellSx,
                      width: column.width,
                      minWidth: column.width,
                      maxWidth: column.width,
                    }}
                  >
                    {column.header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
          </Table>
        </Box>

        {/* BODY CON SCROLL VERTICAL — crece/encoge para llenar el espacio
            disponible del contenedor padre (flex:1 + minHeight:0); maxHeight
            sigue funcionando como tope opcional (no como altura forzada). */}
        <TableContainer
          sx={{
            width: "100%",
            //minWidth: tableWrapperWidth,
            flex: 1,
            minHeight: 0,
            maxHeight: maxHeight ?? "none",
            overflowY: "auto",
            overflowX: "hidden",
            scrollbarGutter: "stable",

            "&::-webkit-scrollbar": {
              width: `${SCROLLBAR_WIDTH}px`,
            },
          }}
        >
          <Table
            aria-label="generic table body"
            sx={{
              tableLayout: "fixed",
              width: '100%',
              minWidth: tableMinWidth,
              borderCollapse: "separate",
              borderSpacing: 0,
              // Igual que en el Table del header: se anula el radius global
              // del theme en la esquina INTERNA (arriba, límite con el
              // header) y se conserva SOLO en las esquinas externas de abajo
              // (última fila), con el mismo radius que el resto de la tabla.
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              borderBottomLeftRadius: TABLE_RADIUS,
              borderBottomRightRadius: TABLE_RADIUS,
            }}
          >
            {renderColGroup()}

            <TableBody>
              {sortedRows.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    sx={{
                      textAlign: "center",
                      height: 120,
                      borderBottom: "none",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "8px",
                        color: hceClinicalColors.textSecondary,
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: hceTypography.fontFamilyClinical,
                          fontSize: "14px",
                          color: hceClinicalColors.textSecondary,
                        }}
                      >
                        No hay pacientes en el Monitor de Emergencia
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                sortedRows.map((row, index) => (
                  <GenericRow
                    key={getRowId(row)}
                    row={row}
                    index={index}
                    columns={columns}
                    rowSx={getRowSx?.(row, index)}
                    rowAlertGetter={rowAlertGetter}
                  />
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  )
  }
