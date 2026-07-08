import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { NumericField } from "@hce/design-system"

const meta: Meta<typeof NumericField> = {
  title:      "Atoms/NumericField",
  component:  NumericField,
  tags:       ["autodocs"],
  decorators: [(Story) => <div style={{ width: 160 }}><Story /></div>],
  argTypes: {
    label: {
      control:     "text",
      description: "Etiqueta mostrada sobre el campo.",
    },
    suffix: {
      control:     "text",
      description: "Unidad mostrada como placeholder dentro del input vacío (ej. \"Kg\", \"°C\", \"mmHg\").",
    },
    numberType: {
      control:     "radio",
      options:     ["decimal", "natural"],
      description: "\"decimal\" permite coma/punto (peso, temperatura); \"natural\" solo dígitos enteros.",
      table:       { defaultValue: { summary: "decimal" } },
    },
    readOnly: {
      control:     "boolean",
      description: "Campo de solo lectura (ej. IMC calculado).",
      table:       { defaultValue: { summary: "false" } },
    },
  },
}
export default meta
type Story = StoryObj<typeof NumericField>

export const Default: Story = {
  args: {
    label:  "Peso",
    value:  "",
    suffix: "Kg",
  },
  render: (args) => {
    const [v, setV] = useState(args.value)
    return <NumericField {...args} value={v} onChange={setV} />
  },
}

/** Uno por cada unidad usada en Signos Vitales del formulario de triaje */
export const VitalSignsUnits: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      <NumericField label="Peso" value="" suffix="Kg" numberType="decimal" onChange={() => {}} />
      <NumericField label="Talla" value="" suffix="cm" numberType="natural" onChange={() => {}} />
      <NumericField label="P. Sistólica" value="" suffix="mmHg" numberType="natural" onChange={() => {}} />
      <NumericField label="Saturación O2" value="" suffix="%" numberType="natural" onChange={() => {}} />
      <NumericField label="Fr. Cardiaca" value="" suffix="LPM" numberType="natural" onChange={() => {}} />
      <NumericField label="Temperatura" value="" suffix="°C" numberType="decimal" onChange={() => {}} />
    </div>
  ),
}

export const ReadOnlyCalculated: Story = {
  args: {
    label:    "IMC",
    value:    "24.2",
    suffix:   "",
    readOnly: true,
  },
}
