/**
 * ---------------------------------------------------------
 * Component: DSProvider (Design System Provider)
 * Description:
 * Proveedor principal del Design System — selecciona el tema estructural
 * completo de una empresa/tenant (`default` | `csf` | `sanna`, ver
 * theme/themes.ts y tokens/companies.tokens.ts) y lo inyecta como variables
 * CSS (`--ds-*`) sobre el subárbol que envuelve.
 *
 * Este es el ÚNICO eje de theming del Design System. Antes existían dos ejes
 * independientes — "qué módulo de UI es este" (base vs. `emergencyTheme`,
 * theme/theme.ts + theme/emergencyTheme.ts) y "qué empresa/tenant es este"
 * (tokens/companies.tokens.ts, solo vía la prop `tenantTheme` de Button) —
 * se consolidaron en uno solo: empresa/tenant. `theme/theme.ts` y
 * `theme/emergencyTheme.ts` fueron eliminados.
 *
 * Antes envolvía `ThemeProvider`+`CssBaseline` de MUI. Ahora:
 *  - El wrapper es un <div style={{display:"contents", ...cssVars}}>:
 *    `display:contents` lo hace invisible para el layout (flex/grid de
 *    los hijos se comportan como si el div no existiera), pero las
 *    variables CSS igual cascadean a los descendientes — así se conserva
 *    la capacidad de "envolver una parte del árbol con otro tema" sin
 *    agregar una caja real al DOM visual.
 *  - El reset de estilos que daba CssBaseline (box-sizing:border-box,
 *    margin:0 en body, etc.) se inyecta una sola vez de forma global
 *    (`injectDsBaseline`, idempotente) — no está scopeado al subárbol
 *    porque tampoco lo estaba con MUI (CssBaseline es siempre global,
 *    sin importar dónde se monte el ThemeProvider).
 *
 * Ejemplo de uso (empresa por defecto — Clínica San Felipe):
 *
 * <DSProvider>
 *    <App />
 * </DSProvider>
 *
 * Ejemplo de uso (tenant explícito, por clave):
 *
 * <DSProvider theme="sanna">
 *    <App />
 * </DSProvider>
 *
 * Ejemplo de uso (tenant futuro sin entrada en `dsThemes`, o escenario
 * multi-tenant donde un subárbol pertenece a OTRA empresa que el resto de
 * la app — ej. una pantalla admin que muestra datos de dos redes clínicas
 * lado a lado): se anida un DSProvider con la prop `theme` como objeto
 * `DsTheme` completo dentro del DSProvider del shell — las variables CSS
 * del DSProvider más interno ganan (cascada normal) para ese subárbol.
 *
 * <DSProvider>
 *    <ShellApp>
 *      <DSProvider theme={sannaTheme}>
 *        <SannaTenantPanel />
 *      </DSProvider>
 *    </ShellApp>
 * </DSProvider>
 * ---------------------------------------------------------
 */
import type { CSSProperties, ReactNode } from "react"
import { createContext, useContext, useEffect } from "react"
import { dsThemes, defaultTheme, type DsTheme } from "../theme/themes"
import type { CompanyThemeKey } from "../tokens/companies.tokens"

/**
 * DsThemeContext — implementación interna, NO exportada desde `src/index.ts`
 * (no es API pública del design system).
 *
 * Por qué existe además de las variables CSS `--ds-*` que `DSProvider` ya
 * inyecta vía `style` en su wrapper: esas variables cascadean por el árbol
 * DOM normal, pero varios componentes (`atoms/Menu`, `atoms/Overlay`, y todo
 * lo que se apoya en ellos — HceModal, HceFormModal, DataCardModal,
 * BedAvailabilityDrawer/V2, los dropdowns de Header/HceHeader/HceSidebar,
 * el listbox de MultiSelect) renderizan su contenido con
 * `createPortal(..., document.body)`. Un portal deja su nodo como hijo
 * directo de `document.body` en el árbol DOM real — fuera del subárbol del
 * `<div>` de `DSProvider` — así que las custom properties CSS de ese `style`
 * nunca cascadean hacia adentro del portal, sin importar cuántos
 * componentes lean `var(--ds-color-primary, ...)`.
 *
 * React Context sí resuelve esto: un portal mantiene su posición en el
 * árbol de *React* (para eventos y contexto) aunque escape el árbol DOM, así
 * que `useContext(DsThemeContext)` dentro de contenido portado sigue
 * resolviendo al `DSProvider` ancestro más cercano en JSX — incluyendo el
 * caso de DSProviders anidados con distinto tenant (ver el comentario de
 * `DSProvider` más abajo), que un enfoque más simple basado en copiar las
 * variables a `document.documentElement`/`:root` rompería silenciosamente.
 */
const DsThemeContext = createContext<DsTheme>(defaultTheme)

/**
 * useDsTheme — hook interno para que componentes con portal (Menu, Overlay,
 * y quien más lo necesite) lean el `DsTheme` resuelto del `DSProvider`
 * ancestro más cercano y lo apliquen manualmente como `style` en su propio
 * nodo portado, restaurando así el mismo efecto de cascada que tendrían si
 * no hubieran escapado el árbol DOM.
 */
export function useDsTheme(): DsTheme {
  return useContext(DsThemeContext)
}

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
    body { font-family: ${defaultTheme["--ds-font-family"]}; }
  `
  document.head.appendChild(style)
}

/**
 * Props del DSProvider
 */
interface Props {
  children: ReactNode
  /**
   * Tema a aplicar: la clave de una empresa/tenant ya registrada en
   * `dsThemes` ("default" | "csf" | "sanna") o, para un tenant que todavía
   * no tiene entrada ahí, un objeto `DsTheme` completo armado a mano.
   * Por defecto, `"default"` (Clínica San Felipe).
   */
  theme?: CompanyThemeKey | DsTheme
}

/**
 * DSProvider
 *
 * Wrapper que aplica el tema activo (empresa/tenant) del Design System
 * (como variables CSS) a todos los componentes hijos.
 */
export const DSProvider = ({ children, theme = "default" }: Props) => {
  useEffect(() => {
    injectDsBaseline()
  }, [])

  const resolvedTheme: DsTheme = typeof theme === "string" ? dsThemes[theme] : theme

  return (
    <DsThemeContext.Provider value={resolvedTheme}>
      <div style={{ display: "contents", ...resolvedTheme } as CSSProperties}>
        {children}
      </div>
    </DsThemeContext.Provider>
  )
}
