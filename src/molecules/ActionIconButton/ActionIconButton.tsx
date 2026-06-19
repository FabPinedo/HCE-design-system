/**
 * ---------------------------------------------------------
 * Component: ActionIconButton
 * Description:
 * Botón de acción icon-only para la barra de acciones del módulo
 * de emergencia. Tamaño 32x32px, borde redondeado 4px.
 * Combina MUI IconButton + Tooltip → molecule.
 * ---------------------------------------------------------
 */
import { IconButton, Tooltip } from "@mui/material"
import type { SvgIconComponent } from "@mui/icons-material"
import { hceBorderRadius, hceClinicalColors } from "../../tokens/hce.tokens"

interface Props {
  /** Componente de ícono MUI */
  icon:      SvgIconComponent
  /** Texto descriptivo del botón (requerido para accesibilidad) */
  tooltip:   string
  onClick?:  () => void
  disabled?: boolean
}

export const ActionIconButton = ({ icon: Icon, tooltip, onClick, disabled = false }: Props) => {
  return (
    <Tooltip title={disabled ? "" : tooltip} placement="bottom">
      <span>
        <IconButton
          onClick={onClick}
          disabled={disabled}
          size="small"
          sx={{
            width:           32,
            height:          32,
            borderRadius:    hceBorderRadius.sm,
            border:          `1px solid ${hceClinicalColors.border}`,
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
          <Icon sx={{ fontSize: 16 }} />
        </IconButton>
      </span>
    </Tooltip>
  )
}
