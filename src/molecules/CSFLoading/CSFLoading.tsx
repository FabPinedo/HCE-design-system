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

// ─── Paths de los frames de zoom-out post-intro (F12 y F13) ─────────────────
// F12 — versión más pequeña del logo (coordenadas contraídas hacia el centro)
const BLUE_PATH_F12 =
  "M85.5489 60.5437V40.8182C85.5493 40.5796 85.5028 40.3432 85.4121 40.1227C85.3214 39.9021 " +
  "85.1883 39.7016 85.0204 39.5327C84.8525 39.3639 84.653 39.2299 84.4335 39.1385C84.2139 " +
  "39.047 83.9785 39 83.7409 39H67.808C67.5703 39 67.335 39.047 67.1154 39.1385C66.8958 " +
  "39.2299 66.6964 39.3639 66.5285 39.5327C66.3605 39.7016 66.2274 39.9021 66.1367 40.1227C" +
  "66.0461 40.3432 65.9996 40.5796 66 40.8182V57.6008C65.9988 57.9355 66.09 58.2639 66.2636 " +
  "58.5496C66.4372 58.8353 66.6864 59.0671 66.9834 59.2191C76.3744 63.9389 83.9905 71.5849 " +
  "88.6919 81.0128C88.8422 81.3111 89.0723 81.5615 89.3565 81.7359C89.6407 81.9103 89.9676 " +
  "82.0017 90.3007 82H107.189C107.669 82 108.129 81.8088 108.468 81.4685C108.808 81.1282 " +
  "108.999 80.6666 109 80.1849V64.1895C108.999 63.7079 108.808 63.2462 108.468 62.9059C" +
  "108.129 62.5656 107.669 62.3744 107.189 62.3744H87.36C87.1212 62.374 86.8848 62.3263 " +
  "86.6645 62.234C86.4441 62.1417 86.2441 62.0066 86.0758 61.8366C85.9076 61.6665 85.7744 " +
  "61.4647 85.684 61.2429C85.5935 61.021 85.5476 60.7834 85.5489 60.5437Z"

const WHITE_PATH_F12 =
  "M90 103.237C90 95.9592 88.3521 88.4287 85.4574 82.2999C85.4574 82.2999 85.3441 82.012 " +
  "85.1664 82.0816C85.1664 82.0816 84.9857 82.1038 84.9888 82.436V88.492C84.9888 88.6281 " +
  "85.0041 88.7641 85.0041 88.9002V103.746C85.0041 104.234 84.8166 104.701 84.4828 105.046C" +
  "84.1491 105.391 83.6964 105.584 83.2244 105.584H67.5505C67.3154 105.584 67.0825 105.536 " +
  "66.8653 105.443C66.648 105.35 66.4507 105.214 66.2845 105.042C66.1184 104.87 65.9867 " +
  "104.666 65.897 104.441C65.8073 104.217 65.7613 103.976 65.7617 103.733V83.9358C65.7617 " +
  "83.4457 65.5732 82.9757 65.2377 82.6291C64.9023 82.2826 64.4473 82.0879 63.9728 82.0879H" +
  "44.418C43.946 82.0879 43.4934 81.8943 43.1596 81.5495C42.8258 81.2047 42.6384 80.7372 " +
  "42.6384 80.2496V64.0464C42.6375 63.5577 42.8245 63.0887 43.1581 62.7422C43.4918 62.3958 " +
  "43.9449 62.2003 44.418 62.1986H59.1607H59.2526H64.7662C65.0725 62.1986 65.1031 61.9929 " +
  "65.1031 61.9929C65.1368 61.7841 64.8918 61.6923 64.8918 61.6923C58.7818 58.6035 52.069 " +
  "56.9985 45.2665 57C41.6069 56.9986 37.961 57.4619 34.4109 58.3795C33.487 58.6124 32.6482 " +
  "59.1167 31.9959 59.8315C31.3436 60.5463 30.9057 61.441 30.7351 62.4074C30.4932 63.8376 " +
  "30.3155 65.2867 30.193 66.7548C30.0766 68.1186 30 69.4918 30 70.884C30 83.6413 34.9046 " +
  "95.8764 43.6355 104.899C52.3665 113.922 64.2089 118.994 76.5591 119C77.9069 119 79.2332 " +
  "118.921 80.5411 118.801C81.9706 118.678 83.3745 118.492 84.7529 118.241C85.6882 118.064 " +
  "86.5539 117.611 87.2458 116.937C87.9377 116.264 88.4261 115.398 88.6522 114.444C89.5443 " +
  "110.779 89.9969 107.015 90 103.237Z"

