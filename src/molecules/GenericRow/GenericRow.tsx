import { TableCell, TableRow } from "@mui/material"
import type { SxProps, Theme } from "@mui/material"
import { useMemo } from "react"
import { GenericCell, type GenericTableColumn } from "../GenericCell/GenericCell"
import { hceClinicalColors, hceColors } from "../../tokens/hce.tokens"
import { getColumnWidthPercent, getTableWidthNumber } from "../../organisms/GenericTable/tableWidth.utils"


interface GenericRowProps<T> {
  row: T
  index: number
  columns: GenericTableColumn<T>[]
  rowSx?: SxProps<Theme>
   /**
   * Define si la fila debe pintarse como alerta.
   * Ejemplo Monitor: row.row_alert_color === "red"
   */
  rowAlertGetter?: (row: T) => boolean

}

const getDefaultRowSx = <T,>(
  row: T,
  index: number,
  rowAlertGetter?: (row: T) => boolean
): SxProps<Theme> => {
  const isRowRed = rowAlertGetter?.(row) ?? false
  const isAlternate = index % 2 === 1


  const baseBg = isRowRed
    ? hceClinicalColors.rowPriority
    : isAlternate
      ? hceClinicalColors.rowAlternate
      : hceClinicalColors.surfaceBg

  return {
    height: 44,
    backgroundColor: baseBg,
    
    
    transition: "background-color 0.15s ease",
    cursor: "default",
   
    "&:hover": {
      backgroundColor: isRowRed ? hceColors.alert.error[100] : hceClinicalColors.hoverBg,
    },

    "&.Mui-selected:hover": {
      backgroundColor: isRowRed ? hceColors.alert.error[100] : hceClinicalColors.hoverBg,
    },

    "&.Mui-selected": {
      backgroundColor: baseBg,
    },

  

    "&:last-child td": {
      borderBottom: "none",
    },
  }
}


export const GenericRow = <T,>({
  row,
  index,
  columns,
  rowSx,
  rowAlertGetter,

}: GenericRowProps<T>) => {
  // Mismo peso relativo (px como ratio -> %) que usa el header, para que
  // las celdas del body queden alineadas con las columnas del header sin
  // importar el ancho real del contenedor.
  const tableWidth = useMemo(() => getTableWidthNumber(columns), [columns])

  return (
    <TableRow sx={rowSx ?? getDefaultRowSx(row, index, rowAlertGetter)}>
      {columns.map((column) => (
        <TableCell
          key={column.key}
          align={column.align}
         sx={{
              width: getColumnWidthPercent(column.width, tableWidth),
              borderBottom: "none",
              padding: "0 12px",
              height: 44,
              borderLeft: `1px solid ${hceColors.neutro.white[100]}`,
              boxSizing: "border-box",
            ...column.cellSx,
          }}
        >
          <GenericCell
            row={row}
            column={column}

          />
        </TableCell>
      ))}
    </TableRow>
  )
}