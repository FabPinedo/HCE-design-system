import { useState, useEffect, useCallback } from "react"
import { Box, IconButton }                   from "@mui/material"
import ChevronLeftIcon  from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import { hceColors }    from "../../tokens/hce.tokens"

export type CarruselHomeProps = {
  /** Lista de URLs de imágenes a mostrar */
  images:           string[]
  /** Alto del carrusel en px (default 300) */
  height?:          number
  /** Segundos entre avance automático — 0 desactiva (default 5) */
  autoPlaySeconds?: number
  /** Border-radius del contenedor (default "12px") */
  borderRadius?:    string | number
}

export function CarruselHome({
  images,
  height          = 300,
  autoPlaySeconds = 5,
  borderRadius    = "12px",
}: CarruselHomeProps) {
  const [current, setCurrent] = useState(0)
  const [animate, setAnimate] = useState(false)
  const total = images.length

  const goTo = useCallback((index: number) => {
    setAnimate(true)
    setCurrent((index + total) % total)
    setTimeout(() => setAnimate(false), 350)
  }, [total])

  const prev = () => goTo(current - 1)
  const next = useCallback(() => goTo(current + 1), [current, goTo])

  // Auto-play
  useEffect(() => {
    if (!autoPlaySeconds || total <= 1) return
    const id = setInterval(next, autoPlaySeconds * 1000)
    return () => clearInterval(id)
  }, [next, autoPlaySeconds, total])

  if (total === 0) return null

  return (
    <Box sx={{
      position:     "relative",
      width:        "100%",
      height,
      borderRadius,
      overflow:     "hidden",
      backgroundColor: hceColors.primary.blue[50],
      flexShrink:   0,
    }}>
      {/* Imagen activa */}
      <Box
        component="img"
        src={images[current]}
        alt={`slide-${current}`}
        sx={{
          width:      "100%",
          height:     "100%",
          objectFit:  "contain",
          display:    "block",
          opacity:    animate ? 0.6 : 1,
          transition: "opacity 0.35s ease",
        }}
      />

      {/* Flecha izquierda */}
      {total > 1 && (
        <IconButton
          onClick={prev}
          size="small"
          sx={{
            position:        "absolute",
            left:            12,
            top:             "50%",
            transform:       "translateY(-50%)",
            backgroundColor: "rgba(255,255,255,0.85)",
            "&:hover":       { backgroundColor: "white" },
            boxShadow:       "0 2px 8px rgba(0,0,0,0.15)",
            zIndex:          2,
          }}
        >
          <ChevronLeftIcon sx={{ color: hceColors.primary.blue[600], fontSize: 22 }} />
        </IconButton>
      )}

      {/* Flecha derecha */}
      {total > 1 && (
        <IconButton
          onClick={next}
          size="small"
          sx={{
            position:        "absolute",
            right:           12,
            top:             "50%",
            transform:       "translateY(-50%)",
            backgroundColor: "rgba(255,255,255,0.85)",
            "&:hover":       { backgroundColor: "white" },
            boxShadow:       "0 2px 8px rgba(0,0,0,0.15)",
            zIndex:          2,
          }}
        >
          <ChevronRightIcon sx={{ color: hceColors.primary.blue[600], fontSize: 22 }} />
        </IconButton>
      )}

      {/* Dots de navegación */}
      {total > 1 && (
        <Box sx={{
          position:       "absolute",
          bottom:         10,
          left:           "50%",
          transform:      "translateX(-50%)",
          display:        "flex",
          gap:            "6px",
          zIndex:         2,
        }}>
          {images.map((_, i) => (
            <Box
              key={i}
              onClick={() => goTo(i)}
              sx={{
                width:           i === current ? 20 : 8,
                height:          8,
                borderRadius:    4,
                backgroundColor: i === current ? "white" : "rgba(255,255,255,0.55)",
                cursor:          "pointer",
                transition:      "width 0.3s ease, background-color 0.3s ease",
                boxShadow:       "0 1px 4px rgba(0,0,0,0.2)",
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  )
}
