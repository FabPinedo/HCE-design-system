import "./SidebarMenu.css"
import type { MenuItem } from "./types"

interface Props {
  items:        MenuItem[]
  collapsed?:   boolean
  onNavigate:   (path: string) => void
  currentPath?: string
}

export function SidebarMenu({ items, onNavigate, currentPath = "" }: Props) {
  // Pick the most-specific item that matches the current path
  const activePath = items.reduce<string | null>((best, item) => {
    const matches = currentPath === item.path
      || currentPath.startsWith(item.path + "/")
    if (!matches) return best
    if (!best || item.path.length > best.length) return item.path
    return best
  }, null)

  return (
    <nav className="jarvis-sidebar-menu">
      <ul className="jarvis-menu-list">
        {items.map((item) => (
          <li
            key={item.path}
            className={`jarvis-menu-item${item.path === activePath ? " active" : ""}`}
            onClick={() => onNavigate(item.path)}
          >
            {item.icon && (
              <span className="jarvis-menu-icon">{item.icon}</span>
            )}
            <span className="jarvis-menu-label">{item.label}</span>
          </li>
        ))}
      </ul>
    </nav>
  )
}
