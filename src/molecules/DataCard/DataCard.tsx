import type { ReactNode } from "react"

import {
  hceColors,
  hceTypography,
  hceShadows,
} from "../../tokens/hce.tokens"

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

export function DataCard({
  title,
  description,
  headerContent,
  children,

  maxWidth = "100%",
  maxHeight,
  contentAlign = "center",
  contentPadding = "24px",

  backgroundColor = hceColors.neutro.white[50],
  borderColor = "transparent",
  borderWidth = 0,
  borderRadius = "16px",
}: DataCardProps) {
  const resolvedBorderWidth =
    typeof borderWidth === "number"
      ? `${borderWidth}px`
      : borderWidth

  return (
    <div
      style={{
        width: "100%",
        maxWidth,
        maxHeight,
        boxSizing: "border-box",
        overflowY: maxHeight ? "auto" : "visible",

        padding: contentPadding,
        textAlign: contentAlign,

        backgroundColor,
        border: `${resolvedBorderWidth} solid ${borderColor}`,
        borderRadius,
        boxShadow: hceShadows.modal,
        fontFamily: hceTypography.fontFamily,
      }}
    >
      {headerContent && (
        <div
          style={{
            display: "flex",
            justifyContent:
              contentAlign === "center"
                ? "center"
                : contentAlign === "right"
                  ? "flex-end"
                  : "flex-start",
            marginBottom: title || description ? 12 : 0,
          }}
        >
          {headerContent}
        </div>
      )}

      {title && (
        <div
          style={{
            fontFamily: hceTypography.fontFamily,
            fontWeight: 700,
            fontSize: "1.125rem",
            // blue[500] == --ds-color-primary (csf) exactamente — reactivo al
            // tema activo de DSProvider, mismo hex de siempre como fallback.
            color: `var(--ds-color-primary, ${hceColors.primary.blue[500]})`,
            marginBottom: description ? 6 : 0,
          }}
        >
          {title}
        </div>
      )}

      {description && (
        <div
          style={{
            fontFamily: hceTypography.fontFamily,
            fontSize: "0.875rem",
            color: hceColors.neutro.black[300],
            lineHeight: 1.65,
          }}
        >
          {description}
        </div>
      )}

      {children && (
        <div
          style={{
            marginTop:
              headerContent || title || description
                ? 16
                : 0,
            textAlign: "left",
          }}
        >
          {children}
        </div>
      )}
    </div>
  )
}
