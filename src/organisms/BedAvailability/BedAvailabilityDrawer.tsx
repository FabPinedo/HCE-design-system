import { useState }                                    from "react"
import "./BedAvailabilityDrawer.css"
import { Overlay }                                     from "../../atoms/Overlay/Overlay"
import { Tooltip }                                     from "../../atoms/Tooltip/Tooltip"
import { Button }                                      from "../../atoms/Button/Button"
import { CloseIcon, ChevronDownIcon }                   from "../../atoms/Icon/SvgIconsHce"
import { hceClinicalColors, hceTypography, hceBorderRadius, hceSpacing } from "../../tokens/hce.tokens"
import { BedsAvailabilityTab }                          from "../../molecules/BedsAvailabilityTab/BedsAvailabilityTab"
import { PriorityBadge }                                from "../../atoms/PriorityBadge/PriorityBadge"
import type { PriorityLevel }                           from "../../atoms/PriorityBadge/PriorityBadge"
import type { ReactNode }                               from "react"

// ─── Tipos internos ───────────────────────────────────────
type BoxOccupied = {
  label:    string
  status:   "ocupado"
  priority: PriorityLevel
  patient:  string
  age:      number | string
  sex:      string
  doctor:   string
}
type BoxFree = {
  label:  string
  status: "disponible" | "mantenimiento"
}
type BoxData = BoxOccupied | BoxFree

type WaitingPatient = {
  id:     string
  name:   string
  age:    number | string
  sex:    string
  doctor: string
  type:   "espera" | "tp"
}

/** Ícono de cama (King Bed) — inline, ver misma nota en BedsAvailabilityTab.tsx */
function KingBedGlyph({ size = 24, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 9V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4" />
      <path d="M14 9V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4" />
      <path d="M2 11h20v6H2z" />
      <path d="M4 17v3" />
      <path d="M20 17v3" />
    </svg>
  )
}

// ─── Data ─────────────────────────────────────────────────
const BOXES: BoxData[] = [
  { label: "Box 1",  status: "ocupado", priority: 1, patient: "Vera, Alejandro",    age: 58, sex: "M", doctor: "Dr. Muñoz"      },
  { label: "Box 2",  status: "ocupado", priority: 1, patient: "Mardones, Carolina", age: 34, sex: "F", doctor: "Dr. Pérez"      },
  { label: "Box 3",  status: "ocupado", priority: 2, patient: "Díaz, Francisca",    age: 48, sex: "F", doctor: "Dr. Medina"     },
  { label: "Box 4",  status: "ocupado", priority: 2, patient: "Fuentes, Roberto",   age: 67, sex: "M", doctor: "Dra. Sandoval"  },
  { label: "Box 5",  status: "ocupado", priority: 3, patient: "Núñez, Patricia",    age: 72, sex: "F", doctor: "Dr. Reyes"      },
  { label: "Box 6",  status: "ocupado", priority: 3, patient: "Herrera, Felipe",    age: 19, sex: "M", doctor: "Dr. Vega"       },
  { label: "Box 7",  status: "ocupado", priority: 3, patient: "Soto, Marcelo",      age: 38, sex: "M", doctor: "Dr. Mendoza"    },
  { label: "Box 8",  status: "ocupado", priority: 4, patient: "Villalobos, Jorge",  age: 44, sex: "M", doctor: "Dra. Contreras" },
  { label: "Box 9",  status: "ocupado", priority: 4, patient: "Riquelme, Andrea",   age: 29, sex: "F", doctor: "Dr. Flores"     },
  { label: "Box 10", status: "ocupado", priority: 4, patient: "Poblete, Rodrigo",   age: 76, sex: "M", doctor: "Dr. Silva"      },
  { label: "Box 11", status: "ocupado", priority: 3, patient: "González, Raúl",     age: 61, sex: "M", doctor: "Dra. Campos"    },
  { label: "Box 12", status: "ocupado", priority: 4, patient: "Salinas, Verónica",  age: 37, sex: "F", doctor: "Dr. Ibáñez"     },
  { label: "Box 13", status: "disponible"    },
  { label: "Box 14", status: "disponible"    },
  { label: "Box 15", status: "mantenimiento" },
]

