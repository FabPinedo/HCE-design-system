import { useId, useRef, useState, useEffect } from "react"
import "./SearchComboInput.css"
import { hceColors, hceTypography, hceTransition } from "../../tokens/hce.tokens"
import { ChevronDownIcon } from "../../atoms/Icon/Icon"

// Sombra de MUI Paper elevation=4
const ELEVATION_4_SHADOW =
  "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)"

// ─── Types ────────────────────────────────────────────────────────────────────

export type SearchMode = "cie_description" | "cie_code"

export interface SearchOption {
  value:      number
  label:      string
  secondary?: string
}

export interface SearchComboInputProps {
  label?:              string
  required?:           boolean
  searchMode?:         SearchMode
  onSearchModeChange?: (mode: SearchMode) => void
  value?:              string
  onChange?:           (value: string) => void
  /** Opciones para el dropdown. El padre las provee tras llamar a la API */
  options?:            SearchOption[]
  /** Se dispara al escribir para que el padre pueda llamar a la API */
  onSearch?:           (query: string, mode: SearchMode) => void
  /** Se dispara cuando el usuario selecciona una opción del dropdown */
  onSelect?:           (option: SearchOption) => void
  loading?:            boolean
  placeholder?:        string
  disabled?:           boolean
  /** ms de debounce antes de disparar onSearch (default: 300) */
  debounceMs?:         number
}

const SEARCH_MODES: { value: SearchMode; label: string }[] = [
  { value: "cie_description", label: "Por nombre" },
  { value: "cie_code",  label: "CIE-10"     },
]

// ─── Componente ───────────────────────────────────────────────────────────────

