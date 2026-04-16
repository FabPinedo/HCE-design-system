import type { ReactNode } from "react"
import { Box, Typography, Button } from "@mui/material"
import { hceColors, hceTypography } from "../../tokens/hce.tokens"

export type HCEQuickAccessProps = {
  /** Icono a mostrar dentro del cuadro azul (ReactNode — cualquier SVG o componente) */
  icon:         ReactNode
  /** Título del módulo */
  title:        string
  /** Descripción corta */
  description:  string
  /** Callback del botón "Acceder" */
  onAcceder?:   () => void
  /** Si true, el card y el botón aparecen deshabilitados */
  disabled?:    boolean
}

export function HCEQuickAccess({
  icon,
  title,
  description,
  onAcceder,
  disabled = false,
}: HCEQuickAccessProps) {
  return (
    <Box
      sx={{
        display:       "flex",
        flexDirection: "column",
        gap:           1.5,
        p:             2,
        borderRadius:  "12px",
        border:        `1px solid ${disabled ? "#e0e0e0" : hceColors.primary.blue[100]}`,
        backgroundColor: disabled ? "#fafafa" : "white",
        opacity:       disabled ? 0.6 : 1,
        transition:    "box-shadow 0.18s ease, transform 0.18s ease",
        cursor:        disabled ? "not-allowed" : "default",
        ...(!disabled && {
          "&:hover": {
            boxShadow: "0 4px 16px rgba(0,61,150,0.1)",
            transform: "translateY(-2px)",
          },
        }),
      }}
    >
      {/* Icono en cuadro azul */}
      <Box sx={{
        width:           48,
        height:          48,
        borderRadius:    "10px",
        backgroundColor: hceColors.primary.blue[50],
        display:         "flex",
        alignItems:      "center",
        justifyContent:  "center",
        flexShrink:      0,
      }}>
        <Box sx={{
          color:    hceColors.primary.blue[600],
          display:  "flex",
          fontSize: 24,
          "& svg": { width: 24, height: 24 },
        }}>
          {icon}
        </Box>
      </Box>

      {/* Título */}
      <Typography sx={{
        fontFamily: hceTypography.fontFamily,
        fontWeight: 700,
        fontSize:   "0.92rem",
        color:      "#1a1a2e",
        lineHeight: 1.3,
      }}>
        {title}
      </Typography>

      {/* Descripción */}
      <Typography sx={{
        fontFamily: hceTypography.fontFamily,
        fontSize:   "0.78rem",
        color:      "#666",
        lineHeight: 1.5,
        flex:       1,
      }}>
        {description}
      </Typography>

      {/* Botón Acceder */}
      <Button
        variant="outlined"
        size="small"
        disabled={disabled}
        onClick={disabled ? undefined : onAcceder}
        sx={{
          fontFamily:    hceTypography.fontFamily,
          fontWeight:    600,
          fontSize:      "0.8rem",
          textTransform: "none",
          borderColor:   hceColors.primary.blue[600],
          color:         hceColors.primary.blue[600],
          borderRadius:  "8px",
          mt:            "auto",
          "&:hover": {
            backgroundColor: hceColors.primary.blue[50],
            borderColor:     hceColors.primary.blue[700],
          },
        }}
      >
        Acceder
      </Button>
    </Box>
  )
}
