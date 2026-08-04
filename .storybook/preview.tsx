import type { Preview } from "@storybook/react"
import React from "react"
import { DSProvider }      from "../src/provider/ThemeProvider"
import { dsThemes, type DsTheme } from "../src/theme/themes"
import { injectHceTokens } from "../src/tokens/hce.tokens"
injectHceTokens()

// Toolbar de tenant/empresa — un solo eje de theming (ver theme/themes.ts).
// "default" y "csf" apuntan al mismo DsTheme (CSF es la empresa por
// defecto de este deployment), así que se muestra solo una vez en el
// toolbar bajo el nombre "csf" para no listar dos entradas idénticas; el
// tema exportado `default` sigue existiendo y es el que usa `DSProvider`
// cuando no se pasa `theme` explícito.
const storybookThemes: Record<string, DsTheme> = {
  csf:   dsThemes.csf,
  sanna: dsThemes.sanna,
}

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Empresa/tenant del Design System",
      toolbar: {
        title: "Theme",
        icon: "paintbrush",
        items: [
          { value: "csf",   title: "Clínica San Felipe" },
          { value: "sanna", title: "Sanna" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "csf",
  },
  decorators: [
    (Story, context) => (
      <DSProvider theme={storybookThemes[context.globals.theme as keyof typeof storybookThemes]}>
        <Story />
      </DSProvider>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date:  /Date$/i,
      },
    },
    layout: "centered",
  },
}

export default preview
