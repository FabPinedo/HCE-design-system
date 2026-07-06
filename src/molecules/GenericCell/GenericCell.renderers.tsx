import type { HTMLAttributes, MouseEvent, ReactNode } from "react"
import { Box, styled, Switch, Typography } from "@mui/material"
import { PriorityBadge } from "../../atoms/PriorityBadge/PriorityBadge"
import { BoxBadge } from "../../atoms/BoxBadge/BoxBadge"
import { AttentionCode } from "../../atoms/AttentionCode/AttentionCode"
import { WaitingBadge } from "../../atoms/WaitingBadge/WaitingBadge"
import { InfoButton } from "../InfoButton/InfoButton"
import { ClinicalStatusIcon } from "../ClinicalStatusIcon/ClinicalStatusIcon"

import {
  UiBloodTestIcon,
  UiConversationIcon,
  UiPrescriptionIcon,
  UiXRaysIcon,
} from "../../atoms/Icon/SvgIconsUiKit"

import {
  hceBorderRadius,
  hceColors,
  hceTypography,
  hceUi,
} from "../../tokens/hce.tokens"

import type {
  GenericColumnType,
  GenericTableColumn,
} from "./GenericCell"

export interface CellRenderContext<T> {
  row: T
  column: GenericTableColumn<T>
  value: unknown
  color?: string
  disabled: boolean
  canClick: boolean
  boldText: boolean
  handleColumnClick: (event: MouseEvent<HTMLElement>) => void
  clickableA11yProps: HTMLAttributes<HTMLElement>
}

export type CellRenderer<T> = (context: CellRenderContext<T>) => ReactNode

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",

  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },

  "& .MuiSwitch-switchBase": {
    padding: 2,

    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",

      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#003D96",

        ...theme.applyStyles("dark", {
          backgroundColor: "#003D96",
        }),
      },
    },
  },

  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },

  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: "rgba(0,0,0,.25)",
    boxSizing: "border-box",

    ...theme.applyStyles("dark", {
      backgroundColor: "rgba(255,255,255,.35)",
    }),
  },
}))

const clinicalIcons = {
  lab: UiBloodTestIcon,
  img: UiXRaysIcon,
  indication: UiPrescriptionIcon,
  interconsult: UiConversationIcon,
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

type BoxCellValue =
  | {
      label?: string
      stage: "ESPERA" | "SALA_D" | "BOX_ASIGNADO"
      color?: "green" | "yellow" | "red" | null
    }
  | undefined

export const cellRenderers: {
  [K in GenericColumnType]: CellRenderer<any>
} = {
  priority: ({
    value,
    canClick,
    handleColumnClick,
    clickableA11yProps,
  }) => (
    <Box
      onClick={handleColumnClick}
      {...clickableA11yProps}
      sx={{
        display: "flex",
        justifyContent: "center",
        cursor: canClick ? "pointer" : "default",
      }}
    >
      <PriorityBadge priority={value as any} />
    </Box>
  ),

  box: ({
    value,
    canClick,
    handleColumnClick,
    clickableA11yProps,
  }) => {
    const boxie = value as BoxCellValue

    if (!boxie) return <>-</>

    return (
      <Box
        onClick={handleColumnClick}
        {...clickableA11yProps}
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
  },

  "patient-name": ({
    value,
    boldText,
    canClick,
    handleColumnClick,
    clickableA11yProps,
  }) => (
    <Typography
      onClick={handleColumnClick}
      {...clickableA11yProps}
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
      }}
    >
      {String(value ?? "-")}
    </Typography>
  ),

  "clinical-status": ({
    column,
    value,
    handleColumnClick,
    clickableA11yProps,
  }) => {
    const icon = column.clinicalIcon
      ? clinicalIcons[column.clinicalIcon]
      : UiBloodTestIcon

    const status = value ?? "empty"

    return (
      <Box
        onClick={handleColumnClick}
        {...clickableA11yProps}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <ClinicalStatusIcon
          status={status as any}
          icon={icon}
          tooltipLabel={`${column.header}: ${String(status)}`}
        />
      </Box>
    )
  },

  "attention-code": ({ value, boldText }) => {
    const code = value === "none" || !value ? "-" : String(value)

    return <AttentionCode code={code} bold={boldText} />
  },

  "info-button": ({
    row,
    column,
    value,
    disabled,
    canClick,
  }) => (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <InfoButton
        onClick={() => {
          if (!canClick) return

          column.onClick?.(row, value)
        }}
        disabled={disabled}
      />
    </Box>
  ),

  "waiting-time": ({ value, color }) => (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <WaitingBadge
        color={color}
        label={String(value ?? "-")}
      />
    </Box>
  ),

  icon: ({
    column,
    disabled,
    color,
    canClick,
    handleColumnClick,
    clickableA11yProps,
  }) => {
    const Icon = column.icon

    if (!Icon) return null

    const iconColor = disabled
      ? hceColors.neutro.white[800]
      : color || hceUi.textPrimaryTable

    const backgroundColor = disabled
      ? "#F2F2F2"
      : lightenHexColor(iconColor, 0.9)

    return (
      <Box
        onClick={handleColumnClick}
        {...clickableA11yProps}
        sx={{
          width: 28,
          height: 28,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: canClick ? "pointer" : "default",
          border: `1.5px solid ${iconColor}`,
          borderRadius: hceBorderRadius.md,
          backgroundColor,
        }}
      >
        <Icon
          color={iconColor}
          disable={disabled}
          sx={{
            fontSize: column.iconSize ?? 20,
            color: iconColor,
          }}
        />
      </Box>
    )
  },

  switch: ({
    row,
    column,
    value,
    disabled,
  }) => {
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
  },

  tag: ({
    value,
    color,
    disabled,
    canClick,
    handleColumnClick,
    clickableA11yProps,
  }) => {
    const label = String(value ?? "-")
    const tagColor = color || "#000000"
    const backgroundColor = lightenHexColor(tagColor, 0.9)

    return (
      <Box
        onClick={handleColumnClick}
        {...clickableA11yProps}
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
  },

  text: ({
    value,
    boldText,
    disabled,
    canClick,
    handleColumnClick,
    clickableA11yProps,
  }) => (
    <Typography
      onClick={handleColumnClick}
      {...clickableA11yProps}
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
  ),
}