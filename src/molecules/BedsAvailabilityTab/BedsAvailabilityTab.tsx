/**
 * ---------------------------------------------------------
 * Component: BedsAvailabilityTab
 * Description:
 * Tab lateral fija en el borde derecho de la pantalla.
 * Texto vertical (writing-mode) para acceder rápidamente al
 * panel de disponibilidad de camas.
 * ---------------------------------------------------------
 */
import "./BedsAvailabilityTab.css"
import { hceShadows, hceZIndex, hceTypography } from "../../tokens/hce.tokens"

interface Props {
  /** Callback al hacer click en el tab */
  onClick?:  () => void
  /** Texto del tab (default: "Ver disponibilidad de camas") */
  label?:    string
  /** Si el panel de camas está actualmente abierto */
  isActive?: boolean
  /** Hook de pruebas E2E — `data-testid` en el nodo raíz. */
  testId?: string
}

/** Ícono de cama (King Bed) — evita depender del sistema de íconos (se
 *  integra en el paso dedicado a íconos). */
function KingBedGlyph() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 9V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4" />
      <path d="M14 9V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4" />
      <path d="M2 11h20v6H2z" />
      <path d="M4 17v3" />
      <path d="M20 17v3" />
    </svg>
  )
}

export const BedsAvailabilityTab = ({
  onClick,
  label = "Ver disponibilidad de camas",
  isActive = false,
  testId,
}: Props) => {
  return (
    <div
      className={`hce-beds-tab${isActive ? " hce-beds-tab--active" : ""}`}
      onClick={onClick}
      data-testid={testId}
      role="button"
      tabIndex={0}
      aria-label={label}
      aria-pressed={isActive}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick?.()
      }}
      style={{
        boxShadow: hceShadows.tab,
        zIndex:    hceZIndex.sideTab,
      }}
    >
      {/* Ícono: contra-rotado para que no quede invertido */}
      <span style={{ transform: "rotate(180deg)", flexShrink: 0, display: "flex" }}>
        <KingBedGlyph />
      </span>

      {/* Texto vertical de abajo hacia arriba */}
      <span
        style={{
          fontFamily:    "var(--ds-font-family, 'Poppins', sans-serif)",
          fontSize:      "12px",
          fontWeight:    hceTypography.weight.semibold,
          whiteSpace:    "nowrap",
          letterSpacing: "0.4px",
          lineHeight:    1,
        }}
      >
        {label}
      </span>
    </div>
  )
}
