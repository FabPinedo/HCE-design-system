import { useState } from "react"
import { Box, Typography, FormControl, Select, OutlinedInput, MenuItem } from "@mui/material"
import { hceColors, hceTypography, hceTransition } from "../../tokens/hce.tokens"

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
  disabled?:    boolean
  /** Activa el estado de error: todo cambia a rojo */
  error?:       boolean
}

export function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder = "-Seleccionar Opción-",
  fullWidth   = true,
  disabled    = false,
  error       = false,
}: Props) {
  const [open,    setOpen]    = useState(false)
  const [hovered, setHovered] = useState(false)

  const active = open || hovered

  const accentColor = error
    ? hceColors.alert.error[600]
    : active
      ? hceColors.primary.blue[600]
      : hceColors.neutro.black[200]

  const borderDefault = error ? hceColors.alert.error[600] : hceColors.neutro.black[50]
  const borderActive  = error ? hceColors.alert.error[600] : hceColors.primary.blue[600]

  return (
    <Box
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
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
      <FormControl fullWidth={fullWidth} size="small">
        <Select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          displayEmpty
          disabled={disabled}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          input={<OutlinedInput sx={{
            borderRadius:    "8px",
            backgroundColor: hceColors.neutro.white[50],
            fontSize:        "0.875rem",
            transition:      `box-shadow ${hceTransition.fast}`,
            // Texto seleccionado
            "& .MuiSelect-select": {
              color:      value
                ? (error ? hceColors.alert.error[600] : active ? hceColors.primary.blue[600] : hceColors.neutro.black[400])
                : accentColor,
              transition: `color ${hceTransition.fast}`,
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
          }} />}
          renderValue={(v) => (
            <Typography sx={{
              fontFamily: hceTypography.fontFamily,
              fontSize:   "0.875rem",
              color:      v
                ? (error ? hceColors.alert.error[600] : active ? hceColors.primary.blue[600] : hceColors.neutro.black[400])
                : accentColor,
              transition: `color ${hceTransition.fast}`,
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
