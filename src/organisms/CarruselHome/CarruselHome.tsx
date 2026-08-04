import { useState, useEffect, useCallback, useRef } from "react"
import "./CarruselHome.css"
import { hceColors } from "../../tokens/hce.tokens"

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

function ChevronLeftGlyph() {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 6 9 12 15 18" />
    </svg>
  )
}
function ChevronRightGlyph() {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 6 15 12 9 18" />
    </svg>
  )
}

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
    <div
      className="hce-carrusel"
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
      style={{
        width:           "100%",
        height,
        borderRadius,
        // blue[50] == --ds-color-primary-light (csf) exactamente — reactivo al
        // tema activo de DSProvider, mismo hex de siempre como fallback.
        backgroundColor: `var(--ds-color-primary-light, ${hceColors.primary.blue[50]})`,
      }}
    >
      <style>{KEYFRAMES}</style>

      {/* Imagen saliente — se superpone durante la animación */}
      {previous !== null && (
        <img
          src={images[previous]}
          alt=""
          aria-hidden="true"
          style={{
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
      <img
        src={images[current]}
        alt={`Slide ${current + 1} de ${total}`}
        style={{
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
        <button
          type="button"
          className="hce-carrusel-arrow"
          onClick={prev}
          aria-label="Imagen anterior"
          style={{ left: 12 }}
        >
          <ChevronLeftGlyph />
        </button>
      )}

      {/* Flecha derecha */}
      {total > 1 && (
        <button
          type="button"
          className="hce-carrusel-arrow"
          onClick={next}
          aria-label="Siguiente imagen"
          style={{ right: 12 }}
        >
          <ChevronRightGlyph />
        </button>
      )}

      {/* Dots de navegación */}
      {total > 1 && (
        <div
          role="tablist"
          aria-label="Navegación de slides"
          style={{
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
            <div
              key={i}
              className={`hce-carrusel-dot${i === current ? " hce-carrusel-dot--active" : ""}`}
              role="tab"
              aria-selected={i === current}
              aria-label={`Ir al slide ${i + 1}`}
              onClick={() => { if (i !== current) goTo(i, i > current ? "next" : "prev") }}
              style={{
                width:           i === current ? 20 : 8,
                backgroundColor: i === current ? "white" : "rgba(255,255,255,0.55)",
              }}
            />
          ))}
        </div>
      )}

      {/* Indicador de pausa — punto en esquina superior derecha */}
      {paused && autoPlaySeconds > 0 && total > 1 && (
        <div style={{
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
    </div>
  )
}
