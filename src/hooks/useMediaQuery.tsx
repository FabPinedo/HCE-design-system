import { useCallback, useMemo, useSyncExternalStore } from "react"

export interface UseMediaQueryOptions {
  /**
   * Como `window.matchMedia()` no existe en el servidor, se devuelve este
   * valor por defecto en el primer render (SSR / antes de hidratar).
   * Default: `false`.
   */
  defaultMatches?: boolean
  /**
   * Implementación propia de `matchMedia`, útil para un iframe con su
   * propio `window`, o para tests (con `css-mediaquery`, por ejemplo).
   * Default: `window.matchMedia`.
   */
  matchMedia?: typeof window.matchMedia
  /**
   * Si `true`, salta la doble pasada de hidratación SSR y usa directamente
   * `matchMedia` desde el primer render (más rápido, pero puede causar un
   * mismatch de hidratación si el server no conoce el media query).
   * Default: `false`.
   */
  noSsr?: boolean
  /**
   * Implementación de `matchMedia` a usar del lado del servidor (donde
   * `window.matchMedia` no existe). Si no se pasa, se usa `defaultMatches`.
   */
  ssrMatchMedia?: (query: string) => { matches: boolean }
}

/**
 * useMediaQuery — reemplazo propio de `useMediaQuery` de MUI, sin depender
 * de `@mui/material` ni de ningún `ThemeProvider`.
 *
 * Mantiene la misma API mínima que este repo consumía de MUI:
 * `useMediaQuery(query, options?) => boolean`, con `options.defaultMatches`,
 * `options.matchMedia`, `options.noSsr`, `options.ssrMatchMedia`.
 *
 * Diferencia a propósito con la versión de MUI: `query` acepta solo
 * `string` (no función `(theme) => string`), porque esa variante depende
 * del `theme.breakpoints` de un `ThemeProvider` de MUI, que este design
 * system no usa. Si necesitas breakpoints con nombre (xs/sm/md/lg/xl),
 * arma la media query vos mismo o usa el breakpoint del propio `Grid`
 * (`breakpointValues` en `Grid.tsx`) como referencia de los valores en px.
 *
 * Implementado con `useSyncExternalStore` (igual que la versión moderna de
 * MUI), que es la forma correcta de suscribirse a una fuente de estado
 * externa al render de React sin caer en condiciones de carrera.
 *
 * Re-exportado desde el índice público
 * (`export { useMediaQuery } from "@hce/design-system"`) en lugar de
 * `@mui/material/useMediaQuery`, para que los consumidores externos
 * (microfrontends) no tengan que cambiar el import.
 */
export function useMediaQuery(query: string, options: UseMediaQueryOptions = {}): boolean {
  const {
    defaultMatches = false,
    matchMedia = typeof window !== "undefined" ? window.matchMedia : undefined,
    noSsr = false,
    ssrMatchMedia,
  } = options

  const getServerSnapshot = useMemo(() => {
    if (noSsr && matchMedia) {
      return () => matchMedia(query).matches
    }
    if (ssrMatchMedia) {
      return () => ssrMatchMedia(query).matches
    }
    return () => defaultMatches
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noSsr, matchMedia, ssrMatchMedia, query, defaultMatches])

  const subscribe = useCallback(
    (callback: () => void) => {
      if (!matchMedia) return () => {}
      const mql = matchMedia(query)
      // addEventListener/removeEventListener no existen en navegadores muy
      // viejos (Safari < 14) — fallback a addListener/removeListener.
      if (typeof mql.addEventListener === "function") {
        mql.addEventListener("change", callback)
        return () => mql.removeEventListener("change", callback)
      }
      mql.addListener(callback)
      return () => {
        mql.removeListener(callback)
      }
    },
    [matchMedia, query]
  )

  const getSnapshot = useCallback(() => {
    if (!matchMedia) return defaultMatches
    return matchMedia(query).matches
  }, [matchMedia, query, defaultMatches])

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

export default useMediaQuery
