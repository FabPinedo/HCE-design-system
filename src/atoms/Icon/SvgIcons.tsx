/**
 * SvgIcons.tsx
 * Wrapper ligero sobre los archivos SVG de src/assets/icons/.
 *
 * Cómo agregar un nuevo ícono:
 *  1. Colocar el .svg en src/assets/icons/  (con fill="currentColor" en los paths)
 *  2. Agregar aquí el import y el componente wrapper
 *  3. Agregar al export en Icon.tsx y en index.ts
 *
 * Los SVGs usan fill="currentColor", por lo que el color se controla
 * desde el padre con la propiedad CSS `color`.
 */

import type { CSSProperties, FC, SVGProps } from "react"

// ── Imports de archivos SVG ──────────────────────────────────────────────────
// Icon1 – Médicos
import BloodTestSvg      from "../../assets/icons/BloodTest.svg?react"
import DoctorSvg         from "../../assets/icons/Doctor.svg?react"
import DrugsSvg          from "../../assets/icons/Drugs.svg?react"
import MedicalRoomSvg    from "../../assets/icons/MedicalRoom.svg?react"
import PrescriptionSvg   from "../../assets/icons/Prescription.svg?react"
import RadiographySvg    from "../../assets/icons/Radiography.svg?react"
import HceStethoscopeSvg from "../../assets/icons/HceStethoscope.svg?react"
import XRaysSvg          from "../../assets/icons/XRays.svg?react"
import AltaMedicaSvg     from "../../assets/icons/AltaMedica.svg?react"

// Icon2 – UI
import AddFriendSvg       from "../../assets/icons/AddFriend.svg?react"
import AddDocumentSvg     from "../../assets/icons/AddDocument.svg?react"
import AddCircleSvg       from "../../assets/icons/AddCircle.svg?react"
import SortArrowsSvg      from "../../assets/icons/SortArrows.svg?react"
import BinSvg             from "../../assets/icons/Bin.svg?react"
import HceCalendarSvg     from "../../assets/icons/HceCalendar.svg?react"
import CheckedCircleSvg   from "../../assets/icons/CheckedCircle.svg?react"
import ConfigurationSvg   from "../../assets/icons/Configuration.svg?react"
import ConversationSvg    from "../../assets/icons/Conversation.svg?react"
import DangerSvg          from "../../assets/icons/Danger.svg?react"
import DeleteCircleSvg    from "../../assets/icons/DeleteCircle.svg?react"
import DisketteSvg        from "../../assets/icons/Diskette.svg?react"
import DocumentUploadSvg  from "../../assets/icons/DocumentUpload.svg?react"
import DocumentSvg        from "../../assets/icons/Document.svg?react"
import DownloadSvg        from "../../assets/icons/Download.svg?react"
import EditingSvg         from "../../assets/icons/Editing.svg?react"
import ExchangeSvg        from "../../assets/icons/Exchange.svg?react"
import HceEyeSvg          from "../../assets/icons/HceEye.svg?react"
import ForgotPasswordSvg  from "../../assets/icons/ForgotPassword.svg?react"
import GoogleDocsSvg      from "../../assets/icons/GoogleDocs.svg?react"
import HceHistorySvg      from "../../assets/icons/HceHistory.svg?react"
import ChevronDownSvg     from "../../assets/icons/ChevronDown.svg?react"
import HceInfoSvg         from "../../assets/icons/HceInfo.svg?react"
import LoupeSvg           from "../../assets/icons/Loupe.svg?react"
import OnButtonSvg        from "../../assets/icons/OnButton.svg?react"
import PapersSvg          from "../../assets/icons/Papers.svg?react"
import PasteSvg           from "../../assets/icons/Paste.svg?react"
import SolCurrencySvg     from "../../assets/icons/SolCurrency.svg?react"
import PrintingSvg        from "../../assets/icons/Printing.svg?react"
import SendMailUpSvg      from "../../assets/icons/SendMailUp.svg?react"
import SendMailSvg        from "../../assets/icons/SendMail.svg?react"
import SendSvg            from "../../assets/icons/Send.svg?react"
import UndoCircleSvg      from "../../assets/icons/UndoCircle.svg?react"
import ClockSvg           from "../../assets/icons/Clock.svg?react"
import WarningSvg         from "../../assets/icons/Warning.svg?react"
import FilterSvg          from "../../assets/icons/Filter.svg?react"
import HceMonitorSvg      from "../../assets/icons/HceMonitor.svg?react"
import CloseSvg           from "../../assets/icons/Close.svg?react"

