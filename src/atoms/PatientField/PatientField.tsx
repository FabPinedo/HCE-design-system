import type { ReactNode } from "react"
import { hceTypography } from "../../tokens/hce.tokens"
import { Box } from "../Box/Box"
import { Typography } from "../Typography/Typography"

export interface PatientFieldProps {
  /** Etiqueta descriptiva mostrada sobre el valor. */
  label: ReactNode
  /** Dato clínico o demográfico que se desea mostrar. */
  value?: ReactNode | null
  /** Alineación horizontal de la etiqueta y el valor. */
  align?: "left" | "center" | "right"
  /** Contenido utilizado cuando el valor es null, undefined o una cadena vacía. */
  emptyValue?: ReactNode
}

/**
 * Campo de solo lectura para mostrar una etiqueta y su valor asociado.
 * Está pensado para resúmenes de pacientes, fichas clínicas y tarjetas informativas.
 */
export function PatientField({
  label,
  value,
  align = "left",
  emptyValue = "-",
}: PatientFieldProps) {
  const displayedValue =
    value === null || value === undefined || value === ""
      ? emptyValue
      : value

  return (
    <Box sx={{ minWidth: 0, textAlign: align }}>
      <Typography
        component="div"
        sx={{
          mb: 0.5,
          color: "var(--ds-color-primary, #0043a5)",
          fontFamily: hceTypography.fontFamily,
          fontSize: "0.625rem",
          fontWeight: 700,
        }}
      >
        {label}
      </Typography>

      <Typography
        component="div"
        sx={{
          color: "var(--ds-color-primary, #0043a5)",
          fontFamily: hceTypography.fontFamily,
          fontSize: "0.875rem",
          fontWeight: 400,
          overflowWrap: "anywhere",
        }}
      >
        {displayedValue}
      </Typography>
    </Box>
  )
}
