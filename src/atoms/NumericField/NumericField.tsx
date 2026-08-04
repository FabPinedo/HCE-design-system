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
  /** Activa el estado de error: label, borde y texto cambian a rojo, igual que TextInput/DatePicker. */
  error?: boolean
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
  error = false,
}: NumericFieldProps) {
  // ── Colores reactivos (ahora vía :hover/:focus-within en CSS) ──────────
  // blue[600] == --ds-color-interactive exactamente — reactivo al tema activo
  // de DSProvider, mismo hex de siempre como fallback. Rojo si error, mismo
  // criterio que TextInput/DatePicker (error pisa disabled/readOnly).
  const mainColor = disabled
    ? hceColors.neutro.black[300]
    : error
      ? hceColors.alert.error[600]
      : `var(--ds-color-interactive, ${hceColors.primary.blue[600]})`

  const activeColor = disabled
    ? hceColors.neutro.black[300]
    : error
      ? hceColors.alert.error[600]
      : `var(--ds-color-interactive, ${hceColors.primary.blue[600]})`

  // Si es readOnly, el texto nunca "reacciona" (antes el listener de
  // hover/focus estaba deshabilitado) — mismo valor en default y active.
  const textDefaultColor = disabled
    ? hceColors.neutro.black[300]
    : error
      ? hceColors.alert.error[600]
      : hceColors.neutro.black[700]
  const textActiveColor  = disabled
    ? hceColors.neutro.black[300]
    : error
      ? hceColors.alert.error[600]
      : readOnly
        ? hceColors.neutro.black[700]
        : `var(--ds-color-interactive, ${hceColors.primary.blue[600]})`

  const cssVars = {
    "--nf-main":         mainColor,
    "--nf-active":       activeColor,
    "--nf-focus-ring":   hceColors.primary.blue[100],
    "--nf-text-default": textDefaultColor,
    "--nf-text-active":  textActiveColor,
    "--nf-bg":           readOnly || disabled ? hceColors.neutro.white[50] : "#ffffff",
  } as CSSProperties

  return (
    <div style={cssVars}>
      {label && <label className="hce-numeric-label">{label}</label>}
      <div className="hce-numeric-box">
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
