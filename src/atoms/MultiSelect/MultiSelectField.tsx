import { useId, useRef, useState, type CSSProperties } from "react";
import "./MultiSelectField.css"
import {
  hceColors,
} from "../../tokens/hce.tokens";
import { Checkbox } from "../Checkbox/Checkbox";
import { Menu } from "../Menu/Menu";

interface Option {
  value: string;
  label: string;
}

interface Props {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  options: Option[];
  placeholder?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  required?: boolean;
  /** Activa el estado de error: todo cambia a rojo */
  error?: boolean;
}

/** Ícono de "ojo" — visibility del resumen de seleccionados */
function VisibilityGlyph() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.9 }}>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

/**
 * MultiSelect — reemplazo de MUI Autocomplete (multiple + disableCloseOnSelect
 * + checkboxes por opción), como listbox custom en CSS/HTML puro siguiendo el
 * mismo patrón que molecules/SearchComboInput (click-outside cierra, teclado
 * ArrowUp/Down/Enter/Escape, sin depender de MUI Popper).
 *
 * NOTA DE PARIDAD (comportamiento deliberado, ver stories/atoms/MultiSelect.stories.tsx
 * "Disabled"): `disabled=true` NO bloquea abrir el trigger/dropdown — solo
 * las opciones quedan inertes (no se puede cambiar la selección). Este
 * comportamiento ya era así en la versión MUI (Autocomplete nunca recibía
 * `disabled`, solo `disableClearable`) y se conserva tal cual.
 */
export const MultiSelect = ({
  label,
  value,
  onChange,
  options,
  placeholder = "-Seleccionar Opción-",
  fullWidth = true,
  disabled,
  required,
  error,
}: Props) => {
  const [open, setOpen] = useState(false)
  const [activeIdx, setActiveIdx] = useState(-1)
  const [menuWidth, setMenuWidth] = useState<number>()
  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const triggerId = useId()
  const listId = useId()

  const accentColor = error
    ? hceColors.alert.error[600]
    : hceColors.neutro.black[200];

  const activeColor = error
    ? hceColors.alert.error[600]
    : hceColors.primary.blue[600];

  const textDefaultColor = error
    ? hceColors.alert.error[600]
    : hceColors.neutro.black[400];

  const selectedOptions = options.filter((opt) =>
    (value ?? []).includes(opt.value),
  );

  // Abre el dropdown y mide el ancho del trigger para que el panel portado
  // (ver <Menu> más abajo) quede exactamente tan ancho como el trigger —
  // igual que el `left:0; right:0` que tenía la versión no-portada. El
  // click-afuera/Escape/reposicionamiento en scroll los maneja `Menu`
  // internamente, no hace falta duplicarlos acá.
  function openMenu() {
    setMenuWidth(triggerRef.current?.getBoundingClientRect().width)
    setOpen(true)
  }

  function toggleOption(optionValue: string) {
    if (disabled) return
    const next = value.includes(optionValue)
      ? value.filter(v => v !== optionValue)
      : [...value, optionValue]
    onChange(next)
  }

  function handleTriggerKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      openMenu()
      setActiveIdx(i => (i < 0 ? 0 : i))
    } else if (e.key === "Escape") {
      setOpen(false)
    }
  }

  function handleListKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActiveIdx(i => Math.min(i + 1, options.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActiveIdx(i => Math.max(i - 1, 0))
    } else if (e.key === "Enter" && activeIdx >= 0 && !disabled) {
      e.preventDefault()
      toggleOption(options[activeIdx].value)
    } else if (e.key === "Escape") {
      setOpen(false)
    }
  }

  const cssVars = {
    "--ms-main":   accentColor,
    "--ms-active": activeColor,
    "--ms-text":   textDefaultColor,
    "--ms-focus-ring": hceColors.primary.blue[100],
    "--ms-summary-bg": hceColors.primary.green[600],
  } as CSSProperties

  if (!label) return null

  return (
    <div
      ref={containerRef}
      className="hce-multiselect-wrapper"
      style={{ ...cssVars, position: "relative", width: fullWidth ? "100%" : undefined }}
    >
      <label id={triggerId} className="hce-multiselect-label">{label}</label>

      <button
        ref={triggerRef}
        type="button"
        className="hce-multiselect-trigger"
        disabled={false}
        onClick={() => (open ? setOpen(false) : openMenu())}
        onKeyDown={handleTriggerKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={triggerId}
        aria-required={required}
      >
        {value.length > 0 ? (
          <span className="hce-multiselect-summary">
            <span>{value.length} seleccionado{value.length > 1 ? "s" : ""}</span>
            <VisibilityGlyph />
          </span>
        ) : (
          <span style={{ color: accentColor }}>{placeholder}</span>
        )}
      </button>

      <Menu
        open={open}
        onClose={() => setOpen(false)}
        anchorRef={triggerRef}
        align="left"
        role="listbox"
        id={listId}
        aria-multiselectable="true"
        aria-label={label}
        panelClassName="hce-multiselect-listbox"
        panelStyle={{
          width: menuWidth,
          border: `1px solid ${hceColors.primary.blue[100]}`,
          boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
        }}
        onKeyDown={handleListKeyDown}
      >
          {options.map((opt, idx) => {
            const selected = selectedOptions.some(o => o.value === opt.value)
            return (
              <div
                key={opt.value}
                role="option"
                aria-selected={selected}
                className={`hce-multiselect-option${activeIdx === idx ? " hce-multiselect-option--active" : ""}`}
                onMouseEnter={() => setActiveIdx(idx)}
                onClick={(e) => {
                  if (disabled) {
                    e.preventDefault()
                    e.stopPropagation()
                    return
                  }
                  toggleOption(opt.value)
                }}
                style={{
                  cursor: disabled ? "not-allowed" : "pointer",
                  pointerEvents: disabled ? "none" : "auto",
                }}
              >
                {/*
                  El label se renderiza aparte (no vía la prop `label` de <Checkbox>)
                  para que el `justifyContent: space-between` de la fila tenga dos hijos
                  reales entre los que repartir el espacio: texto a la izquierda,
                  checkbox a la derecha. El átomo <Checkbox> internamente usa un gap
                  fijo (no space-between) a propósito para otros consumidores
                  (ver comentario en Checkbox.tsx) — no se toca ese componente.
                */}
                <span
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "0.875rem",
                    color: hceColors.neutro.black[400],
                    textAlign: "left",
                    flex: 1,
                    minWidth: 0,
                    marginRight: 8,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {opt.label}
                </span>
                {/*
                  Wrapper con flex:none + width:fit-content: el átomo
                  <Checkbox> tiene `width: 100%` en su CSS (pensado para
                  cuando es el único hijo de su fila, ver Checkbox.css) --
                  sin este wrapper, dentro de esta fila flex ese 100% se
                  come casi todo el ancho y aplasta el <span> del label a
                  0px. fit-content fuerza a resolver el 100% del Checkbox
                  contra su propio contenido en vez de contra la fila.
                */}
                <div style={{ flex: "0 0 auto", width: "fit-content" }}>
                  <Checkbox
                    ariaLabel={opt.label}
                    checked={selected}
                    disabled={disabled}
                    onChange={() => {}}
                  />
                </div>
              </div>
            )
          })}
      </Menu>
    </div>
  );
};
