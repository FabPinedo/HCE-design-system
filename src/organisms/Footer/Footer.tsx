import { hceColors, hceTypography } from "../../tokens/hce.tokens"

type Props = {
  /** Texto de copyright personalizado. Si se omite usa el texto por defecto. */
  copyright?: string
  /** Color de fondo del footer. Por defecto usa hceColors.primary.blue[600]. Ej: hceColors.primary.blue[700] */
  color?: string
}

export function Footer({ copyright, color }: Props) {
  const year = new Date().getFullYear()
  const text = copyright ?? `© ${year} Clínica XXXXXXX · Todos los derechos reservados · Sistema HCE v2.0`

  return (
    <footer
      style={{
        width:           "100%",
        padding:         "6px 24px",
        backgroundColor: color ?? hceColors.primary.blue[600],
        display:         "flex",
        alignItems:      "center",
        justifyContent:  "center",
        flexShrink:      0,
        gap:             8,
        boxSizing:       "border-box",
      }}
    >
      <span style={{
        fontFamily: hceTypography.fontFamily,
        color:      "rgba(255,255,255,0.6)",
        fontSize:   "0.68rem",
        userSelect: "none",
      }}>
        {text}
      </span>
    </footer>
  )
}
