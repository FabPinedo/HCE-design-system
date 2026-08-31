import "./NavTab.css"

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
    <div className="hce-navtab-list" role="tablist">
        {tabs.map((tab)=>(
            <button
            type="button"
            role="tab"
            className={`hce-navtab-item${value === tab.value ? " hce-navtab-item--selected" : ""}`}
            key={tab.value}
            aria-selected={value === tab.value}
            disabled={tab.disabled}
            onClick={() => onChange(tab.value)}
            >
                {tab.label}
            </button>
        ))}
    </div>
  )
}
