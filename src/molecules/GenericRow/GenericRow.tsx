import { Box, TableCell, TableRow } from "@mui/material"
import type { SxProps, Theme } from "@mui/material/styles"

export interface GenericColumn<T> {
  /** Identificador único de la columna */
  key: string

  /** Ancho de la celda */
  width?: number | string

  /** Alineación de contenido */
  align?: "left" | "center" | "right"

  /** Padding personalizado */
  padding?: string | number

  /** Estilos adicionales de la celda */
  cellSx?: SxProps<Theme>

  /** Render personalizado de la celda */
  render: (row: T) => React.ReactNode
}

interface GenericTableRowProps<T> {
  /** Datos de la fila */
  data: T

  /** Columnas que se van a renderizar */
  columns: GenericColumn<T>[]

  /** Si la fila debe pintarse como alternada */
  isAlternate?: boolean

  /** Si la fila está seleccionada */
  selected?: boolean

  /** Si la fila tiene prioridad visual */
  highlighted?: boolean

  /** Colores configurables */
  colors?: {
    selectedBg?: string
    highlightedBg?: string
    alternateBg?: string
    defaultBg?: string
    hoverBg?: string
    selectedBorder?: string
    borderBottom?: string
  }

  /** Estilos extra para el TableRow */
  rowSx?: SxProps<Theme>

  /** Evento click de fila completa */
  onClick?: (row: T) => void
}

const defaultCellSx = {
  borderBottom: "none",
  padding: "0 8px",
  height: 44,
}

export function GenericRow<T>({
  data,
  columns,
  isAlternate = false,
  selected = false,
  highlighted = false,
  colors,
  rowSx,
  onClick,
}: GenericTableRowProps<T>) {
  const baseBg = selected
    ? colors?.selectedBg ?? "#EAF3FF"
    : highlighted
      ? colors?.highlightedBg ?? "#FFF4E5"
      : isAlternate
        ? colors?.alternateBg ?? "#F8FAFC"
        : colors?.defaultBg ?? "#FFFFFF"

  return (
    <TableRow
      selected={selected}
      onClick={() => onClick?.(data)}
      sx={{
        height: 44,
        backgroundColor: baseBg,
        borderBottom: colors?.borderBottom ?? "1px solid #E2EAF4",
        borderLeft: selected
          ? `3px solid ${colors?.selectedBorder ?? "#1976D2"}`
          : "3px solid transparent",
        transition: "background-color 0.15s ease",
        cursor: onClick ? "pointer" : "default",
        "&:hover": {
          backgroundColor: colors?.hoverBg ?? "#EEF6FF",
        },
        "&:last-child td": {
          borderBottom: "none",
        },
        ...rowSx,
      }}
    >
      {columns.map((column) => (
        <TableCell
          key={column.key}
          align={column.align}
          sx={{
            ...defaultCellSx,
            width: column.width,
            textAlign: column.align,
            padding: column.padding ?? defaultCellSx.padding,
            ...column.cellSx,
          }}
        >
          <Box
            sx={{
              display: column.align === "center" ? "flex" : "block",
              justifyContent: column.align === "center" ? "center" : undefined,
            }}
          >
            {column.render(data)}
          </Box>
        </TableCell>
      ))}
    </TableRow>
  )
}