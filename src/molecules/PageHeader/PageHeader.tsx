import type { ReactNode } from "react"
import { hceTypography } from "../../tokens/hce.tokens"

interface Props {
  icon?: ReactNode
  title: string
  description?: string
  actions?: ReactNode
}

export const PageHeader = ({ icon, title, description, actions }: Props) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: 24,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        {icon && (
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              backgroundColor: '#EEF2F9',
              color: '#1E4FA3',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {icon}
          </div>
        )}
        <div>
          <div style={{ fontFamily: hceTypography.fontFamily, fontSize: '1.25rem', fontWeight: 700, color: '#1C2B4A', lineHeight: 1.3 }}>
            {title}
          </div>
          {description && (
            <div style={{ fontFamily: hceTypography.fontFamily, fontSize: '0.875rem', color: '#5A6A85', marginTop: 4 }}>
              {description}
            </div>
          )}
        </div>
      </div>
      {actions && (
        <div style={{ flexShrink: 0, marginLeft: 16 }}>
          {actions}
        </div>
      )}
    </div>
  )
}
