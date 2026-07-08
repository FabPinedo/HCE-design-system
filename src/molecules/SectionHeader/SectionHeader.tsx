import { Box, Typography } from "@mui/material"
import { hceColors, hceTypography } from "../../tokens/hce.tokens"

export interface SectionHeaderProps {
  title: string
  expanded: boolean
  onToggle: () => void
}

/** Header clickeable de sección desplegable, con chevron animado. */
export function SectionHeader({ title, expanded, onToggle }: SectionHeaderProps) {
  return (
    <Box
      component="button"
      type="button"
      onClick={onToggle}
      aria-expanded={expanded}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        px: 3,
        py: 1.25,
        backgroundColor: hceColors.primary.blue[600],
        borderRadius: "8px",
        border: "none",
        cursor: "pointer",
        outline: "none",
        "&:focus-visible": {
          outline: `2px solid #ffffff`,
          outlineOffset: "-3px",
        },
      }}
    >
      <Typography
        sx={{
          color: "#fff",
          fontFamily: hceTypography.fontFamily,
          fontWeight: 600,
          fontSize: "0.9rem",
        }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          color: "#fff",
          fontSize: "18px",
          lineHeight: 1,
          transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 220ms",
        }}
      >
        ▾
      </Box>
    </Box>
  )
}
