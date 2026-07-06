import type { Meta, StoryObj } from '@storybook/react'
import { HceBreadcrumb } from '@hce/design-system'

const meta: Meta<typeof HceBreadcrumb> = {
  title: 'Atoms/HceBreadcrumb',
  component: HceBreadcrumb,
  tags: ['autodocs'],
}
export default meta


type Story = StoryObj<typeof HceBreadcrumb>

export const Default: Story = {
  args: {
    items: [
      {
        label: "Home",
      },
      {
        label: "Monitor de emergencia",
      },
    ],
  },
}

export const WithMultipleLevels: Story = {
  args: {
    items: [
      {
        label: "Home",
      },
      {
        label: "Emergencia",
      },
      {
        label: "Monitor de emergencia",
      },
    ],
  },
}

export const WithClick: Story = {
  args: {
    items: [
      {
        label: "Home",
        href: "/home",
      },
      {
        label: "Monitor de emergencia",
      },
    ],
    onItemClick: (item:any, index:number) => {
      console.info("[HceBreadcrumb] click:", { item, index })
    },
  },
}

export const DisabledItem: Story = {
  args: {
    items: [
      {
        label: "Home",
        disabled: true,
      },
      {
        label: "Emergencia",
      },
      {
        label: "Monitor de emergencia",
      },
    ],
  },
}
