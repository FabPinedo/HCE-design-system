/**
 * ---------------------------------------------------------
 * Component: BedAvailabilityDrawerV2
 * Description:
 * Panel lateral (drawer anclado al borde derecho de la pantalla) que
 * muestra la disponibilidad de camas en una grilla de 3 columnas.
 * La leyenda y el botón inferior se mantienen fijos, permitiendo scroll
 * únicamente en la grilla de camas.
 * ---------------------------------------------------------
 */

import "./BedAvailabilityDrawerV2.css"
import { Overlay } from "../../atoms/Overlay/Overlay"
import { Tooltip } from "../../atoms/Tooltip/Tooltip"

import {
  hceClinicalColors, hceColors, hceTypography,
  hceBorderRadius, hceSpacing,
} from "../../tokens/hce.tokens"
import { UiMedicalRoomIcon } from "../../atoms/Icon/SvgIconsUiKit"

// ─── Estados de negocio ─────────────────────────────────────
export type BedAvailabilityStatus =
  | "ocupado"
  | "altaAdministrativa"
  | "housekeeping"
  | "mantenimiento"
  | "disponible"
  | (string & {})

export const BED_AVAILABILITY_STATUS_COLORS: Record<string, string> = {
  ocupado:            hceColors.primary.green[600],     // Verde
  altaAdministrativa: hceColors.alert.warning[600],     // Naranja
  housekeeping:       hceColors.alert.error[400],       // Rosa / Rojo
  mantenimiento:      hceColors.extras.lilac[500],      // Lila
  disponible:         hceColors.neutro.white[100],      // Blanco (Base para delineado)
}

export const BED_AVAILABILITY_STATUS_LABELS: Record<string, string> = {
  ocupado:            "Ocupado",
  altaAdministrativa: "Alta Administrativa",
  housekeeping:       "Housekeeping",
  mantenimiento:      "Mantenimiento",
  disponible:         "Disponible",
}

const DEFAULT_BED_COLOR = hceClinicalColors.border

export interface BedAvailabilityItem {
  id:         string
  code:       string
  status?:    BedAvailabilityStatus
  color?:     string
  ariaLabel?: string
}

export interface BedAvailabilityDrawerV2Props {
  open:      boolean
  onClose:   () => void
  beds:      BedAvailabilityItem[]
  title?:    string
}

function resolveBedColor(bed: BedAvailabilityItem): string {
  if (bed.color) return bed.color
  if (bed.status && BED_AVAILABILITY_STATUS_COLORS[bed.status]) {
    return BED_AVAILABILITY_STATUS_COLORS[bed.status]
  }
  return DEFAULT_BED_COLOR
}


function BedCard({ bed }: { bed: BedAvailabilityItem }) {
  const bgColor       = resolveBedColor(bed)
  const isOutlined    = bed.status === "disponible" || bgColor === hceColors.neutro.white[50]

  const statusLabel   = bed.status ? (BED_AVAILABILITY_STATUS_LABELS[bed.status] ?? bed.status) : undefined
  const accessibleLbl = bed.ariaLabel ?? [bed.code, statusLabel].filter(Boolean).join(" — ")

  return (
    <Tooltip
      title={accessibleLbl}
      arrow
      placement="top"
      bubbleStyle={{
        backgroundColor: hceColors.primary.blue[600],
        fontFamily: hceTypography.fontFamilyClinical,
        fontSize: "12px",
        fontWeight: hceTypography.weight.bold,
        padding: "6px 12px",
        borderRadius: hceBorderRadius.md,
        boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
        color: "#ffffff",
      }}
    >
      <div
        role="listitem"
        aria-label={accessibleLbl}
        className="hce-bedv2-card"
        style={{
          display:         "flex",
          flexDirection:   "column",
          alignItems:      "center",
          justifyContent:  "center",
          gap:             hceSpacing[1],
          padding:         `${hceSpacing[3]} ${hceSpacing[2]}`,
          borderRadius:    hceBorderRadius.lg,
          border:          isOutlined ? `2px solid ${hceColors.primary.blue[500]}` : `2px solid ${bgColor}`,
          backgroundColor: isOutlined ? "#FFFFFF" : bgColor,
          minHeight:       "72px",
          boxShadow:       "0px 1px 3px rgba(0, 0, 0, 0.05)",
          boxSizing:       "border-box",
        }}
      >
        <UiMedicalRoomIcon size={17} color={ isOutlined ? hceColors.primary.blue[500] : "#FFFFFF"} />
        <span style={{
          fontFamily: hceTypography.fontFamilyClinical,
          fontSize:   hceTypography.size.tableCell,
          fontWeight: hceTypography.weight.bold,
          color:      isOutlined ? hceColors.primary.blue[500] : "#FFFFFF",
        }}>
          {bed.code}
        </span>
      </div>
    </Tooltip>
  )
}



