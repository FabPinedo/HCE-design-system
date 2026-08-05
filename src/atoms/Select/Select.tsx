import {
  forwardRef,
  createElement,
  cloneElement,
  isValidElement,
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  type ElementType,
  type ReactNode,
  type ReactElement,
  type HTMLAttributes,
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type Ref,
} from "react"
import { sxToStyle } from "../../utils/sx"

type Variant = "filled" | "outlined" | "standard"
// Tipo por defecto cuando no se especifica T (uso sin genérico explícito,
// ej. `<Select value={...}>` sin `<Select<string>>`).
type Value = string | number | (string | number)[]

// Evento sintético compatible con el `SelectChangeEvent` de MUI: expone
// `target.value` y `target.name` para no romper el código que ya asumía esa forma.
export interface SelectChangeEvent<T = Value> {
  target: { value: T; name?: string }
}

/**
 * Select — reemplazo propio de `Select` de MUI, en CSS/HTML puro.
 *
 * Componente independiente: NO depende de un `FormControl` ni `MenuItem`
 * propios del repo. Cualquier elemento hijo que tenga una prop `value` se
 * trata como una opción seleccionable (duck typing), igual que MUI trata
 * cualquier `MenuItem`-like como hijo válido. `disabled`, `error`,
 * `required`, `variant`, `fullWidth` se toman únicamente de los props que
 * se le pasen directo al `Select` — no se leen de contexto.
 *
 * Mantiene la misma API mínima que este repo consumía de MUI: `autoWidth`,
 * `defaultOpen`, `defaultValue`, `displayEmpty`, `IconComponent`, `id`,
 * `inputProps`, `label`, `labelId`, `multiple`, `native`, `onChange`,
 * `onClose`, `onOpen`, `open`, `renderValue`, `value`, `variant`. Además:
 * `component` (elemento HTML del contenedor, default "div" — se ignora en
 * modo `native`, que siempre usa `<select>`), `sx` (subconjunto propio, ver
 * utils/sx.ts), `style`, `className`, `children` y el resto de atributos
 * HTML nativos (onBlur, aria-*, etc. se reenvían tal cual vía `...rest`).
 *
 * No usa Popper/Portal: el menú se dibuja como un `div` posicionado
 * absoluto debajo del control. No incluye `MenuProps` ni `input` ni
 * `SelectDisplayProps` reales — están tipados por compatibilidad pero no
 * tienen efecto (ver notas al final del archivo).
 *
 * Re-exportado desde el índice público (`export { Select } from "@hce/design-system"`)
 * en lugar de re-exportar el `Select` de MUI, para que los consumidores externos
 * (microfrontends) no tengan que cambiar el import.
 */
export interface SelectProps<T = Value> extends Omit<HTMLAttributes<HTMLElement>, "color" | "onChange" | "defaultValue"> {
  component?: ElementType
  children?: ReactNode
  sx?: Record<string, unknown>
  autoWidth?: boolean
  classes?: Record<string, string>
  defaultOpen?: boolean
  defaultValue?: T
  disabled?: boolean
  displayEmpty?: boolean
  error?: boolean
  fullWidth?: boolean
  IconComponent?: ElementType<{ open?: boolean; className?: string }>
  id?: string
  input?: ReactElement
  inputProps?: Record<string, unknown>
  label?: ReactNode
  labelId?: string
  MenuProps?: Record<string, unknown>
  multiple?: boolean
  name?: string
  native?: boolean
  onChange?: (event: SelectChangeEvent<T>, child?: ReactNode) => void
  onClose?: (event: Event | ReactMouseEvent | KeyboardEvent) => void
  onOpen?: (event: ReactMouseEvent | KeyboardEvent) => void
  open?: boolean
  renderValue?: (value: T) => ReactNode
  required?: boolean
  SelectDisplayProps?: HTMLAttributes<HTMLDivElement>
  value?: T
  variant?: Variant
}

function DefaultArrowIcon({ open, className }: { open?: boolean; className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      style={{
        transform: open ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 0.2s",
        flexShrink: 0,
        pointerEvents: "none",
      }}
    >
      <path d="M7 10l5 5 5-5z" fill="currentColor" />
    </svg>
  )
}

