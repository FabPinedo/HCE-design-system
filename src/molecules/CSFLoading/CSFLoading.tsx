import { useState, useEffect, type ReactNode } from "react"
import Box                from "@mui/material/Box"
import Backdrop           from "@mui/material/Backdrop"
import Portal             from "@mui/material/Portal"
import Typography         from "@mui/material/Typography"
import { hceColors, hceTypography } from "../../tokens/hce.tokens"

// ─── Paths del logo CSF ───────────────────────────────────────────────────────
const BLUE_PATH =
  "M87.388 59.4001V37.0593C87.3885 36.789 87.3364 36.5213 87.2346 36.2715C87.1329 36.0217 " +
  "86.9835 35.7946 86.7951 35.6034C86.6067 35.4121 86.3829 35.2604 86.1365 35.1568C85.8901 " +
  "35.0533 85.6261 35 85.3593 35H67.4818C67.2151 35 66.951 35.0533 66.7047 35.1568C66.4583 " +
  "35.2604 66.2345 35.4121 66.0461 35.6034C65.8577 35.7946 65.7083 36.0217 65.6066 36.2715C" +
  "65.5048 36.5213 65.4527 36.789 65.4531 37.0593V56.067C65.4517 56.446 65.5541 56.818 " +
  "65.7489 57.1416C65.9437 57.4652 66.2233 57.7277 66.5565 57.8998C77.0938 63.2454 85.6395 " +
  "71.9051 90.9147 82.583C91.0833 82.9209 91.3416 83.2045 91.6604 83.402C91.9793 83.5995 " +
  "92.3462 83.703 92.7199 83.701H111.669C112.208 83.7011 112.724 83.4846 113.105 83.0991C" +
  "113.486 82.7137 113.701 82.1908 113.702 81.6453V63.5292C113.701 62.9837 113.486 62.4608 " +
  "113.105 62.0754C112.724 61.69 112.208 61.4735 111.669 61.4735H89.4202C89.1523 61.473 " +
  "88.8871 61.419 88.6398 61.3144C88.3926 61.2099 88.1681 61.0569 87.9793 60.8643C87.7905 " +
  "60.6717 87.6411 60.4432 87.5396 60.1919C87.4382 59.9406 87.3867 59.6715 87.388 59.4001Z"

const WHITE_PATH =
  "M93.0967 107.373C93.0967 99.235 91.2181 90.8138 87.9185 83.9602C87.9185 83.9602 87.7893 " +
  "83.6382 87.5868 83.716C87.5868 83.716 87.3808 83.7408 87.3843 84.1123V90.8846C87.3843 " +
  "91.0367 87.4017 91.1889 87.4017 91.341V107.943C87.4017 108.488 87.188 109.011 86.8075 " +
  "109.396C86.4271 109.782 85.9111 109.998 85.373 109.998H67.506C67.2379 109.998 66.9725 " +
  "109.945 66.7248 109.841C66.4772 109.737 66.2522 109.584 66.0628 109.392C65.8734 109.2 " +
  "65.7233 108.972 65.621 108.72C65.5188 108.469 65.4664 108.2 65.4668 107.929V85.7895C" +
  "65.4668 85.2414 65.252 84.7158 64.8696 84.3283C64.4871 83.9408 63.9685 83.7231 63.4277 " +
  "83.7231H41.1366C40.5986 83.7231 40.0826 83.5065 39.7021 83.121C39.3217 82.7354 39.1079 " +
  "82.2126 39.1079 81.6673V63.5478C39.107 63.0013 39.3201 62.4767 39.7005 62.0893C40.0808 " +
  "61.7019 40.5973 61.4833 41.1366 61.4814H57.9422H58.0469H64.332C64.6812 61.4814 64.7161 " +
  "61.2514 64.7161 61.2514C64.7545 61.0179 64.4752 60.9153 64.4752 60.9153C57.5102 57.4611 " +
  "49.8582 55.6663 42.1038 55.668C37.9322 55.6664 33.7761 56.1845 29.7292 57.2107C28.6761 " +
  "57.4711 27.7199 58.035 26.9763 58.8344C26.2328 59.6337 25.7336 60.6342 25.5392 61.7149C" +
  "25.2633 63.3142 25.0608 64.9348 24.9211 66.5765C24.7885 68.1015 24.7012 69.6372 24.7012 " +
  "71.194C24.7012 85.4602 30.2921 99.1424 40.2447 109.232C50.1973 119.322 63.6968 124.994 " +
  "77.7751 125.001C79.3114 125.001 80.8233 124.912 82.3143 124.778C83.9438 124.641 85.5441 " +
  "124.432 87.1154 124.152C88.1815 123.954 89.1684 123.448 89.9571 122.694C90.7458 121.941 " +
  "91.3026 120.972 91.5603 119.906C92.5772 115.808 93.0932 111.599 93.0967 107.373Z"

