import { useState } from "react"
import { Box, OutlinedInput } from "@mui/material"
import { hceColors, hceTransition } from "../../tokens/hce.tokens"
import { FieldCol } from "../FieldCol/FieldCol"

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

    // ── Colores reactivos ──────────────────────────────────────
  const mainColor = disabled
    ? hceColors.neutro.black[300] // Gris si está deshabilitado
    : error
      ? hceColors.alert.error[600] // Rojo si hay error
      : hceColors.primary.blue[600]; // Azul por defecto

  const inputTextColor = disabled
    ? hceColors.neutro.black[300] // Gris si está deshabilitado
    : error
      ? hceColors.alert.error[600]
      : active
        ? hceColors.primary.blue[600] // Azul si interactúa
        : hceColors.neutro.black[700] // Negro en reposo

  return (
    <Box
      // Bloqueamos el hover si está deshabilitado
      onMouseEnter={() => !disabled && setHovered(true)}
      onMouseLeave={() => !disabled && setHovered(false)}
    >
      <FieldCol label={label} labelColor={mainColor}>
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
            // Fondo ligeramente gris si está deshabilitado
            backgroundColor: disabled ? hceColors.neutro.white[50] : hceColors.neutro.white[50],
            fontSize:        "0.875rem",
            transition:      `box-shadow ${hceTransition.fast}`,
            
            "& .MuiInputBase-input": {
              color:               inputTextColor,
              WebkitTextFillColor: inputTextColor,
              transition:          `color ${hceTransition.fast}, -webkit-text-fill-color ${hceTransition.fast}`,
              
              // Icono nativo del calendario
              "&::-webkit-calendar-picker-indicator": {
                filter: "opacity(0.6)", // Mantiene el ícono visible pero sutil
                cursor: disabled ? "not-allowed" : "pointer",
              },
            },
            
            // Bordes reactivos unificados con `mainColor`
            "& fieldset": {
              borderColor: mainColor,
              transition:  `border-color ${hceTransition.fast}`,
            },
            "&:hover fieldset":       { borderColor: mainColor },
            "&.Mui-focused fieldset": { borderColor: mainColor },
            
            // Anillo de enfoque
            "&.Mui-focused": {
              boxShadow: `0 0 0 3px ${hceColors.primary.blue[100]}`,
            },
          }}
        />
      </FieldCol>
    </Box>
  )
}
