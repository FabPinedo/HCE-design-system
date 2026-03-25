import type { Meta, StoryObj } from "@storybook/react"
import FilterListIcon    from "@mui/icons-material/FilterList"
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined"
import { ActionIconButton, injectEmergencyTokens } from "@hce/design-system"

injectEmergencyTokens()

const meta: Meta<typeof ActionIconButton> = {
  title:     "Molecules/ActionIconButton",
  component: ActionIconButton,
  tags:      ["autodocs"],
  args: { icon: FilterListIcon, tooltip: "Filtrar pacientes" },
}
export default meta
type Story = StoryObj<typeof ActionIconButton>

export const Default: Story = {}

export const Print: Story = {
  args: { icon: PrintOutlinedIcon, tooltip: "Imprimir" },
}

export const Disabled: Story = {
  args: { disabled: true },
}
