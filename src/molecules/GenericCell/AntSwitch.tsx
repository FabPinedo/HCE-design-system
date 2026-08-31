import "./AntSwitch.css"

interface AntSwitchProps {
  checked: boolean
  disabled?: boolean
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  /** Hook de pruebas E2E — `data-testid` en el `<input>`. */
  testId?: string
}

/** Toggle switch compacto (28x16) — reemplazo del `styled(Switch)` de MUI. */
export function AntSwitch({ checked, disabled, onClick, onChange, testId }: AntSwitchProps) {
  return (
    <span className="hce-antswitch">
      <input
        type="checkbox"
        className="hce-antswitch__input"
        checked={checked}
        disabled={disabled}
        onClick={onClick}
        onChange={onChange}
        aria-checked={checked}
        role="switch"
        data-testid={testId}
      />
      <span className="hce-antswitch__track" />
      <span className="hce-antswitch__thumb" />
    </span>
  )
}
