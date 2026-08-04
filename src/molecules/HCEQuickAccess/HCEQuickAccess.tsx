import type { ReactNode } from "react"
import "./HCEQuickAccess.css"
import { hceColors, hceTypography } from "../../tokens/hce.tokens"

export type HCEQuickAccessProps = {
  /** Icono a mostrar dentro del cuadro azul (ReactNode — cualquier SVG o componente) */
  icon:         ReactNode
  /** Título del módulo */
  title:        string
  /** Descripción corta */
  description:  string
  /** Callback del botón "Acceder" */
  onAcceder?:   () => void
  /** Si true, el card y el botón aparecen deshabilitados */
  disabled?:    boolean
}

export function HCEQuickAccess({
  icon,
  title,
  description,
  onAcceder,
  disabled = false,
}: HCEQuickAccessProps) {
  return (
    <div
      className={`hce-quickaccess${!disabled ? " hce-quickaccess--enabled" : ""}`}
      style={{
        border:          `1px solid ${disabled ? "#e0e0e0" : hceColors.primary.blue[100]}`,
        backgroundColor: disabled ? "#fafafa" : "white",
        opacity:         disabled ? 0.6 : 1,
        cursor:          disabled ? "not-allowed" : "default",
      }}
    >
      {/* Icono en cuadro azul */}
      <div
        className="hce-quickaccess-icon-box"
        style={{
          width:           48,
          height:          48,
          borderRadius:    "10px",
          backgroundColor: hceColors.primary.blue[50],
          display:         "flex",
          alignItems:      "center",
          justifyContent:  "center",
          flexShrink:      0,
        }}
      >
        <div style={{
          color:    hceColors.primary.blue[600],
          display:  "flex",
          fontSize: 24,
        }}>
          {icon}
        </div>
      </div>

      {/* Título */}
      <span style={{
        fontFamily: hceTypography.fontFamily,
        fontWeight: 700,
        fontSize:   "0.92rem",
        color:      "#1a1a2e",
        lineHeight: 1.3,
      }}>
        {title}
      </span>

      {/* Descripción */}
      <span style={{
        fontFamily: hceTypography.fontFamily,
        fontSize:   "0.78rem",
        color:      "#666",
        lineHeight: 1.5,
        flex:       1,
      }}>
        {description}
      </span>

      {/* Botón Acceder */}
      <button
        type="button"
        className="hce-quickaccess-btn"
        disabled={disabled}
        onClick={disabled ? undefined : onAcceder}
      >
        Acceder
      </button>
    </div>
  )
}
