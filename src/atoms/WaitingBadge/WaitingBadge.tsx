import { Box } from "@mui/material"
import {
 
  hceColors,
  
} from "../../tokens/hce.tokens"

export type BoxStage = "ESPERA" | "SALA_D" | "BOX_ASIGNADO"

interface BoxBadgeColors {
  border: string
  background: string
  color: string
}

interface Props {
  /** Texto. */
  label?: string

 
  color?: string | null;
}

const getBoxBadgeColors = (
 
  color: string | null, 
): BoxBadgeColors => {
 
    switch (color) {
      case 'red':
        return {
          border: "#BD0000",
          background: "#FDECEC",
          color: "#BD0000",
        }

      case 'yellow':
        return {
          border: hceColors.alert.warning[600],
          background: hceColors.alert.warning[50],
          color: hceColors.alert.warning[600],
        }

      case 'green':
        return {
          border: hceColors.alert.success[600],
          background: hceColors.primary.green[50],
          color: hceColors.alert.success[600],
        }

      
      case 'blue':
        return {
          border: hceColors.primary.blue[600],
      background: hceColors.neutro.white[100],
      color: hceColors.primary.blue[600],
        }

      default:
        return {
          border: hceColors.neutro.white[900],
          background: hceColors.neutro.white[600],
          color: hceColors.neutro.white[900],
        }
    }
  }

  const formatMinutesToTime = (value?: string | number) => {
  if (value === undefined || value === null || value === "") return ""

  const minutes = Number(value)

  if (Number.isNaN(minutes)) return String(value)

  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  return `${String(hours).padStart(2, "0")}:${String(
    remainingMinutes
  ).padStart(2, "0")}:00`
}

export const WaitingBadge = ({ label, color=null}: Props) => {
  const colors = getBoxBadgeColors( color)

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
      aria-label={`Box ${label}`}
    >
       {formatMinutesToTime(label)}
    </Box>
  )
}