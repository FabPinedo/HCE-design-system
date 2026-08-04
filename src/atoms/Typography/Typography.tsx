import { forwardRef, createElement, type ElementType, type ReactNode, type CSSProperties, type HTMLAttributes } from "react"
import { sxToStyle } from "../../utils/sx"
import { hceTypography } from "../../tokens/hce.tokens"

/**
 * Typography — reemplazo propio de `Typography` de MUI, en
 * CSS/HTML puro. Mantiene el subconjunto de API que este repo consumía:
 * `variant` (mapea a tag HTML + estilos base, igual que los defaults de MUI
 * más los overrides de variant que ya tenía el theme MUI original para h1/h4),
 * `component` (fuerza un tag distinto al del variant), `sx`, `style`,
 * `className`, `gutterBottom`, `noWrap`, `children`.
 *
 * En la práctica casi todos los usos internos de este repo pasan `sx` con
 * fontFamily/fontWeight/color explícitos que sobreescriben los defaults del
 * variant — el variant mayormente decide el tag HTML semántico y el
 * fontSize/lineHeight base cuando el caller no lo especifica.
 */

export type TypographyVariant =
  | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  | "subtitle1" | "subtitle2"
  | "body1" | "body2"
  | "caption" | "overline" | "button" | "inherit"

interface VariantStyle {
  tag:   ElementType
  style: CSSProperties
}

// Defaults estándar de MUI (Material Design) — este repo solo customizó
// h1/h4/button en el theme MUI original, el resto usa los valores de fábrica.
const VARIANTS: Record<TypographyVariant, VariantStyle> = {
  h1: {
    tag: "h1",
    style: {
      fontSize:      hceTypography.size.h1,
      fontWeight:    hceTypography.weight.semibold,
      letterSpacing: hceTypography.letterSpacing.tight,
      lineHeight:    1.167,
    },
  },
  h2: { tag: "h2", style: { fontSize: "2.125rem", fontWeight: 400, lineHeight: 1.2 } },
  h3: { tag: "h3", style: { fontSize: "1.75rem",  fontWeight: 400, lineHeight: 1.167 } },
  h4: {
    tag: "h4",
    style: {
      fontSize:      hceTypography.size.h4,
      fontWeight:    hceTypography.weight.semibold,
      letterSpacing: hceTypography.letterSpacing.tight,
      lineHeight:    1.235,
    },
  },
  h5: { tag: "h5", style: { fontSize: "1.25rem", fontWeight: 400, lineHeight: 1.334 } },
  h6: { tag: "h6", style: { fontSize: "1.25rem", fontWeight: 500, lineHeight: 1.6 } },
  subtitle1: { tag: "h6", style: { fontSize: "1rem",     fontWeight: 400, lineHeight: 1.75 } },
  subtitle2: { tag: "h6", style: { fontSize: "0.875rem", fontWeight: 500, lineHeight: 1.57 } },
  body1:     { tag: "p",  style: { fontSize: "1rem",     fontWeight: 400, lineHeight: 1.5 } },
  body2:     { tag: "p",  style: { fontSize: "0.875rem", fontWeight: 400, lineHeight: 1.43 } },
  caption:   { tag: "span", style: { fontSize: "0.75rem", fontWeight: 400, lineHeight: 1.66 } },
  overline:  { tag: "span", style: { fontSize: "0.75rem", fontWeight: 400, lineHeight: 2.66, textTransform: "uppercase" } },
  button:    { tag: "span", style: { fontSize: "0.875rem", fontWeight: hceTypography.weight.medium, lineHeight: 1.75, textTransform: "none" } },
  inherit:   { tag: "p",  style: {} },
}

export interface TypographyProps extends Omit<HTMLAttributes<HTMLElement>, "color"> {
  variant?:      TypographyVariant
  component?:    ElementType
  children?:     ReactNode
  sx?:           Record<string, unknown>
  gutterBottom?: boolean
  noWrap?:       boolean
}

export const Typography = forwardRef<HTMLElement, TypographyProps>(function Typography(
  { variant = "body1", component, children, style, sx, gutterBottom, noWrap, ...rest },
  ref,
) {
  const { tag, style: variantStyle } = VARIANTS[variant] ?? VARIANTS.body1
  const resolvedTag = component ?? tag

  const computedStyle: CSSProperties = {
    fontFamily: hceTypography.fontFamily,
    margin:     0,
    ...variantStyle,
    ...(gutterBottom ? { marginBottom: "0.35em" } : {}),
    ...(noWrap ? { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const } : {}),
    ...sxToStyle(sx),
    ...style,
  }

  return createElement(resolvedTag, { ref, style: computedStyle, ...rest }, children)
})
