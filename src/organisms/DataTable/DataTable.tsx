// DataTable.tsx (organism)
import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@mui/material"
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
    <Paper elevation={0} className="jarvis-table-container" sx={{ borderRadius: '12px', border: '1px solid #E2E8F0' }}>
      <div className="jarvis-table-wrapper">
        <Table stickyHeader className="jarvis-table">
          <TableHead>
            <TableRow>
              {columns.map(col => (
                <TableCell
                  key={col.field}
                  sx={{
                    backgroundColor: '#2B5BA8',
                    color: '#fff !important',
                    fontSize: 12,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                    borderColor: '#2B5BA8',
                    py: 1.25,
                    '&.MuiTableCell-stickyHeader': {
                      backgroundColor: '#2B5BA8',
                      color: '#fff',
                    },
                  }}
                >
                  {col.header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow key={row.id || i}>
                {columns.map(col => (
                  <TableCell key={col.field}>
                    {col.render
                      ? col.render(row[col.field], row)
                      : row[col.field]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Paper>
  )
}
