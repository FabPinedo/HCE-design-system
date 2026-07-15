/**
 * ---------------------------------------------------------
 * Component: ActionIconButton
 * Description:
 * Botón de acción icon-only para la barra de acciones del módulo
 * de emergencia. Tamaño 32x32px, borde redondeado 4px.
 * Combina MUI IconButton + Tooltip → molecule.
 * ---------------------------------------------------------
 */
import { IconButton } from "@mui/material"
import { hceBorderRadius, hceClinicalColors, hceColors } from "../../tokens/hce.tokens"
import { HceTooltip } from "../../atoms/Tooltip/HceTooltip"

interface Props {
  /** Componente de ícono MUI */
  icon:      React.ElementType
  /** Texto descriptivo del botón (requerido para accesibilidad) */
  tooltip?:   string
  onClick?:  () => void
  disabled?: boolean
}

export const ActionIconButton = ({ icon: Icon, tooltip, onClick, disabled = false }: Props) => {
  return (
    <HceTooltip title={disabled ? "" : tooltip} placement="top">
      <span>
        <IconButton
          onClick={onClick}
          disabled={disabled}
          size="small"
          sx={{
            width:           40,
            height:          40,
            borderRadius:    hceBorderRadius.lg,
            border:          `1.5px solid ${hceColors.primary.blue[600]}`,
            backgroundColor: "#FFFFFF",
            color:           hceClinicalColors.textSecondary,
            padding:         0,

            "&:hover": {
              backgroundColor: hceClinicalColors.hoverBg,
              borderColor:     hceClinicalColors.tableHeaderBg,
              color:           hceClinicalColors.tableHeaderBg,
            },
            "&:active": {
              backgroundColor: hceClinicalColors.border,
            },
            "&.Mui-disabled": {
              opacity:         0.4,
              backgroundColor: "#FFFFFF",
              color:           hceClinicalColors.textSecondary,
            },
          }}
          aria-label={tooltip}
        >
          <Icon sx={{ fontSize: 18 }} size={18} color={hceColors.primary.blue[600]} />
        </IconButton>
      </span>
    </HceTooltip>
  )
}
