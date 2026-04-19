import { useState }                        from "react"
import {
  Box, Typography, Badge, Avatar,
  Menu, MenuItem, Divider, IconButton,
} from "@mui/material"
import NotificationsOutlinedIcon  from "@mui/icons-material/NotificationsOutlined"
import ExpandMoreIcon              from "@mui/icons-material/ExpandMore"
import LocalHospitalOutlinedIcon  from "@mui/icons-material/LocalHospitalOutlined"
import MenuIcon                   from "@mui/icons-material/Menu"
import CheckCircleOutlineIcon     from "@mui/icons-material/CheckCircleOutline"
import InfoOutlinedIcon           from "@mui/icons-material/InfoOutlined"
import WarningAmberOutlinedIcon   from "@mui/icons-material/WarningAmberOutlined"
import { hceColors, hceTypography, hceTransition, hceShadows } from "../../tokens/hce.tokens"

// ─── Tipos de notificación ────────────────────────────────
type NotifType = "success" | "info" | "warning"

interface Notification {
  id:      number
  type:    NotifType
  title:   string
  message: string
  time:    string
  read:    boolean
}

const NOTIF_ICON = {
  success: <CheckCircleOutlineIcon sx={{ fontSize: 18, color: hceColors.alert.success[500] }} />,
  info:    <InfoOutlinedIcon       sx={{ fontSize: 18, color: hceColors.alert.info[500]    }} />,
  warning: <WarningAmberOutlinedIcon sx={{ fontSize: 18, color: hceColors.alert.warning[500] }} />,
}

const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id:      1,
    type:    "success",
    title:   "Inicio de sesión exitoso",
    message: "Bienvenido al sistema HCE.",
    time:    "Hace 1 min",
    read:    false,
  },
  {
    id:      2,
    type:    "warning",
    title:   "Cambio de contraseña obligatorio",
    message: "Tu contraseña expira en 3 días. Por favor actualízala.",
    time:    "Hace 5 min",
    read:    false,
  },
]

// ─────────────────────────────────────────────────────────
type Props = {
  date?:            string
  site?:            string
  userName?:        string
  userRole?:        string
  notifications?:   number
  onToggleSidebar?: () => void
  onLogout?:        () => void
}

