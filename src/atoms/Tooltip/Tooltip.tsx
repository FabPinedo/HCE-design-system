import { useCallback, useLayoutEffect, useRef, useState, type ReactNode, type CSSProperties, useEffect } from "react"
import { createPortal } from "react-dom"
import "./Tooltip.css"
import { useDsTheme } from "../../provider/ThemeProvider"

/**
 * Tooltip — reemplazo propio de `Tooltip` de MUI, en CSS puro
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
  const dsTheme = useDsTheme()
  const triggerRef = useRef<HTMLSpanElement>(null)
  const bubbleRef = useRef<HTMLSpanElement>(null)
  const [visible, setVisible] = useState(false)
  const [position, setPosition] = useState({ top: -9999, left: -9999 })

  const updatePosition = useCallback(() => {
    const trigger = triggerRef.current
    const bubble = bubbleRef.current
    if (!trigger || !bubble) return

    const anchor = trigger.getBoundingClientRect()
    const floating = bubble.getBoundingClientRect()
    const gap = 8
    const next = placement === "bottom"
      ? { top: anchor.bottom + gap, left: anchor.left + (anchor.width - floating.width) / 2 }
      : placement === "left"
        ? { top: anchor.top + (anchor.height - floating.height) / 2, left: anchor.left - floating.width - gap }
        : placement === "right"
          ? { top: anchor.top + (anchor.height - floating.height) / 2, left: anchor.right + gap }
          : { top: anchor.top - floating.height - gap, left: anchor.left + (anchor.width - floating.width) / 2 }

    // Se respeta estrictamente el placement solicitado. En particular, un
    // tooltip `top` nunca se empuja hacia abajo sobre el trigger cuando está
    // cerca del borde superior; el portal solo resuelve capas/overflow.
    // Horizontalmente sí se limita para evitar que el texto salga por los
    // laterales de la ventana sin alterar su posición respecto al icono.
    const viewportLeft = Math.max(
      4,
      Math.min(next.left, window.innerWidth - floating.width - 4),
    )

    // El bubble vive en document.body con position:absolute, por lo que sus
    // coordenadas deben pertenecer al documento, no al viewport. Sumar el
    // scroll evita que el tooltip se desplace demasiado arriba al scrollear.
    setPosition({
      top: next.top + window.scrollY,
      left: viewportLeft + window.scrollX,
    })
  }, [placement])

  const hideTooltip = useCallback(() => {
  setVisible(false)
}, [])

useEffect(() => {
  if (!visible) return

  const handleVisibilityChange = () => {
    if (document.visibilityState !== "visible") {
      hideTooltip()
    }
  }

  window.addEventListener("blur", hideTooltip)

  document.addEventListener(
    "visibilitychange",
    handleVisibilityChange,
  )

  document.addEventListener(
    "pointerdown",
    hideTooltip,
    true,
  )

  return () => {
    window.removeEventListener("blur", hideTooltip)

    document.removeEventListener(
      "visibilitychange",
      handleVisibilityChange,
    )

    document.removeEventListener(
      "pointerdown",
      hideTooltip,
      true,
    )
  }
}, [visible, hideTooltip])

  useLayoutEffect(() => {
    if (!visible) return
    updatePosition()
    window.addEventListener("resize", updatePosition)
    window.addEventListener("scroll", updatePosition, true)
    return () => {
      window.removeEventListener("resize", updatePosition)
      window.removeEventListener("scroll", updatePosition, true)
    }
  }, [visible, updatePosition])

  if (!title) return <>{children}</>

  return (
    <span
      ref={triggerRef}
      className={`hce-tooltip-wrapper${className ? ` ${className}` : ""}`}
      style={style}
      onPointerEnter={() => setVisible(true)}
      onPointerLeave={() => setVisible(false)}
      onFocusCapture={(event) => {
        const target = event.target

        if (
          target instanceof HTMLElement &&
          target.matches(":focus-visible")
        ) {
          setVisible(true)
        }
      }}

      onBlurCapture={() => setVisible(false)}
      
    >
      {children}
      {visible && typeof document !== "undefined" && createPortal(
        <span
          ref={bubbleRef}
          role="tooltip"
          className={`hce-tooltip-bubble hce-tooltip-bubble--portal hce-tooltip-bubble--visible hce-tooltip-bubble--${placement}${bubbleClassName ? ` ${bubbleClassName}` : ""}`}
          style={{
            ...dsTheme,
            ...bubbleStyle,
            top: position.top,
            left: position.left,
            right: "auto",
            bottom: "auto",
            transform: "none",
          } as CSSProperties}
        >
          {title}
          {arrow && <span className="hce-tooltip-bubble__arrow" />}
        </span>,
        document.body,
      )}
    </span>
  )
}
