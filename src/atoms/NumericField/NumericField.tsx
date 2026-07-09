import { Box } from "@mui/material"
import { hceColors, hceTypography } from "../../tokens/hce.tokens"
import { FieldCol } from "../FieldCol/FieldCol"

export interface NumericFieldProps {
  label: string
  value: string
  onChange?: (v: string) => void
  /** Unidad mostrada como placeholder dentro del input cuando está vacío (ej. "Kg", "°C"). */
  suffix: string
  /** "decimal" permite coma/punto (ej. peso, temperatura); "natural" solo dígitos enteros. */
  numberType?: "decimal" | "natural"
  readOnly?: boolean
  disabled?: boolean
}

/** Campo numérico con label y unidad como placeholder. */
export function NumericField({
  label,
  value,
  onChange,
  suffix,
  numberType = "decimal",
  readOnly = false,
  disabled = false,
}: NumericFieldProps) {
  return (
    <FieldCol label={label}>
      <Box
        sx={{
          border: `1.5px solid ${hceColors.neutro.black[200]}`,
          borderRadius: "8px",
          width: "100%",
          height: 40,
          display: "flex",
          alignItems: "center",
          boxSizing: "border-box",
          backgroundColor: readOnly ? hceColors.neutro.black[50] : "#ffffff",
          overflow: "hidden",
        }}
      >
        <Box
          component="input"
          disabled={disabled}
          type="text"
          inputMode={numberType === "decimal" ? "decimal" : "numeric"}
          value={value}
          placeholder={suffix || undefined}
          readOnly={readOnly}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange?.(
              numberType === "decimal"
                ? e.target.value.replace(/[^\d.,]/g, "")
                : e.target.value.replace(/[^\d]/g, ""),
            )
          }
          sx={{
            px: 1.5,
            border: "none",
            outline: "none",
            fontFamily: hceTypography.fontFamily,
            fontSize: "0.875rem",
            backgroundColor: "transparent",
            color: hceColors.neutro.black[700],
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
            "&::placeholder": { color: hceColors.neutro.black[300] },
          }}
        />
      </Box>
    </FieldCol>
  )
}
