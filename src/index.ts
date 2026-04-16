// ─────────────────────────────────────────────────────────
// @hce/design-system — Public API
// ─────────────────────────────────────────────────────────

// ── Themes ────────────────────────────────────────────────
export { theme }          from "./theme/theme"
export { emergencyTheme } from "./theme/emergencyTheme"

// ── Provider ──────────────────────────────────────────────
export { DSProvider } from "./provider/ThemeProvider"

// ── Design Tokens — Base ───────────────────────────────────
export {
  baseTokens,
  baseColors,
  baseTypography,
  baseSpacing,
  baseBorderRadius,
  baseShadows,
  baseZIndex,
  injectBaseTokens,
} from "./tokens/base.tokens"

// ── Design Tokens — HCE Figma Palette ─────────────────────
export {
  hceColors,
  hceTypography,
  injectHceTokens,
  injectHceFonts,
} from "./tokens/hce.tokens"
export type { HceColors } from "./tokens/hce.tokens"

// ── Design Tokens — Emergency Monitor ─────────────────────
export {
  emergencyTokens,
  emergencyColors,
  emergencyTypography,
  emergencySpacing,
  emergencyBorderRadius,
  emergencyShadows,
  emergencyZIndex,
  emergencyTokensJSON,
  injectEmergencyTokens,
} from "./tokens/emergency.tokens"

// ── MUI Primitives re-exported ─────────────────────────────
export { Box, Typography } from "@mui/material"


// ── Icons — Lucide ─────────────────────────────────────────
export {
  Monitor, Users, BarChart, Settings,
  LayoutDashboard, ClipboardList, BedDouble, Scissors,
  CalendarDays, Stethoscope, FileText, Building2,
  Syringe, Heart, Pill, Plus, Activity,
  Bandage, Asterisk, FlaskConical, Thermometer,
  User, Lock,
} from "./atoms/Icon/Icon"
export type { LucideIcon } from "./atoms/Icon/Icon"

// ── Icons — HCE SVG (logo clínica + iconos de layout) ─────
export { LogoClinicaSanFelipeIcon, LogoutIcon, HceMenuIcon, HceStarIcon, HceConfigIcon, HceBurgerIcon } from "./atoms/Icon/SvgIconsHce"

// ── Icons — HCE Custom SVG ─────────────────────────────────
export type { HceIconProps } from "./atoms/Icon/Icon"
export {
  // Icon1 – Medical
  BloodTestIcon, DoctorIcon, DrugsIcon, MedicalRoomIcon,
  PrescriptionIcon, RadiographyIcon, HceStethoscopeIcon,
  XRaysIcon, AltaMedicaIcon,
  // Icon2 – UI
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
} from "./atoms/Icon/Icon"

// ── Atoms ─────────────────────────────────────────────────
export { Button }        from "./atoms/Button/Button"
export { Badge }         from "./atoms/Badge/Badge"
export { Chip }          from "./atoms/Chip/Chip"
export { Card }          from "./atoms/Card/Card"
export { PriorityBadge } from "./atoms/PriorityBadge/PriorityBadge"
export { BoxBadge }      from "./atoms/BoxBadge/BoxBadge"
export { AttentionCode } from "./atoms/AttentionCode/AttentionCode"
export { TextInput }     from "./atoms/TextInput/TextInput"
export { SelectField }   from "./atoms/SelectField/SelectField"
export { SelectInput }   from "./atoms/SelectInput/SelectInput"
export { StatusBadge }   from "./atoms/StatusBadge/StatusBadge"
export { Checkbox }      from "./atoms/Checkbox/Checkbox"

// ── Types — Atoms ──────────────────────────────────────────
export type { PriorityLevel } from "./atoms/PriorityBadge/PriorityBadge"
export type { BoxStatus }     from "./atoms/BoxBadge/BoxBadge"
export type { BadgeVariant }  from "./atoms/StatusBadge/StatusBadge"

// ── Loading Overlay ───────────────────────────────────────
export { LoadingOverlay } from "./molecules/LoadingOverlay/LoadingOverlay"
export type { LoadingOverlayProps } from "./molecules/LoadingOverlay/LoadingOverlay"