// F13 — versión aún más pequeña (mayor contracción)
const BLUE_PATH_F13 =
  "M89.0951 58.5539V34.2411C89.0956 33.9469 89.0383 33.6556 88.9266 33.3837C88.8148 33.1119 " +
  "88.6507 32.8648 88.4438 32.6566C88.2368 32.4485 87.9909 32.2833 87.7203 32.1707C87.4497 " +
  "32.058 87.1596 32 86.8666 32H67.2285C66.9355 32 66.6454 32.058 66.3748 32.1707C66.1042 " +
  "32.2833 65.8583 32.4485 65.6514 32.6566C65.4444 32.8648 65.2803 33.1119 65.1685 33.3837C" +
  "65.0568 33.6556 64.9995 33.9469 65 34.2411V54.9266C64.9985 55.3391 65.1109 55.7439 65.3249 " +
  "56.0961C65.5389 56.4482 65.846 56.7339 66.2121 56.9212C77.7871 62.7386 87.1744 72.1627 " +
  "92.969 83.7832C93.1543 84.1509 93.438 84.4596 93.7883 84.6745C94.1385 84.8894 94.5415 " +
  "85.0021 94.952 85H115.768C116.359 85 116.926 84.7644 117.345 84.3449C117.763 83.9255 " +
  "117.999 83.3565 118 82.7628V63.0476C117.999 62.4539 117.763 61.8848 117.345 61.4654C" +
  "116.926 61.0459 116.359 60.8104 115.768 60.8104H91.3274C91.0331 60.8099 90.7418 60.751 " +
  "90.4702 60.6373C90.1986 60.5235 89.952 60.357 89.7446 60.1474C89.5372 59.9378 89.3731 " +
  "59.6891 89.2616 59.4156C89.1502 59.1422 89.0936 58.8493 89.0951 58.5539Z"

const WHITE_PATH_F13 =
  "M95 110.677C95 101.756 92.9675 92.5255 89.3975 85.0128C89.3975 85.0128 89.2577 84.6599 " +
  "89.0386 84.7452C89.0386 84.7452 88.8157 84.7723 88.8195 85.1796V92.6031C88.8195 92.7699 " +
  "88.8384 92.9367 88.8384 93.1034V111.302C88.8384 111.899 88.6071 112.472 88.1955 112.895C" +
  "87.7839 113.318 87.2256 113.555 86.6435 113.555H67.3123C67.0223 113.555 66.7351 113.496 " +
  "66.4672 113.382C66.1992 113.268 65.9559 113.101 65.7509 112.89C65.546 112.679 65.3836 " +
  "112.429 65.2729 112.154C65.1623 111.879 65.1056 111.584 65.1061 111.286V87.018C65.1061 " +
  "86.4173 64.8736 85.8411 64.4599 85.4164C64.0461 84.9916 63.485 84.7529 62.8998 84.7529H" +
  "38.7822C38.2001 84.7529 37.6418 84.5155 37.2302 84.0929C36.8185 83.6703 36.5873 83.0972 " +
  "36.5873 82.4995V62.6375C36.5863 62.0385 36.8169 61.4635 37.2284 61.0388C37.6399 60.6142 " +
  "38.1987 60.3745 38.7822 60.3724H56.9649H57.0782H63.8783C64.2561 60.3724 64.2938 60.1203 " +
  "64.2938 60.1203C64.3354 59.8644 64.0332 59.7519 64.0332 59.7519C56.4975 55.9656 48.2184 " +
  "53.9981 39.8287 54C35.3152 53.9983 30.8186 54.5662 26.4401 55.691C25.3006 55.9765 24.2661 " +
  "56.5947 23.4616 57.4709C22.6571 58.3471 22.117 59.4438 21.9067 60.6284C21.6082 62.3815 " +
  "21.3891 64.1579 21.238 65.9575C21.0944 67.6292 21 69.3125 21 71.019C21 86.6571 27.049 " +
  "101.655 37.8172 112.715C48.5853 123.776 63.191 129.993 78.4229 130C80.0852 130 81.7209 " +
  "129.903 83.3341 129.756C85.0971 129.606 86.8286 129.377 88.5286 129.069C89.6821 128.852 " +
  "90.7498 128.298 91.6031 127.472C92.4564 126.646 93.0589 125.584 93.3378 124.415C94.438 " +
  "119.923 94.9962 115.309 95 110.677Z"

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

// ─── Configuración de la secuencia de intro ───────────────────────────────────

const FRAME_MS          = 100  // ms por frame en la fase de intro
const TOTAL_BUILD_FRAMES = 14  // F01 → F14

const SECTORS = [SECTOR_270, SECTOR_240, SECTOR_180, SECTOR_090, SECTOR_045, SECTOR_Q1, SECTOR_SM]

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
// Fase 1 (intro): renderiza dinámicamente F01→F14 a frameDuration ms/frame.
// Fase 2 (loop):  gira el logo completo con animateTransform SVG nativo.

