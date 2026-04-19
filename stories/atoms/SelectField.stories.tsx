import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { SelectField } from "@hce/design-system"

const EMPRESAS = [
  { value: "CENTRAL", label: "Sede Central" },
  { value: "NORTE",   label: "Sede Norte"   },
  { value: "SUR",     label: "Sede Sur"     },
]

const meta: Meta<typeof SelectField> = {
  title:      "Atoms/SelectField",
  component:  SelectField,
  tags:       ["autodocs"],
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
  argTypes: {
    label: {
      control:     "text",
      description: "Etiqueta visible sobre el selector.",
    },
    placeholder: {
      control:     "text",
      description: "Opción vacía mostrada cuando no hay valor seleccionado.",
      table:       { defaultValue: { summary: "-Seleccionar Opción-" } },
    },
    disabled: {
      control:     "boolean",
      description: "Deshabilita la interacción con el selector.",
      table:       { defaultValue: { summary: "false" } },
    },
    error: {
      control:     "boolean",
      description: "Activa el estado de error: label y borde cambian a rojo.",
      table:       { defaultValue: { summary: "false" } },
    },
    fullWidth: {
      control:     "boolean",
      description: "Expande el selector al 100% del contenedor.",
      table:       { defaultValue: { summary: "true" } },
    },
  },
}
export default meta
type Story = StoryObj<typeof SelectField>

export const Default: Story = {
  args: {
    label:    "Empresa",
    value:    "",
    options:  EMPRESAS,
    onChange: () => {},
  },
}

// ── AllVariants ───────────────────────────────────────────

/** Selector vacío, con opción seleccionada y con placeholder personalizado */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 360 }}>
      <SelectField
        label="Sin selección"
        value=""
        options={EMPRESAS}
        onChange={() => {}}
      />
      <SelectField
        label="Con valor seleccionado"
        value="NORTE"
        options={EMPRESAS}
        onChange={() => {}}
      />
      <SelectField
        label="Placeholder personalizado"
        value=""
        options={EMPRESAS}
        placeholder="Elige una sede..."
        onChange={() => {}}
      />
    </div>
  ),
}

// ── States ────────────────────────────────────────────────

/** Estados: normal, error, disabled */
export const States: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 360 }}>
      <SelectField
        label="Normal"
        value=""
        options={EMPRESAS}
        onChange={() => {}}
      />
      <SelectField
        label="Error"
        value=""
        options={EMPRESAS}
        error
        onChange={() => {}}
      />
      <SelectField
        label="Deshabilitado"
        value="CENTRAL"
        options={EMPRESAS}
        disabled
        onChange={() => {}}
      />
    </div>
  ),
}

export const Controlled: Story = {
  render: () => {
    const [v, setV] = useState("")
    return (
      <SelectField
        label="Empresa"
        value={v}
        options={EMPRESAS}
        onChange={setV}
      />
    )
  },
}