// ── Quick Access Card ─────────────────────────────────────
export { HCEQuickAccess } from "./molecules/HCEQuickAccess/HCEQuickAccess"
export type { HCEQuickAccessProps } from "./molecules/HCEQuickAccess/HCEQuickAccess"

// ── Update Banner (notificación de nueva versión) ─────────
export { HceUpdateBanner } from "./molecules/HceUpdateBanner/HceUpdateBanner"
export type { HceUpdateBannerProps } from "./molecules/HceUpdateBanner/HceUpdateBanner"

// ── CSF Loading (spinner animado con logo CSF) ────────────
export { CSFLoading } from "./molecules/CSFLoading/CSFLoading"
export type { CSFLoadingProps } from "./molecules/CSFLoading/CSFLoading"

// ── Molecules ─────────────────────────────────────────────
export { ActionBar }           from "./molecules/ActionBar/ActionBar"
export { ActionIconButton }    from "./molecules/ActionIconButton/ActionIconButton"
export { BedsAvailabilityTab } from "./molecules/BedsAvailabilityTab/BedsAvailabilityTab"
export { ClinicalStatusIcon }  from "./molecules/ClinicalStatusIcon/ClinicalStatusIcon"
export { EmergencyHeader }     from "./molecules/EmergencyHeader/EmergencyHeader"
export { EmergencyPagination } from "./molecules/EmergencyPagination/EmergencyPagination"
export { IconButton }          from "./molecules/IconButton/IconButton"
export { InfoButton }          from "./molecules/InfoButton/InfoButton"
export { PatientRow }          from "./molecules/PatientRow/PatientRow"
export { PasswordInput }       from "./molecules/PasswordInput/PasswordInput"
// ContentCard: molecule Card with title, divider, actions
export { Card as ContentCard } from "./molecules/Card/Card"
export { PageHeader }          from "./molecules/PageHeader/PageHeader"
// DataTableSimple: molecule DataTable (generic T extends object)
export { DataTable as DataTableSimple } from "./molecules/DataTable/DataTable"
export { PatientTable }        from "./molecules/PatientTable/PatientTable"

// ── Types — Molecules ──────────────────────────────────────
export type { ClinicalIconStatus } from "./molecules/ClinicalStatusIcon/ClinicalStatusIcon"
export type { PatientRowData }     from "./molecules/PatientRow/PatientRow"
export type { ExtraAction }        from "./molecules/ActionBar/ActionBar"

// ── Modal ─────────────────────────────────────────────────
export { HceModal } from "./organisms/HceModal/HceModal"
export type { HceModalProps, ModalButtonConfig, ModalInputConfig } from "./organisms/HceModal/HceModal"

// ── Organisms ─────────────────────────────────────────────
export { Header }                from "./organisms/Header/Header"
export { Footer }                from "./organisms/Footer/Footer"
export { HceHeader }             from "./organisms/HceHeader/HceHeader"
export { HceSidebar }            from "./organisms/HceSidebar/HceSidebar"
export { CarruselHome }          from "./organisms/CarruselHome/CarruselHome"
export { SideNav }               from "./organisms/SideNav/SideNav"
export { DataTable }             from "./organisms/DataTable/DataTable"
export { Pagination }            from "./organisms/Pagination/Pagination"
export { PatientTable as EmergencyPatientTable } from "./organisms/PatientTable/PatientTable"
export { BedAvailabilityDrawer } from "./organisms/BedAvailability/BedAvailabilityDrawer"
export { SidebarMenu }           from "./organisms/SidebarMenu/SidebarMenu"

// ── Types — Organisms ──────────────────────────────────────
export type { MenuItem }       from "./organisms/SidebarMenu/types"
export type { HceHeaderProps, Sucursal, HceNotificacion } from "./organisms/HceHeader/HceHeader"
export type { HceSidebarProps, OpcionMAC } from "./organisms/HceSidebar/HceSidebar"
export type { CarruselHomeProps }           from "./organisms/CarruselHome/CarruselHome"
