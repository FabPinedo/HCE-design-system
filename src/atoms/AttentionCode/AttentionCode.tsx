/**
 * ---------------------------------------------------------
 * Component: AttentionCode
 * Description:
 * Muestra el código alfanumérico único de atención del paciente
 * (ej: E097382) en fuente monoespaciada para facilitar la lectura
 * y el copiado por parte del personal clínico.
 *
 * Uso:
 *   <AttentionCode code="E097382" />
 * ---------------------------------------------------------
 */
import { Typography } from "@mui/material"
import { hceTypography, hceUi } from "../../tokens/hce.tokens"

interface Props {
  /** Código alfanumérico de atención (ej: "E097382") */
  code: string
}

/**
 * AttentionCode
 *
 * Texto monoespaciado, 13px, color primario.
 * Sin decoraciones adicionales.
 */
export const AttentionCode = ({ code }: Props) => {
  return (
    <Typography
      component="span"
      sx={{
        fontFamily:    hceTypography.fontFamilyClinical,
        fontSize:      hceTypography.size.tableCell,
        fontWeight:    hceTypography.weight.semibold,
        color:         hceUi.textPrimaryTable,
        letterSpacing: "0.5px",
        display:       "inline-block",
      }}
      aria-label={`Código de atención: ${code}`}
    >
      {code}
    </Typography>
  )
}
