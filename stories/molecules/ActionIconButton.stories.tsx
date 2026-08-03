import type { Meta, StoryObj } from "@storybook/react"
import { ActionIconButton, injectHceTokens, UiFilterIcon, UiPrintingIcon } from "@hce/design-system"

injectHceTokens()

const meta: Meta<typeof ActionIconButton> = {
  title:     "Molecules/ActionIconButton",
  component: ActionIconButton,
  tags:      ["autodocs"],
  args: { icon: UiFilterIcon, tooltip: "Filtrar pacientes" },
}
export default meta
type Story = StoryObj<typeof ActionIconButton>

export const Default: Story = {}

export const Print: Story = {
  args: { icon: UiPrintingIcon, tooltip: "Imprimir" },
}

export const Disabled: Story = {
  args: { disabled: true },
}
