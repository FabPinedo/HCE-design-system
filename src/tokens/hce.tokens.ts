/**
 * hce.tokens.ts
 * Paleta de color HCE exportada desde Figma (colors.json).
 * No reemplaza base.tokens — ambos coexisten.
 *
 * Uso:
 *   import { hceColors } from "@hce/design-system"
 *   hceColors.primary.blue[600]  // "#003d96"
 *   hceColors.alert.error[500]   // "#b3261e"
 */

// ── Primary ──────────────────────────────────────────────────────────────────

export const hceColors = {
  primary: {
    green: {
       50: "#f5fcec",
      100: "#def4c5",
      200: "#cfefa9",
      300: "#b9e881",
      400: "#abe469",
      500: "#96dd43",
      600: "#89c93d",
      700: "#6b9d30",
      800: "#537a25",
      900: "#3f5d1c",
    },
    blue: {
       50: "#e6ecf6",
      100: "#b0c5e3",
      200: "#8aa9d6",
      300: "#5481c3",
      400: "#3369b7",
      500: "#0043a5",
      600: "#003d96",
      700: "#003075",
      800: "#00255b",
      900: "#001c45",
    },
  },

  alert: {
    error: {
       50: "#f7e9e9",
      100: "#e7bcb9",
      200: "#dc9b98",
      300: "#cc6e68",
      400: "#c2514b",
      500: "#b3261e",
      600: "#a3231b",
      700: "#7f1b15",
      800: "#621511",
      900: "#4b100d",
    },
    info: {
       50: "#e6f3fa",
      100: "#b1daf1",
      200: "#8bc8ea",
      300: "#55afe0",
      400: "#35a0da",
      500: "#0288d1",
      600: "#027cbe",
      700: "#016194",
      800: "#014b73",
      900: "#013958",
    },
    warning: {
       50: "#fef6e9",
      100: "#fde4bb",
      200: "#fcd79b",
      300: "#fbc56d",
      400: "#fab951",
      500: "#f9a825",
      600: "#e39922",
      700: "#b1771a",
      800: "#895c14",
      900: "#694710",
    },
    success: {
       50: "#eaf2eb",
      100: "#bed7bf",
      200: "#9fc3a1",
      300: "#73a876",
      400: "#58975b",
      500: "#2e7d32",
      600: "#2a722e",
      700: "#215924",
      800: "#19451c",
      900: "#133515",
    },
  },

  neutro: {
    white: {
       50: "#ffffff",
      100: "#ffffff",
      200: "#ffffff",
      300: "#ffffff",
      400: "#ffffff",
      500: "#ffffff",
      600: "#e8e8e8",
      700: "#b5b5b5",
      800: "#8c8c8c",
      900: "#6b6b6b",
    },
    black: {
       50: "#e6e6e6",
      100: "#b0b0b0",
      200: "#8a8a8a",
      300: "#545454",
      400: "#333333",
      500: "#000000",
      600: "#000000",
      700: "#000000",
      800: "#000000",
      900: "#000000",
    },
  },
} as const

export type HceColors = typeof hceColors

// ── Tipografía ───────────────────────────────────────────────────────────────
// Fuente oficial HCE: Poppins (Google Fonts).
// Llama a injectHceFonts() una vez en el entry point para cargarla.

export const hceTypography = {
  fontFamily: "'Poppins', sans-serif",
  googleFontsUrl:
    "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap",
} as const

/** Inyecta el <link> de Google Fonts en el <head> si aún no existe */
export function injectHceFonts(): void {
  if (typeof document === "undefined") return
  const id = "hce-poppins-font"
  if (document.getElementById(id)) return
  const link = document.createElement("link")
  link.id   = id
  link.rel  = "stylesheet"
  link.href = hceTypography.googleFontsUrl
  document.head.appendChild(link)
}

// ── CSS custom properties ────────────────────────────────────────────────────
// Inyecta la paleta completa como variables CSS en :root.
// Uso opcional: llama a injectHceTokens() una vez en tu entry point.

export function injectHceTokens(): void {
  const style = document.documentElement.style

  const set = (name: string, value: string) => style.setProperty(name, value)

  // Primary
  Object.entries(hceColors.primary.green).forEach(([k, v]) => set(`--hce-green-${k}`, v))
  Object.entries(hceColors.primary.blue).forEach(([k, v])  => set(`--hce-blue-${k}`,  v))

  // Alert
  Object.entries(hceColors.alert.error).forEach(([k, v])   => set(`--hce-error-${k}`,   v))
  Object.entries(hceColors.alert.info).forEach(([k, v])    => set(`--hce-info-${k}`,    v))
  Object.entries(hceColors.alert.warning).forEach(([k, v]) => set(`--hce-warning-${k}`, v))
  Object.entries(hceColors.alert.success).forEach(([k, v]) => set(`--hce-success-${k}`, v))

  // Neutro
  Object.entries(hceColors.neutro.white).forEach(([k, v]) => set(`--hce-white-${k}`, v))
  Object.entries(hceColors.neutro.black).forEach(([k, v]) => set(`--hce-black-${k}`, v))
}
