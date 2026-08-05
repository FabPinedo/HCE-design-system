import type { ReactNode } from "react"
import { hceColors, hceTypography } from "../../tokens/hce.tokens"

export interface FieldColProps {
  label?: string
  children: ReactNode
  flex?: number | string
  /** Ancho mínimo antes de que el campo se comprima — útil en filas flex-wrap. */
  minWidth?: number | string
  /** Activa el estado de error: la etiqueta cambia a rojo, igual que el resto de campos del design system (TextInput, DatePicker, NumericField). */
  error?: boolean
}

/** Columna label + control, usada como wrapper de campos de formulario (ej. NumericField). */
export function FieldCol({ label, children, flex = 1, minWidth, error = false }: FieldColProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex, minWidth }}>
      <span
        style={{
          fontFamily: hceTypography.fontFamily,
          fontSize: "0.72rem",
          fontWeight: 600,
          // blue[600] == --ds-color-interactive exactamente — reactivo al
          // tema activo de DSProvider, mismo hex de siempre como fallback.
          // Rojo si error, mismo criterio que TextInput/DatePicker/NumericField.
          color: error
            ? hceColors.alert.error[600]
            : `var(--ds-color-interactive, ${hceColors.primary.blue[600]})`,
        }}
      >
        {label}
      </span>
      {children}
    </div>
  )
}
