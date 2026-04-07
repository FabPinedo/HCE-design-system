/**
 * SvgIconsUiKit.tsx
 * Set UIKit — íconos del Figma HCE Recursos.
 *
 * Cómo agregar un nuevo ícono UIKit:
 *  1. Colocar el .svg en src/assets/icons/uikit/  (fill="currentColor")
 *  2. Agregar aquí el import y la línea makeIcon()
 *  3. Agregar la exportación en Icon.tsx e index.ts
 *
 * Todos los componentes llevan prefijo "Ui" para distinguirlos
 * del set Icon1/Icon2 en imports y en Storybook.
 */

import type { FC, SVGProps } from "react"
import type { HceIconProps }  from "./SvgIcons"

import ArrowSvg            from "../../assets/icons/uikit/Arrow.svg?react"
import DoctorSvg           from "../../assets/icons/uikit/Doctor.svg?react"
import AddDocsSvg          from "../../assets/icons/uikit/AddDocs.svg?react"
import AddFriendSvg        from "../../assets/icons/uikit/AddFriend.svg?react"
import AddSvg              from "../../assets/icons/uikit/Add.svg?react"
import ArrowsSvg           from "../../assets/icons/uikit/Arrows.svg?react"
import BloodTestSvg        from "../../assets/icons/uikit/BloodTest.svg?react"
import CalendarSvg         from "../../assets/icons/uikit/Calendar.svg?react"
import CheckedSvg          from "../../assets/icons/uikit/Checked.svg?react"
import CloseSvg            from "../../assets/icons/uikit/Close.svg?react"
import ConfigurationSvg    from "../../assets/icons/uikit/Configuration.svg?react"
import ConversationSvg     from "../../assets/icons/uikit/Conversation.svg?react"
import DangerSvg           from "../../assets/icons/uikit/Danger.svg?react"
import DeleteSvg           from "../../assets/icons/uikit/Delete.svg?react"
import DisketteSvg         from "../../assets/icons/uikit/Diskette.svg?react"
import DocsSvg             from "../../assets/icons/uikit/Docs.svg?react"
import DownloadArrowSvg    from "../../assets/icons/uikit/DownloadArrow.svg?react"
import DrugsSvg            from "../../assets/icons/uikit/Drugs.svg?react"
import EditingSvg          from "../../assets/icons/uikit/Editing.svg?react"
import ExchangeSvg         from "../../assets/icons/uikit/Exchange.svg?react"
import EyeSvg              from "../../assets/icons/uikit/Eye.svg?react"
import FilterSvg           from "../../assets/icons/uikit/Filter.svg?react"
import HistorySvg          from "../../assets/icons/uikit/History.svg?react"
import InfoSvg             from "../../assets/icons/uikit/Info.svg?react"
import IsotipoClinicaSvg   from "../../assets/icons/uikit/IsotipoClinica.svg?react"
import MedicalDischargeSvg from "../../assets/icons/uikit/MedicalDischarge.svg?react"
import MedicalRoomSvg      from "../../assets/icons/uikit/MedicalRoom.svg?react"
import MonitorSvg          from "../../assets/icons/uikit/Monitor.svg?react"
import OnButtonSvg         from "../../assets/icons/uikit/OnButton.svg?react"
import PadlockSvg          from "../../assets/icons/uikit/Padlock.svg?react"
import PapersSvg           from "../../assets/icons/uikit/Papers.svg?react"
import PasteSvg            from "../../assets/icons/uikit/Paste.svg?react"
import PrescriptionSvg     from "../../assets/icons/uikit/Prescription.svg?react"
import PrintingSvg         from "../../assets/icons/uikit/Printing.svg?react"
import RadiographySvg      from "../../assets/icons/uikit/Radiography.svg?react"
import SearchSvg           from "../../assets/icons/uikit/Search.svg?react"
import SendMailSvg         from "../../assets/icons/uikit/SendMail.svg?react"
import SendSvg             from "../../assets/icons/uikit/Send.svg?react"
import SolSymbolSvg        from "../../assets/icons/uikit/SolSymbol.svg?react"
import StethoscopeSvg      from "../../assets/icons/uikit/Stethoscope.svg?react"
import TrashSvg            from "../../assets/icons/uikit/Trash.svg?react"
import UndoSvg             from "../../assets/icons/uikit/Undo.svg?react"
import UploadDocumentSvg   from "../../assets/icons/uikit/UploadDocument.svg?react"
import VectorSvg           from "../../assets/icons/uikit/Vector.svg?react"
import WarningSvg          from "../../assets/icons/uikit/Warning.svg?react"
import XRaysSvg            from "../../assets/icons/uikit/XRays.svg?react"

