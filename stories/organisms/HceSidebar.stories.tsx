import { useState }          from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { HceSidebar }         from "@hce/design-system"
import type { OpcionMAC }     from "@hce/design-system"

// ─── Datos de ejemplo ──────────────────────────────────────

/**
 * Datos de ejemplo que replican la estructura real de MAC.
 *
 * Reglas del sistema MAC:
 *   - Nivel 1 → codigo "01", "02", "03" ...
 *   - Nivel 2 → codigo "01/01", "01/02", "02/01" ...
 *   - Nivel 3 → codigo "01/01/01", "01/01/02" ...
 *
 *   - `vista = ""`   → ítem padre/agrupador, NO navega (solo expande/colapsa)
 *   - `vista = "/ruta"` → ítem hoja, navega al hacer click
 *   - `icono`        → nombre del componente en el design system (case-sensitive)
 *                       ej: "UiArrowIcon", "BloodTestIcon", "FileText"
 *   - `codigo`       → se usa para control de permisos con hasPermission()
 */
const OPCIONES_MAC: OpcionMAC[] = [
  {
    idMenu:      7777,
    codigo:      "01",
    titulo:      "Historias Clínicas",
    indicador:   "E",
    vista:       "",           // padre — no navega, solo expande
    icono:       "HceMenuIcon",
    idMenuPadre: 0,
    opciones: [
      { idMenu: 7778, codigo: "01/01", titulo: "HCE Ambulatorio",  indicador: "E", vista: "/ambulatorio",    icono: "", idMenuPadre: 7777, opciones: [] },
      { idMenu: 7779, codigo: "01/02", titulo: "HCE Emergencia",   indicador: "E", vista: "/emergencia",     icono: "", idMenuPadre: 7777, opciones: [] },
      { idMenu: 7780, codigo: "01/03", titulo: "HCE Hospitalario", indicador: "E", vista: "/hospitalario",   icono: "", idMenuPadre: 7777, opciones: [] },
      { idMenu: 7781, codigo: "01/04", titulo: "Auditoría Médica", indicador: "E", vista: "/auditoriaMedica",icono: "", idMenuPadre: 7777, opciones: [] },
    ],
  },
  {
    idMenu:      7800,
    codigo:      "02",
    titulo:      "Farmacia",
    indicador:   "E",
    vista:       "",
    icono:       "DrugsIcon",
    idMenuPadre: 0,
    opciones: [
      { idMenu: 7801, codigo: "02/01", titulo: "Medicamentos", indicador: "E", vista: "/farmacia/medicamentos", icono: "", idMenuPadre: 7800, opciones: [] },
      { idMenu: 7802, codigo: "02/02", titulo: "Inventario",   indicador: "E", vista: "/farmacia/inventario",   icono: "", idMenuPadre: 7800, opciones: [] },
    ],
  },
  {
    idMenu:      7900,
    codigo:      "03",
    titulo:      "Laboratorio",
    indicador:   "E",
    vista:       "/laboratorio",   // hoja directa — navega
    icono:       "BloodTestIcon",
    idMenuPadre: 0,
    opciones:    [],
  },
  {
    idMenu:      8000,
    codigo:      "04",
    titulo:      "Configuración",
    indicador:   "E",
    vista:       "",
    icono:       "ConfigurationIcon",
    idMenuPadre: 0,
    opciones: [
      { idMenu: 8001, codigo: "04/01", titulo: "Parámetros", indicador: "E", vista: "/config/parametros", icono: "", idMenuPadre: 8000, opciones: [] },
      { idMenu: 8002, codigo: "04/02", titulo: "Usuarios",   indicador: "E", vista: "/config/usuarios",   icono: "", idMenuPadre: 8000, opciones: [] },
    ],
  },
]

// Estructura mínima para la story SinSubmenus
const OPCIONES_POCAS: OpcionMAC[] = [
  { idMenu: 10, codigo: "01", titulo: "Dashboard",     indicador: "E", vista: "/",         icono: "LayoutDashboard", idMenuPadre: 0, opciones: [] },
  { idMenu: 11, codigo: "02", titulo: "Emergencias",   indicador: "E", vista: "/emergency",icono: "Monitor",         idMenuPadre: 0, opciones: [] },
  { idMenu: 12, codigo: "03", titulo: "Configuración", indicador: "E", vista: "/config",   icono: "Settings",        idMenuPadre: 0, opciones: [] },
]

// ─── Wrapper con estado interno ────────────────────────────

type DemoProps = {
  initialCollapsed?: boolean
  opciones?:         OpcionMAC[]
  floating?:         boolean
}

