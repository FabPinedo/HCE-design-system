import type { CSSProperties } from "react"
import "./NumericField.css"
import { hceColors } from "../../tokens/hce.tokens"

export interface NumericFieldProps {
  label: string
  value: string
  onChange?: (v: string) => void
  /** Unidad mostrada como placeholder dentro del input cuando está vacío (ej. "Kg", "°C"). */
  suffix: string
  /** "decimal" permite coma/punto (ej. peso, temperatura); "natural" solo dígitos enteros. */
  numberType?: "decimal" | "natural"
  readOnly?: boolean
  disabled?: boolean
}

/** Campo numérico con label y unidad como placeholder. */
export function NumericField({
  label,
  value,
  onChange,
  suffix,
  numberType = "decimal",
  readOnly = false,
  disabled = false,
}: NumericFieldProps) {
  // ── Colores reactivos (ahora vía :hover/:focus-within en CSS) ──────────
  const mainColor = disabled
    ? hceColors.neutro.black[300]
    : hceColors.primary.blue[600]

  // Si es readOnly, el texto nunca "reacciona" (antes el listener de
  // hover/focus estaba deshabilitado) — mismo valor en default y active.
  const textDefaultColor = disabled ? hceColors.neutro.black[300] : hceColors.neutro.black[700]
  const textActiveColor  = disabled
    ? hceColors.neutro.black[300]
    : readOnly
      ? hceColors.neutro.black[700]
      : hceColors.primary.blue[600]

  const cssVars = {
    "--nf-main":         mainColor,
    "--nf-text-default": textDefaultColor,
    "--nf-text-active":  textActiveColor,
    "--nf-bg":           readOnly || disabled ? hceColors.neutro.white[50] : "#ffffff",
  } as CSSProperties

  return (
    <div>
      {label && <label className="hce-numeric-label">{label}</label>}
      <div className="hce-numeric-box" style={cssVars}>
        <input
          disabled={disabled}
          type="text"
          inputMode={numberType === "decimal" ? "decimal" : "numeric"}
          value={value}
          placeholder={suffix || undefined}
          readOnly={readOnly}
          className="hce-numeric-field"
          onChange={(e) =>
            onChange?.(
              numberType === "decimal"
                ? e.target.value.replace(/[^\d.,]/g, "")
                : e.target.value.replace(/[^\d]/g, ""),
            )
          }
        />
      </div>
    </div>
  )
}
