/**
 * ---------------------------------------------------------
 * Component: BoxBadge
 * Description:
 * Badge en forma de pill que representa el estado funcional
 * de una sala o box dentro del módulo clínico de emergencia.
 *
 * Stages:
 *   ESPERA        → paciente en espera, sin box asignado
 *   SALA_D        → paciente en sala de espera diferenciada
 *   BOX_ASIGNADO  → paciente con box asignado
 *
 * Color:
 *   green   → estado normal
 *   yellow  → estado de alerta
 *   red     → estado crítico
 *
 * Uso:
 *   <BoxBadge stage="ESPERA" label="ESPERA" />
 *   <BoxBadge stage="SALA_D" label="SALA D" color="yellow" />
 *   <BoxBadge stage="BOX_ASIGNADO" label="Box 3" />
 * ---------------------------------------------------------
 */
import {
  hceBorderRadius,
  hceColors,
  hceTypography,
} from "../../tokens/hce.tokens"

import { getSemaphoreColors } from "../../tokens/getSemaphoreColors"
import type { CSSProperties } from "react"

export type BoxStage = "ESPERA" | "SALA_D" | "BOX_ASIGNADO"
export type BoxBadgeColor = "green" | "yellow" | "red" | null

interface BoxBadgeColors {
  border: string
  background: string
  color: string
}

interface Props {
  /** Texto visible: ESPERA, SALA D, TP08, Box 3, etc. */
  label?: string

  /** Estado funcional del box. */
  stage: BoxStage

  /** Color semáforo usado principalmente para SALA_D. */
  color?: BoxBadgeColor

  cursor?: CSSProperties["cursor"]

  /** Hook de pruebas E2E — `data-testid` en el nodo raíz. */
  testId?: string
}

const STAGE_COLORS: Partial<Record<BoxStage, BoxBadgeColors>> = {
  ESPERA: {
    border: hceColors.neutro.white[900],
    background: hceColors.neutro.white[600],
    color: hceColors.neutro.white[900],
  },
  BOX_ASIGNADO: {
    border: `var(--ds-color-primary-dark, ${hceColors.primary.blue[700]})`,
    background: hceColors.neutro.white[100],
    color: `var(--ds-color-primary-dark, ${hceColors.primary.blue[700]})`,
  },
}

const getBoxBadgeColors = (
  stage: BoxStage,
  color: BoxBadgeColor,
): BoxBadgeColors => {
  if (stage === "SALA_D") return getSemaphoreColors(color)

  return STAGE_COLORS[stage] ?? getSemaphoreColors(null)
}

export const BoxBadge = ({
  label,
  stage,
  color = null,
  cursor = "default",
  testId,
}: Props) => {
  const colors = getBoxBadgeColors(stage, color)
  const visibleLabel = label ?? stage

  return (
    <span
      data-testid={testId}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: 72,
        height: 30,
        padding: "3px 10px",
        borderRadius: hceBorderRadius.md,
        border: `1.5px solid ${colors.border}`,
        backgroundColor: colors.background,
        color: colors.color,
        fontFamily: hceTypography.fontFamilyClinical,
        fontSize: hceTypography.size.badge,
        fontWeight: hceTypography.weight.medium,
        textDecorationLine: "underline",
        letterSpacing: "0.3px",
        whiteSpace: "nowrap",
        cursor,
        userSelect: "none",
        lineHeight: 1.4,
        boxSizing: "border-box",
      }}
      aria-label={`Box ${visibleLabel} — ${stage}`}
    >
      {visibleLabel}
    </span>
  )
}
