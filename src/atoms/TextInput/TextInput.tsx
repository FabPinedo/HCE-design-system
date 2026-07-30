import { useState, type ReactNode } from "react";
import { Box, OutlinedInput, InputAdornment } from "@mui/material";
import {
  hceColors,
  hceTransition,
} from "../../tokens/hce.tokens";
import { FieldCol } from "../FieldCol/FieldCol";

interface Props {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  startIcon?: ReactNode;
  fullWidth?: boolean;
  type?: string;
  endAdornment?: ReactNode;
  required?: boolean;
  disabled?: boolean;
  /** Activa el estado de error: todo (label, borde, ícono, texto) cambia a rojo */
  error?: boolean;
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
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);

  const active = focused || hovered;

  // ── Colores reactivos ──────────────────────────────────────
  const mainColor = disabled
    ? hceColors.neutro.black[300] // Gris si está deshabilitado
    : error
      ? hceColors.alert.error[600] // Rojo si hay error
      : hceColors.primary.blue[600]; // Azul por defecto

  // 1. AÑADIDO: Ahora evaluamos 'disabled' antes de pintar el texto escrito
  const inputTextColor = disabled
    ? hceColors.neutro.black[300] 
    : error
      ? hceColors.alert.error[600]
      : active
        ? hceColors.primary.blue[600]
        : hceColors.neutro.black[400];

  return (
    <Box
      // 2. AÑADIDO: Bloqueamos el hover de React si está deshabilitado
      onMouseEnter={() => !disabled && setHovered(true)}
      onMouseLeave={() => !disabled && setHovered(false)}
    >
      <FieldCol label={label} labelColor={mainColor}>
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
          startAdornment={
            startIcon ? (
              <InputAdornment position="start">
                <Box
                  sx={{
                    // 3. AÑADIDO: El ícono ahora usa mainColor para que también sea gris
                    color: mainColor, 
                    display: "flex",
                    alignItems: "center",
                    transition: `color ${hceTransition.fast}`,
                  }}
                >
                  {startIcon}
                </Box>
              </InputAdornment>
            ) : undefined
          }
          endAdornment={endAdornment}
          sx={{
            borderRadius: "8px",
            // OPCIONAL: Fondo ligeramente oscuro si está deshabilitado
            backgroundColor: disabled ? hceColors.neutro.white[50] : hceColors.neutro.white[50], 
            fontSize: "0.875rem",
            transition: `box-shadow ${hceTransition.fast}`,
            // Texto escrito en el input
            "& .MuiInputBase-input": {
              color: inputTextColor,
              WebkitTextFillColor: inputTextColor,
              transition: `color ${hceTransition.fast}, -webkit-text-fill-color ${hceTransition.fast}`,
            },
            // Bordes
            "& fieldset": {
              borderColor: mainColor,
              transition: `border-color ${hceTransition.fast}`,
            },
            // 4. CORREGIDO: Al usar mainColor, el hover CSS respetará si es gris o azul
            "&:hover fieldset": { borderColor: mainColor },
            "&.Mui-focused fieldset": { borderColor: mainColor },
            // Focus ring (accesibilidad y feedback visual)
            "&.Mui-focused": {
              boxShadow: `0 0 0 3px ${hceColors.primary.blue[100]}`,
            },
            // Placeholder
            "& .MuiInputBase-input::placeholder": {
              color: mainColor,
              WebkitTextFillColor: mainColor,
              opacity: 1,
              transition: `color ${hceTransition.fast}`,
            },
          }}
        />
      </FieldCol>
    </Box>
  );
}