import { type ReactNode }  from "react"
import { Overlay }         from "../../atoms/Overlay/Overlay"
import { Button }          from "../../atoms/Button/Button"
import { TextInput }       from "../../atoms/TextInput/TextInput"
import { hceColors, hceShadows } from "../../tokens/hce.tokens"

// ─── Sub-tipos ────────────────────────────────────────────────────────────────

export interface ModalButtonConfig {
  label:    string
  /** Ícono a la izquierda del label */
  icon?:    ReactNode
  onClick:  () => void
  disabled?: boolean
  /**
   * Color personalizado del botón.
   * - confirmButton (filled): `secondaryDark` del tenant activo
   * - cancelButton (outlined): `primary` del tenant activo
   */
  color?:   string
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

  // ── Contenido libre (reemplaza o complementa input) ─
  /** JSX libre en el cuerpo del modal (se renderiza después de description y antes de botones) */
  children?: ReactNode

  // ── Botones (ambos opcionales) ─────────────────────
  /** Botón principal (secondaryDark/filled) */
  confirmButton?: ModalButtonConfig
  /** Botón secundario (primary/outlined) */
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
  // blue[500] == --ds-color-primary (csf) exactamente — reactivo al tema activo
  // de DSProvider, con el mismo hex de siempre como fallback fuera de él.
  iconBgColor  = `var(--ds-color-primary, ${hceColors.primary.blue[500]})`,
  input,
  children,
  confirmButton,
  cancelButton,
  buttonLayout = "row",
  maxWidth     = 420,
}: HceModalProps) {
  const hasButtons = !!(confirmButton || cancelButton)
  const isRow      = buttonLayout === "row"

  return (
    <Overlay
      open={open}
      onClose={onClose}
      labelledBy="hce-modal-title"
      describedBy={description ? "hce-modal-description" : undefined}
      panelStyle={{
        borderRadius:  16,
        padding:       "32px 28px 28px",
        maxWidth,
        width:         "100%",
        textAlign:     "center",
        boxShadow:     hceShadows.modal,
        fontFamily:    "var(--ds-font-family, 'Poppins', sans-serif)",
        backgroundColor: " #ffffff",
        boxSizing:     "border-box",
      }}
    >
      {/* ── Badge con ícono ─────────────────────────────── */}
      {icon && (
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
          <div style={{
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
          </div>
        </div>
      )}

      {/* ── Título ──────────────────────────────────────── */}
      <div
        id="hce-modal-title"
        style={{
          fontFamily: "var(--ds-font-family, 'Poppins', sans-serif)",
          fontWeight: 700,
          fontSize:   "1.125rem",
          color:      `var(--ds-color-primary, ${hceColors.primary.blue[500]})`,
          marginBottom: description ? 8 : (input || hasButtons) ? 20 : 0,
        }}
      >
        {title}
      </div>

      {/* ── Descripción ─────────────────────────────────── */}
      {description && (
        <div
          id="hce-modal-description"
          style={{
            fontFamily: "var(--ds-font-family, 'Poppins', sans-serif)",
            fontSize:   "0.875rem",
            color:      "var(--ds-color-text-secondary, #545454)",
            lineHeight: 1.65,
            marginBottom: (input || hasButtons) ? 20 : 0,
          }}
        >
          {description}
        </div>
      )}

      {/* ── Input opcional ──────────────────────────────── */}
      {input && (
        <div style={{ marginBottom: (children || hasButtons) ? 20 : 0, textAlign: "left" }}>
          <TextInput
            label={input.label}
            placeholder={input.placeholder ?? "Text"}
            value={input.value}
            onChange={input.onChange}
          />
        </div>
      )}

      {/* ── Contenido libre ──────────────────────────────── */}
      {children && (
        <div style={{ marginBottom: hasButtons ? 20 : 0, textAlign: "left" }}>
          {children}
        </div>
      )}

      {/* ── Botones ─────────────────────────────────────── */}
      {hasButtons && (
        <div style={{
          display:       "flex",
          flexDirection: isRow ? "row" : "column",
          gap:           12,
        }}>

          {/* Confirmar (filled — color customizable, default secondaryDark) */}
          {confirmButton && (
            <div style={{ flex: isRow ? 1 : undefined
            }}>
              <Button
                variant="primary"
                fullWidth
                style={{  padding: '6px 16px',    lineHeight: 1.75, minWidth: '64px' }}
                onClick={confirmButton.onClick}
                disabled={confirmButton.disabled}
                startIcon={confirmButton.icon}
                color={confirmButton.color ?? `var(--ds-color-interactive-button, ${hceColors.primary.green[800]})`}
              >
                {confirmButton.label}
              </Button>
            </div>
          )}

          {/* Cancelar (outlined — color customizable, default primary) */}
          {cancelButton && (
            <div style={{ flex: isRow ? 1 : undefined }}>
              <Button
                variant="outlined"
                fullWidth
                onClick={cancelButton.onClick}
                disabled={cancelButton.disabled}
                startIcon={cancelButton.icon}
                color={cancelButton.color ?? `var(--ds-color-primary, ${hceColors.primary.blue[500]})`}
              >
                {cancelButton.label}
              </Button>
            </div>
          )}

        </div>
      )}
    </Overlay>
  )
}
