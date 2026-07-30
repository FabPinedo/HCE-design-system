import Box from "@mui/material/Box"
import type { SxProps, Theme } from "@mui/material/styles"

import {
  hceColors,
  hceTypography,
} from "../../tokens/hce.tokens"

export type StatusBadgeVariant =
  | "success"
  | "warning"
  | "error"
  | "info"
  | "neutral"

export interface StatusBadgeProps {
  label: string

  variant?: StatusBadgeVariant

  clickable?: boolean
  disabled?: boolean
  onClick?: () => void

  size?: "small" | "medium"

  backgroundColor?: string
  borderColor?: string
  textColor?: string

  sx?: SxProps<Theme>
}

const variantStyles: Record<
  StatusBadgeVariant,
  {
    backgroundColor: string
    borderColor: string
    textColor: string
  }
> = {
  success: {
    backgroundColor: hceColors.primary.green[50],
    borderColor: hceColors.primary.green[600],
    textColor: hceColors.primary.green[700],
  },
  warning: {
    backgroundColor: "#FFF7E6",
    borderColor: "#F2A100",
    textColor: "#A66400",
  },
  error: {
    backgroundColor: hceColors.alert.error[100],
    borderColor: hceColors.alert.error[600],
    textColor: hceColors.alert.error[600],
  },
  info: {
    backgroundColor: hceColors.primary.blue[50],
    borderColor: hceColors.primary.blue[600],
    textColor: hceColors.primary.blue[600],
  },
  neutral: {
    backgroundColor: hceColors.neutro.black[50],
    borderColor: hceColors.neutro.black[200],
    textColor: hceColors.neutro.black[400],
  },
}

export function StatusBadge({
  label,
  variant = "neutral",
  clickable = false,
  disabled = false,
  onClick,
  size = "small",
  backgroundColor,
  borderColor,
  textColor,
  sx,
}: StatusBadgeProps) {
  const colors = variantStyles[variant]

  const canClick = clickable && !disabled && !!onClick

  return (
    <Box
      component={canClick ? "button" : "span"}
      type={canClick ? "button" : undefined}
      onClick={canClick ? onClick : undefined}
      aria-disabled={disabled || undefined}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",

        minHeight: size === "small" ? 20 : 26,
        px: size === "small" ? 1 : 1.5,

        borderRadius: "6px",
        border: "1px solid",
        borderColor: borderColor ?? colors.borderColor,

        backgroundColor:
          backgroundColor ?? colors.backgroundColor,

        color: textColor ?? colors.textColor,

        fontFamily: hceTypography.fontFamily,
        fontSize: size === "small" ? "0.6875rem" : "0.75rem",
        fontWeight: 700,
        lineHeight: 1,

        whiteSpace: "nowrap",
        boxSizing: "border-box",

        appearance: "none",
        outline: "none",

        cursor: canClick ? "pointer" : "default",

        opacity: disabled ? 0.55 : 1,

        transition:
          "background-color 150ms ease, border-color 150ms ease, opacity 150ms ease",

        "&:hover": canClick
          ? {
              filter: "brightness(0.96)",
            }
          : undefined,

        "&:focus-visible": canClick
          ? {
              outline: `2px solid ${hceColors.primary.blue[500]}`,
              outlineOffset: "2px",
            }
          : undefined,

        ...sx,
      }}
    >
      {label}
    </Box>
  )
}