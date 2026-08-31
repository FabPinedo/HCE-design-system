import { useRef, type CSSProperties, type ReactNode } from "react"
import { createPortal } from "react-dom"
import "./Overlay.css"
import { useFocusTrap } from "../../utils/useFocusTrap"
import { useDsTheme } from "../../provider/ThemeProvider"

export interface OverlayProps {
  open: boolean
  /** Se llama al hacer click en el backdrop o presionar Escape. Omitir bloquea el cierre externo (igual que HceModal sin onClose). */
  onClose?: () => void
  children: ReactNode
  /** "dialog" = panel centrado (modal) · "drawer-right" = panel lateral (drawer) */
  variant?: "dialog" | "drawer-right"
  panelStyle?: CSSProperties
  labelledBy?: string
  describedBy?: string
  panelClassName?: string
  /** Bloquea el cierre al hacer click en el backdrop (equivalente a `disableOutsideClose`) */
  disableBackdropClose?: boolean
  /** Bloquea el cierre al presionar Escape (equivalente a `disableEscapeClose`) */
  disableEscapeClose?: boolean
  /** Hook de pruebas E2E — `data-testid` del panel (nodo raíz del overlay). */
  testId?: string
}

/**
 * Overlay — backdrop + portal + focus-trap compartido por los overlays
 * propios del design system (HceModal, HceFormModal, DataCardModal,
 * BedAvailabilityDrawer/V2), reemplazo de MUI Dialog/Drawer/Backdrop/Fade.
 *
 * Replica la accesibilidad que daban gratis MUI Modal/Trap: foco atrapado
 * dentro del panel (Tab/Shift+Tab cicla), Escape cierra, foco vuelve al
 * disparador al cerrar, portal a document.body para no quedar recortado
 * por un ancestro con overflow/stacking context propio.
 */
export function Overlay({
  open,
  onClose,
  children,
  variant = "dialog",
  panelStyle,
  labelledBy,
  describedBy,
  panelClassName,
  disableBackdropClose = false,
  disableEscapeClose = false,
  testId,
}: OverlayProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  // Igual que en atoms/Menu: este backdrop+panel se porta a document.body,
  // fuera del subárbol DOM de DSProvider, así que --ds-* no le cascadea por
  // CSS normal. Se lee del DsThemeContext (sigue la posición del árbol de
  // React, no la del DOM) y se reaplica como custom properties en la raíz
  // portada para que vuelva a cascadear al backdrop y al panel (y a todo lo
  // que HceModal/HceFormModal/DataCardModal/BedAvailabilityDrawer rendericen
  // adentro).
  const dsTheme = useDsTheme()

  useFocusTrap(panelRef, open, disableEscapeClose ? undefined : onClose)

  if (!open || typeof document === "undefined") return null

  return createPortal(
    <div
      className="hce-overlay-backdrop"
      style={dsTheme as CSSProperties}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !disableBackdropClose) onClose?.()
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        data-testid={testId}
        tabIndex={-1}
        className={`hce-overlay-panel--${variant}${panelClassName ? ` ${panelClassName}` : ""}`}
        style={panelStyle}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body,
  )
}
