import type { Meta, StoryObj } from "@storybook/react"
import { InfoButton, injectEmergencyTokens } from "@hce/design-system"

injectEmergencyTokens()

const meta: Meta<typeof InfoButton> = {
  title:     "Molecules/InfoButton",
  component: InfoButton,
  tags:      ["autodocs"],
}
export default meta
type Story = StoryObj<typeof InfoButton>

export const Default: Story = {
  args: { tooltip: "Ver información del paciente" },
}

export const Disabled: Story = {
  args: { disabled: true },
}
