/**
 * ---------------------------------------------------------
 * File: theme/theme.ts
 * Description:
 * Tema BASE del Design System HCE — Axis A ("qué módulo de UI es este":
 * plataforma estándar vs. módulo clínico de Emergencia). Independiente del
 * Axis B (paleta de marca por empresa/tenant, ver tokens/companies.tokens.ts
 * y la prop `tenantTheme` de Button).
 *
 * Antes era un `Theme` de MUI (`createTheme(...)`), consumido vía
 * `ThemeProvider`+`CssBaseline` de MUI. Ahora es un mapa plano de variables
 * CSS que `DSProvider` (provider/ThemeProvider.tsx) inyecta como custom
 * properties sobre el subárbol que envuelve — cualquier componente puede
 * leerlas con `var(--ds-color-primary, fallback)`.
 *
 * PENDIENTE (seguimiento fuera de alcance de este refactor puntual): la
 * mayoría de los componentes ya migrados fuera de MUI usan valores
 * hardcodeados que coinciden con ESTE tema base (ver la nota en
 * atoms/Button/Button.tsx) en vez de `var(--ds-*)`, así que hoy no cambian
 * visualmente si se envuelven en `<DSProvider theme={emergencyTheme}>`.
 * La infraestructura (DSProvider + estos dos temas) ya queda lista para que
 * se conecten uno por uno sin volver a tocar el provider.
 *
 * Consume hceColors y hceUi — paleta oficial Figma.
 * Todos los colores vienen de tokens/hce.tokens.ts.
 * ---------------------------------------------------------
 */
import {
  hceColors,
  hceUi,
  hceTypography,
  hceBorderRadius,
} from "../tokens/hce.tokens"

export const theme = {
  "--ds-font-family": hceTypography.fontFamily,
  "--ds-font-size-base": `${hceTypography.fontSize}px`,

  "--ds-color-primary":        hceColors.primary.blue[500],
  "--ds-color-primary-dark":   hceColors.primary.blue[700],
  "--ds-color-primary-light":  hceColors.primary.blue[50],
  "--ds-color-secondary":        hceColors.primary.green[500],
  "--ds-color-secondary-dark":   hceColors.primary.green[700],
  "--ds-color-secondary-light":  hceColors.primary.green[300],
  "--ds-color-secondary-contrast": hceUi.surface,
  "--ds-color-danger": hceColors.alert.error[500],

  "--ds-color-background": hceUi.background,
  "--ds-color-surface":    hceUi.surface,
  "--ds-color-divider":    hceColors.neutro.black[50],
  "--ds-color-text-primary":   hceUi.textPrimary,
  "--ds-color-text-secondary": hceUi.textSecondary,

  "--ds-radius":       hceBorderRadius.lg,
  "--ds-radius-table": hceBorderRadius.xl,

  // Tabla (antes MuiTable/MuiTableHead/MuiTableCell/MuiTableRow.styleOverrides)
  "--ds-table-bg":            hceUi.surface,
  "--ds-table-shadow":        "0px 2px 12px rgba(0,0,0,0.05)",
  "--ds-table-head-bg":       hceUi.background,
  "--ds-table-head-color":    hceUi.textSecondary,
  "--ds-table-head-weight":   String(hceTypography.weight.bold),
  "--ds-table-head-size":     hceTypography.size.xs,
  "--ds-table-border-color":  hceColors.neutro.black[50],
  "--ds-table-cell-padding":  "16px",
  "--ds-table-cell-color":    hceUi.textPrimary,
  "--ds-table-cell-size":     hceTypography.size.sm,
  "--ds-table-row-hover-bg":  hceUi.background,

  // Paginación (antes MuiPagination/MuiPaginationItem.styleOverrides)
  "--ds-pagination-item-color":     hceUi.textSecondary,
  "--ds-pagination-selected-bg":    hceColors.primary.blue[500],
  "--ds-pagination-selected-color": hceUi.surface,
  "--ds-pagination-selected-hover": hceColors.primary.blue[700],
  "--ds-pagination-hover-bg":       hceUi.background,
  "--ds-pagination-nav-border":     hceColors.neutro.black[50],
} as const satisfies Record<string, string>

export type DsTheme = typeof theme
