import "./GenericRow.css"
import type { CSSProperties } from "react"
import { useMemo } from "react"
import { GenericCell, type GenericTableColumn } from "../GenericCell/GenericCell"
import { hceClinicalColors, hceColors } from "../../tokens/hce.tokens"
import { getColumnWidthPercent, getTableWidthNumber } from "../../organisms/GenericTable/tableWidth.utils"


interface GenericRowProps<T> {
  row: T
  index: number
  columns: GenericTableColumn<T>[]
  /** Estilo puntual de la fila — objeto plano de CSS (antes SxProps<Theme> de MUI). */
  rowSx?: CSSProperties
   /**
   * Define si la fila debe pintarse como alerta.
   * Ejemplo Monitor: row.row_alert_color === "red"
   */
  rowAlertGetter?: (row: T) => boolean

  /** Hook de pruebas E2E — `data-testid` de la fila (ver GenericTable.getRowTestId). */
  testId?: string
}

/** Resuelve bg base + bg de hover de la fila según alerta/alternancia. */
const getDefaultRowColors = <T,>(
  row: T,
  index: number,
  rowAlertGetter?: (row: T) => boolean
): { bg: string; hoverBg: string } => {
  const isRowRed = rowAlertGetter?.(row) ?? false
  const isAlternate = index % 2 === 1

  const baseBg = isRowRed
    ? hceClinicalColors.rowPriority
    : isAlternate
      ? hceClinicalColors.rowAlternate
      : hceClinicalColors.surfaceBg

  const hoverBg = isRowRed ? hceColors.alert.error[100] : hceClinicalColors.hoverBg

  return { bg: baseBg, hoverBg }
}


export const GenericRow = <T,>({
  row,
  index,
  columns,
  rowSx,
  rowAlertGetter,
  testId,

}: GenericRowProps<T>) => {
  // Mismo peso relativo (px como ratio -> %) que usa el header, para que
  // las celdas del body queden alineadas con las columnas del header sin
  // importar el ancho real del contenedor.
  const tableWidth = useMemo(() => getTableWidthNumber(columns), [columns])
  const { bg, hoverBg } = getDefaultRowColors(row, index, rowAlertGetter)

  return (
    <tr
      className="hce-generic-row"
      data-testid={testId}
      style={{
        "--row-bg":       bg,
        "--row-hover-bg": hoverBg,
        ...rowSx,
      } as CSSProperties}
    >
      {columns.map((column) => (
        <td
          key={column.key}
          className="hce-generic-cell"
          style={{
            width: getColumnWidthPercent(column.width, tableWidth),
            textAlign: column.align,
            ...column.cellSx,
          }}
        >
          <GenericCell
            row={row}
            column={column}

          />
        </td>
      ))}
    </tr>
  )
}
