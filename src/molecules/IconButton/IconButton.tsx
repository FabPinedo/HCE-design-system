/**
 * ---------------------------------------------------------
 * Component: IconButton
 * Description:
 * Botón icon-only genérico. Acepta cualquier ReactNode como
 * ícono → molecule.
 *
 * Uso:
 *   <IconButton icon={<InfoIcon />} onClick={handleClick} />
 *   <IconButton icon={<InfoIcon />} sx={{ bgcolor: "#f0f4f8", p: 1 }} />
 *   <IconButton icon={<InfoIcon />} size="large" />           // ícono 24px automático
 *   <IconButton icon={<InfoIcon size={32} />} size="large" /> // respeta el size explícito del ícono
 * ---------------------------------------------------------
 */
import { cloneElement, isValidElement, type ReactNode, type CSSProperties } from "react"
import "./IconButton.css"
import { sxToStyle, type SxProps } from "../../utils/sx"
import { useCurrentBreakpoint } from "../../utils/breakpoints"

type IconButtonSize = "small" | "medium" | "large"

interface Props {
  /** Ícono a mostrar dentro del botón */
  icon:      ReactNode
  onClick?:  () => void
  disabled?: boolean
  size?:     IconButtonSize
  /** Estilo puntual — se aplica por encima de las clases hce-iconbtn/hce-iconbtn--{size} */
  style?:    CSSProperties
  /** Clase(s) adicional(es), se concatenan a las clases base */
  className?: string
  /**
   * Estilo puntual — escape-hatch `sx` del design system (ver utils/sx.ts):
   * propiedades CSS normales, shorthand de espaciado (`px`, `py`, `pt`,
   * `pb`, `pl`, `pr`, `m`, `mx`, `my`, `mt`, `mb`, `ml`, `mr`) y valores
   * responsivos por breakpoint (`p: { xs: 1, sm: 2 }`). Se resuelve con
   * `sxToStyle` y se aplica como estilo inline, por lo que gana por
   * especificidad sobre lo que definan las clases CSS de tamaño.
   */
  sx?: SxProps
  /**
   * Tamaño explícito del ícono en px, si quieres pisar el mapeo automático
   * por `size` (small=16 / medium=20 / large=24). No tiene efecto si el
   * ícono que pasaste ya trae su propio `size` explícito — ese siempre gana.
   */
  iconSize?: number
  /** Hook de pruebas E2E — `data-testid` en el `<button>`. */
  testId?: string
}

// Tamaño de ícono por defecto según el tamaño del botón — los íconos propios
// del design system (ChevronDownIcon, DoctorIcon, UiWarningIcon, etc.) NO
// heredan tamaño de `font-size` del botón padre porque su width/height se
// resuelve vía un prop `size` explícito en el SVG, no vía CSS. Por eso
// `fontSize` en el botón no tenía ningún efecto sobre el ícono.
const ICON_SIZE_BY_BUTTON_SIZE: Record<IconButtonSize, number> = {
  small: 16,
  medium: 20,
  large: 24,
}

export const IconButton = ({ icon, onClick, disabled, size = "medium", style, className, sx, iconSize, testId }: Props) => {
  const breakpoint = useCurrentBreakpoint()
  const resolvedIconSize = iconSize ?? ICON_SIZE_BY_BUTTON_SIZE[size]

  // Clona el ícono e inyecta `size` SOLO si el ícono es un elemento React
  // válido y no trae ya un `size` explícito propio — así respetamos el caso
  // en que el consumidor quiere un tamaño distinto al del botón.
  const sizedIcon =
    isValidElement(icon) && (icon.props as { size?: number }).size === undefined
      ? cloneElement(icon as React.ReactElement<{ size?: number }>, { size: resolvedIconSize })
      : icon

  return (
    <button
      type="button"
      className={["hce-iconbtn", `hce-iconbtn--${size}`, className].filter(Boolean).join(" ")}
      onClick={onClick}
      disabled={disabled}
      data-testid={testId}
      style={{ ...style, ...sxToStyle(sx, breakpoint) }}
    >
      {sizedIcon}
    </button>
  )
}
