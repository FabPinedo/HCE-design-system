import { useId, type CSSProperties } from "react"
import "./SelectInput.css"
import { hceColors } from "../../tokens/hce.tokens"

interface Option {
  value: string
  label: string
}

interface Props {
  label?: string
  value: string
  onChange: (v: string) => void
  options: readonly Option[]
  disabled?: boolean
  fullWidth?: boolean
  size?: 'small' | 'medium'
  required?: boolean
}

/**
 * SelectInput — reemplazo de MUI FormControl+InputLabel+Select con un
 * <select> nativo.
 *
 * NOTA DE PARIDAD: MUI dibujaba el label "notched" flotando dentro del
 * borde superior (estilo outlined). Un <select> nativo no soporta ese
 * patrón sin recrear el notch a mano con position:absolute + un recorte de
 * borde — se simplifica a un label simple arriba del control. Mismo
 * comportamiento funcional (required/disabled/value), diferencia
 * puramente visual del label.
 */
export const SelectInput = ({
  label,
  value,
  onChange,
  options,
  disabled,
  fullWidth = true,
  size = 'small',
  required,
}: Props) => {
  const id = useId()

  // blue[600] == --ds-color-interactive exactamente — reactivo al tema activo
  // de DSProvider, mismo hex de siempre como fallback. Antes este componente
  // no leía ninguna variable --ds-* (ni en reposo ni en hover/focus) y
  // quedaba como un clon literal de los colores default de MUI — hallazgo de
  // hce-code-reviewer, mismo criterio ya aplicado en SelectField.
  const mainColor = disabled
    ? hceColors.neutro.black[300]
    : `var(--ds-color-interactive, ${hceColors.primary.blue[600]})`

  const cssVars = {
    "--si-main":       mainColor,
    "--si-focus-ring":  hceColors.primary.blue[100],
  } as CSSProperties

  return (
    <div className={`hce-selectinput-wrapper${fullWidth ? " hce-selectinput-wrapper--full-width" : ""}`} style={cssVars}>
      {label && (
        <label className="hce-selectinput-label" htmlFor={id}>
          {label}{required ? " *" : ""}
        </label>
      )}
      <div
        className={[
          "hce-selectinput-box",
          size === 'small' ? "hce-selectinput-box--sm" : "hce-selectinput-box--md",
          disabled ? "hce-selectinput-box--disabled" : "",
        ].filter(Boolean).join(" ")}
      >
        <select
          id={id}
          className="hce-selectinput"
          value={value}
          disabled={disabled}
          required={required}
          onChange={(e) => onChange(e.target.value)}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <span className="hce-selectinput-arrow" aria-hidden="true">
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </div>
    </div>
  )
}
