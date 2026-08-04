/**
 * ---------------------------------------------------------
 * File: theme/themes.ts
 * Description:
 * Temas estructurales completos del Design System — uno por empresa/tenant
 * (default / csf / sanna). Cada uno es un mapa plano de variables CSS
 * `--ds-*` que `DSProvider` (provider/ThemeProvider.tsx) inyecta como custom
 * properties sobre el subárbol que envuelve — cualquier componente puede
 * leerlas con `var(--ds-color-primary, fallback)`.
 *
 * Reemplaza el viejo esquema de DOS ejes de theming independientes:
 *   - Axis A ("qué módulo de UI es este": base vs. módulo de Emergencia) —
 *     vivía en theme/theme.ts + theme/emergencyTheme.ts, ELIMINADOS.
 *   - Axis B ("qué empresa/tenant es este") — vivía solo en
 *     tokens/companies.tokens.ts, consumido únicamente por la prop
 *     `tenantTheme` de atoms/Button/Button.tsx.
 *
 * Ahora hay UN solo eje: empresa/tenant. `tokens/companies.tokens.ts` sigue
 * siendo la única fuente de verdad para la PALETA DE MARCA de cada empresa
 * (`HceCompanyColors` — primary/secondary/superficies/textos); este archivo
 * solo la expande a la forma completa `DsTheme` (que además cubre
 * tipografía, radios, y los bloques de tabla/paginación), reutilizando esos
 * mismos colores en vez de volver a declarar "qué es el azul de CSF" por
 * segunda vez — así `Button.tsx` (vía `tenantTheme`) y `DSProvider` (vía
 * `theme`) leen exactamente la misma fuente de verdad de marca.
 *
 * Lo estructural/neutral que no varía por marca (familia tipográfica,
 * tamaño base, radios, pesos/tamaños de tabla, el shadow de tabla) se
 * mantiene igual entre los 3 temas — solo lo que genuinamente es "color de
 * marca o de superficie de esa empresa" deriva de `HceCompanyColors`.
 *
 * `--ds-color-danger` es semántico (alerta/destructivo), NO de marca —
 * ninguna empresa lo sobreescribe (mismo criterio que ya usa Button.tsx
 * para `variant === "danger"` con `tenantTheme`: el rojo de peligro nunca
 * se tematiza).
 *
 * Uso:
 *   import { DSProvider, csfTheme, sannaTheme } from '@hce/design-system'
 *   <DSProvider theme="sanna"> ... </DSProvider>
 *   <DSProvider theme={sannaTheme}> ... </DSProvider>
 * ---------------------------------------------------------
 */
import {
  hceColors,
  hceTypography,
  hceBorderRadius,
  type HceCompanyColors,
} from "../tokens/hce.tokens"
import { csfCompanyColors, sannaCompanyColors } from "../tokens/companies.tokens"

export interface DsTheme {
  "--ds-font-family": string
  "--ds-font-size-base": string

  "--ds-color-primary": string
  "--ds-color-primary-dark": string
  "--ds-color-primary-light": string
  "--ds-color-secondary": string
  "--ds-color-secondary-dark": string
  "--ds-color-secondary-light": string
  "--ds-color-secondary-contrast": string
  "--ds-color-danger": string
  "--ds-color-interactive": string

  "--ds-color-background": string
  "--ds-color-surface": string
  "--ds-color-divider": string
  "--ds-color-text-primary": string
  "--ds-color-text-secondary": string

  "--ds-radius": string
  "--ds-radius-table": string

  // Tabla (antes MuiTable/MuiTableHead/MuiTableCell/MuiTableRow.styleOverrides)
  "--ds-table-bg": string
  "--ds-table-shadow": string
  "--ds-table-head-bg": string
  "--ds-table-head-color": string
  "--ds-table-head-weight": string
  "--ds-table-head-size": string
  "--ds-table-border-color": string
  "--ds-table-cell-padding": string
  "--ds-table-cell-color": string
  "--ds-table-cell-size": string
  "--ds-table-row-hover-bg": string

