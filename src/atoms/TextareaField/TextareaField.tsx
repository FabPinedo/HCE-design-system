import { Box, Typography } from "@mui/material"
import { useId } from "react"
import { hceColors, hceTypography } from "../../tokens/hce.tokens"

export interface TextareaFieldProps {
  label: string
  value: string
  onChange: (v: string) => void
  maxLength?: number
  placeholder?: string
  disabled?: boolean
}

/** Textarea con label y contador de caracteres. */
export function TextareaField({
  label,
  value,
  onChange,
  maxLength = 100,
  placeholder = "Ingrese texto",
  disabled = false
}: TextareaFieldProps) {
  const id = useId()
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      <Typography
        component="label"
        htmlFor={id}
        sx={{
          fontFamily: hceTypography.fontFamily,
          fontSize: "0.72rem",
          fontWeight: 600,
          color: hceColors.neutro.black[400],
        }}
      >
        {label}
      </Typography>
      <Box
        sx={{
          position: "relative",
          border: `1.5px solid ${hceColors.neutro.black[200]}`,
          borderRadius: "8px",
          backgroundColor: "#fff",
        }}
      >
        <Box
          id={id}
          disabled = {disabled}
          component="textarea"
          value={value}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            onChange(e.target.value.slice(0, maxLength))
          }
          maxLength={maxLength}
          placeholder={placeholder}
          rows={3}
          sx={{
            display: "block",
            width: "100%",
            p: "10px 12px",
            border: "none",
            outline: "none",
            resize: "none",
            fontFamily: hceTypography.fontFamily,
            fontSize: "0.875rem",
            color: hceColors.neutro.black[700],
            backgroundColor: "transparent",
            boxSizing: "border-box",
            "&::placeholder": { color: hceColors.neutro.black[300] },
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: 6,
            right: 10,
            fontFamily: hceTypography.fontFamily,
            fontSize: "0.65rem",
            color: hceColors.neutro.black[300],
          }}
        >
          {value.length}/{maxLength}
        </Box>
      </Box>
    </Box>
  )
}
