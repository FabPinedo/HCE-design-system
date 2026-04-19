import { type ReactNode } from "react"
import MuiButton          from "@mui/material/Button"
import { hceTransition }  from "../../tokens/hce.tokens"

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
}: Props) => {
  // Mapeo variant → MUI variant
  const muiVariant: "contained" | "outlined" | "text" =
    variant === "ghost"    ? "text"
    : variant === "outlined" ? "outlined"
    : "contained"

  // Mapeo variant → MUI color (solo cuando no hay color custom)
  const muiColor =
    variant === "danger"    ? "error"
    : variant === "secondary" ? "secondary"
    : "primary"

  // Si se pasa un color CSS custom, lo aplicamos vía sx
  const colorSx = color ? buildColorSx(color, muiVariant) : {}

  return (
    <MuiButton
      variant={muiVariant}
      color={color ? undefined : muiColor}   // MUI no interpreta hex, lo manejamos con sx
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
