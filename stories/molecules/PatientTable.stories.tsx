import type { Meta, StoryObj } from '@storybook/react'
import { PatientTable } from '@hce/design-system'

const meta: Meta<typeof PatientTable> = {
  title: 'Molecules/PatientTable',
  component: PatientTable,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof PatientTable>

export const Default: Story = {
  args: {
    maxHeight: "maxHeight",
  },
}
