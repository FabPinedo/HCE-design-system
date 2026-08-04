import type { ReactNode, CSSProperties } from "react"
import "./TextInput.css"
import { hceColors } from "../../tokens/hce.tokens"

interface Props {
  label?:        string
  value:         string
  onChange:      (value: string) => void
  placeholder?:  string
  startIcon?:    ReactNode
  fullWidth?:    boolean
  type?:         string
  endAdornment?: ReactNode
  required?:     boolean
  disabled?:     boolean
  /** Activa el estado de error: todo (label, borde, ícono, texto) cambia a rojo */
  error?:        boolean
}

export function TextInput({
  label,
  value,
  onChange,
  placeholder,
  startIcon,
  fullWidth = true,
  type = "text",
  endAdornment,
  required,
  disabled,
  error = false,
}: Props) {
  // ── Colores reactivos ──────────────────────────────────────
  // El hover/focus ahora es CSS real (:hover/:focus-within), así que estos
  // ya no necesitan estado de React — solo dependen de error/disabled.
  // blue[600] == --ds-color-interactive exactamente — reactivo al tema activo
  // de DSProvider, mismo hex de siempre como fallback.
  const mainColor = disabled
    ? hceColors.neutro.black[300] // Gris si está deshabilitado
    : error
      ? hceColors.alert.error[600] // Rojo si hay error
      : `var(--ds-color-interactive, ${hceColors.primary.blue[600]})` // Azul por defecto

  const textDefaultColor = error ? hceColors.alert.error[600] : hceColors.neutro.black[400]
  const textActiveColor  = error ? hceColors.alert.error[600] : `var(--ds-color-interactive, ${hceColors.primary.blue[600]})`
  const borderActive     = error ? hceColors.alert.error[600] : `var(--ds-color-interactive, ${hceColors.primary.blue[600]})`

  const cssVars = {
    "--ti-main":       mainColor,
    "--ti-active":     borderActive,
    "--ti-text-default": textDefaultColor,
    "--ti-text-active":  textActiveColor,
    "--ti-focus-ring":   `${hceColors.primary.blue[100]}`,
  } as CSSProperties

  return (
    <div className={fullWidth ? "hce-textinput-wrapper hce-textinput--full-width" : "hce-textinput-wrapper"} style={cssVars}>
      {label && (
        <label className="hce-textinput-label">
          {label}
        </label>
      )}
      <div className={`hce-textinput${disabled ? " hce-textinput--disabled" : ""}${fullWidth ? " hce-textinput--full-width" : ""}`}>
        {startIcon && <span className="hce-textinput__icon">{startIcon}</span>}
        <input
          className="hce-textinput__field"
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          disabled={disabled}
        />
        {endAdornment}
      </div>
    </div>
  )
}
