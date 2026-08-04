import { type ReactNode, type CSSProperties } from "react"
import "./Button.css"
import { hceColors, type HceCompanyColors } from "../../tokens/hce.tokens"

/**
 * Button — átomo del design system HCE
 *
 * ── variant ──────────────────────────────────────────────────────────────────
 *   "primary"   → relleno sólido · usa color primario del tema (default)
 *   "secondary" → relleno sólido · usa color secundario del tema
 *   "outlined"  → borde + texto sin relleno
 *   "ghost"     → solo texto, sin borde ni relleno
 *   "danger"    → relleno sólido · color error/rojo
 *
 * ── color ────────────────────────────────────────────────────────────────────
 *   Acepta cualquier valor CSS válido:
 *     hceColors.primary.blue[600]  →  "#003d96"
 *     "#89c93d"  ·  "rgb(0,61,150)"  ·  "transparent"
 *   Cuando se pasa `color`, sobreescribe el color por defecto del variant:
 *     • outlined  → borde y texto toman ese color
 *     • ghost     → texto toma ese color
 *     • contained (primary/secondary/danger) → fondo toma ese color
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * NOTA DE PARIDAD (migración fuera de MUI): los colores por defecto (sin
 * `color` ni `tenantTheme`) están hardcodeados acá igual que el tema
 * "default" (theme/themes.ts: primary=hceColors.primary.blue[500],
 * secondary=hceColors.primary.green[500], danger=rojo default de MUI
 * '#d32f2f', semántico y nunca tematizado). Antes, este Button heredaba el
 * theme activo vía contexto de MUI (`DSProvider`/`ThemeProvider`). Ese
 * enganche con el tema activo de `DSProvider` (empresa/tenant — ver
 * theme/themes.ts) todavía no está portado — se resuelve conectando este
 * Button a `var(--ds-color-primary, ...)` etc. (paso pendiente del
 * refactor, ver PENDIENTE en theme/themes.ts). Hasta entonces, este Button
 * SIEMPRE muestra estos colores por defecto, sin importar qué tema tenga
 * activo el `DSProvider` que lo envuelve. `tenantTheme` sí funciona igual
 * que antes — es un override explícito por instancia, completamente
 * independiente de `DSProvider`.
 */

interface Props {
  label?:      string
  children?:   ReactNode
  onClick?:    () => void
  fullWidth?:  boolean
  /**
   * Estilo visual del botón.
   * @default "primary"
   */
  variant?:    "primary" | "secondary" | "outlined" | "ghost" | "danger"
  /**
   * Color CSS arbitrario que sobreescribe el color por defecto del variant.
   * Ej: hceColors.primary.blue[600], "#003d96", "rgb(0,61,150)"
   */
  color?:      string
  size?:       "sm" | "md" | "lg"
  type?:       "button" | "submit" | "reset"
  disabled?:   boolean
  style?:      CSSProperties
  /** Icono al inicio — acepta cualquier ReactNode (Lucide, HceIcon, SVG…) */
  startIcon?:  ReactNode
  /** Icono al final — acepta cualquier ReactNode (Lucide, HceIcon, SVG…) */
  endIcon?:    ReactNode
  /** Estilo puntual (equivalente al escape-hatch `sx` de MUI — objeto plano de CSS) */
  sx?:         CSSProperties
  /**
   * Paleta de marca de una empresa/tenant (multiempresa) a aplicar SOLO a
   * esta instancia del botón. Objeto plano de colores con la forma
   * `HceCompanyColors` (primary/primaryDark/secondary/secondaryDark/
   * textOnPrimary/…) — todas las empresas viven en
   * `src/tokens/companies.tokens.ts` (`defaultCompanyColors`,
   * `sannaCompanyColors`, `companyThemes`). NO es un Theme de MUI — este
   * design system no usa `createTheme`/`useTheme()` a nivel de componente,
   * todo se resuelve con tokens planos vía variables CSS por instancia.
   *
   * El Button reusa la misma lógica de `resolveTenantColor` que ya usa el
   * prop `color`: internamente toma `tenantTheme.primaryDark` (o
   * `secondaryDark` si `variant === "secondary"`) — las variantes *Dark, no
   * las claras, porque son las que cumplen contraste WCAG AA con el texto
   * blanco de un botón contained (ver el comentario de accesibilidad en
   * HceCompanyColors, hce.tokens.ts).
   *
   * `variant === "danger"` IGNORA `tenantTheme`: el rojo de peligro es
   * semántico (alerta/destructivo), no de marca — ninguna empresa lo
   * sobreescribe, para no perder ese significado clínico.
   *
   * Prioridad frente a `color`: si el caller pasa ambos, `color` (string CSS
   * explícito) siempre gana — es una intención más específica que la paleta
   * genérica de la empresa. `tenantTheme` solo actúa cuando no hay `color`.
   *
   * Ej: <Button label="Guardar" tenantTheme={sannaCompanyColors} />
   */
  tenantTheme?: HceCompanyColors
}

