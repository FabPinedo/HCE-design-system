import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import type { SxProps, Theme } from "@mui/material"
import { GenericRow } from "../../molecules/GenericRow/GenericRow"
import type {  GenericTableColumn } from "../../molecules/GenericCell/GenericCell"
import { hceClinicalColors, hceColors, hceTypography, hceUi } from "../../tokens/hce.tokens"
import { useMemo } from "react"

const SCROLLBAR_WIDTH = 19

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
        overflowX: "auto",
        overflowY: "hidden",
      }}
    >
      <Box
        sx={{
          width: '100%',
          minWidth: tableWrapperWidth,
        }}
      >
        {/* HEADER FIJO */}
        <Box
          sx={{
            width: "100%",
            overflowY: "scroll",
            overflowX: "hidden",
            scrollbarGutter: "stable",
            borderTopLeftRadius: "6px",
            borderTopRightRadius: "6px",

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

        {/* BODY CON SCROLL VERTICAL */}
        <TableContainer
          sx={{
            width: "100%",
            //minWidth: tableWrapperWidth,
            height: maxHeight,
            maxHeight,
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
