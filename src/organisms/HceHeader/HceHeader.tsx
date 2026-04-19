import { useState }                       from "react"
import {
  Box, Typography, Badge, Avatar,
  Menu, IconButton,
  Select, FormControl, MenuItem,
  Divider, Popover,
} from "@mui/material"
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined"
import ExpandMoreIcon            from "@mui/icons-material/ExpandMore"
import { hceColors, hceTypography, hceUi, hceShadows } from "../../tokens/hce.tokens"
import { LogoClinicaSanFelipeIcon, LogoutIcon, HceBurgerIcon } from "../../atoms/Icon/SvgIconsHce"
import {
  CheckedCircleIcon, DangerIcon, HceInfoIcon, WarningIcon,
} from "../../atoms/Icon/SvgIcons"

// ─── Tipos públicos ───────────────────────────────────────────────────────────

export type Sucursal = {
  id:     string | number
  nombre: string
}

export type HceNotificacion = {
  id:          number
  titulo:      string
  descripcion: string
  tipo:        "info" | "warning" | "success" | "error"
  /** Texto de fecha/hora a mostrar (ej: "Hace 2 horas", "Hoy"). Opcional. */
  fecha?:      string
  leida?:      boolean
}

// ─── Configuración visual por tipo ────────────────────────────────────────────

const TIPO_CONFIG: Record<HceNotificacion["tipo"], {
  color:   string
  bgLight: string
  Icon:    React.FC<{ color?: string; size?: number }>
}> = {
  info: {
    color:   hceColors.primary.blue[500],
    bgLight: hceColors.primary.blue[50],
    Icon:    HceInfoIcon,
  },
  warning: {
    color:   hceColors.alert.warning[500],
    bgLight: hceColors.alert.warning[50],
    Icon:    DangerIcon,
  },
  success: {
    color:   hceColors.alert.success[500],
    bgLight: hceColors.alert.success[50],
    Icon:    CheckedCircleIcon,
  },
  error: {
    color:   hceColors.alert.error[500],
    bgLight: hceColors.alert.error[50],
    Icon:    WarningIcon,
  },
}

// Notificaciones de ejemplo — en producción se pasan via props desde la API
const NOTIF_EJEMPLO: HceNotificacion[] = [
  {
    id:          1,
    titulo:      "Actualiza tu contraseña",
    descripcion: "Por seguridad, te recomendamos cambiarla periódicamente.",
    tipo:        "warning",
    fecha:       "Hace 2 días",
    leida:       false,
  },
  {
    id:          2,
    titulo:      "¡Feliz cumpleaños!",
    descripcion: "Todo el equipo de Clínica San Felipe te desea un excelente día.",
    tipo:        "success",
    fecha:       "Hoy",
    leida:       false,
  },
]

// ─── Props ────────────────────────────────────────────────────────────────────

export type HceHeaderProps = {
  sede?:             string | number
  sucursales?:       Sucursal[]
  onSedeCambiada?:  (sedeId: string | number) => void
  userName?:         string
  userRole?:         string
  onLogout?:         () => void
  /** Notificaciones externas. Si no se pasan, usa las de ejemplo. */
  notifications?:    HceNotificacion[]
  /** Callback al hacer click en "Ver todas las notificaciones" */
  onVerTodas?:       () => void
  /** Modo flotante: borderRadius + sombra para alinearse con sidebar flotante */
  floating?:         boolean
  /** Callback del botón hamburguesa — visible solo en pantallas pequeñas (< md) */
  onMenuClick?:      () => void
}

// ─── Componente ───────────────────────────────────────────────────────────────

