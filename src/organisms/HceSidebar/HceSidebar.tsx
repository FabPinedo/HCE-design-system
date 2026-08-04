import { useState, type ComponentType, type CSSProperties, type KeyboardEvent, type MouseEvent } from "react"
import "./HceSidebar.css"
import { Tooltip } from "../../atoms/Tooltip/Tooltip"
import { hceColors, hceTypography, hceShadows } from "../../tokens/hce.tokens"
import { LogoClinicaSanFelipeIcon, LogoutIcon, HceMenuIcon, HceStarIcon, HceConfigIcon } from "../../atoms/Icon/SvgIconsHce"

// Lucide icons
import {
  Monitor, Users, BarChart, Settings, LayoutDashboard,
  ClipboardList, BedDouble, Scissors, CalendarDays,
  Stethoscope, FileText, Building2, Syringe, Heart,
  Pill, Plus, Activity, Bandage, FlaskConical, Thermometer,
} from "../../atoms/Icon/Icon"

// HCE SVG icons
import {
  BloodTestIcon, DoctorIcon, DrugsIcon, MedicalRoomIcon,
  PrescriptionIcon, RadiographyIcon, HceStethoscopeIcon,
  XRaysIcon, AltaMedicaIcon, AddFriendIcon, AddDocumentIcon,
  AddCircleIcon, SortArrowsIcon, BinIcon, HceCalendarIcon,
  CheckedCircleIcon, ConfigurationIcon, ConversationIcon,
  DangerIcon, DeleteCircleIcon, DisketteIcon, DocumentUploadIcon,
  DocumentIcon, DownloadIcon, EditingIcon, ExchangeIcon,
  HceEyeIcon, HceHistoryIcon, HceInfoIcon, LoupeIcon,
  OnButtonIcon, PapersIcon, PasteIcon, PrintingIcon,
  SendMailIcon, SendIcon, UndoCircleIcon, ClockIcon,
  WarningIcon, FilterIcon, HceMonitorIcon, CloseIcon,
} from "../../atoms/Icon/SvgIcons"

// UIKit icons
import {
  UiArrowIcon, UiDoctorIcon, UiAddDocsIcon, UiAddFriendIcon,
  UiAddIcon, UiBloodTestIcon, UiCalendarIcon, UiCheckedIcon,
  UiConfigurationIcon, UiConversationIcon, UiDangerIcon,
  UiDeleteIcon, UiDisketteIcon, UiDocsIcon, UiDownloadArrowIcon,
  UiDrugsIcon, UiEditingIcon, UiExchangeIcon, UiEyeIcon,
  UiFilterIcon, UiHistoryIcon, UiInfoIcon, UiIsotipoClinicaIcon,
  UiMedicalDischargeIcon, UiMedicalRoomIcon, UiMonitorIcon,
  UiOnButtonIcon, UiPadlockIcon, UiPapersIcon, UiPasteIcon,
  UiPrescriptionIcon, UiPrintingIcon, UiRadiographyIcon,
  UiSearchIcon, UiSendMailIcon, UiSendIcon, UiSolSymbolIcon,
  UiStethoscopeIcon, UiTrashIcon, UiUndoIcon, UiUploadDocumentIcon,
  UiWarningIcon, UiXRaysIcon,
} from "../../atoms/Icon/SvgIconsUiKit"

type IconComponent = ComponentType<{ size?: number; color?: string }>

