import type { Meta, StoryObj } from "@storybook/react";
import { MultiSelect } from "@hce/design-system";
import { useState } from "react";
const APIRESPONSE = [
  {id: "1"}
]
const EMPRESAS = [
  { value: "1", label: "Sede Central" },
  { value: "2", label: "Sede Norte" },
  { value: "3", label: "Sede Sur" },
];

const EMPRESAS_LABELS_LARGOS = [
  {
    value: "CENTRAL",
    label: "Sede Central - Av. Javier Prado Este 123, San Isidro, Lima",
  },
  { value: "NORTE", label: "Sede Norte" },
  {
    value: "SUR",
    label: "Sede Sur - Complejo Hospitalario Regional del Sur",
  },
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

/**
 * Cubre el caso donde el label de una opción es más largo que el ancho del
 * trigger: el panel desplegable debe mantener el ancho del trigger (no
 * ensancharse) y el texto debe truncarse con ellipsis en vez de superponerse
 * al checkbox.
 */
export const LongLabels: Story = {
  render: (args) => {
    const [value, setValue] = useState<string[]>([]);
    return <MultiSelect {...args} value={value} onChange={setValue} />;
  },
  args: {
    options: EMPRESAS_LABELS_LARGOS,
    label: "Empresas",
    disabled: false,
    fullWidth: true,
    required: false,
  },
};


export const ChecksSeleccionados: Story = {
  render: (args) => {
    const [value, setValue] = useState<string[]>(["1"]);
    return <MultiSelect {...args} value={value} onChange={setValue} />;
  },
  args: {
    options: EMPRESAS,
    label: "Empresas",
    disabled: true,
    fullWidth: true,
    required: false,
  },
};