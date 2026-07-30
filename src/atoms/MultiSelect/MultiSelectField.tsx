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

  const mainColor = disabled
    ? hceColors.neutro.black[300] // Gris si está deshabilitado
    : error
      ? hceColors.alert.error[600] // Rojo si hay error
      : hceColors.primary.blue[600]; // Azul por defecto

  const inputTextColor = disabled
    ? hceColors.neutro.black[300] 
    : error
      ? hceColors.alert.error[600]
      : active
        ? hceColors.primary.blue[600]
        : hceColors.neutro.black[400];

  const borderDefault = disabled
    ? hceColors.neutro.black[300] 
    : error
      ? hceColors.alert.error[600]
      : active
        ? hceColors.primary.blue[600]
        : hceColors.neutro.black[400];
  const borderActive = disabled
    ? hceColors.neutro.black[300] 
    : error
      ? hceColors.alert.error[600]
      : active
        ? hceColors.primary.blue[600]
        : hceColors.neutro.black[400];

  const selectedOptions = options.filter((opt) =>
    (value ?? []).includes(opt.value),
  );
  const [inputValue] = useState("");
  const isAllSelected =
    options.length > 0 && selectedOptions.length === options.length;
  const sortedOptions = [
    { value: "ALL_OPTIONS", label: "Todos" },
    ...options,
  ].sort((a, b) => {
    // Regla 1: "Todos" siempre debe quedarse en la posición más alta
    if (a.value === "ALL_OPTIONS") return -1;
    if (b.value === "ALL_OPTIONS") return 1;

    // Regla 2: Revisamos si están seleccionadas
    const aSeleccionado = (value ?? []).includes(a.value);
    const bSeleccionado = (value ?? []).includes(b.value);

    // Si 'a' está seleccionada y 'b' no, 'a' sube
    if (aSeleccionado && !bSeleccionado) return -1;
    // Si 'b' está seleccionada y 'a' no, 'b' sube
    if (!aSeleccionado && bSeleccionado) return 1;

    // Regla 3: Si ambas tienen el mismo estado (ambas marcadas o ambas desmarcadas),
    // se quedan en el orden en el que venían de la base de datos.
    return 0;
  });

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
            color: mainColor,
            mb: 0.5,
            display: "block",
            transition: `color ${hceTransition.fast}`,
          }}
        >
          {label}
        </Typography>
        <FormControl fullWidth={fullWidth} size="small">
          <Autocomplete
            disableClearable={disabled}
            isOptionEqualToValue={(option, val) => option.value === val.value}
            fullWidth={fullWidth}
            slotProps={{
              paper: {
                sx: {
                  width: "100%",
                },
              },
            }}
            multiple
            disableCloseOnSelect
           onChange={(_, newValue) => {
              // 1. Verificamos si la opción "Todos" viene en el nuevo arreglo
              const hasAllOption = newValue.some((item) => item.value === "ALL_OPTIONS");

              // 2. Si el usuario hizo clic en "Todos"
              if (hasAllOption) {
                if (isAllSelected) {
                  onChange([]); // Si ya estaban marcados, vaciamos el arreglo
                } else {
                  onChange(options.map((opt) => opt.value)); // Si no, los marcamos todos
                }
              } else {
                // 3. Si seleccionó o deseleccionó una opción normal, guardamos los valores
                const values = newValue.map((item) => item.value);
                onChange(values);
              }
            }}
            options={sortedOptions}
            value={selectedOptions ?? []}
            getOptionLabel={(option) => option.label}
            renderTags={(selectedTags, getTagProps) => {
              if (selectedTags.length === 0) return null;
              if (selectedTags.length > 1) {
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
                      userSelect: "none",
                    }}
                  >
                    <Box
                      component="span"
                      sx={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "block",
                      }}
                    >
                      {selectedTags.length} seleccionado
                      {selectedTags.length > 1 ? "s" : ""}
                    </Box>
                    <VisibilityOutlined
                      sx={{ fontSize: "1rem", opacity: 0.9 }}
                    />
                  </Box>
                );
              }

              const { key, onDelete } = getTagProps({ index: 0 });
              return (
                <Box
                  key={key}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    color: inputTextColor,
                    fontFamily: hceTypography.fontFamily,
                    fontSize: "0.875rem",
                    mr: 1,
                    maxWidth: "100%",
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "block",
                    }}
                  >
                    {selectedTags[0].label}
                  </Box>
                  <Box
                    component="span"
                    onClick={onDelete}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                      opacity: 0.5,
                      fontSize: "0.75rem",
                      fontWeight: "bold",
                      flexShrink: 0,
                      "&:hover": {
                        opacity: 1,
                        color: hceColors.alert.error[600],
                      },
                    }}
                    title="Borrar opción"
                  >
                    ✕
                  </Box>
                </Box>
              );
            }}
            renderOption={(props, option, { selected }) => {
              const { key, ...restProps } = props;
              const isChecked =
                option.value === "ALL_OPTIONS" ? isAllSelected : selected;
              const handleClick = (
                e: React.MouseEvent<HTMLLIElement, MouseEvent>,
              ) => {
                if (disabled) {
                  e.preventDefault();
                  e.stopPropagation();
                  return;
                }
                if (restProps.onClick) {
                  restProps.onClick(e);
                }
              };
              return (
                <li
                  onClick={handleClick}
                  key={option.value}
                  {...restProps}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    padding: "8px 16px",
                    whiteSpace: "nowrap",
                    cursor: disabled ? "not-allowed" : "pointer",
                    pointerEvents: disabled ? "none" : "auto",
                  }}
                >
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
                    checked={isChecked}
                    disabled={disabled}
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
                        color: mainColor,
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
  return null;
};
