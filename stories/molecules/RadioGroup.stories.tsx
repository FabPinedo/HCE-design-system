import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup } from "@hce/design-system";
import { useState } from "react";

const OPCIONESDEFAULT = [
  { value: true, label: "Verdadero" },
  { value: false, label: "Falso" },
];

const OPCIONESSTRING = [
  { value: "Si", label: "Verdadero" },
  { value: "No", label: "Falso" },
];

const meta: Meta<typeof RadioGroup> = {
  title: "Molecules/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof RadioGroup<string | boolean>>;

export const ValorBoolean: Story = {
  render: (args) => {
    const [value, setValue] = useState<boolean | string>(false);
    return (
      <RadioGroup
        {...args}
        value={value}
        onChange={(v) => {
          setValue(v);
          args.onChange?.(v);
        }}
      />
    );
  },
  args: {
    legend: "Grupo de Radio",
    value: false,
    options: OPCIONESDEFAULT,
    disabled: false,
    onChange: (v) => console.log("seleccion radio: ", v),
  },
};

export const ValorString: Story = {
  render: (args) => {
    const [value, setValue] = useState<boolean | string>("No");
    return (
      <RadioGroup
        {...args}
        value={value}
        onChange={(v) => {
          setValue(v);
          args.onChange?.(v);
        }}
      />
    );
  },
  args: {
    legend: "Grupo de Radio",
    value: "No",
    options: OPCIONESSTRING,
    disabled: false,
    onChange: (v) => console.log("seleccion radio: ", v),
  },
};
