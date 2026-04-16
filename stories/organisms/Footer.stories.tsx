import type { Meta, StoryObj } from "@storybook/react"
import { Footer, hceColors } from "@hce/design-system"

const meta: Meta<typeof Footer> = {
  title:     "Organisms/Footer",
  component: Footer,
  tags:      ["autodocs"],
  parameters: { layout: "fullscreen" },
}
export default meta
type Story = StoryObj<typeof Footer>

export const Default: Story = {}

export const ConCopyright: Story = {
  args: {
    copyright: `© ${new Date().getFullYear()} Clínica San Felipe · Todos los derechos reservados · Sistema HCE v2.0`,
  },
}

export const ColorPersonalizado: Story = {
  args: {
    copyright: `© ${new Date().getFullYear()} Clínica San Felipe · Todos los derechos reservados · Sistema HCE v2.0`,
    color: hceColors.primary.blue[600],
  },
}
