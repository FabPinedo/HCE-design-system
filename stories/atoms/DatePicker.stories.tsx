import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { DatePicker } from "@hce/design-system"

const meta: Meta<typeof DatePicker> = {
  title:      "Atoms/DatePicker",
  component:  DatePicker,
  tags:       ["autodocs"],
  decorators: [(Story) => <div style={{ width: 220 }}><Story /></div>],
  argTypes: {
    label: {
      control:     "text",
      description: "Etiqueta mostrada sobre el campo.",
    },
    value: {
      control:     "text",
      description: "Fecha en formato ISO YYYY-MM-DD (formato nativo de <input type=\"date\">).",
    },
    disabled: {
      control:     "boolean",
      description: "Deshabilita la interacción con el campo.",
      table:       { defaultValue: { summary: "false" } },
    },
    error: {
      control:     "boolean",
      description: "Activa el estado de error: label y borde cambian a rojo.",
      table:       { defaultValue: { summary: "false" } },
    },
    required: {
      control:     "boolean",
      description: "Marca el campo como requerido.",
    },
  },
}
export default meta
type Story = StoryObj<typeof DatePicker>

export const Default: Story = {
  args: {
    label: "Fecha FUR",
    value: "",
  },
  render: (args) => {
    const [v, setV] = useState(args.value)
    return <DatePicker {...args} value={v} onChange={setV} />
  },
}

/** Doble método de entrada: escritura manual segmentada (día/mes/año) o selector de calendario
    nativo del navegador (ícono a la derecha del input). El value expuesto siempre es YYYY-MM-DD. */
export const States: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 220 }}>
      <DatePicker label="Normal" value="" onChange={() => {}} />
      <DatePicker label="Con valor" value="2026-07-07" onChange={() => {}} />
      <DatePicker label="Error" value="" error onChange={() => {}} />
      <DatePicker label="Deshabilitado" value="2026-07-07" disabled onChange={() => {}} />
    </div>
  ),
}
