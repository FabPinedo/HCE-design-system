import "./HceLanguageSwitch.css"
import { useRef, useState } from "react"
import { Menu } from "../../atoms/Menu/Menu"
import { MenuItem } from "../../atoms/MenuItem/MenuItem"
import { hceTypography } from "../../tokens/hce.tokens"

// ─── Tipos públicos ───────────────────────────────────────────────────────────

export type HceLocaleOption = {
  /** Código de idioma, ej: "es", "en", "pt" */
  code: string
  /** Etiqueta visible dentro del dropdown, ej: "Español" */
  label: string
}

export type HceLanguageSwitchProps = {
  /** Idiomas disponibles a mostrar en el dropdown */
  locales: HceLocaleOption[]
  /** Código del idioma activo — debe coincidir con `code` de alguno de `locales` */
  activeLocale: string
  /** Se invoca con el `code` elegido al hacer click en una opción */
  onLocaleChange: (code: string) => void
  /** aria-label del botón trigger */
  ariaLabel?: string
  /** Hook de pruebas E2E — id base; sufija `-trigger` y `-option-{code}`. */
  testId?: string
}

/** Ícono de globo — inline, mismo criterio que los glyphs propios de HceHeader
 *  (se integra al sistema de íconos compartido en el paso dedicado) */
function GlobeGlyph() {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx={12} cy={12} r={10} />
      <line x1={2} y1={12} x2={22} y2={12} />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

/** Chevron abajo — inline, igual al usado por HceHeader */
function ChevronDownGlyph() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

/**
 * HceLanguageSwitch — botón + dropdown para elegir idioma activo.
 *
 * Componente "tonto": no sabe nada de i18next/react-i18next. Recibe la lista
 * de idiomas disponibles, cuál está activo y un callback — el consumidor
 * (remote/shell) es responsable de leer `SUPPORTED_LOCALES` y aplicar el
 * cambio (ej. vía `useLocaleSwitch()` de `@hce/i18n-core`). Mismo criterio
 * de separación que ya usa el resto del design system con MUI.
 */
export function HceLanguageSwitch({
  locales,
  activeLocale,
  onLocaleChange,
  ariaLabel = "Cambiar idioma",
  testId,
}: HceLanguageSwitchProps) {
  const triggerRef = useRef<HTMLButtonElement>(null)
  const [open, setOpen] = useState(false)

  const handleSelect = (code: string) => {
    setOpen(false)
    if (code !== activeLocale) onLocaleChange(code)
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="hce-langswitch-trigger"
        onClick={() => setOpen(o => !o)}
        aria-label={ariaLabel}
        aria-haspopup="menu"
        aria-expanded={open}
        data-testid={testId ? `${testId}-trigger` : undefined}
      >
        <GlobeGlyph />
        <span style={{
          fontFamily: hceTypography.fontFamily,
          color:      "white",
          fontWeight: 600,
          fontSize:   "0.78rem",
        }}>
          {activeLocale.toUpperCase()}
        </span>
        <ChevronDownGlyph />
      </button>

      <Menu
        open={open}
        onClose={() => setOpen(false)}
        anchorRef={triggerRef}
        align="right"
        aria-label={ariaLabel}
        panelStyle={{ minWidth: 160, borderRadius: "10px" }}
      >
        {locales.map(locale => (
          <MenuItem
            key={locale.code}
            selected={locale.code === activeLocale}
            onClick={() => handleSelect(locale.code)}
            testId={testId ? `${testId}-option-${locale.code}` : undefined}
            style={{ fontFamily: hceTypography.fontFamily, fontSize: "0.85rem" }}
          >
            {locale.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
