import { Box, FormControlLabel, Checkbox as MuiCheckbox } from "@mui/material";
import { Check } from "@mui/icons-material";
import { hceColors } from "../../tokens/hce.tokens";
interface Props {
  label?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
  sideLabel?: "start" | "end" | "top" | "bottom";
}

export const Checkbox = ({
  label,
  checked,
  onChange,
  disabled,
  sideLabel = "end",
}: Props) => {
  const checkbox = (
    <MuiCheckbox
      sx={{
        paddingRight: 0,
        borderRadius: "8px",
        "&:hover": {
          backgroundColor: "transparent"
        }
      }}
      disabled={disabled}
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      icon={
        <Box
          sx={{
            width: 24,
            height: 24,
            borderRadius: "8px",
            border: `2px solid ${hceColors.primary.green[600]}`,
            backgroundColor: hceColors.primary.green[50],
          }}
        />
      }
      checkedIcon={
        <Box
          sx={{
            width: 24,
            height: 24,
            borderRadius: "8px",
            border: `2px solid ${hceColors.primary.green[600]}`,
            backgroundColor: hceColors.primary.green[600],
          }}
        >
          <Check
            sx={{
              color: hceColors.neutro.white[50],
              fontSize: 20,
            }}
          />
        </Box>
      }
    />
  );

  if (label) {
    return (
      <FormControlLabel
        labelPlacement={sideLabel}
        control={checkbox}
        label={label}
        disabled={disabled}
        sx={{
          display: "flex",
          // "space-between" pegaba el label al checkbox cuando el contenedor no tenía
          // ancho extra (ej. "No identificado" en triaje, dentro de un Box shrink-to-fit).
          // Un gap fijo garantiza separación visible sin importar el ancho del contenedor.
          gap: "6px",
          width: "100%",
          margin: 0
        }}
      />
    );
  }

  return checkbox;
};
