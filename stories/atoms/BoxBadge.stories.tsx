import type { Meta, StoryObj } from "@storybook/react"
import { BoxBadge, injectHceTokens } from "@hce/design-system"

injectHceTokens()

const meta: Meta<typeof BoxBadge> = {
  title:     "Atoms/BoxBadge",
  component: BoxBadge,
  tags:      ["autodocs"],
}
export default meta
type Story = StoryObj<typeof BoxBadge>

export const Waiting: Story = {
  args: { stage: "ESPERA" },
}

export const Assigned: Story = {
  args: { stage: "BOX_ASIGNADO", label: "Box 7",color:null},
}

export const Waiting_BOX_5: Story = {
  args: { stage: "SALA_D",color: 'green' },
}

export const Waiting_BOX_20: Story = {
  args: { stage: "SALA_D",  color:'yellow' },
}

export const Waiting_BOX_35: Story = {
  args: { stage: "SALA_D",color:'red' },
}
