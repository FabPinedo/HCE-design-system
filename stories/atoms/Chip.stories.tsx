import type { Meta, StoryObj } from "@storybook/react"
import { Chip } from "@hce/design-system"

const meta: Meta<typeof Chip> = {
  title:     "Atoms/Chip",
  component: Chip,
  tags:      ["autodocs"],
  argTypes: {
    label: {
      control:     "text",
      description: "Texto que muestra el chip.",
      table:       { defaultValue: { summary: "" } },
    },
  },
}
export default meta
type Story = StoryObj<typeof Chip>

export const Default: Story = {
  args: { label: "Activo" },
}

// ── AllVariants ───────────────────────────────────────────

/** Chips con diferentes contenidos representativos del contexto clínico */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
      <Chip label="Activo" />
      <Chip label="En observación" />
      <Chip label="Alta médica" />
      <Chip label="Urgente" />
      <Chip label="Paciente en observación prolongada" />
    </div>
  ),
}

export const LongLabel: Story = {
  args: { label: "Paciente en observación" },
}
