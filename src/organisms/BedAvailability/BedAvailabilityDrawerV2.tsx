/**
 * ---------------------------------------------------------
 * Component: BedAvailabilityDrawerV2
 * Description:
 * Panel lateral (drawer anclado al borde derecho de la pantalla) que
 * muestra la disponibilidad de camas en una grilla de 3 columnas.
 *
 * Es un componente puramente presentacional: recibe el listado de
 * camas por props y lo pinta, no trae datos por sí mismo. Su
 * visibilidad es controlada por el consumidor vía `open` / `onClose`
 * (permanece oculto por defecto hasta que el padre lo abra).
 *
 * Distinto de `BedAvailabilityDrawer` (el organism existente de "Boxes
 * de Atención"): ese componente es autocontenido (datos + trigger
 * propios) y sigue vigente para su caso de uso. Este es el nuevo
 * diseño pedido para el panel simple de disponibilidad de camas.
 * ---------------------------------------------------------
 */
import { Box, Drawer, Typography, Button } from "@mui/material"
import KingBedOutlinedIcon                 from "@mui/icons-material/KingBedOutlined"
import {
  hceClinicalColors, hceColors, hceTypography,
  hceBorderRadius, hceSpacing, hceZIndex,
} from "../../tokens/hce.tokens"

// ─── Estados de negocio ─────────────────────────────────────
// `status` NO es un enum cerrado: se tipa como string para permitir
// estados futuros que no estén en BED_AVAILABILITY_STATUS_COLORS.
// Si el estado no tiene color por defecto, usar la prop `color` de
// la cama para forzarlo explícitamente.
export type BedAvailabilityStatus =
  | "ocupado"
  | "altaAdministrativa"
  | "housekeeping"
  | "mantenimiento"
  | "disponible"
  | (string & {})

/**
 * Mapeo de color por defecto para los 5 estados de negocio conocidos hoy.
 */
export const BED_AVAILABILITY_STATUS_COLORS: Record<string, string> = {
  ocupado:            hceColors.alert.success[500],     // Verde
  altaAdministrativa: hceColors.alert.warning[500],     // Naranja
  housekeeping:       hceClinicalColors.bedHousekeeping, // Rosa
  mantenimiento:      hceClinicalColors.bedMaintenance,  // Lila
  disponible:         hceColors.neutro.white[50],        // Blanco
}

/** Etiqueta legible por estado conocido (usada en aria-label / title) */
export const BED_AVAILABILITY_STATUS_LABELS: Record<string, string> = {
  ocupado:            "Ocupado",
  altaAdministrativa: "Alta Administrativa",
  housekeeping:       "Housekeeping",
  mantenimiento:      "Mantenimiento",
  disponible:         "Disponible",
}

const DEFAULT_BED_COLOR = hceClinicalColors.border // fallback gris si no hay status ni color

export interface BedAvailabilityItem {
  /** Identificador único (key de React) */
  id:        string
  /** Código/nombre visible de la cama, ej. "CX01" */
  code:      string
  /** Estado de negocio de la cama. Resuelve un color por defecto vía BED_AVAILABILITY_STATUS_COLORS */
  status?:   BedAvailabilityStatus
  /** Color explícito (hex/rgb/token). Tiene prioridad sobre `status` */
  color?:    string
  /** Texto accesible opcional. Si no se define se arma desde code + status */
  ariaLabel?: string
}

export interface BedAvailabilityDrawerV2Props {
  /** Controla la visibilidad del panel. Oculto por defecto. */
  open:      boolean
  /** Callback al cerrar (botón "Cerrar" del footer, click fuera o tecla Escape) */
  onClose:   () => void
  /** Listado de camas a pintar en la grilla de 3 columnas */
  beds:      BedAvailabilityItem[]
  /** Título del header. Default: "Disponibilidad de camas" */
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
  const bgColor      = resolveBedColor(bed)
  const isLight       = bgColor === hceColors.neutro.white[50] // "Disponible": fondo blanco necesita borde visible
  const statusLabel   = bed.status ? (BED_AVAILABILITY_STATUS_LABELS[bed.status] ?? bed.status) : undefined
  const accessibleLbl = bed.ariaLabel ?? [bed.code, statusLabel].filter(Boolean).join(" — ")

  return (
    <Box
      role="listitem"
      aria-label={accessibleLbl}
      title={accessibleLbl}
      sx={{
        display:         "flex",
        flexDirection:   "column",
        alignItems:      "center",
        justifyContent:  "center",
        gap:             hceSpacing[1],
        p:               `${hceSpacing[3]} ${hceSpacing[2]}`,
        borderRadius:    hceBorderRadius.lg,
        border:          `2px solid ${isLight ? hceClinicalColors.border : bgColor}`,
        backgroundColor: isLight ? bgColor : `${bgColor}26`, // ~15% alpha sobre color sólido
        minHeight:       "72px",
      }}
    >
      <KingBedOutlinedIcon sx={{
        fontSize: 22,
        color:    isLight ? hceClinicalColors.textSecondary : bgColor,
      }} />
      <Typography sx={{
        fontFamily: hceTypography.fontFamilyClinical,
        fontSize:   hceTypography.size.tableCell,
        fontWeight: hceTypography.weight.bold,
        color:      hceClinicalColors.textPrimary,
      }}>
        {bed.code}
      </Typography>
    </Box>
  )
}

