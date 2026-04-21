import { useState }      from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Box }           from "@mui/material"
import { EvaScale }      from "@hce/design-system"

const meta: Meta<typeof EvaScale> = {
  title:      "Molecules/EvaScale",
  component:  EvaScale,
  tags:       ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 10, step: 1 },
      description: "Valor seleccionado (0-10)",
    },
    readOnly: {
      control: "boolean",
      description: "Deshabilita la interacción",
    },
  },
}
export default meta
type Story = StoryObj<typeof EvaScale>

/** Playground interactivo — mueve el slider para cambiar el valor */
export const Default: Story = {
  render: ({ value, readOnly }) => {
    const [v, setV] = useState<number | null>(value ?? null)
    return (
      <Box sx={{ maxWidth: 640, mx: "auto", p: 3 }}>
        <EvaScale value={v} onChange={setV} readOnly={readOnly} />
      </Box>
    )
  },
  args: { value: undefined, readOnly: false },
}

/** Sin selección — estado inicial */
export const SinSeleccion: Story = {
  name: "Sin selección",
  render: () => (
    <Box sx={{ maxWidth: 640, mx: "auto", p: 3 }}>
      <EvaScale value={null} onChange={() => {}} />
    </Box>
  ),
}

/** Valor preseleccionado en 7 */
export const ValorPreseleccionado: Story = {
  name: "Dolor 7 preseleccionado",
  render: () => {
    const [v, setV] = useState<number | null>(7)
    return (
      <Box sx={{ maxWidth: 640, mx: "auto", p: 3 }}>
        <EvaScale value={v} onChange={setV} />
      </Box>
    )
  },
}

/** Solo lectura */
export const ReadOnly: Story = {
  name: "ReadOnly — valor 4",
  render: () => (
    <Box sx={{ maxWidth: 640, mx: "auto", p: 3 }}>
      <EvaScale value={4} readOnly />
    </Box>
  ),
}

/** Todos los valores en pantalla */
export const AllVariants: Story = {
  name: "All Variants — todos los valores",
  render: () => (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, p: 3, maxWidth: 680, mx: "auto" }}>
      {Array.from({ length: 11 }, (_, i) => (
        <Box key={i}>
          <Box sx={{ fontFamily: "monospace", fontSize: 11, color: "#6B7280", mb: 0.5 }}>value={i}</Box>
          <EvaScale value={i} readOnly />
        </Box>
      ))}
    </Box>
  ),
}
