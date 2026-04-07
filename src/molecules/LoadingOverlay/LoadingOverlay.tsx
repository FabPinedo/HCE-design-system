import { type ReactNode } from "react"
import Backdrop          from "@mui/material/Backdrop"
import CircularProgress  from "@mui/material/CircularProgress"
import Typography        from "@mui/material/Typography"
import { hceColors }     from "../../tokens/hce.tokens"

export interface LoadingOverlayProps {
  /** Muestra u oculta el overlay */
  open:      boolean
  /** Texto opcional bajo el spinner */
  message?:  string
  /** Color del spinner. Default: azul corporativo */
  /** Color del spinner. Default: hceColors.primary.blue[600] */
  color?:    string
  /** Opacidad del fondo oscuro (0–1). Default: 0.45 */
  opacity?:  number
  /** Nodo custom en lugar del CircularProgress (ej. imagen, logo animado) */
  children?: ReactNode
}

export function LoadingOverlay({
  open,
  message,
  color   = hceColors.primary.blue[600],
  opacity = 0.45,
  children,
}: LoadingOverlayProps) {
  return (
    <Backdrop
      open={open}
      sx={{
        zIndex:          9999,
        backgroundColor: `rgba(0, 0, 0, ${opacity})`,
        display:         "flex",
        flexDirection:   "column",
        alignItems:      "center",
        gap:             2,
      }}
    >
      {children ?? (
        <CircularProgress
          size={56}
          thickness={4}
          sx={{ color }}
        />
      )}

      {message && (
        <Typography sx={{
          color:      "#fff",
          fontWeight: 600,
          fontSize:   "0.9rem",
          letterSpacing: "0.02em",
        }}>
          {message}
        </Typography>
      )}
    </Backdrop>
  )
}
