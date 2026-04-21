import { Box } from "@mui/material"
import { hceColors, hceTypography, hceTransition } from "../../tokens/hce.tokens"

// ─── Config por paso ──────────────────────────────────────────────────────────
// bg/border/text son los colores del círculo cuando está activo (seleccionado o
// a la izquierda del punto seleccionado). emoji cambia según la intensidad.

const STEPS = [
  { value: 0,  bg: "#e6ecf6", border: "#b1daf1", text: hceColors.primary.blue[600], emoji: "😊" },
  { value: 1,  bg: "#55afe0", border: "#55afe0",  text: "#ffffff", emoji: "🙂" },
  { value: 2,  bg: "#0288d1", border: "#0288d1",  text: "#ffffff", emoji: "😐" },
  { value: 3,  bg: "#73a876", border: "#73a876",  text: "#ffffff", emoji: "😕" },
  { value: 4,  bg: "#2e7d32", border: "#2e7d32",  text: "#ffffff", emoji: "😟" },
  { value: 5,  bg: "#fde4bb", border: "#f9a825",  text: "#c8860a", emoji: "😣" },
  { value: 6,  bg: "#fbc56d", border: "#fbc56d",  text: "#ffffff", emoji: "😖" },
  { value: 7,  bg: "#f9a825", border: "#f9a825",  text: "#ffffff", emoji: "😢" },
  { value: 8,  bg: "#e7bcb9", border: "#cc6e68",  text: "#ffffff", emoji: "😭" },
  { value: 9,  bg: "#cc6e68", border: "#cc6e68",  text: "#ffffff", emoji: "😱" },
  { value: 10, bg: "#b3261e", border: "#b3261e",  text: "#ffffff", emoji: "😫" },
] as const

const CIRCLE = 38   // diámetro del círculo en px
const EMOJI_SIZE = 42  // tamaño del cuadro del emoji en px
const ARROW_H   = 10  // alto de la flecha conectora

// ─── Props ────────────────────────────────────────────────────────────────────

export interface EvaScaleProps {
  value?:    number | null
  onChange?: (value: number) => void
  readOnly?: boolean
}

// ─── Componente ───────────────────────────────────────────────────────────────

