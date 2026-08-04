import type { Meta, StoryObj } from "@storybook/react"
import { FieldCol, TextInput } from "@hce/design-system"

const meta: Meta<typeof FieldCol> = {
  title:      "Atoms/FieldCol",
  component:  FieldCol,
  tags:       ["autodocs"],
  decorators: [(Story) => <div style={{ width: 280 }}><Story /></div>],
  argTypes: {
    label: {
      control:     "text",
      description: "Etiqueta mostrada sobre el contenido.",
    },
    flex: {
      control:     "text",
      description: "Valor CSS flex del contenedor (número o string, ej. \"0 0 150px\").",
      table:       { defaultValue: { summary: "1" } },
    },
    error: {
      control:     "boolean",
      description: "Activa el estado de error: la etiqueta cambia a rojo.",
      table:       { defaultValue: { summary: "false" } },
    },
  },
}
export default meta
type Story = StoryObj<typeof FieldCol>

export const Default: Story = {
  args: {
    label: "Peso",
  },
  render: (args) => (
    <FieldCol {...args}>
      <TextInput value="" onChange={() => {}} placeholder="0.0" />
    </FieldCol>
  ),
}

/** Wrapper genérico usado por campos custom (NumericField, secciones de datos del paciente, etc.) */
export const AnyContent: Story = {
  render: () => (
    <FieldCol label="Cualquier contenido">
      <div style={{ padding: 8, border: "1px dashed #ccc", borderRadius: 8 }}>
        Contenido arbitrario
      </div>
    </FieldCol>
  ),
}

export const ErrorState: Story = {
  args: {
    label: "Peso",
    error: true,
  },
  render: (args) => (
    <FieldCol {...args}>
      <TextInput value="" onChange={() => {}} placeholder="0.0" error={args.error} />
    </FieldCol>
  ),
}
