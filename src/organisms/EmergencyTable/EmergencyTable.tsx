import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
} from "@mui/material"
import { PatientRow } from "../../molecules/PatientRow/PatientRow"
import type { PatientRowData } from "../../molecules/PatientRow/PatientRow"
import { hceClinicalColors, hceBorderRadius, hceShadows, hceTypography, hceUi } from "../../tokens/hce.tokens"

/** Definición de columnas del header */
interface HeaderColumn {
  label: string
  width: number
  align: "center" | "left"
}

interface Props {
  /** Array de datos de pacientes para renderizar en la tabla */
  rows: PatientRowData[]
  header: HeaderColumn[]
  /** Altura máxima del contenedor con scroll (default: "100%") */
  maxHeight?: string
}

export const EmergencyTable = ({ rows, header, maxHeight = "100%" }: Props) => {
  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        border:       `1px solid ${hceClinicalColors.border}`,
        borderRadius: hceBorderRadius.lg,
        overflow:     "auto",
        maxHeight,
        boxShadow:    hceShadows.table,
      }}
    >
      <Table stickyHeader size="small" sx={{ minWidth: 1100 }}>
        {/* ── Header sticky ── */}
        <TableHead>
          <TableRow>
            {header.map((col) => (
              <TableCell
                key={col.label}
                align={col.align}
                sx={{
                  width:    col.width,
                  minWidth: col.width,
                  height:   40,
                  padding:  "0 8px",
                  borderBottom: "none",
                  whiteSpace: "nowrap",

                  // Sticky header styles
                  backgroundColor: hceUi.textPrimaryTable,
                  color:           hceClinicalColors.textOnHeader,
                  fontFamily:      hceTypography.fontFamily,
                  fontSize:        hceTypography.size.md,
                  fontWeight:      hceTypography.weight.semibold,
                  textTransform:   "uppercase",
                  letterSpacing:   "0.5px",

                  // MUI sticky header override
                  "&.MuiTableCell-stickyHeader": {
                    backgroundColor: hceClinicalColors.tableHeaderBg,
                  },
                }}
              >
                {col.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        {/* ── Body ── */}
        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={header.length}
                sx={{
                  textAlign: "center",
                  height:    120,
                  borderBottom: "none",
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", color: hceClinicalColors.textSecondary }}>
                  <Typography sx={{ fontFamily: hceTypography.fontFamilyClinical, fontSize: "14px", color: hceClinicalColors.textSecondary }}>
                    No hay pacientes en el Monitor de Emergencia
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row, index) => (
              <PatientRow
                key={row.id}
                data={row}
                isAlternate={index % 2 === 1}
              />
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
