import type { Meta, StoryObj } from "@storybook/react"
import { useState, useEffect }  from "react"
import { HceUpdateBanner }      from "@hce/design-system"
import { Button }               from "@hce/design-system"

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof HceUpdateBanner> = {
  title:     "Molecules/HceUpdateBanner",
  component: HceUpdateBanner,
  tags:      ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    open:        { control: "boolean" },
    seconds:     { control: { type: "range", min: 0, max: 10, step: 1 } },
    onReloadNow: { action: "recargar-ahora" },
  },
}
export default meta
type Story = StoryObj<typeof HceUpdateBanner>

// ─── Stories estáticas ────────────────────────────────────────────────────────

/** Estado inicial — 10 segundos restantes */
export const Default: Story = {
  name: "Abierto — 10 s",
  args: {
    open:    true,
    seconds: 10,
  },
}

/** Últimos segundos — texto cambia a "segundo" (singular) */
export const UltimoSegundo: Story = {
  name: "Abierto — 1 s (singular)",
  args: {
    open:    true,
    seconds: 1,
  },
}

/** Modal cerrado — no renderiza nada visible */
export const Cerrado: Story = {
  name: "Cerrado",
  args: {
    open:    false,
    seconds: 10,
  },
}

// ─── Story interactiva ────────────────────────────────────────────────────────

/**
 * Simulación completa: haz clic en "Simular nueva versión" y verás la cuenta
 * regresiva de 10 segundos en tiempo real. "Recargar ahora" la cierra con alert.
 */
export const ConCuentaRegresiva: Story = {
  name: "Interactivo — cuenta regresiva real",
  render: () => {
    const TOTAL = 10
    const [open,    setOpen]    = useState(false)
    const [seconds, setSeconds] = useState(TOTAL)

    const simular = () => {
      setSeconds(TOTAL)
      setOpen(true)
    }

    // Decrementa un segundo cada tick mientras el modal está abierto
    useEffect(() => {
      if (!open) return
      if (seconds <= 0) {
        setOpen(false)
        return
      }
      const id = setTimeout(() => setSeconds(s => s - 1), 1_000)
      return () => clearTimeout(id)
    }, [open, seconds])

    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        <Button onClick={simular}>
          Simular nueva versión
        </Button>
        <span style={{ fontSize: 12, color: "#6B7280" }}>
          {open ? `Recargando en ${seconds}s…` : "Modal cerrado"}
        </span>
        <HceUpdateBanner
          open={open}
          seconds={seconds}
          onReloadNow={() => { setOpen(false); alert("¡Recargando ahora!") }}
        />
      </div>
    )
  },
}
