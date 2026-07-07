import { useId } from "react";
import { Box, Radio } from "@mui/material";
import { hceColors, hceTypography } from "../../tokens/hce.tokens";

interface Option<T extends string | boolean> {
  value: T;
  label: string;
}

interface Props<T extends string | boolean> {
  legend?: string;
  value: T | null | undefined;
  onChange: (v: T) => void;
  options: Option<T>[] | readonly Option<T>[];
  disabled?: boolean;
}

export const RadioGroup = <T extends string | boolean>({
  legend,
  value,
  onChange,
  disabled = false,
  options = [
    { value: "si" as unknown as T, label: "Si" },
    { value: "no" as unknown as T, label: "No" },
  ],
}: Props<T>) => {
  const groupName = useId();
  return (
    <Box
      component="fieldset"
      sx={{
        border: `1.5px solid ${disabled ? hceColors.neutro.black[200] : hceColors.primary.green[500]}`,
        borderRadius: "8px",
        px: 2,
        py: 0.2,
        m: 0,
        opacity: disabled ? 0.5 : 1,
        width: "100%",
      }}
    >
      {legend && (
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
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 3,
        }}
      >
        {options.map((opt) => {
          const optionKey = String(opt.value);
          return (
            <Box
              key={optionKey}
              component="label"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.2,
                cursor: disabled ? "not-allowed" : "pointer",
                fontFamily: hceTypography.fontFamily,
                fontSize: "0.875rem",
              }}
            >
              {opt.label}
              <Radio
                name={groupName}
                value={opt}
                checked={value === opt.value}
                onChange={() => {
                  if (!disabled && typeof onChange === "function") {
                    onChange(opt.value);
                  }
                }}
                disabled={disabled}
                style={{ accentColor: hceColors.primary.green[500] }}
              />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
