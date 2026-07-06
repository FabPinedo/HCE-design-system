import { Box, styled, Switch, Typography } from "@mui/material"
import { PriorityBadge } from "../../atoms/PriorityBadge/PriorityBadge"
import { BoxBadge } from "../../atoms/BoxBadge/BoxBadge"
import { AttentionCode } from "../../atoms/AttentionCode/AttentionCode"
import { InfoButton } from "../InfoButton/InfoButton"
import { ClinicalStatusIcon } from "../ClinicalStatusIcon/ClinicalStatusIcon"

import {
  UiBloodTestIcon,
  UiConversationIcon,
  UiPrescriptionIcon,
  UiXRaysIcon,
} from "../../atoms/Icon/SvgIconsUiKit"
import type {  Theme } from "@mui/material"
import type { SystemStyleObject } from "@mui/system"
import { hceBorderRadius, hceColors, hceTypography, hceUi } from "../../tokens/hce.tokens"

import { WaitingBadge } from "../../atoms/WaitingBadge/WaitingBadge"
import type { ComponentType } from "react"


export type GenericColumnType =
  | "text"
  | "priority"
  | "box"
  | "patient-name"
  | "clinical-status"
  | "attention-code"
  | "info-button"
  | "waiting-time"
  | "icon"
  | "switch"
  | "tag"

export interface GenericTableColumn<T> {
  key: string
  header: string
  type: GenericColumnType

  field?: string
  valueGetter?: (row: T) => unknown

  colorField?: string
  colorGetter?: (row: T) => string | null | undefined
 

  width?: number | string
  align?: "left" | "center" | "right"

  clinicalIcon?: "lab" | "img" | "indication" | "interconsult"

  icon?: ComponentType<any>
  iconSize?: number

  checkedGetter?: (row: T) => boolean
  switchLabelGetter?: (row: T, checked: boolean) => string
  showSwitchLabel?: boolean

  clickable?: boolean
  
  disabledGetter?: (row: T) => boolean

  onClick?: (row: T, value: unknown) => void

  boldGetter?: (row: T) => boolean

  cellSx?: SystemStyleObject<Theme>
}


const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#003D96',
        ...theme.applyStyles('dark', {
          backgroundColor: '#003D96',
        }),
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
    ...theme.applyStyles('dark', {
      backgroundColor: 'rgba(255,255,255,.35)',
    }),
  },
}));



const getValueByPath = <T,>(row: T, path?: string) => {
  if (!path) return undefined

  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in acc) {
      return (acc as Record<string, unknown>)[key]
    }

    return undefined
  }, row)
}

const clinicalIcons = {
  lab: UiBloodTestIcon,
  img: UiXRaysIcon,
  indication: UiPrescriptionIcon,
  interconsult: UiConversationIcon,
}

interface GenericCellProps<T> {
  row: T
  column: GenericTableColumn<T>


}

const lightenHexColor = (hex: string, amount = 0.9): string => {
  const cleanHex = hex.replace("#", "")

  const r = parseInt(cleanHex.substring(0, 2), 16)
  const g = parseInt(cleanHex.substring(2, 4), 16)
  const b = parseInt(cleanHex.substring(4, 6), 16)

  const newR = Math.round(r + (255 - r) * amount)
  const newG = Math.round(g + (255 - g) * amount)
  const newB = Math.round(b + (255 - b) * amount)

  return `rgb(${newR}, ${newG}, ${newB})`
}