export function EvaScale({ value = null, onChange, readOnly = false }: EvaScaleProps) {
  const selected = value !== null ? STEPS[value] : null

  // Un círculo está "filled" si está en la zona 0..value
  function isFilled(stepValue: number) {
    return value !== null && stepValue <= value
  }

  // Color que usa un círculo filled (siempre el del punto seleccionado)
  function circleStyle(stepValue: number) {
    if (selected && isFilled(stepValue)) {
      return { bg: selected.bg, border: selected.border, text: selected.text }
    }
    // No seleccionado → blanco con borde verde neutro
    return { bg: "#ffffff", border: "#def4c5", text: hceColors.neutro.black[400] }
  }

  return (
    <Box
      role="group"
      aria-label="Escala de dolor EVA (0-10)"
      sx={{ width: "100%", userSelect: "none" }}
    >
      {/* Fila de emojis — misma estructura space-between que los círculos
          así el emoji queda perfectamente centrado sobre su círculo */}
      <Box sx={{
        display:        "flex",
        justifyContent: "space-between",
        alignItems:     "flex-end",
        mb:             "4px",
        minHeight:      EMOJI_SIZE + ARROW_H,
      }}>
        {STEPS.map(step => {
          const show = value === step.value
          return (
            <Box
              key={step.value}
              sx={{
                width:         CIRCLE,
                flexShrink:    0,
                display:       "flex",
                flexDirection: "column",
                alignItems:    "center",
                opacity:       show ? 1 : 0,
                pointerEvents: "none",
                transition:    `opacity ${hceTransition.fast}`,
              }}
            >
              {/* Cuadro del emoji */}
              <Box sx={{
                width:           EMOJI_SIZE,
                height:          EMOJI_SIZE,
                borderRadius:    "12px",
                backgroundColor: step.bg,
                border:          `4px solid ${step.border}`,
                display:         "flex",
                alignItems:      "center",
                justifyContent:  "center",
                fontSize:        "24px",
                lineHeight:      1,
                boxShadow:       "0 2px 8px rgba(0,0,0,0.14)",
              }}>
                {step.emoji}
              </Box>

              {/* Flecha conectora */}
              <Box sx={{
                width:       0,
                height:      0,
                borderLeft:  `${ARROW_H * 0.6}px solid transparent`,
                borderRight: `${ARROW_H * 0.6}px solid transparent`,
                borderTop:   `${ARROW_H}px solid ${step.border}`,
              }} />
            </Box>
          )
        })}
      </Box>

      {/* Fila principal: track + círculos */}
      <Box sx={{ position: "relative", height: CIRCLE + 4 }}>

        {/* Track completo (fondo verde claro) */}
        <Box sx={{
          position:        "absolute",
          top:             "50%",
          left:            `${CIRCLE / 2}px`,
          right:           `${CIRCLE / 2}px`,
          height:          8,
          transform:       "translateY(-50%)",
          backgroundColor: "#def4c5",
          borderRadius:    "100px",
          zIndex:          0,
        }} />

        {/* Track filled (color del punto seleccionado, de 0 al punto N) */}
        {selected && value !== null && (
          <Box sx={{
            position:        "absolute",
            top:             "50%",
            left:            `${CIRCLE / 2}px`,
            width:           `calc(${(value / 10) * 100}% - ${CIRCLE / 2}px)`,
            height:          8,
            transform:       "translateY(-50%)",
            backgroundColor: selected.border,
            borderRadius:    "100px",
            zIndex:          0,
            transition:      `width ${hceTransition.base}, background-color ${hceTransition.base}`,
          }} />
        )}

        {/* Círculos */}
        <Box sx={{
          position:       "relative",
          display:        "flex",
          justifyContent: "space-between",
          alignItems:     "center",
          height:         "100%",
          zIndex:         1,
        }}>
          {STEPS.map(step => {
            const { bg, border, text } = circleStyle(step.value)
            const isSelected = value === step.value

            return (
              <Box
                key={step.value}
                component={readOnly ? "div" : "button"}
                type={readOnly ? undefined : "button"}
                onClick={readOnly ? undefined : () => onChange?.(step.value)}
                aria-label={`Dolor ${step.value}`}
                aria-pressed={isSelected}
                sx={{
                  width:          CIRCLE,
                  height:         CIRCLE,
                  minWidth:       CIRCLE,
                  borderRadius:   "50%",
                  border:         `4px solid ${border}`,
                  backgroundColor: bg,
                  color:          text,
                  display:        "flex",
                  alignItems:     "center",
                  justifyContent: "center",
                  fontFamily:     hceTypography.fontFamily,
                  fontWeight:     700,
                  fontSize:       "0.78rem",
                  cursor:         readOnly ? "default" : "pointer",
                  padding:        0,
                  outline:        "none",
                  flexShrink:     0,
                  transition:     `background-color ${hceTransition.base}, border-color ${hceTransition.base}, transform ${hceTransition.fast}, box-shadow ${hceTransition.fast}`,
                  transform:      isSelected ? "scale(1.2)" : "scale(1)",
                  boxShadow:      isSelected ? `0 0 0 3px ${border}40, 0 2px 8px rgba(0,0,0,0.18)` : "none",
                  "&:hover": readOnly ? {} : {
                    transform:  "scale(1.12)",
                    boxShadow:  "0 2px 8px rgba(0,0,0,0.16)",
                  },
                  "&:focus-visible": {
                    outline:       `2px solid ${hceColors.primary.blue[500]}`,
                    outlineOffset: "2px",
                  },
                }}
              >
                {step.value}
              </Box>
            )
          })}
        </Box>
      </Box>

      {/* Labels de intensidad debajo */}
      <Box sx={{
        display:        "flex",
        justifyContent: "space-between",
        mt:             "6px",
      }}>
        {STEPS.map(step => {
          const LABELS: Record<number, string> = {
            0: "Sin dolor", 5: "Moderado", 10: "Insoportable"
          }
          return (
            <Box
              key={step.value}
              sx={{
                width:      CIRCLE,
                textAlign:  "center",
                fontFamily: hceTypography.fontFamily,
                fontSize:   "0.6rem",
                fontWeight: 500,
                color:      hceColors.neutro.black[400],
                flexShrink: 0,
                visibility: LABELS[step.value] ? "visible" : "hidden",
              }}
            >
              {LABELS[step.value] ?? ""}
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}
