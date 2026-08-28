import { type ReactNode, useId } from "react"
import "./HceFormModal.css"
import { Overlay } from "../../atoms/Overlay/Overlay"
import { Button } from "../../atoms/Button/Button"
import { hceColors, hceTypography } from "../../tokens/hce.tokens"

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
  /** Breakpoint (mismos anchos que usaba MUI) o número en px para ancho personalizado. Default "sm" */
  maxWidth?:  "xs" | "sm" | "md" | "lg" | "xl" | number
  /** Si true, el modal ocupa todo el ancho disponible hasta maxWidth. Default true */
  fullWidth?: boolean

  // ── Botón primario (confirmar / guardar) ───────────
  primaryButton?: PrimaryButtonConfig

  // ── Botón secundario (cancelar / volver) ───────────
  secondaryButton?: SecondaryButtonConfig

  // ── Alineación de botones en el footer ────────────
  /** Posición horizontal de los botones. Default "right" */
  buttonAlign?: "left" | "center" | "right"

  /** Si true, primaryButton y secondaryButton se reparten el 100% del ancho del
   * footer en partes iguales (en vez del minWidth fijo de 100px). Opcional — default
   * false, no afecta a los usos existentes que no lo envíen. */
  buttonsFullWidth?: boolean

  // ── Comportamiento del backdrop ────────────────────
  /** Si false, el click fuera del modal NO lo cierra. Default true */
  closeOnBackdrop?: boolean

  iconClose?: boolean

  // ── Escape hatches ─────────────────────────────────
  className?: string
  style?:     React.CSSProperties
  borderNone? : boolean

  // ── Testing ─────────────────────────────────────────
  /**
   * Hook de pruebas E2E — id base, sufijado `-close`, `-primary`,
   * `-secondary` en los botones correspondientes.
   */
  testId?: string
}

// Mismos anchos de breakpoint que usaba MUI Dialog maxWidth
const BREAKPOINT_PX: Record<string, number> = {
  xs: 444,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
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
  buttonAlign      = "right",
  buttonsFullWidth = false,
  closeOnBackdrop = true,
  className,
  iconClose= true,
  style,
  borderNone=false,
  testId,
}: HceFormModalProps) {

  const hasButtons = !!(primaryButton || secondaryButton)

  const maxWidthPx = typeof maxWidth === "number" ? maxWidth : BREAKPOINT_PX[maxWidth]

  // Antes: id fijo "hce-form-modal-title" — mismo bug que HceModal si el
  // modal se monta más de una vez a la vez. useId() lo hace único por instancia.
  const titleId = useId()

  return (
    <Overlay
      open={open}
      onClose={onClose}
      disableBackdropClose={!closeOnBackdrop}
      labelledBy={titleId}
      testId={testId}
      panelClassName={`hce-formmodal-panel${className ? ` ${className}` : ""}`}
      panelStyle={{
        ...style,
        width: fullWidth ? "100%" : undefined,
        maxWidth: maxWidthPx,
      }}
    >

      {/* ── Cabecera ─────────────────────────────────────────────────────── */}
      <header
        style={{
          display:         "flex",
          alignItems:      "center",
          justifyContent:  "space-between",
          backgroundColor: `var(--ds-color-interactive, #003d96)`,
          padding:         "16px 20px",
          borderRadius:    "8px 8px 0 0",
          flexShrink:      0,
        }}
      >
        <h2
          id={titleId}
          style={{
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
        </h2>


{iconClose && (
        <button
          type="button"
          className="hce-formmodal-close"
          onClick={onClose}
          aria-label="Cerrar modal"
          data-testid={testId ? `${testId}-close` : undefined}
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
        </button>
)}
      </header>

      {/* ── Cuerpo ───────────────────────────────────────────────────────── */}
      <div
        style={{
          padding:    "20px",
          overflowY:  "auto",
          fontFamily: hceTypography.fontFamily,
        }}
      >
        {children}
      </div>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      {hasButtons && (
        <footer
          style={{
            display:        "flex",
            alignItems:     "center",
            justifyContent: buttonAlign,
            gap:            "12px",
            padding:        "12px 20px",
            borderTop:      borderNone==true? 'none':`1px solid ${hceColors.primary.blue[100]}`,
            flexShrink:     0,
            flexWrap:       "wrap",
          }}
        >

          {/* Botón primario — va primero en DOM/orden visual (acción principal destacada) */}
          {primaryButton && (
            <div style={{ minWidth: buttonsFullWidth ? 0 : "100px", flex: buttonsFullWidth ? 1 : undefined }}>
              <Button
                sx={{px: "30px", py: "12px"}}
                variant="primary"
                fullWidth
                onClick={primaryButton.onClick}
                disabled={primaryButton.disabled || primaryButton.loading}
                startIcon={(!primaryButton.loading && primaryButton.icon) ? primaryButton.icon : undefined}
                testId={testId ? `${testId}-primary` : undefined}
                color={primaryButton.color ?? `var(--ds-color-interactive, #003d96)`}
              >
                {primaryButton.loading ? (
                  <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span className="hce-formmodal-spinner" aria-hidden="true" />
                    {primaryButton.label}
                  </span>
                ) : (
                  primaryButton.label
                )}
              </Button>
            </div>
          )}

          {/* Botón secundario — va segundo en DOM/orden visual */}
          {secondaryButton && (
            <div style={{ minWidth: buttonsFullWidth ? 0 : "100px", flex: buttonsFullWidth ? 1 : undefined }}>
              <Button
                sx={{px: "30px", py: "12px"}}
                variant="outlined"
                fullWidth
                onClick={secondaryButton.onClick}
                disabled={secondaryButton.disabled}
                startIcon={secondaryButton.icon}
                testId={testId ? `${testId}-secondary` : undefined}
                color={secondaryButton.color ?? `var(--ds-color-interactive, #003d96)`}
              >
                {secondaryButton.label}
              </Button>
            </div>
          )}

        </footer>
      )}

    </Overlay>
  )
}
