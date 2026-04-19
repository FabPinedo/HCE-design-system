import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { TextInput, User } from "@hce/design-system"

const meta: Meta<typeof TextInput> = {
  title:      "Atoms/TextInput",
  component:  TextInput,
  tags:       ["autodocs"],
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
  argTypes: {
    label: {
      control:     "text",
      description: "Etiqueta visible sobre el campo.",
    },
    placeholder: {
      control:     "text",
      description: "Texto de ayuda cuando el campo está vacío.",
    },
    disabled: {
      control:     "boolean",
      description: "Deshabilita la interacción con el campo.",
      table:       { defaultValue: { summary: "false" } },
    },
    error: {
      control:     "boolean",
      description: "Activa el estado de error: label, borde e ícono cambian a rojo.",
      table:       { defaultValue: { summary: "false" } },
    },
    required: {
      control:     "boolean",
      description: "Marca el campo como requerido.",
    },
    fullWidth: {
      control:     "boolean",
      description: "Expande el campo al 100% del contenedor.",
      table:       { defaultValue: { summary: "true" } },
    },
  },
}
export default meta
type Story = StoryObj<typeof TextInput>

export const Default: Story = {
  args: {
    label:       "Usuario",
    value:       "",
    placeholder: "Ingrese usuario",
    onChange:    () => {},
  },
}

export const WithIcon: Story = {
  args: {
    label:       "Usuario",
    value:       "",
    placeholder: "Ingrese usuario",
    startIcon:   <User size={18} />,
    onChange:    () => {},
  },
}

// ── AllVariants ───────────────────────────────────────────

/** Campos con y sin ícono, con placeholder y con valor */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 360 }}>
      <TextInput
        label="Sin ícono"
        value=""
        placeholder="Escribe aquí..."
        onChange={() => {}}
      />
      <TextInput
        label="Con ícono"
        value=""
        placeholder="Ingresa tu usuario"
        startIcon={<User size={18} />}
        onChange={() => {}}
      />
      <TextInput
        label="Con valor"
        value="Dr. García"
        placeholder="Nombre"
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
      <TextInput
        label="Normal"
        value=""
        placeholder="Estado normal"
        onChange={() => {}}
      />
      <TextInput
        label="Error"
        value="dato incorrecto"
        placeholder="Estado error"
        error
        onChange={() => {}}
      />
      <TextInput
        label="Deshabilitado"
        value="Campo bloqueado"
        placeholder="Deshabilitado"
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
      <TextInput
        label="Nombre"
        value={v}
        placeholder="Escribe aquí..."
        onChange={setV}
      />
    )
  },
}
