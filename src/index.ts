// ─────────────────────────────────────────────────────────
// @hce/design-system — Public API
// ─────────────────────────────────────────────────────────

// ── Themes ────────────────────────────────────────────────
// Un solo eje de theming: empresa/tenant (default/csf/sanna). Ver
// theme/themes.ts y tokens/companies.tokens.ts.
export { defaultTheme, csfTheme, sannaTheme, dsThemes } from "./theme/themes"
export type { DsTheme } from "./theme/themes"

// ── Provider ──────────────────────────────────────────────
export { DSProvider } from "./provider/ThemeProvider"

// ── Design Tokens — HCE (fuente única de verdad, estructurales) ──────────
export {
  hceColors,
  hceTypography,
  hceUi,
  hceTransition,
  hceShadows,
  hceSpacing,
  hceBorderRadius,
  hceZIndex,
  hceClinicalColors,
  injectHceTokens,
  injectHceFonts,
} from "./tokens/hce.tokens"
export type { HceColors } from "./tokens/hce.tokens"
// Forma compartida de la paleta de marca por empresa (multiempresa) — ver
// tokens/companies.tokens.ts.
export type { HceCompanyColors } from "./tokens/hce.tokens"

// ── Design Tokens — Multiempresa (paleta de marca por empresa) ───────────
// Todas las empresas/tenants viven en src/tokens/companies.tokens.ts (NUNCA
// se fragmentan aquí los tokens estructurales de arriba).
export { defaultCompanyColors, csfCompanyColors, sannaCompanyColors, companyThemes } from "./tokens/companies.tokens"
export type { CompanyThemeKey } from "./tokens/companies.tokens"

// ── Primitivas propias (reemplazan a Box/Typography de MUI) ──────────────
// Misma API pública mínima (component/sx/style/className/children) que
// este repo consumía de MUI — los consumidores externos no cambian su
// import.
export { Box }        from "./atoms/Box/Box"
export { Typography } from "./atoms/Typography/Typography"
export type { BoxProps }        from "./atoms/Box/Box"
export type { TypographyProps, TypographyVariant } from "./atoms/Typography/Typography"


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
// Escala de dolor EVA (0-10) — caras que reemplazan a los emojis en EvaScale
export {
  EvaScale0Icon, EvaScale1Icon, EvaScale2Icon, EvaScale3Icon, EvaScale4Icon,
  EvaScale5Icon, EvaScale6Icon, EvaScale7Icon, EvaScale8Icon, EvaScale9Icon,
  EvaScale10Icon
} from "./atoms/Icon/SvgIconsHce"

// ── Icons — HCE Custom SVG ─────────────────────────────────
export type { HceIconProps } from "./atoms/Icon/Icon"
export {
  // Icon1 – Medical
  BloodTestIcon, DoctorIcon, DrugsIcon, MedicalRoomIcon,
  PrescriptionIcon, RadiographyIcon, HceStethoscopeIcon,
  XRaysIcon, AltaMedicaIcon, ReferenceIcon,
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
  HceMonitorIcon, CloseIcon,MenuBurgerIcon,
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
  UiVectorIcon, UiWarningIcon, UiXRaysIcon,UiMenuBurgerIcon
} from "./atoms/Icon/Icon"

// ── Atoms ─────────────────────────────────────────────────
export { Button }         from "./atoms/Button/Button"
export { Badge }          from "./atoms/Badge/Badge"
export { Chip }           from "./atoms/Chip/Chip"
export { Card }           from "./atoms/Card/Card"
export { PriorityBadge }  from "./atoms/PriorityBadge/PriorityBadge"
export { BoxBadge }       from "./atoms/BoxBadge/BoxBadge"
export { WaitingBadge }       from "./atoms/WaitingBadge/WaitingBadge"
export { AttentionCode }  from "./atoms/AttentionCode/AttentionCode"
export { TextInput }      from "./atoms/TextInput/TextInput"
export { SelectField }    from "./atoms/SelectField/SelectField"
export { SelectInput }    from "./atoms/SelectInput/SelectInput"
export { StatusBadge }    from "./atoms/StatusBadge/StatusBadge"
export { Checkbox }       from "./atoms/Checkbox/Checkbox"
export { HceBreadcrumb }       from "./atoms/HceBreadcrumb/HceBreadcrumb"
export { SkeletonLoader } from "./atoms/SkeletonLoader/SkeletonLoader"
export { MultiSelect }    from "./atoms/MultiSelect/MultiSelectField"
export { HceTooltip } from './atoms/Tooltip/HceTooltip'
export type { SkeletonLoaderProps, SkeletonVariant } from "./atoms/SkeletonLoader/SkeletonLoader"
export { FieldCol }       from "./atoms/FieldCol/FieldCol"
export type { FieldColProps } from "./atoms/FieldCol/FieldCol"
export { Toggle }         from "./atoms/Toggle/Toggle"
export type { ToggleProps } from "./atoms/Toggle/Toggle"
export { NumericField }   from "./atoms/NumericField/NumericField"
export type { NumericFieldProps } from "./atoms/NumericField/NumericField"
export { TextareaField }  from "./atoms/TextareaField/TextareaField"
export type { TextareaFieldProps } from "./atoms/TextareaField/TextareaField"
export { DatePicker }     from "./atoms/DatePicker/DatePicker"
export type { DatePickerProps } from "./atoms/DatePicker/DatePicker"

// ── Types — Atoms ──────────────────────────────────────────
export type { PriorityLevel } from "./atoms/PriorityBadge/PriorityBadge"

