import { Tooltip as MuiTooltip, type TooltipProps } from "@mui/material"
import { hceColors, hceTypography } from "../../tokens/hce.tokens"

export const HceTooltip = ({ children, ...props }: TooltipProps) => {
  return (
    <MuiTooltip
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
        </MuiTooltip>
  )
}