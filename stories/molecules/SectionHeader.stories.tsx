import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { SectionHeader } from "@hce/design-system"

const meta: Meta<typeof SectionHeader> = {
  title:      "Molecules/SectionHeader",
  component:  SectionHeader,
  tags:       ["autodocs"],
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
  argTypes: {
    title: {
      control:     "text",
      description: "Título de la sección.",
    },
    expanded: {
      control:     "boolean",
      description: "Controla la rotación del chevron (▾).",
    },
  },
}
export default meta
type Story = StoryObj<typeof SectionHeader>

export const Default: Story = {
  render: (args) => {
    const [expanded, setExpanded] = useState(args.expanded ?? false)
    return (
      <SectionHeader
        {...args}
        expanded={expanded}
        onToggle={() => setExpanded((e) => !e)}
      />
    )
  },
  args: {
    title:    "Signos Vitales",
    expanded: false,
  },
}

/** Header colapsable de secciones desplegables (ej. Triaje: Datos, Signos Vitales, Glasgow) */
export const ExpandedVsCollapsed: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <SectionHeader title="Colapsado" expanded={false} onToggle={() => {}} />
      <SectionHeader title="Expandido" expanded={true} onToggle={() => {}} />
    </div>
  ),
}