function SidebarDemo({ initialCollapsed = false, opciones = OPCIONES_MAC, floating = false }: DemoProps) {
  const [collapsed,   setCollapsed]   = useState(initialCollapsed)
  const [currentPath, setCurrentPath] = useState("/emergency")

  if (floating) {
    // Modo flotante: el padre provee padding y gap — el sidebar ocupa height:100%
    return (
      <div style={{
        display:         "flex",
        height:          "100vh",
        backgroundColor: "#f0f4f8",
        padding:         12,
        gap:             8,
        overflow:        "hidden",
      }}>
        <HceSidebar
          collapsed={collapsed}
          onToggle={() => setCollapsed(p => !p)}
          opciones={opciones}
          currentPath={currentPath}
          onNavigate={vista => { setCurrentPath(vista); console.log("Navegar a:", vista) }}
          onHome={() => { setCurrentPath("/"); console.log("Ir a Home") }}
          floating
        />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{
            background: "#003d96", borderRadius: 12, height: 64, display: "flex",
            alignItems: "center", paddingLeft: 20,
            color: "white", fontFamily: "Poppins, sans-serif", fontSize: 14, fontWeight: 600,
          }}>
            Header flotante de ejemplo
          </div>
          <div style={{ flex: 1, padding: 20, fontFamily: "Poppins, sans-serif", fontSize: 14, color: "#555" }}>
            <p>Ruta activa: <strong>{currentPath}</strong></p>
            <p style={{ color: "#999", fontSize: 12 }}>
              Sidebar flotante — esquinas redondeadas, sin tocar header ni footer.
              El padre (Layout) provee el <code>padding: 12px</code> y <code>gap: 8px</code>.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ display: "flex", height: "100vh", backgroundColor: "#f5f5f5" }}>
      <HceSidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed(p => !p)}
        opciones={opciones}
        currentPath={currentPath}
        onNavigate={vista => { setCurrentPath(vista); console.log("Navegar a:", vista) }}
        onHome={() => { setCurrentPath("/"); console.log("Ir a Home") }}
      />
      <div style={{ flex: 1, padding: 24 }}>
        <p style={{ color: "#666", fontFamily: "Poppins, sans-serif", fontSize: 14 }}>
          Ruta activa: <strong>{currentPath}</strong>
        </p>
        <p style={{ color: "#999", fontFamily: "Poppins, sans-serif", fontSize: 12 }}>
          Haz click en las opciones del sidebar para ver la navegación.
          El botón ‹ colapsa/expande.
        </p>
      </div>
    </div>
  )
}

// ─── Meta ──────────────────────────────────────────────────

const meta: Meta = {
  title:      "Organisms/HceSidebar",
  tags:       ["autodocs"],
  parameters: { layout: "fullscreen" },
  argTypes: {
    collapsed: {
      control:     "boolean",
      description: "Cuando es true muestra solo los íconos (modo compacto).",
      table:       { defaultValue: { summary: "false" } },
    },
    floating: {
      control:     "boolean",
      description: "Modo flotante: border-radius y sombra para layouts sin tocar el header.",
      table:       { defaultValue: { summary: "false" } },
    },
    currentPath: {
      control:     "text",
      description: "Ruta activa actual — se resalta la opción correspondiente.",
    },
  },
}
export default meta
type Story = StoryObj

// ─── Stories ───────────────────────────────────────────────

/** AllVariants — todas las presentaciones visuales del sidebar */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 0, height: "100vh" }}>
      <SidebarDemo initialCollapsed={false} opciones={OPCIONES_MAC} />
    </div>
  ),
}

/** States — expandido vs colapsado (estados principales de visibilidad) */
export const States: Story = {
  render: () => <SidebarDemo initialCollapsed={true} />,
}

/** Sidebar expandido con árbol completo de opciones MAC */
export const Expandido: Story = {
  render: () => <SidebarDemo initialCollapsed={false} />,
}

/** Sidebar colapsado — solo iconos con avatar abreviado */
export const Colapsado: Story = {
  render: () => <SidebarDemo initialCollapsed={true} />,
}

/** Sidebar con pocas opciones (sin submenús) */
export const SinSubmenus: Story = {
  render: () => <SidebarDemo opciones={OPCIONES_POCAS} />,
}

/** Sidebar sin opciones — solo el botón Home */
export const SinOpciones: Story = {
  render: () => <SidebarDemo opciones={[]} />,
}

/** Sidebar flotante — posición fija, esquinas redondeadas, sin tocar header/footer */
export const Flotante: Story = {
  render: () => <SidebarDemo floating={true} />,
}

/** Sidebar flotante colapsado */
export const FlotanteColapsado: Story = {
  render: () => <SidebarDemo floating={true} initialCollapsed={true} />,
}
