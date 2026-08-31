import type { Meta, StoryObj } from '@storybook/react'
import { PatientField } from '@hce/design-system'

const meta: Meta<typeof PatientField> = {
  title: 'Atoms/PatientField',
  component: PatientField,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof PatientField>

export const Default: Story = {

}
