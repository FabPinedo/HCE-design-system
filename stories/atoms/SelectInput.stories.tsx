import type { Meta, StoryObj } from '@storybook/react'
import { SelectInput } from '@hce/design-system'

const EMPRESAS = [
  { value: "CENTRAL", label: "Sede Central" },
  { value: "NORTE",   label: "Sede Norte"   },
  { value: "SUR",     label: "Sede Sur"     },
]

const meta: Meta<typeof SelectInput> = {
  title: 'Atoms/SelectInput',
  component: SelectInput,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof SelectInput>

export const Default: Story = {
  args: {
    label: "label",
    value: "value",
    disabled: false,
    fullWidth: false,
    size: "small",
    required: false,
    options: EMPRESAS
  },
}
