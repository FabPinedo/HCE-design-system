import { hceColors } from "./hce.tokens"

export interface SemaphoreColors {
  border: string
  background: string
  color: string
}

const SEMAPHORE_COLORS: Record<string, SemaphoreColors> = {
  red: {
    border: hceColors.alert.error[600],
    background: hceColors.alert.error[50],
    color: hceColors.alert.error[600],
  },
  yellow: {
    border: hceColors.alert.warning[600],
    background: hceColors.alert.warning[50],
    color: hceColors.alert.warning[600],
  },
  green: {
    border: hceColors.alert.success[600],
    background: hceColors.primary.green[50],
    color: hceColors.alert.success[600],
  },
  blue: {
    border: hceColors.primary.blue[600],
    background: hceColors.neutro.white[100],
    color: hceColors.primary.blue[600],
  },
}

const DEFAULT_COLORS: SemaphoreColors = {
  border: hceColors.neutro.white[900],
  background: hceColors.neutro.white[600],
  color: hceColors.neutro.white[900],
}

export const getSemaphoreColors = (
  color?: string | null,
): SemaphoreColors => {
  if (!color) return DEFAULT_COLORS

  return SEMAPHORE_COLORS[color] ?? DEFAULT_COLORS
}