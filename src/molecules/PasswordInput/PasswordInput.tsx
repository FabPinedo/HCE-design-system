import { useState }              from "react"
import { InputAdornment, Box }   from "@mui/material"
import { TextInput }             from "../../atoms/TextInput/TextInput"
import { UiEyeIcon }             from "../../atoms/Icon/SvgIconsUiKit"
import { hceColors, hceTransition } from "../../tokens/hce.tokens"
import type { ReactNode }        from "react"

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
  const [show,    setShow]    = useState(false)
  const [focused, setFocused] = useState(false)
  const [hovered, setHovered] = useState(false)

  // El ícono eye sigue el mismo esquema de colores que el input
  const eyeColor = error
    ? hceColors.alert.error[600]
    : (focused || hovered)
      ? hceColors.primary.blue[600]
      : hceColors.neutro.black[200]

  const eyeAdornment = (
    <InputAdornment position="end">
      <Box
        component="span"
        sx={{
          display:    "flex",
          alignItems: "center",
          cursor:     "pointer",
          color:      eyeColor,
          transition: `color ${hceTransition.fast}`,
          userSelect: "none",
          WebkitUserSelect: "none",
        }}
        // Mantener presionado para mostrar — soltar para ocultar
        onMouseDown={(e) => { e.preventDefault(); setShow(true) }}
        onMouseUp={() => setShow(false)}
        onMouseLeave={() => setShow(false)}
        onTouchStart={(e) => { e.preventDefault(); setShow(true) }}
        onTouchEnd={() => setShow(false)}
      >
        <UiEyeIcon size={20} />
      </Box>
    </InputAdornment>
  )

  return (
    // onFocus/onBlur burbujean en React → detectan foco del input interno
    <Box
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
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
    </Box>
  )
}
