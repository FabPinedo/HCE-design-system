import { useState }        from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { HceFormModal }   from "../../src/organisms/HceFormModal/HceFormModal"
import { hceColors, hceTypography } from "../../src/tokens/hce.tokens"

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof HceFormModal> = {
  title:     "Organisms/HceFormModal",
  component: HceFormModal,
  tags:      ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Modal de formulario con cabecera de marca azul, cuerpo flexible y footer con botones configurables. Orientado a flujos de alta carga cognitiva: admisión de pacientes, registro clínico, confirmación de acciones críticas.",
      },
    },
  },
  argTypes: {
    open: {
      control: "boolean",
      description: "Visibilidad del modal",
      table: { defaultValue: { summary: "false" } },
    },
    title: {
      control: "text",
      description: "Título mostrado en la cabecera azul",
    },
    maxWidth: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Ancho máximo del modal (breakpoint MUI o número en px)",
      table: { defaultValue: { summary: "sm" } },
    },
    fullWidth: {
      control: "boolean",
      description: "Si true, el modal ocupa todo el ancho del breakpoint",
      table: { defaultValue: { summary: "true" } },
    },
    buttonAlign: {
      control: "select",
      options: ["left", "center", "right"],
      description: "Alineación horizontal de los botones del footer",
      table: { defaultValue: { summary: "right" } },
    },
    closeOnBackdrop: {
      control: "boolean",
      description: "Si false, el click fuera del modal NO lo cierra",
      table: { defaultValue: { summary: "true" } },
    },
  },
}

export default meta
type Story = StoryObj<typeof HceFormModal>

// ─── Contenido de ejemplo ──────────────────────────────────────────────────────

const SampleFormContent = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
    <p
      style={{
        fontFamily: hceTypography.fontFamily,
        fontSize:   "0.875rem",
        color:      hceColors.neutro.black[300],
        margin:     0,
      }}
    >
      Complete los datos del paciente antes de continuar con el proceso de
      admision. Todos los campos marcados con * son obligatorios.
    </p>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
      {["Nombres *", "Apellido paterno *", "Apellido materno", "Fecha de nacimiento *"].map(
        (label) => (
          <div key={label} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <label
              style={{
                fontFamily: hceTypography.fontFamily,
                fontSize:   "0.75rem",
                fontWeight: 500,
                color:      hceColors.neutro.white[900],
              }}
            >
              {label}
            </label>
            <input
              type="text"
              placeholder="Ingrese datos"
              style={{
                padding:      "8px 12px",
                borderRadius: 6,
                border:       `1.5px solid ${hceColors.neutro.black[100]}`,
                fontFamily:   hceTypography.fontFamily,
                fontSize:     "0.875rem",
                color:        hceColors.neutro.black[300],
                outline:      "none",
              }}
            />
          </div>
        )
      )}
    </div>
  </div>
)

// ─── Wrapper con estado para stories interactivas ──────────────────────────────

function ModalTrigger({
  label,
  storyArgs,
}: {
  label:      string
  storyArgs:  Omit<React.ComponentProps<typeof HceFormModal>, "open" | "onClose">
}) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{
          padding:         "10px 20px",
          backgroundColor: hceColors.primary.blue[600],
          color:           hceColors.neutro.white[50],
          border:          "none",
          borderRadius:    6,
          fontFamily:      hceTypography.fontFamily,
          fontWeight:      600,
          fontSize:        "0.875rem",
          cursor:          "pointer",
        }}
      >
        {label}
      </button>
      <HceFormModal
        {...storyArgs}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  )
}

// ─── Stories ──────────────────────────────────────────────────────────────────

/**
 * Modal estándar con título, contenido de formulario y dos botones.
 * Es el caso de uso más común: registro o edición de datos clínicos.
 */
export const Default: Story = {
  render: () => (
    <ModalTrigger
      label="Abrir modal"
      storyArgs={{
        title:    "Admision de paciente",
        children: <SampleFormContent />,
        primaryButton: {
          label:   "Guardar",
          onClick: () => alert("Guardado"),
        },
        secondaryButton: {
          label:   "Cancelar",
          onClick: () => {},
        },
      }}
    />
  ),
}

/**
 * Solo el boton primario de confirmacion. Util para acciones sin retorno
 * alternativo, como confirmar un alta o un cierre de turno.
 */
export const SoloBotonPrimario: Story = {
  render: () => (
    <ModalTrigger
      label="Abrir — solo confirmar"
      storyArgs={{
        title:    "Confirmar alta medica",
        children: (
          <p style={{ fontFamily: hceTypography.fontFamily, fontSize: "0.875rem", color: hceColors.neutro.black[300], margin: 0 }}>
            Esta accion registrara el alta del paciente en el sistema. ¿Desea continuar?
          </p>
        ),
        primaryButton: {
          label:   "Confirmar alta",
          onClick: () => alert("Alta confirmada"),
        },
      }}
    />
  ),
}

/**
 * Botones alineados a la izquierda. Utiles en formularios donde el flujo
 * visual comienza desde el margen izquierdo.
 */
