/**
 * ---------------------------------------------------------
 * File: theme/theme.ts
 * Description:
 * Tema MUI base del Design System HCE.
 * Consume hceColors y hceUi — paleta oficial Figma.
 * Todos los colores vienen de tokens/hce.tokens.ts.
 * ---------------------------------------------------------
 */
import { createTheme }  from "@mui/material/styles"
import {
  hceColors,
  hceUi,
  hceTypography,
} from "../tokens/hce.tokens"
import {
  baseTypography,
  baseBorderRadius,
} from "../tokens/base.tokens"

export const theme = createTheme({
  palette: {
    primary: {
      main:  hceColors.primary.blue[500],
      dark:  hceColors.primary.blue[700],
      light: hceColors.primary.blue[50],
    },
    secondary: {
      main:         hceColors.primary.green[500],
      light:        hceColors.primary.green[300],
      dark:         hceColors.primary.green[700],
      contrastText: hceUi.surface,
    },
    background: {
      default: hceUi.background,
      paper:   hceUi.surface,
    },
    text: {
      primary:   hceUi.textPrimary,
      secondary: hceUi.textSecondary,
    },
    divider: hceColors.neutro.black[50],
  },

  shape: {
    borderRadius: parseInt(baseBorderRadius.lg),
  },

  typography: {
    fontFamily: hceTypography.fontFamily,
    fontSize:   baseTypography.fontSize,
    h1: {
      fontSize:      baseTypography.size.h1,
      fontWeight:    baseTypography.weight.semibold,
      letterSpacing: baseTypography.letterSpacing.tight,
    },
    h4: {
      fontSize:      baseTypography.size.h4,
      fontWeight:    baseTypography.weight.semibold,
      letterSpacing: baseTypography.letterSpacing.tight,
    },
    button: {
      fontWeight:    baseTypography.weight.medium,
      textTransform: 'none',
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius:  baseBorderRadius.lg,
          textTransform: 'none',
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          backgroundColor: hceUi.surface,
          borderRadius:    baseBorderRadius.xl,
          overflow:        'hidden',
          boxShadow:       '0px 2px 12px rgba(0,0,0,0.05)',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: hceUi.background,
          '& .MuiTableCell-root': {
            color:         hceUi.textSecondary,
            fontWeight:    baseTypography.weight.bold,
            textTransform: 'uppercase',
            fontSize:      baseTypography.size.xs,
            letterSpacing: baseTypography.letterSpacing.wide,
            borderBottom:  `2px solid ${hceColors.neutro.black[50]}`,
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding:     '16px',
          borderColor: hceColors.neutro.black[50],
          color:       hceUi.textPrimary,
          fontSize:    baseTypography.size.sm,
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: hceUi.background,
            transition:      'background-color 0.2s ease',
          },
          '&:last-child td': {
            borderBottom: 0,
          },
        },
      },
    },
    MuiPagination: {
      styleOverrides: {
        root: {
          '& .MuiPagination-ul': { gap: '8px' },
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          borderRadius: baseBorderRadius.lg,
          fontWeight:   baseTypography.weight.medium,
          color:        hceUi.textSecondary,
          '&.Mui-selected': {
            backgroundColor: hceColors.primary.blue[500],
            color:           hceUi.surface,
            '&:hover': { backgroundColor: hceColors.primary.blue[700] },
          },
          '&:hover': { backgroundColor: hceUi.background },
        },
        previousNext: {
          backgroundColor: hceUi.surface,
          border:          `1px solid ${hceColors.neutro.black[50]}`,
          '&:hover':       { backgroundColor: hceUi.background },
        },
      },
    },
  },
})
