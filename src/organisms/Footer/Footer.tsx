import { Box, Typography } from "@mui/material"
import { baseColors } from "../../tokens/base.tokens"
import { hceTypography } from "../../tokens/hce.tokens"

type Props = {
  /** Texto de copyright personalizado. Si se omite usa el texto por defecto. */
  copyright?: string
  /** Color de fondo del footer. Por defecto usa baseColors.primary. Ej: hceColors.primary.blue[600] */
  color?: string
}

export function Footer({ copyright, color }: Props) {
  const year = new Date().getFullYear()
  const text = copyright ?? `© ${year} Clínica XXXXXXX · Todos los derechos reservados · Sistema HCE v2.0`

  return (
    <Box
      component="footer"
      sx={{
        width:           "100%",
        py:              "6px",
        px:              3,
        backgroundColor: color ?? baseColors.primary,
        display:         "flex",
        alignItems:      "center",
        justifyContent:  "center",
        flexShrink:      0,
        gap:             1,
      }}
    >
      <Typography sx={{
        fontFamily: hceTypography.fontFamily,
        color:      "rgba(255,255,255,0.6)",
        fontSize:   "0.68rem",
        userSelect: "none",
      }}>
        {text}
      </Typography>
    </Box>
  )
}