function StatusLegend() {
  const entries = Object.keys(BED_AVAILABILITY_STATUS_LABELS)
  return (
    <div
      role="list"
      aria-label="Leyenda de estados de cama"
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: hceSpacing[3],
        marginBottom: hceSpacing[3],
        justifyContent: "center",
      }}
    >
      {entries.map((status) => {
        const color   = BED_AVAILABILITY_STATUS_COLORS[status]
        const label   = BED_AVAILABILITY_STATUS_LABELS[status]

        // Si el estado es disponible (blanco), el chip de la leyenda debe reflejar el azul del borde para que se entienda
        const bulletColor = color

        return (
          <div key={status} role="listitem" style={{ display: "flex", alignItems: "center", gap: hceSpacing[1] }}>
            <span style={{
              width:           12,
              height:          12,
              borderRadius:    hceBorderRadius.circle,
              backgroundColor: bulletColor,
              border:          `1px solid ${bulletColor}`,
              flexShrink:      0,
              display:         "inline-block",
            }} />
            <span style={{
              fontFamily: hceTypography.fontFamilyClinical,
              fontSize:   "11px",
              color:      hceClinicalColors.textSecondary,
            }}>
              {label}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export function BedAvailabilityDrawerV2({
  open,
  onClose,
  beds,
  title = "Disponibilidad de camas",
}: BedAvailabilityDrawerV2Props) {
  return (
    <Overlay
      open={open}
      onClose={onClose}
      variant="drawer-right"
      panelClassName="hce-bedv2-panel"
      labelledBy="hce-bedv2-title"
    >
      {/* ── Header (Fijo arriba) ── */}
      <div style={{
        flexShrink:      0,
        backgroundColor: hceColors.primary.blue[600],
        padding:         `${hceSpacing[4]} ${hceSpacing[4]}`,
      }}>
        <span id="hce-bedv2-title" style={{
          display: "block",
          fontFamily: hceTypography.fontFamilyClinical,
          fontSize:   hceTypography.size.headerTitle,
          fontWeight: hceTypography.weight.bold,
          color:      "#FFFFFF",
          textAlign:  "center",
        }}>
          {title}
        </span>
      </div>

      {/* ── Body (Única sección con Scroll) ── */}
      <div style={{
        flex:            1,
        minHeight:       0,
        overflowY:       "auto",
        padding:         hceSpacing[4],
      }}>
        {beds.length === 0 ? (
          <p style={{
            fontFamily: hceTypography.fontFamilyClinical,
            fontSize:   hceTypography.size.tableCell,
            color:      hceClinicalColors.textSecondary,
            textAlign:  "center",
            marginTop:  hceSpacing[6],
          }}>
            No hay camas para mostrar.
          </p>
        ) : (
          <div
            role="list"
            aria-label="Listado de camas"
            style={{
              display:             "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap:                 hceSpacing[3],
            }}
          >
            {beds.map((bed) => <BedCard key={bed.id} bed={bed} />)}
          </div>
        )}
      </div>

      {/* ── Footer (Fijo abajo: Contiene Leyenda + Botón Cerrar) ── */}
      <div style={{
        flexShrink: 0,
        padding: hceSpacing[4],
        backgroundColor: "#EBF1FA",
        borderTop: "1px solid rgba(0, 0, 0, 0.05)",
      }}>
        {/* Leyenda fija */}
        <StatusLegend />

        {/* Botón Cerrar */}
        <button type="button" className="hce-bedv2-close-btn" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </Overlay>
  )
}
