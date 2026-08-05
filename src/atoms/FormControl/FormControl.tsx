import {
  forwardRef,
  createElement,
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  type ElementType,
  type ReactNode,
  type HTMLAttributes,
  type CSSProperties,
} from "react"
import { sxToStyle } from "../../utils/sx"

type Color = "primary" | "secondary" | "error" | "info" | "success" | "warning" | string
type Margin = "dense" | "none" | "normal"
type Size = "medium" | "small" | string
type Variant = "filled" | "outlined" | "standard"

/**
 * FormControl — reemplazo propio de `FormControl` de MUI, en CSS/HTML puro.
 *
 * No dibuja mucho por sí mismo: su función es exponer contexto de React
 * (`useFormControl`) para que sus hijos (FormLabel, FormHelperText, Input,
 * InputLabel, o cualquier campo propio) lean `disabled`, `error`, `focused`,
 * `filled`, `required`, `color`, `size`, `margin`, `variant`, `fullWidth`,
 * `hiddenLabel` sin que haya que repetir esos props en cada uno.
 *
 * Mantiene la misma API mínima que este repo consumía de MUI: `color`,
 * `disabled`, `error`, `focused`, `fullWidth`, `hiddenLabel`, `margin`,
 * `required`, `size`, `variant`. Además: `component` (elemento HTML a
 * renderizar, default "div"), `sx` (subconjunto propio, ver utils/sx.ts),
 * `style`, `className`, `children` y el resto de atributos HTML nativos del
 * elemento (onClick, id, role, aria-*, etc. se reenvían tal cual vía
 * `...rest`).
 *
 * Re-exportado desde el índice público (`export { FormControl } from "@hce/design-system"`)
 * en lugar de re-exportar el `FormControl` de MUI, para que los consumidores
 * externos (microfrontends) no tengan que cambiar el import.
 */
export interface FormControlProps extends Omit<HTMLAttributes<HTMLElement>, "color"> {
  component?: ElementType
  children?: ReactNode
  sx?: Record<string, unknown>
  color?: Color
  disabled?: boolean
  error?: boolean
  focused?: boolean
  fullWidth?: boolean
  hiddenLabel?: boolean
  margin?: Margin
  required?: boolean
  size?: Size
  variant?: Variant
}

// Estado + acciones que se comparten con FormLabel, FormHelperText, Input, InputLabel
interface FormControlContextValue {
  color: Color
  disabled: boolean
  error: boolean
  filled: boolean
  focused: boolean
  fullWidth: boolean
  hiddenLabel: boolean
  margin: Margin
  required: boolean
  size: Size
  variant: Variant
  onFilled: () => void
  onEmpty: () => void
  onFocus: () => void
  onBlur: () => void
}

const FormControlContext = createContext<FormControlContextValue | undefined>(undefined)

// Hook para que los componentes hijos (Input, FormLabel, etc.) lean el contexto.
// Devuelve undefined si se usan fuera de un FormControl (igual que MUI).
export function useFormControl(): FormControlContextValue | undefined {
  return useContext(FormControlContext)
}

export const FormControl = forwardRef<HTMLElement, FormControlProps>(function FormControl(
  {
    component = "div",
    children,
    style,
    sx,
    className,
    color = "primary",
    disabled = false,
    error = false,
    focused: focusedProp,
    fullWidth = false,
    hiddenLabel = false,
    margin = "none",
    required = false,
    size = "medium",
    variant = "outlined",
    ...rest
  },
  ref
) {
  // "filled" y "focused" se detectan automáticamente a partir de los inputs
  // hijos (vía onFilled/onEmpty/onFocus/onBlur en el contexto), a menos que
  // el consumidor fuerce `focused` como prop controlado.
  const [filled, setFilled] = useState(false)
  const [focusedState, setFocusedState] = useState(false)

  const onFilled = useCallback(() => setFilled(true), [])
  const onEmpty = useCallback(() => setFilled(false), [])
  const onFocus = useCallback(() => setFocusedState(true), [])
  const onBlur = useCallback(() => setFocusedState(false), [])

  const focused = focusedProp !== undefined ? focusedProp : focusedState

  const contextValue = useMemo<FormControlContextValue>(
    () => ({
      color,
      disabled,
      error,
      filled,
      focused: disabled ? false : focused,
      fullWidth,
      hiddenLabel,
      margin,
      required,
      size,
      variant,
      onFilled,
      onEmpty,
      onFocus,
      onBlur,
    }),
    [
      color,
      disabled,
      error,
      filled,
      focused,
      fullWidth,
      hiddenLabel,
      margin,
      required,
      size,
      variant,
      onFilled,
      onEmpty,
      onFocus,
      onBlur,
    ]
  )

  const marginStyle: CSSProperties =
    margin === "normal"
      ? { marginTop: 16, marginBottom: 8 }
      : margin === "dense"
      ? { marginTop: 8, marginBottom: 4 }
      : {}

  const computedStyle: CSSProperties = {
    display: "inline-flex",
    flexDirection: "column",
    position: "relative",
    minWidth: 0,
    padding: 0,
    margin: 0,
    border: 0,
    verticalAlign: "top",
    width: fullWidth ? "100%" : undefined,
    ...marginStyle,
    ...sxToStyle(sx),
    ...style,
  }

  const rootClassName = [
    "MuiFormControl-root",
    fullWidth && "MuiFormControl-fullWidth",
    margin === "dense" && "MuiFormControl-marginDense",
    margin === "normal" && "MuiFormControl-marginNormal",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return createElement(
    FormControlContext.Provider,
    { value: contextValue },
    createElement(
      component,
      {
        ref,
        className: rootClassName,
        style: computedStyle,
        "aria-disabled": disabled || undefined,
        ...rest,
      },
      children
    )
  )
})
