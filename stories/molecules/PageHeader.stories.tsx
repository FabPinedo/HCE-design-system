import type { Meta, StoryObj } from '@storybook/react'
import { PageHeader } from '@hce/design-system'

const meta: Meta<typeof PageHeader> = {
  title: 'Molecules/PageHeader',
  component: PageHeader,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof PageHeader>

export const Default: Story = {
  args: {
    title: "title",
    description: "description",
  },
}
