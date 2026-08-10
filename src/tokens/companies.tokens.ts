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
  secondaryLight: hceColors.primary.green[50], // #b9e881


  headerBg:        '#1A3A6B', // Azul marino institucional — header principal
  tableHeaderBg:   '#2B5BA8', // Azul medio — encabezado de tabla
  rowAlternate:    '#e6ecf6', // Fila alterna de tabla
  hoverBg:         '#EEF2F9', // Fondo hover de fila / botón
  rowPriority:     '#FFF5F5',

  // Superficies
  surfaceBg:      hceColors.primary.blue[100],     // #ffffff
  background:     hceUi.background,  // #f5f7fa
  border:         hceColors.primary.blue[100], // #e6e6e6

  // Textos
  textPrimary:    hceUi.textPrimary,   // #374151
  textSecondary:  hceUi.textSecondary, // #545454
  textOnPrimary:  '#FFFFFF',

  // Interactivo — acento de campos de formulario (borde/label/estado activo).
  // Coincide exactamente con el valor hardcodeado histórico de estos
  // componentes (blue[600], distinto de `primary` = blue[500]).
  interactive:    hceColors.primary.blue[600], // #003d96
  interactiveButton: hceColors.primary.green[600], // #003d96
  updateBannerIconBg: '#0369A1',
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
  primary:        '#36AD55', // Verde Sanna — acento / borde (NO usar con texto blanco encima, ~2.9:1)
  primaryDark:    '#297B41', // Verde Sanna oscuro — apto para superficie sólida + texto blanco (~5.1:1 AA)
  primaryLight:   '#e3eee9e6', // Verde Sanna muy pálido — fondos de acento suaves
  // Sin segundo color de marca: el "secondary" de Sanna es gris neutro
  secondary:      '#7B61FF', // Gris — acento / borde (~4.0:1, no usar con texto blanco encima)
  secondaryDark:  '#3A2799', // Gris oscuro — apto para superficie sólida + texto blanco (~10.3:1 AA)
  secondaryLight: '#F2EFFF', // Gris claro — acentos suaves

  // Superficies — blancos y grises neutros
   headerBg:        '#1a6b29', // verde marino institucional — header principal
  tableHeaderBg:   '#2ba859', // verde medio — encabezado de tabla
  rowAlternate:    '#e6f6e9', // Fila alterna de tabla
  hoverBg:         '#eef9f0', // Fondo hover de fila / botón
  rowPriority:     '#f5fff5',
  surfaceBg:      '#a6beb4', 
  background:     '#F9FAFB',
  border:         '#E5E7EB',

  // Textos
  textPrimary:    '#1F2937',
  textSecondary:  '#6B7280',
  textOnPrimary:  '#FFFFFF',

  // Interactivo — acento de campos de formulario (borde/label/estado activo).
  // Mismo verde oscuro que `primaryDark` (pedido explícito del usuario:
  // reusar, no inventar un cuarto tono de verde).
  interactive:     hceColors.primary.green[700], // Verde Sanna oscuro (= primaryDark)
  interactiveButton: '#7560de', // Verde Sanna oscuro (= primaryDark)
  updateBannerIconBg: '#36AD55',
}

// ── Desconocido — paleta de respaldo para un tenant no registrado ─────────
// NO es una empresa real: es lo que `DSProvider` usa cuando recibe una
// `theme` de tipo string que no existe en `dsThemes` (ej. un typo, o un
// código de tenant que llega desde un sistema externo — el caso típico es
// una app que lee el tenant de una API/config y lo pasa tal cual, sin pasar
// por el union type de `CompanyThemeKey`, así que TS no lo atrapa en
// compilación). Antes ese caso resolvía a una `DsTheme` `undefined` — el
// `<div style>` de `DSProvider` quedaba sin ninguna variable `--ds-*`, así
// que todo lo que dependía de un fallback hardcodeado (ej. `blue[600]`)
// seguía viéndose "bien" por accidente y lo que no tenía fallback quedaba
// roto en silencio. Ver hallazgo de hce-code-reviewer.
//
// Deliberadamente NO es un alias de `csfCompanyColors` (pedido explícito
// del usuario: "ya que es un default no es necesario que sea igual al
// csf") — si lo fuera, un tenant mal configurado se vería idéntico a CSF y
// el problema pasaría desapercibido. En cambio usa una paleta neutra
// (slate + violeta) reconocible como "no es ninguna marca real", para que
// un typo de tenant sea visualmente obvio en QA en vez de silencioso.
//
// Contraste WCAG AA (texto blanco sobre superficie sólida, 4.5:1 mínimo):
// `primaryDark` (#334155, slate-700) ~9.4:1 AA; `secondaryDark` (#4c1d95,
// violet-900) ~10.9:1 AA — igual criterio que csf/sanna (`primary`/`secondary`
// claros quedan para acento/borde, nunca fondo sólido con texto blanco).
export const unknownCompanyColors: HceCompanyColors = {
  // Marca — slate neutro (deliberadamente no-azul, no-verde: no debe
  // confundirse con CSF ni con Sanna)
  primary:        '#64748b', // Slate 500 — acento / borde
  primaryDark:    '#334155', // Slate 700 — superficie sólida + texto blanco (~9.4:1 AA)
  primaryLight:   '#f1f5f9', // Slate 100 — fondo de acento suave
  secondary:      '#7c3aed', // Violeta 600 — acento
  secondaryDark:  '#4c1d95', // Violeta 900 — superficie sólida + texto blanco (~10.9:1 AA)
  secondaryLight: '#ede9fe', // Violeta 100 — acentos suaves

  // Superficies
  headerBg:       '#334155', // Slate 700
  tableHeaderBg:  '#64748B', // Slate 500
  rowAlternate:   '#F1F5F9', // Slate 100
  hoverBg:        '#F8FAFC', // Slate 50
  rowPriority:    '#FFF5F5', // Alerta sutil
  surfaceBg:      '#FFFFFF',
  background:     '#F8FAFC', // Slate 50
  border:         '#E2E8F0', // Slate 200

  // Textos
  textPrimary:    '#1E293B', // Slate 800
  textSecondary:  '#64748B', // Slate 500
  textOnPrimary:  '#FFFFFF',

  // Interactivo — acento de campos de formulario (borde/label/estado activo).
  // Reusa `primaryDark`, mismo criterio que Sanna (no inventar un tercer tono).
  interactive:    '#334155', // Slate 700 (= primaryDark)
  interactiveButton: '#7c3aed', // Violeta 600
  updateBannerIconBg: '#64748b', // Slate 500
}

// ── Mapa de empresas ──────────────────────────────────────────────────────
// Punto único para resolver la paleta de una empresa por clave (ej. en el
// selector de Storybook o en `DSProvider`, ver provider/ThemeProvider.tsx).
// `default`/`csf` apuntan al mismo objeto (ver la nota junto a
// `defaultCompanyColors`). `unknown` no es una empresa real — ver la nota
// junto a `unknownCompanyColors` — pero necesita estar en este mapa (y por
// lo tanto en `CompanyThemeKey`) para que `DSProvider` pueda resolverla por
// clave igual que cualquier tenant real.
export const companyThemes = {
  default: defaultCompanyColors,
  csf:     csfCompanyColors,
  sanna:   sannaCompanyColors,
  unknown: unknownCompanyColors,
} as const satisfies Record<string, HceCompanyColors>

export type CompanyThemeKey = keyof typeof companyThemes
