/**
 * hce.tokens.ts
 * Fuente única de verdad de los design tokens HCE.
 * Incluye la paleta exportada desde Figma (colors.json) más los
 * tokens semánticos de UI, tipografía, espaciado, bordes, sombras
 * y z-index usados por la plataforma base y por el módulo clínico
 * de Emergencia.
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
  extras:{
    lilac:{
      50: "#C8A2C8",
      100: "#C8A2C8",
      200: "#C8A2C8",
      300: "#C8A2C8",
      400: "#C8A2C8",
      500: "#C8A2C8",
      600: "#C8A2C8",
      700: "#C8A2C8",
      800: "#C8A2C8",
      900: "#C8A2C8",
    }
  }

} as const

export type HceColors = typeof hceColors

// ── Tipografía ───────────────────────────────────────────────────────────────
// Fuente oficial HCE: Poppins (Google Fonts).
// Llama a injectHceFonts() una vez en el entry point para cargarla.

export const hceTypography = {
  fontFamily: "'Poppins', sans-serif",
  // Tipografía del módulo clínico de Emergencia (distinta de la plataforma base)
  fontFamilyClinical:     '"IBM Plex Sans", "Roboto", system-ui, sans-serif',
  fontFamilyClinicalMono: '"IBM Plex Mono", "Roboto Mono", "Courier New", monospace',

  fontSize: 14,

  size: {
    // Escala general (plataforma base)
    xs:   '12px',
    sm:   '13px',
    base: '14px',
    md:   '16px',
    lg:   '20px',
    xl:   '24px',
    h1:   '2rem',
    h4:   '1.25rem',
    // Escala del módulo de Emergencia
    headerTitle:  '20px',
    headerMeta:   '13px',
    tableHeader:  '12px',
    tableCell:    '13px',
    badge:        '11px',
  },

  weight: {
    regular:    400,
    medium:     500,
    semibold:   600,
    bold:       700,
    extrabold:  800,
  },

  letterSpacing: {
    tight:  '-0.02em',
    normal: '0',
    wide:   '0.05em',
  },

  // Estilos predefinidos por rol semántico (módulo de Emergencia)
  styles: {
    headerTitle:   { fontSize: '20px', fontWeight: 700, color: '#FFFFFF' },
    headerMeta:    { fontSize: '13px', fontWeight: 500, textTransform: 'uppercase' as const, letterSpacing: '0.3px' },
    tableHeader:   { fontSize: '12px', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.5px' },
    tableCell:     { fontSize: '13px', fontWeight: 400 },
    tableCellName: { fontSize: '13px', fontWeight: 600 },
    badgePriority: { fontSize: '11px', fontWeight: 800 },
    badgeBox:      { fontSize: '11px', fontWeight: 700 },
  },

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

// ── Transiciones ─────────────────────────────────────────────────────────────
// Curva Material Design estándar (ease-in-out) para animaciones de UI.
// Usar hceTransition.fast para micro-interacciones, base para layout.

export const hceTransition = {
  fast:  "150ms cubic-bezier(0.4, 0, 0.2, 1)",
  base:  "220ms cubic-bezier(0.4, 0, 0.2, 1)",
  slow:  "350ms cubic-bezier(0.4, 0, 0.2, 1)",
  width: "width 220ms cubic-bezier(0.4, 0, 0.2, 1), min-width 220ms cubic-bezier(0.4, 0, 0.2, 1)",
} as const

// ── Sombras ──────────────────────────────────────────────────────────────────
// Basadas en el color de marca azul oscuro (--hce-blue-900 ≈ #001c45)
// para mayor coherencia visual que sombras negras puras.
// xs/sm/md/lg: escala genérica de plataforma. table/header/tab: módulo de Emergencia.

export const hceShadows = {
  card:    "0 2px 8px rgba(0,29,69,0.08)",
  sidebar: "2px 0 8px rgba(0,29,69,0.10)",
  float:   "0 4px 32px rgba(0,29,69,0.18)",
  modal:   "0 8px 32px rgba(0,29,69,0.16)",
  xs:      "0 1px 2px rgba(0,0,0,0.05)",
  sm:      "0 1px 4px rgba(0,0,0,0.08)",
  md:      "0px 2px 12px rgba(0,0,0,0.05)",
  lg:      "0 4px 20px rgba(0,0,0,0.1)",
  table:   "0 2px 12px rgba(26, 58, 107, 0.08)",
  header:  "0 2px 8px rgba(26, 58, 107, 0.15)",
  tab:     "-2px 0 8px rgba(26, 58, 107, 0.20)",
} as const

// ── Espaciado (grid base 4px) ─────────────────────────────────────────────────

export const hceSpacing = {
  base: 4,
  1:  '4px',
  2:  '8px',
  3:  '12px',
  4:  '16px',
  5:  '20px',
  6:  '24px',
  8:  '32px',
  10: '40px',
  12: '48px',
} as const

// ── Border Radius ─────────────────────────────────────────────────────────────

export const hceBorderRadius = {
  none:   '0px',
  sm:     '4px',
  md:     '6px',
  lg:     '8px',
  xl:     '12px',
  pill:   '50px',
  circle: '50%',
} as const

// ── Z-Index ───────────────────────────────────────────────────────────────────

export const hceZIndex = {
  base:         0,
  raised:       10,
  dropdown:     100,
  sidebar:      200,
  modal:        400,
  overlay:      1050,
  drawer:       1100,
  stickyHeader: 100,
  sideTab:      200,
  tooltip:      300,
} as const

// ── UI Semánticos ─────────────────────────────────────────────────────────────
// Valores de texto y superficie que complementan la paleta Figma.
// Usados en theme.ts y componentes que necesitan colores semánticos estables.

export const hceUi = {
  textPrimary:      "#374151",
  textSecondary:    "#545454",
  textSubtle:       "#8c8c8c",
  surface:          "#ffffff",
  background:       "#f5f7fa",
  textPrimaryTable: "#003D96",
} as const

// ── Colores clínicos (módulo Monitor de Emergencia) ──────────────────────────
// Paleta semántica propia del módulo clínico — distinta de hceUi porque
// representa un contexto visual propio (header azul, prioridades, estados
// de box/sala) que no aplica al resto de la plataforma.

export const hceClinicalColors = {
  // Base
  headerBg:        '#1A3A6B', // Azul marino institucional — header principal
  surfaceBg:       '#FFFFFF', // Fondo de superficies / tabla
  tableHeaderBg:   '#2B5BA8', // Azul medio — encabezado de tabla
  rowAlternate:    '#e6ecf6', // Fila alterna de tabla
  border:          '#D0DBF0', // Bordes y divisores
  hoverBg:         '#EEF2F9', // Fondo hover de fila / botón
  rowPriority1Bg:  '#FFF5F5', // Fondo sutil para filas críticas
  rowPriority:     hceColors.alert.error[100],

  // Textos
  textPrimary:     '#1C2B4A',
  textSecondary:   '#5A6A85',
  textOnHeader:    '#FFFFFF', // Texto sobre fondos azules (headerBg / tableHeaderBg)

  // Sistema de prioridades
  priority1:       '#A3231B', // Crítico
  priority2:       '#E39922', // Urgente
  priority3:       '#73A876', // Moderado
  priority4:       '#2A722E', // Leve
  priorityNone:    'transparent', // Sin prioridad

  // Estados de Box / Sala
  boxActive:       '#27AE60', // Sala activa
  boxUrgent:       '#A3231B', // Urgente/crítico
  boxWaiting:      '#8A9BB0', // En espera / sin asignar
  boxTP:           '#5A6A85', // Tópico (TP)

  // Iconos de estado clínico
  iconAlert:       '#E39922', // Pendiente / alerta
  iconAlertBg:     '#FFF3E0',
  iconOk:          '#2A722E', // Completado / normal
  iconOkBg:        '#E8F5E9',
  iconUrgent:      '#A3231B', // Urgente
  iconUrgentBg:    '#FFEBEE',
  iconInactive:    '#B0BEC5', // Inactivo — opacidad 40%
  iconEvaScale:    '#4D4D4F', // Trazo de las caras de la escala de dolor EVA

  // Botón Info
  btnInfoBg:       '#89C93D', // Color base

  // Estados de cama (BedAvailabilityDrawerV2) — housekeeping/mantenimiento no
  // tenían tokens propios y se agregan de primera clase para evitar que se
  // vuelvan a hardcodear hex sueltos en otro componente clínico a futuro.
  bedHousekeeping: '#EC407A', // Rosa — Housekeeping
  bedMaintenance:  '#9575CD', // Lila — Mantenimiento
} as const

// ── Multiempresa (multi-tenant) — paleta de marca por empresa ───────────────
// Convención: todas las empresas/tenants viven en un único archivo de
// PALETA DE MARCA, src/tokens/companies.tokens.ts (defaultCompanyColors,
// sannaCompanyColors, companyThemes) — NUNCA se fragmentan aquí los tokens
// ESTRUCTURALES/compartidos (hceColors, hceTypography, hceSpacing,
// hceBorderRadius, hceShadows, hceZIndex, hceTransition, hceUi). Ese fue
// exactamente el error del incidente que unificó todo en este archivo (ver
// memoria `ds_token_unification_break`): fragmentar tokens compartidos rompió
// mf-shell/mf-emergency. La diferencia aquí es que SOLO la paleta de colores
// de marca (la parte que varía por empresa) vive fuera de este archivo —
// todo lo demás sigue siendo una única fuente de verdad en hce.tokens.ts.
//
// `HceCompanyColors` es la forma compartida que debe tener la paleta de
// cualquier empresa — se define acá (tipo, estructural) para que
// companies.tokens.ts la implemente igual para cada empresa, y para que
// componentes como atoms/Button/Button.tsx (prop `tenantTheme`) puedan
// aceptar la paleta de cualquier empresa sin acoplarse a una en particular.
// Los valores *Dark existen porque son los que cumplen WCAG AA 4.5:1 con
// texto blanco encima (ver companies.tokens.ts) — los tonos
// `primary`/`secondary` "brand" claros son para acentos/bordes/íconos,
// nunca como superficie sólida con texto blanco encima.
export interface HceCompanyColors {
  // Marca
  primary:        string
  primaryDark:    string
  primaryLight:   string
  secondary:      string
  secondaryDark:  string
  secondaryLight: string

  // Superficies
  headerBg:        string
  tableHeaderBg:   string
  rowAlternate:    string
  hoverBg:         string
  rowPriority:     string
  surfaceBg:      string
  background:     string
  border:         string

  // Textos
  textPrimary:    string
  textSecondary:  string
  textOnPrimary:  string

  // Interactivo — acento de campos de formulario (borde/label/estado activo:
  // TextInput, NumericField, MultiSelect, SelectField, etc.). Separado de
  // `primary` (acento de Button/marca) porque históricamente era un tono de
  // azul distinto (`blue[600]`, no `blue[500]`) — no porque sea conceptualmente
  // un color de marca diferente. Mantener los dos campos separados permite que
  // varíen de forma independiente si el `blue[600]` de una futura empresa
  // difiere genuinamente de su `primary`, sin forzarlos a ser el mismo valor
  // como hacen hoy csf/sanna.
  interactive:    string
  interactiveButton: string
  /** Fondo del ícono del modal que anuncia una nueva versión. */
  updateBannerIconBg: string
}

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

  // UI semántica
  set('--color-surface', hceUi.surface)
}
