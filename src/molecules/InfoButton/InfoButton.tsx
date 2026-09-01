/**
 * ---------------------------------------------------------
 * Component: InfoButton
 * Description:
 * Botón circular de acción que abre el panel de información
 * detallada del paciente. Combina Tooltip + ícono de ojo → molecule.
 * ---------------------------------------------------------
 */
import type { CSSProperties } from "react"
import "./InfoButton.css"
import { HceTooltip } from "../../atoms/HceTooltip/HceTooltip"
import { HceEyeIcon } from "../../atoms/Icon/SvgIconsHce"


interface Props {
  onClick?:  () => void
  tooltip?:  string
  disabled?: boolean
  /** Hook de pruebas E2E — `data-testid` en el `<button>`. */
  testId?:   string
}

export const InfoButton = ({ onClick, tooltip = "Ver información del paciente", disabled = false, testId }: Props) => {
  const cssVars = {
    "--infobtn-bg":          `var(--ds-color-secondary, #003d96)`,
    "--infobtn-hover-bg":    `var(--ds-color-primary-dark, #002a66)`,
    "--infobtn-disabled-bg": `var(--ds-color-interactive-disabled, #cccccc)`,
  } as CSSProperties

  return (
    <HceTooltip title={disabled ? "" : tooltip} placement="top">
      <button
        type="button"
        className="hce-infobtn"
        style={cssVars}
        onClick={onClick}
        disabled={disabled}
        aria-label={tooltip}
        data-testid={testId}
      >
        <HceEyeIcon size={14} color="#FFFFFF" />
      </button>
    </HceTooltip>
  )
}
