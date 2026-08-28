import "./Badge.css"

interface Props {
  value: number
  /** Hook de pruebas E2E — `data-testid` en el nodo raíz. */
  testId?: string
}

/**
 * Badge — reemplazo de MUI `Badge` (usado siempre standalone, sin
 * `children` que envolver, ver stories/atoms/Badge.stories.tsx) por un
 * <span> con el mismo aspecto: círculo azul primario con el número.
 */
export const Badge = ({ value, testId }: Props) => {
  return <span className="hce-badge" data-testid={testId}>{value}</span>
}
