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
 * '#d32f2f', semántico y nunca tematizado).
 *
 * Reactividad a `DSProvider` (empresa/tenant, ver theme/themes.ts):
 * el variant "primary" SÍ está conectado — `DEFAULT_VARIANT_COLOR.primary`
 * y `HOVER_VARIANT_COLOR.primary` leen `var(--ds-color-primary, ...)` /
 * `var(--ds-color-primary-dark, ...)` con el hex de siempre como fallback,
 * así que fuera de un `DSProvider` (o bajo el tema "csf"/"default") el
 * resultado es idéntico a antes, y bajo otro tenant (ej. "sanna") el botón
 * primary recolorea de verdad.
 *
 * El variant "secondary" también está conectado al tema: usa
 * `--ds-color-secondary` y `--ds-color-secondary-dark`. Así sus estados
 * normal y hover pertenecen siempre a la empresa activa. El variant
 * `danger` nunca se conecta porque su rojo es semántico.
 *
 * `tenantTheme` sigue funcionando igual que antes — es un override explícito
 * por instancia con más prioridad que el `DSProvider` ambiente.
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
 * El Button resuelve el mismo par de tonos que `DSProvider`: `primary` o
 * `secondary` para el estado normal y sus variantes `*Dark` para hover.
 * Así un botón configurado por `tenantTheme` se ve igual que uno bajo el
 * `DSProvider` de esa misma empresa.
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
// `primary` lee `--ds-color-primary` (con el hex de siempre como fallback,
// para paridad exacta fuera de DSProvider o bajo el tema csf); `secondary`
// también lee la paleta activa. `danger` queda fijo por ser semántico.
const DEFAULT_VARIANT_COLOR: Record<string, string> = {
  primary:   `var(--ds-color-primary, ${hceColors.primary.blue[500]})`,
  secondary: `var(--ds-color-secondary, ${hceColors.primary.green[500]})`,
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
  primary:   `var(--ds-color-primary-dark, ${hceColors.primary.blue[700]})`,
  secondary: `var(--ds-color-secondary-dark, ${hceColors.primary.green[700]})`,
  danger:    "#c62828", // theme.palette.error.dark default de MUI
}

/**
 * Resuelve el color base cuando el caller pasa `tenantTheme` en vez de
 * `color`. Debe coincidir con `--ds-color-primary`/`secondary` para mantener
 * paridad con el mismo botón renderizado bajo `DSProvider`.
 *
 * `variant === "danger"` no debe pasar por acá — el rojo de peligro es
 * semántico, no de marca (ver el guard en `effectiveColor` más abajo).
 */
function resolveTenantColor(tenantTheme: HceCompanyColors, variant: Props["variant"]): string {
  return variant === "secondary" ? tenantTheme.secondary : tenantTheme.primary
}

/** Resuelve el tono hover equivalente a las variables `--ds-color-*-dark`. */
function resolveTenantHoverColor(tenantTheme: HceCompanyColors, variant: Props["variant"]): string {
  return variant === "secondary" ? tenantTheme.secondaryDark : tenantTheme.primaryDark
}

/**
 * Aplica opacidad a un color CSS arbitrario devolviendo un string listo para usar
 * en `background`/`box-shadow`. Antes esto se hacía concatenando un sufijo hex de
 * 2 dígitos (`${hex}18`, etc.) directamente sobre el string de color — funcionaba
 * porque `baseColor` siempre era un hex literal ("#0043a5"). Ahora que
 * `DEFAULT_VARIANT_COLOR.primary`/`HOVER_VARIANT_COLOR.primary` pueden ser una
 * referencia `var(--ds-color-primary, #0043a5)`, ese mismo truco produciría CSS
 * inválido (`var(...)40`). `color-mix` funciona igual con cualquier color válido
 * (hex literal o var()), y el mismo porcentaje mezclado con "transparent"
 * reproduce visualmente el viejo hex+alpha (ej. 25.098% ≈ sufijo hex "40").
 */
function withAlpha(color: string, alphaPercent: number): string {
  return `color-mix(in srgb, ${color} ${alphaPercent}%, transparent)`
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
  const tenantHoverColor = tenantTheme && variant !== "danger"
    ? resolveTenantHoverColor(tenantTheme, variant)
    : undefined
  const containedHoverBg = color
    ? baseColor
    : tenantHoverColor ?? (HOVER_VARIANT_COLOR[variant] ?? baseColor)
  const containedHoverFilter = color ? "brightness(0.88)" : "none"

  const cssVars: CSSProperties = {
    "--hce-btn-bg":        baseColor,
    // Antes: `${baseColor}18`/`28`/`40` (sufijo hex de alpha) — dejó de servir
    // en cuanto `baseColor` pasó a poder ser `var(--ds-color-primary, #hex)` en
    // vez de un hex literal (ver `withAlpha` arriba). Los porcentajes reproducen
    // el mismo alpha visual que los sufijos hex de siempre (0x18≈9.412%,
    // 0x28≈15.686%, 0x40≈25.098%).
    "--hce-btn-hover-bg":  muiVariant === "contained" ? undefined : withAlpha(baseColor, 9.412), // ~10% opacidad
    "--hce-btn-active-bg": muiVariant === "contained" ? undefined : withAlpha(baseColor, 15.686),
    "--hce-btn-hover-shadow": muiVariant === "contained" ? `0 4px 12px ${withAlpha(baseColor, 25.098)}` : undefined,
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
