import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { NavTab, NavTabPanel, type NavTabItem } from '../../src/organisms/NavTab/NavTab';

const tabs: NavTabItem[] = [
  { label: "Resumen", value: "summary" },
  { label: "Detalles", value: "details" },
  { label: "Historial", value: "history", disabled: true },
];
const meta: Meta<typeof NavTab> = {
  title: 'Organisms/NavTab',
  component: NavTab,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof NavTab>

export const Default: Story = {
  render:(args)=> {
    const [tab, setTab] = useState("summary");
    return <>
      <NavTab tabs={tabs} value={tab} onChange={setTab} />

      <NavTabPanel value="summary" currentValue={tab}>
        Contenido 1
      </NavTabPanel>

      <NavTabPanel value="details" currentValue={tab}>
         Contenido 2
      </NavTabPanel>

      <NavTabPanel value="history" currentValue={tab}>
         Contenido 3
      </NavTabPanel>
    </>
  },
  args: {
    tabs: tabs,
    value: "summary",
    onChange: (v) => console.log("seleccion Tab: ", v)
  },
}
