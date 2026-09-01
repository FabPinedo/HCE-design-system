import "./EvaScale.css";
import {
  hceColors,
  hceTypography,
  hceTransition,
} from "../../tokens/hce.tokens";
import {
  EvaScale0Icon, EvaScale1Icon, EvaScale2Icon, EvaScale3Icon, EvaScale4Icon,
  EvaScale5Icon, EvaScale6Icon, EvaScale7Icon, EvaScale8Icon, EvaScale9Icon,
  EvaScale10Icon,
} from "../../atoms/Icon/SvgIconsHce";

// ─── Config por paso ──────────────────────────────────────────────────────────
// bg/border/text son los colores del círculo cuando está activo (seleccionado o
// a la izquierda del punto seleccionado). icon cambia según la intensidad.

const STEPS = [
  { value: 0, bg: "#B1DAF1", border: "#B1DAF1", text: "#ffffff", icon: EvaScale0Icon },
  { value: 1, bg: "#55AFE0", border: "#55AFE0", text: "#ffffff", icon: EvaScale1Icon },
  { value: 2, bg: "#0288D1", border: "#0288D1", text: "#ffffff", icon: EvaScale2Icon },
  { value: 3, bg: "#73A876", border: "#73A876", text: "#ffffff", icon: EvaScale3Icon },
  { value: 4, bg: "#2E7D32", border: "#2E7D32", text: "#ffffff", icon: EvaScale4Icon },
  { value: 5, bg: "#FDE4BB", border: "#FDE4BB", text: "#ffffff", icon: EvaScale5Icon },
  { value: 6, bg: "#FBC56D", border: "#FBC56D", text: "#ffffff", icon: EvaScale6Icon },
  { value: 7, bg: "#F9A825", border: "#F9A825", text: "#ffffff", icon: EvaScale7Icon },
  { value: 8, bg: "#E7BCB9", border: "#E7BCB9", text: "#ffffff", icon: EvaScale8Icon },
  { value: 9, bg: "#CC6E68", border: "#CC6E68", text: "#ffffff", icon: EvaScale9Icon },
  { value: 10, bg: "#B3261E", border: "#B3261E", text: "#ffffff", icon: EvaScale10Icon },
] as const;

const CIRCLE = 28; // diámetro del círculo en px
const EMOJI_SIZE = 58; // tamaño del cuadro (círculo) que contiene la cara
const EMOJI_BORDER = 6; // ancho del borde del círculo
// El ícono llena el círculo dejando el borde + un margen mínimo visibles.
const EMOJI_ICON_SIZE = EMOJI_SIZE - EMOJI_BORDER * 2 - 4;
const ARROW_H = 10; // alto de la flecha conectora

// ─── Props ────────────────────────────────────────────────────────────────────

export interface EvaScaleProps {
  value?: number | null;
  onChange?: (value: number) => void;
  readOnly?: boolean;
  /** Hook de pruebas E2E — id base, sufijado `-step-{n}` en cada círculo. */
  testId?: string;
}

// ─── Componente ───────────────────────────────────────────────────────────────

