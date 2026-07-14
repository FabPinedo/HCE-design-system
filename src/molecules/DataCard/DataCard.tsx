import type { ReactNode } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

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
    <Box
      sx={{
        width: "100%",
        maxWidth,
        maxHeight,
        boxSizing: "border-box",
        overflowY: maxHeight ? "auto" : "visible",

        p: contentPadding,
        textAlign: contentAlign,

        backgroundColor,
        border: `${resolvedBorderWidth} solid ${borderColor}`,
        borderRadius,
        boxShadow: hceShadows.modal,
        fontFamily: hceTypography.fontFamily,
      }}
    >
      {headerContent && (
        <Box
          sx={{
            display: "flex",
            justifyContent:
              contentAlign === "center"
                ? "center"
                : contentAlign === "right"
                  ? "flex-end"
                  : "flex-start",
            mb: title || description ? 1.5 : 0,
          }}
        >
          {headerContent}
        </Box>
      )}

      {title && (
        <Typography
          component="div"
          sx={{
            fontFamily: hceTypography.fontFamily,
            fontWeight: 700,
            fontSize: "1.125rem",
            color: hceColors.primary.blue[500],
            mb: description ? 0.75 : 0,
          }}
        >
          {title}
        </Typography>
      )}

      {description && (
        <Typography
          component="div"
          sx={{
            fontFamily: hceTypography.fontFamily,
            fontSize: "0.875rem",
            color: hceColors.neutro.black[300],
            lineHeight: 1.65,
          }}
        >
          {description}
        </Typography>
      )}

      {children && (
        <Box
          sx={{
            mt:
              headerContent || title || description
                ? 2
                : 0,
            textAlign: "left",
          }}
        >
          {children}
        </Box>
      )}
    </Box>
  )
}