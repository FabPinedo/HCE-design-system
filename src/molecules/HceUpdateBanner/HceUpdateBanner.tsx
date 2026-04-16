import { HceModal }      from "../../organisms/HceModal/HceModal"
import { UiWarningIcon } from "../../atoms/Icon/Icon"

// ─── Props ────────────────────────────────────────────────────────────────────

export interface HceUpdateBannerProps {
  /** Muestra u oculta el modal */
  open:        boolean
  /** Segundos restantes para la recarga automática */
  seconds:     number
  /** Callback del botón "Recargar ahora" y al terminar la cuenta regresiva */
  onReloadNow: () => void
}

// ─── Componente ───────────────────────────────────────────────────────────────

/**
 * Modal que notifica al usuario que hay una nueva versión disponible.
 * Componente puramente presentacional — recibe los segundos ya calculados.
 * La lógica de detección (polling) y el countdown viven en el consumidor.
 *
 * Uso típico en mf-shell:
 *   <HceUpdateBanner open={updateAvailable} seconds={countdown} onReloadNow={reload} />
 */
export function HceUpdateBanner({ open, seconds, onReloadNow }: HceUpdateBannerProps) {
  const plural = seconds !== 1 ? "s" : ""

  return (
    <HceModal
      open={open}
      title="Nueva versión disponible"
      description={
        `El sistema ha sido actualizado con mejoras y correcciones. ` +
        `La página se recargará automáticamente en ${seconds} segundo${plural}. ` +
        `Si lo prefieres, puedes recargar ahora.`
      }
      icon={<UiWarningIcon size={28} />}
      iconBgColor="#0369a1"
      confirmButton={{
        label:   `Recargar ahora`,
        onClick: onReloadNow,
      }}
    />
  )
}
