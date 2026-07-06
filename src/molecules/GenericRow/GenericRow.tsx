import { TableCell, TableRow } from "@mui/material"
import type { SxProps, Theme } from "@mui/material"
import { GenericCell, type GenericTableColumn } from "../GenericCell/GenericCell"
import { hceClinicalColors } from "../../tokens/hce.tokens"


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
    borderBottom: "1px solid #E2EAF4",
    
    transition: "background-color 0.15s ease",
    cursor: "default",
    tabIndex: -1,
    "&:hover": {
      backgroundColor: isRowRed ? "#FFD1D1" : hceClinicalColors.hoverBg,
    },

    "&.Mui-selected": {
      backgroundColor: baseBg,
    },

    "&.Mui-selected:hover": {
      backgroundColor: isRowRed ? "#FFD1D1" : hceClinicalColors.hoverBg,
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
  return (
    <TableRow sx={rowSx ?? getDefaultRowSx(row, index, rowAlertGetter)}>
      {columns.map((column) => (
        <TableCell
          key={column.key}
          align={column.align}
         sx={{
              width: column.width,
             // minWidth: column.width, 
              maxWidth: column.width,
              borderBottom: "none",
              padding: "0 12px",
              height: 44,
              borderLeft: "1px solid #fff",
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