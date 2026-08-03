/**
 * ---------------------------------------------------------
 * File: theme/emergencyTheme.ts
 * Description:
 * Tema del módulo Monitor de Emergencia (Axis A) — mismas variables CSS
 * que theme.ts (base), con los valores clínicos que corresponden. Antes
 * era un `Theme` de MUI construido con `createTheme(theme, {...})`
 * (merge profundo); ahora es un merge plano (`{...theme, ...overrides}`)
 * sobre el mismo mapa de variables `--ds-*`.
 *
 * Uso:
 * import { emergencyTheme } from '@hce/design-system'
 *
 * <DSProvider theme={emergencyTheme}>
 *   <EmergencyMonitorApp />
 * </DSProvider>
 *
 * Ver la nota de PENDIENTE en theme.ts: los componentes ya migrados fuera
 * de MUI todavía no leen estas variables (usan sus propios valores hardcodeados
 * del tema base), así que activar este tema hoy no cambia su apariencia —
 * la infraestructura queda lista para conectarlos.
 * ---------------------------------------------------------
 */
import { theme } from "./theme"
import { hceClinicalColors, hceTypography } from "../tokens/hce.tokens"

export const emergencyTheme = {
  ...theme,

  "--ds-font-family": hceTypography.fontFamilyClinical,

  "--ds-color-primary":          hceClinicalColors.tableHeaderBg,
  "--ds-color-primary-dark":     hceClinicalColors.headerBg,
  "--ds-color-primary-light":    hceClinicalColors.hoverBg,
  "--ds-color-secondary":        hceClinicalColors.priority3, // verde activo
  "--ds-color-secondary-dark":   hceClinicalColors.priority3,
  "--ds-color-secondary-contrast": "#FFFFFF",
  "--ds-color-danger":  hceClinicalColors.priority1, // rojo crítico

  "--ds-color-background": hceClinicalColors.surfaceBg,
  "--ds-color-surface":    hceClinicalColors.surfaceBg,
  "--ds-color-divider":    hceClinicalColors.border,
  "--ds-color-text-primary":   hceClinicalColors.textPrimary,
  "--ds-color-text-secondary": hceClinicalColors.textSecondary,

  "--ds-radius": "6px",

  // Tabla clínica (antes MuiTableHead/MuiTableCell/MuiTableRow.styleOverrides
  // del módulo de emergencia, incluido el workaround de especificidad contra
  // la regla `'& .MuiTableCell-root'` del theme base — ya no aplica: acá no
  // hay merge profundo de selectores CSS anidados, cada variable se
  // sobreescribe directo).
  "--ds-table-bg":            hceClinicalColors.surfaceBg,
  "--ds-table-head-bg":       hceClinicalColors.tableHeaderBg,
  "--ds-table-head-color":    hceClinicalColors.textOnHeader,
  "--ds-table-head-weight":   String(hceTypography.weight.bold),
  "--ds-table-head-size":     hceTypography.size.tableHeader,
  "--ds-table-border-color":  "#E2EAF4",
  "--ds-table-cell-padding":  "0 8px",
  "--ds-table-cell-color":    hceClinicalColors.textPrimary,
  "--ds-table-cell-size":     hceTypography.size.tableCell,
  "--ds-table-row-hover-bg":  hceClinicalColors.hoverBg,

  // Tooltip clínico (antes MuiTooltip.styleOverrides)
  "--ds-tooltip-bg":          hceClinicalColors.headerBg,
  "--ds-tooltip-font-size":   "12px",
  "--ds-tooltip-radius":      "4px",

  // Chip clínico (antes MuiChip.styleOverrides)
  "--ds-chip-radius": "4px",
} as const satisfies Record<string, string>
