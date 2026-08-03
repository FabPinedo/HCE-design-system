/**
 * ---------------------------------------------------------
 * File: tokens/companies.tokens.ts
 * Description:
 * Paletas de marca por empresa/tenant (multiempresa). Fuente única para la
 * convención `HceCompanyColors` (definida en hce.tokens.ts) que consume,
 * por ejemplo, atoms/Button/Button.tsx vía la prop `tenantTheme`.
 *
 * Antes existían como archivos separados (`default.tokens.ts`,
 * `novasalud.tokens.ts`); se consolidan aquí en un único archivo por
 * pedido explícito — sigue habiendo UNA paleta por empresa, solo cambia
 * dónde viven.
 *
 * Los tokens ESTRUCTURALES/compartidos (tipografía, espaciado, sombras,
 * z-index, etc.) NO se duplican ni se mueven aquí — siguen viviendo
 * exclusivamente en hce.tokens.ts (ver la nota de gobernanza junto a
 * `HceCompanyColors` sobre el incidente `ds_token_unification_break`).
 *
 * Uso:
 *   import { defaultCompanyColors, sannaCompanyColors, companyThemes } from "@hce/design-system"
 *   <Button label="Guardar" tenantTheme={defaultCompanyColors} />
 *   <Button label="Guardar" tenantTheme={companyThemes["sanna"]} />
 * ---------------------------------------------------------
 */
import { hceColors, hceUi, type HceCompanyColors } from "./hce.tokens"

// ── Empresa por defecto / fallback (Clínica San Felipe) ─────────────────────
// No introduce hex nuevos: reorganiza valores que ya existen en `hceColors`
// (azul/verde institucional) y `hceUi` bajo la forma compartida
// `HceCompanyColors`, para que un componente como atoms/Button/Button.tsx
// (prop `tenantTheme`) pueda tratar a "la empresa por defecto" igual que a
// cualquier otro tenant.
export const defaultCompanyColors: HceCompanyColors = {
  // Marca — azul/verde institucional de Clínica San Felipe (hceColors)
  primary:        hceColors.primary.blue[500],  // #0043a5 — acento / borde
  primaryDark:    hceColors.primary.blue[700],  // #003075 — superficie sólida + texto blanco (~12.5:1 AA)
  primaryLight:   hceColors.primary.blue[50],   // #e6ecf6
  secondary:      hceColors.primary.green[500], // #96dd43 — acento
  secondaryDark:  hceColors.primary.green[800], // #537a25 — superficie sólida + texto blanco (~5.0:1 AA)
  secondaryLight: hceColors.primary.green[300], // #b9e881

  // Superficies
  surfaceBg:      hceUi.surface,     // #ffffff
  background:     hceUi.background,  // #f5f7fa
  border:         hceColors.neutro.black[50], // #e6e6e6

  // Textos
  textPrimary:    hceUi.textPrimary,   // #374151
  textSecondary:  hceUi.textSecondary, // #545454
  textOnPrimary:  '#FFFFFF',
}

// ── Sanna — segundo tenant REAL, paleta placeholder ──────────────────────────
// Sanna es una red de salud peruana real (referenciada en otros sistemas
// legacy de este proyecto bajo los códigos de sede `SANNA_SIRI_*`), pero su
// paleta de marca real todavía no fue entregada por el equipo de diseño. Los
// valores de acá son un placeholder que conserva el análisis de contraste
// WCAG AA ya hecho (hallazgo de hce-code-reviewer, 2026-07-30): `primary` y
// `secondary` (los tonos "brand" claros) NO cumplen 4.5:1 para texto normal
// sobre fondo blanco/blanco-sobre-color (teal ≈4.31:1, coral ≈2.74:1). Por
// eso las superficies sólidas con texto blanco encima (p. ej. botones
// contained, vía atoms/Button/Button.tsx → tenantTheme) deben tomar
// `primaryDark`/`secondaryDark` (teal dark ≈6.6:1 AA, coral dark ≈5.6:1 AA),
// no los tonos claros. `primary`/`secondary` quedan para acentos, bordes e
// íconos.
//
// TODO: reemplazar con la paleta de marca real de Sanna cuando el equipo de
// diseño la entregue.
//
// Uso:
//   import { sannaCompanyColors } from "@hce/design-system"
//   <Button label="Guardar" tenantTheme={sannaCompanyColors} />
export const sannaCompanyColors: HceCompanyColors = {
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

// ── Mapa de empresas ──────────────────────────────────────────────────────
// Punto único para resolver la paleta de una empresa por clave (ej. en un
// selector de Storybook o en un futuro DSProvider-por-tenant).
export const companyThemes = {
  default: defaultCompanyColors,
  sanna:   sannaCompanyColors,
} as const satisfies Record<string, HceCompanyColors>

export type CompanyThemeKey = keyof typeof companyThemes
