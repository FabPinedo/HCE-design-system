import type { Meta, StoryObj } from '@storybook/react'
import { Card } from '@hce/design-system'

const meta: Meta<typeof Card> = {
  title: 'Molecules/Card',
  component: Card,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof Card>

export const Default: Story = {
  args: {
    title: "title",
    noPadding: false,
  },
}
