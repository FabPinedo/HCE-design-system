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
  /** Hook de pruebas E2E — id base, sufijado `-{value}` en cada tab. */
  testId?: string;
}

export const NavTab = ({tabs, value, onChange, testId}: Props) => {
  return (
    <div className="hce-navtab-list" role="tablist" data-testid={testId}>
        {tabs.map((tab)=>(
            <button
            type="button"
            role="tab"
            className={`hce-navtab-item${value === tab.value ? " hce-navtab-item--selected" : ""}`}
            key={tab.value}
            aria-selected={value === tab.value}
            disabled={tab.disabled}
            onClick={() => onChange(tab.value)}
            data-testid={testId ? `${testId}-${tab.value}` : undefined}
            >
                {tab.label}
            </button>
        ))}
    </div>
  )
}