// Re-exportamos HceIconProps para que los consumidores no importen de dos sitios
export type { HceIconProps }

type SvgComponent = FC<SVGProps<SVGSVGElement>>

function makeIcon(SvgComp: SvgComponent) {
  return function UiKitIcon({ size = 24, color, className, style }: HceIconProps) {
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

// ── Exports UIKit (prefijo "Ui") ─────────────────────────────────────────────
export const UiArrowIcon            = makeIcon(ArrowSvg)
export const UiDoctorIcon           = makeIcon(DoctorSvg)
export const UiAddDocsIcon          = makeIcon(AddDocsSvg)
export const UiAddFriendIcon        = makeIcon(AddFriendSvg)
export const UiAddIcon              = makeIcon(AddSvg)
export const UiArrowsIcon           = makeIcon(ArrowsSvg)
export const UiBloodTestIcon        = makeIcon(BloodTestSvg)
export const UiCalendarIcon         = makeIcon(CalendarSvg)
export const UiCheckedIcon          = makeIcon(CheckedSvg)
export const UiCloseIcon            = makeIcon(CloseSvg)
export const UiConfigurationIcon    = makeIcon(ConfigurationSvg)
export const UiConversationIcon     = makeIcon(ConversationSvg)
export const UiDangerIcon           = makeIcon(DangerSvg)
export const UiDeleteIcon           = makeIcon(DeleteSvg)
export const UiDisketteIcon         = makeIcon(DisketteSvg)
export const UiDocsIcon             = makeIcon(DocsSvg)
export const UiDownloadArrowIcon    = makeIcon(DownloadArrowSvg)
export const UiDrugsIcon            = makeIcon(DrugsSvg)
export const UiEditingIcon          = makeIcon(EditingSvg)
export const UiExchangeIcon         = makeIcon(ExchangeSvg)
export const UiEyeIcon              = makeIcon(EyeSvg)
export const UiFilterIcon           = makeIcon(FilterSvg)
export const UiHistoryIcon          = makeIcon(HistorySvg)
export const UiInfoIcon             = makeIcon(InfoSvg)
export const UiIsotipoClinicaIcon   = makeIcon(IsotipoClinicaSvg)
export const UiMedicalDischargeIcon = makeIcon(MedicalDischargeSvg)
export const UiMedicalRoomIcon      = makeIcon(MedicalRoomSvg)
export const UiMonitorIcon          = makeIcon(MonitorSvg)
export const UiOnButtonIcon         = makeIcon(OnButtonSvg)
export const UiPadlockIcon          = makeIcon(PadlockSvg)
export const UiPapersIcon           = makeIcon(PapersSvg)
export const UiPasteIcon            = makeIcon(PasteSvg)
export const UiPrescriptionIcon     = makeIcon(PrescriptionSvg)
export const UiPrintingIcon         = makeIcon(PrintingSvg)
export const UiRadiographyIcon      = makeIcon(RadiographySvg)
export const UiSearchIcon           = makeIcon(SearchSvg)
export const UiSendMailIcon         = makeIcon(SendMailSvg)
export const UiSendIcon             = makeIcon(SendSvg)
export const UiSolSymbolIcon        = makeIcon(SolSymbolSvg)
export const UiStethoscopeIcon      = makeIcon(StethoscopeSvg)
export const UiTrashIcon            = makeIcon(TrashSvg)
export const UiUndoIcon             = makeIcon(UndoSvg)
export const UiUploadDocumentIcon   = makeIcon(UploadDocumentSvg)
export const UiVectorIcon           = makeIcon(VectorSvg)
export const UiWarningIcon          = makeIcon(WarningSvg)
export const UiXRaysIcon            = makeIcon(XRaysSvg)
