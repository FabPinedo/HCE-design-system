import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { SegmentedToggle } from "@hce/design-system"

const meta: Meta<typeof SegmentedToggle> = {
  title: "Molecules/SegmentedToggle",
  component: SegmentedToggle,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Implementa el patrón WAI-ARIA APG de tabs con roving tabindex: " +
          "solo la opción seleccionada es alcanzable con Tab, y las flechas " +
          "izquierda/derecha (u Home/End) mueven el foco y activan la opción " +
          "(activación automática), saltando las opciones `disabled`.",
      },
    },
  },
  argTypes: {
    onChange: { action: "changed" },
    testId: {
      control: "text",
      description: "Hook de pruebas E2E (Playwright) — se renderiza como data-testid en el contenedor raíz (role=\"tablist\").",
    },
    className: {
      control: "text",
      description: "Clase CSS extra, mergeada con la clase interna del contenedor raíz.",
    },
  },
}
export default meta

type Story = StoryObj<typeof SegmentedToggle>

export const Default: Story = {
  args: {
    options: [
      { label: "Anamnesis", value: "anamnesis" },
      { label: "Examen Físico", value: "examen-fisico" },
    ],
    value: "anamnesis",
  },
  render: (args) => {
    const [value, setValue] = useState(args.value)
    return (
      <SegmentedToggle
        {...args}
        value={value}
        onChange={(v) => {
          setValue(v)
          args.onChange?.(v)
        }}
      />
    )
  },
}

export const ThreeSegments: Story = {
  args: {
    options: [
      { label: "Resultados", value: "resultados" },
      { label: "Órdenes", value: "ordenes" },
      { label: "Histórico", value: "historico" },
    ],
    value: "resultados",
  },
  render: (args) => {
    const [value, setValue] = useState(args.value)
    return (
      <SegmentedToggle
        {...args}
        value={value}
        onChange={(v) => {
          setValue(v)
          args.onChange?.(v)
        }}
      />
    )
  },
}

export const WithDisabledOption: Story = {
  args: {
    options: [
      { label: "Activo", value: "activo" },
      { label: "Inactivo", value: "inactivo", disabled: true },
    ],
    value: "activo",
  },
  render: (args) => {
    const [value, setValue] = useState(args.value)
    return (
      <SegmentedToggle
        {...args}
        value={value}
        onChange={(v) => {
          setValue(v)
          args.onChange?.(v)
        }}
      />
    )
  },
}