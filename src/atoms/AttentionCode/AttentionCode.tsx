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
import { emergencyTokens } from "../../tokens/emergency.tokens"
import { baseTokens } from "../../tokens/base.tokens"

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
        fontFamily:    emergencyTokens.typography.fontFamily,
        fontSize:      emergencyTokens.typography.size.tableCell,
        fontWeight:    emergencyTokens.typography.weight.semibold,
        color:         baseTokens.colors.textPrimaryTable,
        letterSpacing: "0.5px",
        display:       "inline-block",
      }}
      aria-label={`Código de atención: ${code}`}
    >
      {code}
    </Typography>
  )
}
