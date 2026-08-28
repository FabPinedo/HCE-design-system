/**
 * ---------------------------------------------------------
 * Component: ActionIconButton
 * Description:
 * Botón de acción icon-only para la barra de acciones del módulo
 * de emergencia. Tamaño 40x40px, borde redondeado 8px.
 * Combina un <button> + Tooltip → molecule.
 * ---------------------------------------------------------
 */
import type { CSSProperties } from "react"
import "./ActionIconButton.css"
import { hceColors } from "../../tokens/hce.tokens"
import { HceTooltip } from "../../atoms/Tooltip/HceTooltip"

interface Props {
  /** Componente de ícono (HceIcon custom o cualquier ElementType compatible con size/color/sx) */
  icon:      React.ElementType
  /** Texto descriptivo del botón (requerido para accesibilidad) */
  tooltip?:   string
  onClick?:  () => void
  disabled?: boolean
  /** Hook de pruebas E2E — `data-testid` en el `<button>`. */
  testId?:   string
}

export const ActionIconButton = ({ icon: Icon, tooltip, onClick, disabled = false, testId }: Props) => {
  const cssVars = {
    "--aib-color":        `var(--ds-color-interactive, ${hceColors.primary.blue[700]})`,
    "--aib-border":       `var(--ds-color-primary, ${hceColors.primary.blue[500]})`,
    "--aib-surface":      " #ffffff",
    "--aib-hover-bg":     `var(--ds-color-primary-light, ${hceColors.primary.blue[50]})`,
    "--aib-hover-border": `var(--ds-color-interactive, ${hceColors.primary.blue[700]})`,
    "--aib-active-bg":    `color-mix(in srgb, var(--ds-color-interactive, ${hceColors.primary.blue[700]}) 18%, transparent)`,
  } as CSSProperties

  return (
    <HceTooltip title={disabled ? "" : tooltip} placement="top">
      <button
        type="button"
        className="hce-action-iconbtn"
        style={cssVars}
        onClick={onClick}
        disabled={disabled}
        aria-label={tooltip}
        data-testid={testId}
      >
        <Icon sx={{ fontSize: 18 }} size={18} color="var(--aib-color)" />
      </button>
    </HceTooltip>
  )
}
