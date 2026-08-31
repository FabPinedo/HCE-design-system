import "./Chip.css"

interface Props {
  label: string
  /** Hook de pruebas E2E — `data-testid` en el nodo raíz. */
  testId?: string
}

export const Chip = ({ label, testId }: Props) => {
  return <span className="hce-chip" data-testid={testId}>{label}</span>
}
