import type {
  ComponentType,
  HTMLAttributes,
  KeyboardEvent,
  MouseEvent,
} from "react"
import type { Theme } from "@mui/material"
import type { SystemStyleObject } from "@mui/system"
import { cellRenderers, type CellRenderer } from "./GenericCell.renderers"

export type GenericColumnType =
  | "text"
  | "priority"
  | "box"
  | "patient-name"
  | "clinical-status"
  | "attention-code"
  | "info-button"
  | "waiting-time"
  | "icon"
  | "switch"
  | "tag"

export interface GenericTableColumn<T> {
  key: string
  header: string
  type: GenericColumnType

  field?: string
  valueGetter?: (row: T) => unknown

  colorField?: string
  colorGetter?: (row: T) => string | null | undefined

  width?: number | string
  // El ancho declarado sigue siendo un PESO relativo (se estira/encoge
  // proporcionalmente para llenar el contenedor, como siempre). minWidth /
  // maxWidth clampean el resultado en px para columnas que no deben inflarse
  // más allá de cierto punto (íconos/badges) aunque sobre espacio.
  minWidth?: number
  maxWidth?: number
  align?: "left" | "center" | "right"

  clinicalIcon?: "lab" | "img" | "indication" | "interconsult"

  icon?: ComponentType<any>
  iconSize?: number

  checkedGetter?: (row: T) => boolean
  switchLabelGetter?: (row: T, checked: boolean) => string
  showSwitchLabel?: boolean

  clickable?: boolean
  disabledGetter?: (row: T) => boolean

  onClick?: (row: T, value: unknown) => void

  boldGetter?: (row: T) => boolean

  cellSx?: SystemStyleObject<Theme>
}

interface GenericCellProps<T> {
  row: T
  column: GenericTableColumn<T>
}

const getValueByPath = <T,>(row: T, path?: string) => {
  if (!path) return undefined

  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in acc) {
      return (acc as Record<string, unknown>)[key]
    }

    return undefined
  }, row)
}

export const GenericCell = <T,>({ row, column }: GenericCellProps<T>) => {
  const value = column.valueGetter
    ? column.valueGetter(row)
    : getValueByPath(row, column.field)

  const disabled = column.disabledGetter?.(row) ?? false

  const canClick = Boolean(
    column.clickable &&
      !disabled &&
      column.onClick
  )

  const handleColumnClick = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation()

    if (!canClick) return

    column.onClick?.(row, value)
  }

  const handleColumnKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== "Enter" && event.key !== " ") return

    event.preventDefault()
    event.stopPropagation()

    if (!canClick) return

    column.onClick?.(row, value)
  }

  const clickableA11yProps: HTMLAttributes<HTMLElement> = canClick
    ? {
        role: "button",
        tabIndex: 0,
        onKeyDown: handleColumnKeyDown,
      }
    : {}

  const boldText = column.boldGetter?.(row) ?? false

  const color = column.colorGetter
    ? column.colorGetter(row)
    : column.colorField
      ? getValueByPath(row, column.colorField)
      : undefined

  const render = cellRenderers[column.type] as CellRenderer<T>

  return (
    <>
      {render({
        row,
        column,
        value,
        color: color ? String(color) : undefined,
        disabled,
        canClick,
        boldText,
        handleColumnClick,
        clickableA11yProps,
      })}
    </>
  )
}