import { type CSSProperties, type ReactNode } from "react"
import "./LoadingOverlay.css"
import { hceColors, hceTypography } from "../../tokens/hce.tokens"

export interface LoadingOverlayProps {
  /** Muestra u oculta el overlay */
  open:      boolean
  /** Texto opcional bajo el spinner */
  message?:  string
  /** Color del spinner. Default: hceColors.primary.blue[600] */
  color?:    string
  /** Opacidad del fondo oscuro (0–1). Default: 0.45 */
  opacity?:  number
  /** Nodo custom en lugar del spinner (ej. imagen, logo animado) */
  children?: ReactNode
}

export function LoadingOverlay({
  open,
  message,
  color   = hceColors.primary.blue[600],
  opacity = 0.45,
  children,
}: LoadingOverlayProps) {
  if (!open) return null

  return (
    <div
      className="hce-loading-backdrop"
      style={{ backgroundColor: `rgba(0, 0, 0, ${opacity})` }}
    >
      {children ?? (
        <span className="hce-loading-spinner" style={{ "--spinner-color": color } as CSSProperties} role="progressbar" aria-label={message ?? "Cargando"} />
      )}

      {message && (
        <span style={{
          fontFamily:    hceTypography.fontFamily,
          color:         "#fff",
          fontWeight:    600,
          fontSize:      "0.9rem",
          letterSpacing: "0.02em",
        }}>
          {message}
        </span>
      )}
    </div>
  )
}
