import "./Chip.css"

interface Props {
  label: string
}

export const Chip = ({ label }: Props) => {
  return <span className="hce-chip">{label}</span>
}
