import type { Meta, StoryObj } from "@storybook/react"
import { BedAvailabilityDrawer, injectHceTokens } from "@hce/design-system"

injectHceTokens()

const meta: Meta<typeof BedAvailabilityDrawer> = {
  title:     "Organisms/BedAvailabilityDrawer",
  component: BedAvailabilityDrawer,
  tags:      ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Panel de disponibilidad de boxes/camas — organismo autocontenido " +
          "(no recibe props: `open`/data están manejados internamente con " +
          "datos de ejemplo). Se abre desde la pestaña lateral " +
          '"Ver disponibilidad de camas" (`BedsAvailabilityTab`), no hay ' +
          "contenido visible hasta hacer click en ella — el panel arranca " +
          "cerrado, por eso el preview de esta página se ve vacío. Para la " +
          "versión con datos/eventos controlados desde afuera (`open`, " +
          "`onClose`, `beds`), ver `BedAvailabilityDrawerV2`.",
      },
    },
  },
}
export default meta
type Story = StoryObj<typeof BedAvailabilityDrawer>

export const Default: Story = {}
