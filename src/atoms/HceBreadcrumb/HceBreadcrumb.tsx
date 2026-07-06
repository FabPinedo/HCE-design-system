import { Box, Typography } from "@mui/material"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import type { ReactNode } from "react"

import {

  hceColors,
  hceSpacing,
  hceTypography,
} from "../../tokens/hce.tokens"

export interface HceBreadcrumbItem {
  label: string
  href?: string
  icon?: ReactNode
  disabled?: boolean
}

export interface HceBreadcrumbProps {
  items: HceBreadcrumbItem[]
  onItemClick?: (item: HceBreadcrumbItem, index: number) => void
}

export function HceBreadcrumb({
  items,
  onItemClick,
}: HceBreadcrumbProps) {
  return (
    <Box
      aria-label="breadcrumb"
      sx={{
        display: "flex",
        alignItems: "center",
        gap: hceSpacing[1],
        minHeight: 24,
      }}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        const isClickable = Boolean(!isLast && !item.disabled && onItemClick)

        return (
          <Box
            key={`${item.label}-${index}`}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: hceSpacing[1],
            }}
          >
            <Typography
              component={item.href && !isLast ? "a" : "span"}
              href={item.href && !isLast ? item.href : undefined}
              onClick={(event :any) => {
                if (!isClickable) return

                if (item.href) {
                  event.preventDefault()
                }

                onItemClick?.(item, index)
              }}
              sx={{
                fontFamily: hceTypography.fontFamily,
                display: "inline-flex",
                alignItems: "center",
                gap: hceSpacing[1],
                color: isLast
                  ? hceColors.neutro.white[900]
                  : hceColors.neutro.white[700],
                fontWeight: hceTypography.weight.semibold,
                textDecoration: !isLast ? "underline" : "none",
                cursor: isClickable || item.href ? "pointer" : "default",
                pointerEvents: item.disabled ? "none" : "auto",
                opacity: item.disabled ? 0.5 : 1,
                fontSize: hceTypography.size.sm,
                "&:hover": {
                  color:
                    !isLast && !item.disabled
                      ? hceColors.neutro.black[400]
                      : undefined,
                },
              }}
            >
              {item.icon}
              {item.label}
            </Typography>

            {!isLast && (
              <ChevronRightIcon
                sx={{
                  fontSize: 18,
                  color: hceColors.neutro.white[700],
                }}
              />
            )}
          </Box>
        )
      })}
    </Box>
  )
}