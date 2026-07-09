import {
  Autocomplete,
  Box,
  FormControl,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { useState } from "react";
import {
  hceColors,
  hceTransition,
  hceTypography,
} from "../../tokens/hce.tokens";
import { Checkbox } from "../Checkbox/Checkbox";
import { VisibilityOutlined } from "@mui/icons-material";

interface Option {
  value: string;
  label: string;
}

interface Props {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  options: Option[];
  placeholder?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  required?: boolean;
  /** Activa el estado de error: todo cambia a rojo */
  error?: boolean;
}

export const MultiSelect = ({
  label,
  value,
  onChange,
  options,
  placeholder = "-Seleccionar Opción-",
  fullWidth = true,
  disabled,
  required,
  error,
}: Props) => {
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);

  const active = focused || hovered;

  const accentColor = error
    ? hceColors.alert.error[600]
    : active
      ? hceColors.primary.blue[600]
      : hceColors.neutro.black[200];

  const inputTextColor = error
    ? hceColors.alert.error[600]
    : active
      ? hceColors.primary.blue[600]
      : hceColors.neutro.black[400];

  const borderDefault = error
    ? hceColors.alert.error[600]
    : hceColors.neutro.black[50];
  const borderActive = error
    ? hceColors.alert.error[600]
    : hceColors.primary.blue[600];

  const selectedOptions = options.filter((opt) =>
    (value ?? []).includes(opt.value),
  );
  const [inputValue] = useState("");

  if (label) {
    return (
      <Box
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Typography
          component="label"
          sx={{
            fontFamily: hceTypography.fontFamily,
            fontSize: "0.75rem",
            fontWeight: 600,
            color: accentColor,
            mb: 0.5,
            display: "block",
            transition: `color ${hceTransition.fast}`,
          }}
        >
          {label}
        </Typography>
        <FormControl fullWidth={fullWidth} size="small">
          <Autocomplete
            sx={{
              "& .MuiAutocomplete-tag": {
                display: "none",
              },
            }}
            fullWidth={fullWidth}
            slotProps={{
              paper: {
                sx: {
                  // El Popper de MUI Autocomplete ya fija su propio width al
                  // clientWidth del anchor (el trigger/input). "max-content" +
                  // "min-width: 100%" anulaba ese comportamiento y dejaba que
                  // el Paper creciera más allá del ancho del trigger cuando
                  // una opción tenía un label largo, ensanchando el dropdown.
                  // Con "width: 100%" el Paper simplemente llena el ancho que
                  // el Popper ya calculó (= ancho del trigger), así que las
                  // opciones largas truncan con ellipsis en vez de ensanchar
                  // el panel o desbordarse sobre el checkbox.
                  width: "100%",
                },
              },
            }}
            multiple
            disabled={disabled}
            disableCloseOnSelect
            onChange={(_, newValue) => {
              const values = newValue.map((item) => item.value);
              onChange(values);
            }}
            options={options}
            value={selectedOptions ?? []}
            getOptionLabel={(option) => option.label}
            renderValue={() => {
              if (value.length === 0) return null;
              return (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    backgroundColor: hceColors.primary.green[600],
                    color: "#ffffff",
                    borderRadius: "8px",
                    padding: "4px 12px",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    fontFamily: hceTypography.fontFamily,
                    mr: 1,
                    width: "100%",
                    userSelect: "none",
                  }}
                >
                  <span>
                    {value.length} seleccionado{value.length > 1 ? "s" : ""}
                  </span>
                  <VisibilityOutlined sx={{ fontSize: "1rem", opacity: 0.9 }} />
                </Box>
              );
            }}
            renderOption={(props, option, { selected }) => {
              const { key, ...restProps } = props;
              return (
                <li
                  key={option.value}
                  {...restProps}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    padding: "8px 16px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {/*
                    El label se renderiza aparte (no vía la prop `label` de <Checkbox>)
                    para que el `justifyContent: space-between` del <li> tenga dos hijos
                    reales entre los que repartir el espacio: texto a la izquierda,
                    checkbox a la derecha. El átomo <Checkbox> internamente usa un gap
                    fijo (no space-between) a propósito para otros consumidores
                    (ver comentario en Checkbox.tsx) — no se toca ese componente.
                  */}
                  <Typography
                    sx={{
                      fontFamily: hceTypography.fontFamily,
                      fontSize: "0.875rem",
                      color: hceColors.neutro.black[400],
                      textAlign: "left",
                      flex: 1,
                      minWidth: 0,
                      mr: 1,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {option.label}
                  </Typography>
                  <Checkbox
                    ariaLabel={option.label}
                    checked={selected}
                    disabled={false}
                    onChange={() => {}}
                  />
                </li>
              );
            }}
            renderInput={(params) => {
              return (
                <FormControl fullWidth={fullWidth}>
                  <OutlinedInput
                    ref={params.InputProps.ref}
                    required={required}
                    fullWidth={fullWidth}
                    size="small"
                    startAdornment={params.InputProps.startAdornment}
                    inputProps={{
                      ...params.inputProps,
                      placeholder: value.length > 0 ? "" : placeholder,
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Backspace" && !inputValue) {
                        e.stopPropagation();
                      }
                    }}
                    endAdornment={params.InputProps.endAdornment}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    sx={{
                      borderRadius: "8px",
                      backgroundColor: hceColors.neutro.white[50],
                      fontSize: "0.875rem",
                      transition: `box-shadow ${hceTransition.fast}`,
                      "& .MuiInputBase-input": {
                        color: inputTextColor,
                        WebkitTextFillColor: inputTextColor,
                        transition: `color ${hceTransition.fast}, -webkit-text-fill-color ${hceTransition.fast}`,
                      },
                      "& fieldset": {
                        borderColor: borderDefault,
                        transition: `border-color ${hceTransition.fast}`,
                      },
                      "&:hover fieldset": { borderColor: borderActive },
                      "&.Mui-focused fieldset": { borderColor: borderActive },
                      "&.Mui-focused": {
                        boxShadow: `0 0 0 3px ${hceColors.primary.blue[100]}`,
                      },
                      "& input::placeholder": {
                        color: accentColor,
                        opacity: 1,
                        transition: `color ${hceTransition.fast}`,
                      },
                    }}
                  />
                </FormControl>
              );
            }}
          />
        </FormControl>
      </Box>
    );
  }
};
