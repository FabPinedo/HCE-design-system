import type { CSSProperties } from "react"
import "./StatusBadge.css"

import {
  hceColors,
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

  sx?: CSSProperties
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

  const Tag = canClick ? "button" : "span"

  return (
    <Tag
      type={canClick ? "button" : undefined}
      onClick={canClick ? onClick : undefined}
      aria-disabled={disabled || undefined}
      className={[
        "hce-status-badge",
        size === "small" ? "hce-status-badge--sm" : "hce-status-badge--md",
        canClick ? "hce-status-badge--clickable" : "",
      ].filter(Boolean).join(" ")}
      style={{
        borderColor: borderColor ?? colors.borderColor,
        backgroundColor: backgroundColor ?? colors.backgroundColor,
        color: textColor ?? colors.textColor,
        cursor: canClick ? "pointer" : "default",
        opacity: disabled ? 0.55 : 1,
        ...sx,
      }}
    >
      {label}
    </Tag>
  )
}
