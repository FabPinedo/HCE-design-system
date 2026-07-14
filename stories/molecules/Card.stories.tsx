import type { Meta, StoryObj } from '@storybook/react'
import { Card, hceColors, hceTypography, Typography,Box, User } from '@hce/design-system'

const meta: Meta<typeof Card> = {
  title: 'Molecules/Card',
  component: Card,
  tags: ['autodocs'],
}
export default meta
function PatientField({
  label,
  value,
}: any) {
  return (
    <Box>
      <Typography sx={labelSx}>
        {label}
      </Typography>

      <Typography sx={valueSx}>
        {value || "-"}
      </Typography>
    </Box>
  )
}

const labelSx = {
  fontFamily: hceTypography.fontFamily,
  fontSize: "0.625rem",
  fontWeight: 700,
  color: hceColors.primary.blue[500],
  mb: 0.5,
}

const valueSx = {
  fontFamily: hceTypography.fontFamily,
  fontSize: "0.875rem",
  fontWeight: 400,
  color: hceColors.primary.blue[500],
}


const SampleFormContent = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, alignContent:'center',justifyContent:'center' }}>
        
        <Box
          sx={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            backgroundColor: hceColors.primary.green[500],
            color: hceColors.neutro.white[50],
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 1.5,
          }}
        >
          <User size={30} />
        </Box>

        <Box
            sx={{
              mt: 1,
              border: "1px solid #BD0000",
              color: "#BD0000",
              backgroundColor: "#FDECEC",
              borderRadius: "6px",
              px: 1,
              py: 0.25,
              fontSize: "0.75rem",
            }}
          >
            Presenta alergias
          </Box>

          
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          columnGap: 3,
          rowGap: 2,
        }}
        >
        <Typography sx={labelSx}>
          Paciente:
        </Typography>

        <Typography sx={valueSx}>
         Rosa
        </Typography>
        
        <PatientField
          label="G. Sanguíneo:"
          value="A+"
        />

      

        <PatientField
          label="N° de Historia:"
          value='08799'
        />

        <PatientField
          label="Aseguradora:"
          value="RIMAC"
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
            label="Dirección:"
            value="Av. Gregorio Escobedo 650, Jesús María"
          />
        </Box>
        </Box>
      
     </div>)  



type Story = StoryObj<typeof Card>

export const Default: Story = {
  args: {
    title: "title",
    noPadding: false,
   children: <SampleFormContent />,
  },
}