// ─── Leyenda de estados ─────────────────────────────────────
// WCAG 1.4.1 (uso del color): el color de fondo de cada celda no debe ser
// el único medio para transmitir el estado. Esta leyenda pinta un chip +
// etiqueta de texto por cada estado conocido.
function StatusLegend() {
  const entries = Object.keys(BED_AVAILABILITY_STATUS_LABELS)
  return (
    <Box
      role="list"
      aria-label="Leyenda de estados de cama"
      sx={{ display: "flex", flexWrap: "wrap", gap: hceSpacing[3], mt: hceSpacing[4] }}
    >
      {entries.map((status) => {
        const color   = BED_AVAILABILITY_STATUS_COLORS[status]
        const label   = BED_AVAILABILITY_STATUS_LABELS[status]
        const isLight = color === hceColors.neutro.white[50]
        return (
          <Box key={status} role="listitem" sx={{ display: "flex", alignItems: "center", gap: hceSpacing[1] }}>
            <Box sx={{
              width:           12,
              height:          12,
              borderRadius:    hceBorderRadius.circle,
              backgroundColor: color,
              border:          `1px solid ${isLight ? hceClinicalColors.border : color}`,
              flexShrink:      0,
            }} />
            <Typography sx={{
              fontFamily: hceTypography.fontFamilyClinical,
              fontSize:   "11px",
              color:      hceClinicalColors.textSecondary,
            }}>
              {label}
            </Typography>
          </Box>
        )
      })}
    </Box>
  )
}

export function BedAvailabilityDrawerV2({
  open,
  onClose,
  beds,
  title = "Disponibilidad de camas",
}: BedAvailabilityDrawerV2Props) {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        role:          "dialog",
        "aria-modal":  true,
        "aria-label":  title,
      }}
      sx={{
        zIndex: hceZIndex.drawer,
        "& .MuiDrawer-paper": {
          width:         { xs: "100vw", sm: 420 },
          display:       "flex",
          flexDirection: "column",
          overflow:      "hidden",
        },
      }}
    >
      {/* ── Header ── */}
      <Box sx={{
        flexShrink:      0,
        backgroundColor: hceClinicalColors.headerBg,
        py:              hceSpacing[4],
        px:              hceSpacing[4],
      }}>
        <Typography sx={{
          fontFamily: hceTypography.fontFamilyClinical,
          fontSize:   hceTypography.size.headerTitle,
          fontWeight: hceTypography.weight.bold,
          color:      "#FFFFFF",
          textAlign:  "center",
        }}>
          {title}
        </Typography>
      </Box>

      {/* ── Body ── */}
      <Box sx={{
        flex:            1,
        minHeight:       0,
        overflowY:       "auto",
        backgroundColor: hceClinicalColors.surfaceBg,
        p:               hceSpacing[4],
      }}>
        {beds.length === 0 ? (
          <Typography sx={{
            fontFamily: hceTypography.fontFamilyClinical,
            fontSize:   hceTypography.size.tableCell,
            color:      hceClinicalColors.textSecondary,
            textAlign:  "center",
            mt:         hceSpacing[6],
          }}>
            No hay camas para mostrar.
          </Typography>
        ) : (
          <Box
            role="list"
            aria-label="Listado de camas"
            sx={{
              display:             "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap:                 hceSpacing[3],
            }}
          >
            {beds.map((bed) => <BedCard key={bed.id} bed={bed} />)}
          </Box>
        )}
        <StatusLegend />
      </Box>

      {/* ── Footer ── */}
      <Box sx={{ flexShrink: 0, p: hceSpacing[4], backgroundColor: hceClinicalColors.surfaceBg }}>
        <Button
          fullWidth
          onClick={onClose}
          sx={{
            backgroundColor: hceColors.primary.green[500], // verde/lima de acento (distinto del verde de "Ocupado")
            color:           hceClinicalColors.textPrimary,
            fontFamily:      hceTypography.fontFamilyClinical,
            fontWeight:      hceTypography.weight.bold,
            borderRadius:    hceBorderRadius.pill,
            textTransform:   "none",
            py:              hceSpacing[2],
            "&:hover": { backgroundColor: hceColors.primary.green[600] },
          }}
        >
          Cerrar
        </Button>
      </Box>
    </Drawer>
  )
}
