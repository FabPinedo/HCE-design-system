import { useState, type CSSProperties, type ReactNode } from "react"
import "./PasswordInput.css"
import { TextInput }             from "../../atoms/TextInput/TextInput"
import { UiEyeIcon }             from "../../atoms/Icon/SvgIconsUiKit"
import { hceColors } from "../../tokens/hce.tokens"

interface Props {
  label:        string
  value:        string
  onChange:     (value: string) => void
  placeholder?: string
  startIcon?:   ReactNode
  fullWidth?:   boolean
  /** Activa el estado de error: todo cambia a rojo */
  error?:       boolean
}

export function PasswordInput({
  label,
  value,
  onChange,
  placeholder,
  startIcon,
  fullWidth = true,
  error     = false,
}: Props) {
  const [show, setShow] = useState(false)

  // El ícono eye sigue el mismo esquema de colores que el input — el hover/
  // focus ahora es CSS real (ver PasswordInput.css), solo el error queda
  // como cálculo en JS.
  const eyeCssVars = {
    "--eye-color":        error ? hceColors.alert.error[600] : hceColors.neutro.black[200],
    "--eye-color-active": error ? hceColors.alert.error[600] : hceColors.primary.blue[600],
  } as CSSProperties

  const eyeAdornment = (
    <span
      className="hce-password-eye"
      style={eyeCssVars}
      // Mantener presionado para mostrar — soltar para ocultar
      onMouseDown={(e) => { e.preventDefault(); setShow(true) }}
      onMouseUp={() => setShow(false)}
      onMouseLeave={() => setShow(false)}
      onTouchStart={(e) => { e.preventDefault(); setShow(true) }}
      onTouchEnd={() => setShow(false)}
    >
      <UiEyeIcon size={20} />
    </span>
  )

  return (
    <TextInput
      label={label}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      startIcon={startIcon}
      fullWidth={fullWidth}
      type={show ? "text" : "password"}
      endAdornment={eyeAdornment}
      error={error}
    />
  )
}
