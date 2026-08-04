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
import { Tooltip } from "../../atoms/Tooltip/Tooltip"
import { HceEyeIcon } from "../../atoms/Icon/SvgIcons"
import { hceClinicalColors } from "../../tokens/hce.tokens"

interface Props {
  onClick?:  () => void
  tooltip?:  string
  disabled?: boolean
}

export const InfoButton = ({ onClick, tooltip = "Ver información del paciente", disabled = false }: Props) => {
  const cssVars = {
    "--infobtn-bg":          hceClinicalColors.btnInfoBg,
    "--infobtn-hover-bg":    hceClinicalColors.headerBg,
    "--infobtn-disabled-bg": hceClinicalColors.tableHeaderBg,
  } as CSSProperties

  return (
    <Tooltip title={disabled ? "" : tooltip} placement="top">
      <button
        type="button"
        className="hce-infobtn"
        style={cssVars}
        onClick={onClick}
        disabled={disabled}
        aria-label={tooltip}
      >
        <HceEyeIcon size={14} color="#FFFFFF" />
      </button>
    </Tooltip>
  )
}
