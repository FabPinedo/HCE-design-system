import { Tabs, Tab } from "@mui/material"
import { hceColors } from "../../tokens/hce.tokens";

export interface NavTabItem {
    label: string;
    value: string;
    disabled?: boolean;
}

interface Props {
  tabs: NavTabItem[];
  value: string;
  onChange: (v:string) => void;
}

export const NavTab = ({tabs, value, onChange}: Props) => {
  return (
    <Tabs
    sx={{
      
        "& .MuiTab-root": {
            borderRadius: "8px 8px 0 0",
            color: hceColors.primary.blue[100],
            backgroundColor:  hceColors.primary.blue[50],
        },
        "& .MuiTab-root.Mui-selected": {
            color: hceColors.neutro.white[50],
            backgroundColor: hceColors.primary.blue[600],
            fontWeight: 600
        },
    }}
    value={value}
    onChange={(_, newValue) => onChange(newValue)}>
        {tabs.map((tab)=>(
            <Tab
            sx={{color:"#ffffff"}}
            key={tab.value}
            value={tab.value}
            label={tab.value}
            disabled={tab.disabled}
            />
        ))}
    </Tabs>
  )
}