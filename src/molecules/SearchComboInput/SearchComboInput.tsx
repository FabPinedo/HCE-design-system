import { useId, useRef, useState, useEffect } from "react";
import { Box, Paper, CircularProgress } from "@mui/material";
import {
  hceColors,
  hceTypography,
  hceTransition,
} from "../../tokens/hce.tokens";
import { ChevronDownIcon } from "../../atoms/Icon/Icon";
import { FieldCol } from "../../atoms/FieldCol/FieldCol";

// ─── Types ────────────────────────────────────────────────────────────────────

export type SearchMode = "cie_description" | "cie_code" | string;

export interface SearchModeOption {
  label: string;
  value: SearchMode;
}

export interface SearchOption {
  value: string | number;
  label: string;
  secondary?: string;
}

export interface SearchComboInputProps {
  label?: string;
  required?: boolean;
  searchMode?: SearchMode;
  onSearchModeChange?: (mode: SearchMode) => void;
  value?: string;
  onChange?: (value: string) => void;
  options?: SearchOption[];
  onSearch?: (query: string, mode: SearchMode) => void;
  onSelect?: (option: SearchOption) => void;
  loading?: boolean;
  placeholder?: string;
  disabled?: boolean;
  debounceMs?: number;
  error?: boolean;
  modes?: any[];
  modePosition?: "left" | "right";
  readOnlyInput?: boolean;
}

// ─── Componente ───────────────────────────────────────────────────────────────

