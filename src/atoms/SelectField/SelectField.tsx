import { useState } from "react";
import {
  Box,
  Typography,
  FormControl,
  Select,
  OutlinedInput,
  MenuItem,
} from "@mui/material";
import {
  hceColors,
  hceTypography,
  hceTransition,
} from "../../tokens/hce.tokens";
import { FieldCol } from "../FieldCol/FieldCol";

interface Option {
  value: string;
  label: string;
}

interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  /** Activa el estado de error: todo cambia a rojo */
  error?: boolean;
  menuMaxHeight?: number;
}

export function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder = "-Seleccionar Opción-",
  fullWidth = true,
  disabled = false,
  error = false,
  menuMaxHeight = 280,
}: Props) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  const active = open || hovered;

  // ── Colores reactivos ──────────────────────────────────────
  // 1. Color principal (aplica a label, bordes, ícono de flecha y placeholder)
  const mainColor = disabled
    ? hceColors.neutro.black[300] // Gris si está deshabilitado
    : error
      ? hceColors.alert.error[600] // Rojo si hay error
      : hceColors.primary.blue[600]; // Azul por defecto

  // 2. Color del texto seleccionado
  const valueColor = disabled
    ? hceColors.neutro.black[300] // Gris
    : error
      ? hceColors.alert.error[600]
      : active
        ? hceColors.primary.blue[600]
        : hceColors.neutro.black[400];

  return (
    <Box
      onMouseEnter={() => !disabled && setHovered(true)}
      onMouseLeave={() => !disabled && setHovered(false)}
    >
      <FieldCol label={label} labelColor={mainColor}>
        <FormControl fullWidth={fullWidth} size="small">
          <Select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            displayEmpty
            disabled={disabled}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            MenuProps={{
              PaperProps: {
                sx: {
                  maxHeight: menuMaxHeight,
                  mt: 0.5,
                  borderRadius: "8px",
                  overflowY: "auto",
                },
              },
              MenuListProps: {
                sx: {
                  py: 0.5,
                },
              },
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left",
              },
              transformOrigin: {
                vertical: "top",
                horizontal: "left",
              },
            }}
            input={
              <OutlinedInput
                sx={{
                  borderRadius: "8px",
                  // Fondo un poco más oscuro si está disabled
                  backgroundColor: disabled
                    ? hceColors.neutro.white[50]
                    : hceColors.neutro.white[50],
                  fontSize: "0.875rem",
                  transition: `box-shadow ${hceTransition.fast}`,

                  // Ícono de la flecha del Select
                  "& .MuiSelect-icon": {
                    color: mainColor,
                    transition: `color ${hceTransition.fast}`,
                  },

                  // Bordes reactivos
                  "& fieldset": {
                    borderColor: mainColor,
                    transition: `border-color ${hceTransition.fast}`,
                  },
                  "&:hover fieldset": { borderColor: mainColor },
                  "&.Mui-focused fieldset": { borderColor: mainColor },
                  "&.Mui-focused": {
                    boxShadow: `0 0 0 3px ${hceColors.primary.blue[100]}`,
                  },
                }}
              />
            }
            renderValue={(v) => (
              <Typography
                sx={{
                  fontFamily: hceTypography.fontFamily,
                  fontSize: "0.875rem",
                  // Si hay valor usa valueColor, si está vacío (mostrando placeholder) usa mainColor
                  color: v ? valueColor : mainColor,
                  transition: `color ${hceTransition.fast}`,
                }}
              >
                {options.find((o) => o.value === v)?.label ?? placeholder}
              </Typography>
            )}
          >
            {options.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </FieldCol>
    </Box>
  );
}
