/**
 * ---------------------------------------------------------
 * Component: DSProvider (Design System Provider)
 * Description:
 * Proveedor principal del Design System encargado de
 * inicializar la configuración global de estilos de
 * Material UI en la aplicación.
 *
 * Ejemplo de uso (plataforma base):
 *
 * <DSProvider>
 *    <App />
 * </DSProvider>
 *
 * Ejemplo de uso (módulo clínico de Emergencia):
 * El theme clínico se aplica anidando un DSProvider con
 * la prop `theme` dentro del DSProvider base del shell —
 * MUI resuelve el theme más interno para ese subárbol.
 *
 * <DSProvider theme={emergencyTheme}>
 *    <EmergencyModule />
 * </DSProvider>
 * ---------------------------------------------------------
 */
import { ThemeProvider } from "@mui/material/styles"
import type { Theme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { theme } from "../theme/theme"
import type { ReactNode } from "react"

/**
 * Props del DSProvider
 */
interface Props {
  children: ReactNode
  /** Theme MUI a aplicar. Por defecto, el theme base del Design System. */
  theme?: Theme
}

/**
 * DSProvider
 *
 * Wrapper que aplica el Theme global del Design System
 * a todos los componentes hijos de la aplicación. Acepta
 * un theme alternativo (p. ej. emergencyTheme) para módulos
 * que requieren una paleta/tipografía propia.
 */
export const DSProvider = ({ children, theme: themeOverride }: Props) => {
  return (
    <ThemeProvider theme={themeOverride ?? theme}>
      {/* CssBaseline aplica un reset de estilos consistente entre navegadores */}
      <CssBaseline />
      {/* Renderiza la aplicación o microfrontend */}
      {children}
    </ThemeProvider>
  )
}
