import type { ReactNode } from "react"
import "./Card.css"

interface Props {
  children?: ReactNode
  /** Hook de pruebas E2E — `data-testid` en el nodo raíz. */
  testId?: string
}

export const Card = ({ children, testId }: Props) => {
  return <div className="hce-card" data-testid={testId}>{children}</div>
}
