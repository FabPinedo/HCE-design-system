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

// URL de foto de ejemplo (placeholder público para Storybook)
const PHOTO_URL_DEMO = "https://picsum.photos/seed/hce-doctor/34/34"

// ─── Meta ──────────────────────────────────────────────────
const meta: Meta<typeof HceHeader> = {
  title:     "Organisms/HceHeader",
  component: HceHeader,
  tags:      ["autodocs"],
  parameters: { layout: "fullscreen" },
  argTypes: {
    onLogout:       { action: "logout" },
    onSedeCambiada: { action: "sedeCambiada" },
    userPhotoUrl:   { control: "text", description: "URL de la foto de perfil. Si falla la carga, muestra las iniciales." },
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

/** Header para monitorTV */
export const MonitorTV: Story = {
  args: {
    title: "Monitor TV",
    variant:"tv",
    sede: "Jesus Maria",
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
    variant: "default",
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

/** Con foto de perfil — la foto reemplaza las iniciales en el avatar */
export const ConFotoPerfil: Story = {
  args: {
    sede:         "2",
    sucursales:   SUCURSALES_MULTI,
    userName:     "Dra. VIOLETA DEL CARMEN ESCALANTE TRESIERRA",
    userRole:     "ANESTESIOLOGIA",
    userPhotoUrl: PHOTO_URL_DEMO,
  },
}

/** Foto rota — fallback automático a iniciales cuando la URL no carga */
export const FotoRotaFallback: Story = {
  args: {
    sede:         "2",
    sucursales:   SUCURSALES_MULTI,
    userName:     "Dra. VIOLETA DEL CARMEN ESCALANTE TRESIERRA",
    userRole:     "ANESTESIOLOGIA",
    userPhotoUrl: "https://example.invalid/foto-no-existe.png",
  },
}

/** Sin foto — muestra solo iniciales (comportamiento original) */
export const SinFoto: Story = {
  args: {
    sede:       "2",
    sucursales: SUCURSALES_MULTI,
    userName:   "Dr. CARLOS AUGUSTO RIOS MENDOZA",
    userRole:   "CARDIOLOGIA",
  },
}
