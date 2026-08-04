import type { ReactNode } from "react"
import { hceColors, hceTypography } from "../../tokens/hce.tokens"

export interface FieldColProps {
  label: string
  children: ReactNode
  flex?: number | string
  /** Ancho mínimo antes de que el campo se comprima — útil en filas flex-wrap. */
  minWidth?: number | string
}

/** Columna label + control, usada como wrapper de campos de formulario (ej. NumericField). */
export function FieldCol({ label, children, flex = 1, minWidth }: FieldColProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex, minWidth }}>
      <span
        style={{
          fontFamily: hceTypography.fontFamily,
          fontSize: "0.72rem",
          fontWeight: 600,
          // blue[600] == --ds-color-interactive exactamente — reactivo al
          // tema activo de DSProvider, mismo hex de siempre como fallback.
          color: `var(--ds-color-interactive, ${hceColors.primary.blue[600]})`,
        }}
      >
        {label}
      </span>
      {children}
    </div>
  )
}
