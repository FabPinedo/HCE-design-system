import type { Meta, StoryObj } from "@storybook/react"
import { CarruselHome }        from "@hce/design-system"

const DEMO_IMAGES = [
  "https://picsum.photos/seed/hce1/900/300",
  "https://picsum.photos/seed/hce2/900/300",
  "https://picsum.photos/seed/hce3/900/300",
  "https://picsum.photos/seed/hce4/900/300",
]

const meta: Meta<typeof CarruselHome> = {
  title:      "Organisms/CarruselHome",
  component:  CarruselHome,
  tags:       ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    height: {
      control:     { type: "range", min: 150, max: 500, step: 10 },
      description: "Alto del carrusel en píxeles",
    },
    autoPlaySeconds: {
      control:     { type: "range", min: 0, max: 15, step: 1 },
      description: "Segundos entre avance automático. 0 = desactivado. Se pausa al hacer hover.",
    },
    borderRadius: {
      control:     "text",
      description: "Border-radius del contenedor. Ej: '12px', '0', '8px'",
    },
    objectFit: {
      control:     { type: "radio" },
      options:     ["contain", "cover"],
      description: "Cómo ajustar la imagen al contenedor",
    },
  },
}
export default meta
type Story = StoryObj<typeof CarruselHome>

/** Carrusel estándar — slide con dirección, auto-avance, pausa en hover */
export const Default: Story = {
  args: {
    images:          DEMO_IMAGES,
    height:          300,
    autoPlaySeconds: 5,
    borderRadius:    "12px",
    objectFit:       "contain",
  },
}

/** objectFit cover — la imagen cubre todo el área sin espacios */
export const Cover: Story = {
  name: "Cover — imagen recortada",
  args: {
    images:          DEMO_IMAGES,
    height:          300,
    autoPlaySeconds: 5,
    objectFit:       "cover",
  },
}

/** Sin auto-avance — solo navegación manual: flechas, dots, teclado y swipe */
export const ManualOnly: Story = {
  name: "Manual — sin auto-avance",
  args: {
    images:          DEMO_IMAGES,
    height:          300,
    autoPlaySeconds: 0,
  },
}

/** Una sola imagen — sin flechas ni dots, sin animación de slide */
export const UnaImagen: Story = {
  name: "Una sola imagen",
  args: {
    images: [DEMO_IMAGES[0]],
    height: 280,
  },
}

/** Alto mayor — banners o páginas con más espacio vertical */
export const AltoGrande: Story = {
  name: "Alto grande (420px)",
  args: {
    images: DEMO_IMAGES,
    height: 420,
  },
}

/** Sin border-radius — útil cuando el carrusel va de borde a borde */
export const SinBorderRadius: Story = {
  name: "Sin border-radius",
  args: {
    images:       DEMO_IMAGES,
    height:       280,
    borderRadius: "0",
  },
  parameters: { layout: "fullscreen" },
}

/** Sin imágenes — el componente devuelve null, no rompe */
export const SinImagenes: Story = {
  name: "Sin imágenes (null)",
  args: {
    images: [],
    height: 300,
  },
}

/** Playground — todos los controles disponibles */
export const Playground: Story = {
  name: "Playground — controles interactivos",
  args: {
    images:          DEMO_IMAGES,
    height:          300,
    autoPlaySeconds: 4,
    borderRadius:    "12px",
    objectFit:       "contain",
  },
}