const WAITING: WaitingPatient[] = [
  { id: "p04", name: "Espinoza, Valentina", age: 28, sex: "F", doctor: "Dr. Castillo",    type: "espera" },
  { id: "p08", name: "Castro, Daniela",     age: 51, sex: "F", doctor: "Dra. Rojas",      type: "espera" },
  { id: "p13", name: "Araya, Tomás",        age: 55, sex: "M", doctor: "Dra. Gutiérrez",  type: "espera" },
  { id: "p16", name: "Bravo, Constanza",    age: 22, sex: "F", doctor: "Dr. Ortega",      type: "espera" },
  { id: "p17", name: "Lagos, Cristóbal",    age: 33, sex: "M", doctor: "Dra. Valenzuela", type: "espera" },
  { id: "p05", name: "Morales, Eduardo",    age: 45, sex: "M", doctor: "Dra. Torres",     type: "tp"     },
  { id: "p10", name: "Pizarro, Sofía",      age: 63, sex: "F", doctor: "Dr. Alvarado",    type: "tp"     },
  { id: "p14", name: "Paredes, Isabel",     age: 41, sex: "F", doctor: "Dr. Ramírez",     type: "tp"     },
]

const BOX_STATUS_COLOR = {
  disponible:    hceClinicalColors.boxActive,
  mantenimiento: hceClinicalColors.priority2,
}

const PRIORITY_LABEL: Record<string, string> = {
  "1": "Crítico",
  "2": "Urgente",
  "3": "Moderado",
  "4": "Leve",
}

// ─── SummaryChip ──────────────────────────────────────────
function SummaryChip({ label, count, color }: { label: string; count: number; color: string }) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "12px 0" }}>
      <span style={{
        fontFamily: hceTypography.fontFamilyClinical,
        fontSize:   "22px",
        fontWeight: hceTypography.weight.bold,
        color,
        lineHeight: 1,
      }}>
        {count}
      </span>
      <span style={{
        fontFamily: hceTypography.fontFamilyClinical,
        fontSize:   "10px",
        color:      hceClinicalColors.textSecondary,
        marginTop:  "4px",
        textAlign:  "center",
      }}>
        {label}
      </span>
    </div>
  )
}

function VDivider() {
  return <div style={{ width: 1, alignSelf: "stretch", backgroundColor: hceClinicalColors.border, flexShrink: 0 }} />
}

// ─── SummaryGroup: grupo de chips con etiqueta superior ───
function SummaryGroup({ title, flex, children }: { title: string; flex: number; children: ReactNode }) {
  return (
    <div style={{ flex, display: "flex", flexDirection: "column" }}>
      <span style={{
        fontFamily:    hceTypography.fontFamilyClinical,
        fontSize:      "9px",
        fontWeight:    700,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        color:         hceClinicalColors.textSecondary,
        textAlign:     "center",
        paddingTop:    "6px",
        paddingBottom: "2px",
        opacity:       0.7,
      }}>
        {title}
      </span>
      <div style={{ display: "flex", flex: 1 }}>
        {children}
      </div>
    </div>
  )
}

