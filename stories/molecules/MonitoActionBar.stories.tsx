import type { Meta, StoryObj } from "@storybook/react";
import {
  Box,
  MonitoActionBar,
  UiPrintingIcon,
  UiSearchIcon,
  UiStethoscopeIcon,
} from "@hce/design-system";

const meta: Meta<typeof MonitoActionBar> = {
  title: "Molecules/MonitoActionBar",
  component: MonitoActionBar,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    tooltipPlacement: {
      control: { type: "radio" },
      options: ["top", "bottom", "left", "right"],
      description: "Posición del tooltip.",
    },
    orientation: {
      control: { type: "radio" },
      options: ["horizontal", "vertical"],
      description: "Disposición de los botones",
    },
  },
};
export default meta;
type Story = StoryObj<typeof MonitoActionBar>;

const actions = [
  {
    key: "triaje",
    icon: <UiStethoscopeIcon size={17} color="currentColor" />,
    tooltip: "Triaje",
    onClick: () => {},
  },
  {
    key: "reportes",
    icon: <UiPrintingIcon size={17} color="currentColor" />,
    tooltip: "Reportes",
    onClick: () => {},
  },
  {
    key: "auditoria",
    icon: <UiSearchIcon size={17} color="currentColor" />,
    tooltip: "Auditoría",
    onClick: () => {},
  },
];

const actionsDisabled = [
  {
    key: "triaje",
    icon: <UiStethoscopeIcon size={17} color="currentColor" />,
    tooltip: "Triaje",
    onClick: () => {},
  },
  {
    key: "reportes",
    icon: <UiPrintingIcon size={17} color="currentColor" />,
    tooltip: "Reportes",
    onClick: () => {},
    disabled: true,
  },
  {
    key: "auditoria",
    icon: <UiSearchIcon size={17} color="currentColor" />,
    tooltip: "Auditoría",
    onClick: () => {},
  },
];
/** Uso real: barra ancho completo, botones a la izquierda, tooltip abajo */
export const Default: Story = {
  name: "Default — ancho completo",
  render: (args) => (
    <Box sx={{ width: "100%", p: 2 }}>
      <MonitoActionBar {...args} />
    </Box>
  ),
  args: {
    tooltipPlacement: "bottom",
    orientation: "horizontal",
    actions: actions,
    labelBtn: "Asignar médicos",
  },
};

/** Con botones deshabilitados */
export const ConDisabled: Story = {
  name: "Estados disabled",
  render: (args) => (
    <Box sx={{ width: "100%", p: 2 }}>
      <MonitoActionBar {...args} />
    </Box>
  ),
  args: {
    ...Default.args,
    actions: actionsDisabled,
  },
};

/** Orientación vertical — para sidebars */
export const Vertical: Story = {
  name: "Orientación vertical",
  parameters: { layout: "centered" },
  args: {
    ...Default.args,
    orientation: "vertical",
    tooltipPlacement: "right",
  },
};

/** Todas las variantes de tooltip placement */
export const AllVariants: Story = {
  name: "All Variants — placements",
  render: () => (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4, p: 2 }}>
      {(["top", "bottom"] as const).map((p) => (
        <Box key={p}>
          <Box
            sx={{
              fontFamily: "monospace",
              fontSize: 11,
              color: "var(--ds-color-text-secondary, #6B7280)",
              mb: 0.5,
            }}
          >
            placement="{p}" — horizontal
          </Box>
          <MonitoActionBar actions={actions} tooltipPlacement={p} orientation="horizontal" />
        </Box>
      ))}
      <Box sx={{ display: "flex", gap: 6 }}>
        {(["right", "left"] as const).map((p) => (
          <Box key={p}>
            <Box
              sx={{
                fontFamily: "monospace",
                fontSize: 11,
                color: "var(--ds-color-text-secondary, #6B7280)",
                mb: 0.5,
              }}
            >
              placement="{p}" — vertical
            </Box>
            <MonitoActionBar actions={actions} tooltipPlacement={p} orientation="vertical" />
          </Box>
        ))}
      </Box>
    </Box>
  ),
};

/** Playground — controles interactivos */
export const Playground: Story = {
  name: "Playground",
  render: (args) => (
    <Box sx={{ width: "100%", p: 2 }}>
      <MonitoActionBar {...args} />
    </Box>
  ),
  args: {
    tooltipPlacement: "bottom",
    orientation: "horizontal",
    disabled: {},
  },
};
