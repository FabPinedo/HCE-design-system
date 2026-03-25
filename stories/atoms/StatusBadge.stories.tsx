import type { Meta, StoryObj } from '@storybook/react'
import { StatusBadge } from '@hce/design-system'

const meta: Meta<typeof StatusBadge> = {
  title: 'Atoms/StatusBadge',
  component: StatusBadge,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof StatusBadge>

export const Default: Story = {
  args: {
    label: "label",
  },
}
