import {
  forwardRef,
  createElement,
  type ElementType,
  type ReactNode,
  type HTMLAttributes,
  type CSSProperties,
} from "react"
import { sxToStyle, type SxProps } from "../../utils/sx"
import {
  type Breakpoint,
  breakpointOrder,
  useCurrentBreakpoint,
  type ResponsiveValue,
  resolveResponsiveValue,
} from "../../utils/breakpoints"

// number en vez de la unión literal 1-12: este componente admite `columns`
// personalizado (p. ej. un grid de 24), así que el tamaño no debe limitarse
// a los 12 valores fijos que asume MUI real.
type GridSize = false | "auto" | true | number
type Direction = "row" | "row-reverse" | "column" | "column-reverse"
type AlignItems = "flex-start" | "center" | "flex-end" | "stretch" | "baseline"
type AlignContent =
  | "stretch"
  | "center"
  | "flex-start"
  | "flex-end"
  | "space-between"
  | "space-around"
type JustifyContent =
  | "flex-start"
  | "center"
  | "flex-end"
  | "space-between"
  | "space-around"
  | "space-evenly"
type Wrap = "nowrap" | "wrap" | "wrap-reverse"
type SpacingStep = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

/**
 * Grid — réplica del `Grid` de MUI v4 (https://v4.mui.com/api/grid/) en
 * CSS/HTML puro sobre flexbox, con la MISMA API pública que documenta MUI:
 * `container`, `item`, `direction`, `spacing`, `wrap`, `alignItems`,
 * `alignContent`, `justifyContent` (+ alias deprecado `justify`),
 * `zeroMinWidth`, `xs`, `sm`, `md`, `lg`, `xl`.
 *
 * EXTENSIÓN propia (no forma parte de la API de MUI v4, se mantiene por
 * compatibilidad con consumidores existentes en el monorepo): `size`,
 * `offset`, `columns`, `columnSpacing`, `rowSpacing`. Si se usan `xs`/`sm`/
 * `md`/`lg`/`xl`, estas tienen prioridad sobre `size`/`offset`.
 *
 * Re-exportado desde el índice público (`export { Grid } from "@hce/design-system"`)
 * en lugar de re-exportar el `Grid` de MUI, para que los consumidores externos
 * (microfrontends) no tengan que cambiar el import.
 */
export interface GridProps extends Omit<HTMLAttributes<HTMLElement>, "color"> {
  component?: ElementType
  children?: ReactNode
  sx?: SxProps
  classes?: Partial<Record<"root" | "container" | "item" | "zeroMinWidth", string>>

  // ---- API oficial de MUI v4 Grid ----
  container?: boolean
  item?: boolean
  alignContent?: AlignContent
  alignItems?: AlignItems
  direction?: Direction
  /** @deprecated usa `justifyContent`, se mantiene por compatibilidad */
  justify?: JustifyContent
  justifyContent?: JustifyContent
  spacing?: SpacingStep
  wrap?: Wrap
  zeroMinWidth?: boolean
  xs?: GridSize
  sm?: GridSize
  md?: GridSize
  lg?: GridSize
  xl?: GridSize

  // ---- Extensión propia (compatibilidad hacia atrás, NO es de MUI v4) ----
  columns?: number
  columnSpacing?: ResponsiveValue<SpacingStep>
  rowSpacing?: ResponsiveValue<SpacingStep>
  size?: ResponsiveValue<GridSize>
  offset?: ResponsiveValue<GridSize | number>
}

// Resuelve xs/sm/md/lg/xl tal como lo hace MUI v4: cada prop define el
// tamaño desde ESE breakpoint hacia arriba (mobile-first), tomando el
// definido más cercano hacia abajo del breakpoint actual.
function resolveGridSize(
  values: Partial<Record<Breakpoint, GridSize | undefined>>,
  current: Breakpoint
): GridSize | undefined {
  const idx = breakpointOrder.indexOf(current)
  for (let i = idx; i >= 0; i--) {
    const bp = breakpointOrder[i]
    if (values[bp] !== undefined) return values[bp]
  }
  return undefined
}

