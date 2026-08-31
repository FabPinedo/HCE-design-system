import type { Meta, StoryObj } from '@storybook/react'
import { PatientField } from '@hce/design-system'

const meta: Meta<typeof PatientField> = {
  title: 'Atoms/PatientField',
  component: PatientField,
  tags: ['autodocs'],
  argTypes: {
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: 'Alineación del label y el value (se aplica como textAlign al contenedor raíz).',
      table: { defaultValue: { summary: 'left' } },
    },
    testId: {
      control: 'text',
      description: 'Hook de pruebas E2E (Playwright) — se renderiza como data-testid en el contenedor raíz.',
    },
    className: {
      control: 'text',
      description: 'Clase CSS extra en el contenedor raíz.',
    },
  },
}
export default meta

type Story = StoryObj<typeof PatientField>

export const Default: Story = {
  args: {
    label: 'Paciente:',
    value: 'Sofía González Pérez',
  },
}

// ── Alignments ────────────────────────────────────────────

/** Las 3 alineaciones soportadas, lado a lado */
export const AllVariants: Story = {
  name: 'AllVariants — alineaciones',
  render: () => (
    <div style={{ display: 'flex', gap: 24, width: 480 }}>
      <PatientField label="Izquierda:" value="Alineado a la izquierda" align="left" />
      <PatientField label="Centro:" value="Alineado al centro" align="center" />
      <PatientField label="Derecha:" value="Alineado a la derecha" align="right" />
    </div>
  ),
}