export function SearchComboInput({
  label,
  searchMode = "cie_description",
  onSearchModeChange,
  value = "",
  onChange,
  options = [],
  onSearch,
  onSelect,
  loading = false,
  placeholder,
  disabled = false,
  debounceMs = 300,
  error = false,
  modes = [],
  modePosition = "left",
  readOnlyInput = false,
}: SearchComboInputProps) {
  const inputId = useId();
  const listId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 👇 NUEVO: Ref para bloquear la apertura automática indeseada
  const ignoreAutoOpen = useRef(false);

  const [modeOpen, setModeOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);

  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);

  const active = focused || hovered || modeOpen || dropOpen;

  // ── Colores reactivos ──────────────────────────────────────
  const mainColor = disabled
    ? hceColors.neutro.black[300]
    : error
      ? hceColors.alert.error[600]
      : hceColors.primary.blue[600];

  const inputTextColor = disabled
    ? hceColors.neutro.black[300]
    : error
      ? hceColors.alert.error[600]
      : active
        ? hceColors.primary.blue[600]
        : hceColors.neutro.black[700];

  const buttonHoverColor = disabled
    ? hceColors.neutro.black[300]
    : error
      ? hceColors.alert.error[700]
      : hceColors.primary.blue[700];

  // Cierra dropdowns al click fuera
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setModeOpen(false);
        setDropOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 👇 CORREGIDO: Lógica controlada de apertura del dropdown
  useEffect(() => {
    setActiveIdx(-1);

    if (options.length === 0) {
      setDropOpen(false);
      return;
    }

    // Si la bandera está activa (porque acabamos de seleccionar algo), ignoramos y apagamos la bandera
    if (ignoreAutoOpen.current) {
      ignoreAutoOpen.current = false;
      return;
    }

    // Solo abrimos automáticamente si estamos enfocados y NO es modo lectura
    if (focused && !readOnlyInput) {
      setDropOpen(true);
    }
  }, [options, focused, readOnlyInput]);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (readOnlyInput) return;

    // Al escribir, apagamos el bloqueo para que sí muestre resultados nuevos
    ignoreAutoOpen.current = false;

    const q = e.target.value;
    onChange?.(q);

    if (timerRef.current) clearTimeout(timerRef.current);
    if (q.length >= 2) {
      timerRef.current = setTimeout(
        () => onSearch?.(q, searchMode),
        debounceMs,
      );
    } else {
      setDropOpen(false);
    }
  }

  function handleInputClick() {
    if (disabled) return;
    if (options.length > 0) {
      ignoreAutoOpen.current = false; // Permitimos forzar la apertura manual
      setDropOpen(true);
    }
  }

  function handleSelectOption(opt: SearchOption) {
    // 👇 LA SOLUCIÓN AQUÍ: Bloqueamos que el useEffect reabra el menú al cambiar de valor
    ignoreAutoOpen.current = true;
    onChange?.(opt.label);
    onSelect?.(opt);
    setDropOpen(false);
    inputRef.current?.focus();
  }

  function handleModeSelect(mode: SearchMode) {
    onSearchModeChange?.(mode);
    setModeOpen(false);
    onChange?.("");
    setDropOpen(false);
    inputRef.current?.focus();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (readOnlyInput && (e.key === "Enter" || e.key === " ") && !dropOpen) {
      e.preventDefault();
      if (options.length > 0) setDropOpen(true);
      return;
    }

    if (!dropOpen || options.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, options.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && activeIdx >= 0) {
      e.preventDefault();
      handleSelectOption(options[activeIdx]);
    } else if (e.key === "Escape") {
      ignoreAutoOpen.current = true; // Evitar reaperturas indeseadas por Escape
      setDropOpen(false);
    }
  }

  const currentMode = modes.find((m) => m.value === searchMode) ||
    modes[0] || { label: "Buscar", value: "" as SearchMode };

  const defaultPlaceholder =
    searchMode === "cie_code"
      ? "Ej: J06.9, A09..."
      : "Seleccione una opción...";

  const ToggleButton = (
    <Box sx={{ position: "relative", flexShrink: 0 }}>
      <Box
        component="button"
        type="button"
        onClick={() => !disabled && setModeOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={modeOpen}
        disabled={disabled}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          height: 40,
          px: 1.5,
          py: 0,
          borderRadius: modePosition === "left" ? "8px 0 0 8px" : "0 8px 8px 0",
          border: `1.5px solid ${mainColor}`,
          borderRight:
            modePosition === "left" ? "none" : `1.5px solid ${mainColor}`,
          borderLeft:
            modePosition === "right" ? "none" : `1.5px solid ${mainColor}`,
          backgroundColor: mainColor,
          color: "#ffffff",
          fontFamily: hceTypography.fontFamily,
          fontWeight: 700,
          fontSize: "0.78rem",
          cursor: disabled ? "not-allowed" : "pointer",
          whiteSpace: "nowrap",
          outline: "none",
          transition: `background-color ${hceTransition.fast}, border-color ${hceTransition.fast}`,
          "&:hover": { backgroundColor: buttonHoverColor },
          "&:focus-visible": {
            outline: `2px solid #ffffff`,
            outlineOffset: "-3px",
          },
        }}
      >
        {currentMode.label}
        <ChevronDownIcon
          size={14}
          color="#ffffff"
          style={{
            transform: modeOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: `transform ${hceTransition.fast}`,
          }}
        />
      </Box>

      {/* Dropdown de modos */}
      {modeOpen && (
        <Paper
          elevation={4}
          sx={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: modePosition === "left" ? 0 : "auto",
            right: modePosition === "right" ? 0 : "auto",
            zIndex: 1400,
            minWidth: "120px",
            borderRadius: "8px",
            overflow: "hidden",
            border: `1px solid ${hceColors.primary.blue[100]}`,
          }}
        >
          {modes.map((m) => (
            <Box
              key={m.value}
              component="button"
              type="button"
              onClick={() => handleModeSelect(m.value)}
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                px: 2,
                py: 1.25,
                fontFamily: hceTypography.fontFamily,
                fontWeight: m.value === searchMode ? 700 : 400,
                fontSize: "0.82rem",
                color:
                  m.value === searchMode
                    ? hceColors.primary.blue[600]
                    : hceColors.neutro.black[700],
                backgroundColor:
                  m.value === searchMode
                    ? hceColors.primary.blue[50]
                    : "transparent",
                border: "none",
                cursor: "pointer",
                transition: `background-color ${hceTransition.fast}`,
                "&:hover": {
                  backgroundColor: hceColors.primary.blue[50],
                  color: hceColors.primary.blue[600],
                },
              }}
            >
              {m.label}
            </Box>
          ))}
        </Paper>
      )}
    </Box>
  );

  return (
    <Box
      ref={containerRef}
      sx={{ position: "relative", width: "100%" }}
      onMouseEnter={() => !disabled && setHovered(true)}
      onMouseLeave={() => !disabled && setHovered(false)}
    >
      <FieldCol label={label || ""} labelColor={mainColor}>
        <Box sx={{ display: "flex", position: "relative" }}>
          {modePosition === "left" && ToggleButton}

          <Box sx={{ position: "relative", flex: 1 }}>
            <Box
              id={inputId}
              ref={inputRef}
              component="input"
              type="text"
              value={value}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onClick={handleInputClick}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              disabled={disabled}
              readOnly={readOnlyInput}
              placeholder={placeholder ?? defaultPlaceholder}
              aria-autocomplete="list"
              aria-controls={dropOpen ? listId : undefined}
              aria-activedescendant={
                activeIdx >= 0 ? `${listId}-opt-${activeIdx}` : undefined
              }
              aria-label={label ?? "Buscar"}
              sx={{
                display: "block",
                width: "100%",
                height: 40,
                px: "12px",
                pr: loading || readOnlyInput ? "36px" : "12px",
                borderRadius:
                  modePosition === "left" ? "0 8px 8px 0" : "8px 0 0 8px",
                border: `1.5px solid ${mainColor}`,
                borderLeft:
                  modePosition === "left" ? "none" : `1.5px solid ${mainColor}`,
                borderRight:
                  modePosition === "right"
                    ? "none"
                    : `1.5px solid ${mainColor}`,
                fontFamily: hceTypography.fontFamily,
                fontSize: "0.875rem",
                backgroundColor: disabled
                  ? hceColors.neutro.white[50]
                  : "#ffffff",
                outline: "none",
                boxSizing: "border-box",
                transition: `border-color ${hceTransition.fast}, box-shadow ${hceTransition.fast}`,

                color: inputTextColor,
                WebkitTextFillColor: inputTextColor,
                cursor: readOnlyInput && !disabled ? "pointer" : "text",

                "&::placeholder": {
                  color: mainColor,
                  WebkitTextFillColor: mainColor,
                  opacity: 1,
                  transition: `color ${hceTransition.fast}`,
                },

                ...(focused && {
                  boxShadow: error
                    ? `0 0 0 3px ${hceColors.alert.error[100]}`
                    : `0 0 0 3px ${hceColors.primary.blue[100]}`,
                  zIndex: 1,
                }),
              }}
            />

            {readOnlyInput && !loading && (
              <Box
                sx={{
                  position: "absolute",
                  right: modePosition === "left" ? 10 : 15,
                  top: "50%",
                  transform: "translateY(-50%)",
                  display: "flex",
                  pointerEvents: "none",
                }}
              >
                <ChevronDownIcon
                  size={16}
                  color={mainColor}
                  style={{
                    transform: dropOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: `transform ${hceTransition.fast}`,
                  }}
                />
              </Box>
            )}

            {loading && (
              <Box
                sx={{
                  position: "absolute",
                  right: modePosition === "left" ? 10 : 15,
                  top: "50%",
                  transform: "translateY(-50%)",
                  display: "flex",
                }}
              >
                <CircularProgress size={16} sx={{ color: mainColor }} />
              </Box>
            )}
          </Box>

          {modePosition === "right" && ToggleButton}
        </Box>

        {dropOpen && options.length > 0 && (
          <Paper
            elevation={4}
            id={listId}
            role="listbox"
            aria-label={`Resultados de búsqueda de ${currentMode.label}`}
            sx={{
              position: "absolute",
              top: "calc(100% + 4px)",
              left: 0,
              right: 0,
              zIndex: 1400,
              maxHeight: 240,
              overflowY: "auto",
              borderRadius: "8px",
              border: `1px solid ${hceColors.primary.blue[100]}`,
            }}
          >
            {options.map((opt, idx) => (
              <Box
                key={opt.value}
                id={`${listId}-opt-${idx}`}
                role="option"
                aria-selected={activeIdx === idx}
                onMouseEnter={() => setActiveIdx(idx)}
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleSelectOption(opt);
                }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  px: 2,
                  py: 1.25,
                  cursor: "pointer",
                  backgroundColor:
                    activeIdx === idx
                      ? hceColors.primary.blue[50]
                      : "transparent",
                  borderBottom: `1px solid ${hceColors.neutro.black[100]}`,
                  "&:last-child": { borderBottom: "none" },
                  transition: `background-color ${hceTransition.fast}`,
                }}
              >
                <Box
                  sx={{
                    fontFamily: hceTypography.fontFamily,
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: hceColors.neutro.black[700],
                    flex: 1,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {opt.label}
                </Box>
                {opt.secondary && (
                  <Box
                    sx={{
                      fontFamily: hceTypography.fontFamily,
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      color: hceColors.primary.blue[600],
                      ml: 1.5,
                      flexShrink: 0,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {opt.secondary}
                  </Box>
                )}
              </Box>
            ))}
          </Paper>
        )}
      </FieldCol>
    </Box>
  );
}