  // Paginación (antes MuiPagination/MuiPaginationItem.styleOverrides)
  "--ds-pagination-item-color": string
  "--ds-pagination-selected-bg": string
  "--ds-pagination-selected-color": string
  "--ds-pagination-selected-hover": string
  "--ds-pagination-hover-bg": string
  "--ds-pagination-nav-border": string
}

/**
 * Construye un `DsTheme` completo a partir de la paleta de marca de una
 * empresa (`HceCompanyColors`). Los valores estructurales/neutrales
 * (tipografía, radios, pesos/tamaños de tabla, el shadow de tabla) son
 * fijos — no varían por empresa; solo los colores derivan de `colors`.
 */
function buildDsTheme(colors: HceCompanyColors): DsTheme {
  return {
    "--ds-font-family": hceTypography.fontFamily,
    "--ds-font-size-base": `${hceTypography.fontSize}px`,

    "--ds-color-primary": colors.primary,
    "--ds-color-primary-dark": colors.primaryDark,
    "--ds-color-primary-light": colors.primaryLight,
    "--ds-color-secondary": colors.secondary,
    "--ds-color-secondary-dark": colors.secondaryDark,
    "--ds-color-secondary-light": colors.secondaryLight,
    "--ds-color-secondary-contrast": colors.textOnPrimary,
    "--ds-color-danger": hceColors.alert.error[500], // semántico, nunca de marca
    "--ds-color-interactive": colors.interactive,

    "--ds-color-background": colors.background,
    "--ds-color-surface": colors.surfaceBg,
    "--ds-color-divider": colors.border,
    "--ds-color-text-primary": colors.textPrimary,
    "--ds-color-text-secondary": colors.textSecondary,

    "--ds-radius": hceBorderRadius.lg,
    "--ds-radius-table": hceBorderRadius.xl,

    "--ds-table-bg": colors.surfaceBg,
    "--ds-table-shadow": "0px 2px 12px rgba(0,0,0,0.05)",
    "--ds-table-head-bg": colors.background,
    "--ds-table-head-color": colors.textSecondary,
    "--ds-table-head-weight": String(hceTypography.weight.bold),
    "--ds-table-head-size": hceTypography.size.xs,
    "--ds-table-border-color": colors.border,
    "--ds-table-cell-padding": "16px",
    "--ds-table-cell-color": colors.textPrimary,
    "--ds-table-cell-size": hceTypography.size.sm,
    "--ds-table-row-hover-bg": colors.background,

    "--ds-pagination-item-color": colors.textSecondary,
    "--ds-pagination-selected-bg": colors.primary,
    "--ds-pagination-selected-color": colors.textOnPrimary,
    "--ds-pagination-selected-hover": colors.primaryDark,
    "--ds-pagination-hover-bg": colors.background,
    "--ds-pagination-nav-border": colors.border,
  }
}

// ── Clínica San Felipe (empresa por defecto / fallback de este deployment) ──
export const csfTheme: DsTheme = buildDsTheme(csfCompanyColors)

// `default === csf`: CSF es la empresa por defecto de este deployment (ver
// la nota equivalente en tokens/companies.tokens.ts) — no es un alias
// arbitrario, es el mismo tema bajo el nombre genérico "default".
export const defaultTheme: DsTheme = csfTheme

// ── Sanna ─────────────────────────────────────────────────────────────────
export const sannaTheme: DsTheme = buildDsTheme(sannaCompanyColors)

// ── Mapa de temas por empresa ────────────────────────────────────────────
// Mismas claves que `companyThemes` (tokens/companies.tokens.ts) — un solo
// eje, una sola lista de tenants conocidos.
export const dsThemes = {
  default: defaultTheme,
  csf:     csfTheme,
  sanna:   sannaTheme,
} as const satisfies Record<string, DsTheme>
