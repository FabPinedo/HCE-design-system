import { useRef } from "react";
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
  /**
   * Hook de pruebas E2E (Playwright) — se renderiza como `data-testid` en el
   * contenedor raíz (`role="tablist"`). Convención:
   * `{microfrontend}-{componente}[-elemento][-instancia]` (ver
   * docs/testing-convention.md). No usar datos identificables del paciente
   * (nombre, DNI) como valor — solo ids técnicos opacos.
   */
  testId?: string;
  /** Clase CSS extra, mergeada con la clase interna del contenedor raíz. */
  className?: string;
  /** Estilo inline adicional, mergeado sobre los estilos por defecto del contenedor raíz. */
  style?: React.CSSProperties;
  /**
   * "default" (por defecto): comportamiento actual, bordes redondeados en
   * las cuatro esquinas. "panel": redondea solo las esquinas superiores y
   * quita el borde inferior — pensado para cuando el toggle va pegado
   * arriba de un panel/contenedor (ver AddPatientBackgroundModal).
   */
  variant?: "default" | "panel";
}

export function SegmentedToggle<T extends string = string>({
  options,
  value,
  onChange,
  "aria-label": ariaLabel,
  testId,
  className,
  style,
  variant = "default",
}: SegmentedToggleProps<T>) {
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);

  // Patrón WAI-ARIA APG "tabs" (roving tabindex): solo el tab seleccionado
  // es alcanzable con Tab (tabIndex 0); el resto queda en -1 y se navega con
  // las flechas. Activación automática — mover el foco con flechas ya
  // selecciona la opción, sin necesitar Enter/Space, que es el patrón
  // estándar para segmented controls/toggles (a diferencia de tabpanels
  // reales, donde a veces se prefiere activación manual).
  const focusAndSelect = (index: number) => {
    const opt = options[index];
    if (!opt || opt.disabled) return;
    itemRefs.current[index]?.focus();
    onChange(opt.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | null = null;

    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        nextIndex = index;
        do {
          nextIndex = (nextIndex + 1) % options.length;
        } while (options[nextIndex]?.disabled && nextIndex !== index);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        nextIndex = index;
        do {
          nextIndex = (nextIndex - 1 + options.length) % options.length;
        } while (options[nextIndex]?.disabled && nextIndex !== index);
        break;
      case "Home":
        nextIndex = options.findIndex((opt) => !opt.disabled);
        break;
      case "End":
        nextIndex = options.length - 1;
        while (nextIndex >= 0 && options[nextIndex]?.disabled) nextIndex -= 1;
        break;
      default:
        return;
    }

    if (nextIndex !== null && nextIndex >= 0 && nextIndex !== index) {
      event.preventDefault();
      focusAndSelect(nextIndex);
    }
  };

  const rootClassName = [
    "hce-segmented-toggle",
    variant === "panel" ? "hce-segmented-toggle--panel" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={rootClassName}
      role="tablist"
      aria-label={ariaLabel}
      data-testid={testId}
      style={{ "--hce-segmented-count": options.length, ...style } as React.CSSProperties}
    >
      {options.map((opt, index) => (
        <button
          key={opt.value}
          ref={(el) => {
            itemRefs.current[index] = el;
          }}
          type="button"
          role="tab"
          aria-selected={value === opt.value}
          tabIndex={value === opt.value ? 0 : -1}
          disabled={opt.disabled}
          className={`hce-segmented-toggle__item${
            value === opt.value ? " hce-segmented-toggle__item--selected" : ""
          }`}
          onClick={() => onChange(opt.value)}
          onKeyDown={(event) => handleKeyDown(event, index)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}