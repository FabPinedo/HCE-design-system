/**
 * Atom: Icon
 * Punto central de iconos del Design System.
 * Los microfrontends importan iconos desde aquí,
 * nunca directamente de lucide-react u otras librerías.
 */

// ── Custom HCE SVG icons ──────────────────────────────────
export type { HceIconProps } from "./SvgIcons"
export {
  // Icon1
  BloodTestIcon, DoctorIcon, DrugsIcon, MedicalRoomIcon,
  PrescriptionIcon, RadiographyIcon, HceStethoscopeIcon,
  XRaysIcon, AltaMedicaIcon,
  // Icon2
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
} from "./SvgIcons"

// ── UIKit HCE SVG icons ───────────────────────────────────
export {
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
} from "./SvgIconsUiKit"

// ── lucide-react ──────────────────────────────────────────
export {
  // Navegación / MenuConfig
  Monitor,
  Users,
  BarChart,
  Settings,
  LayoutDashboard,
  ClipboardList,
  BedDouble,
  Scissors,
  CalendarDays,
  Stethoscope,
  FileText,
  Building2,

  // Login — fondo decorativo
  Syringe,
  Heart,
  Pill,
  Plus,
  Activity,
  Bandage,
  Asterisk,
  FlaskConical,
  Thermometer,

  // Login — campos de formulario
  User,
  Lock,
} from "lucide-react"

export type { LucideIcon } from "lucide-react"
