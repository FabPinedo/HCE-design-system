import type { ReactNode, MouseEvent } from "react"
import "./HceBreadcrumb.css"

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

/** Chevron ">" — evita depender del sistema de íconos (se migra en el paso de íconos) */
function ChevronRightGlyph() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={hceColors.neutro.white[700]} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 6 15 12 9 18" />
    </svg>
  )
}

export function HceBreadcrumb({
  items,
  onItemClick,
}: HceBreadcrumbProps) {
  return (
    <div
      aria-label="breadcrumb"
      style={{
        display: "flex",
        alignItems: "center",
        gap: hceSpacing[1],
        minHeight: 24,
      }}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        const isClickable = Boolean(!isLast && !item.disabled && onItemClick)
        const Tag = item.href && !isLast ? "a" : "span"

        const handleClick = (event: MouseEvent) => {
          if (!isClickable) return
          if (item.href) event.preventDefault()
          onItemClick?.(item, index)
        }

        return (
          <div
            key={`${item.label}-${index}`}
            style={{ display: "flex", alignItems: "center", gap: hceSpacing[1] }}
          >
            <Tag
              href={item.href && !isLast ? item.href : undefined}
              onClick={handleClick}
              className={`hce-breadcrumb-link${!isLast && !item.disabled ? " hce-breadcrumb-link--hoverable" : ""}`}
              style={{
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
              }}
            >
              {item.icon}
              {item.label}
            </Tag>

            {!isLast && <ChevronRightGlyph />}
          </div>
        )
      })}
    </div>
  )
}
