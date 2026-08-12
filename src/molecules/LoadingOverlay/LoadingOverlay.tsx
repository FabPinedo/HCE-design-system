import { type ReactNode } from "react"
import { createPortal } from "react-dom"
import "./LoadingOverlay.css"
import { hceTypography } from "../../tokens/hce.tokens"
import { useDsTenant } from "../../provider/ThemeProvider"
import { getCompanyBranding } from "../../theme/companyBranding"

export interface LoadingOverlayProps {
  /** Muestra u oculta el overlay */
  open:      boolean
  /** Texto opcional bajo el spinner */
  message?:  string
  /** Color opcional del indicador. Sin valor usa el color de la empresa. */
  color?:    string
  /** Tamaño del indicador en px. Default: 150 */
  size?:     number
  /** Duración de una vuelta completa en segundos. Default: 1.5 */
  duration?: number
  /** Duración de cada frame del intro de loaders que lo soporten. */
  frameDuration?: number
  /** Opacidad del fondo oscuro (0–1). Default: 0.45 */
  opacity?:  number
  /** Nodo custom en lugar del spinner (ej. imagen, logo animado) */
  children?: ReactNode
}

export function LoadingOverlay({
  open,
  message,
  color,
  size = 150,
  duration = 1.5,
  frameDuration = 100,
  opacity = 0.45,
  children,
}: LoadingOverlayProps) {
  const tenant = useDsTenant()
  const { LoadingIndicator } = getCompanyBranding(tenant)

  if (!open || typeof document === "undefined") return null

  return createPortal(
    <div
      className="hce-loading-backdrop"
      style={{ backgroundColor: `rgba(0, 0, 0, ${opacity})` }}
    >
      {children ?? (
        <span role="progressbar" aria-label={message ?? "Cargando"}>
          <LoadingIndicator
            size={size}
            duration={duration}
            frameDuration={frameDuration}
            color={color}
          />
        </span>
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
    </div>,
    document.body,
  )
}
