import type { ReactNode, CSSProperties } from "react"
import { hceTypography } from "../../tokens/hce.tokens"

interface Props {
  children?: ReactNode
  title?: string
  actions?: ReactNode
  style?: CSSProperties
  noPadding?: boolean
  /** Hook de pruebas E2E — `data-testid` en el nodo raíz. */
  testId?: string
}

export const Card = ({ children, title, actions, style, noPadding, testId }: Props) => {
  return (
    <div
      data-testid={testId}
      style={{
        // borderRadius: 3 en sx de MUI se multiplicaba por theme.shape.borderRadius
        // (8px) => 24px, no 3px.
        borderRadius: 24,
        boxShadow: '0 2px 12px rgba(26,58,107,0.08)',
        border: '1px solid #D0DBF0',
        backgroundColor: '#ffffff',
        overflow: 'hidden',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      <div style={{ padding: noPadding ? 0 : 20, boxSizing: 'border-box' }}>
        {title && (
          <>
            <div style={{ fontFamily: hceTypography.fontFamily, fontSize: '1rem', fontWeight: 700, color: '#1C2B4A', marginBottom: 12 }}>
              {title}
            </div>
            <hr style={{ marginBottom: 16, border: 'none', borderTop: '1px solid #D0DBF0' }} />
          </>
        )}
        <div>{children}</div>
        {actions && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
            {actions}
          </div>
        )}
      </div>
    </div>
  )
}
