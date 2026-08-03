import type { ReactNode, CSSProperties } from "react"
import "./Tooltip.css"

/**
 * Tooltip — reemplazo propio de `Tooltip` de `@mui/material`, en CSS puro
 * (sin Popper/portal). Cubre el subconjunto de API realmente usado en este
 * repo: `title`, `placement` ("top" | "bottom" | "left" | "right"), `arrow`,
 * `children` (un único elemento disparador).
 *
 * NOTA DE PARIDAD: a diferencia de MUI (que usa Popper y reposiciona el
 * tooltip dinámicamente si no entra en el viewport), este bubble se ancla
 * con CSS puro al `placement` pedido y NO hace collision-detection contra
 * los bordes de la ventana. En la práctica los usos existentes siempre
 * pasan un `placement` fijo elegido a mano (no dependen del auto-flip), así
 * que el riesgo visual es bajo, pero es una simplificación real frente al
 * comportamiento anterior.
 *
 * Si `title` es un string vacío (patrón usado para "desactivar" el tooltip
 * condicionalmente, ej. `title={disabled ? "" : tooltip}`), no se renderiza
 * ningún wrapper/bubble — igual que MUI, que omite el tooltip cuando el
 * título está vacío.
 */

export interface TooltipProps {
  title:      ReactNode
  children:   ReactNode
  placement?: "top" | "bottom" | "left" | "right"
  arrow?:     boolean
  className?: string
  style?:     CSSProperties
  /** Estilo del bubble — equivalente al `slotProps.tooltip.sx` de MUI */
  bubbleStyle?: CSSProperties
  bubbleClassName?: string
}

export const Tooltip = ({
  title,
  children,
  placement = "top",
  arrow = false,
  className,
  style,
  bubbleStyle,
  bubbleClassName,
}: TooltipProps) => {
  if (!title) return <>{children}</>

  return (
    <span className={`hce-tooltip-wrapper${className ? ` ${className}` : ""}`} style={style}>
      {children}
      <span
        role="tooltip"
        className={`hce-tooltip-bubble hce-tooltip-bubble--${placement}${bubbleClassName ? ` ${bubbleClassName}` : ""}`}
        style={bubbleStyle}
      >
        {title}
        {arrow && <span className="hce-tooltip-bubble__arrow" />}
      </span>
    </span>
  )
}
