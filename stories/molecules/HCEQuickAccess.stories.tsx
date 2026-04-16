import type { Meta, StoryObj } from "@storybook/react"
import { HCEQuickAccess } from "@hce/design-system"

// Iconos Lucide (ya disponibles en design system)
import {
  FileText, Stethoscope, Building2, ClipboardList,
  Monitor, Pill, Heart, Syringe,
} from "@hce/design-system"

// Iconos HCE custom SVG (átomos del design system)
import {
  HceStethoscopeIcon, DoctorIcon, DrugsIcon,
  AltaMedicaIcon, BloodTestIcon, RadiographyIcon,
} from "@hce/design-system"

const meta: Meta<typeof HCEQuickAccess> = {
  title:     "Molecules/HCEQuickAccess",
  component: HCEQuickAccess,
  tags:      ["autodocs"],
  argTypes: {
    onAcceder: { action: "acceder" },
    icon:      { control: false },   // ReactNode — no se puede controlar via panel
    disabled:  { control: "boolean" },
  },
  decorators: [(Story) => (
    <div style={{ maxWidth: 220 }}>
      <Story />
    </div>
  )],
}
export default meta
type Story = StoryObj<typeof HCEQuickAccess>

// ── Con iconos Lucide ─────────────────────────────────────

export const Default: Story = {
  args: {
    icon:        <FileText size={24} />,
    title:       "HCE Emergencia",
    description: "Sección que abarca las funciones fundamentales del monitor de emergencia y los relatos de los pacientes.",
    disabled:    false,
  },
}

export const Ambulatorio: Story = {
  args: {
    icon:        <Stethoscope size={24} />,
    title:       "HCE Ambulatorio",
    description: "Gestión de citas, consultorios y atenciones ambulatorias del sistema de salud.",
  },
}

export const Hospital: Story = {
  args: {
    icon:        <Building2 size={24} />,
    title:       "HCE Hospital",
    description: "Control de hospitalización, camas disponibles, ingresos y altas médicas.",
  },
}

export const Auditoria: Story = {
  args: {
    icon:        <ClipboardList size={24} />,
    title:       "Auditoría",
    description: "Reportes, trazabilidad de eventos y configuración de parámetros del sistema.",
  },
}

// ── Con iconos HCE SVG (atoms/Icon) ──────────────────────

/** El icon acepta cualquier átomo del design system — no solo Lucide */
export const ConIconoHceStethoscope: Story = {
  name: "Con ícono HCE · Stethoscope",
  args: {
    icon:        <HceStethoscopeIcon size={24} color="#003d96" />,
    title:       "Consulta Médica",
    description: "Registro de consultas y atenciones por especialidad médica.",
  },
}

export const ConIconoHceDoctor: Story = {
  name: "Con ícono HCE · Doctor",
  args: {
    icon:        <DoctorIcon size={24} color="#003d96" />,
    title:       "Médicos",
    description: "Gestión del personal médico y sus especialidades.",
  },
}

export const ConIconoHceDrugs: Story = {
  name: "Con ícono HCE · Farmacia",
  args: {
    icon:        <DrugsIcon size={24} color="#003d96" />,
    title:       "Farmacia",
    description: "Control de medicamentos, stock e inventario de farmacia.",
  },
}

export const ConIconoHceBloodTest: Story = {
  name: "Con ícono HCE · Laboratorio",
  args: {
    icon:        <BloodTestIcon size={24} color="#003d96" />,
    title:       "Laboratorio",
    description: "Solicitud y resultados de análisis de laboratorio clínico.",
  },
}

// ── Estado deshabilitado ──────────────────────────────────

/** Sin acceso — el indicador MAC es 'O' o no existe */
export const SinPermiso: Story = {
  args: {
    icon:        <Monitor size={24} />,
    title:       "HCE Monitor UCI",
    description: "Módulo al que no tienes acceso en tu perfil actual.",
    disabled:    true,
  },
}

// ── Grid completo ─────────────────────────────────────────

/** Vista del grid tal como aparece en la página Home */
export const GridCompleto: Story = {
  decorators: [(Story) => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 220px)", gap: 16, alignItems: "stretch" }}>
      {[
        { icon: <FileText size={24} />,         title: "HCE Emergencia",   description: "Monitor de emergencia y relatos de pacientes." },
        { icon: <Stethoscope size={24} />,      title: "HCE Ambulatorio",  description: "Citas y consultorios ambulatorios." },
        { icon: <Building2 size={24} />,        title: "HCE Hospital",     description: "Hospitalización y altas médicas." },
        { icon: <ClipboardList size={24} />,    title: "Auditoría",         description: "Reportes y configuración del sistema." },
        { icon: <BloodTestIcon size={24} color="#003d96" />, title: "Laboratorio", description: "Análisis y resultados de laboratorio clínico." },
        { icon: <DrugsIcon size={24} color="#003d96" />,     title: "Farmacia",    description: "Medicamentos e inventario de farmacia.", disabled: true },
        { icon: <RadiographyIcon size={24} color="#003d96" />, title: "Radiología", description: "Solicitud e interpretación de imágenes.", disabled: true },
        { icon: <AltaMedicaIcon size={24} color="#003d96" />,  title: "Alta Médica", description: "Proceso de alta y epicrisis del paciente.", disabled: true },
      ].map((card, i) => (
        <HCEQuickAccess
          key={i}
          icon={card.icon}
          title={card.title}
          description={card.description}
          disabled={card.disabled}
          onAcceder={() => console.log("Acceder:", card.title)}
        />
      ))}
    </div>
  )],
  render: () => <></>,
}
