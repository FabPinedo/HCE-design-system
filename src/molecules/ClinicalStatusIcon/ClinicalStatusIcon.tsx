/**
 * ---------------------------------------------------------
 * Component: ClinicalStatusIcon
 * Description:
 * Ícono de estado para columnas clínicas de la tabla de pacientes.
 * Combina un div + Tooltip + SvgIcon → molecule.
 *
 * Estados disponibles:
 *   alert   → fondo naranja claro, ícono naranja — pendiente/alerta
 *   ok      → fondo verde claro,   ícono verde   — completado/normal
 *   urgent  → fondo rojo claro,    ícono rojo    — urgente
 *   empty   → sin fondo, sin ícono               — sin registro
 * ---------------------------------------------------------
 */
import { hceClinicalColors, hceBorderRadius } from "../../tokens/hce.tokens"
import { Tooltip } from "../../atoms/Tooltip/Tooltip"
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
  /** Componente de ícono (HceIcon custom o cualquier ComponentType compatible con size/color) */
  icon: ComponentType<CustomIconProps>
  /** Texto descriptivo para el tooltip (opcional, sobreescribe el label por defecto) */
  tooltipLabel?: string
  /** Hook de pruebas E2E — `data-testid` en el nodo raíz. */
  testId?: string
}

export const ClinicalStatusIcon = ({ status, icon: Icon, tooltipLabel, testId }: Props) => {
  const config = STATUS_CONFIG[status]

  if (status === "empty") {
    return <div style={{ width: 28, height: 28, flexShrink: 0 }} aria-hidden="true" data-testid={testId} />
  }

  return (
    <Tooltip
      title={tooltipLabel ?? config.label}
      placement="top"
    >
      <div
        style={{
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
          boxSizing:       "border-box",
        }}
        role="img"
        aria-label={tooltipLabel ?? config.label}
        data-testid={testId}
      >
        <Icon size= {16} color= {config.color} />
      </div>
    </Tooltip>
  )
}
