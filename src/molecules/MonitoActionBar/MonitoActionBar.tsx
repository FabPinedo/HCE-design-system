import { Box, IconButton, Tooltip } from "@mui/material"
import type { TooltipProps }        from "@mui/material"
import { hceColors, hceTypography, hceTransition } from "../../tokens/hce.tokens"
import {
  UiStethoscopeIcon,
  UiDoctorIcon,
  UiPrintingIcon,
  UiMedicalRoomIcon,
} from "../../atoms/Icon/Icon"

// ─── Tooltip burbuja de diálogo ───────────────────────────────────────────────
// Fondo verde HCE, texto blanco, flecha grande tipo cómic.
// La dirección de la flecha (arriba/abajo/izquierda/derecha) se adapta
// automáticamente según el prop `placement` que recibe MUI Tooltip.

function BubbleTooltip({ children, ...props }: TooltipProps) {
  return (
    <Tooltip
      arrow
      enterDelay={150}
      enterNextDelay={80}
      {...props}
      slotProps={{
        tooltip: {
          sx: {
            bgcolor:       hceColors.primary.green[600],
            color:         "#ffffff",
            fontSize:      "0.72rem",
            fontWeight:    700,
            fontFamily:    hceTypography.fontFamily,
            borderRadius:  "8px",
            padding:       "6px 12px",
            boxShadow:     "0 4px 14px rgba(0,0,0,0.20)",
            letterSpacing: "0.02em",
            whiteSpace:    "nowrap",
          },
        },
        arrow: {
          sx: {
            color:    hceColors.primary.green[600],
            fontSize: "18px",  // flecha más grande = más estilo cómic
          },
        },
      }}
    >
      {children}
    </Tooltip>
  )
}

// ─── Estilos del botón ────────────────────────────────────────────────────────

const BLUE = hceColors.primary.blue[600]

const btnSx = {
  width:           34,
  height:          34,
  borderRadius:    "8px",
  border:          `1.5px solid ${BLUE}`,
  backgroundColor: "#ffffff",
  color:           BLUE,
  padding:         0,
  flexShrink:      0,
  transition:      `all ${hceTransition.fast}`,
  "&:hover": {
    backgroundColor: hceColors.primary.blue[50],
    borderColor:     hceColors.primary.blue[700],
    color:           hceColors.primary.blue[700],
    transform:       "translateY(-1px)",
    boxShadow:       `0 3px 8px rgba(0,61,150,0.16)`,
  },
  "&:active": {
    transform:       "scale(0.95)",
    backgroundColor: hceColors.primary.blue[100],
  },
  "&.Mui-disabled": {
    opacity:         0.45,
    backgroundColor: "#ffffff",
    border:          `1.5px solid ${hceColors.primary.blue[200]}`,
    color:           hceColors.primary.blue[300],
  },
}

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
}: MonitoActionBarProps) {
  const isVertical = orientation === "vertical"
  const iconSize   = 17

  return (
    <Box
      role="toolbar"
      aria-label="Barra de acciones de monitoreo"
      sx={{
        display:         "flex",
        flexDirection:   isVertical ? "column" : "row",
        alignItems:      "center",
        justifyContent:  "flex-start",
        gap:             "6px",
        padding:         "6px 10px",
        backgroundColor: "#ffffff",
        borderRadius:    "10px",
        boxShadow:       `0 2px 8px rgba(0,29,69,0.08)`,
        border:          `1px solid ${hceColors.primary.blue[100]}`,
        width:           isVertical ? "fit-content" : "100%",
      }}
    >
      {/* Triaje */}
      <BubbleTooltip title="Triaje" placement={tooltipPlacement}>
        <span>
          <IconButton
            onClick={onTriaje}
            disabled={disabled.triaje}
            aria-label="Triaje"
            sx={btnSx}
          >
            <UiStethoscopeIcon size={iconSize} color={disabled.triaje ? hceColors.primary.blue[300] : BLUE} />
          </IconButton>
        </span>
      </BubbleTooltip>

      {/* Asignar médicos */}
      <BubbleTooltip title="Asignar médicos" placement={tooltipPlacement}>
        <span>
          <IconButton
            onClick={onAsignarMedicos}
            disabled={disabled.asignarMedicos}
            aria-label="Asignar médicos"
            sx={btnSx}
          >
            <UiDoctorIcon size={iconSize} color={disabled.asignarMedicos ? hceColors.primary.blue[300] : BLUE} />
          </IconButton>
        </span>
      </BubbleTooltip>

      {/* Reportes */}
      <BubbleTooltip title="Reportes" placement={tooltipPlacement}>
        <span>
          <IconButton
            onClick={onReportes}
            disabled={disabled.reportes}
            aria-label="Reportes"
            sx={btnSx}
          >
            <UiPrintingIcon size={iconSize} color={disabled.reportes ? hceColors.primary.blue[300] : BLUE} />
          </IconButton>
        </span>
      </BubbleTooltip>

      {/* Disponibilidad de camas */}
      <BubbleTooltip title="Disponibilidad de camas" placement={tooltipPlacement}>
        <span>
          <IconButton
            onClick={onDisponibilidad}
            disabled={disabled.disponibilidad}
            aria-label="Disponibilidad de camas"
            sx={btnSx}
          >
            <UiMedicalRoomIcon size={iconSize} color={disabled.disponibilidad ? hceColors.primary.blue[300] : BLUE} />
          </IconButton>
        </span>
      </BubbleTooltip>
    </Box>
  )
}
