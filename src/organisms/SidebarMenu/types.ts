/**
 * Tipos del SidebarMenu
 *
 * Permite definir estructura de navegación
 * reutilizable en cualquier aplicación.
 */
import type { ReactNode } from "react"

export type MenuItem = {

  /** texto visible del menú */
  label: string

  /** ruta del router */
  path: string

  /** icon opcional */
  icon?: ReactNode

  /** submenus opcionales */
  children?: MenuItem[]
}
