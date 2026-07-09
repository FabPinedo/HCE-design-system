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

import { Box, Drawer, Typography, Button ,Tooltip} from "@mui/material"

import {
  hceClinicalColors, hceColors, hceTypography,
  hceBorderRadius, hceSpacing, hceZIndex,
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
      arrow // Añade una pequeña flecha apuntando a la celda
      placement="top" // Lo posiciona siempre arriba de la celda
      enterDelay={200} // Aparece rápido al acercar el cursor
      leaveDelay={0}
      componentsProps={{
        tooltip: {
          sx: {
            backgroundColor: hceColors.primary.blue[600], // Fondo a tono con tu header corporativo
            fontFamily: hceTypography.fontFamilyClinical,
            fontSize: "12px",
            fontWeight: hceTypography.weight.bold,
            padding: "6px 12px",
            borderRadius: hceBorderRadius.md,
            boxShadow: "0px 4px 12px rgba(0,0,0,0.15)"
          },
        },
        arrow: {
          sx: {
            color: hceColors.primary.blue[600],
          },
        },
      }}
    >
      <Box
        role="listitem"
        aria-label={accessibleLbl}
        // Eliminamos el atributo title nativo del Box para que NO se duplique con el tooltip de MUI
        sx={{
          display:         "flex",
          flexDirection:   "column",
          alignItems:      "center",
          justifyContent:  "center",
          gap:             hceSpacing[1],
          p:               `${hceSpacing[3]} ${hceSpacing[2]}`,
          borderRadius:    hceBorderRadius.lg,
          border:          isOutlined ? `2px solid ${hceColors.primary.blue[500]}` : `2px solid ${bgColor}`,
          backgroundColor: isOutlined ? "#FFFFFF" : bgColor,
          minHeight:       "72px",
          boxShadow:       "0px 1px 3px rgba(0, 0, 0, 0.05)",
          cursor:          "pointer", // Añade el cursor de mano para dar feedback de interactividad
          transition:      "transform 0.1s ease, box-shadow 0.1s ease",
          "&:hover": {
            transform: "scale(1.02)", // Un sutil crecimiento al pasar el mouse
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          },
          "&:active":      { transform: "scale(0.98)" }
        }}
      >
        <UiMedicalRoomIcon size={17} color={ isOutlined ? hceColors.primary.blue[500] : "#FFFFFF"} />
        <Typography sx={{
          fontFamily: hceTypography.fontFamilyClinical,
          fontSize:   hceTypography.size.tableCell,
          fontWeight: hceTypography.weight.bold,
          color:      isOutlined ? hceColors.primary.blue[500] : "#FFFFFF",
        }}>
          {bed.code}
        </Typography>
      </Box>
    </Tooltip>
  )
}



function StatusLegend() {
  const entries = Object.keys(BED_AVAILABILITY_STATUS_LABELS)
  return (
    <Box
      role="list"
      aria-label="Leyenda de estados de cama"
      sx={{ 
        display: "flex", 
        flexWrap: "wrap", 
        gap: hceSpacing[3], 
        mb: hceSpacing[3], // Añadimos margen inferior para separarlo del botón
        justifyContent: "center" 
      }}
    >
      {entries.map((status) => {
        const color   = BED_AVAILABILITY_STATUS_COLORS[status]
        const label   = BED_AVAILABILITY_STATUS_LABELS[status]
        
        // Si el estado es disponible (blanco), el chip de la leyenda debe reflejar el azul del borde para que se entienda
        const bulletColor = color

        return (
          <Box key={status} role="listitem" sx={{ display: "flex", alignItems: "center", gap: hceSpacing[1] }}>
            <Box sx={{
              width:           12,
              height:          12,
              borderRadius:    hceBorderRadius.circle,
              backgroundColor: bulletColor,
              border:          `1px solid ${bulletColor}`,
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
          width:         { xs: "100vw", sm: 400 },
          display:       "flex",
          flexDirection: "column",
          overflow:      "hidden",
          backgroundColor: "#EBF1FA", 
          margin:        { sm: "12px", xs: 0 }, 
          borderRadius:  { sm: "20px", xs: 0 },
          height:        { sm: "calc(100% - 24px)", xs: "100%" }
        },
      }}
    >
      {/* ── Header (Fijo arriba) ── */}
      <Box sx={{
        flexShrink:      0,
        backgroundColor: hceColors.primary.blue[600], 
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

      {/* ── Body (Única sección con Scroll) ── */}
      <Box sx={{
        flex:            1,
        minHeight:       0,
        overflowY:       "auto",
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
      </Box>

      {/* ── Footer (Fijo abajo: Contiene Leyenda + Botón Cerrar) ── */}
      <Box sx={{ 
        flexShrink: 0, 
        p: hceSpacing[4], 
        backgroundColor: "#EBF1FA", // Mantiene el color sutil del fondo
        borderTop: "1px solid rgba(0, 0, 0, 0.05)" // Línea divisoria muy sutil opcional
      }}>
        {/* Leyenda fija */}
        <StatusLegend />

        {/* Botón Cerrar */}
        <Button
          fullWidth
          onClick={onClose}
          sx={{
            backgroundColor: "#70C934", 
            color:           "#FFFFFF",  
            fontFamily:      hceTypography.fontFamilyClinical,
            fontWeight:      hceTypography.weight.bold,
            borderRadius:    hceBorderRadius.pill,
            textTransform:   "none",
            fontSize:        "16px",
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
