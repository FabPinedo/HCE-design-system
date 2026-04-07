import type { Meta, StoryObj } from "@storybook/react"
import React, { useState } from "react"
import {
  // Lucide
  Monitor, Users, BarChart, Settings, LayoutDashboard, ClipboardList,
  BedDouble, Scissors, CalendarDays, Stethoscope, FileText, Building2,
  Syringe, Heart, Pill, Plus, Activity, Bandage, Asterisk, FlaskConical,
  Thermometer, User, Lock,
  // HCE – Icon1 (Médicos)
  BloodTestIcon, DoctorIcon, DrugsIcon, MedicalRoomIcon,
  PrescriptionIcon, RadiographyIcon, HceStethoscopeIcon,
  XRaysIcon, AltaMedicaIcon,
  // HCE – Icon2 (UI)
  AddFriendIcon, AddDocumentIcon, AddCircleIcon, SortArrowsIcon,
  BinIcon, HceCalendarIcon, CheckedCircleIcon, ConfigurationIcon,
  ConversationIcon, DangerIcon, DeleteCircleIcon, DisketteIcon,
  DocumentUploadIcon, DocumentIcon, DownloadIcon, EditingIcon,
  ExchangeIcon, HceEyeIcon, ForgotPasswordIcon, GoogleDocsIcon,
  HceHistoryIcon, ChevronDownIcon, HceInfoIcon, LoupeIcon,
  OnButtonIcon, PapersIcon, PasteIcon, SolCurrencyIcon,
  PrintingIcon, SendMailUpIcon, SendMailIcon, SendIcon,
  UndoCircleIcon, ClockIcon, WarningIcon, FilterIcon,
  HceMonitorIcon, CloseIcon,
  // UIKit
  UiArrowIcon, UiDoctorIcon, UiAddDocsIcon, UiAddFriendIcon,
  UiAddIcon, UiArrowsIcon, UiBloodTestIcon, UiCalendarIcon,
  UiCheckedIcon, UiCloseIcon, UiConfigurationIcon, UiConversationIcon,
  UiDangerIcon, UiDeleteIcon, UiDisketteIcon, UiDocsIcon,
  UiDownloadArrowIcon, UiDrugsIcon, UiEditingIcon, UiExchangeIcon,
  UiEyeIcon, UiFilterIcon, UiHistoryIcon, UiInfoIcon,
  UiIsotipoClinicaIcon, UiMedicalDischargeIcon, UiMedicalRoomIcon,
  UiMonitorIcon, UiOnButtonIcon, UiPadlockIcon, UiPapersIcon,
  UiPasteIcon, UiPrescriptionIcon, UiPrintingIcon, UiRadiographyIcon,
  UiSearchIcon, UiSendMailIcon, UiSendIcon, UiSolSymbolIcon,
  UiStethoscopeIcon, UiTrashIcon, UiUndoIcon, UiUploadDocumentIcon,
  UiVectorIcon, UiWarningIcon, UiXRaysIcon,
} from "@hce/design-system"
import type { HceIconProps } from "@hce/design-system"
import type { LucideIcon } from "@hce/design-system"

// ─── Lucide icons ─────────────────────────────────────────────────────────────
const LUCIDE_ICONS: { name: string; icon: LucideIcon }[] = [
  { name: "Monitor",         icon: Monitor },
  { name: "Users",           icon: Users },
  { name: "BarChart",        icon: BarChart },
  { name: "Settings",        icon: Settings },
  { name: "LayoutDashboard", icon: LayoutDashboard },
  { name: "ClipboardList",   icon: ClipboardList },
  { name: "BedDouble",       icon: BedDouble },
  { name: "Scissors",        icon: Scissors },
  { name: "CalendarDays",    icon: CalendarDays },
  { name: "Stethoscope",     icon: Stethoscope },
  { name: "FileText",        icon: FileText },
  { name: "Building2",       icon: Building2 },
  { name: "Syringe",         icon: Syringe },
  { name: "Heart",           icon: Heart },
  { name: "Pill",            icon: Pill },
  { name: "Plus",            icon: Plus },
  { name: "Activity",        icon: Activity },
  { name: "Bandage",         icon: Bandage },
  { name: "Asterisk",        icon: Asterisk },
  { name: "FlaskConical",    icon: FlaskConical },
  { name: "Thermometer",     icon: Thermometer },
  { name: "User",            icon: User },
  { name: "Lock",            icon: Lock },
]

