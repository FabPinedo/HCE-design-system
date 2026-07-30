import { type ReactNode } from "react"
import MuiButton          from "@mui/material/Button"
import { hceTransition, type HceCompanyColors } from "../../tokens/hce.tokens"

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
  style?:      React.CSSProperties
  /** Icono al inicio — acepta cualquier ReactNode (Lucide, HceIcon, SVG…) */
  startIcon?:  ReactNode
  /** Icono al final — acepta cualquier ReactNode (Lucide, HceIcon, SVG…) */
  endIcon?:    ReactNode
  /** sx de MUI para overrides puntuales */
  sx?:         object
  /**
   * Paleta de marca de una empresa/tenant (multiempresa) a aplicar SOLO a
   * esta instancia del botón. Objeto plano de colores con la forma
   * `HceCompanyColors` (primary/primaryDark/secondary/secondaryDark/
   * textOnPrimary/…) — cada empresa vive en su propio archivo
   * `src/tokens/<empresa>.tokens.ts` (ver tokens/default.tokens.ts,
   * tokens/novasalud.tokens.ts). NO es un Theme de MUI — este design system
   * no usa `createTheme`/`useTheme()` a nivel de componente, todo se
   * resuelve con tokens planos vía `sx`/`style`.
   *
   * El Button reusa la misma lógica de `buildColorSx` que ya usa el prop
   * `color`: internamente toma `tenantTheme.primaryDark` (o `secondaryDark`
   * si `variant === "secondary"`) — las variantes *Dark, no las claras,
   * porque son las que cumplen contraste WCAG AA con el texto blanco de un
   * botón contained (ver el comentario de accesibilidad en HceCompanyColors,
   * hce.tokens.ts).
   *
   * `variant === "danger"` IGNORA `tenantTheme`: el rojo de peligro es
   * semántico (alerta/destructivo), no de marca — ninguna empresa lo
   * sobreescribe, para no perder ese significado clínico.
   *
   * Prioridad frente a `color`: si el caller pasa ambos, `color` (string CSS
   * explícito) siempre gana — es una intención más específica que la paleta
   * genérica de la empresa. `tenantTheme` solo actúa cuando no hay `color`.
   *
   * Ej: <Button label="Guardar" tenantTheme={novaSaludColors} />
   */
  tenantTheme?: HceCompanyColors
}

const SIZE_MAP: Record<string, "small" | "medium" | "large"> = {
  sm: "small",
  md: "medium",
  lg: "large",
}

/** Genera el bloque sx para aplicar un color CSS arbitrario según el tipo de botón */
function buildColorSx(color: string, muiVariant: "contained" | "outlined" | "text"): object {
  switch (muiVariant) {
    case "outlined":
      return {
        borderColor: color,
        color,
        transition: `border-color ${hceTransition.fast}, background-color ${hceTransition.fast}, transform ${hceTransition.fast}`,
        "&:hover": {
          borderColor:     color,
          backgroundColor: `${color}18`,  // ~10 % opacidad
          transform:       "translateY(-1px)",
          boxShadow:       `0 4px 12px ${color}30`,
        },
        "&:active": {
          backgroundColor: `${color}28`,
          transform:       "scale(0.97)",
          boxShadow:       "none",
        },
      }
    case "text":
      return {
        color,
        transition: `background-color ${hceTransition.fast}, transform ${hceTransition.fast}`,
        "&:hover": {
          backgroundColor: `${color}18`,
          transform:       "translateY(-1px)",
        },
        "&:active": {
          backgroundColor: `${color}28`,
          transform:       "scale(0.97)",
        },
      }
    default: // contained
      return {
        backgroundColor: color,
        transition: `filter ${hceTransition.fast}, transform ${hceTransition.fast}, box-shadow ${hceTransition.fast}`,
        "&:hover": {
          backgroundColor: color,
          filter:          "brightness(0.88)",
          transform:       "translateY(-1px)",
          boxShadow:       `0 4px 12px ${color}40`,
        },
        "&:active": {
          filter:    "brightness(0.78)",
          transform: "scale(0.97)",
          boxShadow: "none",
        },
      }
  }
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
  variant,
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
  // Mapeo variant → MUI variant
  const muiVariant: "contained" | "outlined" | "text" =
    variant === "ghost"    ? "text"
    : variant === "outlined" ? "outlined"
    : "contained"

  // Mapeo variant → MUI color (solo cuando no hay color custom ni tenantTheme)
  const muiColor =
    variant === "danger"    ? "error"
    : variant === "secondary" ? "secondary"
    : "primary"

  // `color` (string CSS explícito) siempre gana sobre `tenantTheme` — es una
  // intención más específica del caller que la paleta genérica de la empresa.
  // `variant === "danger"` ignora `tenantTheme`: el rojo de peligro es
  // semántico (alerta/destructivo), ninguna empresa lo sobreescribe.
  const effectiveColor =
    color ?? (tenantTheme && variant !== "danger" ? resolveTenantColor(tenantTheme, variant) : undefined)

  // Si hay un color efectivo (custom o de tenant), lo aplicamos vía sx
  const colorSx = effectiveColor ? buildColorSx(effectiveColor, muiVariant) : {}

  return (
    <MuiButton
      variant={muiVariant}
      color={effectiveColor ? undefined : muiColor}   // MUI no interpreta hex, lo manejamos con sx
      onClick={onClick}
      fullWidth={fullWidth}
      size={SIZE_MAP[size] ?? "medium"}
      type={type}
      disabled={disabled}
      style={style}
      startIcon={startIcon}
      endIcon={endIcon}
      sx={{
        textTransform: "none",
        fontWeight:    600,
        transition:    `transform ${hceTransition.fast}, box-shadow ${hceTransition.fast}, filter ${hceTransition.fast}`,
        "&:hover": {
          transform: "translateY(-1px)",
        },
        "&:active": {
          transform: "scale(0.97)",
        },
        ...colorSx,
        ...sx,          // overrides del caller (mayor prioridad)
      }}
    >
      {children ?? label}
    </MuiButton>
  )
}
