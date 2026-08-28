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
import { hceTypography } from "../../tokens/hce.tokens"

interface Props {
  /** Código alfanumérico de atención (ej: "E097382") */
  code: string
  bold?: boolean
  /** Hook de pruebas E2E — `data-testid` en el nodo raíz. */
  testId?: string
}

/**
 * AttentionCode
 *
 * Texto monoespaciado, 13px, color primario.
 * Sin decoraciones adicionales.
 */
export const AttentionCode = ({ code, bold, testId }: Props) => {
  return (
    <span
      data-testid={testId}
      style={{
        fontFamily:    hceTypography.fontFamilyClinical,
        fontSize:      hceTypography.size.base,
        fontWeight:    bold ? hceTypography.weight.bold : hceTypography.weight.regular,
        color:         "var(--ds-color-primary, #374151)",
        letterSpacing: "0.5px",
        display:       "inline-block",
      }}
      aria-label={`Código de atención: ${code}`}
    >
      {code}
    </span>
  )
}
