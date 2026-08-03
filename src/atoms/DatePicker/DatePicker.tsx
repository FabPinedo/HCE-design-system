import type { CSSProperties } from "react"
import "./DatePicker.css"
import { hceColors } from "../../tokens/hce.tokens"

export interface DatePickerProps {
  label?: string
  /** Fecha en formato ISO YYYY-MM-DD (formato nativo de <input type="date">). */
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  required?: boolean
  /** Activa el estado de error: todo (label, borde) cambia a rojo */
  error?: boolean
}

/**
 * Selector de fecha con doble método de entrada: escritura manual segmentada
 * (día/mes/año) y selector de calendario nativo del navegador. El value que
 * expone siempre es YYYY-MM-DD (ISO), compatible con @IsDateString() del backend.
 */
export function DatePicker({
  label,
  value,
  onChange,
  disabled = false,
  required,
  error = false,
}: DatePickerProps) {
  // El hover/focus ahora es CSS real (:hover/:focus-within en el wrapper),
  // ya no necesita useState(focused/hovered).
  const accentDefault = error ? hceColors.alert.error[600] : hceColors.neutro.black[200]
  const accentActive  = error ? hceColors.alert.error[600] : hceColors.primary.blue[600]
  const textDefault   = error ? hceColors.alert.error[600] : hceColors.neutro.black[400]
  const textActive    = error ? hceColors.alert.error[600] : hceColors.primary.blue[600]
  const borderDefault = error ? hceColors.alert.error[600] : hceColors.neutro.black[50]
  const borderActive  = error ? hceColors.alert.error[600] : hceColors.primary.blue[600]

  const cssVars = {
    "--dp-accent-default": accentDefault,
    "--dp-accent-active":  accentActive,
    "--dp-text-default":   textDefault,
    "--dp-text-active":    textActive,
    "--dp-border-default": borderDefault,
    "--dp-border-active":  borderActive,
    "--dp-focus-ring":     hceColors.primary.blue[100],
  } as CSSProperties

  return (
    <div className="hce-datepicker-wrapper" style={cssVars}>
      {label && <label className="hce-datepicker-label">{label}</label>}
      <div className="hce-datepicker-box">
        <input
          type="date"
          className="hce-datepicker-field"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          disabled={disabled}
        />
      </div>
    </div>
  )
}
