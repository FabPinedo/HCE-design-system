import type { GenericTableColumn } from "../../molecules/GenericCell/GenericCell"

export const getTableWidthNumber = <T,>(columns: GenericTableColumn<T>[]) => {
  return columns.reduce((total, column) => {
    if (typeof column.width === "number") {
      return total + column.width
    }

    return total
  }, 0)
}

// Los anchos numéricos de cada columna (px) se usan solo como PESO relativo,
// no como medida fija: se convierten a porcentaje del ancho total de la
// tabla para que las columnas escalen proporcionalmente con el contenedor
// (como un grid tipo Bootstrap) en vez de dejar un hueco en blanco al final
// cuando la tabla es más ancha que la suma de columnas en px.
export const getColumnWidthPercent = (width: number | string | undefined, totalWidth: number) => {
  if (typeof width === "number" && totalWidth > 0) {
    return `${((width / totalWidth) * 100).toFixed(4)}%`
  }

  return typeof width === "string" ? width : "auto"
}

// Ancho real (px) por columna dado el ancho medido del contenedor.
//
// IMPORTANTE: con table-layout:fixed, el <table> se renderiza con width:100%
// (llena el contenedor) — si la suma de los <col> no llega a ese 100%, el
// navegador redistribuye el sobrante entre TODAS las columnas por spec, sin
// importar que algunas tengan un ancho explícito. Por eso acá no alcanza con
// "calcular y clampear cada columna por separado": hay que garantizar que la
// SUMA de los anchos devueltos sea siempre exactamente igual al ancho
// disponible (para que el navegador no tenga nada que redistribuir).
//
// Columnas con maxWidth definido: se clavan en su ancho exacto (clamp entre
// minWidth/maxWidth), nunca absorben espacio sobrante.
// Columnas SIN maxWidth: son las "libres" — se reparten TODO el espacio
// sobrante entre ellas, proporcional a su peso declarado en px.
//
// Sin medición todavía (availableWidth <= 0) o contenedor más angosto que la
// suma de columnas (hace falta scroll horizontal, no hay sobrante): cada
// columna se queda en su ancho declarado tal cual.
export const getColumnWidths = <T,>(
  columns: GenericTableColumn<T>[],
  totalWidth: number,
  availableWidth: number,
): string[] => {
  const toWidth = (column: GenericTableColumn<T>) => {
    if (typeof column.width !== "number") {
      return typeof column.width === "string" ? column.width : "auto"
    }

    return `${column.width}px`
  }

  if (availableWidth <= 0 || availableWidth <= totalWidth) {
    return columns.map(toWidth)
  }

  const numericColumns = columns.filter((column): column is GenericTableColumn<T> & { width: number } => typeof column.width === "number")
  const constrainedTotal = numericColumns.reduce(
    (sum, column) => sum + (typeof column.maxWidth === "number" ? Math.min(column.width, column.maxWidth) : 0),
    0,
  )
  const freeColumns = numericColumns.filter((column) => typeof column.maxWidth !== "number")
  const freeWeightTotal = freeColumns.reduce((sum, column) => sum + column.width, 0)
  const remainingForFree = availableWidth - constrainedTotal

  return columns.map((column) => {
    if (typeof column.width !== "number") {
      return typeof column.width === "string" ? column.width : "auto"
    }

    if (typeof column.maxWidth === "number") {
      let px = Math.min(column.width, column.maxWidth)
      if (typeof column.minWidth === "number") px = Math.max(px, column.minWidth)

      return `${px}px`
    }

    if (freeWeightTotal <= 0) return `${column.width}px`

    let px = (column.width / freeWeightTotal) * remainingForFree
    if (typeof column.minWidth === "number") px = Math.max(px, column.minWidth)

    return `${px}px`
  })
}
