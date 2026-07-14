import { useId } from "react"
import MuiDialog, {
  type DialogProps,
} from "@mui/material/Dialog"
import Fade from "@mui/material/Fade"
import IconButton from "@mui/material/IconButton"
import CloseIcon from "@mui/icons-material/Close"
import Box from "@mui/material/Box"

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

  const handleDialogClose: DialogProps["onClose"] = (
    _event,
    reason,
  ) => {
    if (
      disableOutsideClose &&
      reason === "backdropClick"
    ) {
      return
    }

    if (
      disableEscapeClose &&
      reason === "escapeKeyDown"
    ) {
      return
    }

    onClose?.()
  }

  return (
    <MuiDialog
      open={open}
      onClose={handleDialogClose}
      disableEscapeKeyDown={disableEscapeClose}
      aria-labelledby={`${generatedId}-title`}
      slots={{ transition: Fade }}
      slotProps={{
        transition: {
          timeout: {
            enter: 180,
            exit: 120,
          },
        },
       paper: {
        sx: {
            width: "100%",
            maxWidth,
            maxHeight,
            m: 2,
            p: 0,
            overflow: "visible",
            backgroundColor: "transparent",
            boxShadow: "none",
        },
        },
      }}
    >
      <Box sx={{ position: "relative" }}>
        <DataCard
            {...dataCardProps}
            maxWidth="100%"
            maxHeight={maxHeight}
        />

        {showCloseButton && onClose && (
            <IconButton
            onClick={onClose}
            aria-label="Cerrar"
            sx={{
                position: "absolute",
               top: 5,
                right: 5,
                width: 26,
                height: 26,
                p: 0,
                color: hceColors.neutro.white[50],
                backgroundColor: hceColors.primary.blue[500],

                "&:hover": {
                backgroundColor: hceColors.primary.blue[700],
                },
            }}
            >
            <CloseIcon sx={{ fontSize: 20 }} />
            </IconButton>
        )}
        </Box>
    </MuiDialog>
  )
}