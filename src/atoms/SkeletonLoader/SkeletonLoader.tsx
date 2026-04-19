/**
 * SkeletonLoader — átomo del design system HCE
 *
 * Placeholder animado (shimmer) que ocupa el espacio del contenido
 * mientras se carga. Usado en listas de pacientes, cards clínicas
 * y tablas de datos para reducir la percepción de latencia.
 *
 * Estrategia: CSS puro + CSS variables (animación keyframe sin JS).
 * Tokens: hceColors.primary.blue[50] + hceColors.neutro.white[50]
 */

import "./SkeletonLoader.css"

export type SkeletonVariant = "text" | "rect" | "circle"

export interface SkeletonLoaderProps {
  /** Forma del esqueleto */
  variant?: SkeletonVariant
  /** Ancho — acepta cualquier valor CSS válido (default: "100%") */
  width?:   string | number
  /** Alto — acepta cualquier valor CSS válido. En variant "text" se usa 1em si no se especifica */
  height?:  string | number
  /**
   * Solo para variant="text": número de líneas a renderizar.
   * La última línea tiene 60% de ancho para simular texto real.
   * @default 1
   */
  lines?:   number
  /** Clase CSS extra para personalización externa */
  className?: string
  /** Estilo inline extra */
  style?: React.CSSProperties
}

function toCSS(value: string | number | undefined, fallback: string): string {
  if (value === undefined) return fallback
  return typeof value === "number" ? `${value}px` : value
}

export function SkeletonLoader({
  variant   = "rect",
  width,
  height,
  lines     = 1,
  className = "",
  style,
}: SkeletonLoaderProps) {

  if (variant === "text") {
    const lineHeight = toCSS(height, "0.875em")
    return (
      <div
        className={`hce-skeleton hce-skeleton--text-block ${className}`}
        style={style}
        role="status"
        aria-label="Cargando contenido"
        aria-busy="true"
      >
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className="hce-skeleton__line hce-skeleton--shimmer"
            style={{
              width:  i === lines - 1 && lines > 1 ? "60%" : toCSS(width, "100%"),
              height: lineHeight,
            }}
          />
        ))}
      </div>
    )
  }

  if (variant === "circle") {
    const size = toCSS(width ?? height, "40px")
    return (
      <div
        className={`hce-skeleton hce-skeleton--circle hce-skeleton--shimmer ${className}`}
        role="status"
        aria-label="Cargando contenido"
        aria-busy="true"
        style={{
          width:  size,
          height: size,
          ...style,
        }}
      />
    )
  }

  // rect (default)
  return (
    <div
      className={`hce-skeleton hce-skeleton--rect hce-skeleton--shimmer ${className}`}
      role="status"
      aria-label="Cargando contenido"
      aria-busy="true"
      style={{
        width:  toCSS(width, "100%"),
        height: toCSS(height, "20px"),
        ...style,
      }}
    />
  )
}
