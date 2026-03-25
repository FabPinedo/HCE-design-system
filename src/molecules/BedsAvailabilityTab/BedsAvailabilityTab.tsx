/**
 * ---------------------------------------------------------
 * Component: BedsAvailabilityTab
 * Description:
 * Tab lateral fija en el borde derecho de la pantalla.
 * Texto vertical (writing-mode) para acceder rápidamente al
 * panel de disponibilidad de camas.
 * ---------------------------------------------------------
 */
import { Box, Typography } from "@mui/material"
import KingBedOutlinedIcon from "@mui/icons-material/KingBedOutlined"
import { emergencyTokens } from "../../tokens/emergency.tokens"

interface Props {
  /** Callback al hacer click en el tab */
  onClick?:  () => void
  /** Texto del tab (default: "Ver disponibilidad de camas") */
  label?:    string
  /** Si el panel de camas está actualmente abierto */
  isActive?: boolean
}

export const BedsAvailabilityTab = ({
  onClick,
  label = "Ver disponibilidad de camas",
  isActive = false,
}: Props) => {
  return (
    <Box
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={label}
      aria-pressed={isActive}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick?.()
      }}
      sx={{
        position:    "fixed",
        right:       0,
        top:         0,
        bottom:      0,
        height:      "fit-content",
        margin:      "auto 0",

        // writing-mode vertical + rotate(180deg) = texto de abajo hacia arriba
        writingMode: "vertical-rl",
        transform:   "rotate(180deg)",

        backgroundColor: isActive
          ? emergencyTokens.colors.headerBg
          : emergencyTokens.colors.tableHeaderBg,

        // Con rotate(180deg): "0 8px 8px 0" en DOM → esquinas izq redondeadas visualmente
        borderRadius: "0 8px 8px 0",
        boxShadow:    emergencyTokens.shadows.tab,

        padding:    "20px 10px",
        cursor:     "pointer",
        zIndex:     emergencyTokens.zIndex.sideTab,
        userSelect: "none",
        transition: "background-color 0.15s ease",

        display:     "flex",
        alignItems:  "center",
        gap:         "6px",

        "&:hover": {
          backgroundColor: emergencyTokens.colors.headerBg,
        },
        "&:focus-visible": {
          outline:      `2px solid ${emergencyTokens.colors.priority4}`,
          outlineOffset: "2px",
        },
      }}
    >
      {/* Ícono: contra-rotado para que no quede invertido */}
      <KingBedOutlinedIcon
        sx={{
          fontSize:  18,
          color:     "#FFFFFF",
          transform: "rotate(180deg)",
          flexShrink: 0,
        }}
      />

      {/* Texto vertical de abajo hacia arriba */}
      <Typography
        sx={{
          fontFamily:    emergencyTokens.typography.fontFamily,
          fontSize:      "12px",
          fontWeight:    emergencyTokens.typography.weight.semibold,
          color:         "#FFFFFF",
          whiteSpace:    "nowrap",
          letterSpacing: "0.4px",
          lineHeight:    1,
        }}
      >
        {label}
      </Typography>
    </Box>
  )
}