export const BotonesIzquierda: Story = {
  render: () => (
    <ModalTrigger
      label="Abrir — botones izquierda"
      storyArgs={{
        title:       "Registro de alergias",
        buttonAlign: "left",
        children:    <SampleFormContent />,
        primaryButton: {
          label:   "Registrar",
          onClick: () => alert("Registrado"),
        },
        secondaryButton: {
          label:   "Cancelar",
          onClick: () => {},
        },
      }}
    />
  ),
}

/**
 * El click fuera del modal NO lo cierra. Adecuado para formularios criticos
 * donde una salida accidental perderia datos del usuario.
 */
export const SinCierreBackdrop: Story = {
  render: () => (
    <ModalTrigger
      label="Abrir — sin cierre por backdrop"
      storyArgs={{
        title:           "Formulario critico",
        closeOnBackdrop: false,
        children: (
          <p style={{ fontFamily: hceTypography.fontFamily, fontSize: "0.875rem", color: hceColors.neutro.black[300], margin: 0 }}>
            Haga click fuera del modal — no se cerrara. Use el boton X o Cancelar para salir.
          </p>
        ),
        primaryButton: {
          label:   "Aceptar",
          onClick: () => alert("Aceptado"),
        },
        secondaryButton: {
          label:   "Cancelar",
          onClick: () => {},
        },
      }}
    />
  ),
}

/**
 * Modal amplio para formularios extensos: signos vitales, clasificacion de
 * triaje o registros con multiples secciones.
 */
export const TamanoGrande: Story = {
  render: () => (
    <ModalTrigger
      label="Abrir — tamano grande (lg)"
      storyArgs={{
        title:    "Signos vitales del paciente",
        maxWidth: "lg",
        children: (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <p style={{ fontFamily: hceTypography.fontFamily, fontSize: "0.875rem", color: hceColors.neutro.black[300], margin: 0 }}>
              Complete los signos vitales registrados durante la evaluacion inicial.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
              {[
                "Frecuencia cardiaca (lpm)",
                "Frecuencia respiratoria (rpm)",
                "Presion sistolica (mmHg)",
                "Presion diastolica (mmHg)",
                "Temperatura (°C)",
                "Saturacion O2 (%)",
              ].map((label) => (
                <div key={label} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <label style={{ fontFamily: hceTypography.fontFamily, fontSize: "0.75rem", fontWeight: 500, color: hceColors.neutro.white[900] }}>
                    {label}
                  </label>
                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder="—"
                    style={{
                      padding:      "8px 12px",
                      borderRadius: 6,
                      border:       `1.5px solid ${hceColors.neutro.black[100]}`,
                      fontFamily:   hceTypography.fontFamily,
                      fontSize:     "0.875rem",
                      color:        hceColors.neutro.black[300],
                      outline:      "none",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        ),
        primaryButton: {
          label:   "Guardar signos vitales",
          onClick: () => alert("Guardado"),
        },
        secondaryButton: {
          label:   "Cancelar",
          onClick: () => {},
        },
      }}
    />
  ),
}

/**
 * Estado de carga: el boton primario muestra spinner y se deshabilita
 * mientras se procesa la peticion al servidor.
 */
export const BotonesCargando: Story = {
  render: () => (
    <ModalTrigger
      label="Abrir — cargando"
      storyArgs={{
        title:    "Guardando informacion",
        children: (
          <p style={{ fontFamily: hceTypography.fontFamily, fontSize: "0.875rem", color: hceColors.neutro.black[300], margin: 0 }}>
            El boton primario esta en estado loading — muestra spinner y se deshabilita.
          </p>
        ),
        primaryButton: {
          label:   "Guardando...",
          onClick: () => {},
          loading: true,
        },
        secondaryButton: {
          label:   "Cancelar",
          onClick: () => {},
        },
      }}
    />
  ),
}

/**
 * Todos los controles disponibles via Storybook Controls.
 * Util para explorar combinaciones de props en tiempo real.
 */
export const Playground: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <button
          onClick={() => setOpen(true)}
          style={{
            padding:         "10px 20px",
            backgroundColor: hceColors.primary.blue[600],
            color:           hceColors.neutro.white[50],
            border:          "none",
            borderRadius:    6,
            fontFamily:      hceTypography.fontFamily,
            fontWeight:      600,
            fontSize:        "0.875rem",
            cursor:          "pointer",
          }}
        >
          Abrir Playground
        </button>
        <HceFormModal
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          primaryButton={
            args.primaryButton
              ? { ...args.primaryButton, onClick: () => alert("Accion primaria") }
              : undefined
          }
          secondaryButton={
            args.secondaryButton
              ? { ...args.secondaryButton, onClick: () => setOpen(false) }
              : undefined
          }
        >
          {args.children ?? <SampleFormContent />}
        </HceFormModal>
      </>
    )
  },
  args: {
    title:       "Titulo del modal",
    maxWidth:    "sm",
    fullWidth:   true,
    buttonAlign: "right",
    closeOnBackdrop: true,
    primaryButton: {
      label:     "Guardar",
      onClick:   () => {},
      disabled:  false,
      loading:   false,
    },
    secondaryButton: {
      label:    "Cancelar",
      onClick:  () => {},
      disabled: false,
    },
  },
}
