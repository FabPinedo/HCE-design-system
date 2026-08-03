/**
 * ---------------------------------------------------------
 * File: utils/sx.ts
 * Description:
 * Reemplazo mínimo del motor `sx` de MUI, usado como escape-hatch en los
 * componentes propios del design system (Box, Typography, Button, etc.)
 * ahora que no dependemos de MUI ni Emotion.
 *
 * Soporta el subconjunto de `sx` realmente usado en este repo:
 *  - Propiedades CSS camelCase normales (color, display, gap, fontSize…)
 *    se pasan tal cual a React.CSSProperties.
 *  - Shorthand de espaciado de MUI (p, m, px, py, pt, pb, pl, pr, mx, my,
 *    mt, mb, ml, mr): un número se multiplica por 8 (factor de espaciado
 *    por defecto de MUI, `theme.spacing(1) === 8px` — este design system
 *    nunca configuró un `spacing` custom en theme.ts) y se convierte a
 *    "Npx"; un string (ej. "auto", "1rem") se usa tal cual.
 *  - `bgcolor` → backgroundColor (alias de MUI).
 *
 * NO soporta selectores anidados (`"&:hover"`, `"&.Mui-selected"`, media
 * queries, etc.) — un estilo inline de React no puede expresarlos. Los
 * componentes internos que necesitaban pseudo-estados los migraron a CSS
 * real (archivo .css con :hover/:focus-visible/:active) en vez de sx
 * anidado. Si algún consumidor externo (fuera de este repo) pasaba sx con
 * selectores anidados al escape-hatch público de un componente, ese caso
 * deja de tener efecto — ver nota de paridad en el reporte del refactor.
 */

const SPACING_UNIT = 8

type SxObject = Record<string, unknown>

const SPACING_KEYS: Record<string, string[]> = {
  p:  ["padding"],
  pt: ["paddingTop"],
  pb: ["paddingBottom"],
  pl: ["paddingLeft"],
  pr: ["paddingRight"],
  px: ["paddingLeft", "paddingRight"],
  py: ["paddingTop", "paddingBottom"],
  m:  ["margin"],
  mt: ["marginTop"],
  mb: ["marginBottom"],
  ml: ["marginLeft"],
  mr: ["marginRight"],
  mx: ["marginLeft", "marginRight"],
  my: ["marginTop", "marginBottom"],
}

const ALIAS_KEYS: Record<string, string> = {
  bgcolor: "backgroundColor",
}

function resolveSpacingValue(value: unknown): string | number | undefined {
  if (typeof value === "number") return `${value * SPACING_UNIT}px`
  if (typeof value === "string") return value
  return undefined
}

/**
 * Convierte un objeto `sx` (subconjunto propio, ver arriba) a
 * `React.CSSProperties`. Ignora silenciosamente claves de selector
 * anidado (que empiezan con `&`) — no son representables como inline style.
 */
export function sxToStyle(sx?: SxObject | false | null): React.CSSProperties {
  if (!sx) return {}
  const out: Record<string, unknown> = {}

  for (const [key, value] of Object.entries(sx)) {
    if (value === undefined) continue
    if (key.startsWith("&") || key.startsWith("@media")) continue // selector anidado, no soportado en inline style

    if (key in SPACING_KEYS) {
      const resolved = resolveSpacingValue(value)
      if (resolved !== undefined) {
        for (const cssProp of SPACING_KEYS[key]) out[cssProp] = resolved
      }
      continue
    }

    if (key in ALIAS_KEYS) {
      out[ALIAS_KEYS[key]] = value
      continue
    }

    out[key] = value
  }

  return out as React.CSSProperties
}

/** Combina un `style` explícito con un `sx` (el `style` explícito gana). */
export function mergeSx(style?: React.CSSProperties, sx?: SxObject | false | null): React.CSSProperties {
  return { ...sxToStyle(sx), ...style }
}
