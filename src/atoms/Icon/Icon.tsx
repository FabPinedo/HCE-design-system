/**
 * Atom: Icon
 * Punto central de iconos del Design System.
 * Los microfrontends importan iconos desde aquí,
 * nunca directamente de lucide-react u otras librerías.
 */

// ── Custom HCE SVG icons ──────────────────────────────────
export type { HceIconProps } from "./SvgIconsHce"
export {
  // Icon1
  BloodTestIcon, DoctorIcon, DrugsIcon, MedicalRoomIcon,
  PrescriptionIcon, RadiographyIcon, HceStethoscopeIcon,
  XRaysIcon, AltaMedicaIcon,ReferenceIcon,
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
  HceMonitorIcon, CloseIcon,MenuBurgerIcon
} from "./SvgIconsHce"

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
  UiVectorIcon, UiWarningIcon, UiXRaysIcon,UiReferenceIcon,UiMenuBurgerIcon
} from "./SvgIconsHce"

// ── SVG locales de trazo (geometrías Lucide, licencia ISC) ──
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
} from "./SvgIconsHce"

export type { LucideIcon } from "./SvgIconsHce"
