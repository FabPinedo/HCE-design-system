/**
 * ---------------------------------------------------------
 * Component: ClinicalStatusIcon
 * Description:
 * Ícono de estado para columnas clínicas de la tabla de pacientes.
 * Combina MUI Box + Tooltip + SvgIcon → molecule.
 *
 * Estados disponibles:
 *   alert   → fondo naranja claro, ícono naranja — pendiente/alerta
 *   ok      → fondo verde claro,   ícono verde   — completado/normal
 *   urgent  → fondo rojo claro,    ícono rojo    — urgente
 *   empty   → sin fondo, sin ícono               — sin registro
 * ---------------------------------------------------------
 */
import { Box, Tooltip } from "@mui/material"
import { hceClinicalColors, hceBorderRadius } from "../../tokens/hce.tokens"
import type { ComponentType } from "react"

export type ClinicalIconStatus = "alert" | "ok" | "urgent" | "empty"

interface StatusConfig {
  bg:    string
  color: string
  label: string
}

const STATUS_CONFIG: Record<ClinicalIconStatus, StatusConfig> = {
  alert: {
    bg:    hceClinicalColors.iconAlertBg,
    color: hceClinicalColors.iconAlert,
    label: "Pendiente / Alerta",
  },
  ok: {
    bg:    hceClinicalColors.iconOkBg,
    color: hceClinicalColors.iconOk,
    label: "Completado",
  },
  urgent: {
    bg:    hceClinicalColors.iconUrgentBg,
    color: hceClinicalColors.iconUrgent,
    label: "Urgente",
  },
  empty: {
    bg:    "transparent",
    color: "transparent",
    label: "",
  },
}

type CustomIconProps = {
  color?: string,
  size?: number
}

interface Props {
  /** Estado clínico del estudio */
  status: ClinicalIconStatus
  /** Componente de ícono MUI (SvgIconComponent) e iconos svg del uiKit*/
  icon: ComponentType<CustomIconProps>
  /** Texto descriptivo para el tooltip (opcional, sobreescribe el label por defecto) */
  tooltipLabel?: string
}

export const ClinicalStatusIcon = ({ status, icon: Icon, tooltipLabel }: Props) => {
  const config = STATUS_CONFIG[status]

  if (status === "empty") {
    return <Box sx={{ width: 28, height: 28, flexShrink: 0 }} aria-hidden="true" />
  }

  return (
    <Tooltip
      title={tooltipLabel ?? config.label}
      placement="top"
    >
      <Box
        sx={{
          width:           28,
          height:          28,
          border:          `1.5px solid ${config.color}` ,
          borderRadius:    hceBorderRadius.md,
          backgroundColor: config.bg,
          display:         "flex",
          alignItems:      "center",
          justifyContent:  "center",
          flexShrink:      0,
          cursor:          "default",
        }}
        role="img"
        aria-label={tooltipLabel ?? config.label}
      >
        <Icon size= {16} color= {config.color} />
      </Box>
    </Tooltip>
  )
}
