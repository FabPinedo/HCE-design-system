import { useId } from "react"
import { hceColors } from "../../tokens/hce.tokens"

export interface ToggleProps {
  checked: boolean
  onChange: (v: boolean) => void
  disabled?: boolean
  /** Hook de pruebas E2E — `data-testid` en el `<input>`. */
  testId?: string
}

/** Switch on/off. */
export function Toggle({ checked, onChange, disabled = false, testId }: ToggleProps) {
  const id = useId()
  return (
    <label
      htmlFor={id}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        data-testid={testId}
        style={{ display: "none" }}
      />
      {/* Sin onClick propio: el <label> ya reenvía el click nativamente al <input>
          oculto de arriba. Agregar un onClick acá duplicaba el toggle (ambos disparan
          en el mismo click, con el mismo `checked` obsoleto) y podía anular el cambio. */}
      <span
        style={{
          width: 44,
          height: 24,
          borderRadius: "12px",
          // blue[600] == --ds-color-interactive exactamente — reactivo al
          // tema activo de DSProvider, mismo hex de siempre como fallback.
          backgroundColor: checked
            ? `var(--ds-color-interactive, ${hceColors.primary.blue[600]})`
            : hceColors.neutro.black[300],
          position: "relative",
          cursor: disabled ? "not-allowed" : "pointer",
          transition: "background-color 220ms",
          flexShrink: 0,
          display: "inline-block",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: 2,
            left: checked ? 20 : 2,
            width: 20,
            height: 20,
            borderRadius: "50%",
            backgroundColor: "#ffffff",
            transition: "left 220ms",
            boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
            display: "block",
          }}
        />
      </span>
    </label>
  )
}
