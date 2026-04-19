import { type ReactNode }  from "react"
import MuiDialog           from "@mui/material/Dialog"
import MuiDialogContent    from "@mui/material/DialogContent"
import MuiButton           from "@mui/material/Button"
import Fade                from "@mui/material/Fade"
import Box                 from "@mui/material/Box"
import Typography          from "@mui/material/Typography"
import { Button }          from "../../atoms/Button/Button"
import { TextInput }       from "../../atoms/TextInput/TextInput"
import { hceColors, hceTypography, hceShadows } from "../../tokens/hce.tokens"

// ─── Sub-tipos ────────────────────────────────────────────────────────────────

export interface ModalButtonConfig {
  label:   string
  /** Ícono a la izquierda del label */
  icon?:   ReactNode
  onClick: () => void
}

export interface ModalInputConfig {
  label?:       string
  placeholder?: string
  value:        string
  onChange:     (value: string) => void
}

// ─── Props ────────────────────────────────────────────────────────────────────

export interface HceModalProps {
  /** Controla visibilidad */
  open:   boolean
  /** Callback al cerrar (click fuera o ESC). Omitir para bloquear cierre externo */
  onClose?: () => void

  // ── Contenido ──────────────────────────────────────
  /** Título del modal (requerido) */
  title:        string
  /** Texto descriptivo bajo el título */
  description?: string | ReactNode
  /** Elemento ícono mostrado en el badge superior (ej. <UiCalendarIcon size={28} />) */
  icon?:        ReactNode
  /** Color de fondo del badge del ícono. Default: azul corporativo */
  iconBgColor?: string

  // ── Input opcional ─────────────────────────────────
  input?: ModalInputConfig

  // ── Botones (ambos opcionales) ─────────────────────
  /** Botón principal (verde/filled) */
  confirmButton?: ModalButtonConfig
  /** Botón secundario (outlined azul) */
  cancelButton?:  ModalButtonConfig

  // ── Layout ─────────────────────────────────────────
  /** "row" = lado a lado | "column" = apilados. Default: "row" */
  buttonLayout?: "row" | "column"
  /** Ancho máximo del card en px. Default: 420 */
  maxWidth?:     number
}

// ─── Componente ───────────────────────────────────────────────────────────────

export function HceModal({
  open,
  onClose,
  title,
  description,
  icon,
  iconBgColor  = hceColors.primary.blue[500],
  input,
  confirmButton,
  cancelButton,
  buttonLayout = "row",
  maxWidth     = 420,
}: HceModalProps) {
  const hasButtons = !!(confirmButton || cancelButton)
  const isRow      = buttonLayout === "row"

  return (
    <MuiDialog
      open={open}
      onClose={onClose}
      aria-labelledby="hce-modal-title"
      aria-describedby="hce-modal-description"
      slots={{ transition: Fade }}
      slotProps={{
        transition: { timeout: { enter: 180, exit: 120 } },
      }}
      PaperProps={{
        sx: {
          borderRadius:  "16px",
          padding:       "32px 28px 28px",
          maxWidth:      maxWidth,
          width:         "100%",
          textAlign:     "center",
          boxShadow:     hceShadows.modal,
          overflow:      "visible",
          fontFamily:    hceTypography.fontFamily,
          "@keyframes hceSlideUp": {
            from: { opacity: 0, transform: "translateY(16px) scale(0.97)" },
            to:   { opacity: 1, transform: "translateY(0) scale(1)" },
          },
          animation: "hceSlideUp 200ms cubic-bezier(0.4,0,0.2,1)",
        },
      }}
    >
      <MuiDialogContent sx={{ p: 0, overflow: "visible" }}>

        {/* ── Badge con ícono ─────────────────────────────── */}
        {icon && (
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <Box sx={{
              display:         "flex",
              alignItems:      "center",
              justifyContent:  "center",
              width:           56,
              height:          56,
              borderRadius:    "12px",
              backgroundColor: iconBgColor,
              color:           hceColors.neutro.white[50],
              flexShrink:      0,
            }}>
              {icon}
            </Box>
          </Box>
        )}

        {/* ── Título ──────────────────────────────────────── */}
        <Typography
          id="hce-modal-title"
          sx={{
            fontFamily: hceTypography.fontFamily,
            fontWeight: 700,
            fontSize:   "1.125rem",
            color:      hceColors.primary.blue[500],
            mb:         description ? 1 : (input || hasButtons) ? 2.5 : 0,
          }}
        >
          {title}
        </Typography>

        {/* ── Descripción ─────────────────────────────────── */}
        {description && (
          <Typography
            id="hce-modal-description"
            sx={{
              fontFamily: hceTypography.fontFamily,
              fontSize:   "0.875rem",
              color:      hceColors.neutro.black[300],
              lineHeight: 1.65,
              mb:         (input || hasButtons) ? 2.5 : 0,
            }}
          >
            {description}
          </Typography>
        )}

        {/* ── Input opcional ──────────────────────────────── */}
        {input && (
          <Box sx={{ mb: hasButtons ? 2.5 : 0, textAlign: "left" }}>
            <TextInput
              label={input.label}
              placeholder={input.placeholder ?? "Text"}
              value={input.value}
              onChange={input.onChange}
            />
          </Box>
        )}

        {/* ── Botones ─────────────────────────────────────── */}
        {hasButtons && (
          <Box sx={{
            display:       "flex",
            flexDirection: isRow ? "row" : "column",
            gap:           1.5,
          }}>

            {/* Confirmar (verde / filled) */}
            {confirmButton && (
              <Box sx={{ flex: isRow ? 1 : undefined }}>
                <Button
                  onClick={confirmButton.onClick}
                  color="secondary"
                  fullWidth
                >
                  {confirmButton.icon && (
                    <Box component="span" sx={{ mr: 1, display: "inline-flex", alignItems: "center" }}>
                      {confirmButton.icon}
                    </Box>
                  )}
                  {confirmButton.label}
                </Button>
              </Box>
            )}

            {/* Cancelar (outlined azul) */}
            {cancelButton && (
              <Box sx={{ flex: isRow ? 1 : undefined }}>
                <MuiButton
                  variant="outlined"
                  fullWidth
                  onClick={cancelButton.onClick}
                  sx={{
                    borderColor:   hceColors.primary.blue[500],
                    color:         hceColors.primary.blue[500],
                    fontWeight:    600,
                    fontSize:      "0.875rem",
                    textTransform: "none",
                    borderRadius:  "8px",
                    height:        "100%",
                    minHeight:     36,
                    transition:    "border-color 150ms cubic-bezier(0.4, 0, 0.2, 1), background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      borderColor:     hceColors.primary.blue[700],
                      backgroundColor: hceColors.primary.blue[50],
                    },
                  }}
                >
                  {cancelButton.icon && (
                    <Box component="span" sx={{ mr: 1, display: "inline-flex", alignItems: "center" }}>
                      {cancelButton.icon}
                    </Box>
                  )}
                  {cancelButton.label}
                </MuiButton>
              </Box>
            )}

          </Box>
        )}

      </MuiDialogContent>
    </MuiDialog>
  )
}