export function Header({
  date,
  site,
  userName      = "Usuario",
  userRole      = "",
  onToggleSidebar,
  onLogout,
}: Props) {
  const [userAnchor,  setUserAnchor]  = useState<null | HTMLElement>(null)
  const [notifAnchor, setNotifAnchor] = useState<null | HTMLElement>(null)
  const [notifs, setNotifs]           = useState<Notification[]>(INITIAL_NOTIFICATIONS)

  const unread = notifs.filter(n => !n.read).length

  const handleUserOpen  = (e: React.MouseEvent<HTMLElement>) => setUserAnchor(e.currentTarget)
  const handleUserClose = () => setUserAnchor(null)
  const handleLogout    = () => { handleUserClose(); onLogout?.() }

  const handleNotifOpen  = (e: React.MouseEvent<HTMLElement>) => {
    setNotifAnchor(e.currentTarget)
    setNotifs(prev => prev.map(n => ({ ...n, read: true })))
  }
  const handleNotifClose = () => setNotifAnchor(null)

  const initials = userName
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("")

  return (
    <Box
      component="header"
      sx={{
        height:          64,
        backgroundColor: hceColors.primary.blue[600],
        display:         "flex",
        alignItems:      "center",
        px:              3,
        width:           "100%",
        flexShrink:      0,
        position:        "relative",
      }}
    >
      {/* ── Izquierda ── */}
      <Box sx={{ flex: 1, display: "flex", alignItems: "center", gap: 1.5 }}>
        {onToggleSidebar && (
          <IconButton
            onClick={onToggleSidebar}
            sx={{
              color:      hceColors.neutro.white[50],
              p:          0.5,
              display:    { xs: "flex", md: "none" },
              transition: `background-color ${hceTransition.fast}`,
              "&:hover":  { backgroundColor: "rgba(255,255,255,0.15)" },
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
        )}
        {date && (
          <Typography sx={{
            fontFamily: hceTypography.fontFamily,
            color:      "rgba(255,255,255,0.85)",
            fontSize:   "0.78rem",
            display:    { xs: "none", md: "block" },
          }}>
            {date}
          </Typography>
        )}
        {site && (
          <Typography sx={{
            fontFamily:      hceTypography.fontFamily,
            color:           "rgba(255,255,255,0.9)",
            fontSize:        "0.72rem",
            backgroundColor: "rgba(255,255,255,0.15)",
            px:              1,
            py:              0.3,
            borderRadius:    "4px",
            display:         { xs: "none", sm: "block" },
          }}>
            {site}
          </Typography>
        )}
      </Box>

      {/* ── Centro: logo ── */}
      <Box sx={{
        position:   "absolute",
        left:       "50%",
        transform:  "translateX(-50%)",
        display:    { xs: "none", sm: "flex" },
        alignItems: "center",
        gap:        1,
      }}>
        <Box sx={{
          width:           38,
          height:          38,
          borderRadius:    "8px",
          backgroundColor: hceColors.neutro.white[50],
          display:         "flex",
          alignItems:      "center",
          justifyContent:  "center",
          flexShrink:      0,
        }}>
          <LocalHospitalOutlinedIcon sx={{ color: hceColors.primary.blue[600], fontSize: 24 }} />
        </Box>
        <Box>
          <Typography sx={{
            fontFamily: hceTypography.fontFamily,
            color:      "rgba(255,255,255,0.8)",
            fontSize:   "0.65rem",
            lineHeight: 1,
          }}>
            Clínica
          </Typography>
          <Typography sx={{
            fontFamily: hceTypography.fontFamily,
            color:      hceColors.neutro.white[50],
            fontWeight: 700,
            fontSize:   "0.9rem",
            lineHeight: 1.2,
          }}>
            XXXXXXX
          </Typography>
        </Box>
      </Box>

      {/* ── Derecha ── */}
      <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 2 }}>

        {/* Campana */}
        <IconButton
          onClick={handleNotifOpen}
          size="small"
          sx={{
            p:          0.5,
            color:      hceColors.neutro.white[50],
            transition: `background-color ${hceTransition.fast}`,
            "&:hover":  { backgroundColor: "rgba(255,255,255,0.15)" },
          }}
        >
          <Badge
            badgeContent={unread}
            color="error"
            sx={{ "& .MuiBadge-badge": { fontSize: "0.6rem", minWidth: 16, height: 16 } }}
          >
            <NotificationsOutlinedIcon sx={{ fontSize: 22 }} />
          </Badge>
        </IconButton>

        {/* Dropdown notificaciones */}
        <Menu
          anchorEl={notifAnchor}
          open={Boolean(notifAnchor)}
          onClose={handleNotifClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          PaperProps={{
            sx: {
              mt:           1,
              width:        320,
              maxWidth:     "calc(100vw - 16px)",
              boxShadow:    hceShadows.float,
              borderRadius: "10px",
              overflow:     "hidden",
            },
          }}
        >
          {/* Header del panel */}
          <Box sx={{
            px:              2,
            py:              1.5,
            backgroundColor: hceColors.primary.blue[600],
            display:         "flex",
            alignItems:      "center",
            justifyContent:  "space-between",
          }}>
            <Typography sx={{
              fontFamily: hceTypography.fontFamily,
              color:      hceColors.neutro.white[50],
              fontWeight: 700,
              fontSize:   "0.85rem",
            }}>
              Notificaciones
            </Typography>
            <Typography sx={{
              fontFamily:      hceTypography.fontFamily,
              color:           hceColors.neutro.white[50],
              fontSize:        "0.7rem",
              backgroundColor: "rgba(255,255,255,0.2)",
              px:              1,
              py:              "2px",
              borderRadius:    "10px",
            }}>
              {notifs.length} nuevas
            </Typography>
          </Box>

          {/* Lista */}
          {notifs.map((n, i) => (
            <Box key={n.id}>
              <Box sx={{
                display:         "flex",
                gap:             1.5,
                px:              2,
                py:              1.5,
                alignItems:      "flex-start",
                backgroundColor: hceColors.neutro.white[50],
                transition:      `background-color ${hceTransition.fast}`,
                "&:hover":       { backgroundColor: hceColors.primary.blue[50] },
                cursor:          "default",
              }}>
                <Box sx={{ mt: "2px", flexShrink: 0 }}>
                  {NOTIF_ICON[n.type]}
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography sx={{
                    fontFamily: hceTypography.fontFamily,
                    fontSize:   "0.8rem",
                    fontWeight: 700,
                    color:      hceColors.neutro.black[400],
                    lineHeight: 1.3,
                  }}>
                    {n.title}
                  </Typography>
                  <Typography sx={{
                    fontFamily: hceTypography.fontFamily,
                    fontSize:   "0.75rem",
                    color:      hceColors.neutro.black[200],
                    mt:         "2px",
                    lineHeight: 1.4,
                  }}>
                    {n.message}
                  </Typography>
                  <Typography sx={{
                    fontFamily: hceTypography.fontFamily,
                    fontSize:   "0.68rem",
                    color:      hceColors.neutro.black[200],
                    mt:         "4px",
                    opacity:    0.7,
                  }}>
                    {n.time}
                  </Typography>
                </Box>
              </Box>
              {i < notifs.length - 1 && <Divider />}
            </Box>
          ))}

          {/* Footer */}
          <Box sx={{
            px:              2,
            py:              1,
            borderTop:       `1px solid ${hceColors.primary.blue[100]}`,
            backgroundColor: hceColors.primary.blue[50],
          }}>
            <Typography
              onClick={handleNotifClose}
              sx={{
                fontFamily: hceTypography.fontFamily,
                fontSize:   "0.75rem",
                color:      hceColors.primary.blue[600],
                textAlign:  "center",
                cursor:     "pointer",
                fontWeight: 600,
                transition: `opacity ${hceTransition.fast}`,
                "&:hover":  { opacity: 0.8 },
              }}
            >
              Ver todas las notificaciones
            </Typography>
          </Box>
        </Menu>

        {/* Avatar + nombre */}
        <Box
          onClick={handleUserOpen}
          sx={{
            display:    "flex",
            alignItems: "center",
            gap:        1,
            cursor:     "pointer",
            transition: `opacity ${hceTransition.fast}`,
            "&:hover":  { opacity: 0.85 },
          }}
        >
          <Avatar sx={{
            width:           36,
            height:          36,
            backgroundColor: "rgba(255,255,255,0.25)",
            fontSize:        "0.8rem",
            fontWeight:      700,
            color:           hceColors.neutro.white[50],
          }}>
            {initials}
          </Avatar>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Typography sx={{
              fontFamily: hceTypography.fontFamily,
              color:      hceColors.neutro.white[50],
              fontWeight: 700,
              fontSize:   "0.85rem",
              lineHeight: 1.2,
            }}>
              {userName}
            </Typography>
            {userRole && (
              <Typography sx={{
                fontFamily: hceTypography.fontFamily,
                color:      "rgba(255,255,255,0.75)",
                fontSize:   "0.72rem",
                lineHeight: 1.2,
              }}>
                {userRole}
              </Typography>
            )}
          </Box>
          <ExpandMoreIcon sx={{ color: "rgba(255,255,255,0.8)", fontSize: 18 }} />
        </Box>

        {/* Dropdown usuario */}
        <Menu
          anchorEl={userAnchor}
          open={Boolean(userAnchor)}
          onClose={handleUserClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          PaperProps={{
            sx: {
              mt:        1,
              minWidth:  190,
              boxShadow: hceShadows.card,
            },
          }}
        >
          <MenuItem onClick={handleUserClose}>Perfil</MenuItem>
          <MenuItem onClick={handleUserClose}>Cambiar contraseña</MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout} sx={{ color: hceColors.alert.error[500] }}>
            Cerrar sesión
          </MenuItem>
        </Menu>

      </Box>
    </Box>
  )
}
