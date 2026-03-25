import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from '@hce/design-system'

const meta: Meta<typeof Checkbox> = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  args: {
    label: "label",
    checked: false,
    disabled: false,
  },
}
