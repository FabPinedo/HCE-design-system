import { useState }      from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Box }           from "@mui/material"
import { SearchComboInput } from "@hce/design-system"
import type { SearchMode, SearchOption } from "@hce/design-system"

// ─── Mock data para simular respuesta de API ──────────────────────────────────

const MOCK_DIAGNOSTICOS: SearchOption[] = [
  { value: "J06.9", label: "Infección aguda de las vías respiratorias superiores", secondary: "J06.9" },
  { value: "J18.9", label: "Neumonía, no especificada",                            secondary: "J18.9" },
  { value: "A09",   label: "Gastroenteritis y colitis de origen infeccioso",        secondary: "A09"   },
  { value: "K35.8", label: "Apendicitis aguda, sin mención de peritonitis",         secondary: "K35.8" },
  { value: "I10",   label: "Hipertensión esencial (primaria)",                      secondary: "I10"   },
  { value: "E11.9", label: "Diabetes mellitus tipo 2 sin complicaciones",           secondary: "E11.9" },
  { value: "N39.0", label: "Infección de las vías urinarias, sitio no especificado", secondary: "N39.0" },
  { value: "R07.9", label: "Dolor de garganta, no especificado",                   secondary: "R07.9" },
]

function filterOptions(query: string, mode: SearchMode): SearchOption[] {
  const q = query.toLowerCase()
  if (mode === "cie10") {
    return MOCK_DIAGNOSTICOS.filter(o => o.secondary?.toLowerCase().startsWith(q))
  }
  return MOCK_DIAGNOSTICOS.filter(o => o.label.toLowerCase().includes(q))
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof SearchComboInput> = {
  title:      "Molecules/SearchComboInput",
  component:  SearchComboInput,
  tags:       ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    searchMode: {
      control:  { type: "radio" },
      options:  ["nombre", "cie10"],
      description: "Modo de búsqueda inicial",
    },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
    debounceMs: {
      control: { type: "range", min: 0, max: 1000, step: 50 },
    },
  },
}
export default meta
type Story = StoryObj<typeof SearchComboInput>

/** Motivo de ingreso — búsqueda por nombre o CIE-10 con opciones simuladas */
export const Default: Story = {
  name: "Motivo de ingreso",
  render: ({ loading, disabled, debounceMs }) => {
    const [mode,    setMode]    = useState<SearchMode>("nombre")
    const [value,   setValue]   = useState("")
    const [options, setOptions] = useState<SearchOption[]>([])
    const [selected, setSelected] = useState<SearchOption | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    function handleSearch(query: string, m: SearchMode) {
      setIsLoading(true)
      // Simula latencia de API
      setTimeout(() => {
        setOptions(filterOptions(query, m))
        setIsLoading(false)
      }, 400)
    }

    return (
      <Box sx={{ maxWidth: 600, p: 3 }}>
        <SearchComboInput
          label="Motivo de ingreso"
          required
          searchMode={mode}
          onSearchModeChange={m => { setMode(m); setValue(""); setOptions([]) }}
          value={value}
          onChange={setValue}
          options={options}
          onSearch={handleSearch}
          onSelect={opt => { setSelected(opt); setOptions([]) }}
          loading={loading ?? isLoading}
          disabled={disabled}
          debounceMs={debounceMs ?? 300}
        />
        {selected && (
          <Box sx={{ mt: 2, p: 1.5, bgcolor: "#f5fcec", borderRadius: "8px", border: "1px solid #89c93d" }}>
            <Box sx={{ fontFamily: "monospace", fontSize: 11, color: "#6B7280" }}>Seleccionado:</Box>
            <Box sx={{ fontWeight: 600, fontSize: "0.875rem", mt: 0.5 }}>{selected.label}</Box>
            {selected.secondary && (
              <Box sx={{ fontFamily: "monospace", fontSize: 12, color: "#003d96" }}>CIE-10: {selected.secondary}</Box>
            )}
          </Box>
        )}
        <Box sx={{ mt: 3, fontFamily: "monospace", fontSize: 11, color: "#9CA3AF" }}>
          Escribe al menos 2 caracteres para ver resultados (simulados).
          <br />Modo "CIE-10": escribe el código (ej: "J06", "A09")
          <br />Modo "Por nombre": escribe parte del diagnóstico
        </Box>
      </Box>
    )
  },
  args: { loading: false, disabled: false, debounceMs: 300 },
}

/** Estado loading forzado */
export const Loading: Story = {
  name: "Estado — cargando",
  render: () => (
    <Box sx={{ maxWidth: 600, p: 3 }}>
      <SearchComboInput
        label="Motivo de ingreso"
        value="neumon"
        loading
      />
    </Box>
  ),
}

/** Estado disabled */
export const Disabled: Story = {
  name: "Estado — deshabilitado",
  render: () => (
    <Box sx={{ maxWidth: 600, p: 3 }}>
      <SearchComboInput
        label="Motivo de ingreso"
        value="Neumonía"
        disabled
      />
    </Box>
  ),
}

/** Modo CIE-10 por defecto */
export const ModoCIE10: Story = {
  name: "Modo CIE-10 por defecto",
  render: () => {
    const [mode, setMode] = useState<SearchMode>("cie10")
    const [value, setValue] = useState("")
    const [options, setOptions] = useState<SearchOption[]>([])

    return (
      <Box sx={{ maxWidth: 600, p: 3 }}>
        <SearchComboInput
          label="Diagnóstico CIE-10"
          searchMode={mode}
          onSearchModeChange={m => { setMode(m); setValue(""); setOptions([]) }}
          value={value}
          onChange={setValue}
          options={options}
          onSearch={(q, m) => setOptions(filterOptions(q, m))}
          onSelect={opt => { setValue(opt.label); setOptions([]) }}
        />
      </Box>
    )
  },
}
