/**
 * ---------------------------------------------------------
 * File: tokens/companies.tokens.ts
 * Description:
 * Paletas de marca por empresa/tenant (multiempresa) — ÚNICO eje de theming
 * del Design System. Fuente única para la convención `HceCompanyColors`
 * (definida en hce.tokens.ts), consumida por atoms/Button/Button.tsx (prop
 * `tenantTheme`, override por instancia) y por theme/themes.ts (que expande
 * cada paleta a un `DsTheme` completo para `DSProvider`).
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
 *   import { csfCompanyColors, sannaCompanyColors, companyThemes } from "@hce/design-system"
 *   <Button label="Guardar" tenantTheme={csfCompanyColors} />
 *   <Button label="Guardar" tenantTheme={companyThemes["sanna"]} />
 * ---------------------------------------------------------
 */
import { hceColors, hceUi, type HceCompanyColors } from "./hce.tokens"

// ── Clínica San Felipe (empresa por defecto / fallback de este deployment) ──
// No introduce hex nuevos: reorganiza valores que ya existen en `hceColors`
// (azul/verde institucional) y `hceUi` bajo la forma compartida
// `HceCompanyColors`, para que un componente como atoms/Button/Button.tsx
// (prop `tenantTheme`) pueda tratar a CSF igual que a cualquier otro tenant.
export const csfCompanyColors: HceCompanyColors = {
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

  // Interactivo — acento de campos de formulario (borde/label/estado activo).
  // Coincide exactamente con el valor hardcodeado histórico de estos
  // componentes (blue[600], distinto de `primary` = blue[500]).
  interactive:    hceColors.primary.blue[600], // #003d96
}

// CSF es la empresa por defecto/fallback de este deployment — no un alias
// arbitrario, sino la misma paleta bajo el nombre genérico "default" para
// que el código que no necesita saber el nombre del tenant (ej. el valor
// por defecto de `DSProvider`) tenga un punto de entrada neutro.
export const defaultCompanyColors: HceCompanyColors = csfCompanyColors

// ── Sanna — segundo tenant REAL ───────────────────────────────────────────
// Sanna es una red de salud peruana real (referenciada en otros sistemas
// legacy de este proyecto bajo los códigos de sede `SANNA_SIRI_*`). Color
// corporativo confirmado: verde `#2aad3d` (pedido explícito del usuario,
// 2026-08-03). El resto de la paleta (secondary/superficies/textos) queda a
// criterio de este archivo — grises y blancos, sin introducir un segundo
// color de marca — igual que hace `csfCompanyColors` con verde institucional
// como `secondary` en vez de un tercer color no relacionado.
//
// Contraste WCAG AA (texto blanco sobre superficie sólida, 4.5:1 mínimo):
// `primary` (#2aad3d) por sí solo NO alcanza 4.5:1 (~2.9:1) — igual que
// `csfCompanyColors.primary`, queda para acento/borde, nunca como fondo
// sólido con texto blanco. `primaryDark` es un verde más oscuro derivado
// del mismo hue, sí apto para superficie sólida (~5.1:1 AA).
//
// Uso:
//   import { sannaCompanyColors } from "@hce/design-system"
//   <Button label="Guardar" tenantTheme={sannaCompanyColors} />
export const sannaCompanyColors: HceCompanyColors = {
  // Marca — verde corporativo Sanna
  primary:        '#2aad3d', // Verde Sanna — acento / borde (NO usar con texto blanco encima, ~2.9:1)
  primaryDark:    '#1e7e2e', // Verde Sanna oscuro — apto para superficie sólida + texto blanco (~5.1:1 AA)
  primaryLight:   '#e6f7e9', // Verde Sanna muy pálido — fondos de acento suaves
  // Sin segundo color de marca: el "secondary" de Sanna es gris neutro
  secondary:      '#6b7280', // Gris — acento / borde (~4.0:1, no usar con texto blanco encima)
  secondaryDark:  '#374151', // Gris oscuro — apto para superficie sólida + texto blanco (~10.3:1 AA)
  secondaryLight: '#d1d5db', // Gris claro — acentos suaves

  // Superficies — blancos y grises neutros
  surfaceBg:      '#FFFFFF',
  background:     '#F9FAFB',
  border:         '#E5E7EB',

  // Textos
  textPrimary:    '#1F2937',
  textSecondary:  '#6B7280',
  textOnPrimary:  '#FFFFFF',

  // Interactivo — acento de campos de formulario (borde/label/estado activo).
  // Mismo verde oscuro que `primaryDark` (pedido explícito del usuario:
  // reusar, no inventar un cuarto tono de verde).
  interactive:    '#1e7e2e', // Verde Sanna oscuro (= primaryDark)
}

// ── Mapa de empresas ──────────────────────────────────────────────────────
// Punto único para resolver la paleta de una empresa por clave (ej. en el
// selector de Storybook o en `DSProvider`, ver provider/ThemeProvider.tsx).
// Tres claves visibles/descubribles por pedido explícito, aunque `default`
// y `csf` apunten al mismo objeto (misma paleta, dos nombres — ver la nota
// junto a `defaultCompanyColors`).
export const companyThemes = {
  default: defaultCompanyColors,
  csf:     csfCompanyColors,
  sanna:   sannaCompanyColors,
} as const satisfies Record<string, HceCompanyColors>

export type CompanyThemeKey = keyof typeof companyThemes
