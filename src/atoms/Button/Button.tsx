import { type ReactNode } from "react"
import MuiButton from "@mui/material/Button"

interface Props {
  label?:     string
  children?:  ReactNode
  onClick?:   () => void
  fullWidth?: boolean
  color?:     "primary" | "secondary"
  variant?:   "primary" | "secondary" | "danger" | "ghost"
  size?:      "sm" | "md" | "lg"
  type?:      "button" | "submit" | "reset"
  disabled?:  boolean
  style?:     React.CSSProperties
}

const SIZE_MAP: Record<string, "small" | "medium" | "large"> = {
  sm: "small",
  md: "medium",
  lg: "large",
}

export const Button = ({
  label,
  children,
  onClick,
  fullWidth  = false,
  color      = "primary",
  variant,
  size       = "md",
  type       = "button",
  disabled   = false,
  style,
}: Props) => {
  const muiColor  = variant === "danger" ? "error" : color
  const muiVariant = variant === "ghost" ? "text" : "contained"

  return (
    <MuiButton
      variant={muiVariant}
      color={muiColor}
      onClick={onClick}
      fullWidth={fullWidth}
      size={SIZE_MAP[size] ?? "medium"}
      type={type}
      disabled={disabled}
      style={style}
      sx={{ textTransform: "none", fontWeight: 600 }}
    >
      {children ?? label}
    </MuiButton>
  )
}