const SIZE_CLASS: Record<string, string> = {
  sm: "hce-btn--sm",
  md: "hce-btn--md",
  lg: "hce-btn--lg",
}

const VARIANT_CLASS: Record<string, string> = {
  outlined: "hce-btn--outlined",
  ghost:    "hce-btn--text",
}

// Colores semánticos por defecto (sin `color` ni `tenantTheme`) — calcados
// del tema "default" (theme/themes.ts). Ver nota de paridad arriba.
const DEFAULT_VARIANT_COLOR: Record<string, string> = {
  primary:   hceColors.primary.blue[500],
  secondary: hceColors.primary.green[500],
  danger:    "#d32f2f", // rojo default de MUI (theme.ts nunca sobreescribe `error`)
}

// Shade ".dark" curado por variant, para el hover del botón contained
// SOLO cuando no hay `color`/`tenantTheme` explícito — es el mismo shade que
// usaba MUI (`theme.palette.{primary,secondary,error}.dark`) para el hover
// de un botón sin color custom. Cuando sí hay `color`/`tenantTheme` (un CSS
// arbitrario sin shade ".dark" predefinido) seguimos usando
// `filter: brightness(0.88)` como única opción razonable — eso NO cambia.
// Hallazgo de hce-code-reviewer: antes de este fix, el hover usaba el filter
// para TODOS los botones contained (incluido el default), dando un azul
// visiblemente distinto (#003b91) al shade real que mostraba MUI (#003075).
const HOVER_VARIANT_COLOR: Record<string, string> = {
  primary:   hceColors.primary.blue[700],
  secondary: hceColors.primary.green[700],
  danger:    "#c62828", // theme.palette.error.dark default de MUI
}

/**
 * Resuelve el color CSS a aplicar cuando el caller pasa `tenantTheme` en vez
 * de `color`. Usa siempre las variantes *Dark (nunca los tonos "brand"
 * claros): son las que cumplen WCAG AA con texto blanco encima en un botón
 * contained — ver la nota de accesibilidad junto a `HceCompanyColors` en
 * hce.tokens.ts.
 *
 * `variant === "danger"` no debe pasar por acá — el rojo de peligro es
 * semántico, no de marca (ver el guard en `effectiveColor` más abajo).
 */
function resolveTenantColor(tenantTheme: HceCompanyColors, variant: Props["variant"]): string {
  return variant === "secondary" ? tenantTheme.secondaryDark : tenantTheme.primaryDark
}

export const Button = ({
  label,
  children,
  onClick,
  fullWidth  = false,
  variant    = "primary",
  color,
  size       = "md",
  type       = "button",
  disabled   = false,
  style,
  startIcon,
  endIcon,
  sx,
  tenantTheme,
}: Props) => {
  const muiVariant: "contained" | "outlined" | "text" =
    variant === "ghost"    ? "text"
    : variant === "outlined" ? "outlined"
    : "contained"

  // `color` (string CSS explícito) siempre gana sobre `tenantTheme` — es una
  // intención más específica del caller que la paleta genérica de la empresa.
  // `variant === "danger"` ignora `tenantTheme`: el rojo de peligro es
  // semántico (alerta/destructivo), ninguna empresa lo sobreescribe.
  const effectiveColor =
    color ?? (tenantTheme && variant !== "danger" ? resolveTenantColor(tenantTheme, variant) : undefined)

  const baseColor = effectiveColor ?? DEFAULT_VARIANT_COLOR[variant] ?? DEFAULT_VARIANT_COLOR.primary

  // Hover del botón contained: shade ".dark" curado cuando no hay color
  // custom (matching MUI), filter de brillo cuando sí lo hay (ver
  // HOVER_VARIANT_COLOR arriba).
  const containedHoverBg = effectiveColor ? baseColor : (HOVER_VARIANT_COLOR[variant] ?? baseColor)
  const containedHoverFilter = effectiveColor ? "brightness(0.88)" : "none"

  const cssVars: CSSProperties = {
    "--hce-btn-bg":        baseColor,
    "--hce-btn-hover-bg":  muiVariant === "contained" ? undefined : `${baseColor}18`, // ~10% opacidad
    "--hce-btn-active-bg": muiVariant === "contained" ? undefined : `${baseColor}28`,
    "--hce-btn-hover-shadow": muiVariant === "contained" ? `0 4px 12px ${baseColor}40` : undefined,
    "--hce-btn-contained-hover-bg":     muiVariant === "contained" ? containedHoverBg : undefined,
    "--hce-btn-contained-hover-filter": muiVariant === "contained" ? containedHoverFilter : undefined,
  } as CSSProperties

  const className = [
    "hce-btn",
    VARIANT_CLASS[variant] ?? "hce-btn--contained",
    SIZE_CLASS[size] ?? "hce-btn--md",
    fullWidth ? "hce-btn--full-width" : "",
  ].filter(Boolean).join(" ")

  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
      style={{ ...cssVars, ...style, ...sx }}
    >
      {startIcon}
      {children ?? label}
      {endIcon}
    </button>
  )
}
