import { useState, useEffect, useCallback, useRef } from "react"
import { Box, IconButton }                           from "@mui/material"
import ChevronLeftIcon  from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import { hceColors, hceTransition } from "../../tokens/hce.tokens"

// ─── Keyframes de slide ───────────────────────────────────────────────────────
// Cuatro variantes: entra desde derecha/izquierda, sale hacia izquierda/derecha.
// Se inyectan una sola vez en el <head> del SVG contenedor.
const SLIDE_MS = 380

const KEYFRAMES = `
  @keyframes hce-slide-in-right  { from { transform: translateX(100%); opacity: .85; } to { transform: translateX(0);     opacity: 1; } }
  @keyframes hce-slide-out-left  { from { transform: translateX(0);    opacity: 1;   } to { transform: translateX(-100%); opacity: .85; } }
  @keyframes hce-slide-in-left   { from { transform: translateX(-100%); opacity: .85; } to { transform: translateX(0);    opacity: 1; } }
  @keyframes hce-slide-out-right { from { transform: translateX(0);    opacity: 1;   } to { transform: translateX(100%);  opacity: .85; } }
`

// ─── Props ────────────────────────────────────────────────────────────────────

export type CarruselHomeProps = {
  /** Lista de URLs de imágenes */
  images:           string[]
  /** Alto del carrusel en px (default 300) */
  height?:          number
  /** Segundos entre avance automático — 0 desactiva (default 5) */
  autoPlaySeconds?: number
  /** Border-radius del contenedor (default "12px") */
  borderRadius?:    string | number
  /** Cómo ajustar la imagen al contenedor (default "contain") */
  objectFit?:       "contain" | "cover"
}

// ─── Componente ───────────────────────────────────────────────────────────────

