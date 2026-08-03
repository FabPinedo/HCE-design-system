/**
 * ---------------------------------------------------------
 * Component: EmergencyHeader
 * Description:
 * Barra de encabezado principal del módulo Monitor de Emergencia.
 * Fondo azul marino institucional, full-width.
 *
 * Disposición:
 *   [Logo] [Título del módulo]    →    [Chip fecha/hora] [Chip sede]
 * ---------------------------------------------------------
 */
import type { CSSProperties } from "react"
import { hceTypography, hceClinicalColors, hceShadows, hceZIndex } from "../../tokens/hce.tokens"

interface Props {
  /** Título principal del módulo (ej: "Monitor de Emergencia") */
  title: string
  /** URL del logo de la clínica (opcional) */
  logoSrc?: string
  /** Alt text del logo */
  logoAlt?: string
  /** Fecha y hora formateada (ej: "Lun 09 Mar 2026 — 14:32") */
  dateTime?: string
  /** Nombre de la sede activa */
  sede?: string
}

/** Estilos compartidos para los chips del header */
const chipStyle: CSSProperties = {
  display:         "inline-flex",
  alignItems:      "center",
  backgroundColor: "rgba(255, 255, 255, 0.12)",
  color:           "#FFFFFF",
  border:          "1px solid rgba(255, 255, 255, 0.25)",
  fontFamily:      hceTypography.fontFamilyClinical,
  fontSize:        hceTypography.size.headerMeta,
  fontWeight:      hceTypography.weight.medium,
  textTransform:   "uppercase" as const,
  letterSpacing:   "0.3px",
  height:          28,
  borderRadius:    "4px",
  paddingLeft:      "6px",
  paddingRight:     "10px",
  gap:             "6px",
  boxSizing:       "border-box",
}

const chipIconStyle: CSSProperties = {
  color: "rgba(255, 255, 255, 0.75)",
  display: "flex",
  flexShrink: 0,
}

function CalendarMonthGlyph() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}

function LocationOnGlyph() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

export const EmergencyHeader = ({
  title,
  logoSrc,
  logoAlt = "Logo clínica",
  dateTime,
  sede,
}: Props) => {
  return (
    <header
      style={{
        width:           "100%",
        backgroundColor: hceClinicalColors.headerBg,
        boxShadow:       hceShadows.header,
        display:         "flex",
        alignItems:      "center",
        justifyContent:  "space-between",
        padding:         "0 24px",
        height:          56,
        flexShrink:      0,
        zIndex:          hceZIndex.stickyHeader,
        boxSizing:       "border-box",
      }}
    >
      {/* ─── Izquierda: Logo + Título ─── */}
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        {logoSrc && (
          <img
            src={logoSrc}
            alt={logoAlt}
            style={{ height: 32, objectFit: "contain", flexShrink: 0 }}
          />
        )}
        <h1
          style={{
            fontFamily: hceTypography.fontFamilyClinical,
            fontSize:   hceTypography.size.headerTitle,
            fontWeight: hceTypography.weight.bold,
            color:      "#FFFFFF",
            margin:     0,
            lineHeight: 1,
            userSelect: "none",
          }}
        >
          {title}
        </h1>
      </div>

      {/* ─── Derecha: Chips de contexto ─── */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {dateTime && (
          <span style={chipStyle}>
            <span style={chipIconStyle}><CalendarMonthGlyph /></span>
            {dateTime}
          </span>
        )}
        {sede && (
          <span style={chipStyle}>
            <span style={chipIconStyle}><LocationOnGlyph /></span>
            {sede}
          </span>
        )}
      </div>
    </header>
  )
}
