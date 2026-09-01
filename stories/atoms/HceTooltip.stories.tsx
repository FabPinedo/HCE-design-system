import type { Meta, StoryObj } from "@storybook/react";
import { Box, hceColors, HceTooltip, UiDisketteIcon, IconButton } from "@hce/design-system";

const meta: Meta<typeof HceTooltip> = {
  title: "Atoms/HceTooltip",
  component: HceTooltip,
  tags: ["autodocs"],
  render: (args) => (
    <HceTooltip {...args}>
      <Box
        sx={{
          cursor: "pointer",
          borderRadius: "8px",
          backgroundColor: hceColors.primary.blue[600],
          color: "#fff",
          p: 0.4,
          fontSize: 13,
        }}
      >
        <IconButton icon={<UiDisketteIcon size={16} color="#fff" />} />
      </Box>
    </HceTooltip>
  ),
  argTypes: {
    placement: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
    },
  },
};
export default meta;

type Story = StoryObj<typeof HceTooltip>;

/** Tooltip por defecto (abajo) */
export const Default: Story = {
  args: { title: "Guardar", placement: "bottom" },
};

/** Tooltip arriba */
export const HceTooltipTop: Story = {
  args: { title: "Guardar", placement: "top" },
};

/** Tooltip a la izquierda */
export const HceTooltipLeft: Story = {
  args: { title: "Guardar", placement: "left" },
};

/** Tooltip a la derecha */
export const HceTooltipRight: Story = {
  args: { title: "Guardar", placement: "right" },
};