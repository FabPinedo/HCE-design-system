import { type ReactNode } from "react"
import MuiDialog          from "@mui/material/Dialog"
import MuiDialogContent   from "@mui/material/DialogContent"
import MuiButton          from "@mui/material/Button"
import Box                from "@mui/material/Box"
import Typography         from "@mui/material/Typography"
import CircularProgress   from "@mui/material/CircularProgress"
import IconButton         from "@mui/material/IconButton"
import { hceColors, hceTypography, hceShadows, hceTransition } from "../../tokens/hce.tokens"

// ─── Tipos auxiliares ─────────────────────────────────────────────────────────

interface PrimaryButtonConfig {
  label:     string
  onClick:   () => void
  disabled?: boolean
  loading?:  boolean
  /** Color de fondo del botón contained. Default: hceColors.primary.blue[600] */
  color?:    string
  /** Icono React a mostrar a la izquierda del label */
  icon?:     ReactNode
}

interface SecondaryButtonConfig {
  label:     string
  onClick:   () => void
  disabled?: boolean
  /** Color del borde y texto del botón outlined. Default: hceColors.primary.blue[600] */
  color?:    string
  /** Icono React a mostrar a la izquierda del label */
  icon?:     ReactNode
}

// ─── Props ────────────────────────────────────────────────────────────────────

export interface HceFormModalProps {
  /** Controla la visibilidad del modal */
  open:     boolean
  /** Callback al cerrar (botón X, tecla ESC o click en backdrop si closeOnBackdrop=true) */
  onClose:  () => void
  /** Título mostrado en la cabecera */
  title:    string
  /** Contenido del cuerpo: acepta cualquier JSX */
  children: ReactNode

  // ── Tamaño ─────────────────────────────────────────
  /** Breakpoint MUI o número en px para ancho personalizado. Default "sm" */
  maxWidth?:  "xs" | "sm" | "md" | "lg" | "xl" | number
  /** Si true, el modal ocupa todo el ancho del breakpoint. Default true */
  fullWidth?: boolean

  // ── Botón primario (confirmar / guardar) ───────────
  primaryButton?: PrimaryButtonConfig

  // ── Botón secundario (cancelar / volver) ───────────
  secondaryButton?: SecondaryButtonConfig

  // ── Alineación de botones en el footer ────────────
  /** Posición horizontal de los botones. Default "right" */
  buttonAlign?: "left" | "center" | "right"

  // ── Comportamiento del backdrop ────────────────────
  /** Si false, el click fuera del modal NO lo cierra. Default true */
  closeOnBackdrop?: boolean

  // ── Escape hatches ─────────────────────────────────
  className?: string
  style?:     React.CSSProperties
}

// ─── Keyframe de entrada ──────────────────────────────────────────────────────

const SLIDE_FROM_TOP_KEYFRAME = {
  "@keyframes hceFormModalSlideDown": {
    from: { opacity: 0, transform: "translateY(-20px)" },
    to:   { opacity: 1, transform: "translateY(0)" },
  },
}

// ─── Componente ───────────────────────────────────────────────────────────────

