import type { Preview } from "@storybook/react"
import React from "react"
import { DSProvider }      from "../src/provider/ThemeProvider"
import type { CompanyThemeKey } from "../src/tokens/companies.tokens"
import { injectHceTokens } from "../src/tokens/hce.tokens"
injectHceTokens()

// Toolbar de tenant/empresa — un solo eje de theming (ver theme/themes.ts).
// "default" y "csf" apuntan al mismo DsTheme (CSF es la empresa por
// defecto de este deployment), así que se muestra solo una vez en el
// toolbar bajo el nombre "csf" para no listar dos entradas idénticas; el
// tema exportado `default` sigue existiendo y es el que usa `DSProvider`
// cuando no se pasa `theme` explícito.
//
// Se le pasa a `DSProvider` la CLAVE de tenant (string), no un objeto
// `DsTheme` ya resuelto — `DSProvider` resuelve el objeto internamente
// (`dsThemes[theme]`) y así conserva la IDENTIDAD del tenant (`useDsTenant`)
// además de sus colores. Pasar el objeto resuelto directamente pierde esa
// identidad (`DSProvider` cae a `"default"`, ver el comentario de
// `DSProvider` en provider/ThemeProvider.tsx) y componentes que bifurcan por
// tenant en vez de por color — ej. el logo de HceSidebar — dejarían de
// reaccionar al selector de este toolbar.
const storybookThemes: Record<string, CompanyThemeKey> = {
  csf:   "csf",
  sanna: "sanna",
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
