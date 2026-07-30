import type { Meta, StoryObj } from "@storybook/react"
import type { ComponentProps } from "react"
import {
  Button,
  SortArrowsIcon, ConfigurationIcon, CheckedCircleIcon,
  DownloadIcon, CloseIcon, AddCircleIcon,
  hceColors,
  defaultCompanyColors,
  novaSaludColors,
} from "@hce/design-system"

const meta: Meta<typeof Button> = {
  title:     "Atoms/Button",
  component: Button,
  tags:      ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "outlined", "ghost", "danger"],
      description:
        "Forma visual del botón. 'primary' = relleno sólido · 'outlined' = borde + texto · 'ghost' = solo texto · 'danger' = rojo",
    },
    color: {
      control: "color",
      description:
        "Color CSS arbitrario (hex, rgb, hceColors…). Sobreescribe el color por defecto del variant.",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    onClick:  { action: "click" },
  },
}
export default meta
type Story = StoryObj<typeof Button>

// ── Variants ──────────────────────────────────────────────

export const Primary: Story = {
  args: { label: "Guardar", variant: "primary" },
}

export const Secondary: Story = {
  args: { label: "Secundario", variant: "secondary" },
}

export const Outlined: Story = {
  args: { label: "Cancelar", variant: "outlined" },
}

export const Ghost: Story = {
  args: { label: "Ver más", variant: "ghost" },
}

export const Danger: Story = {
  args: { label: "Eliminar", variant: "danger" },
}

export const Disabled: Story = {
  args: { label: "No disponible", variant: "primary", disabled: true },
}

// ── Color custom ──────────────────────────────────────────

/** Color hex pasado directamente — outlined con azul HCE */
export const OutlinedColorCustom: Story = {
  name:  "Outlined · color custom",
  args: {
    label:   "Reordenar",
    variant: "outlined",
    color:   hceColors.primary.blue[600],
  },
}

/** Contained con color verde HCE */
export const ContainedColorCustom: Story = {
  name: "Primary · color verde HCE",
  args: {
    label:   "Confirmar",
    variant: "primary",
    color:   hceColors.primary.green[600],
  },
}

/** Ghost con color azul custom */
export const GhostColorCustom: Story = {
  name: "Ghost · color custom",
  args: {
    label:   "Ver detalle",
    variant: "ghost",
    color:   hceColors.primary.blue[500],
  },
}

// ── Con iconos del design system ──────────────────────────

/** endIcon con ícono del design system */
export const ConEndIcon: Story = {
  name: "Outlined · endIcon",
  args: {
    label:   "Reordenar",
    variant: "outlined",
    color:   hceColors.primary.blue[600],
    endIcon: <SortArrowsIcon size={14} />,
  },
}

export const ConEndIconPersonalizar: Story = {
  name: "Outlined · endIcon Personalizar",
  args: {
    label:   "Personalizar",
    variant: "outlined",
    color:   hceColors.primary.blue[600],
    endIcon: <ConfigurationIcon size={14} />,
  },
}

/** startIcon con ícono del design system */
export const ConStartIcon: Story = {
  name: "Primary · startIcon",
  args: {
    label:      "Aceptar",
    variant:    "primary",
    color:      hceColors.primary.blue[600],
    startIcon:  <CheckedCircleIcon size={16} color="white" />,
  },
}

export const ConStartIconDescargar: Story = {
  name: "Outlined · startIcon Descargar",
  args: {
    label:      "Descargar",
    variant:    "outlined",
    startIcon:  <DownloadIcon size={15} />,
  },
}

// ── Tamaños ───────────────────────────────────────────────

export const Sizes: Story = {
  decorators: [(Story) => (
    <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
      <Button size="sm" variant="primary" label="Pequeño (sm)" />
      <Button size="md" variant="primary" label="Mediano (md)" />
      <Button size="lg" variant="primary" label="Grande (lg)" />
    </div>
  )],
  render: () => <></>,
}

// ── FullWidth ─────────────────────────────────────────────

export const FullWidth: Story = {
  args: { label: "Iniciar Sesión", variant: "primary", fullWidth: true },
  decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
}

// ── AllVariants ───────────────────────────────────────────

/** Todas las variantes × colores del sistema en una sola vista */
export const AllVariants: Story = {
  decorators: [(Story) => (
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
      <Button variant="primary"   label="Primary" />
      <Button variant="secondary" label="Secondary" />
      <Button variant="outlined"  label="Outlined" />
      <Button variant="ghost"     label="Ghost" />
      <Button variant="danger"    label="Danger" />
    </div>
  )],
  render: () => <></>,
}

