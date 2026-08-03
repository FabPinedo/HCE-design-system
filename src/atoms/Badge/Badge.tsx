import "./Badge.css"

interface Props {
  value: number
}

/**
 * Badge — reemplazo de MUI `Badge` (usado siempre standalone, sin
 * `children` que envolver, ver stories/atoms/Badge.stories.tsx) por un
 * <span> con el mismo aspecto: círculo azul primario con el número.
 */
export const Badge = ({ value }: Props) => {
  return <span className="hce-badge">{value}</span>
}