export function HceFormModal({
  open,
  onClose,
  title,
  children,
  maxWidth        = "sm",
  fullWidth       = true,
  primaryButton,
  secondaryButton,
  buttonAlign     = "right",
  closeOnBackdrop = true,
  className,
  style,
}: HceFormModalProps) {

  const hasButtons = !!(primaryButton || secondaryButton)

  // MUI maxWidth solo acepta los breakpoints predefinidos o false.
  // Cuando se pasa un número usamos false y sobreescribimos via sx.
  const muiMaxWidth = typeof maxWidth === "number" ? false : maxWidth

  const handleBackdropClick = () => {
    if (closeOnBackdrop) onClose()
  }

  return (
    <MuiDialog
      open={open}
      onClose={handleBackdropClick}
      maxWidth={muiMaxWidth}
      fullWidth={fullWidth}
      aria-labelledby="hce-form-modal-title"
      className={className}
      PaperProps={{
        style,
        sx: {
          ...SLIDE_FROM_TOP_KEYFRAME,
          borderRadius:  "8px",
          boxShadow:     hceShadows.modal,
          overflow:      "hidden",
          fontFamily:    hceTypography.fontFamily,
          animation:     `hceFormModalSlideDown ${hceTransition.base}`,
          // Ancho personalizado cuando maxWidth es número (px)
          ...(typeof maxWidth === "number" && {
            maxWidth: `${maxWidth}px`,
            width:    "100%",
          }),
        },
      }}
    >

      {/* ── Cabecera ─────────────────────────────────────────────────────── */}
      <Box
        component="header"
        sx={{
          display:         "flex",
          alignItems:      "center",
          justifyContent:  "space-between",
          backgroundColor: hceColors.primary.blue[600],
          padding:         "16px 20px",
          borderRadius:    "8px 8px 0 0",
          flexShrink:      0,
        }}
      >
        <Typography
          id="hce-form-modal-title"
          component="h2"
          sx={{
            fontFamily:  hceTypography.fontFamily,
            fontWeight:  600,
            fontSize:    "1rem",
            lineHeight:  1.4,
            color:       hceColors.neutro.white[50],
            margin:      0,
            flex:        1,
          }}
        >
          {title}
        </Typography>

        <IconButton
          onClick={onClose}
          aria-label="Cerrar modal"
          size="small"
          sx={{
            color:         hceColors.neutro.white[50],
            borderRadius:  "4px",
            padding:       "4px",
            transition:    `background-color ${hceTransition.fast}`,
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.15)",
            },
            "&:focus-visible": {
              outline:         `2px solid ${hceColors.neutro.white[50]}`,
              outlineOffset:   "2px",
              backgroundColor: "rgba(255,255,255,0.10)",
            },
          }}
        >
          {/* Icono X en SVG inline — sin dependencia de ningún paquete de iconos */}
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M14 4L4 14M4 4L14 14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </IconButton>
      </Box>

      {/* ── Cuerpo ───────────────────────────────────────────────────────── */}
      <MuiDialogContent
        sx={{
          padding:    "20px",
          overflowY:  "auto",
          fontFamily: hceTypography.fontFamily,
        }}
      >
        {children}
      </MuiDialogContent>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      {hasButtons && (
        <Box
          component="footer"
          sx={{
            display:        "flex",
            alignItems:     "center",
            justifyContent: buttonAlign,
            gap:            "12px",
            padding:        "12px 20px",
            borderTop:      `1px solid ${hceColors.primary.blue[100]}`,
            flexShrink:     0,
            flexWrap:       "wrap",
          }}
        >

          {/* Botón secundario — va antes en DOM para orden natural de foco */}
          {secondaryButton && (
            <MuiButton
              variant="outlined"
              onClick={secondaryButton.onClick}
              disabled={secondaryButton.disabled}
              aria-label={secondaryButton.label}
              startIcon={secondaryButton.icon ?? undefined}
              sx={{
                fontFamily:    hceTypography.fontFamily,
                fontWeight:    600,
                fontSize:      "0.875rem",
                textTransform: "none",
                borderRadius:  "6px",
                borderColor:   secondaryButton.color ?? hceColors.primary.blue[600],
                color:         secondaryButton.color ?? hceColors.primary.blue[600],
                minWidth:      "100px",
                height:        "36px",
                gap:           secondaryButton.icon ? "6px" : 0,
                transition:    `border-color ${hceTransition.fast}, background-color ${hceTransition.fast}`,
                "&:hover:not(:disabled)": {
                  borderColor:     secondaryButton.color ?? hceColors.primary.blue[700],
                  backgroundColor: `${secondaryButton.color ?? hceColors.primary.blue[600]}14`,
                },
                "&:focus-visible": {
                  outline:       `2px solid ${secondaryButton.color ?? hceColors.primary.blue[600]}`,
                  outlineOffset: "2px",
                },
                "&:disabled": {
                  borderColor: hceColors.neutro.black[100],
                  color:       hceColors.neutro.black[100],
                },
                "& .MuiButton-startIcon": { margin: 0 },
              }}
            >
              {secondaryButton.label}
            </MuiButton>
          )}

          {/* Botón primario */}
          {primaryButton && (
            <MuiButton
              variant="contained"
              onClick={primaryButton.onClick}
              disabled={primaryButton.disabled || primaryButton.loading}
              aria-label={primaryButton.label}
              aria-busy={primaryButton.loading}
              startIcon={(!primaryButton.loading && primaryButton.icon) ? primaryButton.icon : undefined}
              sx={{
                fontFamily:      hceTypography.fontFamily,
                fontWeight:      600,
                fontSize:        "0.875rem",
                textTransform:   "none",
                borderRadius:    "6px",
                backgroundColor: primaryButton.color ?? hceColors.primary.blue[600],
                color:           "#ffffff",
                minWidth:        "100px",
                height:          "36px",
                boxShadow:       "none",
                gap:             primaryButton.icon ? "6px" : 0,
                transition:      `background-color ${hceTransition.fast}`,
                "&:hover:not(:disabled)": {
                  backgroundColor: `${primaryButton.color ?? hceColors.primary.blue[600]}cc`,
                  boxShadow:       "none",
                },
                "&:focus-visible": {
                  outline:       `2px solid ${primaryButton.color ?? hceColors.primary.blue[600]}`,
                  outlineOffset: "2px",
                },
                "&:disabled": {
                  backgroundColor: hceColors.neutro.black[50],
                  color:           hceColors.neutro.black[200],
                },
                "& .MuiButton-startIcon": { margin: 0 },
              }}
            >
              {primaryButton.loading ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <CircularProgress size={14} thickness={5} sx={{ color: "#ffffff" }} aria-hidden="true" />
                  {primaryButton.label}
                </Box>
              ) : (
                primaryButton.label
              )}
            </MuiButton>
          )}

        </Box>
      )}

    </MuiDialog>
  )
}
