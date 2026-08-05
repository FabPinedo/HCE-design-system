import {
  forwardRef,
  createElement,
  useEffect,
  useState,
  type ElementType,
  type ReactNode,
  type HTMLAttributes,
  type CSSProperties,
} from "react"
import { sxToStyle } from "../../utils/sx"

type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl"

const breakpointOrder: Breakpoint[] = ["xs", "sm", "md", "lg", "xl"]

// Mismos valores por defecto que el theme de MUI
const breakpointValues: Record<Breakpoint, number> = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
}

type ResponsiveValue<T> = T | Partial<Record<Breakpoint, T>> | T[]
type Direction = "row" | "row-reverse"
type SizeValue = "auto" | boolean | number
type SpacingValue = number | string

/**
 * Grid — reemplazo propio de `Grid` de MUI (v2, API unificada), en CSS/HTML
 * puro sobre flexbox.
 *
 * Mantiene la misma API mínima que este repo consumía de MUI:
 * `container`, `columns`, `columnSpacing`, `direction`, `offset`,
 * `rowSpacing`, `size`, `spacing`, `wrap` — todos aceptan valores
 * responsivos (número plano, array posicional [xs,sm,md,lg,xl] u objeto
 * { xs, sm, md, lg, xl }), igual que MUI. Además: `component` (elemento
 * HTML a renderizar, default "div"), `sx` (subconjunto propio, ver
 * utils/sx.ts), `style`, `className`, `children` y el resto de atributos
 * HTML nativos del elemento (onClick, id, role, aria-*, etc. se reenvían
 * tal cual vía `...rest`).
 *
 * Re-exportado desde el índice público (`export { Grid } from "@hce/design-system"`)
 * en lugar de re-exportar el `Grid` de MUI, para que los consumidores externos
 * (microfrontends) no tengan que cambiar el import.
 */
export interface GridProps extends Omit<HTMLAttributes<HTMLElement>, "color"> {
  component?: ElementType
  children?: ReactNode
  sx?: Record<string, unknown>
  columns?: ResponsiveValue<number>
  columnSpacing?: ResponsiveValue<SpacingValue>
  container?: boolean
  direction?: ResponsiveValue<Direction>
  offset?: ResponsiveValue<SizeValue>
  rowSpacing?: ResponsiveValue<SpacingValue>
  size?: ResponsiveValue<SizeValue>
  spacing?: ResponsiveValue<SpacingValue>
  wrap?: "nowrap" | "wrap-reverse" | "wrap"
}

function getBreakpoint(width: number): Breakpoint {
  if (width >= breakpointValues.xl) return "xl"
  if (width >= breakpointValues.lg) return "lg"
  if (width >= breakpointValues.md) return "md"
  if (width >= breakpointValues.sm) return "sm"
  return "xs"
}

function useCurrentBreakpoint(): Breakpoint {
  const [bp, setBp] = useState<Breakpoint>(() =>
    typeof window !== "undefined" ? getBreakpoint(window.innerWidth) : "xs"
  )

  useEffect(() => {
    const handleResize = () => setBp(getBreakpoint(window.innerWidth))
    window.addEventListener("resize", handleResize)
    handleResize()
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return bp
}

// Resuelve un valor responsivo al valor vigente para el breakpoint actual,
// heredando en cascada mobile-first como hace MUI.
function resolveResponsive<T>(
  value: ResponsiveValue<T> | undefined,
  current: Breakpoint,
  fallback?: T
): T | undefined {
  if (value === undefined) return fallback

  if (Array.isArray(value)) {
    const idx = breakpointOrder.indexOf(current)
    for (let i = idx; i >= 0; i--) {
      if (value[i] !== undefined) return value[i]
    }
    return fallback
  }

  if (typeof value === "object" && value !== null) {
    const obj = value as Partial<Record<Breakpoint, T>>
    const idx = breakpointOrder.indexOf(current)
    for (let i = idx; i >= 0; i--) {
      const bp = breakpointOrder[i]
      if (obj[bp] !== undefined) return obj[bp] as T
    }
    return fallback
  }

  return value as T
}

const SPACING_UNIT = 8 // px, igual a theme.spacing(1) por defecto

function toSpacingPx(value: SpacingValue | undefined): number {
  if (value === undefined) return 0
  if (typeof value === "number") return value * SPACING_UNIT
  const parsed = parseFloat(value)
  return Number.isNaN(parsed) ? 0 : parsed * SPACING_UNIT
}

export const Grid = forwardRef<HTMLElement, GridProps>(function Grid(
  {
    component = "div",
    children,
    style,
    sx,
    className,
    columns = 12,
    columnSpacing,
    container = false,
    direction = "row",
    offset,
    rowSpacing,
    size,
    spacing = 0,
    wrap = "wrap",
    ...rest
  },
  ref
) {
  const bp = useCurrentBreakpoint()

  const currentColumns = resolveResponsive(columns, bp, 12) ?? 12
  const currentDirection = resolveResponsive<Direction>(direction, bp, "row") ?? "row"
  const baseSpacing = resolveResponsive<SpacingValue>(spacing, bp, 0) ?? 0
  const currentColumnSpacing =
    resolveResponsive<SpacingValue>(columnSpacing, bp, baseSpacing) ?? baseSpacing
  const currentRowSpacing =
    resolveResponsive<SpacingValue>(rowSpacing, bp, baseSpacing) ?? baseSpacing

  let computedStyle: CSSProperties

  if (container) {
    const columnGap = toSpacingPx(currentColumnSpacing)
    const rowGap = toSpacingPx(currentRowSpacing)

    computedStyle = {
      display: "flex",
      flexWrap: wrap,
      flexDirection: currentDirection,
      columnGap: `${columnGap}px`,
      rowGap: `${rowGap}px`,
      boxSizing: "border-box",
      width: "100%",
      ...sxToStyle(sx),
      ...style,
    }
  } else {
    const currentSize = resolveResponsive<SizeValue>(size, bp)
    const currentOffset = resolveResponsive<SizeValue>(offset, bp)

    let flexBasis: string | number | undefined
    let maxWidth: string | undefined
    let flexGrow = 0

    if (currentSize === true) {
      flexBasis = 0
      flexGrow = 1
      maxWidth = "100%"
    } else if (currentSize === "auto") {
      flexBasis = "auto"
      maxWidth = "none"
    } else if (typeof currentSize === "number") {
      const percent = (currentSize / currentColumns) * 100
      flexBasis = `${percent}%`
      maxWidth = `${percent}%`
    }

    let marginLeft: string | undefined
    if (typeof currentOffset === "number") {
      marginLeft = `${(currentOffset / currentColumns) * 100}%`
    } else if (currentOffset === "auto") {
      marginLeft = "auto"
    }

    computedStyle = {
      boxSizing: "border-box",
      flexBasis,
      flexGrow,
      maxWidth,
      marginLeft,
      ...sxToStyle(sx),
      ...style,
    }
  }

  const rootClassName = [
    "MuiGrid-root",
    container && "MuiGrid-container",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return createElement(
    component,
    { ref, className: rootClassName, style: computedStyle, ...rest },
    children
  )
})
