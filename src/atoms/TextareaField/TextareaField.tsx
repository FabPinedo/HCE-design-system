import { useId, type CSSProperties } from "react"
import "./TextareaField.css"
import { hceColors } from "../../tokens/hce.tokens"

export interface TextareaFieldProps {
  label: string
  value: string
  onChange: (v: string) => void
  maxLength?: number
  placeholder?: string
  disabled?: boolean
  /** Hook de pruebas E2E — `data-testid` en el `<textarea>`. */
  testId?: string
}

/** Textarea con label y contador de caracteres. */
export function TextareaField({
  label,
  value,
  onChange,
  maxLength = 100,
  placeholder = "Ingrese texto",
  disabled = false,
  testId,
}: TextareaFieldProps) {
  const id = useId()

  // ── Colores reactivos (ahora vía :hover/:focus-within en CSS) ──────────
  // blue[600] == --ds-color-interactive exactamente — reactivo al tema activo
  // de DSProvider, mismo hex de siempre como fallback.
  const mainColor = disabled
    ? hceColors.neutro.black[300]
    : `var(--ds-color-interactive, ${hceColors.primary.blue[600]})`

  // El texto escrito por el usuario usa el mismo azul fijo de hceColors
  // (no la var del tema), tanto en reposo como en hover/focus — igual
  // criterio que NumericField y SelectField.
  const textDefaultColor = disabled
    ? hceColors.neutro.black[300]
    : hceColors.primary.blue[600]
  const textActiveColor = disabled
    ? hceColors.neutro.black[300]
    : hceColors.primary.blue[600]

  const cssVars = {
    "--ta-main":         mainColor,
    "--ta-text-default": textDefaultColor,
    "--ta-text-active":  textActiveColor,
    "--ta-bg":           disabled ? hceColors.neutro.white[50] : "#ffffff",
    "--ta-focus-ring":   hceColors.primary.blue[100],
  } as CSSProperties

  return (
    <div className="hce-textarea-wrapper" style={cssVars}>
      <label className="hce-textarea-label" htmlFor={id}>
        {label}
      </label>

      <div className="hce-textarea-box">
        <textarea
          id={id}
          disabled={disabled}
          className="hce-textarea-field"
          value={value}
          onChange={(e) => onChange(e.target.value.slice(0, maxLength))}
          maxLength={maxLength}
          placeholder={placeholder}
          rows={3}
          data-testid={testId}
        />
        <span className="hce-textarea-counter">
          {value.length}/{maxLength}
        </span>
      </div>
    </div>
  )
}