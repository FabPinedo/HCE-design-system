import type { ReactNode } from "react"
import "./HCEQuickAccess.css"

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
        border:          `1px solid ${disabled ? " #e6e6e6" : "var(--ds-color-divider, #e6ecf6)"}`,
        backgroundColor: disabled ? "var(--ds-color-background, #f5f7fa)" : " #ffffff",
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
          backgroundColor: "var(--ds-color-primary-light, #e6ecf6)",
          display:         "flex",
          alignItems:      "center",
          justifyContent:  "center",
          flexShrink:      0,
        }}
      >
        <div style={{
          color:    "var(--ds-color-interactive, #003d96)",
          display:  "flex",
          fontSize: 24,
        }}>
          {icon}
        </div>
      </div>

      {/* Título */}
      <span style={{
        fontFamily: "var(--ds-font-family, 'Poppins', sans-serif)",
        fontWeight: 700,
        fontSize:   "0.92rem",
        color:      "var(--ds-color-text-primary, #374151)",
        lineHeight: 1.3,
      }}>
        {title}
      </span>

      {/* Descripción */}
      <span style={{
        fontFamily: "var(--ds-font-family, 'Poppins', sans-serif)",
        fontSize:   "0.78rem",
        color:      "var(--ds-color-text-secondary, #545454)",
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
