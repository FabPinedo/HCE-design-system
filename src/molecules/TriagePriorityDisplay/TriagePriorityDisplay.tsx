import type { CSSProperties } from "react"
import "./TriagePriorityDisplay.css"
import { hceTypography, hceTransition } from "../../tokens/hce.tokens"

// ─── Configuración de prioridades ─────────────────────────────────────────────

export type TriagePriority = "I" | "II" | "III" | "IV"

const PRIORITY_CONFIG: Record<TriagePriority, {
  bg:     string
  border: string
  label:  string
  badge:  string
}> = {
  I:   { bg: "#e7bcb9", border: "#a3231b", label: "#a3231b", badge: "#a3231b" },
  II:  { bg: "#fde4bb", border: "#e39922", label: "#e39922", badge: "#e39922" },
  III: { bg: "#eaf2eb", border: "#73a876", label: "#73a876", badge: "#73a876" },
  IV:  { bg: "#bed7bf", border: "#2a722e", label: "#2a722e", badge: "#2a722e" },
}

const PRIORITY_ORDER: TriagePriority[] = ["I", "II", "III", "IV"]

// ─── Props ────────────────────────────────────────────────────────────────────

export interface TriagePriorityDisplayProps {
  /** Prioridad actualmente seleccionada */
  selected?:  TriagePriority | null
  /** Callback al seleccionar. Si no se provee, el componente es solo lectura */
  onSelect?:  (priority: TriagePriority) => void
  readOnly?:  boolean
}

// ─── Componente ───────────────────────────────────────────────────────────────

export function TriagePriorityDisplay({
  selected,
  onSelect,
  readOnly = false,
}: TriagePriorityDisplayProps) {
  const interactive = !readOnly && Boolean(onSelect)

  return (
    <div
      role="radiogroup"
      aria-label="Clasificación de triaje"
      style={{ display: "flex", alignItems: "center", gap: "40px", flexWrap: "wrap" }}
    >
      {PRIORITY_ORDER.map(priority => {
        const cfg      = PRIORITY_CONFIG[priority]
        const isActive = selected === priority
        const Tag = interactive ? "button" : "div"

        return (
          <Tag
            key={priority}
            type={interactive ? "button" : undefined}
            onClick={interactive ? () => onSelect!(priority) : undefined}
            role={interactive ? undefined : "radio"}
            aria-checked={isActive}
            aria-label={`Prioridad ${priority}`}
            className={`hce-triage-pill${interactive ? " hce-triage-pill--interactive" : ""}`}
            style={{
              "--triage-bg-active": cfg.bg,
              "--triage-border":    cfg.border,
              display:         "flex",
              alignItems:      "center",
              gap:             18,
              padding:         "5px 9px",
              borderRadius:    "10px",
              border:          `1.5px solid ${cfg.border}`,
              backgroundColor: isActive ? cfg.bg : "#ffffff",
              cursor:          interactive ? "pointer" : "default",
              transition:      `all ${hceTransition.fast}`,
              outline:         "none",
              boxShadow:       isActive ? `0 2px 8px rgba(0,0,0,0.14)` : "none",
              transform:       isActive ? "scale(1.04)" : "scale(1)",
              boxSizing:       "border-box",
            } as CSSProperties}
          >
            {/* Label "Prioridad" */}
            <span style={{
              fontFamily: hceTypography.fontFamily,
              fontWeight: 600,
              fontSize:   "0.8rem",
              color:      cfg.label,
              lineHeight: 1,
              userSelect: "none",
            }}>
              Prioridad
            </span>

            {/* Badge con numeral romano */}
            <span style={{
              display:         "flex",
              alignItems:      "center",
              justifyContent:  "center",
              minWidth:        30,
              minHeight:       28,
              padding:         "5px 6px",
              borderRadius:    "6px",
              backgroundColor: cfg.badge,
              color:           "#ffffff",
              fontFamily:      hceTypography.fontFamily,
              fontWeight:      700,
              fontSize:        "0.75rem",
              lineHeight:      1,
              userSelect:      "none",
              boxSizing:       "border-box",
            }}>
              {priority}
            </span>
          </Tag>
        )
      })}
    </div>
  )
}
