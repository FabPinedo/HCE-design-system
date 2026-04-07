import type { Meta, StoryObj } from "@storybook/react"
import React, { useState }     from "react"
import { LoadingOverlay, Button } from "@hce/design-system"

const meta: Meta<typeof LoadingOverlay> = {
  title:     "Molecules/LoadingOverlay",
  component: LoadingOverlay,
  tags:      ["autodocs"],
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof LoadingOverlay>

// ─── Wrapper interactivo ──────────────────────────────────────────────────────
function Demo(args: React.ComponentProps<typeof LoadingOverlay>) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>Abrir Loading</Button>
      <LoadingOverlay {...args} open={open} />
    </>
  )
}

export const Default: Story = {
  name:   "Default — spinner azul corporativo",
  render: (args) => <Demo {...args} />,
  args:   { message: "Cargando..." },
}

export const SinMensaje: Story = {
  name:   "Sin mensaje",
  render: (args) => <Demo {...args} />,
  args:   {},
}

export const ColorVerde: Story = {
  name:   "Spinner verde",
  render: (args) => <Demo {...args} />,
  args:   { color: "#89C93D", message: "Procesando..." },
}

export const FondoOscuro: Story = {
  name:   "Fondo más oscuro",
  render: (args) => <Demo {...args} />,
  args:   { opacity: 0.75, message: "Por favor espere..." },
}
