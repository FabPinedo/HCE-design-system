/**
 * ---------------------------------------------------------
 * Component: InfoButton
 * Description:
 * Botón circular de acción que abre el panel de información
 * detallada del paciente. Combina MUI IconButton + Tooltip +
 * VisibilityIcon → molecule.
 * ---------------------------------------------------------
 */
import { IconButton, Tooltip } from "@mui/material"
import VisibilityIcon from "@mui/icons-material/Visibility"
import { hceClinicalColors } from "../../tokens/hce.tokens"

interface Props {
  onClick?:  () => void
  tooltip?:  string
  disabled?: boolean
}

export const InfoButton = ({ onClick, tooltip = "Ver información del paciente", disabled = false }: Props) => {
  return (
    <Tooltip title={disabled ? "" : tooltip} placement="top">
      <span>
        <IconButton
          onClick={onClick}
          disabled={disabled}
          size="small"
          sx={{
            width:           28,
            height:          28,
            borderRadius:    "4px",
            padding:         0,
            backgroundColor: hceClinicalColors.btnInfoBg,
            color:           "#FFFFFF",
            flexShrink:      0,

            "&:hover": {
              backgroundColor: hceClinicalColors.headerBg,
            },
            "&:active": {
              backgroundColor: hceClinicalColors.headerBg,
              transform:       "scale(0.95)",
            },
            "&.Mui-disabled": {
              backgroundColor: hceClinicalColors.tableHeaderBg,
              opacity:         0.4,
              color:           "#FFFFFF",
            },
          }}
          aria-label={tooltip}
        >
          <VisibilityIcon sx={{ fontSize: 14 }} />
        </IconButton>
      </span>
    </Tooltip>
  )
}
