import { useId, useRef, useState, useEffect } from "react"
import { Box, Paper, CircularProgress } from "@mui/material"
import { hceColors, hceTypography, hceTransition } from "../../tokens/hce.tokens"
import { ChevronDownIcon } from "../../atoms/Icon/Icon"

// ─── Types ────────────────────────────────────────────────────────────────────

export type SearchMode = "nombre" | "cie10"

export interface SearchOption {
  value:      string
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
  { value: "nombre", label: "Por nombre" },
  { value: "cie10",  label: "CIE-10"     },
]

// ─── Componente ───────────────────────────────────────────────────────────────

export function SearchComboInput({
  label,
  required      = false,
  searchMode    = "nombre",
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

  const defaultPlaceholder = searchMode === "cie10"
    ? "Ej: J06.9, A09..."
    : "Ingrese texto para buscar..."

  return (
    <Box ref={containerRef} sx={{ position: "relative", width: "100%" }}>

      {/* Label */}
      {label && (
        <Box
          id={labelId}
          component="label"
          htmlFor={inputId}
          sx={{
            display:    "block",
            fontFamily: hceTypography.fontFamily,
            fontSize:   "0.72rem",
            fontWeight: 600,
            color:      GRAY,
            mb:         "4px",
          }}
        >
          {label}{required && <Box component="span" sx={{ color: hceColors.alert.error[600], ml: "2px" }}>*</Box>}
        </Box>
      )}

      {/* Input row */}
      <Box sx={{ display: "flex", position: "relative" }}>

        {/* Toggle de modo: Por nombre / CIE-10 */}
        <Box sx={{ position: "relative", flexShrink: 0 }}>
          <Box
            component="button"
            type="button"
            onClick={() => !disabled && setModeOpen(o => !o)}
            aria-haspopup="listbox"
            aria-expanded={modeOpen}
            aria-label="Tipo de búsqueda"
            disabled={disabled}
            sx={{
              display:         "flex",
              alignItems:      "center",
              gap:             "6px",
              height:          40,
              px:              1.5,
              py:              0,
              borderRadius:    "8px 0 0 8px",
              border:          `1.5px solid ${BLUE}`,
              borderRight:     "none",
              backgroundColor: BLUE,
              color:           "#ffffff",
              fontFamily:      hceTypography.fontFamily,
              fontWeight:      700,
              fontSize:        "0.78rem",
              cursor:          disabled ? "not-allowed" : "pointer",
              whiteSpace:      "nowrap",
              outline:         "none",
              transition:      `background-color ${hceTransition.fast}`,
              opacity:         disabled ? 0.5 : 1,
              "&:hover":       disabled ? {} : { backgroundColor: hceColors.primary.blue[700] },
              "&:focus-visible": {
                outline:       `2px solid #ffffff`,
                outlineOffset: "-3px",
              },
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
          </Box>

          {/* Dropdown de modos */}
          {modeOpen && (
            <Paper
              elevation={4}
              sx={{
                position:    "absolute",
                top:         "calc(100% + 4px)",
                left:        0,
                zIndex:      1400,
                minWidth:    "120px",
                borderRadius: "8px",
                overflow:    "hidden",
                border:      `1px solid ${hceColors.primary.blue[100]}`,
              }}
            >
              {SEARCH_MODES.map(m => (
                <Box
                  key={m.value}
                  component="button"
                  type="button"
                  onClick={() => handleModeSelect(m.value)}
                  sx={{
                    display:         "flex",
                    alignItems:      "center",
                    width:           "100%",
                    px:              2,
                    py:              1.25,
                    fontFamily:      hceTypography.fontFamily,
                    fontWeight:      m.value === searchMode ? 700 : 400,
                    fontSize:        "0.82rem",
                    color:           m.value === searchMode ? BLUE : hceColors.neutro.black[700],
                    backgroundColor: m.value === searchMode ? hceColors.primary.blue[50] : "transparent",
                    border:          "none",
                    cursor:          "pointer",
                    transition:      `background-color ${hceTransition.fast}`,
                    "&:hover": {
                      backgroundColor: hceColors.primary.blue[50],
                      color:           BLUE,
                    },
                  }}
                >
                  {m.label}
                </Box>
              ))}
            </Paper>
          )}
        </Box>

        {/* Input de texto */}
        <Box sx={{ position: "relative", flex: 1 }}>
          <Box
            id={inputId}
            ref={inputRef}
            component="input"
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
            sx={{
              display:         "block",
              width:           "100%",
              height:          40,
              px:              "12px",
              pr:              loading ? "36px" : "12px",
              borderRadius:    "0 8px 8px 0",
              border:          `1.5px solid ${BORDER}`,
              borderLeft:      "none",
              fontFamily:      hceTypography.fontFamily,
              fontSize:        "0.875rem",
              color:           hceColors.neutro.black[700],
              backgroundColor: disabled ? hceColors.neutro.black[50] : "#ffffff",
              outline:         "none",
              boxSizing:       "border-box",
              transition:      `border-color ${hceTransition.fast}, box-shadow ${hceTransition.fast}`,
              "&::placeholder": { color: GRAY },
              "&:focus": {
                borderColor: BLUE,
                boxShadow:   `0 0 0 3px ${hceColors.primary.blue[100]}`,
              },
            }}
          />
          {/* Spinner de carga */}
          {loading && (
            <Box sx={{
              position:  "absolute",
              right:     10,
              top:       "50%",
              transform: "translateY(-50%)",
              display:   "flex",
            }}>
              <CircularProgress size={16} sx={{ color: BLUE }} />
            </Box>
          )}
        </Box>
      </Box>

      {/* Dropdown de resultados */}
      {dropOpen && options.length > 0 && (
        <Paper
          elevation={4}
          id={listId}
          role="listbox"
          aria-label={`Resultados de búsqueda de ${currentMode.label}`}
          sx={{
            position:     "absolute",
            top:          "calc(100% + 4px)",
            left:         0,
            right:        0,
            zIndex:       1400,
            maxHeight:    240,
            overflowY:    "auto",
            borderRadius: "8px",
            border:       `1px solid ${hceColors.primary.blue[100]}`,
          }}
        >
          {options.map((opt, idx) => (
            <Box
              key={opt.value}
              id={`${listId}-opt-${idx}`}
              role="option"
              aria-selected={activeIdx === idx}
              onMouseEnter={() => setActiveIdx(idx)}
              onMouseDown={e => { e.preventDefault(); handleSelectOption(opt) }}
              sx={{
                display:         "flex",
                alignItems:      "center",
                justifyContent:  "space-between",
                px:              2,
                py:              1.25,
                cursor:          "pointer",
                backgroundColor: activeIdx === idx ? hceColors.primary.blue[50] : "transparent",
                borderBottom:    `1px solid ${hceColors.neutro.black[100]}`,
                "&:last-child":  { borderBottom: "none" },
                transition:      `background-color ${hceTransition.fast}`,
              }}
            >
              <Box sx={{
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
              </Box>
              {opt.secondary && (
                <Box sx={{
                  fontFamily:  hceTypography.fontFamily,
                  fontSize:    "0.72rem",
                  fontWeight:  600,
                  color:       BLUE,
                  ml:          1.5,
                  flexShrink:  0,
                  whiteSpace:  "nowrap",
                }}>
                  {opt.secondary}
                </Box>
              )}
            </Box>
          ))}
        </Paper>
      )}
    </Box>
  )
}
