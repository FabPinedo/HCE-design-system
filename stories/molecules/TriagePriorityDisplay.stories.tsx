import { useState }      from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Box }           from "@mui/material"
import { TriagePriorityDisplay } from "@hce/design-system"
import type { TriagePriority }   from "@hce/design-system"

const meta: Meta<typeof TriagePriorityDisplay> = {
  title:      "Molecules/TriagePriorityDisplay",
  component:  TriagePriorityDisplay,
  tags:       ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    selected: {
      control:  { type: "radio" },
      options:  [undefined, "I", "II", "III", "IV"],
      description: "Prioridad seleccionada",
    },
    readOnly: {
      control: "boolean",
    },
  },
}
export default meta
type Story = StoryObj<typeof TriagePriorityDisplay>

/** Interactivo — selecciona una prioridad */
export const Default: Story = {
  render: ({ selected, readOnly }) => {
    const [sel, setSel] = useState<TriagePriority | null>(selected ?? null)
    return (
      <Box sx={{ p: 3 }}>
        <TriagePriorityDisplay selected={sel} onSelect={setSel} readOnly={readOnly} />
        {sel && (
          <Box sx={{ mt: 2, fontFamily: "monospace", fontSize: 12, color: "#6B7280" }}>
            selected: "{sel}"
          </Box>
        )}
      </Box>
    )
  },
  args: { selected: undefined, readOnly: false },
}

/** Prioridad I preseleccionada */
export const PrioridadI: Story = {
  name: "Prioridad I (rojo)",
  render: () => (
    <Box sx={{ p: 3 }}>
      <TriagePriorityDisplay selected="I" readOnly />
    </Box>
  ),
}

/** Sin selección (display) */
export const SinSeleccion: Story = {
  name: "Sin selección — display",
  render: () => (
    <Box sx={{ p: 3 }}>
      <TriagePriorityDisplay readOnly />
    </Box>
  ),
}

/** Todas las prioridades individualmente */
export const AllVariants: Story = {
  name: "All Variants — una por una",
  render: () => (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, p: 3 }}>
      {(["I", "II", "III", "IV"] as TriagePriority[]).map(p => (
        <Box key={p}>
          <Box sx={{ fontFamily: "monospace", fontSize: 11, color: "#6B7280", mb: 0.5 }}>selected="{p}"</Box>
          <TriagePriorityDisplay selected={p} readOnly />
        </Box>
      ))}
    </Box>
  ),
}
