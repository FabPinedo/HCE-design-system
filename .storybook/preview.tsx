import type { Preview } from "@storybook/react"
import React from "react"
import { DSProvider }      from "../src/provider/ThemeProvider"
import { theme }           from "../src/theme/theme"
import { emergencyTheme }  from "../src/theme/emergencyTheme"
import { injectHceTokens } from "../src/tokens/hce.tokens"
injectHceTokens()

const themes = { base: theme, emergency: emergencyTheme }

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Theme del Design System",
      toolbar: {
        title: "Theme",
        icon: "paintbrush",
        items: [
          { value: "base",      title: "Base" },
          { value: "emergency", title: "Emergencia" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "base",
  },
  decorators: [
    (Story, context) => (
      <DSProvider theme={themes[context.globals.theme as keyof typeof themes]}>
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
