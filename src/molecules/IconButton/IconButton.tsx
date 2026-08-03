/**
 * ---------------------------------------------------------
 * Component: IconButton
 * Description:
 * Botón icon-only genérico. Acepta cualquier ReactNode como
 * ícono → molecule.
 *
 * Uso:
 *   <IconButton icon={<InfoIcon />} onClick={handleClick} />
 * ---------------------------------------------------------
 */
import type { ReactNode } from "react"
import "./IconButton.css"

interface Props {
  /** Ícono a mostrar dentro del botón */
  icon:      ReactNode
  onClick?:  () => void
  disabled?: boolean
  size?:     "small" | "medium" | "large"
}

export const IconButton = ({ icon, onClick, disabled, size = "medium" }: Props) => {
  return (
    <button
      type="button"
      className={`hce-iconbtn hce-iconbtn--${size}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
    </button>
  )
}
