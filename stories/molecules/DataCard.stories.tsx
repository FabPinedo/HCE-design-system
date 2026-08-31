import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { Box, Button, Typography, hceColors, InfoButton, StatusBadge, User, DataCard,DataCardModal, hceTypography } from "@hce/design-system"
import { PatientField } from "../../src/atoms/PatientField/PatientField";

const labelSx = {
  fontFamily: hceTypography.fontFamily,
  fontSize: "0.625rem",
  fontWeight: 700,
  color: hceColors.primary.blue[500],
  lineHeight: 1.2,
  mb: 0.75,
}

const valueSx = {
  fontFamily: hceTypography.fontFamily,
  fontSize: "0.8125rem",
  fontWeight: 400,
  color: hceColors.primary.blue[500],
  lineHeight: 1.3,
}

/** Reemplazo de MUI Avatar — circulo con children centrados */
function Avatar({ sx, children }: { sx?: Record<string, unknown>; children: React.ReactNode }) {
  return (
    <Box sx={{
      width: 40, height: 40, borderRadius: "50%",
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "#fff", flexShrink: 0,
      ...sx,
    }}>
      {children}
    </Box>
  )
}

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
   render: () => {
    const [modalOpen, setModalOpen] = useState(false)

    return (
      <Box sx={{ width: "100%", p: 2 }}>
        <DataCard
          backgroundColor={hceColors.primary.green[50]}
          borderColor={hceColors.primary.blue[500]}
          borderWidth={2}
          borderRadius="12px"
          contentPadding="12px 14px"
          contentAlign="left"
          maxWidth="100%"
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns:
                "48px 1.25fr 0.7fr 0.55fr 1fr 0.65fr 0.8fr 1fr 38px",
              alignItems: "center",
              columnGap: 2,
              width: "100%",
            }}
          >
            <Avatar
              sx={{
                width: 42,
                height: 42,
                backgroundColor:
                  hceColors.primary.green[600],
                color: hceColors.neutro.white[50],
              }}
            >
              <User size={24} />
            </Avatar>

            <PatientField
              label="Paciente:"
              value="Sofía González Pérez"
            />

            <PatientField
              label="Género:"
              value="Femenino"
            />

            <PatientField
              label="Edad:"
              value="19 Años"
            />

            <PatientField
              label="Tipo y N.Documento:"
              value="DNI - 80001234"
            />

            <PatientField
              label="G. Sanguíneo:"
              value="A+"
            />

            <PatientField
              label="Especialidad:"
              value="Oncología"
            />

            <PatientField
              label="Alergias:"
              value={
                <StatusBadge
                  label="Presenta alergias"
                  variant="error"
                  clickable
                  onClick={() => {
                    console.log("Abrir detalle de alergias")
                  }}
                />
              }
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <InfoButton
                onClick={() => setModalOpen(true)}
              />
            </Box>
          </Box>
        </DataCard>


      </Box>
    )
  },
}

export const Modal = {
  render: () => {
    const [open, setOpen] = useState(false)

    return (
      <>
        <Button
          variant="primary"
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
         
        >
           <PatientModalContent />
        </DataCardModal>
      </>
    )
  },
}


function PatientModalContent() {
  return (
    <Box>
      <Box
        sx={{
          textAlign: "center",
          mb: 2.5,
        }}
      >
        <Typography sx={labelSx}>
          Paciente:
        </Typography>

        <Typography
          sx={{
            ...valueSx,
            mb: 1,
          }}
        >
          Brunella Luciana Maraví Portillo
        </Typography>

        <StatusBadge
          label="Presenta alergias"
          variant="error"
          clickable
          onClick={() => {
            console.log("Abrir detalle de alergias")
          }}
        />
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          columnGap: 3,
          rowGap: 2,
        }}
      >
        <PatientField
          label="Género:"
          value="Femenino"
        />

        <PatientField
          label="Edad:"
          value="19 Años"
        />

        <PatientField
          label="Tipo y N.Documento:"
          value="DNI - 80001234"
        />

        <PatientField
          label="G. Sanguíneo:"
          value="A+"
        />

        <PatientField
          label="Médico:"
          value="Neymar Sanchez"
        />

        <PatientField
          label="Especialidad:"
          value="Oncología"
        />

        <PatientField
          label="C. de atención:"
          value="087999"
        />

        <PatientField
          label="N° de Historia:"
          value="087999"
        />

        <PatientField
          label="Aseguradora:"
          value="Rimac"
        />

        <PatientField
          label="Producto:"
          value="EPS"
        />

        <PatientField
          label="Correo:"
          value="santivea@gmail.com"
        />

        <PatientField
          label="Celular:"
          value="966420859"
        />

        <Box sx={{ gridColumn: "1 / -1" }}>
          <PatientField
            label="Dirección"
            value="Av. Gregorio Escobedo 650, Jesús María"
          />
        </Box>
      </Box>
    </Box>
  )
}