import { useState, type ReactNode } from "react"
import { Box, Typography, OutlinedInput, InputAdornment } from "@mui/material"
import { hceColors, hceTypography, hceTransition } from "../../tokens/hce.tokens"

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
  const [focused, setFocused] = useState(false)
  const [hovered, setHovered] = useState(false)

  const active = focused || hovered

  // ── Colores reactivos ──────────────────────────────────────
  const mainColor = disabled
    ? hceColors.neutro.black[300] // Gris si está deshabilitado
    : error
      ? hceColors.alert.error[600] // Rojo si hay error
      : hceColors.primary.blue[600] // Azul por defecto

  const inputTextColor = error
    ? hceColors.alert.error[600]
    : active
      ? hceColors.primary.blue[600]
      : hceColors.neutro.black[400]

  const borderActive  = error ? hceColors.alert.error[600] : hceColors.primary.blue[600]

  return (
    <Box
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label && (
        <Typography component="label" sx={{
          fontFamily: hceTypography.fontFamily,
          fontSize:   "0.75rem",
          fontWeight: 600,
          color:      mainColor,
          mb:         0.5,
          display:    "block",
          transition: `color ${hceTransition.fast}`,
        }}>
          {label}
        </Typography>
      )}
      <OutlinedInput
        fullWidth={fullWidth}
        size="small"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        disabled={disabled}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        startAdornment={startIcon ? (
          <InputAdornment position="start">
            <Box sx={{
              color:      hceColors.primary.blue[600],
              display:    "flex",
              alignItems: "center",
              transition: `color ${hceTransition.fast}`,
            }}>
              {startIcon}
            </Box>
          </InputAdornment>
        ) : undefined}
        endAdornment={endAdornment}
        sx={{
          borderRadius:    "8px",
          backgroundColor: hceColors.neutro.white[50],
          fontSize:        "0.875rem",
          transition:      `box-shadow ${hceTransition.fast}`,
          // Texto escrito en el input
          "& .MuiInputBase-input": {
            color:               inputTextColor,
            WebkitTextFillColor: inputTextColor,
            transition:          `color ${hceTransition.fast}, -webkit-text-fill-color ${hceTransition.fast}`,
          },
          // Bordes
          "& fieldset":             {
            borderColor: mainColor,
            transition:  `border-color ${hceTransition.fast}`,
          },
          "&:hover fieldset":       { borderColor: borderActive },
          "&.Mui-focused fieldset": { borderColor: borderActive },
          // Focus ring (accesibilidad y feedback visual)
          "&.Mui-focused": {
            boxShadow: `0 0 0 3px ${hceColors.primary.blue[100]}`,
          },
          // Placeholder
          "& .MuiInputBase-input::placeholder": {
            color:      mainColor,
            WebkitTextFillColor: mainColor,
            opacity:    1,
            transition: `color ${hceTransition.fast}`,
          },
        }}
      />
    </Box>
  )
}