function CSFSpinner({ size = 150, duration = 1.5, frameDuration = FRAME_MS }: { size?: number; duration?: number; frameDuration?: number }) {
  const [frameIdx, setFrameIdx] = useState(0)
  const [spinning, setSpinning] = useState(false)
  const [blueIn,   setBlueIn]  = useState(false)
  const [whiteIn,  setWhiteIn] = useState(false)

  // Proporcional a frameDuration con tope en 1000ms.
  // Tope evita que la animación solape el sweep de sectores (frames 3-9).
  const animDur = Math.min(frameDuration * 4, 1000)

  // Avance de frames de intro
  useEffect(() => {
    if (spinning) return
    const id = setTimeout(() => {
      if (frameIdx < TOTAL_BUILD_FRAMES - 1) setFrameIdx(i => i + 1)
      else setSpinning(true)
    }, frameDuration)
    return () => clearTimeout(id)
  }, [frameIdx, spinning, frameDuration])

  // Dispara la transición de entrada una sola vez por pieza (RAF garantiza
  // que el browser pintó el estado inicial antes de aplicar la transición).
  useEffect(() => {
    if (frameIdx >= 1 && !blueIn) {
      const id = requestAnimationFrame(() => setBlueIn(true))
      return () => cancelAnimationFrame(id)
    }
  }, [frameIdx, blueIn])

  useEffect(() => {
    if (frameIdx >= 2 && !whiteIn) {
      const id = requestAnimationFrame(() => setWhiteIn(true))
      return () => cancelAnimationFrame(id)
    }
  }, [frameIdx, whiteIn])

  // F12/F13 usan paths contraídos (zoom-out); el resto usa el tamaño completo.
  const bluePath  = frameIdx === 11 ? BLUE_PATH_F12 : frameIdx === 12 ? BLUE_PATH_F13 : BLUE_PATH
  const whitePath = frameIdx === 11 ? WHITE_PATH_F12 : frameIdx === 12 ? WHITE_PATH_F13 : WHITE_PATH

  const easing = `cubic-bezier(0.22, 1, 0.36, 1)`

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
        <g>
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 75 75"
            to="360 75 75"
            dur={`${duration}s`}
            repeatCount="indefinite"
          />
          <circle cx="75" cy="75" r="69" fill="#89C93D" />
          <path d={BLUE_PATH}  fill="#003D96" />
          <path d={WHITE_PATH} fill="#FFFFFF" />
        </g>
      ) : (
        // Fase intro — renderizado dinámico frame a frame
        <>
          {/* Círculo base siempre visible */}
          <circle cx="75" cy="75" r="69" fill="#89C93D" />

          {/* Overlay claro — F01 a F03 */}
          {frameIdx <= 2 && <circle cx="75" cy="75" r="69" fill="#DEF4C5" />}

          {/* Barrido de sector — F04 a F10 */}
          {frameIdx >= 3 && frameIdx <= 9 && (
            <path d={SECTORS[frameIdx - 3]} fill="#DEF4C5" />
          )}

          {/* Pieza azul: cae desde arriba.
              Estado inicial (blueIn=false): invisible y desplazada — sin transition.
              Tras el RAF (blueIn=true): transition activa, valores cambian → CSS anima.
              La transición se dispara UNA sola vez; cambios en frameDuration no la reinician. */}
          {frameIdx >= 1 && (
            <g style={{
              opacity:    blueIn ? 1 : 0,
              transform:  blueIn ? "translateY(0)" : "translateY(-18px)",
              transition: blueIn
                ? `opacity ${animDur}ms ${easing}, transform ${animDur}ms ${easing}`
                : "none",
            }}>
              <path d={bluePath} fill="#003D96" />
            </g>
          )}

          {/* Pieza blanca: sube desde abajo. Mismo patrón que la azul. */}
          {frameIdx >= 2 && (
            <g style={{
              opacity:    whiteIn ? 1 : 0,
              transform:  whiteIn ? "translateY(0)" : "translateY(18px)",
              transition: whiteIn
                ? `opacity ${animDur}ms ${easing}, transform ${animDur}ms ${easing}`
                : "none",
            }}>
              <path d={whitePath} fill="#FFFFFF" />
            </g>
          )}
        </>
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
  frameDuration = 100,
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
  // El spinner solo se monta cuando open=true para que la animación de intro
  // arranque siempre desde el frame 1 (no consume frames mientras está oculto).
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
          {open ? content : null}
        </Backdrop>
      </Portal>
    )
  }

  // ── Standalone — flujo normal del DOM ─────────────────────────────────────
  if (!open) return null
  return content
}
