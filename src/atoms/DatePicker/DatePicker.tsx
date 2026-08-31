import { useRef, type CSSProperties } from "react"
import "./DatePicker.css"
import { hceColors } from "../../tokens/hce.tokens"
import { HceCalendarIcon } from "../Icon/SvgIconsHce"

export interface DatePickerProps {
  label?: string
  /** Fecha en formato ISO YYYY-MM-DD (formato nativo de <input type="date">). */
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  required?: boolean
  /** Activa el estado de error: todo (label, borde) cambia a rojo */
  error?: boolean
  /**
   * Hook de pruebas E2E — id base. Se aplica al `<input>` y se sufija
   * `-calendar-button` en el botón de calendario.
   */
  testId?: string
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
  testId,
}: DatePickerProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const openCalendar = () => {
    if (disabled) return
    try {
      inputRef.current?.showPicker()
    } catch {
      // Fallback para navegadores que no implementan showPicker().
      inputRef.current?.focus()
    }
  }

  // El hover/focus ahora es CSS real (:hover/:focus-within en el wrapper),
  // ya no necesita useState(focused/hovered).
  // blue[600] == --ds-color-interactive exactamente — reactivo al tema activo
  // de DSProvider, mismo hex de siempre como fallback.
  // Label y borde van coloreados por el tema DESDE EL INICIO (igual que
  // TextInput/NumericField) -- antes quedaban en gris neutro hasta el
  // hover, lo que hacía parecer el campo deshabilitado/apagado en reposo.
  // Solo el texto ingresado (textDefault) se mantiene neutro en reposo y
  // pasa a color de tema en hover/focus, igual que en TextInput.
  const themeColor    = `var(--ds-color-interactive, ${hceColors.primary.blue[600]})`
  const disabledColor = hceColors.neutro.black[800]
  const accentDefault = disabled ? disabledColor : error ? hceColors.alert.error[600] : themeColor
  const accentActive  = disabled ? disabledColor : error ? hceColors.alert.error[600] : themeColor
  const borderDefault = disabled ? disabledColor : error ? hceColors.alert.error[600] : themeColor
  const borderActive  = disabled ? disabledColor : error ? hceColors.alert.error[600] : themeColor
  // En un input date vacío, el texto que dibuja el navegador funciona como
  // placeholder. Debe usar exactamente el mismo color que el borde.
  const textDefault   = value
    ? (disabled ? disabledColor : error ? hceColors.alert.error[600] : hceColors.neutro.black[800])
    : borderDefault
  const textActive    = disabled ? disabledColor : error ? hceColors.alert.error[600] : themeColor

  const cssVars = {
    "--dp-accent-default": accentDefault,
    "--dp-accent-active":  accentActive,
    "--dp-text-default":   textDefault,
    "--dp-text-active":    textActive,
    "--dp-border-default": borderDefault,
    "--dp-border-active":  borderActive,
    "--dp-focus-ring":     hceColors.primary.blue[100],
     "--dp-background-disabled":     hceColors.neutro.white[600],

  } as CSSProperties

  return (
    <div className={`hce-datepicker-wrapper${disabled ? " hce-datepicker-wrapper--disabled" : ""}`} style={cssVars}>
      {label && <label className="hce-datepicker-label">{label}</label>}
      <div className={`hce-datepicker-box${disabled ? " hce-datepicker-box--disabled" : ""}`}>
        <input
          ref={inputRef}
          type="date"
          className="hce-datepicker-field"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          disabled={disabled}
          data-testid={testId}
        />
        <button
          type="button"
          className="hce-datepicker-calendar-button"
          onClick={openCalendar}
          disabled={disabled}
          aria-label="Abrir calendario"
          data-testid={testId ? `${testId}-calendar-button` : undefined}
        >
          <HceCalendarIcon size={18} />
        </button>
      </div>
    </div>
  )
}
