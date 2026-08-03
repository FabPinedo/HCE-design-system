/**
 * ---------------------------------------------------------
 * Component: DSProvider (Design System Provider)
 * Description:
 * Proveedor principal del Design System (Axis A — "qué módulo de UI es
 * este": plataforma estándar vs. módulo clínico de Emergencia).
 * Inyecta el tema activo (theme.ts o emergencyTheme.ts) como variables
 * CSS (`--ds-*`) sobre el subárbol que envuelve.
 *
 * Antes envolvía `ThemeProvider`+`CssBaseline` de MUI. Ahora:
 *  - El wrapper es un <div style={{display:"contents", ...cssVars}}>:
 *    `display:contents` lo hace invisible para el layout (flex/grid de
 *    los hijos se comportan como si el div no existiera), pero las
 *    variables CSS igual cascadean a los descendientes — así se conserva
 *    la capacidad de "envolver una parte del árbol con otro theme" sin
 *    agregar una caja real al DOM visual.
 *  - El reset de estilos que daba CssBaseline (box-sizing:border-box,
 *    margin:0 en body, etc.) se inyecta una sola vez de forma global
 *    (`injectDsBaseline`, idempotente) — no está scopeado al subárbol
 *    porque tampoco lo estaba con MUI (CssBaseline es siempre global,
 *    sin importar dónde se monte el ThemeProvider).
 *
 * Ejemplo de uso (plataforma base):
 *
 * <DSProvider>
 *    <App />
 * </DSProvider>
 *
 * Ejemplo de uso (módulo clínico de Emergencia):
 * El theme clínico se aplica anidando un DSProvider con
 * la prop `theme` dentro del DSProvider base del shell — las variables
 * CSS del DSProvider más interno ganan (cascada normal) para ese subárbol.
 *
 * <DSProvider theme={emergencyTheme}>
 *    <EmergencyModule />
 * </DSProvider>
 * ---------------------------------------------------------
 */
import type { CSSProperties, ReactNode } from "react"
import { useEffect } from "react"
import { theme, type DsTheme } from "../theme/theme"

/**
 * Reset de estilos equivalente al CssBaseline de MUI — box-sizing global +
 * margin:0 en body. Idempotente (se puede llamar desde múltiples
 * DSProvider anidados sin duplicar el <style>).
 */
function injectDsBaseline(): void {
  if (typeof document === "undefined") return
  const id = "hce-ds-baseline"
  if (document.getElementById(id)) return
  const style = document.createElement("style")
  style.id = id
  style.textContent = `
    *, *::before, *::after { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; }
    body { font-family: ${theme["--ds-font-family"]}; }
  `
  document.head.appendChild(style)
}

/**
 * Props del DSProvider
 */
interface Props {
  children: ReactNode
  /** Tema (mapa de variables CSS `--ds-*`) a aplicar. Por defecto, el theme base del Design System. */
  theme?: DsTheme
}

/**
 * DSProvider
 *
 * Wrapper que aplica el tema activo del Design System (como variables CSS)
 * a todos los componentes hijos. Acepta un theme alternativo (p. ej.
 * emergencyTheme) para módulos que requieren una paleta/tipografía propia.
 */
export const DSProvider = ({ children, theme: themeOverride }: Props) => {
  useEffect(() => {
    injectDsBaseline()
  }, [])

  const resolvedTheme = themeOverride ?? theme

  return (
    <div style={{ display: "contents", ...resolvedTheme } as CSSProperties}>
      {children}
    </div>
  )
}
