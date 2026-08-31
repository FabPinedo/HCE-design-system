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

export function DataCardModal({
  open,
  onClose,

  showCloseButton = true,
  disableOutsideClose = false,
  disableEscapeClose = false,

  maxWidth = 420,
  maxHeight = "90vh",

  ...dataCardProps
}: DataCardModalProps) {
  const generatedId = useId()

  return (
    <Overlay
      open={open}
      onClose={onClose}
      labelledBy={`${generatedId}-title`}
      testId={dataCardProps.testId}
      disableBackdropClose={disableOutsideClose}
      disableEscapeClose={disableEscapeClose}
      panelStyle={{
        width: "calc(100% - 32px)",
        maxWidth,
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
