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
