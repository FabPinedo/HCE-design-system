import { forwardRef, createElement, type ElementType, type ReactNode, type CSSProperties, type HTMLAttributes } from "react"
import { sxToStyle } from "../../utils/sx"
import { hceTypography } from "../../tokens/hce.tokens"

/**
 * Typography — reemplazo propio de `Typography` de MUI, en
 * CSS/HTML puro. Mantiene el subconjunto de API que este repo consumía:
 * `variant` (mapea a tag HTML + estilos base, igual que los defaults de MUI
 * más los overrides de variant que ya tenía el theme MUI original para h1/h4),
 * `component` (fuerza un tag distinto al del variant), `sx`, `style`,
 * `className`, `gutterBottom`, `noWrap`, `children`. Además, calcando el API
 * oficial de MUI: `align`, `classes`, `paragraph` (deprecado en MUI en favor
 * de `component="p"`, pero se mantiene por compatibilidad), `variantMapping`
 * (override del tag HTML que usa cada variant, sin tocar sus estilos).
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

type TypographyAlign = "center" | "inherit" | "justify" | "left" | "right"

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

// Mapeo variant → tag por defecto, igual al que documenta MUI. `variantMapping`
// permite sobreescribirlo puntualmente (por ejemplo, { h1: "div" }) sin tocar
// los estilos de VARIANTS — separa "qué tag semántico" de "qué se ve".
const DEFAULT_VARIANT_MAPPING: Record<TypographyVariant, ElementType> = Object.fromEntries(
  (Object.keys(VARIANTS) as TypographyVariant[]).map((key) => [key, VARIANTS[key].tag])
) as Record<TypographyVariant, ElementType>

export interface TypographyProps extends Omit<HTMLAttributes<HTMLElement>, "color"> {
  variant?:        TypographyVariant
  component?:      ElementType
  children?:       ReactNode
  sx?:             Record<string, unknown>
  align?:          TypographyAlign
  classes?:        Record<string, string>
  gutterBottom?:   boolean
  noWrap?:         boolean
  /** @deprecated Preferir `variant="body1"` + `component="p"`. Se mantiene por paridad con el API de MUI. */
  paragraph?:      boolean
  variantMapping?: Partial<Record<TypographyVariant, ElementType>>
}

export const Typography = forwardRef<HTMLElement, TypographyProps>(function Typography(
  {
    variant = "body1",
    component,
    children,
    style,
    sx,
    className,
    classes,
    align = "inherit",
    gutterBottom = false,
    noWrap = false,
    paragraph = false,
    variantMapping,
    ...rest
  },
  ref,
) {
  const { style: variantStyle } = VARIANTS[variant] ?? VARIANTS.body1

  // Orden de resolución del tag, igual que MUI: `component` explícito gana
  // siempre; si no viene, `paragraph` fuerza "p"; si no, se usa el mapping
  // (custom si se pasó `variantMapping`, si no el default por variant).
  const mappedTag = variantMapping?.[variant] ?? DEFAULT_VARIANT_MAPPING[variant] ?? "p"
  const resolvedTag = component ?? (paragraph ? "p" : mappedTag)

  const computedStyle: CSSProperties = {
    fontFamily: hceTypography.fontFamily,
    margin:     0,
    ...variantStyle,
    ...(align !== "inherit" ? { textAlign: align } : {}),
    ...(gutterBottom ? { marginBottom: "0.35em" } : {}),
    ...(noWrap ? { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const } : {}),
    ...sxToStyle(sx),
    ...style,
  }

  const rootClassName = [
    "MuiTypography-root",
    `MuiTypography-${variant}`,
    align !== "inherit" && `MuiTypography-align${align.charAt(0).toUpperCase()}${align.slice(1)}`,
    gutterBottom && "MuiTypography-gutterBottom",
    noWrap && "MuiTypography-noWrap",
    paragraph && "MuiTypography-paragraph",
    classes?.root,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return createElement(resolvedTag, { ref, className: rootClassName, style: computedStyle, ...rest }, children)
})
