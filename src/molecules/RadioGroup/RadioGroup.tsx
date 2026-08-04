import { useId } from "react";
import { hceColors, hceTypography } from "../../tokens/hce.tokens";

interface Option<T extends string | boolean> {
  value: T;
  label: string;
}

interface Props<T extends string | boolean> {
  legend?: string;
  value: T | null | undefined;
  onChange: (v: T) => void;
  options: Option<T>[] | readonly Option<T>[];
  disabled?: boolean;
}

export const RadioGroup = <T extends string | boolean>({
  legend,
  value,
  onChange,
  disabled = false,
  options = [
    { value: "si" as unknown as T, label: "Si" },
    { value: "no" as unknown as T, label: "No" },
  ],
}: Props<T>) => {
  const groupName = useId();
  return (
    <fieldset
      style={{
        // green[500] == --ds-color-secondary (csf) exactamente — reactivo al
        // tema activo de DSProvider, mismo hex de siempre como fallback.
        border: `1.5px solid ${disabled ? hceColors.neutro.black[200] : `var(--ds-color-secondary, ${hceColors.primary.green[500]})`}`,
        borderRadius: "8px",
        padding: "9px 16px",
        margin: 0,
        opacity: disabled ? 0.5 : 1,
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {legend && (
        <legend
          style={{
            padding: "0 8px",
            fontFamily: hceTypography.fontFamily,
            fontSize: "0.72rem",
            fontWeight: 700,
            // blue[600] == --ds-color-interactive exactamente — reactivo al
            // tema activo de DSProvider, mismo hex de siempre como fallback.
            color: disabled
              ? hceColors.neutro.black[400]
              : `var(--ds-color-interactive, ${hceColors.primary.blue[600]})`,
          }}
        >
          {legend}
        </legend>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 24,
        }}
      >
        {options.map((opt) => {
          const optionKey = String(opt.value);
          return (
            <label
              key={optionKey}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                cursor: disabled ? "not-allowed" : "pointer",
                fontFamily: hceTypography.fontFamily,
                fontSize: "0.875rem",
              }}
            >
              {opt.label}
              <input
                type="radio"
                name={groupName}
                checked={value === opt.value}
                onChange={() => {
                  if (!disabled && typeof onChange === "function") {
                    onChange(opt.value);
                  }
                }}
                disabled={disabled}
                // blue[500] == --ds-color-primary (csf) exactamente — reactivo al
                // tema activo de DSProvider, mismo hex de siempre como fallback.
                style={{ accentColor: `var(--ds-color-primary, ${hceColors.primary.blue[500]})`, width: 18, height: 18 }}
              />
            </label>
          );
        })}
      </div>
    </fieldset>
  );
};
