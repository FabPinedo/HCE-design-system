import type { Meta, StoryObj } from '@storybook/react'
import { RadioGroup } from '@hce/design-system'
import { useState } from 'react'

const OPCIONES = [
  "Si",
  "No"
];

const meta: Meta<typeof RadioGroup> = {
  title: 'Molecules/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof RadioGroup>

export const Default: Story = {
  render: (args) => {
  const [value, setValue] = useState<string>("No");
    return <RadioGroup {...args} value={value} onChange={(v) => {
          setValue(v);          
          args.onChange?.(v);   
        }} />;
  },
  args: {
    name: "Grupo",
    legend: "Grupo de Radio",
    value: "No",
    options: OPCIONES,
    disabled: false,
    onChange: (v) => console.log("seleccion radio: ", v)
  }
}
