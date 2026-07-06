import type { Meta, StoryObj } from '@storybook/react'
import { WaitingBadge } from '@hce/design-system'

const meta: Meta<typeof WaitingBadge> = {
  title: 'Atoms/WaitingBadge',
  component: WaitingBadge,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: "text",
      description: "Minutos de espera. Ejemplo: 22 se muestra como 00:22:00",
    },
    color: {
      control: "select",
      options: ["green", "yellow", "red", null],
      description: "Color del badge según el tiempo de espera",
    },
  },
}
export default meta

type Story = StoryObj<typeof WaitingBadge>

export const Default: Story = {
  args: {
    label: "22",
    color: null,
  },
}

export const Green: Story = {
  args: {
    label: "10",
    color: "green",
  },
}

export const Yellow: Story = {
  args: {
    label: "35",
    color: "yellow",
  },
}

export const Red: Story = {
  args: {
    label: "70",
    color: "red",
  },
}

export const Empty: Story = {
  args: {
    label: "",
    color: null,
  },

}
