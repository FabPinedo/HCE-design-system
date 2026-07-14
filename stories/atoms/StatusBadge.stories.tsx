
import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { Avatar, Box, Button, Typography } from "@mui/material"
import { User } from "lucide-react"



import { DataCard,DataCardModal } from "../../src/molecules/DataCard"
import { hceColors } from "@hce/design-system"

const meta: Meta<typeof DataCard> = {
  title: 'Molecules/DataCard',
  component: DataCard,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof DataCard>

export const Default: Story = {
  args: {
    title: "Información",
    description: "Contenido descriptivo del card",
    children: (
      <Typography>
        Contenido adicional
      </Typography>
    ),
  },
}

export const PatientSummary: Story = {
  args: {
    backgroundColor: hceColors.primary.green[50],
    borderColor: hceColors.primary.blue[500],
    borderWidth: 2,
    borderRadius: '6px',
    contentPadding: "16px",
    headerContent: (
      <Avatar
        sx={{
          backgroundColor: hceColors.primary.green[600],
        }}
      >
        <User size={20} />
      </Avatar>
    ),
    children: (
      <Box>
        <Typography fontWeight={700}>Paciente:</Typography>
        <Typography>Sofía González Pérez</Typography>
      </Box>
    ),
  },
}

export const Modal = {
  render: () => {
    const [open, setOpen] = useState(false)

    return (
      <>
        <Button
          variant="contained"
          onClick={() => setOpen(true)}
        >
          Abrir modal
        </Button>

        <DataCardModal
          open={open}
          onClose={() => setOpen(false)}
          showCloseButton
          disableOutsideClose
          maxWidth={320}
          backgroundColor={hceColors.primary.green[50]}
          borderColor={hceColors.primary.blue[500]}
          borderWidth={2}
          borderRadius='10px'
          contentPadding="24px"
          headerContent={
            <Avatar
              sx={{
                backgroundColor:
                  hceColors.primary.green[600],
              }}
            >
              <User size={24} />
            </Avatar>
          }
          title="Paciente"
        >
          <Box>
            <Typography>Brunella Luciana Maraví Portillo</Typography>
            <Typography>Edad: 19 años</Typography>
            <Typography>Género: Femenino</Typography>
          </Box>
        </DataCardModal>
      </>
    )
  },
}