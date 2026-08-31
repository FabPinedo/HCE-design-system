import "./SegmentedToggle.css";

export interface SegmentedToggleOption<T extends string = string> {
  label: string;
  value: T;
  disabled?: boolean;
}

interface SegmentedToggleProps<T extends string = string> {
  options: SegmentedToggleOption<T>[];
  value: T;
  onChange: (value: T) => void;
  /** Nombre para agrupar accesibilidad si hay varios toggles en la misma pantalla */
  "aria-label"?: string;
}

export function SegmentedToggle<T extends string = string>({
  options,
  value,
  onChange,
  "aria-label": ariaLabel,
}: SegmentedToggleProps<T>) {
  return (
    <div
      className="hce-segmented-toggle"
      role="tablist"
      aria-label={ariaLabel}
      style={{ "--hce-segmented-count": options.length } as React.CSSProperties}
    >
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          role="tab"
          aria-selected={value === opt.value}
          disabled={opt.disabled}
          className={`hce-segmented-toggle__item${
            value === opt.value ? " hce-segmented-toggle__item--selected" : ""
          }`}
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}