export function SearchComboInput({
  label,
  required      = false,
  searchMode    = "cie_description",
  onSearchModeChange,
  value         = "",
  onChange,
  options       = [],
  onSearch,
  onSelect,
  loading       = false,
  placeholder,
  disabled      = false,
  debounceMs    = 300,
}: SearchComboInputProps) {
  const labelId      = useId()
  const inputId      = useId()
  const listId       = useId()
  const inputRef     = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const timerRef     = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [modeOpen,   setModeOpen]   = useState(false)
  const [dropOpen,   setDropOpen]   = useState(false)
  const [activeIdx,  setActiveIdx]  = useState(-1)

  const BLUE  = hceColors.primary.blue[600]
  const GRAY  = hceColors.neutro.black[400]
  const BORDER = hceColors.neutro.black[200]

  // Cierra dropdowns al click fuera
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setModeOpen(false)
        setDropOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Abre/cierra dropdown de opciones según si hay resultados
  useEffect(() => {
    setDropOpen(options.length > 0 && value.length > 0)
    setActiveIdx(-1)
  }, [options, value])

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const q = e.target.value
    onChange?.(q)

    if (timerRef.current) clearTimeout(timerRef.current)
    if (q.length >= 2) {
      timerRef.current = setTimeout(() => onSearch?.(q, searchMode), debounceMs)
    } else {
      setDropOpen(false)
    }
  }

  function handleSelectOption(opt: SearchOption) {
    onChange?.(opt.label)
    onSelect?.(opt)
    setDropOpen(false)
    inputRef.current?.focus()
  }

  function handleModeSelect(mode: SearchMode) {
    onSearchModeChange?.(mode)
    setModeOpen(false)
    onChange?.("")
    setDropOpen(false)
    inputRef.current?.focus()
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!dropOpen || options.length === 0) return

    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActiveIdx(i => Math.min(i + 1, options.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActiveIdx(i => Math.max(i - 1, 0))
    } else if (e.key === "Enter" && activeIdx >= 0) {
      e.preventDefault()
      handleSelectOption(options[activeIdx])
    } else if (e.key === "Escape") {
      setDropOpen(false)
    }
  }

  const currentMode = SEARCH_MODES.find(m => m.value === searchMode)!

  const defaultPlaceholder = searchMode === "cie_code"
    ? "Ej: J06.9, A09..."
    : "Ingrese texto para buscar..."

  return (
    <div ref={containerRef} style={{ position: "relative", width: "100%" }}>

      {/* Label */}
      {label && (
        <label
          id={labelId}
          htmlFor={inputId}
          style={{
            display:    "block",
            fontFamily: hceTypography.fontFamily,
            fontSize:   "0.72rem",
            fontWeight: 600,
            color:      GRAY,
            marginBottom: "4px",
          }}
        >
          {label}{required && <span style={{ color: hceColors.alert.error[600], marginLeft: "2px" }}>*</span>}
        </label>
      )}

      {/* Input row */}
      <div style={{ display: "flex", position: "relative" }}>

        {/* Toggle de modo: Por nombre / CIE-10 */}
        <div style={{ position: "relative", flexShrink: 0 }}>
          <button
            type="button"
            className="hce-scombo-mode-btn"
            onClick={() => !disabled && setModeOpen(o => !o)}
            aria-haspopup="listbox"
            aria-expanded={modeOpen}
            aria-label="Tipo de búsqueda"
            disabled={disabled}
            style={{
              backgroundColor: BLUE,
              border:          `1.5px solid ${BLUE}`,
              cursor:          disabled ? "not-allowed" : "pointer",
              opacity:         disabled ? 0.5 : 1,
            }}
          >
            {currentMode.label}
            <ChevronDownIcon
              size={14}
              color="#ffffff"
              style={{
                transform:  modeOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: `transform ${hceTransition.fast}`,
              }}
            />
          </button>

          {/* Dropdown de modos */}
          {modeOpen && (
            <div
              style={{
                position:    "absolute",
                top:         "calc(100% + 4px)",
                left:        0,
                zIndex:      1400,
                minWidth:    "120px",
                borderRadius: "8px",
                overflow:    "hidden",
                border:      `1px solid ${hceColors.primary.blue[100]}`,
                backgroundColor: "#ffffff",
                boxShadow:   ELEVATION_4_SHADOW,
              }}
            >
              {SEARCH_MODES.map(m => (
                <button
                  key={m.value}
                  type="button"
                  className="hce-scombo-mode-item"
                  onClick={() => handleModeSelect(m.value)}
                  style={{
                    fontWeight:      m.value === searchMode ? 700 : 400,
                    color:           m.value === searchMode ? BLUE : hceColors.neutro.black[700],
                    backgroundColor: m.value === searchMode ? hceColors.primary.blue[50] : "transparent",
                  }}
                >
                  {m.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Input de texto */}
        <div style={{ position: "relative", flex: 1 }}>
          <input
            id={inputId}
            ref={inputRef}
            className="hce-scombo-input"
            type="text"
            value={value}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder={placeholder ?? defaultPlaceholder}
            aria-autocomplete="list"
            aria-controls={dropOpen ? listId : undefined}
            aria-activedescendant={activeIdx >= 0 ? `${listId}-opt-${activeIdx}` : undefined}
            aria-label={label ?? "Buscar"}
            style={{
              paddingLeft:  "12px",
              paddingRight: loading ? "36px" : "12px",
              border:          `1.5px solid ${BORDER}`,
              color:           hceColors.neutro.black[700],
              backgroundColor: disabled ? hceColors.neutro.black[50] : "#ffffff",
            }}
          />
          {/* Spinner de carga */}
          {loading && (
            <span style={{
              position:  "absolute",
              right:     10,
              top:       "50%",
              transform: "translateY(-50%)",
              display:   "flex",
            }}>
              <span className="hce-scombo-spinner" />
            </span>
          )}
        </div>
      </div>

      {/* Dropdown de resultados */}
      {dropOpen && options.length > 0 && (
        <div
          id={listId}
          role="listbox"
          aria-label={`Resultados de búsqueda de ${currentMode.label}`}
          style={{
            position:     "absolute",
            top:          "calc(100% + 4px)",
            left:         0,
            right:        0,
            zIndex:       1400,
            maxHeight:    240,
            overflowY:    "auto",
            borderRadius: "8px",
            border:       `1px solid ${hceColors.primary.blue[100]}`,
            backgroundColor: "#ffffff",
            boxShadow:    ELEVATION_4_SHADOW,
          }}
        >
          {options.map((opt, idx) => (
            <div
              key={opt.value}
              id={`${listId}-opt-${idx}`}
              className="hce-scombo-option"
              role="option"
              aria-selected={activeIdx === idx}
              onMouseEnter={() => setActiveIdx(idx)}
              onMouseDown={e => { e.preventDefault(); handleSelectOption(opt) }}
              style={{
                backgroundColor: activeIdx === idx ? hceColors.primary.blue[50] : "transparent",
              }}
            >
              <span style={{
                fontFamily: hceTypography.fontFamily,
                fontSize:   "0.875rem",
                fontWeight: 500,
                color:      hceColors.neutro.black[700],
                flex:       1,
                overflow:   "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}>
                {opt.label}
              </span>
              {opt.secondary && (
                <span style={{
                  fontFamily:  hceTypography.fontFamily,
                  fontSize:    "0.72rem",
                  fontWeight:  600,
                  color:       BLUE,
                  marginLeft:  12,
                  flexShrink:  0,
                  whiteSpace:  "nowrap",
                }}>
                  {opt.secondary}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