export type {
  HceBreadcrumbItem,
  HceBreadcrumbProps,
} from "./atoms/HceBreadcrumb/HceBreadcrumb"

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
export { MonitoActionBar }     from "./molecules/MonitoActionBar/MonitoActionBar"
export type { MonitoActionBarProps, MonitoPlacement } from "./molecules/MonitoActionBar/MonitoActionBar"
export { ActionIconButton }    from "./molecules/ActionIconButton/ActionIconButton"
export { BedsAvailabilityTab } from "./molecules/BedsAvailabilityTab/BedsAvailabilityTab"
export { ClinicalStatusIcon }  from "./molecules/ClinicalStatusIcon/ClinicalStatusIcon"
export { EmergencyHeader }     from "./molecules/EmergencyHeader/EmergencyHeader"
export { EmergencyPagination } from "./molecules/EmergencyPagination/EmergencyPagination"
export { IconButton }          from "./molecules/IconButton/IconButton"
export { GenericRow }          from "./molecules/GenericRow/GenericRow"
export { GenericCell }          from "./molecules/GenericCell/GenericCell"
export type { GenericTableColumn }  from  "./molecules/GenericCell/GenericCell"
export { InfoButton }          from "./molecules/InfoButton/InfoButton"
export  *  from "./molecules/DataCard/index"
export { PasswordInput }       from "./molecules/PasswordInput/PasswordInput"
export { RadioGroup }          from "./molecules/RadioGroup/RadioGroup"
export { SectionHeader }       from "./molecules/SectionHeader/SectionHeader"
export type { SectionHeaderProps } from "./molecules/SectionHeader/SectionHeader"
// ContentCard: molecule Card with title, divider, actions
export { Card as ContentCard } from "./molecules/Card/Card"
export { PageHeader }          from "./molecules/PageHeader/PageHeader"
// DataTableSimple: molecule DataTable (generic T extends object)
export { DataTable as DataTableSimple } from "./molecules/DataTable/DataTable"

// ── EvaScale (escala visual de dolor 0-10) ────────────────
export { EvaScale } from "./molecules/EvaScale/EvaScale"
export type { EvaScaleProps } from "./molecules/EvaScale/EvaScale"

// ── TriagePriorityDisplay (badges de prioridad I-IV) ──────
export { TriagePriorityDisplay } from "./molecules/TriagePriorityDisplay/TriagePriorityDisplay"
export type { TriagePriorityDisplayProps, TriagePriority } from "./molecules/TriagePriorityDisplay/TriagePriorityDisplay"

// ── SearchComboInput (buscador con toggle nombre/CIE-10) ──
export { SearchComboInput } from "./molecules/SearchComboInput/SearchComboInput"
export type { SearchComboInputProps, SearchMode, SearchOption } from "./molecules/SearchComboInput/SearchComboInput"

// ── Types — Molecules ──────────────────────────────────────
export type { ClinicalIconStatus } from "./molecules/ClinicalStatusIcon/ClinicalStatusIcon"

export type { ExtraAction }        from "./molecules/ActionBar/ActionBar"

// ── Modal ─────────────────────────────────────────────────
export { HceModal } from "./organisms/HceModal/HceModal"
export type { HceModalProps, ModalButtonConfig, ModalInputConfig } from "./organisms/HceModal/HceModal"

// ── Form Modal ────────────────────────────────────────────
export { HceFormModal } from "./organisms/HceFormModal/HceFormModal"
export type { HceFormModalProps } from "./organisms/HceFormModal/HceFormModal"

// ── Organisms ─────────────────────────────────────────────
export { Header }                from "./organisms/Header/Header"
export { Footer }                from "./organisms/Footer/Footer"
export { HceHeader }             from "./organisms/HceHeader/HceHeader"
export { HceSidebar }            from "./organisms/HceSidebar/HceSidebar"
export { CarruselHome }          from "./organisms/CarruselHome/CarruselHome"
export { SideNav }               from "./organisms/SideNav/SideNav"
export { DataTable }             from "./organisms/DataTable/DataTable"
export { Pagination }            from "./organisms/Pagination/Pagination"

export { BedAvailabilityDrawer } from "./organisms/BedAvailability/BedAvailabilityDrawer"
export { BedAvailabilityDrawerV2 } from "./organisms/BedAvailability/BedAvailabilityDrawerV2"
export {
  BED_AVAILABILITY_STATUS_COLORS,
  BED_AVAILABILITY_STATUS_LABELS,
}                                 from "./organisms/BedAvailability/BedAvailabilityDrawerV2"
export { SidebarMenu }           from "./organisms/SidebarMenu/SidebarMenu"
export { NavTab }                from "./organisms/NavTab/NavTab"

export { GenericTable} from "./organisms/GenericTable/GenericTable"

// ── Types — Organisms ──────────────────────────────────────
export type {
  BedAvailabilityItem,
  BedAvailabilityStatus,
  BedAvailabilityDrawerV2Props,
}                               from "./organisms/BedAvailability/BedAvailabilityDrawerV2"
export type { MenuItem }       from "./organisms/SidebarMenu/types"
export type {
  HceHeaderProps,
  HceHeaderVariant,
  Sucursal,
  HceNotificacion,
} from "./organisms/HceHeader/HceHeader"
export type { HceSidebarProps, OpcionMAC } from "./organisms/HceSidebar/HceSidebar"
export type { CarruselHomeProps }           from "./organisms/CarruselHome/CarruselHome"

