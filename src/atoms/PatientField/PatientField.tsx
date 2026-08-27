// atoms/PatientField/PatientField.tsx
import type { ReactNode } from "react"

import { hceColors, hceTypography } from "../../tokens/hce.tokens"
import { Box } from "../Box/Box"
import { Typography } from "../Typography/Typography"

const labelSx = {
  fontFamily: hceTypography.fontFamily,
  fontSize: "0.625rem",
  fontWeight: 700,
  color: hceColors.primary.blue[500],
  lineHeight: 1.2,
  mb: 0.75,
}

const valueSx = {
  fontFamily: hceTypography.fontFamily,
  fontSize: "0.8125rem",
  fontWeight: 400,
  color: hceColors.primary.blue[500],
  lineHeight: 1.3,
}

export interface PatientFieldProps {
  label: string;
  value: ReactNode;
  align?: "left" | "center" | "right";
}

export function PatientField({
  label,
  value,
}: PatientFieldProps) {
  return (
    <Box sx={{ minWidth: 0 }}>
      <Typography sx={labelSx}>
        {label}
      </Typography>

      <Box sx={valueSx}>
        {value}
      </Box>
    </Box>
  )
}