// ─── Sector paths para la animación de barrido (de mayor a menor sector) ─────
const SECTOR_270 =
  "M75 6C59.5013 6 44.4539 11.218 32.2825 20.8131C20.1111 30.4083 11.5246 43.8218 7.90648 " +
  "58.8923C4.28837 73.9627 5.84944 89.8125 12.3381 103.888C18.8268 117.963 29.8652 129.443 " +
  "43.6746 136.479C57.4841 143.516 73.2603 145.698 88.4612 142.674C103.662 139.651 117.402 " +
  "131.597 127.468 119.812C137.534 108.027 143.338 93.1957 143.947 77.7089C144.555 62.2222 " +
  "139.932 46.9815 130.822 34.4428L75 75V6Z"

const SECTOR_240 =
  "M75 6C61.3531 6 48.0126 10.0468 36.6657 17.6286C25.3187 25.2104 16.4748 35.9867 11.2523 " +
  "48.5948C6.02987 61.2029 4.66344 75.0765 7.32582 88.4612C9.9882 101.846 16.5598 114.141 " +
  "26.2096 123.79C35.8595 133.44 48.1541 140.012 61.5388 142.674C74.9235 145.337 88.7971 " +
  "143.97 101.405 138.748C114.013 133.525 124.79 124.681 132.371 113.334C139.953 101.987 " +
  "144 88.6469 144 75H75V6Z"

const SECTOR_180 =
  "M75 6C63.1941 6 51.5857 9.02918 41.2851 14.7978C30.9846 20.5664 22.3364 28.8814 16.1678 " +
  "38.9476C9.99928 49.0138 6.51669 60.4943 6.0532 72.2911C5.5897 84.0879 8.1608 95.8062 " +
  "13.5206 106.325C18.8803 116.844 26.8494 125.812 36.6657 132.371C46.4819 138.93 57.8169 " +
  "142.861 69.5863 143.787C81.3558 144.714 93.1661 142.605 103.888 137.662C114.609 132.719 " +
  "123.883 125.108 130.822 115.557L75 75V6Z"

const SECTOR_090 =
  "M75 6C65.9388 6 56.9663 7.78474 48.5948 11.2523C40.2234 14.7199 32.6169 19.8024 26.2096 " +
  "26.2096C19.8024 32.6169 14.7199 40.2234 11.2523 48.5948C7.78474 56.9663 6 65.9388 6 75C6 " +
  "84.0612 7.78474 93.0337 11.2523 101.405C14.7199 109.777 19.8024 117.383 26.2096 123.79C" +
  "32.6169 130.198 40.2234 135.28 48.5948 138.748C56.9663 142.215 65.9388 144 75 144L75 75V6Z"

const SECTOR_045 =
  "M75 6C62.2749 6 49.7976 9.51896 38.9476 16.1678C28.0976 22.8167 19.2976 32.3365 13.5206 " +
  "43.6747C7.74346 55.0128 5.2143 67.7278 6.2127 80.4137C7.21111 93.0996 11.6982 105.262 " +
  "19.1778 115.557L75 75V6Z"

const SECTOR_Q1 =
  "M75 6C65.9388 6 56.9663 7.78474 48.5948 11.2523C40.2234 14.7199 32.6169 19.8024 26.2096 " +
  "26.2096C19.8024 32.6169 14.7199 40.2234 11.2523 48.5948C7.78474 56.9663 6 65.9388 6 " +
  "75L75 75V6Z"

const SECTOR_SM =
  "M75 6C64.1111 6 53.3768 8.57708 43.6747 13.5205C33.9726 18.464 25.5782 25.6335 19.1778 " +
  "34.4428L75 75V6Z"

// ─── Frames de build-up (secuencia Figma F01 → F11) ──────────────────────────
// Cada elemento es el contenido SVG interno (sin el <svg> wrapper).
// Se reproducen en orden a FRAME_MS ms por frame, luego gira el logo completo.

const FRAME_MS = 80  // ms por frame en la fase de intro

const BASE_CIRCLE   = <circle cx="75" cy="75" r="69" fill="#89C93D" />
const DEF4C5_CIRCLE = <circle cx="75" cy="75" r="69" fill="#DEF4C5" />
const BLUE_SHAPE    = <path d={BLUE_PATH}  fill="#003D96" />
const WHITE_SHAPE   = <path d={WHITE_PATH} fill="#FFFFFF" />

