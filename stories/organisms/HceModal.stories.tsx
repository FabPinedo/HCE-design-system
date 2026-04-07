import type { Meta, StoryObj } from "@storybook/react"
import React, { useState }    from "react"
import {
  HceModal,
  Button,
  UiCalendarIcon,
  HceInfoIcon,
} from "@hce/design-system"
import Box from "@mui/material/Box"

const meta: Meta<typeof HceModal> = {
  title:     "Organisms/HceModal",
  component: HceModal,
  tags:      ["autodocs"],
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof HceModal>

// ─── Wrapper interactivo ──────────────────────────────────────────────────────
function Demo(props: Omit<React.ComponentProps<typeof HceModal>, "open">) {
  const [open, setOpen]   = useState(false)
  const [value, setValue] = useState("")

  const inputConfig = props.input
    ? { ...props.input, value, onChange: setValue }
    : undefined

  return (
    <>
      <Button onClick={() => setOpen(true)}>Abrir modal</Button>
      <HceModal
        {...props}
        open={open}
        onClose={() => setOpen(false)}
        input={inputConfig}
        confirmButton={props.confirmButton
          ? { ...props.confirmButton, onClick: () => { alert("Confirmado"); setOpen(false) } }
          : undefined
        }
        cancelButton={props.cancelButton
          ? { ...props.cancelButton, onClick: () => setOpen(false) }
          : undefined
        }
      />
    </>
  )
}

// ─── Galería estática (todos los variants) ────────────────────────────────────
function Gallery() {
  const [open,  setOpen]  = useState<string | null>(null)
  const [value, setValue] = useState("")

  const variants: Array<{
    id:    string
    label: string
    props: Omit<React.ComponentProps<typeof HceModal>, "open" | "onClose">
  }> = [
    {
      id: "row-simple", label: "Sin input, sin ícono — row",
      props: {
        title: "Title",
        description: "Keep your messages short, but make sure they cover everything you need to say.",
        buttonLayout: "row",
        confirmButton: { label: "Action", icon: <HceInfoIcon size={16} />, onClick: () => {} },
        cancelButton:  { label: "Action", icon: <HceInfoIcon size={16} />, onClick: () => {} },
      },
    },
    {
      id: "row-input", label: "Con input, sin ícono — row",
      props: {
        title: "Title",
        description: "Keep your messages short, but make sure they cover everything you need to say.",
        input: { placeholder: "Text", value, onChange: setValue },
        buttonLayout: "row",
        confirmButton: { label: "Action", icon: <HceInfoIcon size={16} />, onClick: () => {} },
        cancelButton:  { label: "Action", icon: <HceInfoIcon size={16} />, onClick: () => {} },
      },
    },
    {
      id: "row-icon", label: "Con ícono, sin input — row",
      props: {
        title: "Title",
        description: "Keep your messages short, but make sure they cover everything you need to say.",
        icon: <UiCalendarIcon size={28} />,
        buttonLayout: "row",
        confirmButton: { label: "Action", icon: <HceInfoIcon size={16} />, onClick: () => {} },
        cancelButton:  { label: "Action", icon: <HceInfoIcon size={16} />, onClick: () => {} },
      },
    },
    {
      id: "col-simple", label: "Sin input, sin ícono — column",
      props: {
        title: "Title",
        description: "Keep your messages short, but make sure they cover everything you need to say.",
        buttonLayout: "column",
        confirmButton: { label: "Action", icon: <HceInfoIcon size={16} />, onClick: () => {} },
        cancelButton:  { label: "Action", icon: <HceInfoIcon size={16} />, onClick: () => {} },
      },
    },
    {
      id: "col-input", label: "Con input, sin ícono — column",
      props: {
        title: "Title",
        description: "Keep your messages short, but make sure they cover everything you need to say.",
        input: { placeholder: "Text", value, onChange: setValue },
        buttonLayout: "column",
        confirmButton: { label: "Action", icon: <HceInfoIcon size={16} />, onClick: () => {} },
        cancelButton:  { label: "Action", icon: <HceInfoIcon size={16} />, onClick: () => {} },
      },
    },
    {
      id: "col-icon", label: "Con ícono, sin input — column",
      props: {
        title: "Title",
        description: "Keep your messages short, but make sure they cover everything you need to say.",
        icon: <UiCalendarIcon size={28} />,
        buttonLayout: "column",
        confirmButton: { label: "Action", icon: <HceInfoIcon size={16} />, onClick: () => {} },
        cancelButton:  { label: "Action", icon: <HceInfoIcon size={16} />, onClick: () => {} },
      },
    },
  ]

  return (
    <Box sx={{ p: 3, fontFamily: "sans-serif" }}>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        {variants.map((v) => (
          <Box key={v.id} sx={{ display: "flex", flexDirection: "column", gap: 1, alignItems: "flex-start" }}>
            <span style={{ fontSize: 11, color: "#6B7280", fontFamily: "monospace" }}>{v.label}</span>
            <Button onClick={() => setOpen(v.id)}>Ver modal</Button>
            <HceModal
              {...v.props}
              open={open === v.id}
              onClose={() => setOpen(null)}
              input={v.props.input ? { ...v.props.input, value, onChange: setValue } : undefined}
              confirmButton={v.props.confirmButton
                ? { ...v.props.confirmButton, onClick: () => setOpen(null) }
                : undefined
              }
              cancelButton={v.props.cancelButton
                ? { ...v.props.cancelButton, onClick: () => setOpen(null) }
                : undefined
              }
            />
          </Box>
        ))}
      </Box>
    </Box>
  )
}

// ─── Stories ──────────────────────────────────────────────────────────────────
export const Galeria: Story = {
  name:   "Galería — 6 variantes",
  render: () => <Gallery />,
}

export const SoloConfirmar: Story = {
  name: "Un solo botón — Confirmar",
  render: () => (
    <Demo
      title="¿Estás seguro?"
      description="Esta acción no se puede deshacer."
      buttonLayout="column"
      confirmButton={{ label: "Sí, continuar", onClick: () => {} }}
    />
  ),
}

export const SoloCancelar: Story = {
  name: "Un solo botón — Cancelar",
  render: () => (
    <Demo
      title="Operación cancelada"
      description="El proceso fue cancelado correctamente."
      cancelButton={{ label: "Cerrar", onClick: () => {} }}
    />
  ),
}

export const ConInputYIcono: Story = {
  name: "Con input y badge de ícono",
  render: () => (
    <Demo
      title="Agregar nota"
      description="Escribe una observación para este paciente."
      icon={<UiCalendarIcon size={28} />}
      input={{ placeholder: "Escribe aquí...", value: "", onChange: () => {} }}
      buttonLayout="column"
      confirmButton={{ label: "Guardar", onClick: () => {} }}
      cancelButton={{ label: "Cancelar", onClick: () => {} }}
    />
  ),
}

export const SinBotones: Story = {
  name: "Solo informativo (sin botones)",
  render: () => (
    <Demo
      title="Información"
      description="El sistema está procesando tu solicitud. Recibirás una notificación cuando finalice."
      icon={<HceInfoIcon size={28} />}
    />
  ),
}
