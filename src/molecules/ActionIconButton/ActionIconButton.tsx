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
import { hceClinicalColors, hceColors } from "../../tokens/hce.tokens"
import { HceTooltip } from "../../atoms/Tooltip/HceTooltip"

interface Props {
  /** Componente de ícono (HceIcon custom o cualquier ElementType compatible con size/color/sx) */
  icon:      React.ElementType
  /** Texto descriptivo del botón (requerido para accesibilidad) */
  tooltip?:   string
  onClick?:  () => void
  disabled?: boolean
}

export const ActionIconButton = ({ icon: Icon, tooltip, onClick, disabled = false }: Props) => {
  const cssVars = {
    "--aib-color":        hceClinicalColors.textSecondary,
    "--aib-hover-bg":     hceClinicalColors.hoverBg,
    "--aib-hover-border": hceClinicalColors.tableHeaderBg,
    "--aib-active-bg":    hceClinicalColors.border,
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
      >
        <Icon sx={{ fontSize: 18 }} size={18} color={hceColors.primary.blue[600]} />
      </button>
    </HceTooltip>
  )
}
