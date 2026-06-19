import type { Meta, StoryObj } from "@storybook/react";
import { MultiSelect } from "@hce/design-system";
import { useState } from "react";

const EMPRESAS = [
  { value: "CENTRAL", label: "Sede Central" },
  { value: "NORTE", label: "Sede Norte" },
  { value: "SUR", label: "Sede Sur" },
];

const meta: Meta<typeof MultiSelect> = {
  title: "Atoms/MultiSelect",
  component: MultiSelect,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof MultiSelect>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState<string[]>([]);
    return <MultiSelect {...args} value={value} onChange={setValue} />;
  },
  args: {
    options: EMPRESAS,
    label: "Empresas",
    disabled: false,
    fullWidth: true,
    required: false,
  },
};
