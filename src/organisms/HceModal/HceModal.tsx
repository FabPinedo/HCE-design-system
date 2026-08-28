import { type ReactNode, useId }  from "react"
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

  // ── Testing ─────────────────────────────────────────
  /**
   * Hook de pruebas E2E (Playwright) — id base del modal. Se sufija
   * internamente para cada sub-elemento: `{testId}` (panel), `-title`,
   * `-description`, `-confirm`, `-cancel`. Convención:
   * `{microfrontend}-{componente}` (ver docs/testing-convention.md). No
   * derivar el valor de datos identificables del paciente.
   */
  testId?: string
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
  testId,
}: HceModalProps) {
  const hasButtons = !!(confirmButton || cancelButton)
  const isRow      = buttonLayout === "row"

  // Antes: ids fijos ("hce-modal-title"/"hce-modal-description") — si dos
  // HceModal coexistían en el DOM (mf-shell monta varios MFs a la vez), el
  // aria-labelledby/describedby de uno apuntaba al título/descripción del
  // otro. useId() genera un id único por instancia, sin que el consumidor
  // tenga que pasarlo.
  const reactId     = useId()
  const titleId      = `${reactId}-title`
  const descriptionId = `${reactId}-description`

  return (
    <Overlay
      open={open}
      onClose={onClose}
      labelledBy={titleId}
      describedBy={description ? descriptionId : undefined}
      testId={testId}
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
        id={titleId}
        data-testid={testId ? `${testId}-title` : undefined}
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
          id={descriptionId}
          data-testid={testId ? `${testId}-description` : undefined}
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
                testId={testId ? `${testId}-confirm` : undefined}
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
                style={{  padding: '6px 16px',    lineHeight: 1.75, minWidth: '64px' }}
                disabled={cancelButton.disabled}
                startIcon={cancelButton.icon}
                testId={testId ? `${testId}-cancel` : undefined}
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
