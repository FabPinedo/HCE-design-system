import type { ReactNode } from "react"
import "./Card.css"

interface Props {
  children?: ReactNode
}

export const Card = ({ children }: Props) => {
  return <div className="hce-card">{children}</div>
}