const SPACING_UNIT = 8 // px, igual a theme.spacing(1) por defecto

function toSpacingPx(value: SpacingStep | undefined): number {
  if (!value) return 0
  return value * SPACING_UNIT
}

export const Grid = forwardRef<HTMLElement, GridProps>(function Grid(
  {
    component = "div",
    children,
    style,
    sx,
    className,
    classes,
    columns = 12,
    columnSpacing,
    container = false,
    item,
    direction = "row",
    offset,
    rowSpacing,
    size,
    spacing = 0,
    wrap = "wrap",
    alignItems,
    alignContent,
    justify,
    justifyContent,
    zeroMinWidth = false,
    xs,
    sm,
    md,
    lg,
    xl,
    ...rest
  },
  ref
) {
  const bp = useCurrentBreakpoint()

  // `justify` es el alias deprecado de `justifyContent` (igual que en v4)
  const effectiveJustifyContent = justifyContent ?? justify

  const baseSpacing = spacing ?? 0
  const currentColumnSpacing = resolveResponsiveValue<SpacingStep>(columnSpacing, bp) ?? baseSpacing
  const currentRowSpacing = resolveResponsiveValue<SpacingStep>(rowSpacing, bp) ?? baseSpacing

  const isItem = item ?? !container

  let computedStyle: CSSProperties

  if (container) {
    const columnGap = toSpacingPx(currentColumnSpacing)
    const rowGap = toSpacingPx(currentRowSpacing)

    computedStyle = {
      display: "flex",
      flexWrap: wrap,
      flexDirection: direction,
      alignItems,
      alignContent,
      justifyContent: effectiveJustifyContent,
      columnGap: `${columnGap}px`,
      rowGap: `${rowGap}px`,
      boxSizing: "border-box",
      width: "100%",
      ...sxToStyle(sx, bp),
      ...style,
    }
  } else {
    // Prioridad: props clásicas de v4 (xs/sm/md/lg/xl) sobre la extensión `size`
    const hasClassicBreakpoints =
      xs !== undefined || sm !== undefined || md !== undefined || lg !== undefined || xl !== undefined

    const currentSize = hasClassicBreakpoints
      ? resolveGridSize({ xs, sm, md, lg, xl }, bp)
      : resolveResponsiveValue<GridSize>(size, bp)

    const currentOffset = resolveResponsiveValue<GridSize | number>(offset, bp)

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
      const percent = (currentSize / columns) * 100
      flexBasis = `${percent}%`
      maxWidth = `${percent}%`
    }

    let marginLeft: string | undefined
    if (typeof currentOffset === "number") {
      marginLeft = `${(currentOffset / columns) * 100}%`
    } else if (currentOffset === "auto") {
      marginLeft = "auto"
    }

    computedStyle = {
      boxSizing: "border-box",
      flexBasis,
      flexGrow,
      maxWidth,
      marginLeft,
      ...(zeroMinWidth ? { minWidth: 0 } : null),
      ...sxToStyle(sx, bp),
      ...style,
    }
  }

  const rootClassName = [
    "MuiGrid-root",
    classes?.root,
    container && "MuiGrid-container",
    container && classes?.container,
    isItem && "MuiGrid-item",
    isItem && classes?.item,
    zeroMinWidth && "MuiGrid-zeroMinWidth",
    zeroMinWidth && classes?.zeroMinWidth,
    container && direction !== "row" && `MuiGrid-direction-xs-${direction}`,
    container && wrap !== "wrap" && `MuiGrid-wrap-xs-${wrap}`,
    container && alignItems && `MuiGrid-align-items-xs-${alignItems}`,
    container && alignContent && `MuiGrid-align-content-xs-${alignContent}`,
    container &&
      effectiveJustifyContent &&
      effectiveJustifyContent !== "flex-start" &&
      `MuiGrid-justify-content-xs-${effectiveJustifyContent}`,
    container && baseSpacing > 0 && `MuiGrid-spacing-xs-${baseSpacing}`,
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
