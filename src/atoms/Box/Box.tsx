import { forwardRef, createElement, type ElementType, type ReactNode, type HTMLAttributes } from "react"
import { sxToStyle } from "../../utils/sx"

/**
 * Box — reemplazo propio de `Box` de `@mui/material`, en CSS/HTML puro.
 *
 * Mantiene la misma API mínima que este repo consumía de MUI: `component`
 * (elemento HTML a renderizar, default "div"), `sx` (subconjunto propio,
 * ver utils/sx.ts), `style`, `className`, `children` y el resto de atributos
 * HTML nativos del elemento (onClick, id, role, aria-*, etc. se reenvían tal
 * cual vía `...rest`).
 *
 * Re-exportado desde el índice público (`export { Box } from "@hce/design-system"`)
 * en lugar de re-exportar el `Box` de MUI, para que los consumidores externos
 * (microfrontends) no tengan que cambiar el import.
 */
export interface BoxProps extends Omit<HTMLAttributes<HTMLElement>, "color"> {
  component?: ElementType
  children?:  ReactNode
  sx?:        Record<string, unknown>
}

export const Box = forwardRef<HTMLElement, BoxProps>(function Box(
  { component = "div", children, style, sx, ...rest },
  ref,
) {
  return createElement(
    component,
    { ref, style: { ...sxToStyle(sx), ...style }, ...rest },
    children,
  )
})
