import { Overlay } from "../../atoms/Overlay/Overlay"
import { CloseIcon } from "../../atoms/Icon/SvgIconsHce"
import { useId } from "react"
import "./DataCardModal.css"

import {
  hceColors,
} from "../../tokens/hce.tokens"

import {
  DataCard,
  type DataCardProps,
} from "./DataCard"

export interface DataCardModalProps extends DataCardProps {
  open: boolean
  onClose?: () => void

  showCloseButton?: boolean
  disableOutsideClose?: boolean
  disableEscapeClose?: boolean
}

const BREAKPOINT_PX: Record<string, number> = {
  xs: 444,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
};

export function DataCardModal({
  open,
  onClose,

  showCloseButton = true,
  disableOutsideClose = false,
  disableEscapeClose = false,

  maxWidth = "sm",
  maxHeight = "90vh",

  ...dataCardProps
}: DataCardModalProps) {
  const generatedId = useId()

  const maxWidthPx =
    typeof maxWidth === "number"
      ? maxWidth
      : BREAKPOINT_PX[maxWidth] ?? maxWidth; // fallback: string CSS arbitrario (ej. "400px") si no es un breakpoint conocido

  return (
    <Overlay
      open={open}
      onClose={onClose}
      labelledBy={`${generatedId}-title`}
      testId={dataCardProps.testId}
      disableBackdropClose={disableOutsideClose}
      disableEscapeClose={disableEscapeClose}
      panelStyle={{
        width: "100%",
        maxWidth: maxWidthPx,
        maxHeight,
        margin: "auto",
        backgroundColor: "transparent",
        boxSizing: "border-box",
      }}
    >
      <div style={{ position: "relative" }}>
        <DataCard
            {...dataCardProps}
            maxWidth="100%"
            maxHeight={maxHeight}
        />

        {showCloseButton && onClose && (
            <button
              type="button"
              className="hce-datacard-modal-close"
              onClick={onClose}
              aria-label="Cerrar"
              data-testid={dataCardProps.testId ? `${dataCardProps.testId}-close` : undefined}
            >
              <CloseIcon size={20} color={hceColors.neutro.white[50]} />
            </button>
        )}
        </div>
    </Overlay>
  )
}
