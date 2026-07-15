import { Box, Typography } from "@mui/material"
import { hceColors, hceTransition, hceTypography } from "../../tokens/hce.tokens"
import { useState } from "react"

export interface NumericFieldProps {
  label: string
  value: string
  onChange?: (v: string) => void
  /** Unidad mostrada como placeholder dentro del input cuando está vacío (ej. "Kg", "°C"). */
  suffix: string
  /** "decimal" permite coma/punto (ej. peso, temperatura); "natural" solo dígitos enteros. */
  numberType?: "decimal" | "natural"
  readOnly?: boolean
  disabled?: boolean
}

/** Campo numérico con label y unidad como placeholder. */
export function NumericField({
  label,
  value,
  onChange,
  suffix,
  numberType = "decimal",
  readOnly = false,
  disabled = false,
}: NumericFieldProps) {
  const [focused, setFocused] = useState(false)
  const [hovered, setHovered] = useState(false)

  const active = focused || hovered

  // ── Colores reactivos ──────────────────────────────────────
  // Color principal (borde y placeholder)
  const mainColor = disabled
    ? hceColors.neutro.black[300] // Gris si está deshabilitado
    : hceColors.primary.blue[600] // Azul por defecto

  // Color del texto escrito
  const inputTextColor = disabled
    ? hceColors.neutro.black[300] // Gris
    : active && !readOnly
      ? hceColors.primary.blue[600] // Azul si interactúa
      : hceColors.neutro.black[700] // Negro en reposo
  return (
    <Box>
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
      <Box
      onMouseEnter={() => !disabled && !readOnly && setHovered(true)}
        onMouseLeave={() => !disabled && !readOnly && setHovered(false)}
        sx={{
          border: `1.5px solid ${mainColor}`,
          borderRadius: "8px",
          width: "100%",
          height: 40,
          display: "flex",
          alignItems: "center",
          boxSizing: "border-box",
          backgroundColor: readOnly || disabled ? hceColors.neutro.white[50] : "#ffffff",
          overflow: "hidden",
        }}
      >
        <Box
          component="input"
          disabled={disabled}
          type="text"
          inputMode={numberType === "decimal" ? "decimal" : "numeric"}
          value={value}
          placeholder={suffix || undefined}
          readOnly={readOnly}
          onFocus={() => !readOnly && setFocused(true)}
          onBlur={() => !readOnly && setFocused(false)}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange?.(
              numberType === "decimal"
                ? e.target.value.replace(/[^\d.,]/g, "")
                : e.target.value.replace(/[^\d]/g, ""),
            )
          }
          sx={{
            px: 1.5,
            border: "none",
            outline: "none",
            fontFamily: hceTypography.fontFamily,
            fontSize: "0.875rem",
            backgroundColor: "transparent",
            color: hceColors.neutro.black[700],
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
            WebkitTextFillColor: inputTextColor,
            "&::placeholder": { 
              color: mainColor,
              WebkitTextFillColor: mainColor,
              opacity: 1,
              transition: "color 0.2s ease",
            },
          }}
        />
      </Box>
    </Box>
  )
}
