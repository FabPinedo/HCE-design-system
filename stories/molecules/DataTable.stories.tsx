import type { Meta, StoryObj } from '@storybook/react'
import { DataTableSimple } from '@hce/design-system'

type Row = { id: string; name: string; status: string }

const meta: Meta<typeof DataTableSimple<Row>> = {
  title: 'Molecules/DataTable',
  component: DataTableSimple,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof DataTableSimple<Row>>

const columns = [
  { key: 'id',     label: 'ID' },
  { key: 'name',   label: 'Nombre' },
  { key: 'status', label: 'Estado' },
]

const rows: Row[] = [
  { id: '1', name: 'Elemento A', status: 'Activo' },
  { id: '2', name: 'Elemento B', status: 'Inactivo' },
]

export const Default: Story = {
  args: {
    columns,
    rows,
    emptyMessage: 'No hay datos disponibles.',
  },
}

export const Empty: Story = {
  args: {
    columns,
    rows: [],
    emptyMessage: 'No hay datos disponibles.',
  },
}
