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
 *  - Valores responsivos por breakpoint: CUALQUIER propiedad (no solo
 *    spacing) acepta un objeto `{ xs, sm, md, lg, xl }` en vez de un valor
 *    literal — ej. `px: { xs: 2, sm: 4 }`, `display: { xs: "none", md:
 *    "flex" }`. Se resuelve en runtime según el ancho de pantalla actual
 *    (mismos breakpoints que `Grid.tsx`, ver utils/breakpoints.ts) — NO vía
 *    media queries CSS reales, así que el componente que llama a
 *    `sxToStyle` necesita ser reactivo a resize (usar `useCurrentBreakpoint`
 *    internamente) para que el valor se actualice solo. Los componentes que
 *    exponen `sx` (Box, Typography, etc.) ya hacen esto por vos.
 *
 * NO soporta selectores anidados (`"&:hover"`, `"&.Mui-selected"`, media
 * queries CSS con `"@media"` como key, etc.) — un estilo inline de React no
 * puede expresarlos. Los componentes internos que necesitaban pseudo-estados
 * los migraron a CSS real (archivo .css con :hover/:focus-visible/:active)
 * en vez de sx anidado. Si algún consumidor externo (fuera de este repo)
 * pasaba sx con selectores anidados al escape-hatch público de un
 * componente, ese caso deja de tener efecto — ver nota de paridad en el
 * reporte del refactor.
 */

import type { CSSProperties } from "react"
import { type Breakpoint, type ResponsiveValue, resolveResponsiveValue } from "./breakpoints.ts"

const SPACING_UNIT = 8

// Claves de shorthand de espaciado soportadas — el número que reciben se
// multiplica por SPACING_UNIT (ver arriba). Tipadas explícitamente (no
// `Record<string, unknown>`) para que VS Code autocomplete estas props al
// escribir `sx={{ ... }}` en cualquier componente que use `SxProps`.
export interface SpacingShorthand {
  /** padding (todos los lados). Número = unidades × 8px; string = valor CSS literal. */
  p?: ResponsiveValue<number | string>
  /** padding-top */
  pt?: ResponsiveValue<number | string>
  /** padding-bottom */
  pb?: ResponsiveValue<number | string>
  /** padding-left */
  pl?: ResponsiveValue<number | string>
  /** padding-right */
  pr?: ResponsiveValue<number | string>
  /** padding-left + padding-right */
  px?: ResponsiveValue<number | string>
  /** padding-top + padding-bottom */
  py?: ResponsiveValue<number | string>
  /** margin (todos los lados). Número = unidades × 8px; string = valor CSS literal. */
  m?: ResponsiveValue<number | string>
  /** margin-top */
  mt?: ResponsiveValue<number | string>
  /** margin-bottom */
  mb?: ResponsiveValue<number | string>
  /** margin-left */
  ml?: ResponsiveValue<number | string>
  /** margin-right */
  mr?: ResponsiveValue<number | string>
  /** margin-left + margin-right */
  mx?: ResponsiveValue<number | string>
  /** margin-top + margin-bottom */
  my?: ResponsiveValue<number | string>
}

// Alias de MUI soportados por este motor.
export interface SxAliases {
  /** Alias de `backgroundColor` (igual que en MUI). */
  bgcolor?: ResponsiveValue<CSSProperties["backgroundColor"]>
}

// Todas las propiedades CSS normales, pero cada una también puede ser un
// objeto responsivo `{ xs, sm, md, lg, xl }` en vez de un valor literal.
type ResponsiveCSSProperties = {
  [K in keyof CSSProperties]?: ResponsiveValue<CSSProperties[K]>
}

/**
 * Tipo público del prop `sx` en todos los componentes del design system.
 * Combina:
 *  1. Todas las propiedades CSS normales, cada una con soporte responsivo
 *     (autocomplete real de React.CSSProperties + objeto de breakpoints)
 *  2. El shorthand de spacing propio (p, m, px, py, pt, pb...), también
 *     responsivo
 *  3. Los alias soportados (bgcolor)
 *
 * Usar este tipo en vez de `Record<string, unknown>` es lo que habilita el
 * autocomplete de VS Code al escribir `sx={{ ... }}` — un `Record<string,
 * unknown>` no tiene claves conocidas, así que TypeScript no puede sugerir
 * nada.
 *
 * NOTA: los selectores anidados (`"&:hover"`, media queries con `"@media"`
 * como key, etc.) NO están en este tipo a propósito — no son representables
 * en un inline style, ver el comentario de cabecera del archivo.
 */
export type SxProps = ResponsiveCSSProperties & SpacingShorthand & SxAliases

type SxObject = SxProps

const SPACING_KEYS: Record<keyof SpacingShorthand, (keyof CSSProperties)[]> = {
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

const ALIAS_KEYS: Record<keyof SxAliases, keyof CSSProperties> = {
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
 *
 * @param sx El objeto sx a convertir.
 * @param breakpoint Breakpoint actual (de `useCurrentBreakpoint()`), usado
 *   para resolver valores responsivos `{ xs, sm, md, lg, xl }`. Si se omite,
 *   se asume "xs" — es decir, cualquier valor responsivo cae al más chico
 *   definido (o queda sin resolver si el objeto no tiene "xs").
 */
export function sxToStyle(sx?: SxObject | false | null, breakpoint: Breakpoint = "xs"): CSSProperties {
  if (!sx) return {}
  const out: Record<string, unknown> = {}

  for (const [key, rawValue] of Object.entries(sx)) {
    if (rawValue === undefined) continue
    if (key.startsWith("&") || key.startsWith("@media")) continue // selector anidado, no soportado en inline style

    // Resuelve el valor responsivo ({ xs, sm, ... }) al literal vigente para
    // el breakpoint actual, ANTES de aplicar spacing/alias/paso directo —
    // así `px: { xs: 2, sm: 4 }` y `px: 2` se procesan por el mismo camino.
    const value = resolveResponsiveValue(rawValue as ResponsiveValue<unknown>, breakpoint)
    if (value === undefined) continue

    if (key in SPACING_KEYS) {
      const resolved = resolveSpacingValue(value)
      if (resolved !== undefined) {
        for (const cssProp of SPACING_KEYS[key as keyof SpacingShorthand]) out[cssProp] = resolved
      }
      continue
    }

    if (key in ALIAS_KEYS) {
      out[ALIAS_KEYS[key as keyof SxAliases]] = value
      continue
    }

    out[key] = value
  }

  return out as CSSProperties
}

/** Combina un `style` explícito con un `sx` (el `style` explícito gana). */
export function mergeSx(style?: CSSProperties, sx?: SxObject | false | null, breakpoint: Breakpoint = "xs"): CSSProperties {
  return { ...sxToStyle(sx, breakpoint), ...style }
}