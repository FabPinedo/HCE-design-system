import { useRef, useState }                from "react"
import "./Header.css"
import { Menu } from "../../atoms/Menu/Menu"
import { CheckedCircleIcon, HceInfoIcon, WarningIcon, MenuBurgerIcon } from "../../atoms/Icon/SvgIcons"
import { hceColors, hceTypography, hceShadows } from "../../tokens/hce.tokens"

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
  success: <CheckedCircleIcon size={18} color={hceColors.alert.success[500]} />,
  info:    <HceInfoIcon      size={18} color={hceColors.alert.info[500]} />,
  warning: <WarningIcon      size={18} color={hceColors.alert.warning[500]} />,
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

/** Ícono de campana — inline (se integra al sistema de íconos en el paso dedicado) */
function BellGlyph() {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  )
}
/** Ícono de cruz médica — inline */
function HospitalGlyph() {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 6v12M6 12h12" />
      <rect x="3" y="3" width="18" height="18" rx="2" />
    </svg>
  )
}
/** Chevron abajo — inline */
function ChevronDownGlyph({ color = "currentColor" }: { color?: string }) {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

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
  const userTriggerRef  = useRef<HTMLButtonElement>(null)
  const notifTriggerRef = useRef<HTMLButtonElement>(null)
  const [userOpen,  setUserOpen]  = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [notifs, setNotifs]       = useState<Notification[]>(INITIAL_NOTIFICATIONS)

  const unread = notifs.filter(n => !n.read).length

  const handleUserClose = () => setUserOpen(false)
  const handleLogout    = () => { handleUserClose(); onLogout?.() }

  const handleNotifOpen  = () => {
    setNotifOpen(true)
    setNotifs(prev => prev.map(n => ({ ...n, read: true })))
  }
  const handleNotifClose = () => setNotifOpen(false)

  const initials = userName
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("")

  return (
    <header
      style={{
        height:          64,
        backgroundColor: hceColors.primary.blue[600],
        display:         "flex",
        alignItems:      "center",
        padding:         "0 24px",
        width:           "100%",
        flexShrink:      0,
        position:        "relative",
        boxSizing:       "border-box",
      }}
    >
      {/* ── Izquierda ── */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 12 }}>
        {onToggleSidebar && (
          <button
            type="button"
            className="hce-header-iconbtn hce-header-toggle-sidebar"
            onClick={onToggleSidebar}
          >
            <MenuBurgerIcon size={20} color="#ffffff" />
          </button>
        )}
        {date && (
          <span className="hce-header-date" style={{
            fontFamily: hceTypography.fontFamily,
            color:      "rgba(255,255,255,0.85)",
            fontSize:   "0.78rem",
          }}>
            {date}
          </span>
        )}
        {site && (
          <span className="hce-header-site" style={{
            fontFamily:      hceTypography.fontFamily,
            color:           "rgba(255,255,255,0.9)",
            fontSize:        "0.72rem",
            backgroundColor: "rgba(255,255,255,0.15)",
            padding:         "2.4px 8px",
            borderRadius:    "4px",
          }}>
            {site}
          </span>
        )}
      </div>

      {/* ── Centro: logo ── */}
      <div className="hce-header-logo" style={{
        position:   "absolute",
        left:       "50%",
        transform:  "translateX(-50%)",
        alignItems: "center",
        gap:        8,
      }}>
        <div style={{
          width:           38,
          height:          38,
          borderRadius:    "8px",
          backgroundColor: hceColors.neutro.white[50],
          display:         "flex",
          alignItems:      "center",
          justifyContent:  "center",
          flexShrink:      0,
        }}>
          <span style={{ color: hceColors.primary.blue[600], display: "flex" }}>
            <HospitalGlyph />
          </span>
        </div>
        <div>
          <div style={{
            fontFamily: hceTypography.fontFamily,
            color:      "rgba(255,255,255,0.8)",
            fontSize:   "0.65rem",
            lineHeight: 1,
          }}>
            Clínica
          </div>
          <div style={{
            fontFamily: hceTypography.fontFamily,
            color:      hceColors.neutro.white[50],
            fontWeight: 700,
            fontSize:   "0.9rem",
            lineHeight: 1.2,
          }}>
            XXXXXXX
          </div>
        </div>
      </div>

      {/* ── Derecha ── */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 16 }}>

        {/* Campana */}
        <button
          ref={notifTriggerRef}
          type="button"
          className="hce-header-iconbtn"
          onClick={handleNotifOpen}
          aria-label="Notificaciones"
        >
          <span style={{ position: "relative", display: "flex" }}>
            <BellGlyph />
            {unread > 0 && (
              <span style={{
                position: "absolute",
                top: -4,
                right: -4,
                minWidth: 16,
                height: 16,
                padding: "0 3px",
                borderRadius: 8,
                backgroundColor: hceColors.alert.error[500],
                color: "#fff",
                fontSize: "0.6rem",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                lineHeight: 1,
              }}>
                {unread}
              </span>
            )}
          </span>
        </button>

        {/* Dropdown notificaciones */}
        <Menu
          open={notifOpen}
          onClose={handleNotifClose}
          anchorRef={notifTriggerRef}
          align="right"
          aria-label="Notificaciones"
          panelStyle={{
            width: 320,
            maxWidth: "calc(100vw - 16px)",
            boxShadow: hceShadows.float,
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          {/* Header del panel */}
          <div style={{
            padding:         "12px 16px",
            backgroundColor: hceColors.primary.blue[600],
            display:         "flex",
            alignItems:      "center",
            justifyContent:  "space-between",
          }}>
            <span style={{
              fontFamily: hceTypography.fontFamily,
              color:      hceColors.neutro.white[50],
              fontWeight: 700,
              fontSize:   "0.85rem",
            }}>
              Notificaciones
            </span>
            <span style={{
              fontFamily:      hceTypography.fontFamily,
              color:           hceColors.neutro.white[50],
              fontSize:        "0.7rem",
              backgroundColor: "rgba(255,255,255,0.2)",
              padding:         "2px 8px",
              borderRadius:    "10px",
            }}>
              {notifs.length} nuevas
            </span>
          </div>

          {/* Lista */}
          {notifs.map((n, i) => (
            <div key={n.id}>
              <div className="hce-header-notif-row" style={{
                display:         "flex",
                gap:             12,
                padding:         "12px 16px",
                alignItems:      "flex-start",
                backgroundColor: hceColors.neutro.white[50],
                cursor:          "default",
                boxSizing:       "border-box",
              }}>
                <div style={{ marginTop: "2px", flexShrink: 0 }}>
                  {NOTIF_ICON[n.type]}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontFamily: hceTypography.fontFamily,
                    fontSize:   "0.8rem",
                    fontWeight: 700,
                    color:      hceColors.neutro.black[400],
                    lineHeight: 1.3,
                  }}>
                    {n.title}
                  </div>
                  <div style={{
                    fontFamily: hceTypography.fontFamily,
                    fontSize:   "0.75rem",
                    color:      hceColors.neutro.black[200],
                    marginTop:  "2px",
                    lineHeight: 1.4,
                  }}>
                    {n.message}
                  </div>
                  <div style={{
                    fontFamily: hceTypography.fontFamily,
                    fontSize:   "0.68rem",
                    color:      hceColors.neutro.black[200],
                    marginTop:  "4px",
                    opacity:    0.7,
                  }}>
                    {n.time}
                  </div>
                </div>
              </div>
              {i < notifs.length - 1 && <div style={{ height: 1, backgroundColor: "rgba(0,0,0,0.12)" }} />}
            </div>
          ))}

          {/* Footer */}
          <div style={{
            padding:         "8px 16px",
            borderTop:       `1px solid ${hceColors.primary.blue[100]}`,
            backgroundColor: hceColors.primary.blue[50],
          }}>
            <div
              className="hce-header-notif-footer"
              onClick={handleNotifClose}
              style={{
                fontFamily: hceTypography.fontFamily,
                fontSize:   "0.75rem",
                color:      hceColors.primary.blue[600],
                textAlign:  "center",
                cursor:     "pointer",
                fontWeight: 600,
              }}
            >
              Ver todas las notificaciones
            </div>
          </div>
        </Menu>

        {/* Avatar + nombre */}
        <button
          ref={userTriggerRef}
          type="button"
          className="hce-header-user-trigger"
          onClick={() => setUserOpen(o => !o)}
        >
          <span style={{
            display:         "flex",
            alignItems:      "center",
            justifyContent:  "center",
            width:           36,
            height:          36,
            borderRadius:    "50%",
            backgroundColor: "rgba(255,255,255,0.25)",
            fontSize:        "0.8rem",
            fontWeight:      700,
            color:           hceColors.neutro.white[50],
            fontFamily:      hceTypography.fontFamily,
            flexShrink:      0,
          }}>
            {initials}
          </span>
          <span className="hce-header-user-text">
            <span style={{
              display: "block",
              fontFamily: hceTypography.fontFamily,
              color:      hceColors.neutro.white[50],
              fontWeight: 700,
              fontSize:   "0.85rem",
              lineHeight: 1.2,
            }}>
              {userName}
            </span>
            {userRole && (
              <span style={{
                display: "block",
                fontFamily: hceTypography.fontFamily,
                color:      "rgba(255,255,255,0.75)",
                fontSize:   "0.72rem",
                lineHeight: 1.2,
              }}>
                {userRole}
              </span>
            )}
          </span>
          <ChevronDownGlyph color="rgba(255,255,255,0.8)" />
        </button>

        {/* Dropdown usuario */}
        <Menu
          open={userOpen}
          onClose={handleUserClose}
          anchorRef={userTriggerRef}
          align="right"
          aria-label="Menú de usuario"
          panelStyle={{ minWidth: 190, boxShadow: hceShadows.card }}
        >
          <button type="button" className="hce-menu-item" onClick={handleUserClose}>Perfil</button>
          <button type="button" className="hce-menu-item" onClick={handleUserClose}>Cambiar contraseña</button>
          <div style={{ height: 1, backgroundColor: "rgba(0,0,0,0.12)" }} />
          <button type="button" className="hce-menu-item" onClick={handleLogout} style={{ color: hceColors.alert.error[500] }}>
            Cerrar sesión
          </button>
        </Menu>

      </div>
    </header>
  )
}
