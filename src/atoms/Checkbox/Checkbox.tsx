import { hceColors } from "../../tokens/hce.tokens";
import "./Checkbox.css"

interface Props {
  label?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
  sideLabel?: "start" | "end" | "top" | "bottom";
  /**
   * Nombre accesible para el input cuando se usa sin `label` visible (p. ej.
   * dentro de una fila de lista que ya renderiza el texto por fuera de este
   * átomo). Sin esto, un checkbox sin `label` queda sin nombre accesible
   * para lectores de pantalla (WCAG 4.1.2).
   */
  ariaLabel?: string;
}

const PLACEMENT_FLEX_DIRECTION: Record<NonNullable<Props["sideLabel"]>, string> = {
  end:   "row",
  start: "row-reverse",
  top:   "column-reverse",
  bottom: "column",
}

export const Checkbox = ({
  label,
  checked,
  onChange,
  disabled,
  sideLabel = "end",
  ariaLabel,
}: Props) => {
  return (
    <label
      className={`hce-checkbox${disabled ? " hce-checkbox--disabled" : ""}`}
      style={{ flexDirection: PLACEMENT_FLEX_DIRECTION[sideLabel] as React.CSSProperties["flexDirection"], color:hceColors.primary.blue[600] }}
    >
      <input
        type="checkbox"
        className="hce-checkbox__input"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        aria-label={!label ? ariaLabel : undefined}
      />
      <span className="hce-checkbox__box" aria-hidden="true">
        {checked && (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
            <polyline points="5 13 10 18 19 7" />
          </svg>
        )}
      </span>
      {label && <span className="hce-checkbox__label">{label}</span>}
    </label>
  );
};
