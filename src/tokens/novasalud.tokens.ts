/**
 * ---------------------------------------------------------
 * File: tokens/novasalud.tokens.ts
 * Description:
 * Paleta de marca de "NovaSalud" — clínica/empresa FICTICIA distinta de
 * Clínica San Felipe, usada como segundo tenant de prueba de la convención
 * multiempresa `src/tokens/<empresa>.tokens.ts` (ver también default.tokens.ts,
 * la empresa por defecto/fallback).
 *
 * Familia teal/coral: no reutiliza ningún hex ya existente en hceColors ni
 * en hceClinicalColors (que usan azul/verde institucional y lila) — ver
 * gobernanza de tokens (no hardcodear hex sueltos que ya tengan equivalente
 * semántico).
 *
 * Nota de accesibilidad (hallazgo de hce-code-reviewer, 2026-07-30): `primary`
 * y `secondary` (los tonos "brand" claros) NO cumplen WCAG AA 4.5:1 para texto
 * normal sobre fondo blanco/blanco-sobre-color (teal ≈4.31:1, coral ≈2.74:1).
 * Por eso las superficies sólidas con texto blanco encima (p. ej. botones
 * contained, vía atoms/Button/Button.tsx → tenantTheme) deben tomar
 * `primaryDark`/`secondaryDark`, no los tonos claros. `primary`/`secondary`
 * quedan para acentos, bordes e íconos.
 *
 * Uso:
 *   import { novaSaludColors } from "@hce/design-system"
 *   <Button label="Guardar" tenantTheme={novaSaludColors} />
 * ---------------------------------------------------------
 */
import type { HceCompanyColors } from "./hce.tokens"

export const novaSaludColors: HceCompanyColors = {
  // Marca
  primary:        '#00897B', // Teal — acento / borde (NO usar con texto blanco encima, ~4.31:1)
  primaryDark:    '#00695C', // Teal oscuro — apto para superficie sólida + texto blanco (~6.6:1 AA)
  primaryLight:   '#4DB6AC',
  secondary:      '#FF7043', // Coral — acento (NO usar con texto blanco encima, ~2.74:1)
  secondaryDark:  '#BF360C', // Coral oscuro (Material Deep Orange 900) — apto para superficie sólida + texto blanco (~5.6:1 AA)
  secondaryLight: '#FFAB91',

  // Superficies
  surfaceBg:      '#FFFFFF',
  background:     '#F7FAF9',
  border:         '#B2DFDB',

  // Textos
  textPrimary:    '#1B3A36',
  textSecondary:  '#4E6B67',
  textOnPrimary:  '#FFFFFF',
}