// ── States ────────────────────────────────────────────────

/** Estados del botón primary: normal, disabled */
export const States: Story = {
  decorators: [(Story) => (
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
      <Button variant="primary"  label="Normal" />
      <Button variant="primary"  label="Disabled" disabled />
      <Button variant="outlined" label="Normal outlined" />
      <Button variant="outlined" label="Disabled outlined" disabled />
      <Button variant="danger"   label="Danger" />
      <Button variant="danger"   label="Danger disabled" disabled />
    </div>
  )],
  render: () => <></>,
}

// ── Playground multiempresa (tokens por prop, no theme MUI) ──────
// Prueba visual de la prop `tenantTheme`: permite pintar SOLO este botón
// con la paleta de un tenant/empresa distinta, pasando directo el objeto
// de tokens de src/tokens/<empresa>.tokens.ts (default.tokens.ts /
// novasalud.tokens.ts) — no un Theme de MUI ni un ThemeProvider anidado.
// El resto del árbol (y el resto de botones de la página) no se ve afectado.

const TENANT_TOKENS_MAP = {
  // "Sin tenant" → no se pasa `tenantTheme`, el botón usa su color por
  // defecto (variant/color de siempre).
  none:      undefined,
  // Empresa por defecto/fallback (Clínica San Felipe) — pasada explícita
  // vía `tenantTheme` para probar el switcheo real entre archivos de
  // empresa, no solo "con/sin tenant".
  default:   defaultCompanyColors,
  novaSalud: novaSaludColors,
} as const

type TenantTokensKey = keyof typeof TENANT_TOKENS_MAP

interface PlaygroundArgs extends ComponentProps<typeof Button> {
  /** Selector de tenant — no es una prop real de Button, se resuelve en `render` */
  companyTheme: TenantTokensKey
}

export const Playground: StoryObj<PlaygroundArgs> = {
  argTypes: {
    companyTheme: {
      control: "select",
      options: Object.keys(TENANT_TOKENS_MAP),
      description:
        "Tenant/empresa aplicado SOLO a este botón vía la prop `tenantTheme` " +
        "(objeto de tokens planos, no un Theme de MUI). 'none' deja el botón " +
        "con su color por defecto según `variant`/`color`.",
    },
  },
  args: {
    label:        "Botón multiempresa",
    variant:      "primary",
    companyTheme: "novaSalud",
  },
  render: ({ companyTheme, ...args }) => (
    <Button {...args} tenantTheme={TENANT_TOKENS_MAP[companyTheme]} />
  ),
}

// ── Galería completa ──────────────────────────────────────

/** Vista de todas las variantes juntas para comparar */
export const Galeria: Story = {
  decorators: [(Story) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Sin color custom */}
      <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <Button variant="primary"   label="Primary" />
        <Button variant="secondary" label="Secondary" />
        <Button variant="outlined"  label="Outlined" />
        <Button variant="ghost"     label="Ghost" />
        <Button variant="danger"    label="Danger" />
        <Button variant="primary"   label="Disabled" disabled />
      </div>
      {/* Con color HCE */}
      <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <Button variant="primary"  color={hceColors.primary.blue[600]}  label="Blue 600" />
        <Button variant="primary"  color={hceColors.primary.green[600]} label="Green 600" />
        <Button variant="outlined" color={hceColors.primary.blue[600]}  label="Outlined Blue" />
        <Button variant="ghost"    color={hceColors.primary.blue[500]}  label="Ghost Blue" />
      </div>
      {/* Con iconos */}
      <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <Button variant="outlined" color={hceColors.primary.blue[600]} endIcon={<SortArrowsIcon size={13} />} label="Reordenar" />
        <Button variant="outlined" color={hceColors.primary.blue[600]} endIcon={<ConfigurationIcon size={13} />} label="Personalizar" />
        <Button variant="primary"  color={hceColors.primary.blue[600]} startIcon={<CheckedCircleIcon size={15} color="white" />} label="Aceptar" />
        <Button variant="danger"   startIcon={<CloseIcon size={15} color="white" />} label="Eliminar" />
        <Button variant="primary"  color={hceColors.primary.green[600]} startIcon={<AddCircleIcon size={15} color="white" />} label="Agregar" />
      </div>
    </div>
  )],
  render: () => <></>,
}
