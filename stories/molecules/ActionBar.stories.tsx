import type { Meta, StoryObj } from "@storybook/react";
import {
  ActionBar,
  AltaMedicaIcon,
  HceHistoryIcon,
  injectHceTokens,
  ReferenceIcon,
  UiBloodTestIcon,
  UiDrugsIcon,
  UiHistoryIcon,
  UiMonitorIcon,
  UiPrescriptionIcon,
  UiPrintingIcon,
  UiXRaysIcon,
  type ExtraAction,
} from "@hce/design-system";
import { UiReferenceIcon } from "../../src/atoms/Icon/SvgIconsHce";

injectHceTokens();

const meta: Meta<typeof ActionBar> = {
  title: "Molecules/ActionBar",
  component: ActionBar,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj<typeof ActionBar>;

const LISTADO: ExtraAction[] = [
  {
    id: "monitor",
    labelTooltip: "Monitor",
    icon: UiMonitorIcon,
    onClick: () => console.log("Abriendo monitor..."),
    disabled: false,
  },
  {
    id: "laboratorio",
    labelTooltip: "Laboratorio",
    icon: UiBloodTestIcon,
    onClick: () => console.log("Abriendo laboratorio..."),
    disabled: false,
  },
  {
    id: "imagenes",
    labelTooltip: "Imagenes",
    icon: UiXRaysIcon,
    onClick: () => console.log("Abriendo imagenes..."),
    disabled: false,
  },
  {
    id: "receta_alta",
    labelTooltip: "Receta de alta",
    icon: UiPrescriptionIcon,
    onClick: () => console.log("Abriendo receta de alta..."),
    disabled: false,
  },
  {
    id: "alta_medica",
    labelTooltip: "Alta medica",
    icon: AltaMedicaIcon,
    onClick: () => console.log("Abriendo alta medica..."),
    disabled: false,
  },
  {
    id: "imprimir_reporte",
    labelTooltip: "Imprimir reporte",
    icon: UiPrintingIcon,
    onClick: () => console.log("Abriendo imprimir reporte..."),
    disabled: false,
  },
  {
    id: "indicaciones_actuales",
    labelTooltip: "Indicaciones actuales",
    icon: UiDrugsIcon,
    onClick: () => console.log("Abriendo indicaciones actuales..."),
    disabled: false,
  },
  {
    id: "historial_atenciones",
    labelTooltip: "Historial de atenciones",
    icon: HceHistoryIcon,
    onClick: () => console.log("Abriendo historial de atenciones..."),
    disabled: false,
  },
  {
    id: "referencia",
    labelTooltip: "Referencia",
    icon: UiReferenceIcon,
    onClick: () => console.log("Abriendo referencia..."),
    disabled: false,
  },
];

export const Default: Story = {
  render: (args) => <ActionBar {...args} />,
  args: {
    orientation: "horizontal",
    actions: LISTADO,
    closeAction: false
  },
};
