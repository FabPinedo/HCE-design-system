import { useState } from "react"
import { Box, Typography, OutlinedInput } from "@mui/material"
import { hceColors, hceTypography, hceTransition } from "../../tokens/hce.tokens"

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
  const [focused, setFocused] = useState(false)
  const [hovered, setHovered] = useState(false)

  const active = focused || hovered

  const accentColor = error
    ? hceColors.alert.error[600]
    : active
      ? hceColors.primary.blue[600]
      : hceColors.neutro.black[200]

  const inputTextColor = error
    ? hceColors.alert.error[600]
    : active
      ? hceColors.primary.blue[600]
      : hceColors.neutro.black[400]

  const borderDefault = error ? hceColors.alert.error[600] : hceColors.neutro.black[50]
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
          color:      accentColor,
          mb:         0.5,
          display:    "block",
          transition: `color ${hceTransition.fast}`,
        }}>
          {label}
        </Typography>
      )}
      <OutlinedInput
        fullWidth
        size="small"
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        disabled={disabled}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        sx={{
          borderRadius:    "8px",
          backgroundColor: hceColors.neutro.white[50],
          fontSize:        "0.875rem",
          transition:      `box-shadow ${hceTransition.fast}`,
          "& .MuiInputBase-input": {
            color:               inputTextColor,
            WebkitTextFillColor: inputTextColor,
            transition:          `color ${hceTransition.fast}, -webkit-text-fill-color ${hceTransition.fast}`,
            // Icono nativo del calendario — visible incluso con el texto en color de acento
            "&::-webkit-calendar-picker-indicator": {
              filter: "opacity(0.6)",
              cursor: disabled ? "not-allowed" : "pointer",
            },
          },
          "& fieldset": {
            borderColor: borderDefault,
            transition:  `border-color ${hceTransition.fast}`,
          },
          "&:hover fieldset":       { borderColor: borderActive },
          "&.Mui-focused fieldset": { borderColor: borderActive },
          "&.Mui-focused": {
            boxShadow: `0 0 0 3px ${hceColors.primary.blue[100]}`,
          },
        }}
      />
    </Box>
  )
}
