import type { ReactNode } from "react"

export interface DataCardProps {
  title?: ReactNode
  description?: ReactNode
  headerContent?: ReactNode
  children?: ReactNode

  maxWidth?: number | string
  maxHeight?: number | string
  contentAlign?: "left" | "center" | "right"
  contentPadding?: number | string

  backgroundColor?: string
  borderColor?: string
  borderWidth?: number | string
  borderRadius?: number | string
}

export interface DataCardModalProps extends DataCardProps {
  open: boolean
  onClose?: () => void

  showCloseButton?: boolean
  disableOutsideClose?: boolean
  disableEscapeClose?: boolean
}