// ─── HCE Custom icons ─────────────────────────────────────────────────────────
type HceFn = (props: HceIconProps) => React.ReactElement

const HCE_MEDICAL: { name: string; icon: HceFn }[] = [
  { name: "DoctorIcon",         icon: DoctorIcon },
  { name: "BloodTestIcon",      icon: BloodTestIcon },
  { name: "DrugsIcon",          icon: DrugsIcon },
  { name: "MedicalRoomIcon",    icon: MedicalRoomIcon },
  { name: "PrescriptionIcon",   icon: PrescriptionIcon },
  { name: "RadiographyIcon",    icon: RadiographyIcon },
  { name: "HceStethoscopeIcon", icon: HceStethoscopeIcon },
  { name: "XRaysIcon",          icon: XRaysIcon },
  { name: "AltaMedicaIcon",     icon: AltaMedicaIcon },
]

const HCE_UI: { name: string; icon: HceFn }[] = [
  { name: "AddFriendIcon",      icon: AddFriendIcon },
  { name: "AddDocumentIcon",    icon: AddDocumentIcon },
  { name: "AddCircleIcon",      icon: AddCircleIcon },
  { name: "SortArrowsIcon",     icon: SortArrowsIcon },
  { name: "BinIcon",            icon: BinIcon },
  { name: "HceCalendarIcon",    icon: HceCalendarIcon },
  { name: "CheckedCircleIcon",  icon: CheckedCircleIcon },
  { name: "ConfigurationIcon",  icon: ConfigurationIcon },
  { name: "ConversationIcon",   icon: ConversationIcon },
  { name: "DangerIcon",         icon: DangerIcon },
  { name: "DeleteCircleIcon",   icon: DeleteCircleIcon },
  { name: "DisketteIcon",       icon: DisketteIcon },
  { name: "DocumentUploadIcon", icon: DocumentUploadIcon },
  { name: "DocumentIcon",       icon: DocumentIcon },
  { name: "DownloadIcon",       icon: DownloadIcon },
  { name: "EditingIcon",        icon: EditingIcon },
  { name: "ExchangeIcon",       icon: ExchangeIcon },
  { name: "HceEyeIcon",         icon: HceEyeIcon },
  { name: "ForgotPasswordIcon", icon: ForgotPasswordIcon },
  { name: "GoogleDocsIcon",     icon: GoogleDocsIcon },
  { name: "HceHistoryIcon",     icon: HceHistoryIcon },
  { name: "ChevronDownIcon",    icon: ChevronDownIcon },
  { name: "HceInfoIcon",        icon: HceInfoIcon },
  { name: "LoupeIcon",          icon: LoupeIcon },
  { name: "OnButtonIcon",       icon: OnButtonIcon },
  { name: "PapersIcon",         icon: PapersIcon },
  { name: "PasteIcon",          icon: PasteIcon },
  { name: "SolCurrencyIcon",    icon: SolCurrencyIcon },
  { name: "PrintingIcon",       icon: PrintingIcon },
  { name: "SendMailUpIcon",     icon: SendMailUpIcon },
  { name: "SendMailIcon",       icon: SendMailIcon },
  { name: "SendIcon",           icon: SendIcon },
  { name: "UndoCircleIcon",     icon: UndoCircleIcon },
  { name: "ClockIcon",          icon: ClockIcon },
  { name: "WarningIcon",        icon: WarningIcon },
  { name: "FilterIcon",         icon: FilterIcon },
  { name: "HceMonitorIcon",     icon: HceMonitorIcon },
  { name: "CloseIcon",          icon: CloseIcon },
]

