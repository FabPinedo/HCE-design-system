import { Box, Typography } from "@mui/material"
import { useId, useState } from "react"
import { hceColors, hceTypography } from "../../tokens/hce.tokens"

export interface TextareaFieldProps {
  label: string
  value: string
  onChange: (v: string) => void
  maxLength?: number
  placeholder?: string
  disabled?: boolean
}

/** Textarea con label y contador de caracteres. */
export function TextareaField({
  label,
  value,
  onChange,
  maxLength = 100,
  placeholder = "Ingrese texto",
  disabled = false
}: TextareaFieldProps) {
  const id = useId()
  const [focused, setFocused] = useState(false)
  const [hovered, setHovered] = useState(false)

  const active = focused || hovered

  // ── Colores reactivos ──────────────────────────────────────
  // Color principal (label, bordes, placeholder y contador)
  const mainColor = disabled
    ? hceColors.neutro.black[300] // Gris si está deshabilitado
    : hceColors.primary.blue[600] // Azul por defecto

  // Color del texto escrito
  const inputTextColor = disabled
    ? hceColors.neutro.black[300] // Gris
    : active
      ? hceColors.primary.blue[600] // Azul si interactúa
      : hceColors.neutro.black[700] // Tu color negro original en reposo
  return (
    <Box 
      sx={{ display: "flex", flexDirection: "column", gap: "4px" }}
      onMouseEnter={() => !disabled && setHovered(true)}
      onMouseLeave={() => !disabled && setHovered(false)}
    >
      <Typography
        component="label"
        htmlFor={id}
        sx={{
          fontFamily: hceTypography.fontFamily,
          fontSize: "0.72rem",
          fontWeight: 600,
          color: mainColor, // <--- Aplicamos el color reactivo
          transition: "color 0.2s ease",
        }}
      >
        {label}
      </Typography>
      
      <Box
        sx={{
          position: "relative",
          border: `1.5px solid ${mainColor}`, // <--- Borde reactivo
          borderRadius: "8px",
          backgroundColor: disabled ? hceColors.neutro.white[50] : "#fff",
          transition: "border-color 0.2s ease, box-shadow 0.2s ease",
          // Focus ring para accesibilidad, igual que en el TextInput
          boxShadow: focused ? `0 0 0 3px ${hceColors.primary.blue[100]}` : "none",
        }}
      >
        <Box
          id={id}
          disabled={disabled}
          component="textarea"
          value={value}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            onChange(e.target.value.slice(0, maxLength))
          }
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          maxLength={maxLength}
          placeholder={placeholder}
          rows={3}
          sx={{
            display: "block",
            width: "100%",
            p: "10px 12px",
            border: "none",
            outline: "none",
            resize: "none",
            fontFamily: hceTypography.fontFamily,
            fontSize: "0.875rem",
            backgroundColor: "transparent",
            boxSizing: "border-box",
            
            // Texto escrito
            color: inputTextColor,
            WebkitTextFillColor: inputTextColor,
            transition: "color 0.2s ease, -webkit-text-fill-color 0.2s ease",
            
            // Placeholder (usando la misma técnica agresiva para WebKit)
            "&::placeholder": { 
              color: mainColor,
              WebkitTextFillColor: mainColor,
              opacity: 1,
              transition: "color 0.2s ease",
            },
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: 6,
            right: 10,
            fontFamily: hceTypography.fontFamily,
            fontSize: "0.65rem",
            color: mainColor, // <--- El contador también hace match con el estado
            transition: "color 0.2s ease",
          }}
        >
          {value.length}/{maxLength}
        </Box>
      </Box>
    </Box>
  )
}
