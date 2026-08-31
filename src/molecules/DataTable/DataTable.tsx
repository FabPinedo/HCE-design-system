import "./DataTable.css"
import type { ReactNode } from "react"
import { hceTypography } from "../../tokens/hce.tokens"

interface Column<T = unknown> {
  key: string
  label: string
  width?: string | number
  render?: (value: unknown, row: T) => ReactNode
}

interface Props<T = object> {
  columns: Column<T>[]
  rows: T[]
  emptyMessage?: string
  /** Hook de pruebas E2E — id base del contenedor; sufijado `-row-{index}` en cada fila. */
  testId?: string
}

export const DataTable = <T extends object>({
  columns,
  rows,
  emptyMessage = 'No hay datos disponibles.',
  testId,
}: Props<T>) => {
  return (
    <div
      data-testid={testId}
      style={{
        borderRadius: 24, // sx borderRadius:3 de MUI -> ×8 (theme.shape.borderRadius)
        border: '1px solid #D0DBF0',
        boxShadow: '0 2px 12px rgba(26,58,107,0.08)',
        overflowX: 'auto',
        backgroundColor: '#ffffff',
        boxSizing: 'border-box',
      }}
    >
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                style={{
                  width: col.width,
                  backgroundColor: '#2B5BA8',
                  color: '#fff',
                  fontSize: 12,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  borderColor: '#2B5BA8',
                  borderStyle: 'solid',
                  borderWidth: '0 0 1px 0',
                  padding: '10px 16px',
                  textAlign: 'left',
                  boxSizing: 'border-box',
                }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} style={{ textAlign: 'center', padding: '40px 16px' }}>
                <span style={{ fontFamily: hceTypography.fontFamily, fontSize: '0.875rem', color: '#5A6A85' }}>
                  {emptyMessage}
                </span>
              </td>
            </tr>
          ) : (
            rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="hce-datatable-row"
                data-testid={testId ? `${testId}-row-${rowIndex}` : undefined}
                style={{
                  backgroundColor: rowIndex % 2 === 1 ? '#F4F7FB' : '#fff',
                  cursor: 'default',
                }}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    style={{
                      fontSize: 13,
                      color: '#1C2B4A',
                      borderColor: '#D0DBF0',
                      borderStyle: 'solid',
                      borderWidth: '0 0 1px 0',
                      padding: '10px 16px',
                      verticalAlign: 'middle',
                      boxSizing: 'border-box',
                    }}
                  >
                    {col.render
                      ? col.render((row as Record<string, unknown>)[col.key], row)
                      : (
                        <span>
                          {(row as Record<string, unknown>)[col.key] !== undefined && (row as Record<string, unknown>)[col.key] !== null
                            ? String((row as Record<string, unknown>)[col.key])
                            : '—'}
                        </span>
                      )}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
