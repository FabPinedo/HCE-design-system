/**
 * ---------------------------------------------------------
 * Component: BoxBadge
 * Description:
 * Badge en forma de pill que representa el estado de una sala/box
 * asignada al paciente.
 *
 * Variantes de estado:
 *   active  → verde #27AE60  — sala asignada y activa
 *   urgent  → rojo  #E53E3E  — sala con paciente en estado crítico
 *   waiting → gris  #8A9BB0  — en espera, sin sala asignada
 *   tp      → gris oscuro #5A6A85 — sala de tópico
 *
 * Uso:
 *   <BoxBadge status="active" label="Box 3" />
 *   <BoxBadge status="waiting" label="Espera" />
 *   <BoxBadge status="tp" label="TP" />
 * ---------------------------------------------------------
 */
import { Box } from "@mui/material"
import {
  hceBorderRadius,
  hceColors,
  hceTypography,
} from "../../tokens/hce.tokens"

import { getSemaphoreColors } from "../../tokens/getSemaphoreColors"

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
}

const STAGE_COLORS: Partial<Record<BoxStage, BoxBadgeColors>> = {
  ESPERA: {
    border: hceColors.neutro.white[900],
    background: hceColors.neutro.white[600],
    color: hceColors.neutro.white[900],
  },
  BOX_ASIGNADO: {
    border: hceColors.primary.blue[600],
    background: hceColors.neutro.white[100],
    color: hceColors.primary.blue[600],
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
}: Props) => {
  const colors = getBoxBadgeColors(stage, color)
  const visibleLabel = label ?? stage

  return (
    <Box
      component="span"
      sx={{
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
        fontWeight: hceTypography.weight.bold,
        textTransform: "uppercase",
        textDecorationLine: "underline",
        letterSpacing: "0.3px",
        whiteSpace: "nowrap",
        cursor: "default",
        userSelect: "none",
        lineHeight: 1.4,
        boxSizing: "border-box",
      }}
      aria-label={`Box ${visibleLabel} — ${stage}`}
    >
      {visibleLabel}
    </Box>
  )
}