// atoms/PatientField/PatientField.tsx
import type { CSSProperties, ReactNode } from "react"

import { hceColors, hceTypography } from "../../tokens/hce.tokens"
import { Box } from "../Box/Box"
import { Typography } from "../Typography/Typography"
import type { SxProps } from "../../utils/sx"

const labelSx = {
  fontFamily: hceTypography.fontFamily,
  fontSize: "0.625rem",
  fontWeight: 700,
  color: hceColors.primary.blue[500],
  lineHeight: 1.2,
  mb: 0.75,
}

const valueSx: SxProps = {
  fontFamily: hceTypography.fontFamily,
  fontSize: "0.8125rem",
  fontWeight: 400,
  color: hceColors.primary.blue[500],
  lineHeight: 1.3,
  overflowWrap: "break-word", // para que el valor se rompa en varias líneas si es muy largo
  wordBreak: "break-word",
}

export interface PatientFieldProps {
  label: string;
  value: ReactNode;
  /**
   * Alineación del contenido (label + value). Se aplica como `textAlign` al
   * contenedor raíz — ni el label ni el value fuerzan su propio `textAlign`,
   * así que ambos lo heredan por CSS normal.
   * @default "left"
   */
  align?: "left" | "center" | "right";
  /**
   * Hook de pruebas E2E (Playwright) — se renderiza como `data-testid` en el
   * contenedor raíz. Convención: `{microfrontend}-{componente}[-elemento][-instancia]`
   * (ver docs/testing-convention.md). No usar datos identificables del
   * paciente (nombre, DNI) como valor — solo ids técnicos opacos.
   */
  testId?: string;
  /** Clase CSS extra en el contenedor raíz — escape-hatch para reglas que `sx` no puede expresar. */
  className?: string;
  /** Estilo inline adicional, mergeado sobre los estilos por defecto del contenedor raíz. */
  style?: CSSProperties;
}

export function PatientField({
  label,
  value,
  align = "left",
  testId,
  className,
  style,
}: PatientFieldProps) {
  return (
    <Box
      data-testid={testId}
      className={className}
      style={style}
      sx={{ minWidth: 0, textAlign: align }}
    >
      <Typography sx={labelSx}>
        {label}
      </Typography>

      <Box sx={valueSx}>
        {value}
      </Box>
    </Box>
  )
}