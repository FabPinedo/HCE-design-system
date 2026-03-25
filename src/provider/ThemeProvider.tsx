/**
 * ---------------------------------------------------------
 * Component: DSProvider (Design System Provider)
 * Description:
 * Proveedor principal del Design System encargado de
 * inicializar la configuración global de estilos de
 * Material UI en la aplicación.
 *
 * Ejemplo de uso:
 *
 * <DSProvider>
 *    <App />
 * </DSProvider>
 * ---------------------------------------------------------
 */
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { theme } from "../theme/theme"
import type { ReactNode } from "react"

/**
 * Props del DSProvider
 */
interface Props {
  children: ReactNode
}

/**
 * DSProvider
 *
 * Wrapper que aplica el Theme global del Design System
 * a todos los componentes hijos de la aplicación.
 */
export const DSProvider = ({ children }: Props) => {
  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline aplica un reset de estilos consistente entre navegadores */}
      <CssBaseline />
      {/* Renderiza la aplicación o microfrontend */}
      {children}
    </ThemeProvider>
  )
}
