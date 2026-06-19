import type { Meta, StoryObj } from '@storybook/react'
import { NavTab } from '@hce/design-system'
import { useState } from 'react'

const TABS = [
{label: "TAB 1", value:"1", disabled:false},
{label: "TAB 2", value:"2", disabled:false},
{label: "TAB 3", value:"3", disabled:false}
]
const meta: Meta<typeof NavTab> = {
  title: 'Organisms/NavTab',
  component: NavTab,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof NavTab>

export const Default: Story = {
  render:(args)=> {
    const [value, setValue] = useState("overview");
    return <NavTab 
    {...args}
    value={value}
    onChange={(v) => {
      setValue(v)
    }}
    />
  },
  args: {
    tabs: TABS,
    value: "1",
    onChange: (v) => console.log("seleccion Tab: ", v)
  },
}
