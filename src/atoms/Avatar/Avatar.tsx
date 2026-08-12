import {
  forwardRef,
  createElement,
  useState,
  useEffect,
  type ElementType,
  type ReactNode,
  type ImgHTMLAttributes,
  type HTMLAttributes,
  type CSSProperties,
} from "react"
import { sxToStyle, type SxProps } from "../../utils/sx"
import { useCurrentBreakpoint } from "../../utils/breakpoints"

type Variant = "circular" | "rounded" | "square"
type ImageLoadState = "loading" | "loaded" | "error"

const RADIUS_BY_VARIANT: Record<Variant, string> = {
  circular: "50%",
  rounded: "8px",
  square: "0px",
}

// Ícono de persona por defecto (mismo trazo que usa MUI cuando no hay src
// ni children) — SVG propio, sin depender de @mui/icons-material.
function DefaultPersonIcon() {
  return (
    <svg viewBox="0 0 24 24" width="60%" height="60%" fill="currentColor" aria-hidden="true">
      <path d="M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12zm0 2.5c-3.3 0-9.8 1.6-9.8 4.9v1.4c0 .7.6 1.3 1.3 1.3h17c.7 0 1.3-.6 1.3-1.3v-1.4c0-3.3-6.5-4.9-9.8-4.9z" />
    </svg>
  )
}

/**
 * Avatar — reemplazo propio de `Avatar` de MUI, en CSS/HTML puro.
 *
 * Componente independiente: NO depende de ningún otro componente propio del
 * repo. Sigue el mismo orden de fallback que MUI cuando falla o falta la
 * imagen: 1) intenta `src`/`srcSet`, 2) si falla o no hay imagen, usa
 * `children`, 3) si tampoco hay children, muestra un ícono de persona por
 * defecto (con `alt` como `aria-label` si se proveyó).
 *
 * Mantiene la misma API mínima que este repo consumía de MUI: `alt`,
 * `children`, `classes`, `component`, `imgProps`, `sizes`, `src`, `srcSet`,
 * `sx`, `variant`. Además: `style`, `className` y el resto de atributos
 * HTML nativos del elemento raíz (reenviados vía `...rest`).
 *
 * Re-exportado desde el índice público (`export { Avatar } from "@hce/design-system"`)
 * en lugar de re-exportar el `Avatar` de MUI, para que los consumidores externos
 * (microfrontends) no tengan que cambiar el import.
 */
export interface AvatarProps extends Omit<HTMLAttributes<HTMLElement>, "color"> {
  component?: ElementType
  children?: ReactNode
  sx?: SxProps
  alt?: string
  classes?: Record<string, string>
  imgProps?: ImgHTMLAttributes<HTMLImageElement>
  sizes?: string
  src?: string
  srcSet?: string
  variant?: Variant
}

// Precarga la imagen en un <img> "fantasma" (fuera del DOM visible) para
// saber si cargó bien o falló, antes de decidir qué renderizar — mismo
// enfoque que usa MUI internamente (hook useLoaded).
function useImageLoadState(src?: string, srcSet?: string, sizes?: string): ImageLoadState {
  const [state, setState] = useState<ImageLoadState>(src || srcSet ? "loading" : "error")

  useEffect(() => {
    if (!src && !srcSet) {
      setState("error")
      return
    }

    let active = true
    setState("loading")

    const image = new Image()
    if (src) image.src = src
    if (srcSet) image.srcset = srcSet
    if (sizes) image.sizes = sizes

    image.onload = () => {
      if (active) setState("loaded")
    }
    image.onerror = () => {
      if (active) setState("error")
    }

    // Si ya estaba en caché del navegador, `onload` puede no dispararse
    // en algunos casos — se revisa `complete` directo.
    if (image.complete && image.naturalWidth > 0) {
      setState("loaded")
    }

    return () => {
      active = false
    }
  }, [src, srcSet, sizes])

  return state
}

export const Avatar = forwardRef<HTMLElement, AvatarProps>(function Avatar(
  {
    component = "div",
    children,
    style,
    sx,
    className,
    classes,
    alt,
    imgProps,
    sizes,
    src,
    srcSet,
    variant = "circular",
    ...rest
  },
  ref
) {
  const loadState = useImageLoadState(src, srcSet, sizes)
  const showImage = (src || srcSet) && loadState === "loaded"
  const breakpoint = useCurrentBreakpoint()

  const computedStyle: CSSProperties = {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    width: 40,
    height: 40,
    fontFamily: "inherit",
    fontSize: "1.25rem",
    lineHeight: 1,
    borderRadius: RADIUS_BY_VARIANT[variant],
    overflow: "hidden",
    color: "#fff",
    backgroundColor: "#bdbdbd", // gris neutro por defecto, igual que MUI sin theme
    userSelect: "none",
    ...sxToStyle(sx, breakpoint),
    ...style,
  }

  const rootClassName = [
    "MuiAvatar-root",
    `MuiAvatar-${variant}`,
    !showImage && (children ? "MuiAvatar-colorDefault" : "MuiAvatar-fallback"),
    classes?.root,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  let content: ReactNode
  if (showImage) {
    content = createElement("img", {
      className: ["MuiAvatar-img", classes?.img].filter(Boolean).join(" "),
      src,
      srcSet,
      sizes,
      alt,
      style: { width: "100%", height: "100%", objectFit: "cover", textIndent: -9999 },
      ...imgProps,
    })
  } else if (children !== undefined && children !== null) {
    content = children
  } else {
    content = createElement(DefaultPersonIcon)
  }

  return createElement(
    component,
    {
      ref,
      className: rootClassName,
      style: computedStyle,
      // Igual que MUI: el nombre solo se expone como aria-label del root
      // cuando NO hay imagen visible (si hay imagen, el alt ya va en el <img>).
      "aria-label": !showImage && alt ? alt : undefined,
      role: !showImage && alt ? "img" : undefined,
      ...rest,
    },
    content
  )
})