const HCE_UIKIT: { name: string; icon: HceFn }[] = [
  { name: "UiArrowIcon",           icon: UiArrowIcon },
  { name: "UiDoctorIcon",          icon: UiDoctorIcon },
  { name: "UiAddDocsIcon",         icon: UiAddDocsIcon },
  { name: "UiAddFriendIcon",       icon: UiAddFriendIcon },
  { name: "UiAddIcon",             icon: UiAddIcon },
  { name: "UiArrowsIcon",          icon: UiArrowsIcon },
  { name: "UiBloodTestIcon",       icon: UiBloodTestIcon },
  { name: "UiCalendarIcon",        icon: UiCalendarIcon },
  { name: "UiCheckedIcon",         icon: UiCheckedIcon },
  { name: "UiCloseIcon",           icon: UiCloseIcon },
  { name: "UiConfigurationIcon",   icon: UiConfigurationIcon },
  { name: "UiConversationIcon",    icon: UiConversationIcon },
  { name: "UiDangerIcon",          icon: UiDangerIcon },
  { name: "UiDeleteIcon",          icon: UiDeleteIcon },
  { name: "UiDisketteIcon",        icon: UiDisketteIcon },
  { name: "UiDocsIcon",            icon: UiDocsIcon },
  { name: "UiDownloadArrowIcon",   icon: UiDownloadArrowIcon },
  { name: "UiDrugsIcon",           icon: UiDrugsIcon },
  { name: "UiEditingIcon",         icon: UiEditingIcon },
  { name: "UiExchangeIcon",        icon: UiExchangeIcon },
  { name: "UiEyeIcon",             icon: UiEyeIcon },
  { name: "UiFilterIcon",          icon: UiFilterIcon },
  { name: "UiHistoryIcon",         icon: UiHistoryIcon },
  { name: "UiInfoIcon",            icon: UiInfoIcon },
  { name: "UiIsotipoClinicaIcon",  icon: UiIsotipoClinicaIcon },
  { name: "UiMedicalDischargeIcon",icon: UiMedicalDischargeIcon },
  { name: "UiMedicalRoomIcon",     icon: UiMedicalRoomIcon },
  { name: "UiMonitorIcon",         icon: UiMonitorIcon },
  { name: "UiOnButtonIcon",        icon: UiOnButtonIcon },
  { name: "UiPadlockIcon",         icon: UiPadlockIcon },
  { name: "UiPapersIcon",          icon: UiPapersIcon },
  { name: "UiPasteIcon",           icon: UiPasteIcon },
  { name: "UiPrescriptionIcon",    icon: UiPrescriptionIcon },
  { name: "UiPrintingIcon",        icon: UiPrintingIcon },
  { name: "UiRadiographyIcon",     icon: UiRadiographyIcon },
  { name: "UiSearchIcon",          icon: UiSearchIcon },
  { name: "UiSendMailIcon",        icon: UiSendMailIcon },
  { name: "UiSendIcon",            icon: UiSendIcon },
  { name: "UiSolSymbolIcon",       icon: UiSolSymbolIcon },
  { name: "UiStethoscopeIcon",     icon: UiStethoscopeIcon },
  { name: "UiTrashIcon",           icon: UiTrashIcon },
  { name: "UiUndoIcon",            icon: UiUndoIcon },
  { name: "UiUploadDocumentIcon",  icon: UiUploadDocumentIcon },
  { name: "UiVectorIcon",          icon: UiVectorIcon },
  { name: "UiWarningIcon",         icon: UiWarningIcon },
  { name: "UiXRaysIcon",           icon: UiXRaysIcon },
]

// ─── Estilos compartidos ──────────────────────────────────────────────────────
const SECTION: React.CSSProperties = {
  marginBottom: 40,
}
const SECTION_TITLE: React.CSSProperties = {
  fontFamily:    "sans-serif",
  fontSize:      13,
  fontWeight:    700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color:         "#6B7280",
  marginBottom:  16,
  paddingBottom:  8,
  borderBottom:  "1px solid #E5E7EB",
}
const GRID: React.CSSProperties = {
  display:       "flex",
  flexWrap:      "wrap",
  gap:           16,
}
const CARD: React.CSSProperties = {
  display:        "flex",
  flexDirection:  "column",
  alignItems:     "center",
  justifyContent: "center",
  gap:            8,
  width:          96,
  padding:        "12px 4px",
  borderRadius:   8,
  border:         "1px solid #E5E7EB",
  background:     "#F9FAFB",
  cursor:         "pointer",
  transition:     "border-color 0.15s, background 0.15s",
}
const LABEL: React.CSSProperties = {
  fontFamily:  "monospace",
  fontSize:    9,
  color:       "#374151",
  textAlign:   "center",
  wordBreak:   "break-all",
  lineHeight:  1.4,
}

// ─── Componente IconCard ──────────────────────────────────────────────────────
function IconCard({
  name,
  children,
  color,
}: {
  name:     string
  children: React.ReactNode
  color:    string
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      style={{
        ...CARD,
        borderColor: hovered ? "#1E4FA3" : "#E5E7EB",
        background:  hovered ? "#EEF2F9" : "#F9FAFB",
      }}
      title={name}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ color }}>{children}</div>
      <span style={LABEL}>{name.replace(/^Ui/, "Ui·").replace("Icon", "")}</span>
    </div>
  )
}

