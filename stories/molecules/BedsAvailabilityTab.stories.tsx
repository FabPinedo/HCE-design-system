import type { Meta, StoryObj } from "@storybook/react"
import { BedsAvailabilityTab, injectEmergencyTokens } from "@hce/design-system"

injectEmergencyTokens()

const meta: Meta<typeof BedsAvailabilityTab> = {
  title:      "Molecules/BedsAvailabilityTab",
  component:  BedsAvailabilityTab,
  tags:       ["autodocs"],
  parameters: { layout: "fullscreen" },
}
export default meta
type Story = StoryObj<typeof BedsAvailabilityTab>

export const Default: Story = {
  args: {
    isActive: false,
    onClick:  () => console.log("abrir panel"),
  },
}

export const Active: Story = {
  args: {
    isActive: true,
    onClick:  () => console.log("cerrar panel"),
  },
}
