import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { Toggle } from "@hce/design-system"

const meta: Meta<typeof Toggle> = {
  title:     "Atoms/Toggle",
  component: Toggle,
  tags:      ["autodocs"],
  argTypes: {
    checked: {
      control:     "boolean",
      description: "Estado on/off del switch.",
    },
    disabled: {
      control:     "boolean",
      description: "Deshabilita la interacción — opacidad reducida, cursor not-allowed.",
      table:       { defaultValue: { summary: "false" } },
    },
  },
}
export default meta
type Story = StoryObj<typeof Toggle>

export const Default: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false)
    return (
      <Toggle
        {...args}
        checked={checked}
        onChange={(v) => {
          setChecked(v)
          args.onChange?.(v)
        }}
      />
    )
  },
  args: {
    checked:  false,
    disabled: false,
    onChange: (v) => console.log("toggle", v),
  },
}

/** Estados: apagado, encendido, deshabilitado */
export const States: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
      <Toggle checked={false} onChange={() => {}} />
      <Toggle checked={true} onChange={() => {}} />
      <Toggle checked={true} disabled onChange={() => {}} />
    </div>
  ),
}
