import { Avatar } from "@hce/design-system"
import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof Avatar> = {
  title: "Atoms/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["circular", "rounded", "square"],
      description: "Forma del avatar.",
    },
    alt: {
      control: "text",
      description: "Texto alternativo. Se usa como aria-label cuando no hay imagen visible.",
    },
    src: {
      control: "text",
      description: "URL de la imagen. Si falla o no se define, cae a children o al ícono por defecto.",
    },
    srcSet: { control: "text" },
    sizes: { control: "text" },
    children: {
      control: "text",
      description: "Contenido de fallback cuando no hay imagen (iniciales, ícono, etc).",
    },
  },
  parameters: {
    // Fondo oscuro opcional para que se note el círculo/esquinas sobre blanco por defecto de Storybook
    layout: "centered",
  },
}
export default meta
type Story = StoryObj<typeof Avatar>

// ─── Historia base, editable desde los Controls ──────────────────────────────
export const Default: Story = {
  args: {
    alt: "Remy Sharp",
    src: "https://mui.com/static/images/avatar/1.jpg",
  },
}

// ─── Con imagen ───────────────────────────────────────────────────────────────
export const WithImage: Story = {
  args: {
    alt: "Remy Sharp",
    src: "https://mui.com/static/images/avatar/1.jpg",
  },
}

// ─── Con iniciales (children de texto) ────────────────────────────────────────
export const WithInitials: Story = {
  args: {
    children: "JD",
    sx: { bgcolor: "#1976d2" },
  },
}

// ─── Imagen rota: cae a children (iniciales) ──────────────────────────────────
export const BrokenImageFallsBackToInitials: Story = {
  args: {
    alt: "Remy Sharp",
    src: "/esto-no-existe.jpg",
    children: "RS",
    sx: { bgcolor: "#d84315" },
  },
}

// ─── Sin src ni children: ícono de persona por defecto ────────────────────────
export const DefaultIconFallback: Story = {
  args: {},
}

// ─── Las 3 variantes de forma, una al lado de otra ───────────────────────────
export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <Avatar variant="circular" alt="Remy Sharp" src="https://mui.com/static/images/avatar/1.jpg" />
      <Avatar variant="rounded" alt="Remy Sharp" src="https://mui.com/static/images/avatar/1.jpg" />
      <Avatar variant="square" alt="Remy Sharp" src="https://mui.com/static/images/avatar/1.jpg" />
    </div>
  ),
}

// ─── Distintos tamaños, vía sx (width/height) ─────────────────────────────────
export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <Avatar
        alt="Remy Sharp"
        src="https://mui.com/static/images/avatar/1.jpg"
        sx={{ width: 24, height: 24 }}
      />
      <Avatar alt="Remy Sharp" src="https://mui.com/static/images/avatar/1.jpg" />
      <Avatar
        alt="Remy Sharp"
        src="https://mui.com/static/images/avatar/1.jpg"
        sx={{ width: 56, height: 56 }}
      />
      <Avatar
        alt="Remy Sharp"
        src="https://mui.com/static/images/avatar/1.jpg"
        sx={{ width: 80, height: 80, fontSize: "2rem" }}
      />
    </div>
  ),
}

// ─── Grupo de avatares superpuestos (equivalente casero al AvatarGroup de MUI) ─
export const Group: Story = {
  render: () => (
    <div style={{ display: "flex" }}>
      {["1", "2", "3", "4"].map((n, i) => (
        <Avatar
          key={n}
          alt={`Usuario ${n}`}
          src={`https://mui.com/static/images/avatar/${n}.jpg`}
          sx={{
            border: "2px solid #fff",
            marginLeft: i === 0 ? 0 : "-10px",
          }}
        />
      ))}
    </div>
  ),
}
