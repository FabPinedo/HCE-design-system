import { Tooltip, type TooltipProps } from "./Tooltip"
import { hceColors, hceTypography } from "../../tokens/hce.tokens"

/**
 * HceTooltip — variante de marca (verde) del Tooltip base, con flecha
 * activada por defecto. Antes envolvía MUI Tooltip con `slotProps` verdes;
 * ahora reusa el Tooltip propio (CSS puro) pasando el estilo del bubble
 * como `bubbleStyle`/`bubbleClassName`.
 */
export const HceTooltip = ({ children, arrow = true, ...props }: TooltipProps) => {
  return (
    <Tooltip
      arrow={arrow}
      {...props}
      bubbleStyle={{
        backgroundColor: `var(--ds-color-interactive-button, ${hceColors.primary.green[600]})`,
        color:           "#ffffff",
        fontSize:        "0.72rem",
        fontWeight:      700,
        fontFamily:      hceTypography.fontFamily,
        borderRadius:    "8px",
        padding:         "6px 12px",
        boxShadow:       "0 4px 14px rgba(0,0,0,0.20)",
        letterSpacing:   "0.02em",
        whiteSpace:      "nowrap",
        ...props.bubbleStyle,
      }}
    >
      {children}
    </Tooltip>
  )
}
