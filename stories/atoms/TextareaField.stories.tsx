import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { TextareaField } from "@hce/design-system"

const meta: Meta<typeof TextareaField> = {
  title:      "Atoms/TextareaField",
  component:  TextareaField,
  tags:       ["autodocs"],
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
  argTypes: {
    label: {
      control:     "text",
      description: "Etiqueta mostrada sobre el campo.",
    },
    placeholder: {
      control:     "text",
      description: "Texto de ayuda cuando el campo está vacío.",
    },
    maxLength: {
      control:     "number",
      description: "Máximo de caracteres permitidos — se muestra un contador \"n/max\".",
      table:       { defaultValue: { summary: "100" } },
    },
  },
}
export default meta
type Story = StoryObj<typeof TextareaField>

export const Default: Story = {
  args: {
    label:       "Comentarios",
    value:       "",
    placeholder: "Ingrese texto",
    maxLength:   100,
  },
  render: (args) => {
    const [v, setV] = useState(args.value)
    return <TextareaField {...args} value={v} onChange={setV} />
  },
}

export const NearLimit: Story = {
  args: {
    label:     "Comentarios",
    value:     "Paciente ingresa con dolor torácico de inicio súbito, sin antecedentes",
    maxLength: 80,
  },
}
