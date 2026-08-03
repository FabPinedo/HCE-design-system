// DataTable.tsx (organism)
import type { ReactNode } from "react"

interface Column {
  field: string
  header: string
  // Permite pasar una función para renderizar algo complejo (ej. un Chip o un gráfico)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render?: (value: any, row: any) => ReactNode
}

interface Props {
  columns: Column[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rows: any[]
}

export const DataTable = ({ columns, rows }: Props) => {
  return (
    <div
      className="jarvis-table-container"
      style={{ borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: 'none', boxSizing: 'border-box' }}
    >
      <div className="jarvis-table-wrapper">
        <table className="jarvis-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {columns.map(col => (
                <th
                  key={col.field}
                  style={{
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
                    position: 'sticky',
                    top: 0,
                    boxSizing: 'border-box',
                  }}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.id || i}>
                {columns.map(col => (
                  <td key={col.field} style={{ padding: '10px 16px' }}>
                    {col.render
                      ? col.render(row[col.field], row)
                      : row[col.field]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
