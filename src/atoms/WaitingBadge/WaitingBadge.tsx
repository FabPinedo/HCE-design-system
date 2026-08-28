import { getSemaphoreColors } from "../../tokens/getSemaphoreColors"

interface Props {
  /** Texto ya formateado, ej. "00:15:00". */
  label?: string

  /** Color semáforo del tiempo de espera. */
  color?: string | null
  /** Hook de pruebas E2E — `data-testid` en el nodo raíz. */
  testId?: string
}

export const WaitingBadge = ({
  label,
  color = null,
  testId,
}: Props) => {
  const colors = getSemaphoreColors(color)
  const visibleLabel = label ?? "-"

  return (
    <span
      style={{
        width: 150,
        height: 32,
        borderRadius: "7px",
        border: `1.5px solid ${colors.border}`,
        backgroundColor: colors.background,
        color: colors.color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "14px",
        fontWeight: 600,
        fontFamily: "monospace",
        boxSizing: "border-box",
      }}
      aria-label={`Tiempo de espera: ${visibleLabel}`}
      data-testid={testId}
    >
      {visibleLabel}
    </span>
  )
}
