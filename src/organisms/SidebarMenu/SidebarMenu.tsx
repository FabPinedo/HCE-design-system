import "./SidebarMenu.css"
import type { MenuItemData } from "./types"

interface Props {
  items:        MenuItemData[]
  collapsed?:   boolean
  onNavigate:   (path: string) => void
  currentPath?: string
  /** Hook de pruebas E2E — id base, sufijado `-{path}` en cada ítem. */
  testId?: string
}

export function SidebarMenu({ items, onNavigate, currentPath = "", testId }: Props) {
  // Pick the most-specific item that matches the current path
  const activePath = items.reduce<string | null>((best, item) => {
    const matches = currentPath === item.path
      || currentPath.startsWith(item.path + "/")
    if (!matches) return best
    if (!best || item.path.length > best.length) return item.path
    return best
  }, null)

  return (
    <nav className="jarvis-sidebar-menu" aria-label="Menú principal">
      <ul className="jarvis-menu-list" role="list">
        {items.map((item) => {
          const isActive = item.path === activePath
          return (
            <li
              key={item.path}
              role="button"
              tabIndex={0}
              aria-current={isActive ? "page" : undefined}
              aria-label={item.label}
              data-testid={testId ? `${testId}-${item.path}` : undefined}
              className={`jarvis-menu-item${isActive ? " active" : ""}`}
              onClick={() => onNavigate(item.path)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  onNavigate(item.path)
                }
              }}
            >
              {item.icon && (
                <span className="jarvis-menu-icon" aria-hidden="true">{item.icon}</span>
              )}
              <span className="jarvis-menu-label">{item.label}</span>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
