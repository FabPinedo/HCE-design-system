import type { Meta, StoryObj } from "@storybook/react"
import { PatientField } from "@hce/design-system"

const meta: Meta<typeof PatientField> = {
  title: "Atoms/PatientField",
  component: PatientField,
  tags: ["autodocs"],
  decorators: [(Story) => <div style={{ width: 280 }}><Story /></div>],
  argTypes: {
    align: {
      control: "inline-radio",
      options: ["left", "center", "right"],
    },
  },
}

export default meta
type Story = StoryObj<typeof PatientField>

export const Default: Story = {
  args: {
    label: "Paciente",
    value: "María del Carmen Pérez",
  },
}

export const Centered: Story = {
  args: {
    label: "Grupo sanguíneo",
    value: "O+",
    align: "center",
  },
}

export const Empty: Story = {
  args: {
    label: "Teléfono",
    value: null,
  },
}

export const CustomEmptyValue: Story = {
  args: {
    label: "Seguro",
    value: null,
    emptyValue: "Sin información",
  },
}

export const LongValue: Story = {
  args: {
    label: "Dirección",
    value: "Avenida Principal 1234, urbanización Los Jardines, Lima",
  },
}
