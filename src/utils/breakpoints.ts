/**
 * ---------------------------------------------------------
 * File: utils/breakpoints.ts
 * Description:
 * Breakpoints y hook de detección compartidos por todo el design system —
 * misma lógica que usa `Grid.tsx` para sus props responsivos (`size`,
 * `spacing`, etc), extraída acá para que `sx` (vía `SxProps` responsivo)
 * pueda reusarla sin duplicar código ni divergir de los valores de `Grid`.
 *
 * Mismos valores por defecto que el theme de MUI.
 */

import { useEffect, useState } from "react"

export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl"

export const breakpointOrder: Breakpoint[] = ["xs", "sm", "md", "lg", "xl"]

export const breakpointValues: Record<Breakpoint, number> = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
}

export function getBreakpoint(width: number): Breakpoint {
  if (width >= breakpointValues.xl) return "xl"
  if (width >= breakpointValues.lg) return "lg"
  if (width >= breakpointValues.md) return "md"
  if (width >= breakpointValues.sm) return "sm"
  return "xs"
}

/** Breakpoint actual, reactivo a resize. Mismo hook que usa Grid.tsx internamente. */
export function useCurrentBreakpoint(): Breakpoint {
  const [bp, setBp] = useState<Breakpoint>(() =>
    typeof window !== "undefined" ? getBreakpoint(window.innerWidth) : "xs"
  )

  useEffect(() => {
    const handleResize = () => setBp(getBreakpoint(window.innerWidth))
    window.addEventListener("resize", handleResize)
    handleResize()
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return bp
}

/** Un valor de `sx` puede ser literal, o responsivo por breakpoint: { xs: 7, sm: 8 } */
export type ResponsiveValue<T> = T | Partial<Record<Breakpoint, T>>

/**
 * Resuelve un valor responsivo al que corresponde al breakpoint actual,
 * heredando en cascada mobile-first (si defines xs y no sm, sm hereda xs)
 * — mismo comportamiento que Grid.tsx.
 */
export function resolveResponsiveValue<T>(value: ResponsiveValue<T> | undefined, current: Breakpoint): T | undefined {
  if (value === undefined) return undefined
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return value as T
  }
  const obj = value as Partial<Record<Breakpoint, T>>
  const idx = breakpointOrder.indexOf(current)
  for (let i = idx; i >= 0; i--) {
    const bp = breakpointOrder[i]
    if (obj[bp] !== undefined) return obj[bp] as T
  }
  return undefined
}