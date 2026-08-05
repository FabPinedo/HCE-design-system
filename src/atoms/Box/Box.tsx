import { forwardRef, createElement, type ElementType, type ReactNode, type AllHTMLAttributes } from "react"
import { sxToStyle, type SxProps } from "../../utils/sx"
import { useCurrentBreakpoint } from "../../utils/breakpoints"

/**
 * Box — reemplazo propio de `Box` de MUI, en CSS/HTML puro.
 *
 * Mantiene la misma API mínima que este repo consumía de MUI: `component`
 * (elemento HTML a renderizar, default "div"), `sx` (subconjunto propio,
 * ver utils/sx.ts — incluye soporte de valores responsivos por breakpoint,
 * ej. `px: { xs: 2, sm: 4 }`), `style`, `className`, `children` y el resto
 * de atributos HTML nativos del elemento (onClick, id, role, aria-*, etc.
 * se reenvían tal cual vía `...rest`).
 *
 * Usa `useCurrentBreakpoint()` internamente para que los valores
 * responsivos de `sx` se recalculen solos al redimensionar la ventana — el
 * consumidor no tiene que hacer nada extra para que `sx={{ px: { xs: 2, sm:
 * 4 } }}` reaccione a resize.
 *
 * Re-exportado desde el índice público (`export { Box } from "@hce/design-system"`)
 * en lugar de re-exportar el `Box` de MUI, para que los consumidores externos
 * (microfrontends) no tengan que cambiar el import.
 */
export interface BoxProps extends Omit<AllHTMLAttributes<HTMLElement>, "color"> {
  component?: ElementType
  children?:  ReactNode
  sx?:        SxProps
}

export const Box = forwardRef<HTMLElement, BoxProps>(function Box(
  { component = "div", children, style, sx, ...rest },
  ref,
) {
  const breakpoint = useCurrentBreakpoint()

  return createElement(
    component,
    { ref, style: { ...sxToStyle(sx, breakpoint), ...style }, ...rest },
    children,
  )
})
