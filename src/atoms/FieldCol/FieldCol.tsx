import { Box, Typography } from "@mui/material"
import type { ReactNode } from "react"
import { hceColors, hceTypography } from "../../tokens/hce.tokens"

export interface FieldColProps {
  label: string
  children: ReactNode
  flex?: number | string
  /** Ancho mínimo antes de que el campo se comprima — útil en filas flex-wrap. */
  minWidth?: number | string
}

/** Columna label + control, usada como wrapper de campos de formulario (ej. NumericField). */
export function FieldCol({ label, children, flex = 1, minWidth }: FieldColProps) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "4px", flex, minWidth }}>
      <Typography
        sx={{
          fontFamily: hceTypography.fontFamily,
          fontSize: "0.72rem",
          fontWeight: 600,
          color: hceColors.primary.blue[600],
        }}
      >
        {label}
      </Typography>
      {children}
    </Box>
  )
}
