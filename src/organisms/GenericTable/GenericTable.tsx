import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import type { SxProps, Theme } from "@mui/material"
import { GenericRow } from "../../molecules/GenericRow/GenericRow"
import type {  GenericTableColumn } from "../../molecules/GenericCell/GenericCell"
import { hceBorderRadius, hceClinicalColors, hceColors, hceTypography, hceUi } from "../../tokens/hce.tokens"
import { useEffect, useMemo, useRef, useState } from "react"
import { getColumnWidthPercent, getTableWidthNumber } from "./tableWidth.utils"

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

// El header y el body son dos <table> independientes (para poder fijar el
// header mientras el body scrollea). Cuando el body SÍ tiene scrollbar
// vertical real, hay que restarle ese ancho al header para que las columnas
// sigan alineadas entre ambos — pero solo cuando existe, en vez de reservar
// siempre un hueco fijo (eso era lo que dejaba una franja en blanco junto a
// la última columna cuando el body no llegaba a necesitar scroll).
const bodyContainerRef = useRef<HTMLDivElement>(null)
const [bodyScrollbarWidth, setBodyScrollbarWidth] = useState(0)

useEffect(() => {
  const el = bodyContainerRef.current
  if (!el) return

  const measure = () => setBodyScrollbarWidth(el.offsetWidth - el.clientWidth)

  measure()

  const resizeObserver = new ResizeObserver(measure)
  resizeObserver.observe(el)

  return () => resizeObserver.disconnect()
}, [sortedRows.length, maxHeight])

const renderColGroup = () => (
  <colgroup>
    {columns.map((column) => (
      <col
        key={column.key}
        style={{
          width: getColumnWidthPercent(column.width, tableWidth),
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
          minWidth: tableMinWidth,
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
        {/* HEADER FIJO — el paddingRight iguala el ancho real del scrollbar
            del body (medido por ResizeObserver), en vez de reservar siempre
            un hueco fijo aunque el body no llegue a necesitar scroll. */}
        <Box
          sx={{
            width: "100%",
            flexShrink: 0,
            overflow: "hidden",
            boxSizing: "border-box",
            borderTopLeftRadius: TABLE_RADIUS,
            borderTopRightRadius: TABLE_RADIUS,
          }}
          style={{ paddingRight: bodyScrollbarWidth }}
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
                      width: getColumnWidthPercent(column.width, tableWidth),
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
            sigue funcionando como tope opcional (no como altura forzada).
            Sin scrollbarGutter:"stable": el scrollbar solo ocupa espacio
            cuando realmente hay overflow (bodyContainerRef mide ese ancho
            real y el header se ajusta con paddingRight para seguir alineado,
            en vez de reservar siempre un hueco fijo). */}
        <TableContainer
          ref={bodyContainerRef}
          sx={{
            width: "100%",
            flex: 1,
            minHeight: 0,
            maxHeight: maxHeight ?? "none",
            overflowY: "auto",
            overflowX: "hidden",

            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: hceClinicalColors.border,
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "transparent",
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
