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
    unitLabel: {
      control:     "text",
      description: "Unidad que queda pegada al valor mientras se escribe (ej. \"kg\", \"% O2\", \"mmHg\"). No forma parte del value editable — si se omite, el campo se comporta igual que antes.",
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
    error: {
      control:     "boolean",
      description: "Activa el estado de error: label y borde cambian a rojo.",
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

export const ErrorState: Story = {
  args: {
    label:  "Error",
    value:  "",
    suffix: "Kg",
    error:  true,
  },
}

/** unitLabel: la unidad queda pegada al número mientras se escribe (no un placeholder, sino parte visual del valor). */
export const WithUnitLabel: Story = {
  args: {
    label:     "Peso",
    value:     "75",
    suffix:    "Kg",
    unitLabel: "kg",
  },
  render: (args) => {
    const [v, setV] = useState(args.value)
    return <NumericField {...args} value={v} onChange={setV} />
  },
}

/** Mismo set de Signos Vitales que VitalSignsUnits, pero con unitLabel pegado al valor una vez que hay dato ingresado. */
export const VitalSignsUnitsFilled: Story = {
  render: () => {
    const [peso, setPeso] = useState("75")
    const [talla, setTalla] = useState("172")
    const [sistolica, setSistolica] = useState("120")
    const [saturacion, setSaturacion] = useState("96")
    const [cardiaca, setCardiaca] = useState("98")
    const [temperatura, setTemperatura] = useState("39")

    return (
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <NumericField label="Peso" value={peso} suffix="Kg" unitLabel="kg" numberType="decimal" onChange={setPeso} />
        <NumericField label="Talla" value={talla} suffix="cm" unitLabel="cm" numberType="natural" onChange={setTalla} />
        <NumericField label="P. Sistólica" value={sistolica} suffix="mmHg" unitLabel="mmHg" numberType="natural" onChange={setSistolica} />
        <NumericField label="Saturación O2" value={saturacion} suffix="%" unitLabel="% O2" numberType="natural" onChange={setSaturacion} />
        <NumericField label="Fr. Cardiaca" value={cardiaca} suffix="LPM" unitLabel="lpm" numberType="natural" onChange={setCardiaca} />
        <NumericField label="Temperatura" value={temperatura} suffix="°C" unitLabel="°C" numberType="decimal" onChange={setTemperatura} />
      </div>
    )
  },
}