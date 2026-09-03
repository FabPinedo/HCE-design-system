import { useRef, type CSSProperties } from "react"
import "./NumericField.css"
import { hceColors } from "../../tokens/hce.tokens"

export interface NumericFieldProps {
  label: string
  value: string
  onChange?: (v: string) => void
  suffix: string
  unitLabel?: string
  numberType?: "decimal" | "natural"
  readOnly?: boolean
  disabled?: boolean
  error?: boolean
  testId?: string
}

export function NumericField({
  label,
  value,
  onChange,
  suffix,
  unitLabel,
  numberType = "decimal",
  readOnly = false,
  disabled = false,
  error = false,
  testId,
}: NumericFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null)

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

  // El texto escrito por el usuario usa el mismo azul del placeholder,
  // fijo desde hceColors (no la var del tema), tanto en reposo como en hover/focus.
  const textDefaultColor = disabled
    ? hceColors.neutro.black[300]
    : error
      ? hceColors.alert.error[600]
      : hceColors.primary.blue[600]

  const textActiveColor = disabled
    ? hceColors.neutro.black[300]
    : error
      ? hceColors.alert.error[600]
      : hceColors.primary.blue[600]

  const cssVars = {
    "--nf-main": mainColor,
    "--nf-active": activeColor,
    "--nf-focus-ring": hceColors.primary.blue[100],
    "--nf-text-default": textDefaultColor,
    "--nf-text-active": textActiveColor,
    "--nf-bg": readOnly || disabled ? hceColors.neutro.white[50] : "#ffffff",
  } as CSSProperties

  // La unidad solo se "pega" al valor cuando hay algo escrito. Con el
  // campo vacío, el input usa su ancho normal para no cortar el
  // placeholder (ej. "lpm", "mmHg").
  const showUnit = Boolean(unitLabel && value)

  return (
    <div style={cssVars}>
      {label && <label className="hce-numeric-label">{label}</label>}
      <div
        className="hce-numeric-box"
        onClick={() => inputRef.current?.focus()}
      >
        <input
          ref={inputRef}
          disabled={disabled}
          type="text"
          inputMode={numberType === "decimal" ? "decimal" : "numeric"}
          value={value}
          placeholder={suffix || undefined}
          readOnly={readOnly}
          className={
            showUnit
              ? "hce-numeric-field hce-numeric-field--with-unit"
              : "hce-numeric-field"
          }
          data-testid={testId}
          style={showUnit ? { width: `${value.length}ch` } : undefined}
          onChange={(e) =>
            onChange?.(
              numberType === "decimal"
                ? e.target.value.replace(/[^\d.,]/g, "")
                : e.target.value.replace(/[^\d]/g, ""),
            )
          }
        />
        {showUnit && <span className="hce-numeric-unit">{unitLabel}</span>}
      </div>
    </div>
  )
}