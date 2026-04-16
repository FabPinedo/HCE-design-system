import type { Meta, StoryObj } from "@storybook/react"
import { CarruselHome }        from "@hce/design-system"

// Imágenes de demostración (URLs públicas — en producción se usan assets locales de src/assets/carousel/)
const DEMO_IMAGES = [
  "https://picsum.photos/seed/hce1/900/300",
  "https://picsum.photos/seed/hce2/900/300",
  "https://picsum.photos/seed/hce3/900/300",
  "https://picsum.photos/seed/hce4/900/300",
]

const meta: Meta<typeof CarruselHome> = {
  title:     "Organisms/CarruselHome",
  component: CarruselHome,
  tags:      ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    height: {
      control:     { type: "range", min: 150, max: 500, step: 10 },
      description: "Alto del carrusel en píxeles",
    },
    autoPlaySeconds: {
      control:     { type: "range", min: 0, max: 15, step: 1 },
      description: "Segundos entre avance automático. 0 = desactivado",
    },
    borderRadius: {
      control:     "text",
      description: "Border-radius del contenedor. Ej: '12px', '0', '8px'",
    },
  },
}
export default meta
type Story = StoryObj<typeof CarruselHome>

/** Carrusel estándar con 4 imágenes y auto-avance cada 5 s */
export const Default: Story = {
  args: {
    images:          DEMO_IMAGES,
    height:          300,
    autoPlaySeconds: 5,
    borderRadius:    "12px",
  },
}

/** Sin auto-avance — solo navegación manual con flechas y dots */
export const ManualOnly: Story = {
  args: {
    images:          DEMO_IMAGES,
    height:          300,
    autoPlaySeconds: 0,
  },
}

/** Una sola imagen — sin flechas ni dots (no hay nada que navegar) */
export const UnaImagen: Story = {
  args: {
    images: [DEMO_IMAGES[0]],
    height: 280,
  },
}

/** Alto mayor para banners o páginas con más espacio */
export const AltoGrande: Story = {
  args: {
    images: DEMO_IMAGES,
    height: 420,
  },
}

/** Sin border-radius — útil cuando el carrusel va de borde a borde */
export const SinBorderRadius: Story = {
  args: {
    images:       DEMO_IMAGES,
    height:       280,
    borderRadius: "0",
  },
  parameters: { layout: "fullscreen" },
}

/** Sin imágenes — el componente devuelve null, no rompe */
export const SinImagenes: Story = {
  args: {
    images: [],
    height: 300,
  },
}
