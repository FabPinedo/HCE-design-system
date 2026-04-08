import { useState, type ReactNode } from "react"
import { Box, Typography, OutlinedInput, InputAdornment } from "@mui/material"
import { baseColors }  from "../../tokens/base.tokens"
import { hceColors }   from "../../tokens/hce.tokens"

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
  // Label, placeholder, ícono start, borde
  const accentColor = error
    ? hceColors.alert.error[600]
    : active
      ? hceColors.primary.blue[600]
      : baseColors.textSecondary

  // Texto escrito en el input
  const inputTextColor = error
    ? hceColors.alert.error[600]
    : active
      ? hceColors.primary.blue[600]
      : baseColors.textPrimary

  // Borde por defecto (sin hover ni focus)
  const borderDefault = error ? hceColors.alert.error[600] : baseColors.border
  // Borde hover / focus
  const borderActive  = error ? hceColors.alert.error[600] : hceColors.primary.blue[600]

  return (
    <Box
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label && (
        <Typography component="label" sx={{
          fontSize:   "0.75rem",
          fontWeight: 600,
          color:      accentColor,
          mb:         0.5,
          display:    "block",
          transition: "color 0.15s",
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
              color:      accentColor,
              display:    "flex",
              alignItems: "center",
              transition: "color 0.15s",
            }}>
              {startIcon}
            </Box>
          </InputAdornment>
        ) : undefined}
        endAdornment={endAdornment}
        sx={{
          borderRadius:    "8px",
          backgroundColor: baseColors.surface,
          fontSize:        "0.875rem",
          // Texto escrito en el input
          // WebkitTextFillColor tiene prioridad sobre `color` en Chrome/Safari
          "& .MuiInputBase-input": {
            color:                inputTextColor,
            WebkitTextFillColor:  inputTextColor,
            transition:           "color 0.15s, -webkit-text-fill-color 0.15s",
          },
          // Bordes
          "& fieldset":             { borderColor: borderDefault },
          "&:hover fieldset":       { borderColor: borderActive },
          "&.Mui-focused fieldset": { borderColor: borderActive },
          // Placeholder
          "& input::placeholder": {
            color:      accentColor,
            opacity:    1,
            transition: "color 0.15s",
          },
        }}
      />
    </Box>
  )
}