// ─── Glifos inline (se integran al sistema de íconos en el paso dedicado) ─────
function ExpandMoreGlyph({ size = 14, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}
function ChevronLeftGlyph({ size = 18, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  )
}
function HomeGlyph({ size = 22, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}

// ─── Constantes de animación ──────────────────────────────────────────────────

const TRANSITION_BASE = "220ms cubic-bezier(0.4, 0, 0.2, 1)"

/**
 * Registro de iconos por nombre de string.
 * El campo `icono` que devuelve MAC se resuelve aquí.
 * Nombres: igual que el export del design system (case-sensitive).
 * Ej: icono="FileText" → <FileText />
 */
const ICON_REGISTRY: Record<string, IconComponent> = {
  // ── Lucide ──
  Monitor, Users, BarChart, Settings, LayoutDashboard,
  ClipboardList, BedDouble, Scissors, CalendarDays,
  Stethoscope, FileText, Building2, Syringe, Heart,
  Pill, Plus, Activity, Bandage, FlaskConical, Thermometer,
  // ── HCE SVG (SvgIconsHce) ──
  LogoutIcon, HceMenuIcon, HceStarIcon, HceConfigIcon,
  // ── HCE SVG ──
  BloodTestIcon, DoctorIcon, DrugsIcon, MedicalRoomIcon,
  PrescriptionIcon, RadiographyIcon, HceStethoscopeIcon,
  XRaysIcon, AltaMedicaIcon, AddFriendIcon, AddDocumentIcon,
  AddCircleIcon, SortArrowsIcon, BinIcon, HceCalendarIcon,
  CheckedCircleIcon, ConfigurationIcon, ConversationIcon,
  DangerIcon, DeleteCircleIcon, DisketteIcon, DocumentUploadIcon,
  DocumentIcon, DownloadIcon, EditingIcon, ExchangeIcon,
  HceEyeIcon, HceHistoryIcon, HceInfoIcon, LoupeIcon,
  OnButtonIcon, PapersIcon, PasteIcon, PrintingIcon,
  SendMailIcon, SendIcon, UndoCircleIcon, ClockIcon,
  WarningIcon, FilterIcon, HceMonitorIcon, CloseIcon,
  // ── UIKit ──
  UiArrowIcon, UiDoctorIcon, UiAddDocsIcon, UiAddFriendIcon,
  UiAddIcon, UiBloodTestIcon, UiCalendarIcon, UiCheckedIcon,
  UiConfigurationIcon, UiConversationIcon, UiDangerIcon,
  UiDeleteIcon, UiDisketteIcon, UiDocsIcon, UiDownloadArrowIcon,
  UiDrugsIcon, UiEditingIcon, UiExchangeIcon, UiEyeIcon,
  UiFilterIcon, UiHistoryIcon, UiInfoIcon, UiIsotipoClinicaIcon,
  UiMedicalDischargeIcon, UiMedicalRoomIcon, UiMonitorIcon,
  UiOnButtonIcon, UiPadlockIcon, UiPapersIcon, UiPasteIcon,
  UiPrescriptionIcon, UiPrintingIcon, UiRadiographyIcon,
  UiSearchIcon, UiSendMailIcon, UiSendIcon, UiSolSymbolIcon,
  UiStethoscopeIcon, UiTrashIcon, UiUndoIcon, UiUploadDocumentIcon,
  UiWarningIcon, UiXRaysIcon,
}

// ─── Tipos ────────────────────────────────────────────────────────────────────

export type OpcionMAC = {
  /** Código del menú en MAC — ej: "01", "01/02" */
  codigo:       string
  titulo:       string
  indicador:    string
  /** Ruta de navegación devuelta por MAC (ej: "/ambulatorio"). Vacío = no navega */
  vista?:       string
  /**
   * Nombre del icono a mostrar.
   * Debe coincidir con un export del design system (case-sensitive).
   * Ej: "FileText", "BloodTestIcon", "UiMonitorIcon"
   */
  icono?:       string
  /** ID único del ítem en MAC */
  idMenu?:      number
  /** ID del padre — 0 si es raíz */
  idMenuPadre?: number
  opciones?:    OpcionMAC[]
}

export type HceSidebarProps = {
  /** sidebar comprimido (solo iconos) o expandido */
  collapsed:     boolean
  /** callback del botón para comprimir/expandir */
  onToggle:      () => void
  /** árbol de opciones devuelto por /auth/accesos */
  opciones?:     OpcionMAC[]
  /**
   * Ruta actualmente activa (ej: location.pathname).
   * Se compara contra el campo `vista` de cada opción para resaltar el ítem activo.
   */
  currentPath?:  string
  /**
   * Callback al seleccionar una opción hoja.
   * Recibe el campo `vista` de la opción (la ruta, ej: "/ambulatorio").
   */
  onNavigate:    (vista: string) => void
  /** callback al hacer click en el botón Home */
  onHome?:       () => void
  /**
   * Sidebar flotante: posición fija sobre el contenido, sin tocar header/footer,
   * con esquinas redondeadas y sombra. El consumidor debe ajustar el padding-left
   * del contenido principal según el ancho del sidebar.
   */
  floating?:     boolean
  /**
   * Modo árbol multinivel (default: false).
   *
   * false → renderiza solo un subnivel (padre + hijos directos).
   *         Los nietos y niveles más profundos se ignoran.
   *         Es el comportamiento actual y el recomendado para HCE.
   *
   * true  → renderiza el árbol completo de forma recursiva.
   *         Útil si en el futuro MAC devuelve jerarquías más profundas
   *         que necesiten mostrarse todas.
   *
   * Por el momento se deja en false (hardcoded en mf-shell).
   * Cuando se requiera activar, cambiar el valor en el consumidor:
   *   <HceSidebar multiLevel={true} ... />
   */
  multiLevel?:   boolean
}

// ─── Constantes ───────────────────────────────────────────────────────────────

const EXPANDED_WIDTH  = 240
const COLLAPSED_WIDTH = 64

// Obtiene las 2 primeras letras mayúsculas de un título para el avatar colapsado
function abbr(titulo: string) {
  const words = titulo.trim().split(/\s+/)
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase()
  return titulo.slice(0, 2).toUpperCase()
}

// ─── Sub-componente: agrupador nivel 2 (sin vista, con hijos, multiLevel=true) ──

type SecondLevelGroupProps = {
  item:        OpcionMAC
  currentPath: string
  onNavigate:  (vista: string) => void
}

function SecondLevelGroup({ item, currentPath, onNavigate }: SecondLevelGroupProps) {
  const visibleKids = (item.opciones ?? []).filter(gc => !!gc.vista)
  const grandActive = visibleKids.some(gc => currentPath === gc.vista)
  const [open, setOpen] = useState(grandActive)

  if (visibleKids.length === 0) return null

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      setOpen(prev => !prev)
    }
  }

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        aria-label={`${item.titulo}, grupo expandible`}
        aria-expanded={open}
        onClick={() => setOpen(prev => !prev)}
        onKeyDown={handleKeyDown}
        className="hce-sidebar-row"
        style={{
          display:         "flex",
          alignItems:      "center",
          paddingRight:    12,
          paddingTop:      "7px",
          paddingBottom:   "7px",
          borderRadius:    "0 8px 8px 0",
          backgroundColor: grandActive || open ? hceColors.primary.blue[50] : "transparent",
        }}
      >
        <span style={{
          width:           14,
          height:          1,
          flexShrink:      0,
          backgroundColor: hceColors.primary.blue[200],
          marginRight:     8,
        }} />
        <span style={{
          fontFamily:   hceTypography.fontFamily,
          fontSize:     "0.78rem",
          fontWeight:   grandActive || open ? 700 : 500,
          // blue[600] == --ds-color-interactive exactamente — reactivo al
          // tema activo de DSProvider, mismo hex de siempre como fallback.
          color:        grandActive || open ? `var(--ds-color-interactive, ${hceColors.primary.blue[600]})` : hceColors.neutro.black[400],
          lineHeight:   1.3,
          flex:         1,
          overflow:     "hidden",
          textOverflow: "ellipsis",
          whiteSpace:   "nowrap",
        }}>
          {item.titulo}
        </span>
        <span className={`hce-sidebar-chevron${open ? " hce-sidebar-chevron--open" : ""}`} style={{ display: "flex", flexShrink: 0 }}>
          <ExpandMoreGlyph size={14} color={open ? hceColors.primary.blue[500] : hceColors.neutro.black[100]} />
        </span>
      </div>

      {open && (
        <div style={{ marginLeft: 16, borderLeft: `2px solid ${hceColors.primary.blue[50]}` }}>
          {visibleKids.map(gc => {
            const isGcActive = currentPath === gc.vista

            const handleGcKeyDown = (e: KeyboardEvent) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                onNavigate(gc.vista!)
              }
            }

            return (
              <div
                key={gc.idMenu ?? gc.codigo}
                role="button"
                tabIndex={0}
                aria-label={gc.titulo}
                aria-current={isGcActive ? "page" : undefined}
                onClick={() => onNavigate(gc.vista!)}
                onKeyDown={handleGcKeyDown}
                className="hce-sidebar-row"
                style={{
                  display:         "flex",
                  alignItems:      "center",
                  paddingRight:    8,
                  paddingTop:      "6px",
                  paddingBottom:   "6px",
                  borderRadius:    "0 8px 8px 0",
                  backgroundColor: isGcActive ? hceColors.primary.blue[50] : "transparent",
                  // blue[600] == --ds-color-interactive exactamente — reactivo
                  // al tema activo de DSProvider, mismo hex de siempre como fallback.
                  borderLeft:      isGcActive
                    ? `3px solid var(--ds-color-interactive, ${hceColors.primary.blue[600]})`
                    : "3px solid transparent",
                }}
              >
                <span style={{
                  width:           10,
                  height:          1,
                  flexShrink:      0,
                  backgroundColor: isGcActive ? hceColors.primary.blue[400] : hceColors.primary.blue[100],
                  marginRight:     6,
                }} />
                <span style={{
                  fontFamily:   hceTypography.fontFamily,
                  fontSize:     "0.73rem",
                  fontWeight:   isGcActive ? 700 : 400,
                  color:        isGcActive ? hceColors.primary.blue[700] : hceColors.neutro.black[300],
                  lineHeight:   1.3,
                  overflow:     "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace:   "nowrap",
                }}>
                  {gc.titulo}
                </span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ─── Sub-componente: item de primer nivel ──────────────────────────────────────

type FirstLevelProps = {
  item:        OpcionMAC
  collapsed:   boolean
  currentPath: string
  onNavigate:  (vista: string) => void
  multiLevel:  boolean
}

function FirstLevelItem({ item, collapsed, currentPath, onNavigate, multiLevel }: FirstLevelProps) {
  const hasChildren = (item.opciones?.length ?? 0) > 0
  const canNavigate = !!item.vista
  const isActive    = !hasChildren && canNavigate && currentPath === item.vista
  const childActive = hasChildren && item.opciones!.some(c =>
    (!!c.vista && currentPath === c.vista) ||
    (c.opciones?.some(gc => !!gc.vista && currentPath === gc.vista) ?? false)
  )

  const [open, setOpen] = useState(childActive)

  const IconComp: IconComponent | null = item.icono ? (ICON_REGISTRY[item.icono] ?? null) : null

  const handleClick = (e: MouseEvent) => {
    if (collapsed) return
    e.stopPropagation()
    if (hasChildren) {
      setOpen(prev => !prev)
    } else if (canNavigate) {
      onNavigate(item.vista!)
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (collapsed) return
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      if (hasChildren) {
        setOpen(prev => !prev)
      } else if (canNavigate) {
        onNavigate(item.vista!)
      }
    }
  }

  // ── Modo colapsado ──
  if (collapsed) {
    return (
      <Tooltip title={item.titulo} placement="right" arrow>
        <div
          role="button"
          tabIndex={0}
          aria-label={item.titulo}
          aria-current={isActive ? "page" : undefined}
          className="hce-sidebar-icon-btn"
          style={{
            "--row-hover-bg": "rgba(255,255,255,0.15)",
            "--row-focus-color": hceColors.neutro.white[50],
            display:         "flex",
            alignItems:      "center",
            justifyContent:  "center",
            height:          44,
            marginLeft:      8,
            marginRight:     8,
            marginBottom:    4,
            borderRadius:    "8px",
            backgroundColor: isActive || childActive
              ? "rgba(255,255,255,0.2)"
              : "transparent",
          } as CSSProperties}
        >
          {IconComp ? (
            <IconComp size={22} color="white" />
          ) : (
            <span style={{
              width:           30,
              height:          30,
              borderRadius:    "50%",
              backgroundColor: "rgba(255,255,255,0.2)",
              display:         "flex",
              alignItems:      "center",
              justifyContent:  "center",
            }}>
              <span style={{
                fontFamily: hceTypography.fontFamily,
                color:      hceColors.neutro.white[50],
                fontSize:   "0.65rem",
                fontWeight: 700,
                lineHeight: 1,
              }}>
                {abbr(item.titulo)}
              </span>
            </span>
          )}
        </div>
      </Tooltip>
    )
  }

  // ── Modo expandido ──
  const parentBg = isActive
    ? hceColors.primary.blue[100]
    : (childActive || open)
      ? hceColors.primary.blue[50]
      : "transparent"

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        aria-label={item.titulo}
        aria-expanded={hasChildren ? open : undefined}
        aria-current={isActive ? "page" : undefined}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className="hce-sidebar-row"
        style={{
          "--row-hover-bg": isActive ? hceColors.primary.blue[100] : hceColors.primary.blue[50],
          display:         "flex",
          alignItems:      "center",
          gap:             8,
          marginLeft:      8,
          marginRight:     8,
          paddingTop:      "10px",
          paddingBottom:   "10px",
          borderRadius:    "8px",
          backgroundColor: parentBg,
          // blue[600] == --ds-color-interactive exactamente — reactivo al
          // tema activo de DSProvider, mismo hex de siempre como fallback.
          borderLeft:      isActive
            ? `3px solid var(--ds-color-interactive, ${hceColors.primary.blue[600]})`
            : "3px solid transparent",
          paddingLeft:     isActive ? "9px" : "12px",
          paddingRight:    "12px",
        } as CSSProperties}
      >
        {/* Icono o avatar abreviatura */}
        <span style={{
          width:           26,
          height:          26,
          borderRadius:    IconComp ? "6px" : "50%",
          backgroundColor: hceColors.primary.blue[isActive || childActive || open ? 100 : 50],
          display:         "flex",
          alignItems:      "center",
          justifyContent:  "center",
          flexShrink:      0,
        }}>
          {IconComp ? (
            // blue[600] == --ds-color-interactive exactamente — reactivo al
            // tema activo de DSProvider, mismo hex de siempre como fallback.
            <IconComp size={15} color={`var(--ds-color-interactive, ${hceColors.primary.blue[600]})`} />
          ) : (
            <span style={{
              fontFamily: hceTypography.fontFamily,
              color:      hceColors.primary.blue[700],
              fontSize:   "0.6rem",
              fontWeight: 700,
            }}>
              {abbr(item.titulo)}
            </span>
          )}
        </span>

        <span style={{
          fontFamily:   hceTypography.fontFamily,
          fontSize:     "0.82rem",
          fontWeight:   isActive || childActive || open ? 700 : 500,
          // blue[600] == --ds-color-interactive exactamente — reactivo al
          // tema activo de DSProvider, mismo hex de siempre como fallback.
          color:        isActive || childActive
            ? hceColors.primary.blue[700]
            : open ? `var(--ds-color-interactive, ${hceColors.primary.blue[600]})` : hceColors.neutro.black[400],
          flex:         1,
          lineHeight:   1.3,
          overflow:     "hidden",
          textOverflow: "ellipsis",
          whiteSpace:   "nowrap",
        }}>
          {item.titulo}
        </span>

        {hasChildren && (
          <span className={`hce-sidebar-chevron${open ? " hce-sidebar-chevron--open" : ""}`} style={{ display: "flex", flexShrink: 0 }}>
            <ExpandMoreGlyph size={16} color={open ? hceColors.primary.blue[500] : hceColors.neutro.black[100]} />
          </span>
        )}
      </div>

      {/* Submenú nivel 2 */}
      {hasChildren && open && (
        <div style={{
          marginLeft:  28,
          marginRight: 8,
          marginBottom: 4,
          borderLeft: `2px solid ${hceColors.primary.blue[100]}`,
        }}>
          {item.opciones!.map(child => {
            const childCanNav  = !!child.vista
            const childHasKids = (child.opciones?.length ?? 0) > 0

            if (!childCanNav && (!multiLevel || !childHasKids)) return null

            if (!childCanNav) {
              return (
                <SecondLevelGroup
                  key={child.idMenu ?? child.codigo}
                  item={child}
                  currentPath={currentPath}
                  onNavigate={onNavigate}
                />
              )
            }

            const isChildActive      = currentPath === child.vista
            const grandkidsWithVista = multiLevel
              ? (child.opciones ?? []).filter(gc => !!gc.vista)
              : []

            const handleChildKeyDown = (e: KeyboardEvent) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                onNavigate(child.vista!)
              }
            }

            return (
              <div key={child.idMenu ?? child.codigo}>
                <div
                  role="button"
                  tabIndex={0}
                  aria-label={child.titulo}
                  aria-current={isChildActive ? "page" : undefined}
                  onClick={() => onNavigate(child.vista!)}
                  onKeyDown={handleChildKeyDown}
                  className="hce-sidebar-row"
                  style={{
                    display:         "flex",
                    alignItems:      "center",
                    paddingRight:    12,
                    paddingTop:      "7px",
                    paddingBottom:   "7px",
                    borderRadius:    "0 8px 8px 0",
                    backgroundColor: isChildActive ? hceColors.primary.blue[50] : "transparent",
                    // blue[600] == --ds-color-interactive exactamente — reactivo
                    // al tema activo de DSProvider, mismo hex de siempre como fallback.
                    borderLeft:      isChildActive
                      ? `3px solid var(--ds-color-interactive, ${hceColors.primary.blue[600]})`
                      : "3px solid transparent",
                  }}
                >
                  {/* Conector horizontal */}
                  <span style={{
                    width:           14,
                    height:          1,
                    flexShrink:      0,
                    backgroundColor: isChildActive
                      ? hceColors.primary.blue[400]
                      : hceColors.primary.blue[200],
                    marginRight:     8,
                  }} />
                  <span style={{
                    fontFamily:   hceTypography.fontFamily,
                    fontSize:     "0.78rem",
                    fontWeight:   isChildActive ? 700 : 400,
                    color:        isChildActive ? hceColors.primary.blue[700] : hceColors.neutro.black[400],
                    lineHeight:   1.3,
                    overflow:     "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace:   "nowrap",
                    flex:         1,
                  }}>
                    {child.titulo}
                  </span>
                </div>

                {grandkidsWithVista.length > 0 && (
                  <div style={{ marginLeft: 16, borderLeft: `2px solid ${hceColors.primary.blue[50]}` }}>
                    {grandkidsWithVista.map(gc => {
                      const isGcActive = currentPath === gc.vista

                      const handleGcKeyDown = (e: KeyboardEvent) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault()
                          onNavigate(gc.vista!)
                        }
                      }

                      return (
                        <div
                          key={gc.idMenu ?? gc.codigo}
                          role="button"
                          tabIndex={0}
                          aria-label={gc.titulo}
                          aria-current={isGcActive ? "page" : undefined}
                          onClick={() => onNavigate(gc.vista!)}
                          onKeyDown={handleGcKeyDown}
                          className="hce-sidebar-row"
                          style={{
                            display:         "flex",
                            alignItems:      "center",
                            paddingRight:    8,
                            paddingTop:      "6px",
                            paddingBottom:   "6px",
                            borderRadius:    "0 8px 8px 0",
                            backgroundColor: isGcActive ? hceColors.primary.blue[50] : "transparent",
                            // blue[600] == --ds-color-interactive exactamente —
                            // reactivo al tema activo de DSProvider, mismo hex
                            // de siempre como fallback.
                            borderLeft:      isGcActive
                              ? `3px solid var(--ds-color-interactive, ${hceColors.primary.blue[600]})`
                              : "3px solid transparent",
                          }}
                        >
                          <span style={{
                            width:           10,
                            height:          1,
                            flexShrink:      0,
                            backgroundColor: isGcActive
                              ? hceColors.primary.blue[400]
                              : hceColors.primary.blue[100],
                            marginRight:     6,
                          }} />
                          <span style={{
                            fontFamily:   hceTypography.fontFamily,
                            fontSize:     "0.73rem",
                            fontWeight:   isGcActive ? 700 : 400,
                            color:        isGcActive ? hceColors.primary.blue[700] : hceColors.neutro.black[300],
                            lineHeight:   1.3,
                            overflow:     "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace:   "nowrap",
                          }}>
                            {gc.titulo}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// Valor literal para evitar dependencia circular en el mismo módulo
const TRANSITION_WIDTH = "width 220ms cubic-bezier(0.4, 0, 0.2, 1), min-width 220ms cubic-bezier(0.4, 0, 0.2, 1)"

// ─── Componente principal ──────────────────────────────────────────────────────

export function HceSidebar({
  collapsed,
  onToggle,
  opciones    = [],
  currentPath = "",
  onNavigate,
  onHome,
  floating    = false,
  multiLevel  = false,
}: HceSidebarProps) {

  const handleToggleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      onToggle()
    }
  }

  const containerStyle: CSSProperties = floating
    ? {
        width:           collapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH,
        height:          "100%",
        display:         "flex",
        flexDirection:   "column",
        flexShrink:      0,
        overflow:        "hidden",
        transition:      `width ${TRANSITION_BASE}`,
        backgroundColor: collapsed ? hceColors.primary.blue[600] : "white",
        borderRadius:    "16px",
        boxShadow:       hceShadows.float,
      }
    : {
        width:           collapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH,
        minWidth:        collapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH,
        height:          "100%",
        display:         "flex",
        flexDirection:   "column",
        flexShrink:      0,
        transition:      TRANSITION_WIDTH,
        overflow:        "hidden",
        backgroundColor: collapsed ? hceColors.primary.blue[600] : "white",
        boxShadow:       hceShadows.sidebar,
        borderRight:     `1px solid ${hceColors.primary.blue[100]}`,
      }

  return (
    <div
      style={{ ...containerStyle, cursor: collapsed ? "pointer" : "default", boxSizing: "border-box" }}
      onClick={collapsed ? onToggle : undefined}
      onKeyDown={collapsed ? handleToggleKeyDown : undefined}
      tabIndex={collapsed ? 0 : undefined}
      role={collapsed ? "button" : undefined}
      aria-label={collapsed ? "Expandir menú lateral" : undefined}
    >

      {/* ── Cabecera ─────────────────────────────────────────── */}
      <div style={{
        height:          64,
        backgroundColor: hceColors.primary.blue[600],
        display:         "flex",
        alignItems:      "center",
        justifyContent:  collapsed ? "center" : "space-between",
        padding:         collapsed ? 0 : "0 16px",
        flexShrink:      0,
        boxSizing:       "border-box",
      }}>
        {collapsed ? (
          <div
            role="button"
            tabIndex={0}
            aria-label="Expandir menú lateral"
            onClick={e => { e.stopPropagation(); onToggle() }}
            onKeyDown={e => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                e.stopPropagation()
                onToggle()
              }
            }}
            className="hce-sidebar-icon-btn"
            style={{
              "--row-focus-color": hceColors.neutro.white[50],
              width:      40,
              height:     40,
              display:    "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius:   "50%",
            } as CSSProperties}
          >
            <UiIsotipoClinicaIcon size={28} color="white" />
          </div>
        ) : (
          <>
            <LogoClinicaSanFelipeIcon width={110} />
            <div
              role="button"
              tabIndex={0}
              aria-label="Colapsar menú lateral"
              onClick={e => { e.stopPropagation(); onToggle() }}
              onKeyDown={e => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  e.stopPropagation()
                  onToggle()
                }
              }}
              className="hce-sidebar-icon-btn"
              style={{
                "--row-hover-bg": "rgba(255,255,255,0.25)",
                "--row-focus-color": hceColors.neutro.white[50],
                width:           30,
                height:          30,
                display:         "flex",
                alignItems:      "center",
                justifyContent:  "center",
                borderRadius:    "50%",
                backgroundColor: "rgba(255,255,255,0.15)",
                flexShrink:      0,
              } as CSSProperties}
            >
              <ChevronLeftGlyph size={18} color="white" />
            </div>
          </>
        )}
      </div>

      {/* ── Contenido del menú ───────────────────────────────── */}
      <div className={`hce-sidebar-scroll${collapsed ? " hce-sidebar-scroll--collapsed" : " hce-sidebar-scroll--expanded"}`} style={{
        flex:       1,
        overflowY:  "auto",
        overflowX:  "hidden",
        padding:    "8px 0",
        backgroundColor: collapsed ? hceColors.primary.blue[600] : "white",
        boxSizing:  "border-box",
      }}>

        {/* Item Home */}
        {collapsed ? (
          <Tooltip title="Inicio" placement="right" arrow>
            <div
              role="button"
              tabIndex={0}
              aria-label="Inicio"
              onClick={e => { e.stopPropagation(); onHome?.() }}
              onKeyDown={e => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  e.stopPropagation()
                  onHome?.()
                }
              }}
              className="hce-sidebar-icon-btn"
              style={{
                "--row-focus-color": hceColors.neutro.white[50],
                display:         "flex",
                alignItems:      "center",
                justifyContent:  "center",
                height:          44,
                marginLeft:      8,
                marginRight:     8,
                marginBottom:    4,
                borderRadius:    "8px",
                backgroundColor: "transparent",
              } as CSSProperties}
            >
              <HomeGlyph size={22} color="white" />
            </div>
          </Tooltip>
        ) : (
          <div
            role="button"
            tabIndex={0}
            aria-label="Inicio"
            onClick={onHome}
            onKeyDown={e => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                onHome?.()
              }
            }}
            className="hce-sidebar-row"
            style={{
              "--row-hover-bg": hceColors.primary.blue[50],
              display:    "flex",
              alignItems: "center",
              gap:        8,
              marginLeft: 8,
              marginRight: 8,
              paddingTop:  "10px",
              paddingBottom: "10px",
              paddingLeft: 12,
              paddingRight: 12,
              borderRadius: "8px",
            } as CSSProperties}
          >
            {/* blue[600] == --ds-color-interactive exactamente — reactivo al
                tema activo de DSProvider, mismo hex de siempre como fallback. */}
            <HomeGlyph size={20} color={`var(--ds-color-interactive, ${hceColors.primary.blue[600]})`} />
            <span style={{
              fontFamily: hceTypography.fontFamily,
              fontSize:   "0.85rem",
              fontWeight: 600,
              color:      `var(--ds-color-interactive, ${hceColors.primary.blue[600]})`,
            }}>
              Inicio
            </span>
          </div>
        )}

        {/* Divisor */}
        {!collapsed && opciones.length > 0 && (
          <div style={{
            marginLeft: 16,
            marginRight: 16,
            marginTop: 4,
            marginBottom: 4,
            borderTop: `1px solid ${hceColors.primary.blue[100]}`,
          }} />
        )}

        {/* Etiqueta "Menu" — encabezado del grupo de opciones MAC. Expandido: entre el
            divisor y la primera opción. Colapsado: se mantiene arriba del ícono de la
            primera opción (fondo azul, por eso el color blanco translúcido). */}
        {opciones.length > 0 && (
          <div style={{
            fontFamily:    hceTypography.fontFamily,
            fontSize:      "0.68rem",
            fontWeight:    700,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            textAlign:     collapsed ? "center" : "left",
            color:         collapsed ? "rgba(255,255,255,0.55)" : hceColors.neutro.black[300],
            marginLeft:    collapsed ? 0 : 20,
            marginRight:   collapsed ? 0 : 20,
            marginTop:     collapsed ? 8 : 4,
            marginBottom:  4,
          }}>
            Menu
          </div>
        )}

        {/* Opciones desde MAC */}
        {opciones.map(op => (
          <FirstLevelItem
            key={op.idMenu ?? op.codigo}
            item={op}
            collapsed={collapsed}
            currentPath={currentPath}
            onNavigate={onNavigate}
            multiLevel={multiLevel}
          />
        ))}
      </div>
    </div>
  )
}
