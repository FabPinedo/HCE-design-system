import type { Meta, StoryObj } from "@storybook/react";
import { Box, hceColors, HceTooltip, UiDisketteIcon, IconButton } from "@hce/design-system";

const meta: Meta<typeof HceTooltip> = {
  title: "Atoms/Tooltip",
  component: HceTooltip,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof HceTooltip>;

/**Tooltip por defecto (tootip abajo) */
export const Default: Story = {
  render: (args) => (
    <HceTooltip {...args}>
      <Box
        sx={{
          cursor: "pointer",
          borderRadius: "8px",
          backgroundColor: hceColors.primary.blue[600],
          color: "#fff",
          p: .4,
          fontSize: 13,
        }}
      >
        <IconButton icon={<UiDisketteIcon size={16} color="#fff" />} />
      </Box>
    </HceTooltip>
  ),
  args: {
    title: "Guardar",
    placement:"bottom"
  },
};

/**Tooltip arriba */

export const HceTooltipTop: Story = {
  render: (args) => (
    <HceTooltip {...args}>
      <Box
        sx={{
          cursor: "pointer",
          borderRadius: "8px",
          backgroundColor: hceColors.primary.blue[600],
          color: "#fff",
          p: .4,
          fontSize: 13,
        }}
      >
        <IconButton icon={<UiDisketteIcon size={16} color="#fff" />} />
      </Box>
    </HceTooltip>
  ),
  args: {
    title: "Guardar",
    placement: "top"
  },
};


/**Tooltip a la izquierda */

export const HceTooltipLeft: Story = {
  render: (args) => (
    <HceTooltip {...args}>
      <Box
        sx={{
          cursor: "pointer",
          borderRadius: "8px",
          backgroundColor: hceColors.primary.blue[600],
          color: "#fff",
          p: .4,
          fontSize: 13,
        }}
      >
        <IconButton icon={<UiDisketteIcon size={16} color="#fff" />} />
      </Box>
    </HceTooltip>
  ),
  args: {
    title: "Guardar",
    placement: "left"
  },
};


/**Tooltip a la derecha */

export const HceTooltipRight: Story = {
  render: (args) => (
    <HceTooltip {...args}>
      <Box
        sx={{
          cursor: "pointer",
          borderRadius: "8px",
          backgroundColor: hceColors.primary.blue[600],
          color: "#fff",
          p: .4,
          fontSize: 13,
        }}
      >
        <IconButton icon={<UiDisketteIcon size={16} color="#fff" />} />
      </Box>
    </HceTooltip>
  ),
  args: {
    title: "Guardar",
    placement: "right"
  },
};