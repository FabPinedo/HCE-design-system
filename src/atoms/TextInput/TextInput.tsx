import { useState, type ReactNode } from "react"
import { Box, Typography, OutlinedInput, InputAdornment } from "@mui/material"
import { baseColors } from "../../tokens/base.tokens"

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
}: Props) {
  const [focused, setFocused] = useState(false)
  const [hovered, setHovered] = useState(false)

  const active      = focused || hovered
  const accentColor = active ? baseColors.primary : baseColors.textSecondary

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
        startAdornment={startIcon
          ? (
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
          )
          : undefined
        }
        endAdornment={endAdornment}
        sx={{
          borderRadius:    "8px",
          backgroundColor: baseColors.surface,
          fontSize:        "0.875rem",
          "& fieldset":             { borderColor: baseColors.border },
          "&:hover fieldset":       { borderColor: baseColors.primary },
          "&.Mui-focused fieldset": { borderColor: baseColors.primary },
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
