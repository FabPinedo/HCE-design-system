import { Box, Radio } from "@mui/material";
import { hceColors, hceTypography } from "../../tokens/hce.tokens";

interface Props {
  name: string;
  legend: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  disabled?: boolean;
}

export const RadioGroup = ({
  legend = "Radio Group",
  value,
  onChange,
  disabled = false,
  options = ["Si", "No"],
  name,
}: Props) => {
  return (
    <Box
      component="fieldset"
      sx={{
        border: `1.5px solid ${disabled ? hceColors.neutro.black[200] : hceColors.primary.green[500]}`,
        borderRadius: "8px",
        px: 2,
        py: 1,
        m: 0,
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <Box
        component="legend"
        sx={{
          px: 1,
          fontFamily: hceTypography.fontFamily,
          fontSize: "0.72rem",
          fontWeight: 700,
          color: disabled
            ? hceColors.neutro.black[400]
            : hceColors.primary.blue[600],
        }}
      >
        {legend}
      </Box>
      <Box sx={{ display: "flex", gap: 3, mt: "2px" }}>
        {options.map((opt) => (
          <Box
            key={opt}
            component="label"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.2,
              cursor: disabled ? "not-allowed" : "pointer",
              fontFamily: hceTypography.fontFamily,
              fontSize: "16px",
            }}
          >
            {opt}
            <Radio
              name={name}
              value={opt}
              checked={value?.toLocaleLowerCase() === opt.toLocaleLowerCase()}
              onChange={() => {
                if (!disabled && typeof onChange === "function") {
                  onChange(opt);
                }
              }}
              disabled={disabled}
              style={{ accentColor: hceColors.primary.green[500] }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};