export function CarruselHome({
  images,
  height          = 300,
  autoPlaySeconds = 5,
  borderRadius    = "12px",
  objectFit       = "contain",
}: CarruselHomeProps) {
  const [current,   setCurrent]   = useState(0)
  const [previous,  setPrevious]  = useState<number | null>(null)
  const [direction, setDirection] = useState<"next" | "prev">("next")
  const [paused,    setPaused]    = useState(false)
  const touchStartX = useRef<number | null>(null)
  const total = images.length

  const goTo = useCallback((index: number, dir: "next" | "prev") => {
    if (previous !== null) return  // bloquea nueva animación mientras hay una en curso
    const next = (index + total) % total
    setPrevious(current)
    setDirection(dir)
    setCurrent(next)
    setTimeout(() => setPrevious(null), SLIDE_MS)
  }, [current, previous, total])

  const prev = useCallback(() => goTo(current - 1, "prev"), [current, goTo])
  const next = useCallback(() => goTo(current + 1, "next"), [current, goTo])

  // Auto-play — se pausa cuando el mouse está sobre el carrusel
  useEffect(() => {
    if (!autoPlaySeconds || total <= 1 || paused) return
    const id = setInterval(next, autoPlaySeconds * 1000)
    return () => clearInterval(id)
  }, [next, autoPlaySeconds, total, paused])

  // Navegación por teclado (ArrowLeft / ArrowRight)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft")  prev()
      if (e.key === "ArrowRight") next()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [prev, next])

  if (total === 0) return null

  const ease   = `${SLIDE_MS}ms cubic-bezier(0.4, 0, 0.2, 1) forwards`
  const animIn  = direction === "next" ? "hce-slide-in-right"  : "hce-slide-in-left"
  const animOut = direction === "next" ? "hce-slide-out-left"  : "hce-slide-out-right"

  return (
    <Box
      role="region"
      aria-label="Carrusel de imágenes"
      tabIndex={0}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return
        const dx = e.changedTouches[0].clientX - touchStartX.current
        if (Math.abs(dx) > 40) dx < 0 ? next() : prev()
        touchStartX.current = null
      }}
      sx={{
        position:        "relative",
        width:           "100%",
        height,
        borderRadius,
        overflow:        "hidden",
        backgroundColor: hceColors.primary.blue[50],
        flexShrink:      0,
        outline:         "none",
        userSelect:      "none",
        "&:focus-visible": {
          outline:       `2px solid ${hceColors.primary.blue[500]}`,
          outlineOffset: "2px",
        },
      }}
    >
      <style>{KEYFRAMES}</style>

      {/* Imagen saliente — se superpone durante la animación */}
      {previous !== null && (
        <Box
          component="img"
          src={images[previous]}
          alt=""
          aria-hidden="true"
          sx={{
            position:  "absolute",
            inset:     0,
            width:     "100%",
            height:    "100%",
            objectFit,
            display:   "block",
            animation: `${animOut} ${ease}`,
          }}
        />
      )}

      {/* Imagen entrante / visible */}
      <Box
        component="img"
        src={images[current]}
        alt={`Slide ${current + 1} de ${total}`}
        sx={{
          position:  "absolute",
          inset:     0,
          width:     "100%",
          height:    "100%",
          objectFit,
          display:   "block",
          animation: previous !== null ? `${animIn} ${ease}` : "none",
        }}
      />

      {/* Flecha izquierda */}
      {total > 1 && (
        <IconButton
          onClick={prev}
          aria-label="Imagen anterior"
          size="small"
          sx={{
            position:        "absolute",
            left:            12,
            top:             "50%",
            transform:       "translateY(-50%)",
            backgroundColor: "rgba(255,255,255,0.85)",
            boxShadow:       `0 2px 8px rgba(0,29,69,0.18)`,
            zIndex:          2,
            transition:      `all ${hceTransition.fast}`,
            "&:hover": {
              backgroundColor: "white",
              transform:       "translateY(-50%) scale(1.1)",
              boxShadow:       `0 4px 14px rgba(0,29,69,0.22)`,
            },
          }}
        >
          <ChevronLeftIcon sx={{ color: hceColors.primary.blue[600], fontSize: 22 }} />
        </IconButton>
      )}

      {/* Flecha derecha */}
      {total > 1 && (
        <IconButton
          onClick={next}
          aria-label="Siguiente imagen"
          size="small"
          sx={{
            position:        "absolute",
            right:           12,
            top:             "50%",
            transform:       "translateY(-50%)",
            backgroundColor: "rgba(255,255,255,0.85)",
            boxShadow:       `0 2px 8px rgba(0,29,69,0.18)`,
            zIndex:          2,
            transition:      `all ${hceTransition.fast}`,
            "&:hover": {
              backgroundColor: "white",
              transform:       "translateY(-50%) scale(1.1)",
              boxShadow:       `0 4px 14px rgba(0,29,69,0.22)`,
            },
          }}
        >
          <ChevronRightIcon sx={{ color: hceColors.primary.blue[600], fontSize: 22 }} />
        </IconButton>
      )}

      {/* Dots de navegación */}
      {total > 1 && (
        <Box
          role="tablist"
          aria-label="Navegación de slides"
          sx={{
            position:  "absolute",
            bottom:    10,
            left:      "50%",
            transform: "translateX(-50%)",
            display:   "flex",
            gap:       "6px",
            zIndex:    2,
          }}
        >
          {images.map((_, i) => (
            <Box
              key={i}
              role="tab"
              aria-selected={i === current}
              aria-label={`Ir al slide ${i + 1}`}
              onClick={() => { if (i !== current) goTo(i, i > current ? "next" : "prev") }}
              sx={{
                width:           i === current ? 20 : 8,
                height:          8,
                borderRadius:    4,
                backgroundColor: i === current ? "white" : "rgba(255,255,255,0.55)",
                cursor:          "pointer",
                transition:      `width ${hceTransition.base}, background-color ${hceTransition.base}, box-shadow ${hceTransition.fast}`,
                boxShadow:       `0 1px 4px rgba(0,29,69,0.2)`,
                "&:hover": {
                  backgroundColor: i === current ? "white" : "rgba(255,255,255,0.8)",
                },
              }}
            />
          ))}
        </Box>
      )}

      {/* Indicador de pausa — punto en esquina superior derecha */}
      {paused && autoPlaySeconds > 0 && total > 1 && (
        <Box sx={{
          position:        "absolute",
          top:             10,
          right:           10,
          width:           8,
          height:          8,
          borderRadius:    "50%",
          backgroundColor: "rgba(255,255,255,0.75)",
          boxShadow:       "0 1px 3px rgba(0,0,0,0.3)",
          zIndex:          2,
          pointerEvents:   "none",
        }} />
      )}
    </Box>
  )
}
