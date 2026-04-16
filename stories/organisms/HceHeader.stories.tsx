import type { Meta, StoryObj } from "@storybook/react"
import { HceHeader } from "@hce/design-system"

// ─── Datos de ejemplo ──────────────────────────────────────
const SUCURSALES_MULTI = [
  { id: "2", nombre: "Jesus Maria" },
  { id: "4", nombre: "La Molina" },
  { id: "1", nombre: "Camacho" },
]

const SUCURSALES_UNA = [
  { id: "1", nombre: "Sede Central" },
]

// ─── Meta ──────────────────────────────────────────────────
const meta: Meta<typeof HceHeader> = {
  title:     "Organisms/HceHeader",
  component: HceHeader,
  tags:      ["autodocs"],
  parameters: { layout: "fullscreen" },
  argTypes: {
    onLogout:       { action: "logout" },
    onSedeCambiada: { action: "sedeCambiada" },
  },
}
export default meta
type Story = StoryObj<typeof HceHeader>

// ─── Stories ───────────────────────────────────────────────

/** Header con múltiples sedes — el select está habilitado */
export const MultipleSedes: Story = {
  args: {
    sede:       "2",
    sucursales: SUCURSALES_MULTI,
    userName:   "Carlos Rossi Gregorovich",
    userRole:   "Médico Internista",
  },
}

/** Header con una sola sede — el select está deshabilitado */
export const UnaSede: Story = {
  args: {
    sede:       "1",
    sucursales: SUCURSALES_UNA,
    userName:   "María Torres",
    userRole:   "Enfermera",
  },
}

/** Header sin sucursales configuradas */
export const SinSedes: Story = {
  args: {
    userName: "Administrador",
    userRole: "Admin",
  },
}

/** Header mínimo sin rol */
export const Minimo: Story = {
  args: {
    userName: "Usuario",
  },
}

/** Nombre largo — verifica que no se trunca prematuramente */
export const NombreLargo: Story = {
  args: {
    sede:       "2",
    sucursales: SUCURSALES_MULTI,
    userName:   "FABRIZZIO RENZO PINEDO ESPINOZA",
    userRole:   "Administrador Sistemas",
  },
}

/** Modo flotante — borderRadius + sombra, para usar alineado con sidebar flotante */
export const Flotante: Story = {
  args: {
    sede:       "2",
    sucursales: SUCURSALES_MULTI,
    userName:   "FABRIZZIO RENZO PINEDO ESPINOZA",
    userRole:   "Administrador Sistemas",
    floating:   true,
  },
  decorators: [
    Story => (
      <div style={{ padding: 12, backgroundColor: "#f0f4f8" }}>
        <Story />
      </div>
    ),
  ],
}
