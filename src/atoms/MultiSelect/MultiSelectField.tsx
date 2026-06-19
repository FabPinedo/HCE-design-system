import {
  Autocomplete,
  Box,
  Checkbox,
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
import { CheckBoxOutlineBlank, CheckBoxOutlined } from "@mui/icons-material";

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
            multiple
            disabled={disabled}
            disableCloseOnSelect
            onChange={(_, newValue) => {
              const values = newValue.map((item) => item.value);
              onChange(values);
            }}
            options={options}
            renderValue={() => null}
            value={selectedOptions ?? []}
            getOptionLabel={(option) => option.label}
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
                    padding: "12px 16px",
                  }}
                >
                  {option.label}
                  <Checkbox
                    icon={<CheckBoxOutlineBlank fontSize="small" />}
                    checkedIcon={<CheckBoxOutlined fontSize="small" />}
                    checked={selected}
                    sx={{
                      color: hceColors.primary.green[600],
                      borderRadius: "6px",
                      "&.Mui-checked": {
                        color: hceColors.primary.green[600],
                      },
                      "& .MuiSvgIcon-root": {
                        borderRadius: "6px",
                      },
                    }}
                  />
                </li>
              );
            }}
            renderInput={(params) => (
              <FormControl fullWidth={fullWidth}>
                <OutlinedInput
                  required={required}
                  fullWidth={fullWidth}
                  size="small"
                  inputProps={{ ...params.inputProps, placeholder }}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && !inputValue) {
                      e.stopPropagation();
                    }
                  }}
                  inputRef={params.InputProps.ref}
                  label="Empresas"
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
            )}
          />
        </FormControl>
      </Box>
    );
  }
};
