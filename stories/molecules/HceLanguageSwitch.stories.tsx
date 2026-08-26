import type { Meta, StoryObj } from "@storybook/react"
import React, { useState } from "react"
import { HceLanguageSwitch, type HceLocaleOption } from "@hce/design-system"

const LOCALES: HceLocaleOption[] = [
  { code: "es", label: "Español" },
  { code: "en", label: "English" },
  { code: "pt", label: "Português" },
]

const meta: Meta<typeof HceLanguageSwitch> = {
  title:     "Molecules/HceLanguageSwitch",
  component: HceLanguageSwitch,
  tags:      ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: "var(--ds-color-interactive, #003d96)", padding: 24, display: "inline-flex" }}>
        <Story />
      </div>
    ),
  ],
}
export default meta
type Story = StoryObj<typeof HceLanguageSwitch>

export const Default: Story = {
  args: {
    locales:      LOCALES,
    activeLocale: "es",
    onLocaleChange: (code) => console.log("locale change ->", code),
  },
}

/** Versión interactiva: el estado activo cambia de verdad al elegir una opción */
export const Interactivo: Story = {
  render: () => {
    const [active, setActive] = useState("es")
    return (
      <HceLanguageSwitch
        locales={LOCALES}
        activeLocale={active}
        onLocaleChange={setActive}
      />
    )
  },
}
