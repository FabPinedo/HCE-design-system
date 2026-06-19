import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "@hce/design-system";
import { useState } from "react";

const meta: Meta<typeof Checkbox> = {
  title: "Atoms/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  render: (args) => {
    const [checked, setChecked] = useState<boolean>(false);
    const handleChange = (value: boolean) => {
      setChecked(value);
      args.onChange?.(value)
    }
    return (
      <Checkbox
        {...args}
        checked= {checked}
        onChange={handleChange}
      />
    );
  },
  args: {
    label: "label",
    checked: false,
    disabled: false,
    onChange: (v) => console.log("check",v),
  },
};
