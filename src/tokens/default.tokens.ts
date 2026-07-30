/**
 * ---------------------------------------------------------
 * File: tokens/default.tokens.ts
 * Description:
 * Paleta de marca de la empresa POR DEFECTO / fallback (Clínica San Felipe)
 * — primer archivo real de la convención multiempresa `src/tokens/<empresa>.tokens.ts`.
 *
 * Esto NO introduce hex nuevos: reorganiza valores que ya existen en
 * `hceColors` (azul/verde institucional) y `hceUi` bajo la forma compartida
 * `HceCompanyColors` (definida en hce.tokens.ts), para que un componente
 * como atoms/Button/Button.tsx (prop `tenantTheme`) pueda tratar a "la
 * empresa por defecto" igual que a cualquier otro tenant.
 *
 * Los tokens ESTRUCTURALES/compartidos (tipografía, espaciado, sombras,
 * z-index, etc.) NO se duplican ni se mueven aquí — siguen viviendo
 * exclusivamente en hce.tokens.ts.
 *
 * Uso:
 *   import { defaultCompanyColors } from "@hce/design-system"
 *   <Button label="Guardar" tenantTheme={defaultCompanyColors} />
 * ---------------------------------------------------------
 */
import { hceColors, hceUi, type HceCompanyColors } from "./hce.tokens"

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
