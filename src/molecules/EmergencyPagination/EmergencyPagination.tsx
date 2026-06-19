/**
 * ---------------------------------------------------------
 * Component: EmergencyPagination
 * Description:
 * Componente de paginación alineado a la derecha para la
 * tabla de pacientes del Monitor de Emergencia.
 * ---------------------------------------------------------
 */
import { Box, Chip, IconButton, Typography } from "@mui/material"
import ChevronLeftIcon  from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import { hceClinicalColors, hceSpacing, hceTypography, hceBorderRadius } from "../../tokens/hce.tokens"

interface Props {
  /** Número total de registros */
  totalItems:   number
  /** Página actualmente activa (1-based) */
  currentPage:  number
  /** Número total de páginas */
  totalPages:   number
  /** Callback al cambiar de página */
  onPageChange: (page: number) => void
  /** Máximo de páginas visibles a ambos lados de la página actual (default: 2) */
  siblingCount?: number
}

/** Genera el array de páginas visibles con "..." cuando corresponde */
function buildPageRange(current: number, total: number, siblings: number): (number | "...")[] {
  if (total <= siblings * 2 + 5) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const pages: (number | "...")[] = [1]
  const rangeStart = Math.max(2, current - siblings)
  const rangeEnd   = Math.min(total - 1, current + siblings)

  if (rangeStart > 2)       pages.push("...")
  for (let i = rangeStart; i <= rangeEnd; i++) pages.push(i)
  if (rangeEnd < total - 1) pages.push("...")
  pages.push(total)

  return pages
}

const navButtonSx = {
  width:           28,
  height:          28,
  borderRadius:    "50%",
  border:          `1px solid ${hceClinicalColors.border}`,
  backgroundColor: "#FFFFFF",
  color:           hceClinicalColors.textSecondary,
  padding:         0,
  "&:hover:not(.Mui-disabled)": {
    backgroundColor: hceClinicalColors.hoverBg,
    borderColor:     hceClinicalColors.tableHeaderBg,
    color:           hceClinicalColors.tableHeaderBg,
  },
  "&.Mui-disabled": { opacity: 0.4 },
}

export const EmergencyPagination = ({
  totalItems,
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 2,
}: Props) => {
  const pages = buildPageRange(currentPage, totalPages, siblingCount)

  return (
    <Box
      sx={{
        display:         "flex",
        alignItems:      "center",
        justifyContent:  "flex-end",
        gap:             "6px",
        padding:         `${hceSpacing[3]} ${hceSpacing[4]}`,
      }}
      role="navigation"
      aria-label="Paginación de pacientes"
    >
      {/* Total de items */}
      <Chip
        label={`${totalItems} pacientes`}
        size="small"
        sx={{
          backgroundColor: hceClinicalColors.rowAlternate,
          color:           hceClinicalColors.textPrimary,
          fontFamily:      hceTypography.fontFamilyClinical,
          fontSize:        "12px",
          fontWeight:      hceTypography.weight.medium,
          height:          26,
          borderRadius:    hceBorderRadius.sm,
          border:          `1px solid ${hceClinicalColors.border}`,
          marginRight:     "8px",
          "& .MuiChip-label": { padding: "0 10px" },
        }}
      />

      {/* Botón anterior */}
      <IconButton
        size="small"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        sx={navButtonSx}
        aria-label="Página anterior"
      >
        <ChevronLeftIcon sx={{ fontSize: 16 }} />
      </IconButton>

      {/* Páginas */}
      {pages.map((page, idx) =>
        page === "..." ? (
          <Typography
            key={`ellipsis-${idx}`}
            sx={{
              fontFamily: hceTypography.fontFamilyClinical,
              fontSize:   "12px",
              color:      hceClinicalColors.textSecondary,
              userSelect: "none",
              padding:    "0 2px",
            }}
          >
            …
          </Typography>
        ) : (
          <IconButton
            key={page}
            size="small"
            onClick={() => onPageChange(page)}
            sx={{
              width:           28,
              height:          28,
              borderRadius:    hceBorderRadius.sm,
              border:          `1px solid ${page === currentPage ? hceClinicalColors.tableHeaderBg : hceClinicalColors.border}`,
              backgroundColor: page === currentPage ? hceClinicalColors.tableHeaderBg : "#FFFFFF",
              color:           page === currentPage ? "#FFFFFF" : hceClinicalColors.textSecondary,
              fontFamily:      hceTypography.fontFamilyClinical,
              fontSize:        "12px",
              fontWeight:      page === currentPage ? hceTypography.weight.bold : hceTypography.weight.regular,
              padding:         0,
              "&:hover": {
                backgroundColor: page === currentPage ? hceClinicalColors.headerBg : hceClinicalColors.hoverBg,
                borderColor:     page === currentPage ? hceClinicalColors.headerBg : hceClinicalColors.tableHeaderBg,
              },
            }}
            aria-label={`Página ${page}`}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </IconButton>
        )
      )}

      {/* Botón siguiente */}
      <IconButton
        size="small"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        sx={navButtonSx}
        aria-label="Página siguiente"
      >
        <ChevronRightIcon sx={{ fontSize: 16 }} />
      </IconButton>
    </Box>
  )
}