// `forwardRef` no soporta genéricos directamente, así que se tipa la
// implementación con el `Value` interno (union amplia) y se re-castea la
// exportación a una función genérica `<T>(...)`. Es el mismo truco que usa
// el propio Select de MUI para que `<Select<string> value={...}>` infiera
// bien el tipo de `value`/`onChange` en cada uso.
const SelectImpl = forwardRef<HTMLElement, SelectProps<Value>>(function Select(
  {
    component = "div",
    children,
    style,
    sx,
    className,
    autoWidth = false,
    defaultOpen = false,
    defaultValue,
    disabled = false,
    displayEmpty = false,
    error = false,
    fullWidth = false,
    IconComponent = DefaultArrowIcon,
    id,
    inputProps,
    label,
    labelId,
    multiple = false,
    name,
    native = false,
    onChange,
    onClose,
    onOpen,
    open: openProp,
    renderValue,
    required = false,
    value: valueProp,
    variant = "outlined",
    onKeyDown,
    ...rest
  },
  forwardedRef
) {
  // Valor controlado / no controlado
  const [internalValue, setInternalValue] = useState<Value>(
    defaultValue ?? (multiple ? [] : "")
  )
  const value = valueProp !== undefined ? valueProp : internalValue

  // Abierto/cerrado controlado / no controlado
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const open = openProp !== undefined ? openProp : internalOpen

  const rootRef = useRef<HTMLElement | null>(null)
  const [highlightedIndex, setHighlightedIndex] = useState(0)

  const setRefs = useCallback(
    (node: HTMLElement | null) => {
      rootRef.current = node
      if (typeof forwardedRef === "function") forwardedRef(node)
      else if (forwardedRef) (forwardedRef as { current: HTMLElement | null }).current = node
    },
    [forwardedRef]
  )

  // Hijos "tipo opción": cualquier elemento con prop `value` (duck typing,
  // no se exige que sea el `MenuItem` propio del repo). El tipo lleva un
  // índice `Record<string, unknown>` a propósito, para poder clonarlo más
  // abajo agregándole `onClick`, `style`, `aria-selected`, etc. sin que
  // TypeScript se queje de "props desconocidas" del elemento original.
  type OptionElement = ReactElement<{ value?: string | number; children?: ReactNode } & Record<string, unknown>>

  const items = useMemo(() => {
    const result: { element: OptionElement; value: string | number; label: ReactNode }[] = []
    for (const child of Array.isArray(children) ? children : [children]) {
      if (isValidElement(child)) {
        const itemValue = (child.props as { value?: string | number }).value
        if (itemValue !== undefined) {
          result.push({
            element: child as OptionElement,
            value: itemValue,
            label: (child.props as { children?: ReactNode }).children,
          })
        }
      }
    }
    return result
  }, [children])

  const isSelected = useCallback(
    (itemValue: string | number) => {
      if (multiple && Array.isArray(value)) return value.includes(itemValue)
      return value === itemValue
    },
    [multiple, value]
  )

  const emitChange = useCallback(
    (nextValue: Value, child?: ReactNode) => {
      if (valueProp === undefined) setInternalValue(nextValue)
      onChange?.({ target: { value: nextValue, name } }, child)
    },
    [onChange, name, valueProp]
  )

  const requestOpen = useCallback(
    (event: ReactMouseEvent | KeyboardEvent) => {
      if (disabled) return
      if (openProp === undefined) setInternalOpen(true)
      onOpen?.(event)
    },
    [disabled, openProp, onOpen]
  )

  const requestClose = useCallback(
    (event: Event | ReactMouseEvent | KeyboardEvent) => {
      if (openProp === undefined) setInternalOpen(false)
      onClose?.(event)
    },
    [openProp, onClose]
  )

  const handleItemClick = useCallback(
    (itemValue: string | number, child: ReactNode) => {
      if (multiple) {
        const current = Array.isArray(value) ? value : []
        const next = current.includes(itemValue)
          ? current.filter((v) => v !== itemValue)
          : [...current, itemValue]
        emitChange(next, child)
      } else {
        emitChange(itemValue, child)
        requestClose({} as Event)
      }
    },
    [multiple, value, emitChange, requestClose]
  )

  // Cierra al hacer click afuera
  useEffect(() => {
    if (!open) return
    const handleOutside = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        requestClose(event)
      }
    }
    document.addEventListener("mousedown", handleOutside)
    return () => document.removeEventListener("mousedown", handleOutside)
  }, [open, requestClose])

  const handleTriggerKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      if (disabled) return
      if (!open && (event.key === "Enter" || event.key === " " || event.key === "ArrowDown" || event.key === "ArrowUp")) {
        event.preventDefault()
        requestOpen(event)
        return
      }
      if (open) {
        if (event.key === "Escape") {
          event.preventDefault()
          requestClose(event)
        } else if (event.key === "ArrowDown") {
          event.preventDefault()
          setHighlightedIndex((i) => Math.min(i + 1, items.length - 1))
        } else if (event.key === "ArrowUp") {
          event.preventDefault()
          setHighlightedIndex((i) => Math.max(i - 1, 0))
        } else if (event.key === "Enter" || event.key === " ") {
          event.preventDefault()
          const item = items[highlightedIndex]
          if (item) handleItemClick(item.value, item.label)
        }
      }
      onKeyDown?.(event)
    },
    [disabled, open, items, highlightedIndex, requestOpen, requestClose, handleItemClick, onKeyDown]
  )

  // --- Modo nativo: <select> real con los <option> tal cual vienen ---
  if (native) {
    const nativeStyle: CSSProperties = {
      width: fullWidth ? "100%" : undefined,
      minWidth: 120,
      padding: "8.5px 14px",
      fontSize: "1rem",
      borderRadius: 4,
      border: `1px solid ${error ? "#d32f2f" : "rgba(0, 0, 0, 0.23)"}`,
      backgroundColor: variant === "filled" ? "rgba(0, 0, 0, 0.06)" : "#fff",
      opacity: disabled ? 0.5 : 1,
      ...sxToStyle(sx),
      ...style,
    }

    return createElement(
      "select",
      {
        ref: setRefs,
        id,
        name,
        disabled,
        required,
        multiple,
        value: value as string | string[],
        className: ["MuiSelect-root", "MuiNativeSelect-select", className].filter(Boolean).join(" "),
        style: nativeStyle,
        onChange: (event: { target: { value: string } }) =>
          emitChange(
            multiple
              ? Array.from((event.target as unknown as HTMLSelectElement).selectedOptions).map((o) => o.value)
              : event.target.value
          ),
        "aria-invalid": error || undefined,
        ...inputProps,
        ...rest,
      },
      children
    )
  }

  // --- Modo custom (por defecto): trigger + menú propio ---
  const selectedLabel = useMemo(() => {
    if (renderValue) return renderValue(value)
    if (multiple && Array.isArray(value)) {
      return items
        .filter((item) => value.includes(item.value))
        .map((item) => item.label)
        .reduce<ReactNode[]>((acc, label, i) => (i === 0 ? [label] : [...acc, ", ", label]), [])
    }
    const match = items.find((item) => item.value === value)
    return match ? match.label : ""
  }, [renderValue, value, multiple, items])

  const isEmpty = multiple ? !Array.isArray(value) || value.length === 0 : value === "" || value === undefined

  const displayValue = isEmpty && !displayEmpty ? "" : selectedLabel

  const triggerStyle: CSSProperties = {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: fullWidth ? "100%" : autoWidth ? undefined : 160,
    minWidth: 80,
    minHeight: variant === "standard" ? 32 : 40,
    padding: variant === "standard" ? "4px 24px 4px 0" : "8.5px 32px 8.5px 14px",
    boxSizing: "border-box",
    fontSize: "1rem",
    cursor: disabled ? "default" : "pointer",
    userSelect: "none",
    color: isEmpty && !displayEmpty ? "rgba(0, 0, 0, 0.38)" : "inherit",
    backgroundColor: variant === "filled" ? "rgba(0, 0, 0, 0.06)" : "transparent",
    border: variant === "outlined" ? `1px solid ${error ? "#d32f2f" : open ? "#1976d2" : "rgba(0, 0, 0, 0.23)"}` : "none",
    borderBottom: variant === "standard" ? `1px solid ${error ? "#d32f2f" : "rgba(0, 0, 0, 0.42)"}` : undefined,
    borderRadius: variant === "outlined" ? 4 : variant === "filled" ? "4px 4px 0 0" : 0,
    opacity: disabled ? 0.5 : 1,
    pointerEvents: disabled ? "none" : undefined,
    outline: "none",
    ...sxToStyle(sx),
    ...style,
  }

  const rootClassName = [
    "MuiSelect-root",
    variant === "outlined" && "MuiSelect-outlined",
    variant === "filled" && "MuiSelect-filled",
    variant === "standard" && "MuiSelect-standard",
    multiple && "MuiSelect-multiple",
    disabled && "Mui-disabled",
    error && "Mui-error",
    open && "Mui-focused",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  const menuStyle: CSSProperties = {
    position: "absolute",
    top: "100%",
    left: 0,
    right: autoWidth ? undefined : 0,
    minWidth: autoWidth ? "100%" : undefined,
    marginTop: 4,
    maxHeight: 300,
    overflowY: "auto",
    backgroundColor: "#fff",
    boxShadow:
      "0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)",
    borderRadius: 4,
    zIndex: 1300,
    padding: "8px 0",
  }

  return createElement(
    component,
    {
      ref: setRefs,
      id,
      className: rootClassName,
      style: { position: "relative", display: "inline-block", width: fullWidth ? "100%" : undefined },
      ...rest,
    },
    createElement(
      "div",
      {
        role: "combobox",
        "aria-expanded": open,
        "aria-haspopup": "listbox",
        "aria-labelledby": labelId,
        "aria-disabled": disabled || undefined,
        "aria-invalid": error || undefined,
        "aria-required": required || undefined,
        tabIndex: disabled ? -1 : 0,
        style: triggerStyle,
        onClick: (event: ReactMouseEvent) => (open ? requestClose(event) : requestOpen(event)),
        onKeyDown: handleTriggerKeyDown,
      },
      createElement("span", { style: { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, displayValue),
      createElement(IconComponent, { open, className: "MuiSelect-icon" })
    ),
    open &&
      createElement(
        "div",
        { role: "listbox", "aria-multiselectable": multiple || undefined, style: menuStyle },
        items.map((item, index) =>
          cloneElement(item.element, {
            key: item.value,
            "aria-selected": isSelected(item.value),
            onClick: () => handleItemClick(item.value, item.label),
            style: {
              ...(item.element.props as { style?: CSSProperties }).style,
              backgroundColor: isSelected(item.value)
                ? "rgba(25, 118, 210, 0.08)"
                : index === highlightedIndex
                ? "rgba(0, 0, 0, 0.04)"
                : undefined,
              cursor: "pointer",
            },
          })
        )
      ),
    label &&
      createElement(
        "label",
        { style: { fontSize: "0.75rem", color: error ? "#d32f2f" : "rgba(0, 0, 0, 0.6)" } },
        label
      )
  )
})

// Firma genérica pública: permite `<Select<string> value={...} onChange={...}>`
// o `<Select<number[]> multiple ...>` con inferencia correcta de tipos, sin
// perder el forwardRef del ref al elemento raíz.
export const Select = SelectImpl as <T = Value>(
  props: SelectProps<T> & { ref?: Ref<HTMLElement> }
) => ReactElement | null

/**
 * NOTAS DE PARIDAD CON MUI:
 * - Este componente NO importa ni depende de `FormControl` ni `MenuItem`
 *   propios: `disabled`, `error`, `required`, `fullWidth`, `variant` solo
 *   se toman de los props que se le pasen directo al `Select`. Los hijos
 *   solo necesitan tener una prop `value` para ser tratados como opciones
 *   (duck typing) — pueden ser el `MenuItem` propio, un `<option>`, o
 *   cualquier componente propio con esa forma.
 * - `MenuProps`, `input`, `SelectDisplayProps` están tipados por compatibilidad
 *   de API pero no tienen efecto en esta implementación (no usamos Popper/Portal
 *   ni un `Input` propio todavía).
 * - El menú se posiciona con `position: absolute` relativo al trigger, no con
 *   un Popper con `anchorEl` — si el Select está cerca del borde de la pantalla
 *   puede desbordarse (MUI lo reposiciona automáticamente).
 * - No hay animación de apertura/cierre (MUI usa `Grow`/`Fade`).
 */
