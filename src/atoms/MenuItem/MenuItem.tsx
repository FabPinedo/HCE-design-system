import {
  forwardRef,
  createElement,
  useEffect,
  useRef,
  useState,
  useCallback,
  type ElementType,
  type ReactNode,
  type HTMLAttributes,
  type CSSProperties,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
} from "react"
import { sxToStyle, type SxProps } from "../../utils/sx"
import { useCurrentBreakpoint } from "../../utils/breakpoints"

/**
 * MenuItem — reemplazo propio de `MenuItem` de MUI, en CSS/HTML puro.
 *
 * Mantiene la misma API mínima que este repo consumía de MUI: `autoFocus`,
 * `dense`, `disableGutters`, `divider`, `focusVisibleClassName`, `selected`,
 * más los props heredados de ButtonBase que realmente se usaban acá:
 * `disabled`, `onClick`, `tabIndex`. Además: `component` (elemento HTML a
 * renderizar, default "li"), `sx` (subconjunto propio, ver utils/sx.ts),
 * `style`, `className`, `children` y el resto de atributos HTML nativos del
 * elemento (onKeyDown, id, aria-*, etc. se reenvían tal cual vía `...rest`).
 *
 * No depende de un componente `Menu`/`MenuList` propio: expone `role="menuitem"`
 * y el manejo de foco/teclado necesario para que funcione tanto suelto como
 * dentro de una lista.
 *
 * Re-exportado desde el índice público (`export { MenuItem } from "@hce/design-system"`)
 * en lugar de re-exportar el `MenuItem` de MUI, para que los consumidores externos
 * (microfrontends) no tengan que cambiar el import.
 */
export interface MenuItemProps extends Omit<HTMLAttributes<HTMLElement>, "color"> {
  component?: ElementType
  children?: ReactNode
  sx?: SxProps
  autoFocus?: boolean
  classes?: Record<string, string>
  dense?: boolean
  disabled?: boolean
  disableGutters?: boolean
  divider?: boolean
  focusVisibleClassName?: string
  selected?: boolean
  tabIndex?: number
  // No lo usa el propio MenuItem — existe para que TypeScript permita pasarlo
  // cuando el MenuItem se usa como opción dentro de un Select (duck typing:
  // Select lee `child.props.value` sin que MenuItem tenga que saber de Select).
  value?: string | number
  /** Hook de pruebas E2E — `data-testid` en el nodo raíz. */
  testId?: string
}

export const MenuItem = forwardRef<HTMLElement, MenuItemProps>(function MenuItem(
  {
    component = "li",
    children,
    style,
    sx,
    className,
    autoFocus = false,
    dense = false,
    disabled = false,
    disableGutters = false,
    divider = false,
    focusVisibleClassName,
    selected = false,
    tabIndex,
    value: _value, // se extrae para no filtrarlo como atributo HTML del <li>; Select lo lee desde el elemento original antes de clonar
    testId,
    onFocus,
    onBlur,
    onMouseDown,
    onKeyDown,
    ...rest
  },
  forwardedRef
) {
  const innerRef = useRef<HTMLElement | null>(null)
  const usedKeyboard = useRef(false)
  const [focusVisible, setFocusVisible] = useState(false)
  const breakpoint = useCurrentBreakpoint()

  // Combina el ref interno (para autoFocus) con el ref que reenvía el consumidor
  const setRefs = useCallback(
    (node: HTMLElement | null) => {
      innerRef.current = node
      if (typeof forwardedRef === "function") forwardedRef(node)
      else if (forwardedRef) (forwardedRef as { current: HTMLElement | null }).current = node
    },
    [forwardedRef]
  )

  useEffect(() => {
    if (autoFocus && !disabled) {
      innerRef.current?.focus()
    }
  }, [autoFocus, disabled])

  // Polyfill simple de :focus-visible: solo marcamos "focus-visible" si el
  // foco llegó por teclado (Tab/flechas), no por click de mouse.
  const handleMouseDown = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      usedKeyboard.current = false
      onMouseDown?.(event)
    },
    [onMouseDown]
  )

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      usedKeyboard.current = true
      onKeyDown?.(event)
    },
    [onKeyDown]
  )

  const handleFocus = useCallback(
    (event: FocusEvent<HTMLElement>) => {
      if (usedKeyboard.current) setFocusVisible(true)
      onFocus?.(event)
    },
    [onFocus]
  )

  const handleBlur = useCallback(
    (event: FocusEvent<HTMLElement>) => {
      setFocusVisible(false)
      usedKeyboard.current = false
      onBlur?.(event)
    },
    [onBlur]
  )

  const computedStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    width: "100%",
    boxSizing: "border-box",
    whiteSpace: "nowrap",
    userSelect: "none",
    cursor: disabled ? "default" : "pointer",
    minHeight: dense ? 32 : 48,
    padding: disableGutters ? "6px 0" : dense ? "4px 8px" : "6px 16px",
    fontSize: dense ? "0.8125rem" : "1rem",
    lineHeight: 1.5,
    borderBottom: divider ? "1px solid var(--ds-color-divider, rgba(0, 0, 0, 0.12))" : undefined,
    opacity: disabled ? 0.5 : 1,
    pointerEvents: disabled ? "none" : undefined,
    backgroundColor: selected ? "var(--ds-color-primary-light, rgba(25, 118, 210, 0.08))" : "transparent",
    outline: "none",
    ...sxToStyle(sx, breakpoint),
    ...style,
  }

  const rootClassName = [
    "MuiMenuItem-root",
    !disableGutters && "MuiMenuItem-gutters",
    dense && "MuiMenuItem-dense",
    divider && "MuiMenuItem-divider",
    disabled && "Mui-disabled",
    selected && "Mui-selected",
    focusVisible && "Mui-focusVisible",
    focusVisible && focusVisibleClassName,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return createElement(
    component,
    {
      ref: setRefs,
      role: "menuitem",
      tabIndex: disabled ? -1 : tabIndex ?? 0,
      "aria-disabled": disabled || undefined,
      "aria-selected": selected || undefined,
      className: rootClassName,
      style: computedStyle,
      "data-testid": testId,
      onFocus: handleFocus,
      onBlur: handleBlur,
      onMouseDown: handleMouseDown,
      onKeyDown: handleKeyDown,
      ...rest,
    },
    children
  )
})
