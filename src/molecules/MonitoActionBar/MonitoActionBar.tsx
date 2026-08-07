import "./MonitoActionBar.css"
import { HceTooltip } from "../../atoms/Tooltip/HceTooltip"
import { hceTypography } from "../../tokens/hce.tokens"
import {
  UiStethoscopeIcon,
  UiDoctorIcon,
  UiPrintingIcon,
  UiMedicalRoomIcon,
} from "../../atoms/Icon/Icon"

// ─── Props ────────────────────────────────────────────────────────────────────

export type MonitoPlacement = "top" | "bottom" | "left" | "right"

export interface MonitoActionBarProps {
  /** Callback al presionar el botón Triaje */
  onTriaje?:         () => void
  /** Callback al presionar Asignar Médicos */
  onAsignarMedicos?: () => void
  /** Callback al presionar Reportes */
  onReportes?:       () => void
  /** Callback al presionar Disponibilidad de Camas */
  onDisponibilidad?: () => void
  /** Deshabilita botones individualmente */
  disabled?: {
    triaje?:         boolean
    asignarMedicos?: boolean
    reportes?:       boolean
    disponibilidad?: boolean
  }
  /**
   * Posición del tooltip respecto al botón.
   * La flecha/conector apunta hacia el botón desde esa dirección.
   * - "top"    → tooltip arriba, flecha apunta abajo    (▼)
   * - "bottom" → tooltip abajo,  flecha apunta arriba   (▲)
   * - "right"  → tooltip derecha, flecha apunta izquierda (◀)
   * - "left"   → tooltip izquierda, flecha apunta derecha (▶)
   * Default: "top"
   */
  tooltipPlacement?: MonitoPlacement
  /** Orientación de la barra (default: "horizontal") */
  orientation?: "horizontal" | "vertical"

  box?: boolean
}

// ─── Componente ───────────────────────────────────────────────────────────────

export function MonitoActionBar({
  onTriaje,
  onAsignarMedicos,
  onReportes,
  onDisponibilidad,
  disabled         = {},
  tooltipPlacement = "top",
  orientation      = "horizontal",
  box= false
}: MonitoActionBarProps) {
  const isVertical = orientation === "vertical"
  const iconSize   = 17

  return (
    <div
      role="toolbar"
      aria-label="Barra de acciones de monitoreo"
      style={{
        display:         "flex",
        flexDirection:   isVertical ? "column" : "row",
        alignItems:      "center",
        justifyContent:  "space-between",
        gap:             "6px",
        padding:         "6px 10px",
        backgroundColor: box ? "var(--ds-color-surface, #ffffff)" : "transparent",
        borderRadius:    box? "10px": 'none',
        boxShadow:       box ? "0 2px 8px rgba(0, 0, 0, 0.08)" : "none",
        border:          box ? "1px solid var(--ds-color-divider, #e6e6e6)" : "none",
        width:           isVertical ? "fit-content" : "100%",
        boxSizing:       "border-box",
      }}
    >

      <div
      style={{
        display:         "flex",
        flexDirection:   isVertical ? "column" : "row",
        alignItems:       isVertical ? "start": "center",

        gap:             "35px",
        padding:         "6px 10px",
        backgroundColor: box ? "var(--ds-color-surface, #ffffff)" : "transparent",
        width:           isVertical ? "fit-content" : "100%",
        boxSizing:       "border-box",
      }}
      >
      {/* Triaje */}
      <HceTooltip title="Triaje" placement={tooltipPlacement}>
        <button
          type="button"
          className="hce-monito-btn"
          onClick={onTriaje}
          disabled={disabled.triaje}
          aria-label="Triaje"
        >
          <UiStethoscopeIcon size={iconSize} color="currentColor" />
        </button>
      </HceTooltip>


      {/* Reportes */}
      <HceTooltip title="Reportes" placement={tooltipPlacement}>
        <button
          type="button"
          className="hce-monito-btn"
          onClick={onReportes}
          disabled={disabled.reportes}
          aria-label="Reportes"
        >
          <UiPrintingIcon size={iconSize} color="currentColor" />
        </button>
      </HceTooltip>

      {/* Disponibilidad de camas */}
      <HceTooltip title="Disponibilidad de camas" placement={tooltipPlacement}>
        <button
          type="button"
          className="hce-monito-btn"
          onClick={onDisponibilidad}
          disabled={disabled.disponibilidad}
          aria-label="Disponibilidad de camas"
        >
          <UiMedicalRoomIcon size={iconSize} color="currentColor" />
        </button>
      </HceTooltip>


     </div>

      {/* Asignar médicos — todo el pill (ícono + texto) es un único botón clickeable */}
     <HceTooltip title="Asignar médicos" placement={tooltipPlacement}>
        <button
          type="button"
          className="hce-monito-pill"
          onClick={onAsignarMedicos}
          disabled={disabled.asignarMedicos}
          aria-label="Asignar médico"
        >
          <UiDoctorIcon
            size={iconSize}
            color="currentColor"
          />

          <span
            style={{
              fontSize: hceTypography.size.md,
              fontWeight: hceTypography.weight.semibold,
              fontFamily: "var(--ds-font-family, 'Poppins', sans-serif)",
              color: "currentColor",
              lineHeight: 1,
              whiteSpace: "nowrap",
            }}
          >
            Asignar médico
          </span>
        </button>
    </HceTooltip>
    </div>
  )
}