// Frames en orden de animación (sector se reduce de mayor a menor)
const BUILD_FRAMES: ReactNode[] = [
  // F01 — solo círculo base + overlay claro
  <>{BASE_CIRCLE}{DEF4C5_CIRCLE}</>,
  // F02 — + forma azul
  <>{BASE_CIRCLE}{DEF4C5_CIRCLE}{BLUE_SHAPE}</>,
  // F03 — logo completo + sector 360° (overlay total)
  <>{BASE_CIRCLE}{DEF4C5_CIRCLE}{BLUE_SHAPE}{WHITE_SHAPE}</>,
  // F04-F10 — barrido del sector de mayor a menor
  <>{BASE_CIRCLE}<path d={SECTOR_270} fill="#DEF4C5"/>{BLUE_SHAPE}{WHITE_SHAPE}</>,
  <>{BASE_CIRCLE}<path d={SECTOR_240} fill="#DEF4C5"/>{BLUE_SHAPE}{WHITE_SHAPE}</>,
  <>{BASE_CIRCLE}<path d={SECTOR_180} fill="#DEF4C5"/>{BLUE_SHAPE}{WHITE_SHAPE}</>,
  <>{BASE_CIRCLE}<path d={SECTOR_090} fill="#DEF4C5"/>{BLUE_SHAPE}{WHITE_SHAPE}</>,
  <>{BASE_CIRCLE}<path d={SECTOR_045} fill="#DEF4C5"/>{BLUE_SHAPE}{WHITE_SHAPE}</>,
  <>{BASE_CIRCLE}<path d={SECTOR_Q1}  fill="#DEF4C5"/>{BLUE_SHAPE}{WHITE_SHAPE}</>,
  <>{BASE_CIRCLE}<path d={SECTOR_SM}  fill="#DEF4C5"/>{BLUE_SHAPE}{WHITE_SHAPE}</>,
  // F11 — logo completo (sin sector), siguiente estado = spin
  <>{BASE_CIRCLE}{BLUE_SHAPE}{WHITE_SHAPE}</>,
]

// ─── Props ────────────────────────────────────────────────────────────────────

export interface CSFLoadingProps {
  /** Muestra u oculta el loading (cuando se usa como overlay o standalone) */
  open?:      boolean
  /** Texto opcional bajo el spinner */
  message?:   string
  /** Tamaño del spinner en px. Default: 150 */
  size?:      number
  /** Duración de una vuelta completa en segundos. Default: 1.5 */
  duration?:  number
  /**
   * Modo overlay — cubre toda la pantalla con fondo oscuro.
   * Default: false (spinner standalone, se inserta en el flujo del DOM)
   */
  overlay?:   boolean
  /** Opacidad del fondo oscuro cuando overlay=true (0–1). Default: 0.45 */
  opacity?:   number
  /** Duración de cada frame del intro en ms. Default: 80 */
  frameDuration?: number
  /** Nodo custom en lugar del spinner */
  children?:  ReactNode
}

// ─── Spinner ──────────────────────────────────────────────────────────────────
// Fase 1 (intro): reproduce BUILD_FRAMES en secuencia a FRAME_MS ms/frame.
// Fase 2 (loop):  gira el logo completo con animateTransform SVG nativo.

function CSFSpinner({ size = 150, duration = 1.5, frameDuration = FRAME_MS }: { size?: number; duration?: number; frameDuration?: number }) {
  const [frameIdx, setFrameIdx] = useState(0)
  const [spinning, setSpinning] = useState(false)

  useEffect(() => {
    if (spinning) return
    const id = setTimeout(() => {
      if (frameIdx < BUILD_FRAMES.length - 1) {
        setFrameIdx(i => i + 1)
      } else {
        setSpinning(true)
      }
    }, frameDuration)
    return () => clearTimeout(id)
  }, [frameIdx, spinning, frameDuration])

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 150 150"
      fill="none"
      style={{ display: "block", flexShrink: 0 }}
    >
      {spinning ? (
        // Fase loop — logo completo girando con animateTransform nativo
        // El centro de rotación (75 75) es el centro exacto del SVG
        <g>
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 75 75"
            to="360 75 75"
            dur={`${duration}s`}
            repeatCount="indefinite"
          />
          {BASE_CIRCLE}
          {BLUE_SHAPE}
          {WHITE_SHAPE}
        </g>
      ) : (
        // Fase intro — frame estático del build-up
        BUILD_FRAMES[frameIdx]
      )}
    </svg>
  )
}

// ─── Componente público ───────────────────────────────────────────────────────

export function CSFLoading({
  open          = true,
  message,
  size          = 150,
  duration      = 1.5,
  frameDuration = 80,
  overlay       = false,
  opacity       = 0.45,
  children,
}: CSFLoadingProps) {

  const content = (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
      {children ?? <CSFSpinner size={size} duration={duration} frameDuration={frameDuration} />}
      {message && (
        <Typography sx={{
          fontFamily:    hceTypography.fontFamily,
          color:         overlay ? "#fff" : hceColors.primary.blue[600],
          fontWeight:    600,
          fontSize:      "0.9rem",
          letterSpacing: "0.02em",
          textAlign:     "center",
          maxWidth:      280,
        }}>
          {message}
        </Typography>
      )}
    </Box>
  )

  // ── Overlay — renderiza en document.body via Portal ───────────────────────
  // Portal evita que el stacking context del padre restrinja el Backdrop.
  if (overlay) {
    return (
      <Portal>
        <Backdrop
          open={open}
          sx={{
            zIndex:          9999,
            backgroundColor: `rgba(0, 0, 0, ${opacity})`,
            display:         "flex",
            flexDirection:   "column",
            alignItems:      "center",
            gap:             2,
          }}
        >
          {content}
        </Backdrop>
      </Portal>
    )
  }

  // ── Standalone — flujo normal del DOM ─────────────────────────────────────
  if (!open) return null
  return content
}