// ─── BoxCell ──────────────────────────────────────────────
function BoxCell({ box }: { box: BoxData }) {
  const isOccupied   = box.status === "ocupado"
  const isDisponible = box.status === "disponible"

  const borderColor = isOccupied
    ? hceClinicalColors[`priority${(box as BoxOccupied).priority}` as keyof typeof hceClinicalColors] as string
    : BOX_STATUS_COLOR[box.status as keyof typeof BOX_STATUS_COLOR]

  const bgColor = isOccupied
    ? `${borderColor}18`
    : isDisponible
      ? `${hceClinicalColors.boxActive}12`
      : `${hceClinicalColors.priority2}12`

  const tooltipContent = isOccupied ? (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px", padding: "2px" }}>
      <span style={{ fontFamily: hceTypography.fontFamilyClinical, fontSize: "13px", fontWeight: 700, color: "#fff" }}>
        {(box as BoxOccupied).patient}
      </span>
      <span style={{ fontFamily: hceTypography.fontFamilyClinical, fontSize: "11px", color: "#d1d5db" }}>
        {(box as BoxOccupied).age} años · {(box as BoxOccupied).sex}
      </span>
      <span style={{ fontFamily: hceTypography.fontFamilyClinical, fontSize: "11px", color: "#d1d5db" }}>
        {(box as BoxOccupied).doctor}
      </span>
      <span style={{
        marginTop: "2px", alignSelf: "flex-start",
        padding: "2px 8px",
        borderRadius:    hceBorderRadius.pill,
        backgroundColor: borderColor,
        fontSize: "10px", fontWeight: 700, color: "#fff",
        fontFamily: hceTypography.fontFamilyClinical,
        display: "inline-block",
      }}>
        P{(box as BoxOccupied).priority} — {PRIORITY_LABEL[String((box as BoxOccupied).priority)]}
      </span>
    </div>
  ) : isDisponible ? "Disponible — listo para asignar" : "En mantenimiento"

  return (
    <Tooltip title={tooltipContent} placement="top" arrow>
      <div
        className="hce-baddrawer-boxcell"
        style={{
          width:           "100%",
          display:         "flex",
          flexDirection:   "column",
          alignItems:      "center",
          justifyContent:  "center",
          gap:             "6px",
          padding:         "12px 8px 10px",
          borderRadius:    hceBorderRadius.lg,
          border:          `2px solid ${borderColor}`,
          borderStyle:     isOccupied ? "solid" : "dashed",
          backgroundColor: bgColor,
          minHeight:       "72px",
          cursor:          "default",
          opacity:         box.status === "mantenimiento" ? 0.6 : 1,
          boxSizing:       "border-box",
        }}
      >
        <span style={{
          fontFamily: hceTypography.fontFamilyClinical,
          fontSize:   "12px",
          fontWeight: hceTypography.weight.bold,
          color:      hceClinicalColors.textPrimary,
        }}>
          {box.label}
        </span>

        {isOccupied && <PriorityBadge priority={(box as BoxOccupied).priority} tooltipText="" />}

        {!isOccupied && (
          <span style={{
            fontSize:      "9px",
            fontWeight:    700,
            fontFamily:    hceTypography.fontFamilyClinical,
            color:         borderColor,
            textTransform: "uppercase",
            letterSpacing: "0.04em",
          }}>
            {isDisponible ? "Libre" : "Mant."}
          </span>
        )}
      </div>
    </Tooltip>
  )
}

// ─── WaitingRow ───────────────────────────────────────────
function WaitingRow({ p, onAssign }: { p: WaitingPatient; onAssign: (id: string) => void }) {
  const isTP      = p.type === "tp"
  const typeColor = isTP ? hceClinicalColors.priority2 : hceClinicalColors.boxWaiting
  const typeLabel = isTP ? "Triage" : "En espera"

  return (
    <div style={{
      display:         "flex",
      alignItems:      "center",
      gap:             hceSpacing[3],
      padding:         `${hceSpacing[2]} ${hceSpacing[3]}`,
      borderRadius:    hceBorderRadius.lg,
      backgroundColor: hceClinicalColors.rowAlternate,
      border:          `1px solid ${hceClinicalColors.border}`,
      borderLeft:      `4px solid ${typeColor}`,
      boxSizing:       "border-box",
    }}>
      {/* Tipo */}
      <div style={{ minWidth: 60 }}>
        <span style={{
          fontFamily:    hceTypography.fontFamilyClinical,
          fontSize:      hceTypography.size.badge,
          fontWeight:    hceTypography.weight.bold,
          color:         typeColor,
          textTransform: "uppercase",
          letterSpacing: "0.04em",
        }}>
          {typeLabel}
        </span>
      </div>

      <VDivider />

      {/* Info del paciente */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily:   hceTypography.fontFamilyClinical,
          fontSize:     hceTypography.size.tableCell,
          fontWeight:   hceTypography.weight.semibold,
          color:        hceClinicalColors.textPrimary,
          whiteSpace:   "nowrap",
          overflow:     "hidden",
          textOverflow: "ellipsis",
        }}>
          {p.name}
        </div>
        <div style={{
          fontFamily: hceTypography.fontFamilyClinical,
          fontSize:   "11px",
          color:      hceClinicalColors.textSecondary,
          marginTop:  "2px",
        }}>
          {p.age} años · {p.sex} · {p.doctor}
        </div>
      </div>

      {/* Botón asignar */}
      <div className="hce-baddrawer-assign-btn" style={{ borderRadius: hceBorderRadius.md }}>
        <Button
          size="sm"
          variant="outlined"
          onClick={() => onAssign(p.id)}
          color={hceClinicalColors.boxActive}
        >
          Asignar Box
        </Button>
      </div>
    </div>
  )
}

