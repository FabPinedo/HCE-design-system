import { useState } from "react"
import { Box, Typography, FormControl, Select, OutlinedInput, MenuItem } from "@mui/material"
import { baseColors } from "../../tokens/base.tokens"

interface Option {
  value: string
  label: string
}

interface Props {
  label:        string
  value:        string
  onChange:     (value: string) => void
  options:      Option[]
  placeholder?: string
  fullWidth?:   boolean
}

export function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder = "-Seleccionar Opción-",
  fullWidth   = true,
}: Props) {
  const [open,    setOpen]    = useState(false)
  const [hovered, setHovered] = useState(false)

  const active      = open || hovered
  const accentColor = active ? baseColors.primary : baseColors.textSecondary

  return (
    <Box
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
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
      <FormControl fullWidth={fullWidth} size="small">
        <Select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          displayEmpty
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          input={<OutlinedInput sx={{
            borderRadius:    "8px",
            backgroundColor: baseColors.surface,
            fontSize:        "0.875rem",
            "& fieldset":             { borderColor: baseColors.border },
            "&:hover fieldset":       { borderColor: baseColors.primary },
            "&.Mui-focused fieldset": { borderColor: baseColors.primary },
          }} />}
          renderValue={(v) => (
            <Typography sx={{
              fontSize: "0.875rem",
              color:    v ? baseColors.textPrimary : accentColor,
              transition: "color 0.15s",
            }}>
              {options.find(o => o.value === v)?.label ?? placeholder}
            </Typography>
          )}
        >
          {options.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}