// ─── Gallery completa ─────────────────────────────────────────────────────────
function IconGallery({ iconColor }: { iconColor: string }) {
  return (
    <div style={{ padding: 24, fontFamily: "sans-serif" }}>

      {/* Lucide */}
      <div style={SECTION}>
        <div style={SECTION_TITLE}>Lucide (stroke) — {LUCIDE_ICONS.length} íconos</div>
        <div style={GRID}>
          {LUCIDE_ICONS.map(({ name, icon: Icon }) => (
            <IconCard key={name} name={name} color={iconColor}>
              <Icon size={28} color={iconColor} strokeWidth={1.5} />
            </IconCard>
          ))}
        </div>
      </div>

      {/* HCE Medical */}
      <div style={SECTION}>
        <div style={SECTION_TITLE}>HCE Icon1 — Médicos (fill) — {HCE_MEDICAL.length} íconos</div>
        <div style={GRID}>
          {HCE_MEDICAL.map(({ name, icon: Icon }) => (
            <IconCard key={name} name={name} color={iconColor}>
              <Icon size={28} color={iconColor} />
            </IconCard>
          ))}
        </div>
      </div>

      {/* HCE UI */}
      <div style={SECTION}>
        <div style={SECTION_TITLE}>HCE Icon2 — UI (fill) — {HCE_UI.length} íconos</div>
        <div style={GRID}>
          {HCE_UI.map(({ name, icon: Icon }) => (
            <IconCard key={name} name={name} color={iconColor}>
              <Icon size={28} color={iconColor} />
            </IconCard>
          ))}
        </div>
      </div>

      {/* UIKit */}
      <div style={SECTION}>
        <div style={SECTION_TITLE}>UIKit (fill) — {HCE_UIKIT.length} íconos</div>
        <div style={GRID}>
          {HCE_UIKIT.map(({ name, icon: Icon }) => (
            <IconCard key={name} name={name} color={iconColor}>
              <Icon size={28} color={iconColor} />
            </IconCard>
          ))}
        </div>
      </div>

    </div>
  )
}

// ─── Meta ─────────────────────────────────────────────────────────────────────
const meta: Meta = {
  title:      "Atoms/Icons",
  tags:       ["autodocs"],
  parameters: { layout: "fullscreen" },
  argTypes: {
    iconColor: { control: "color", name: "Color" },
  },
}
export default meta

// ─── Stories ──────────────────────────────────────────────────────────────────
export const Galeria: StoryObj<{ iconColor: string }> = {
  name: "Galería completa",
  args: { iconColor: "#1E4FA3" },
  render: ({ iconColor }) => <IconGallery iconColor={iconColor} />,
}

export const SobreAzul: StoryObj = {
  name: "Sobre fondo azul (como login)",
  render: () => (
    <div style={{ background: "#1E4FA3", padding: 24, minHeight: "100vh" }}>
      <div style={{ ...SECTION_TITLE, color: "#B8CCE8" }}>HCE Médicos</div>
      <div style={{ ...GRID, marginBottom: 32 }}>
        {HCE_MEDICAL.map(({ name, icon: Icon }) => (
          <div key={name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <Icon size={32} color="#B8CCE8" />
            <span style={{ ...LABEL, color: "#B8CCE8", fontSize: 8 }}>{name.replace("Icon", "")}</span>
          </div>
        ))}
      </div>
      <div style={{ ...SECTION_TITLE, color: "#B8CCE8" }}>HCE UI</div>
      <div style={{ ...GRID, marginBottom: 32 }}>
        {HCE_UI.map(({ name, icon: Icon }) => (
          <div key={name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <Icon size={32} color="#B8CCE8" />
            <span style={{ ...LABEL, color: "#B8CCE8", fontSize: 8 }}>{name.replace("Icon", "")}</span>
          </div>
        ))}
      </div>
      <div style={{ ...SECTION_TITLE, color: "#B8CCE8" }}>UIKit</div>
      <div style={GRID}>
        {HCE_UIKIT.map(({ name, icon: Icon }) => (
          <div key={name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <Icon size={32} color="#B8CCE8" />
            <span style={{ ...LABEL, color: "#B8CCE8", fontSize: 8 }}>{name.replace("Icon", "")}</span>
          </div>
        ))}
      </div>
    </div>
  ),
}
