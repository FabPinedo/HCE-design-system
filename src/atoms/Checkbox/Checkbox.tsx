import { Box, FormControlLabel, Checkbox as MuiCheckbox } from "@mui/material";
import { Check } from "@mui/icons-material";
import { hceColors } from "../../tokens/hce.tokens";
interface Props {
  label?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}

export const Checkbox = ({ label, checked, onChange, disabled }: Props) => {
  const checkbox = (
    <MuiCheckbox
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
      <FormControlLabel control={checkbox} label={label} disabled={disabled} />
    );
  }

  return checkbox;
};
