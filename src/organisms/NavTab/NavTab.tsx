import { Tabs, Tab, type BoxProps, Box } from "@mui/material"
import { hceColors } from "../../tokens/hce.tokens";

export interface NavTabItem {
  label: string;
  value: string;
  disabled?: boolean;
}

interface NavTabProps {
  tabs: NavTabItem[];
  value: string;
  onChange: (v: string) => void;
}

const a11yProps = (value: string) => ({
  id: `nav-tab-${value}`,
  "aria-controls": `nav-tabpanel-${value}`,
});

export const NavTab = ({ tabs, value, onChange }: NavTabProps) => {
  return (
    <Tabs
      value={value}
      onChange={(_, newValue) => onChange(newValue)}
      sx={{
        minHeight: 0,
        "& .MuiTabs-indicator": {
          display: "none", // el fondo ya indica selección, no necesitas la barrita
        },
        "& .MuiTab-root": {
          borderRadius: "8px 8px 0 0",
          color: hceColors.primary.blue[100],
          backgroundColor: hceColors.primary.blue[50],
          minHeight: 0,
          textTransform: "none",
        },
        "& .MuiTab-root.Mui-selected": {
          color: hceColors.neutro.white[50],
          backgroundColor: hceColors.primary.blue[600],
          fontWeight: 600,
        },
        "& .MuiTab-root.Mui-disabled": {
          opacity: 0.5,
        },
      }}
    >
      {tabs.map((tab) => (
        <Tab
          key={tab.value}
          value={tab.value}
          label={tab.label}
          disabled={tab.disabled}
          {...a11yProps(tab.value)}
        />
      ))}
    </Tabs>
  );
};

// --- Panel asociado, con la misma lógica de accesibilidad ---
interface NavTabPanelProps extends BoxProps {
  value: string;
  currentValue: string;
}

export const NavTabPanel = ({
  value,
  currentValue,
  children,
  ...boxProps
}: NavTabPanelProps) => {
  const isActive = value === currentValue;

  return (
    <Box
      role="tabpanel"
      hidden={!isActive}
      id={`nav-tabpanel-${value}`}
      aria-labelledby={`nav-tab-${value}`}
      {...boxProps}
    >
      {isActive && children}
    </Box>
  );
};