import type { CSSProperties } from "react"
import "./SelectField.css"
import { hceColors } from "../../tokens/hce.tokens"

interface Option {
  value: string
  label: string
}

interface Props {
  label:        string
  value:        string
  onChange:     (value: string) => void
  options:      Option[]
  placeholder?: string
  fullWidth?:   boolean
  disabled?:    boolean
  /** Activa el estado de error: todo cambia a rojo */
  error?:       boolean
  /**
   * @deprecated No-op tras la migración a un <select> nativo (sin MUI Menu):
   * el navegador controla la altura/posición del desplegable, ya no es
   * configurable. Se mantiene en la interfaz para no romper callers
   * existentes que la pasan.
   */
  menuMaxHeight?: number
}

export function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder = "-Seleccionar Opción-",
  fullWidth   = true,
  disabled    = false,
  error       = false,
}: Props) {
  // ── Colores reactivos ──────────────────────────────────────
  // 1. Color principal (aplica a label, borde, ícono de flecha y placeholder)
  const mainColor = disabled
    ? hceColors.neutro.black[300]
    : error
      ? hceColors.alert.error[600]
      : hceColors.primary.blue[600]

  // 2. Color del texto seleccionado — reactivo a hover/focus vía CSS, salvo
  // cuando no hay valor (se muestra el placeholder con mainColor siempre).
  const hasValue = Boolean(value)
  const valueDefaultColor = !hasValue
    ? mainColor
    : disabled
      ? hceColors.neutro.black[300]
      : error
        ? hceColors.alert.error[600]
        : hceColors.neutro.black[400]
  const valueActiveColor = !hasValue
    ? mainColor
    : disabled
      ? hceColors.neutro.black[300]
      : error
        ? hceColors.alert.error[600]
        : hceColors.primary.blue[600]

  const cssVars = {
    "--sf-main":          mainColor,
    "--sf-value-default": valueDefaultColor,
    "--sf-value-active":  valueActiveColor,
    "--sf-focus-ring":    hceColors.primary.blue[100],
  } as CSSProperties

  return (
    <div>
      <label className="hce-selectfield-label" style={cssVars}>{label}</label>
      <div
        className={`hce-selectfield-box${fullWidth ? " hce-selectfield-box--full-width" : ""}`}
        style={cssVars}
      >
        <select
          className="hce-selectfield"
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="" disabled hidden>{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <span className="hce-selectfield-arrow" aria-hidden="true">
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </div>
    </div>
  )
}
