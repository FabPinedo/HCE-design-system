import type { Meta, StoryObj } from "@storybook/react"
import { SkeletonLoader } from "@hce/design-system"

const meta: Meta<typeof SkeletonLoader> = {
  title:      "Atoms/SkeletonLoader",
  component:  SkeletonLoader,
  tags:       ["autodocs"],
  argTypes: {
    variant: {
      control:     "select",
      options:     ["text", "rect", "circle"],
      description: "Forma del skeleton: texto multilínea, rectángulo o círculo.",
      table:       { defaultValue: { summary: "rect" } },
    },
    width: {
      control:     "text",
      description: "Ancho CSS del skeleton. Ej: '100%', '200px', 200.",
      table:       { defaultValue: { summary: "100%" } },
    },
    height: {
      control:     "text",
      description: "Alto CSS del skeleton. En variant text usa 1em si no se especifica.",
    },
    lines: {
      control:     "number",
      description: "Solo para variant=text. Número de líneas a mostrar.",
      table:       { defaultValue: { summary: "1" } },
    },
  },
}
export default meta
type Story = StoryObj<typeof SkeletonLoader>

export const Default: Story = {
  args: { variant: "rect", width: "240px", height: "20px" },
}

// ── AllVariants ───────────────────────────────────────────

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, width: 320 }}>

      {/* Rectángulo — card/imagen */}
      <div>
        <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 11, color: "#888", marginBottom: 8 }}>
          rect — imagen / card
        </p>
        <SkeletonLoader variant="rect" width="100%" height="120px" />
      </div>

      {/* Círculo — avatar */}
      <div>
        <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 11, color: "#888", marginBottom: 8 }}>
          circle — avatar de médico
        </p>
        <SkeletonLoader variant="circle" width={48} height={48} />
      </div>

      {/* Texto multilínea — párrafo */}
      <div>
        <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 11, color: "#888", marginBottom: 8 }}>
          text — nombre + descripción (3 líneas)
        </p>
        <SkeletonLoader variant="text" lines={3} />
      </div>

    </div>
  ),
}

// ── States ────────────────────────────────────────────────

/** Simulación de una card de paciente cargando */
export const States: Story = {
  name: "States — fila de paciente cargando",
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 12, width: 400, padding: 16,
      border: "1px solid #e6ecf6", borderRadius: 8 }}>
      <SkeletonLoader variant="circle" width={40} height={40} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
        <SkeletonLoader variant="rect" width="60%" height="14px" />
        <SkeletonLoader variant="rect" width="40%" height="11px" />
      </div>
      <SkeletonLoader variant="rect" width="64px" height="24px" />
    </div>
  ),
}

export const TextMultiline: Story = {
  name: "Texto — 5 líneas (diagnóstico)",
  args: { variant: "text", lines: 5 },
  decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
}

export const Circle: Story = {
  name: "Círculo — avatar médico",
  args: { variant: "circle", width: 56, height: 56 },
}