export function EvaScale({
  value = null,
  onChange,
  readOnly = false,
  testId,
}: EvaScaleProps) {
  const selected = value !== null ? STEPS[value] : null;

  // Un círculo está "filled" si está en la zona 0..value
  function isFilled(stepValue: number) {
    return value !== null && stepValue <= value;
  }

  // Color que usa un círculo filled (siempre el del punto seleccionado)
  function circleStyle(stepValue: number) {
    if (selected && isFilled(stepValue)) {
      return { bg: selected.bg, border: selected.border, text: selected.text };
    }
    // No seleccionado → blanco con borde verde neutro
    return {
      bg: "#ffffff",
      border: "#def4c5",
      text: hceColors.neutro.black[400],
    };
  }

  return (
    <div
      role="group"
      aria-label="Escala de dolor EVA (0-10)"
      style={{ width: "100%", userSelect: "none" }}
    >
      {/* Fila de caras — misma estructura space-between que los círculos
          así el ícono queda perfectamente centrado sobre su círculo */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: "6px",
          minHeight: EMOJI_SIZE + ARROW_H,
        }}
      >
        {STEPS.map((step) => {
          const show = value === step.value;
          return (
            <div
              key={step.value}
              style={{
                width: CIRCLE,
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                opacity: show ? 1 : 0,
                pointerEvents: "none",
                transition: `opacity ${hceTransition.fast}`,
              }}
            >
              {/* Cuadro del ícono de cara */}
              <div
                style={{
                  width: EMOJI_SIZE,
                  height: EMOJI_SIZE,
                  borderRadius: "50%",
                  backgroundColor: "#ffffff",
                  border: `${EMOJI_BORDER}px solid ${step.border}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.14)",
                  boxSizing: "border-box",
                }}
              >
                <step.icon size={EMOJI_ICON_SIZE} />
              </div>

              {/* Flecha conectora */}
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: `${ARROW_H * 0.6}px solid transparent`,
                  borderRight: `${ARROW_H * 0.6}px solid transparent`,
                  borderTop: `${ARROW_H}px solid ${step.border}`,
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Fila principal: track + círculos */}
      <div style={{ position: "relative", height: CIRCLE + 4 }}>
        {/* Track completo (fondo verde claro) */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: `${CIRCLE / 2}px`,
            right: `${CIRCLE / 2}px`,
            height: 8,
            transform: "translateY(-50%)",
            backgroundColor: "#def4c5",
            borderRadius: "100px",
            zIndex: 0,
          }}
        />

        {/* Track filled (color del punto seleccionado, de 0 al punto N) */}
        {selected && value !== null && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: `${CIRCLE / 2}px`,
              width: `calc(${(value / 10) * 100}% - ${CIRCLE / 2}px)`,
              height: 8,
              transform: "translateY(-50%)",
              backgroundColor: selected.border,
              borderRadius: "100px",
              zIndex: 0,
              transition: `width ${hceTransition.base}, background-color ${hceTransition.base}`,
            }}
          />
        )}

        {/* Círculos */}
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "100%",
            zIndex: 1,
          }}
        >
          {STEPS.map((step) => {
            const { border } = circleStyle(step.value);
            const isSelected = value === step.value;
            const isBefore = value !== null && step.value <= value;
            const Tag = readOnly ? "div" : "button";

            return (
              <Tag
                key={step.value}
                type={readOnly ? undefined : "button"}
                onClick={readOnly ? undefined : () => onChange?.(step.value)}
                aria-label={`Dolor ${step.value}`}
                aria-pressed={isSelected}
                data-testid={testId ? `${testId}-step-${step.value}` : undefined}
                className={readOnly ? undefined : "hce-evascale-circle--interactive"}
                style={{
                  width: CIRCLE,
                  height: CIRCLE,
                  minWidth: CIRCLE,
                  borderRadius: "50%",
                  border: `7px solid ${border}`,
                  backgroundColor: isSelected || isBefore ? "#ffffff" : step.bg,
                  color:
                    isSelected || isBefore
                      ? hceColors.primary.blue[600]
                      : "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: hceTypography.fontFamily,
                  fontWeight: 700,
                  fontSize: "0.68rem",
                  cursor: readOnly ? "default" : "pointer",
                  padding: 0,
                  outline: "none",
                  flexShrink: 0,
                  boxSizing: "border-box",
                  transition: `background-color ${hceTransition.base}, border-color ${hceTransition.base}, transform ${hceTransition.fast}, box-shadow ${hceTransition.fast}`,
                  transform: isSelected ? "scale(1.2)" : "scale(1)",
                  boxShadow: isSelected
                    ? `0 0 0 3px ${border}40, 0 2px 8px rgba(0,0,0,0.18)`
                    : "none",
                }}
              >
                {step.value}
              </Tag>
            );
          })}
        </div>
      </div>
    </div>
  );
}
