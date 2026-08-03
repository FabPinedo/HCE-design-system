import { useEffect, useRef, type RefObject } from "react"

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * useFocusTrap — hook compartido por los overlays propios (HceModal,
 * HceFormModal, DataCardModal, BedAvailabilityDrawer/V2) que reemplazan a
 * MUI Dialog/Drawer.
 *
 * Reimplementa, sin ninguna librería, el comportamiento de accesibilidad que
 * MUI daba gratis vía Modal/Trap:
 *  - Al abrir: guarda el elemento con foco (para devolvérselo al cerrar) y
 *    mueve el foco adentro del contenedor (al `initialFocusRef` si se pasa,
 *    si no al contenedor mismo).
 *  - Mientras está abierto: Tab/Shift+Tab quedan atrapados dentro del
 *    contenedor (ciclan entre el primer y último elemento focuseable).
 *  - Escape: llama a `onClose` (si se pasa).
 *  - Al cerrar: devuelve el foco al elemento que lo tenía antes de abrir.
 *
 * No hace nada de layout/posicionamiento — eso lo resuelve cada overlay con
 * su propio CSS (backdrop fixed + panel centrado o panel lateral).
 */
export function useFocusTrap(
  containerRef: RefObject<HTMLElement | null>,
  open: boolean,
  onClose?: () => void,
  initialFocusRef?: RefObject<HTMLElement | null>,
) {
  const previouslyFocused = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!open) return

    previouslyFocused.current = document.activeElement as HTMLElement | null

    const container = containerRef.current
    const toFocus = initialFocusRef?.current ?? container
    // rAF: espera a que el contenedor esté pintado/medido antes de mover el foco.
    const raf = requestAnimationFrame(() => toFocus?.focus())

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose?.()
        return
      }

      if (e.key !== "Tab" || !container) return

      const focusable = Array.from(
        container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter(el => el.offsetParent !== null) // visible

      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener("keydown", handleKeyDown)
      previouslyFocused.current?.focus?.()
    }
  }, [open])
}