// ─── PriorityLegend ───────────────────────────────────────
function PriorityLegend() {
  const items = [
    { label: "P1 Crítico",  color: hceClinicalColors.priority1 },
    { label: "P2 Urgente",  color: hceClinicalColors.priority2 },
    { label: "P3 Moderado", color: hceClinicalColors.priority3 },
    { label: "P4 Leve",     color: hceClinicalColors.priority4 },
    { label: "Libre",       color: hceClinicalColors.boxActive,  dashed: true },
    { label: "Mant.",       color: hceClinicalColors.priority2,  dashed: true, dim: true },
  ]
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 14px", marginTop: hceSpacing[2] }}>
      {items.map(item => (
        <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <span style={{
            width:           10,
            height:          10,
            borderRadius:    "50%",
            backgroundColor: item.dashed ? "transparent" : item.color,
            border:          item.dashed ? `2px dashed ${item.color}` : "none",
            opacity:         item.dim ? 0.6 : 1,
            display:         "inline-block",
          }} />
          <span style={{
            fontFamily: hceTypography.fontFamilyClinical,
            fontSize:   "10px",
            color:      hceClinicalColors.textSecondary,
          }}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  )
}

// ─── Componente principal ─────────────────────────────────
export function BedAvailabilityDrawer() {
  const [open, setOpen] = useState(false)
  const [waitingExpanded, setWaitingExpanded] = useState(false)

  const ocupados      = BOXES.filter(b => b.status === "ocupado").length
  const disponibles   = BOXES.filter(b => b.status === "disponible").length
  const mantenimiento = BOXES.filter(b => b.status === "mantenimiento").length
  const enEspera      = WAITING.filter(w => w.type === "espera").length
  const enTriage      = WAITING.filter(w => w.type === "tp").length

  const handleAssign = (patientId: string) => {
    const available = BOXES.find(b => b.status === "disponible")
    if (available) {
      console.info(`[BedAvailabilityDrawer] Asignar paciente ${patientId} → ${available.label}`)
    } else {
      console.warn("[BedAvailabilityDrawer] No hay boxes disponibles")
    }
  }

  // Nota: el cierre por Escape ahora lo maneja internamente Overlay
  // (useFocusTrap) — el useEffect con addEventListener("keydown") propio
  // que había acá ya no hace falta.

  return (
    <>
      <BedsAvailabilityTab isActive={open} onClick={() => setOpen(true)} />

      <Overlay
        open={open}
        onClose={() => setOpen(false)}
        variant="drawer-right"
        panelClassName="hce-baddrawer-panel"
        labelledBy="hce-baddrawer-title"
      >
        {/* ── Header ── */}
        <div style={{
          display:         "flex",
          justifyContent:  "space-between",
          alignItems:      "center",
          padding:         `${hceSpacing[3]} ${hceSpacing[4]}`,
          backgroundColor: hceClinicalColors.headerBg,
          flexShrink:      0,
          boxSizing:       "border-box",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: hceSpacing[3] }}>
            <KingBedGlyph size={24} color="#fff" />
            <div>
              <div id="hce-baddrawer-title" style={{
                fontFamily: hceTypography.fontFamilyClinical,
                fontSize:   "16px",
                fontWeight: hceTypography.weight.bold,
                color:      "#fff",
              }}>
                Disponibilidad de Boxes
              </div>
              <div style={{
                fontFamily: hceTypography.fontFamilyClinical,
                fontSize:   "12px",
                color:      "rgba(255,255,255,0.75)",
                marginTop:  "2px",
              }}>
                {BOXES.length} boxes · {WAITING.length} pacientes sin box
              </div>
            </div>
          </div>
          <button
            type="button"
            className="hce-baddrawer-close"
            onClick={() => setOpen(false)}
            aria-label="Cerrar"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 28,
              height: 28,
              color: "#fff",
              backgroundColor: "rgba(255,255,255,0.12)",
              borderRadius: hceBorderRadius.sm,
              border: "none",
              cursor: "pointer",
            }}
          >
            <CloseIcon size={18} color="#fff" />
          </button>
        </div>

        {/* ── Resumen con grupos etiquetados ── */}
        <div style={{
          display:      "flex",
          borderBottom: `1px solid ${hceClinicalColors.border}`,
          flexShrink:   0,
        }}>
          {/* Grupo Boxes */}
          <SummaryGroup title="Boxes" flex={3}>
            <SummaryChip label="Ocupados"      count={ocupados}      color={hceClinicalColors.priority1}  />
            <VDivider />
            <SummaryChip label="Disponibles"   count={disponibles}   color={hceClinicalColors.boxActive}  />
            <VDivider />
            <SummaryChip label="Mantenimiento" count={mantenimiento} color={hceClinicalColors.priority2}  />
          </SummaryGroup>

          <VDivider />

          {/* Grupo Pacientes */}
          <SummaryGroup title="Pacientes" flex={2}>
            <SummaryChip label="En espera" count={enEspera} color={hceClinicalColors.boxWaiting} />
            <VDivider />
            <SummaryChip label="Triage"    count={enTriage} color={hceClinicalColors.priority2}  />
          </SummaryGroup>
        </div>

        {/* ── Contenido scrolleable ── */}
        <div style={{
          flex:      1,
          minHeight: 0,
          overflowY: "auto",
          padding:   hceSpacing[4],
          display:   "flex",
          flexDirection: "column",
          gap:       hceSpacing[5],
          boxSizing: "border-box",
        }}>

          {/* Grilla de boxes */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: hceSpacing[3] }}>
              <span style={{
                fontFamily:    hceTypography.fontFamilyClinical,
                fontSize:      hceTypography.size.tableHeader,
                fontWeight:    hceTypography.weight.bold,
                textTransform: "uppercase",
                letterSpacing: "0.07em",
                color:         hceClinicalColors.textSecondary,
              }}>
                Boxes de Atención
              </span>
              <span style={{
                padding: "2px 10px",
                borderRadius:    hceBorderRadius.pill,
                backgroundColor: hceClinicalColors.rowAlternate,
                border:          `1px solid ${hceClinicalColors.border}`,
                fontSize:        "11px",
                color:           hceClinicalColors.textSecondary,
                fontFamily:      hceTypography.fontFamilyClinical,
              }}>
                {disponibles} disp. / {BOXES.length}
              </span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: hceSpacing[2] }}>
              {BOXES.map(box => <BoxCell key={box.label} box={box} />)}
            </div>

            <PriorityLegend />
          </div>

          {/* Acordeón: pacientes sin box (simplificado: toggle sin animación de altura) */}
          {WAITING.length > 0 && (
            <div style={{
              border:       `1px solid ${hceClinicalColors.border}`,
              borderRadius: hceBorderRadius.lg,
              overflow:     "hidden",
            }}>
              <button
                type="button"
                className="hce-baddrawer-accordion-summary"
                onClick={() => setWaitingExpanded(v => !v)}
                aria-expanded={waitingExpanded}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: hceSpacing[2],
                  backgroundColor: hceClinicalColors.rowAlternate,
                  minHeight: "48px",
                  padding: `10px ${hceSpacing[4]}`,
                  boxSizing: "border-box",
                }}
              >
                <span style={{
                  fontFamily:    hceTypography.fontFamilyClinical,
                  fontSize:      hceTypography.size.tableHeader,
                  fontWeight:    hceTypography.weight.bold,
                  textTransform: "uppercase",
                  letterSpacing: "0.07em",
                  color:         hceClinicalColors.textSecondary,
                }}>
                  Pacientes sin Box
                </span>
                <span style={{
                  padding: "2px 8px",
                  borderRadius:    hceBorderRadius.pill,
                  backgroundColor: `${hceClinicalColors.boxWaiting}22`,
                  border:          `1px solid ${hceClinicalColors.boxWaiting}`,
                  fontSize:        "10px", fontWeight: 700,
                  color:           hceClinicalColors.boxWaiting,
                  fontFamily:      hceTypography.fontFamilyClinical,
                }}>
                  {enEspera} espera
                </span>
                <span style={{
                  padding: "2px 8px",
                  borderRadius:    hceBorderRadius.pill,
                  backgroundColor: `${hceClinicalColors.priority2}22`,
                  border:          `1px solid ${hceClinicalColors.priority2}`,
                  fontSize:        "10px", fontWeight: 700,
                  color:           hceClinicalColors.priority2,
                  fontFamily:      hceTypography.fontFamilyClinical,
                }}>
                  {enTriage} triage
                </span>
                <span style={{ marginLeft: "auto", display: "flex", color: hceClinicalColors.textSecondary }}>
                  <span className={`hce-baddrawer-accordion-chevron${waitingExpanded ? " hce-baddrawer-accordion-chevron--open" : ""}`}>
                    <ChevronDownIcon size={20} color={hceClinicalColors.textSecondary} />
                  </span>
                </span>
              </button>

              {waitingExpanded && (
                <div style={{ padding: hceSpacing[3], display: "flex", flexDirection: "column", gap: hceSpacing[2] }}>
                  {WAITING.map(p => (
                    <WaitingRow key={p.id} p={p} onAssign={handleAssign} />
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </Overlay>
    </>
  )
}
