import { useState }             from "react"
import type { Meta, StoryObj }  from "@storybook/react"
import { Button }               from "@mui/material"
import {
  BedAvailabilityDrawerV2,
  injectHceTokens,
}                                from "@hce/design-system"
import type { BedAvailabilityItem } from "@hce/design-system"

injectHceTokens()

// Cubre los 5 estados de negocio conocidos + un estado futuro sin color
// por defecto (demuestra que `status` no es un enum cerrado: "reservado"
// cae al color de fallback salvo que se pase `color` explícito).
const MOCK_BEDS: BedAvailabilityItem[] = [
  { id: "1",  code: "CX01", status: "ocupado" },
  { id: "2",  code: "CX02", status: "ocupado" },
  { id: "3",  code: "CX03", status: "altaAdministrativa" },
  { id: "4",  code: "CX04", status: "housekeeping" },
  { id: "5",  code: "CX05", status: "mantenimiento" },
  { id: "6",  code: "CX06", status: "disponible" },
  { id: "7",  code: "CX07", status: "disponible" },
  { id: "8",  code: "CX08", status: "ocupado" },
  { id: "9",  code: "CX09", status: "altaAdministrativa" },
  { id: "10", code: "CX10", status: "disponible" },
  { id: "11", code: "CX11", status: "ocupado" },
  { id: "12", code: "CX12", status: "reservado", color: "#3369b7" }, // estado futuro, color forzado por props
]

function ControlledDemo({ beds = MOCK_BEDS, title }: { beds?: BedAvailabilityItem[]; title?: string }) {
  const [open, setOpen] = useState(true)
  return (
    <div style={{ padding: 24 }}>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Ver disponibilidad de camas
      </Button>
      <BedAvailabilityDrawerV2
        open={open}
        onClose={() => setOpen(false)}
        beds={beds}
        title={title}
      />
    </div>
  )
}

const meta: Meta<typeof BedAvailabilityDrawerV2> = {
  title:     "Organisms/BedAvailabilityDrawerV2",
  component: BedAvailabilityDrawerV2,
  tags:      ["autodocs"],
  parameters: { layout: "fullscreen" },
}
export default meta
type Story = StoryObj<typeof BedAvailabilityDrawerV2>

/** Panel controlado: abierto por defecto, con los 12 estados de ejemplo. */
export const Default: Story = {
  render: () => <ControlledDemo />,
}

/** Estado oculto por defecto — el trigger externo (ej. handleDisponibilidad) lo abre. */
export const OcultoPorDefecto: Story = {
  render: () => {
    function Demo() {
      const [open, setOpen] = useState(false)
      return (
        <div style={{ padding: 24 }}>
          <Button variant="contained" onClick={() => setOpen(true)}>
            Disponibilidad
          </Button>
          <BedAvailabilityDrawerV2 open={open} onClose={() => setOpen(false)} beds={MOCK_BEDS} />
        </div>
      )
    }
    return <Demo />
  },
}

/** Sin camas — estado vacío. */
export const SinCamas: Story = {
  render: () => <ControlledDemo beds={[]} />,
}
