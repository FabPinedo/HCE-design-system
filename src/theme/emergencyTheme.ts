/**
 * ---------------------------------------------------------
 * File: theme/emergencyTheme.ts
 * Description:
 * Tema MUI extendido para el módulo Monitor de Emergencia.
 * Hereda el theme base de @hce/design-system y sobreescribe
 * los tokens con los valores específicos del módulo clínico.
 *
 * Uso:
 * import { emergencyTheme } from '@hce/design-system'
 *
 * <ThemeProvider theme={emergencyTheme}>
 *   <EmergencyMonitorApp />
 * </ThemeProvider>
 * ---------------------------------------------------------
 */
import { createTheme } from "@mui/material/styles"
import { theme } from "./theme"
import { hceClinicalColors, hceTypography } from "../tokens/hce.tokens"

export const emergencyTheme = createTheme(theme, {
  /**
   * Tipografía IBM Plex Sans para el contexto médico/técnico
   */
  typography: {
    fontFamily: hceTypography.fontFamilyClinical,
    h1: {
      fontSize: hceTypography.size.headerTitle,
      fontWeight: hceTypography.weight.bold,
    },
    h2: {
      fontSize: "16px",
      fontWeight: hceTypography.weight.semibold,
    },
    body1: {
      fontSize: hceTypography.size.tableCell,
      fontWeight: hceTypography.weight.regular,
      color: hceClinicalColors.textPrimary,
    },
    body2: {
      fontSize: hceTypography.size.tableCell,
      fontWeight: hceTypography.weight.regular,
      color: hceClinicalColors.textSecondary,
    },
    caption: {
      fontSize: hceTypography.size.tableHeader,
      fontWeight: hceTypography.weight.bold,
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },
  },

  /**
   * Paleta de colores del módulo de emergencia
   */
  palette: {
    primary: {
      main:          hceClinicalColors.tableHeaderBg,
      dark:          hceClinicalColors.headerBg,
      light:         hceClinicalColors.hoverBg,
      contrastText:  "#FFFFFF",
    },
    secondary: {
      main:          hceClinicalColors.priority3,  // verde activo
      contrastText:  "#FFFFFF",
    },
    error: {
      main:  hceClinicalColors.priority1,  // rojo crítico
    },
    warning: {
      main:  hceClinicalColors.priority2,  // naranja urgente
    },
    success: {
      main:  hceClinicalColors.priority3,  // verde moderado
    },
    info: {
      main:  hceClinicalColors.priority4,  // azul leve
    },
    background: {
      default: hceClinicalColors.surfaceBg,
      paper:   hceClinicalColors.surfaceBg,
    },
    divider: hceClinicalColors.border,
    text: {
      primary:   hceClinicalColors.textPrimary,
      secondary: hceClinicalColors.textSecondary,
    },
  },

  /**
   * Bordes redondeados consistentes
   */
  shape: {
    borderRadius: 6,
  },

  /**
   * Overrides de componentes MUI para el módulo de emergencia
   */
  components: {
    // `theme.ts` (base) fuerza el color de texto en las celdas del header
    // mediante un selector anidado de alta especificidad dentro de
    // MuiTableHead ('& .MuiTableCell-root'). emergencyTheme hereda esa
    // regla vía createTheme(theme, {...}) — debe neutralizarla aquí,
    // porque un override en MuiTableCell.styleOverrides.head no le gana
    // en especificidad CSS.
    MuiTableHead: {
      styleOverrides: {
        root: {
          "& .MuiTableCell-root": {
            color:         hceClinicalColors.textOnHeader,
            fontWeight:    hceTypography.weight.bold,
            textTransform: "uppercase",
            fontSize:      hceTypography.size.tableHeader,
            letterSpacing: "0.5px",
            borderBottom:  "none",
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontFamily: hceTypography.fontFamilyClinical,
          fontSize:   hceTypography.size.tableCell,
          color:      hceClinicalColors.textPrimary,
          borderBottom: "none",
          padding: "0 8px",
          height: "44px",
        },
        head: {
          backgroundColor: hceClinicalColors.tableHeaderBg,
          color:           hceClinicalColors.textOnHeader,
          fontSize:        hceTypography.size.tableHeader,
          fontWeight:      hceTypography.weight.bold,
          textTransform:   "uppercase",
          letterSpacing:   "0.5px",
          height:          "40px",
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          height: "44px",
          borderBottom: `1px solid #E2EAF4`,
          transition: "background-color 0.15s ease",
          "&:hover": {
            backgroundColor: hceClinicalColors.hoverBg,
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontFamily:  hceTypography.fontFamilyClinical,
          fontSize:    "12px",
          fontWeight:  hceTypography.weight.medium,
          backgroundColor: hceClinicalColors.headerBg,
          borderRadius: "4px",
          padding: "4px 8px",
        },
        arrow: {
          color: hceClinicalColors.headerBg,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: hceTypography.fontFamilyClinical,
          borderRadius: "4px",
        },
      },
    },
  },
})
