import type { ReactNode } from "react"
import "./MonitoActionBar.css"
import { HceTooltip } from "../../atoms/Tooltip/HceTooltip"
import { hceTypography } from "../../tokens/hce.tokens"
import { UiDoctorIcon } from "../../atoms/Icon/Icon"

// ─── Props ────────────────────────────────────────────────────────────────────

export type MonitoPlacement = "top" | "bottom" | "left" | "right"

/** Una acción del grupo izquierdo de la barra (ícono + tooltip). */
export interface MonitoAction {
  /** Identificador único — se usa como `key` de React, no se muestra. */
  key: string
  /** Ícono a mostrar. Cualquier ReactNode — trae su propio tamaño/color ya resuelto (ej. `<UiStethoscopeIcon size={17} color="currentColor" />`). */
  icon: ReactNode
  /** Texto del tooltip. */
  tooltip: string
  onClick?: () => void
  disabled?: boolean
  /** `aria-label` del botón. Si no se pasa, usa `tooltip`. */
  ariaLabel?: string
}

export interface MonitoActionBarProps {
  /** texto boton derecho */
  labelBtn?:         string
  /**
   * Lista de acciones del grupo izquierdo (ícono + tooltip), en el orden en
   * que se deben mostrar. OBLIGATORIO — este componente ya no trae botones
   * fijos por defecto (antes Triaje/Reportes/Disponibilidad venían
   * hardcodeados); cada consumidor arma su propia lista.
   */
  actions: MonitoAction[]
  /** Callback al presionar Asignar Médicos */
  onAsignarMedicos?: () => void
  /** Deshabilita el botón "Asignar médico". Para el resto de los botones, usá `disabled` en cada `MonitoAction` de `actions`. */
  disabled?: {
    asignarMedicos?: boolean
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
  onAsignarMedicos,
  actions,
  disabled         = {},
  tooltipPlacement = "top",
  orientation      = "horizontal",
  box= false,
  labelBtn
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
        backgroundColor: box ? "#ffffff" : "transparent",
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
      {actions.map((action) => (
        <HceTooltip key={action.key} title={action.tooltip} placement={tooltipPlacement}>
          <button
            type="button"
            className="hce-monito-btn"
            onClick={action.onClick}
            disabled={action.disabled}
            aria-label={action.ariaLabel ?? action.tooltip}
          >
            {action.icon}
          </button>
        </HceTooltip>
      ))}

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
            {labelBtn}
          </span>
        </button>
    </HceTooltip>
    </div>
  )
}
