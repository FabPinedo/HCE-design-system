import { Box } from "@mui/material"
import { getSemaphoreColors } from "../../tokens/getSemaphoreColors"

interface Props {
  /** Texto ya formateado, ej. "00:15:00". */
  label?: string

  /** Color semáforo del tiempo de espera. */
  color?: string | null
}

export const WaitingBadge = ({
  label,
  color = null,
}: Props) => {
  const colors = getSemaphoreColors(color)
  const visibleLabel = label ?? "-"

  return (
    <Box
      component="span"
      sx={{
        width: 150,
        height: 32,
        borderRadius: "7px",
        border: `1.5px solid ${colors.border}`,
        backgroundColor: colors.background,
        color: colors.color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "14px",
        fontWeight: 600,
        fontFamily: "monospace",
        boxSizing: "border-box",
      }}
      aria-label={`Tiempo de espera: ${visibleLabel}`}
    >
      {visibleLabel}
    </Box>
  )
}