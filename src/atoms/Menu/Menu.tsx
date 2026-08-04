import { useEffect, useRef, useState, type CSSProperties, type HTMLAttributes, type ReactNode, type RefObject } from "react"
import { createPortal } from "react-dom"
import "./Menu.css"

export interface MenuProps extends Omit<HTMLAttributes<HTMLDivElement>, "className" | "style" | "children"> {
  open: boolean
  onClose: () => void
  /** Elemento (botón/trigger) respecto al cual se posiciona el panel */
  anchorRef: RefObject<HTMLElement | null>
  children: ReactNode
  /** Alineación horizontal del panel respecto al anchor. Default "right" (el borde derecho del panel queda alineado con el borde derecho del anchor) */
  align?: "left" | "right"
  panelStyle?: CSSProperties
  panelClassName?: string
  /**
   * Rol ARIA del panel portado. Default "menu" (uso original: dropdowns de
   * Header/HceSidebar). Consumidores con otra semántica (ej. un listbox de
   * selección múltiple) pueden pasar `role="listbox"` + `aria-multiselectable`
   * + `id` — cualquier atributo HTML/ARIA adicional se reenvía tal cual al
   * div portado (ver `...rest` más abajo).
   */
  role?: string
}

/**
 * Menu — reemplazo propio de MUI Menu/Popover (dropdown anclado a un
 * trigger), usado por Header/HceHeader/HceSidebar. Portal a document.body +
 * posicionamiento fixed calculado desde `anchorRef.getBoundingClientRect()` +
 * cierre por click-afuera/Escape. No es un overlay modal (sin backdrop ni
 * focus-trap) — igual que MUI Menu, que tampoco bloquea interacción con el
 * resto de la página.
 */
export function Menu({
  open,
  onClose,
  anchorRef,
  children,
  align = "right",
  panelStyle,
  panelClassName,
  role = "menu",
  ...rest
}: MenuProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState<{ top: number; left?: number; right?: number } | null>(null)

  useEffect(() => {
    if (!open) return

    function updatePosition() {
      const anchor = anchorRef.current
      if (!anchor) return
      const rect = anchor.getBoundingClientRect()
      if (align === "right") {
        setPosition({ top: rect.bottom + 4, right: window.innerWidth - rect.right })
      } else {
        setPosition({ top: rect.bottom + 4, left: rect.left })
      }
    }

    updatePosition()
    window.addEventListener("scroll", updatePosition, true)
    window.addEventListener("resize", updatePosition)

    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node
      if (panelRef.current?.contains(target)) return
      if (anchorRef.current?.contains(target)) return
      onClose()
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("scroll", updatePosition, true)
      window.removeEventListener("resize", updatePosition)
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [open, align])

  if (!open || !position || typeof document === "undefined") return null

  return createPortal(
    <div
      ref={panelRef}
      role={role}
      tabIndex={-1}
      className={`hce-menu-panel${panelClassName ? ` ${panelClassName}` : ""}`}
      style={{ top: position.top, left: position.left, right: position.right, ...panelStyle }}
      {...rest}
    >
      {children}
    </div>,
    document.body,
  )
}
