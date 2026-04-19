import React, { useState, type ComponentType } from "react"
import {
  Box, Collapse, Tooltip, Typography,
} from "@mui/material"
import HomeOutlinedIcon    from "@mui/icons-material/HomeOutlined"
import ExpandMoreIcon      from "@mui/icons-material/ExpandMore"
import ChevronLeftIcon     from "@mui/icons-material/ChevronLeft"
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

// ─── Constantes de animación ──────────────────────────────────────────────────

const TRANSITION_FAST = "150ms cubic-bezier(0.4, 0, 0.2, 1)"
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      setOpen(prev => !prev)
    }
  }

  return (
    <Box>
      <Box
        role="button"
        tabIndex={0}
        aria-label={`${item.titulo}, grupo expandible`}
        aria-expanded={open}
        onClick={() => setOpen(prev => !prev)}
        onKeyDown={handleKeyDown}
        sx={{
          display:         "flex",
          alignItems:      "center",
          pr:              1.5,
          py:              "7px",
          borderRadius:    "0 8px 8px 0",
          cursor:          "pointer",
          backgroundColor: grandActive || open ? hceColors.primary.blue[50] : "transparent",
          transition:      `background-color ${TRANSITION_FAST}, transform ${TRANSITION_FAST}`,
          "&:hover": {
            backgroundColor: hceColors.primary.blue[50],
            transform:       "translateX(2px)",
          },
          "&:focus-visible": {
            outline:      `2px solid ${hceColors.primary.blue[500]}`,
            outlineOffset: "2px",
          },
          userSelect: "none",
        }}
      >
        <Box sx={{
          width:           14,
          height:          1,
          flexShrink:      0,
          backgroundColor: hceColors.primary.blue[200],
          mr:              1,
        }} />
        <Typography sx={{
          fontFamily:   hceTypography.fontFamily,
          fontSize:     "0.78rem",
          fontWeight:   grandActive || open ? 700 : 500,
          color:        grandActive || open ? hceColors.primary.blue[600] : hceColors.neutro.black[400],
          lineHeight:   1.3,
          flex:         1,
          overflow:     "hidden",
          textOverflow: "ellipsis",
          whiteSpace:   "nowrap",
        }}>
          {item.titulo}
        </Typography>
        <ExpandMoreIcon sx={{
          fontSize:   14,
          color:      open ? hceColors.primary.blue[500] : hceColors.neutro.black[100],
          transform:  open ? "rotate(180deg)" : "rotate(0deg)",
          transition: `transform ${TRANSITION_FAST}`,
          flexShrink: 0,
        }} />
      </Box>

      <Collapse in={open} unmountOnExit>
        <Box sx={{ ml: 2, borderLeft: `2px solid ${hceColors.primary.blue[50]}` }}>
          {visibleKids.map(gc => {
            const isGcActive = currentPath === gc.vista

            const handleGcKeyDown = (e: React.KeyboardEvent) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                onNavigate(gc.vista!)
              }
            }

            return (
              <Box
                key={gc.idMenu ?? gc.codigo}
                role="button"
                tabIndex={0}
                aria-label={gc.titulo}
                aria-current={isGcActive ? "page" : undefined}
                onClick={() => onNavigate(gc.vista!)}
                onKeyDown={handleGcKeyDown}
                sx={{
                  display:         "flex",
                  alignItems:      "center",
                  pr:              1,
                  py:              "6px",
                  borderRadius:    "0 8px 8px 0",
                  cursor:          "pointer",
                  backgroundColor: isGcActive ? hceColors.primary.blue[50] : "transparent",
                  borderLeft:      isGcActive
                    ? `3px solid ${hceColors.primary.blue[600]}`
                    : "3px solid transparent",
                  transition:      `background-color ${TRANSITION_FAST}, transform ${TRANSITION_FAST}`,
                  "&:hover": {
                    backgroundColor: hceColors.primary.blue[50],
                    transform:       "translateX(2px)",
                  },
                  "&:focus-visible": {
                    outline:       `2px solid ${hceColors.primary.blue[500]}`,
                    outlineOffset: "2px",
                  },
                  userSelect: "none",
                }}
              >
                <Box sx={{
                  width:           10,
                  height:          1,
                  flexShrink:      0,
                  backgroundColor: isGcActive ? hceColors.primary.blue[400] : hceColors.primary.blue[100],
                  mr:              0.75,
                }} />
                <Typography sx={{
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
                </Typography>
              </Box>
            )
          })}
        </Box>
      </Collapse>
    </Box>
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

  const handleClick = (e: React.MouseEvent) => {
    if (collapsed) return
    e.stopPropagation()
    if (hasChildren) {
      setOpen(prev => !prev)
    } else if (canNavigate) {
      onNavigate(item.vista!)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
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
        <Box
          role="button"
          tabIndex={0}
          aria-label={item.titulo}
          aria-current={isActive ? "page" : undefined}
          sx={{
            display:         "flex",
            alignItems:      "center",
            justifyContent:  "center",
            height:          44,
            mx:              1,
            mb:              0.5,
            borderRadius:    "8px",
            cursor:          "pointer",
            backgroundColor: isActive || childActive
              ? "rgba(255,255,255,0.2)"
              : "transparent",
            transition:      `background-color ${TRANSITION_FAST}, transform ${TRANSITION_FAST}`,
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.15)",
              transform:       "translateX(2px)",
            },
            "&:focus-visible": {
              outline:       `2px solid ${hceColors.neutro.white[50]}`,
              outlineOffset: "2px",
            },
          }}
        >
          {IconComp ? (
            <IconComp size={22} color="white" />
          ) : (
            <Box sx={{
              width:           30,
              height:          30,
              borderRadius:    "50%",
              backgroundColor: "rgba(255,255,255,0.2)",
              display:         "flex",
              alignItems:      "center",
              justifyContent:  "center",
            }}>
              <Typography sx={{
                fontFamily: hceTypography.fontFamily,
                color:      hceColors.neutro.white[50],
                fontSize:   "0.65rem",
                fontWeight: 700,
                lineHeight: 1,
              }}>
                {abbr(item.titulo)}
              </Typography>
            </Box>
          )}
        </Box>
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
    <Box>
      <Box
        role="button"
        tabIndex={0}
        aria-label={item.titulo}
        aria-expanded={hasChildren ? open : undefined}
        aria-current={isActive ? "page" : undefined}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        sx={{
          display:         "flex",
          alignItems:      "center",
          gap:             1,
          mx:              1,
          px:              1.5,
          py:              "10px",
          borderRadius:    "8px",
          cursor:          "pointer",
          backgroundColor: parentBg,
          borderLeft:      isActive
            ? `3px solid ${hceColors.primary.blue[600]}`
            : "3px solid transparent",
          paddingLeft:     isActive ? "9px" : "12px",
          transition:      `background-color ${TRANSITION_FAST}, transform ${TRANSITION_FAST}`,
          "&:hover": {
            backgroundColor: isActive
              ? hceColors.primary.blue[100]
              : hceColors.primary.blue[50],
            transform: "translateX(2px)",
          },
          "&:focus-visible": {
            outline:       `2px solid ${hceColors.primary.blue[500]}`,
            outlineOffset: "2px",
          },
          userSelect: "none",
        }}
      >
        {/* Icono o avatar abreviatura */}
        <Box sx={{
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
            <IconComp size={15} color={hceColors.primary.blue[600]} />
          ) : (
            <Typography sx={{
              fontFamily: hceTypography.fontFamily,
              color:      hceColors.primary.blue[700],
              fontSize:   "0.6rem",
              fontWeight: 700,
            }}>
              {abbr(item.titulo)}
            </Typography>
          )}
        </Box>

        <Typography sx={{
          fontFamily:   hceTypography.fontFamily,
          fontSize:     "0.82rem",
          fontWeight:   isActive || childActive || open ? 700 : 500,
          color:        isActive || childActive
            ? hceColors.primary.blue[700]
            : open ? hceColors.primary.blue[600] : hceColors.neutro.black[400],
          flex:         1,
          lineHeight:   1.3,
          overflow:     "hidden",
          textOverflow: "ellipsis",
          whiteSpace:   "nowrap",
          opacity:      1,
          transform:    "translateX(0)",
          transition:   `opacity ${TRANSITION_FAST}, transform ${TRANSITION_FAST}`,
        }}>
          {item.titulo}
        </Typography>

        {hasChildren && (
          <ExpandMoreIcon sx={{
            fontSize:   16,
            color:      open ? hceColors.primary.blue[500] : hceColors.neutro.black[100],
            transform:  open ? "rotate(180deg)" : "rotate(0deg)",
            transition: `transform ${TRANSITION_FAST}`,
            flexShrink: 0,
          }} />
        )}
      </Box>

      {/* Submenú nivel 2 */}
      {hasChildren && (
        <Collapse in={open} unmountOnExit>
          <Box sx={{
            ml:         3.5,
            mr:         1,
            mb:         0.5,
            pl:         0,
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

              const handleChildKeyDown = (e: React.KeyboardEvent) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  onNavigate(child.vista!)
                }
              }

              return (
                <Box key={child.idMenu ?? child.codigo}>
                  <Box
                    role="button"
                    tabIndex={0}
                    aria-label={child.titulo}
                    aria-current={isChildActive ? "page" : undefined}
                    onClick={() => onNavigate(child.vista!)}
                    onKeyDown={handleChildKeyDown}
                    sx={{
                      display:         "flex",
                      alignItems:      "center",
                      pr:              1.5,
                      py:              "7px",
                      borderRadius:    "0 8px 8px 0",
                      cursor:          "pointer",
                      backgroundColor: isChildActive ? hceColors.primary.blue[50] : "transparent",
                      borderLeft:      isChildActive
                        ? `3px solid ${hceColors.primary.blue[600]}`
                        : "3px solid transparent",
                      transition:      `background-color ${TRANSITION_FAST}, transform ${TRANSITION_FAST}`,
                      "&:hover": {
                        backgroundColor: hceColors.primary.blue[50],
                        transform:       "translateX(2px)",
                      },
                      "&:focus-visible": {
                        outline:       `2px solid ${hceColors.primary.blue[500]}`,
                        outlineOffset: "2px",
                      },
                      userSelect: "none",
                    }}
                  >
                    {/* Conector horizontal */}
                    <Box sx={{
                      width:           14,
                      height:          1,
                      flexShrink:      0,
                      backgroundColor: isChildActive
                        ? hceColors.primary.blue[400]
                        : hceColors.primary.blue[200],
                      mr:              1,
                    }} />
                    <Typography sx={{
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
                    </Typography>
                  </Box>

                  {grandkidsWithVista.length > 0 && (
                    <Box sx={{ ml: 2, borderLeft: `2px solid ${hceColors.primary.blue[50]}` }}>
                      {grandkidsWithVista.map(gc => {
                        const isGcActive = currentPath === gc.vista

                        const handleGcKeyDown = (e: React.KeyboardEvent) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault()
                            onNavigate(gc.vista!)
                          }
                        }

                        return (
                          <Box
                            key={gc.idMenu ?? gc.codigo}
                            role="button"
                            tabIndex={0}
                            aria-label={gc.titulo}
                            aria-current={isGcActive ? "page" : undefined}
                            onClick={() => onNavigate(gc.vista!)}
                            onKeyDown={handleGcKeyDown}
                            sx={{
                              display:         "flex",
                              alignItems:      "center",
                              pr:              1,
                              py:              "6px",
                              borderRadius:    "0 8px 8px 0",
                              cursor:          "pointer",
                              backgroundColor: isGcActive ? hceColors.primary.blue[50] : "transparent",
                              borderLeft:      isGcActive
                                ? `3px solid ${hceColors.primary.blue[600]}`
                                : "3px solid transparent",
                              transition:      `background-color ${TRANSITION_FAST}, transform ${TRANSITION_FAST}`,
                              "&:hover": {
                                backgroundColor: hceColors.primary.blue[50],
                                transform:       "translateX(2px)",
                              },
                              "&:focus-visible": {
                                outline:       `2px solid ${hceColors.primary.blue[500]}`,
                                outlineOffset: "2px",
                              },
                              userSelect: "none",
                            }}
                          >
                            <Box sx={{
                              width:           10,
                              height:          1,
                              flexShrink:      0,
                              backgroundColor: isGcActive
                                ? hceColors.primary.blue[400]
                                : hceColors.primary.blue[100],
                              mr:              0.75,
                            }} />
                            <Typography sx={{
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
                            </Typography>
                          </Box>
                        )
                      })}
                    </Box>
                  )}
                </Box>
              )
            })}
          </Box>
        </Collapse>
      )}
    </Box>
  )
}

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

  const handleToggleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      onToggle()
    }
  }

  const containerSx = floating
    ? {
        width:           collapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH,
        height:          "100%",
        display:         "flex",
        flexDirection:   "column" as const,
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
        flexDirection:   "column" as const,
        flexShrink:      0,
        transition:      hceTransition_width,
        overflow:        "hidden",
        backgroundColor: collapsed ? hceColors.primary.blue[600] : "white",
        boxShadow:       hceShadows.sidebar,
        borderRight:     `1px solid ${hceColors.primary.blue[100]}`,
      }

  return (
    <Box
      sx={{ ...containerSx, cursor: collapsed ? "pointer" : "default" }}
      onClick={collapsed ? onToggle : undefined}
      onKeyDown={collapsed ? handleToggleKeyDown : undefined}
      tabIndex={collapsed ? 0 : undefined}
      role={collapsed ? "button" : undefined}
      aria-label={collapsed ? "Expandir menú lateral" : undefined}
    >

      {/* ── Cabecera ─────────────────────────────────────────── */}
      <Box sx={{
        height:          64,
        backgroundColor: hceColors.primary.blue[600],
        display:         "flex",
        alignItems:      "center",
        justifyContent:  collapsed ? "center" : "space-between",
        px:              collapsed ? 0 : 2,
        flexShrink:      0,
      }}>
        {collapsed ? (
          <Box
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
            sx={{
              width:      40,
              height:     40,
              display:    "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius:   "50%",
              cursor:         "pointer",
              transition:     `background-color ${TRANSITION_FAST}`,
              "&:hover":      { backgroundColor: "rgba(255,255,255,0.15)" },
              "&:focus-visible": {
                outline:       `2px solid ${hceColors.neutro.white[50]}`,
                outlineOffset: "2px",
              },
            }}
          >
            <UiIsotipoClinicaIcon size={28} color="white" />
          </Box>
        ) : (
          <>
            <LogoClinicaSanFelipeIcon width={110} />
            <Box
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
              sx={{
                width:           30,
                height:          30,
                display:         "flex",
                alignItems:      "center",
                justifyContent:  "center",
                borderRadius:    "50%",
                cursor:          "pointer",
                backgroundColor: "rgba(255,255,255,0.15)",
                flexShrink:      0,
                transition:      `background-color ${TRANSITION_FAST}`,
                "&:hover":       { backgroundColor: "rgba(255,255,255,0.25)" },
                "&:focus-visible": {
                  outline:       `2px solid ${hceColors.neutro.white[50]}`,
                  outlineOffset: "2px",
                },
              }}
            >
              <ChevronLeftIcon sx={{ color: "white", fontSize: 18 }} />
            </Box>
          </>
        )}
      </Box>

      {/* ── Contenido del menú ───────────────────────────────── */}
      <Box sx={{
        flex:       1,
        overflowY:  "auto",
        overflowX:  "hidden",
        py:         1,
        backgroundColor: collapsed ? hceColors.primary.blue[600] : "white",
        "&::-webkit-scrollbar": { width: 4 },
        "&::-webkit-scrollbar-track": {
          backgroundColor: collapsed
            ? hceColors.primary.blue[700]
            : hceColors.primary.blue[50],
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: collapsed
            ? "rgba(255,255,255,0.3)"
            : hceColors.primary.blue[200],
          borderRadius: 4,
        },
      }}>

        {/* Item Home */}
        {collapsed ? (
          <Tooltip title="Inicio" placement="right" arrow>
            <Box
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
              sx={{
                display:         "flex",
                alignItems:      "center",
                justifyContent:  "center",
                height:          44,
                mx:              1,
                mb:              0.5,
                borderRadius:    "8px",
                cursor:          "pointer",
                backgroundColor: "transparent",
                transition:      `background-color ${TRANSITION_FAST}, transform ${TRANSITION_FAST}`,
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.15)",
                  transform:       "translateX(2px)",
                },
                "&:focus-visible": {
                  outline:       `2px solid ${hceColors.neutro.white[50]}`,
                  outlineOffset: "2px",
                },
              }}
            >
              <HomeOutlinedIcon sx={{ color: "white", fontSize: 22 }} />
            </Box>
          </Tooltip>
        ) : (
          <Box
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
            sx={{
              display:    "flex",
              alignItems: "center",
              gap:        1,
              mx:         1,
              px:         1.5,
              py:         "10px",
              borderRadius: "8px",
              cursor:       "pointer",
              transition:   `background-color ${TRANSITION_FAST}, transform ${TRANSITION_FAST}`,
              "&:hover": {
                backgroundColor: hceColors.primary.blue[50],
                transform:       "translateX(2px)",
              },
              "&:focus-visible": {
                outline:       `2px solid ${hceColors.primary.blue[500]}`,
                outlineOffset: "2px",
              },
              userSelect: "none",
            }}
          >
            <HomeOutlinedIcon sx={{ color: hceColors.primary.blue[600], fontSize: 20 }} />
            <Typography sx={{
              fontFamily: hceTypography.fontFamily,
              fontSize:   "0.85rem",
              fontWeight: 600,
              color:      hceColors.primary.blue[600],
              opacity:    collapsed ? 0 : 1,
              transform:  collapsed ? "translateX(-6px)" : "translateX(0)",
              transition: `opacity ${TRANSITION_FAST}, transform ${TRANSITION_FAST}`,
            }}>
              Inicio
            </Typography>
          </Box>
        )}

        {/* Divisor */}
        {!collapsed && opciones.length > 0 && (
          <Box sx={{
            mx:        2,
            my:        0.5,
            borderTop: `1px solid ${hceColors.primary.blue[100]}`,
          }} />
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
      </Box>
    </Box>
  )
}

// Valor literal para evitar dependencia circular en el mismo módulo
const hceTransition_width = "width 220ms cubic-bezier(0.4, 0, 0.2, 1), min-width 220ms cubic-bezier(0.4, 0, 0.2, 1)"
