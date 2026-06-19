import type { Preview } from "@storybook/react"
import React from "react"
import { DSProvider }      from "../src/provider/ThemeProvider"
import { injectHceTokens } from "../src/tokens/hce.tokens"
injectHceTokens()

const preview: Preview = {
  decorators: [
    (Story) => (
      <DSProvider>
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