// ── Interfaz pública ─────────────────────────────────────────────────────────

export interface HceIconProps {
  /** Tamaño en píxeles (ancho y alto). Default: 24 */
  size?:      number
  /** Color CSS. Si se omite, hereda el `color` del padre. */
  color?:     string
  className?: string
  style?:     CSSProperties
}

// ── Factory interno ───────────────────────────────────────────────────────────
// Evita repetir la misma lógica en cada componente.
type SvgComponent = FC<SVGProps<SVGSVGElement>>

function makeIcon(SvgComp: SvgComponent) {
  return function HceIcon({ size = 24, color, className, style }: HceIconProps) {
    return (
      <SvgComp
        width={size}
        height={size}
        style={{ color, ...style }}
        className={className}
      />
    )
  }
}

// ── Exportaciones — Icon1 (Médicos) ──────────────────────────────────────────
export const BloodTestIcon      = makeIcon(BloodTestSvg)
export const DoctorIcon         = makeIcon(DoctorSvg)
export const DrugsIcon          = makeIcon(DrugsSvg)
export const MedicalRoomIcon    = makeIcon(MedicalRoomSvg)
export const PrescriptionIcon   = makeIcon(PrescriptionSvg)
export const RadiographyIcon    = makeIcon(RadiographySvg)
export const HceStethoscopeIcon = makeIcon(HceStethoscopeSvg)
export const XRaysIcon          = makeIcon(XRaysSvg)
export const AltaMedicaIcon     = makeIcon(AltaMedicaSvg)

// ── Exportaciones — Icon2 (UI) ───────────────────────────────────────────────
export const AddFriendIcon      = makeIcon(AddFriendSvg)
export const AddDocumentIcon    = makeIcon(AddDocumentSvg)
export const AddCircleIcon      = makeIcon(AddCircleSvg)
export const SortArrowsIcon     = makeIcon(SortArrowsSvg)
export const BinIcon            = makeIcon(BinSvg)
export const HceCalendarIcon    = makeIcon(HceCalendarSvg)
export const CheckedCircleIcon  = makeIcon(CheckedCircleSvg)
export const ConfigurationIcon  = makeIcon(ConfigurationSvg)
export const ConversationIcon   = makeIcon(ConversationSvg)
export const DangerIcon         = makeIcon(DangerSvg)
export const DeleteCircleIcon   = makeIcon(DeleteCircleSvg)
export const DisketteIcon       = makeIcon(DisketteSvg)
export const DocumentUploadIcon = makeIcon(DocumentUploadSvg)
export const DocumentIcon       = makeIcon(DocumentSvg)
export const DownloadIcon       = makeIcon(DownloadSvg)
export const EditingIcon        = makeIcon(EditingSvg)
export const ExchangeIcon       = makeIcon(ExchangeSvg)
export const HceEyeIcon         = makeIcon(HceEyeSvg)
export const ForgotPasswordIcon = makeIcon(ForgotPasswordSvg)
export const GoogleDocsIcon     = makeIcon(GoogleDocsSvg)
export const HceHistoryIcon     = makeIcon(HceHistorySvg)
export const ChevronDownIcon    = makeIcon(ChevronDownSvg)
export const HceInfoIcon        = makeIcon(HceInfoSvg)
export const LoupeIcon          = makeIcon(LoupeSvg)
export const OnButtonIcon       = makeIcon(OnButtonSvg)
export const PapersIcon         = makeIcon(PapersSvg)
export const PasteIcon          = makeIcon(PasteSvg)
export const SolCurrencyIcon    = makeIcon(SolCurrencySvg)
export const PrintingIcon       = makeIcon(PrintingSvg)
export const SendMailUpIcon     = makeIcon(SendMailUpSvg)
export const SendMailIcon       = makeIcon(SendMailSvg)
export const SendIcon           = makeIcon(SendSvg)
export const UndoCircleIcon     = makeIcon(UndoCircleSvg)
export const ClockIcon          = makeIcon(ClockSvg)
export const WarningIcon        = makeIcon(WarningSvg)
export const FilterIcon         = makeIcon(FilterSvg)
export const HceMonitorIcon     = makeIcon(HceMonitorSvg)
export const CloseIcon          = makeIcon(CloseSvg)