export const GenericCell = <T,>({
  row,
  column,
  
}: GenericCellProps<T>) => {

  
    const value = column.valueGetter
  ? column.valueGetter(row)
  : getValueByPath(row, column.field)

    const disabled = column.disabledGetter?.(row) ?? false
    const canClick = Boolean(
      column.clickable &&
      !disabled &&
      column.onClick
    )

    const handleColumnClick = (event: React.MouseEvent) => {
      event.stopPropagation()

      if (!canClick) return

      column.onClick?.(row, value)
    }
   
   const boldText = column.boldGetter?.(row) ?? false

   const color = column.colorGetter
  ? column.colorGetter(row)
  : column.colorField
    ? getValueByPath(row, column.colorField)
    : undefined
   
    


  switch (column.type) {
    case "priority":
        return (
            <Box
            onClick={handleColumnClick}
            sx={{
                display: "flex",
                justifyContent: "center",
                cursor: canClick ? "pointer" : "default",
            }}
            >
            <PriorityBadge priority={value as any} />
            </Box>
        )

    case "box": {
        const boxie = value as 
           | {
                label?: string
                stage: "ESPERA" | "SALA_D" | "BOX_ASIGNADO"
                color?: 'green' | 'yellow' | 'red' | null;
            }| undefined

          if (!boxie) return <>-</>

      

        return (
            <Box
            onClick={handleColumnClick}
            sx={{
                display: "flex",
                justifyContent: "center",
                cursor: canClick ? "pointer" : "default",
            }}
            >
            <BoxBadge
                label={boxie.label}
                stage={boxie.stage}
                color={boxie.color}
            />
            </Box>
        )
    }

    case "patient-name":
      return (
        <Typography
          onClick={handleColumnClick}
          sx={{
            cursor: canClick ? "pointer" : "default",
            textDecoration: canClick ? "underline" : "none",
            whiteSpace: "nowrap",
            fontSize: hceTypography.size.base,
            overflow: "hidden",
            textOverflow: "ellipsis",
            color: hceUi.textPrimaryTable,
            fontWeight: boldText
              ? hceTypography.weight.bold
              : hceTypography.weight.regular,
            //opacity: disabled ? 0.5 : 1,
          }}
        >
          {String(value ?? "-")}
        </Typography>
      )

    

    case "clinical-status": {
      const icon = column.clinicalIcon
        ? clinicalIcons[column.clinicalIcon]
        : UiBloodTestIcon

        const status = value ?? "empty"
      return (
        <Box sx={{ display: "flex", justifyContent: "center" }} onClick={handleColumnClick}>
          <ClinicalStatusIcon
            status={status as any} 
            icon={icon}
            tooltipLabel={`${column.header}: ${String(status)}`}
          />
        </Box>
      )
    }

    case "attention-code":
      const code = value === "none" || !value ? "-" : String(value)
      const bold = boldText
      return <AttentionCode code={code} bold={bold} />

    case "info-button":
      return (
        <Box sx={{ display: "flex", justifyContent: "center" }} onClick={handleColumnClick}>
          <InfoButton 
            onClick={() => {
              if (!canClick) return
              column.onClick?.(row, value)
            }} 
            disabled={disabled} />
        </Box>
      )

    case "waiting-time":
     
      return (
            <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                cursor: column.clickable ? "pointer" : "default",
            }}
            >
            <WaitingBadge
                color={color ? String(color) : undefined}
                label={String(value ?? "-")}
            />
            </Box>
        )

      case "icon": {
          const Icon = column.icon

          if (!Icon) return null

          const iconColor = disabled
            ? hceColors.neutro.white[800]
            : color
              ? String(color)
              : hceUi.textPrimaryTable

              console.log("iconColor", iconColor)

          const backgroundColor = disabled
          ? "#F2F2F2"
          : lightenHexColor(iconColor, 0.9)

          return (
            <Box
              onClick={handleColumnClick}
              sx={{
                width:           28,
                height:          28,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: canClick ? "pointer" : "default",
                //opacity: disabled ? 0.5 : 1,
                border: `1.5px solid ${iconColor}` ,
                borderRadius: hceBorderRadius.md,
                backgroundColor: backgroundColor,
              }}
            >
              <Icon color= {iconColor} disable={disabled} 
                sx={{
                  fontSize: column.iconSize ?? 20,
                  color: iconColor,
                }}
              />
            </Box>
          )
        }

 case "switch": {
  const checked = column.checkedGetter
    ? column.checkedGetter(row)
    : Boolean(value)

  const showLabel = column.showSwitchLabel ?? false

  const label = column.switchLabelGetter
    ? column.switchLabelGetter(row, checked)
    : checked
      ? "Sí"
      : "No"

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: showLabel ? "8px" : 0,
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <AntSwitch
        checked={checked}
        disabled={disabled}
        onClick={(event) => {
          event.stopPropagation()
        }}
        onChange={(event) => {
          event.stopPropagation()

          if (disabled) return

          column.onClick?.(row, event.target.checked)
        }}
      />

      {showLabel && (
        <Typography
          sx={{
            whiteSpace: "nowrap",
            color: hceUi.textPrimaryTable,
            fontSize: hceTypography.size.base,
            fontWeight: checked
              ? hceTypography.weight.bold
              : hceTypography.weight.regular,
          }}
        >
          {label}
        </Typography>
      )}
    </Box>
  )
}



case "tag": {
    const label = String(value ?? "-")

    const tagColor =
      column.colorGetter?.(row) ??
      color ? String(color) : "#000000" 

    const backgroundColor = lightenHexColor(tagColor, 0.9)

    return (
      <Box
        onClick={handleColumnClick}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: canClick ? "pointer" : "default",
          opacity: disabled ? 0.5 : 1,
        }}
      >
        <Box
          component="span"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: 72,
            height: 20,
            px: "8px",
            borderRadius: "999px",
            border: `1px solid ${tagColor}`,
            backgroundColor,
            color: tagColor,
            fontFamily: hceTypography.fontFamily,
            fontSize: "11px",
            fontWeight: hceTypography.weight.medium,
            lineHeight: 1,
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </Box>
      </Box>
    )
  }
   case "text":
      return (
        <Typography
          onClick={handleColumnClick}
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            color: hceUi.textPrimaryTable,
            fontSize: hceTypography.size.base,
            fontWeight: boldText
              ? hceTypography.weight.bold
              : hceTypography.weight.regular,
            cursor: canClick ? "pointer" : "default",
            textDecoration: canClick ? "underline" : "none",
            opacity: disabled ? 0.5 : 1,
          }}
        >
          {String(value ?? "-")}
        </Typography>
      )
  }
}