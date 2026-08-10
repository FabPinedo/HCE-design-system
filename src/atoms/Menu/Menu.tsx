import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type HTMLAttributes, type ReactNode, type RefObject } from "react"
import { createPortal } from "react-dom"
import "./Menu.css"
import { useDsTheme } from "../../provider/ThemeProvider"
import { registerOverlay, unregisterOverlay, isTopmostOverlay } from "../../utils/useFocusTrap"

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

// Margen mínimo respecto al borde del viewport, para que el panel nunca
// quede pegado literalmente al borde (mismo criterio que MUI Popover).
const VIEWPORT_MARGIN = 8

/**
 * Menu — reemplazo propio de MUI Menu/Popover (dropdown anclado a un
 * trigger), usado por Header/HceHeader/HceSidebar. Portal a document.body +
 * posicionamiento fixed calculado desde `anchorRef.getBoundingClientRect()` +
 * cierre por click-afuera/Escape. No es un overlay modal (sin backdrop ni
 * focus-trap) — igual que MUI Menu, que tampoco bloquea interacción con el
 * resto de la página.
 *
 * Detección de colisión con el viewport: por defecto abre hacia ABAJO del
 * anchor. Si no hay espacio suficiente hacia abajo (típico cuando el
 * trigger está cerca del borde inferior de un modal con scroll interno —
 * el panel es `position: fixed` portado a <body>, así que NO lo recorta el
 * `overflow` del modal, pero tampoco "sabe" dónde termina el modal, y sin
 * este chequeo se extendía sobre el contenido de atrás), se "voltea" hacia
 * ARRIBA del anchor. Si tampoco entra completo hacia arriba, se clampea la
 * altura máxima al espacio disponible del lado elegido (con scroll propio
 * del panel vía overflow-y del CSS existente).
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
  const [position, setPosition] = useState<{
    top?: number
    bottom?: number
    left?: number
    right?: number
    maxHeight?: number
  } | null>(null)
  // El panel se porta a document.body (fuera del subárbol DOM de DSProvider),
  // así que las variables --ds-* no le cascadean por CSS normal — se leen
  // del DsThemeContext (que sí sigue la posición del árbol de React) y se
  // reaplican a mano como custom properties en este nodo portado, para que
  // vuelvan a cascadear a los descendientes (opciones del menú, checkboxes
  // de MultiSelect, etc.).
  const dsTheme = useDsTheme()
  const instanceId = useRef<symbol>(Symbol("menu"))

  useEffect(() => {
    if (!open) return

    const id = instanceId.current
    registerOverlay(id)

    function updatePosition() {
      const anchor = anchorRef.current
      if (!anchor) return
      const rect = anchor.getBoundingClientRect()

      const spaceBelow = window.innerHeight - rect.bottom - VIEWPORT_MARGIN
      const spaceAbove = rect.top - VIEWPORT_MARGIN
      // Altura real del panel ya montado (si existe, ej. al reposicionar en
      // scroll); si todavía no se montó (primer render tras abrir), se
      // asume que sí entra abajo y se corrige en el useLayoutEffect de más
      // abajo apenas se conozca la altura real.
      const panelHeight = panelRef.current?.getBoundingClientRect().height ?? 0
      const opensUp = panelHeight > spaceBelow && spaceAbove > spaceBelow

      const vertical = opensUp
        ? { bottom: window.innerHeight - rect.top + 4, maxHeight: spaceAbove }
        : { top: rect.bottom + 4, maxHeight: spaceBelow }

      if (align === "right") {
        setPosition({ ...vertical, right: window.innerWidth - rect.right })
      } else {
        setPosition({ ...vertical, left: rect.left })
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
    // Solo actúa si este Menu es el overlay más interno abierto (pila
    // compartida con useFocusTrap) — si no, un Escape debe cerrar el
    // overlay modal que lo contiene (ej. HceFormModal), no este dropdown.
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isTopmostOverlay(id)) onClose()
    }
    document.addEventListener("mousedown", handleClickOutside, true)
    document.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("scroll", updatePosition, true)
      window.removeEventListener("resize", updatePosition)
      document.removeEventListener("mousedown", handleClickOutside, true)
      document.removeEventListener("keydown", handleKeyDown)
      unregisterOverlay(id)
    }
  }, [open, align])

  // Primer render tras abrir: el panel se monta con la posición "optimista"
  // (asumiendo que entra hacia abajo). Apenas se conoce su altura real,
  // recalcula una vez más — así el flip hacia arriba también aplica en la
  // apertura inicial, no solo en reposiciones por scroll subsecuentes.
  useLayoutEffect(() => {
    if (!open || !position) return
    const anchor = anchorRef.current
    const panel = panelRef.current
    if (!anchor || !panel) return

    const rect = anchor.getBoundingClientRect()
    const panelHeight = panel.getBoundingClientRect().height
    const spaceBelow = window.innerHeight - rect.bottom - VIEWPORT_MARGIN
    const spaceAbove = rect.top - VIEWPORT_MARGIN
    const shouldBeUp = panelHeight > spaceBelow && spaceAbove > spaceBelow
    const isCurrentlyUp = position.bottom !== undefined

    if (shouldBeUp !== isCurrentlyUp) {
      const vertical = shouldBeUp
        ? { bottom: window.innerHeight - rect.top + 4, maxHeight: spaceAbove }
        : { top: rect.bottom + 4, maxHeight: spaceBelow }
      setPosition((prev) => (prev ? { ...prev, ...vertical, top: vertical.top, bottom: vertical.bottom } : prev))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, position?.top, position?.bottom])

  if (!open || !position || typeof document === "undefined") return null

  return createPortal(
    <div
      ref={panelRef}
      role={role}
      tabIndex={-1}
      className={`hce-menu-panel${panelClassName ? ` ${panelClassName}` : ""}`}
      style={{
        ...(dsTheme as CSSProperties),
        top: position.top,
        bottom: position.bottom,
        left: position.left,
        right: position.right,
        maxHeight: position.maxHeight,
        overflowY: "auto",
        ...panelStyle,
      }}
      {...rest}
    >
      {children}
    </div>,
    document.body,
  )
}