export function HceHeader({
  sede,
  sucursales      = [],
  onSedeCambiada,
  userName        = "Usuario",
  userRole        = "",
  onLogout,
  notifications,
  onVerTodas,
  floating        = false,
  onMenuClick,
}: HceHeaderProps) {
  const [userAnchor,  setUserAnchor]  = useState<null | HTMLElement>(null)
  const [notifAnchor, setNotifAnchor] = useState<null | HTMLElement>(null)

  // Estado interno de notificaciones (leídas/no leídas)
  const [notifs, setNotifs] = useState<HceNotificacion[]>(
    notifications ?? NOTIF_EJEMPLO
  )

  const handleUserOpen   = (e: React.MouseEvent<HTMLElement>) => setUserAnchor(e.currentTarget)
  const handleUserClose  = () => setUserAnchor(null)
  const handleLogout     = () => { handleUserClose(); onLogout?.() }

  const handleNotifOpen  = (e: React.MouseEvent<HTMLElement>) => {
    setNotifAnchor(e.currentTarget)
    // Marca todas como leídas al abrir el panel (mismo comportamiento que Header.tsx)
    setNotifs(prev => prev.map(n => ({ ...n, leida: true })))
  }
  const handleNotifClose = () => setNotifAnchor(null)

  const initials = userName
    .split(" ")
    .slice(0, 2)
    .map(w => w[0]?.toUpperCase() ?? "")
    .join("")

  const multiSede    = sucursales.length > 1
  const selectedSede = String(sede ?? (sucursales[0]?.id ?? ""))
  const unreadCount  = notifs.filter(n => !n.leida).length

  return (
    <Box
      component="header"
      sx={{
        height:          64,
        backgroundColor: hceColors.primary.blue[600],
        display:         "flex",
        alignItems:      "center",
        px:              2,
        width:           "100%",
        flexShrink:      0,
        position:        "relative",
        zIndex:          10,
        ...(floating && {
          borderRadius: "12px",
          boxShadow:    hceShadows.float,
        }),
      }}
    >
      {/* ── Izquierda ────────────────────────────────────────── */}
      <Box sx={{ flex: 1, display: "flex", alignItems: "center", gap: 1.5, minWidth: 0 }}>

        {/* Hamburguesa — solo visible en pantallas pequeñas (< md = 900px) */}
        {onMenuClick && (
          <IconButton
            onClick={onMenuClick}
            size="small"
            sx={{ color: "white", p: 0.5, flexShrink: 0, display: { xs: "flex", md: "none" } }}
          >
            <HceBurgerIcon size={20} color="white" />
          </IconButton>
        )}

        <Typography sx={{
          fontFamily: hceTypography.fontFamily,
          color:      "white",
          fontWeight: 700,
          fontSize:   "0.95rem",
          whiteSpace: "nowrap",
          flexShrink: 0,
          display:    { xs: "none", md: "block" },
        }}>
          Historia Clínica
        </Typography>

        {sucursales.length > 0 && (
          <FormControl size="small" variant="standard" sx={{ minWidth: 110, maxWidth: 200 }}>
            <Select
              value={selectedSede}
              onChange={e => onSedeCambiada?.(e.target.value)}
              disabled={!multiSede}
              disableUnderline
              IconComponent={multiSede ? ExpandMoreIcon : () => null}
              sx={{
                fontFamily: hceTypography.fontFamily,
                color:      "white",
                fontSize:   "0.8rem",
                "& .MuiSelect-icon": { color: "rgba(255,255,255,0.7)", fontSize: 18 },
                "& .MuiSelect-select": {
                  py:              "4px",
                  px:              "10px !important",
                  borderRadius:    "6px",
                  backgroundColor: "rgba(255,255,255,0.15)",
                  "&.Mui-disabled": {
                    WebkitTextFillColor: "rgba(255,255,255,0.85)",
                    cursor:              "default",
                  },
                },
              }}
            >
              {sucursales.map(s => (
                <MenuItem
                  key={String(s.id)}
                  value={String(s.id)}
                  sx={{ fontFamily: hceTypography.fontFamily, fontSize: "0.82rem" }}
                >
                  {s.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </Box>

      {/* ── Centro: logo ─────────────────────────────────────── */}
      <Box sx={{
        position:      "absolute",
        left:          "50%",
        transform:     "translateX(-50%)",
        display:       "flex",
        alignItems:    "center",
        pointerEvents: "none",
      }}>
        <LogoClinicaSanFelipeIcon width={123} />
      </Box>

      {/* ── Derecha ──────────────────────────────────────────── */}
      <Box sx={{
        flex:           1,
        display:        "flex",
        alignItems:     "center",
        justifyContent: "flex-end",
        gap:            1,
        minWidth:       0,
      }}>

        {/* Campana */}
        <IconButton onClick={handleNotifOpen} size="small" sx={{ color: "white", p: 0.5, flexShrink: 0 }}>
          <Badge
            badgeContent={unreadCount}
            color="error"
            sx={{ "& .MuiBadge-badge": { fontSize: "0.58rem", minWidth: 15, height: 15 } }}
          >
            <NotificationsOutlinedIcon sx={{ fontSize: 22 }} />
          </Badge>
        </IconButton>

        {/* ── Panel de notificaciones ──────────────────────────── */}
        <Popover
          anchorEl={notifAnchor}
          open={Boolean(notifAnchor)}
          onClose={handleNotifClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          PaperProps={{
            elevation: 0,
            sx: {
              mt:           1.5,
              width:        360,
              borderRadius: "16px",
              boxShadow:    hceShadows.modal,
              overflow:     "hidden",
              border:       `1px solid ${hceColors.primary.blue[100]}`,
            },
          }}
        >
          {/* Cabecera del panel */}
          <Box sx={{
            px:              2,
            py:              1.5,
            display:         "flex",
            alignItems:      "center",
            justifyContent:  "space-between",
            backgroundColor: hceColors.primary.blue[600],
          }}>
            <Typography sx={{
              fontFamily: hceTypography.fontFamily,
              color:      "white",
              fontWeight: 700,
              fontSize:   "0.85rem",
            }}>
              Notificaciones
            </Typography>
            <Typography sx={{
              fontFamily:      hceTypography.fontFamily,
              color:           "white",
              fontSize:        "0.7rem",
              backgroundColor: "rgba(255,255,255,0.2)",
              px:              1,
              py:              "2px",
              borderRadius:    "10px",
            }}>
              {notifs.length} nuevas
            </Typography>
          </Box>

          {/* Lista de notificaciones */}
          <Box sx={{ maxHeight: 360, overflowY: "auto" }}>
            {notifs.length === 0 ? (
              <Box sx={{ py: 4, textAlign: "center" }}>
                <NotificationsOutlinedIcon sx={{ fontSize: 36, color: hceColors.primary.blue[200], mb: 1 }} />
                <Typography sx={{
                  fontFamily: hceTypography.fontFamily,
                  fontSize:   "0.82rem",
                  color:      hceColors.neutro.white[900],
                }}>
                  Sin notificaciones
                </Typography>
              </Box>
            ) : (
              notifs.map((n, idx) => {
                const cfg = TIPO_CONFIG[n.tipo]
                return (
                  <Box key={n.id}>
                    <Box sx={{
                      display:         "flex",
                      gap:             1.5,
                      px:              2,
                      py:              1.5,
                      alignItems:      "flex-start",
                      backgroundColor: hceUi.surface,
                      "&:hover":       { backgroundColor: hceUi.background },
                      cursor:          "default",
                    }}>
                      {/* Ícono del tipo */}
                      <Box sx={{ mt: "2px", flexShrink: 0 }}>
                        <cfg.Icon color={cfg.color} size={18} />
                      </Box>

                      {/* Contenido */}
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography sx={{
                          fontFamily: hceTypography.fontFamily,
                          fontSize:   "0.8rem",
                          fontWeight: 700,
                          color:      hceColors.neutro.black[400],
                          lineHeight: 1.3,
                        }}>
                          {n.titulo}
                        </Typography>
                        <Typography sx={{
                          fontFamily: hceTypography.fontFamily,
                          fontSize:   "0.75rem",
                          color:      hceUi.textSecondary,
                          mt:         "2px",
                          lineHeight: 1.4,
                        }}>
                          {n.descripcion}
                        </Typography>
                        {n.fecha && (
                          <Typography sx={{
                            fontFamily: hceTypography.fontFamily,
                            fontSize:   "0.68rem",
                            color:      hceUi.textSubtle,
                            mt:         "4px",
                            opacity:    0.8,
                          }}>
                            {n.fecha}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                    {idx < notifs.length - 1 && <Divider />}
                  </Box>
                )
              })
            )}
          </Box>

          {/* Footer */}
          <Box sx={{
            px:              2,
            py:              1,
            borderTop:       `1px solid ${hceColors.primary.blue[100]}`,
            backgroundColor: hceUi.background,
          }}>
            <Typography
              onClick={() => { handleNotifClose(); onVerTodas?.() }}
              sx={{
                fontFamily: hceTypography.fontFamily,
                fontSize:   "0.75rem",
                color:      hceColors.primary.blue[600],
                textAlign:  "center",
                cursor:     "pointer",
                fontWeight: 600,
                "&:hover":  { opacity: 0.8 },
              }}
            >
              Ver todas las notificaciones
            </Typography>
          </Box>
        </Popover>

        {/* Avatar + nombre */}
        <Box
          onClick={handleUserOpen}
          sx={{
            display:    "flex",
            alignItems: "center",
            gap:        0.75,
            cursor:     "pointer",
            minWidth:   0,
            flexShrink: 1,
          }}
        >
          <Avatar sx={{
            width:           34,
            height:          34,
            backgroundColor: "rgba(255,255,255,0.25)",
            fontSize:        "0.75rem",
            fontWeight:      700,
            color:           "white",
            flexShrink:      0,
          }}>
            {initials}
          </Avatar>

          <Box sx={{ minWidth: 0, maxWidth: 220, display: { xs: "none", sm: "block" } }}>
            <Typography sx={{
              fontFamily:   hceTypography.fontFamily,
              color:        "white",
              fontWeight:   700,
              fontSize:     "0.82rem",
              lineHeight:   1.2,
              overflow:     "hidden",
              textOverflow: "ellipsis",
              whiteSpace:   "nowrap",
            }}>
              {userName}
            </Typography>
            {userRole && (
              <Typography sx={{
                fontFamily:   hceTypography.fontFamily,
                color:        "rgba(255,255,255,0.75)",
                fontSize:     "0.7rem",
                lineHeight:   1.2,
                overflow:     "hidden",
                textOverflow: "ellipsis",
                whiteSpace:   "nowrap",
              }}>
                {userRole}
              </Typography>
            )}
          </Box>

          <ExpandMoreIcon sx={{ color: "rgba(255,255,255,0.8)", fontSize: 18, flexShrink: 0 }} />
        </Box>

        {/* Menú usuario */}
        <Menu
          anchorEl={userAnchor}
          open={Boolean(userAnchor)}
          onClose={handleUserClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          PaperProps={{ sx: {
            mt:           1,
            minWidth:     180,
            boxShadow:    hceShadows.float,
            borderRadius: "10px",
          }}}
        >
          <MenuItem
            onClick={handleLogout}
            sx={{ display: "flex", alignItems: "center", gap: 1.5, py: 1.25 }}
          >
            <LogoutIcon color={hceColors.alert.error[500]} size={14} />
            <Typography sx={{
              fontFamily: hceTypography.fontFamily,
              fontSize:   "0.85rem",
              color:      "error.main",
              fontWeight: 500,
            }}>
              Cerrar sesión
            </Typography>
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  )
}
