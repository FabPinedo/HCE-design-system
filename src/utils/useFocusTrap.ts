import { useEffect, useRef, type RefObject } from "react"

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * Pila compartida (a nivel de módulo) de todas las instancias de
 * useFocusTrap actualmente abiertas, en orden de apertura. Cada instancia
 * registra su propio listener de `keydown` en `document` (no hay un único
 * punto central por donde pase el evento, a diferencia del Modal de MUI,
 * que resuelve esto internamente vía su propio "modal manager"), así que
 * sin esta pila un solo Escape dispara el `onClose` de TODOS los overlays
 * abiertos a la vez, no solo el que tiene el foco — ver hallazgo de
 * hce-code-reviewer: overlays anidados (ej. un modal de confirmación
 * lanzado desde dentro de un HceFormModal) se cerraban ambos con una sola
 * pulsación. Cada instancia solo actúa (Escape y Tab-wrap) si es la última
 * (la de más arriba) de la pila.
 */
const openStack: symbol[] = []

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
 *  - Escape: llama a `onClose` (si se pasa) — solo si este overlay es el
 *    más interno de la pila (ver `openStack` arriba).
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
  const instanceId = useRef<symbol>(Symbol("focus-trap"))

  useEffect(() => {
    if (!open) return

    previouslyFocused.current = document.activeElement as HTMLElement | null

    const id = instanceId.current
    openStack.push(id)

    const container = containerRef.current
    const toFocus = initialFocusRef?.current ?? container
    // rAF: espera a que el contenedor esté pintado/medido antes de mover el foco.
    const raf = requestAnimationFrame(() => toFocus?.focus())

    function isTopmost() {
      return openStack[openStack.length - 1] === id
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (!isTopmost()) return

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
      const idx = openStack.indexOf(id)
      if (idx !== -1) openStack.splice(idx, 1)
      previouslyFocused.current?.focus?.()
    }
  }, [open])
}
