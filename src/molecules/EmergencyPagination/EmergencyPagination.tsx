/**
 * ---------------------------------------------------------
 * Component: EmergencyPagination
 * Description:
 * Componente de paginación alineado a la derecha para la
 * tabla de pacientes del Monitor de Emergencia.
 * ---------------------------------------------------------
 */
import type { CSSProperties } from "react"
import "./EmergencyPagination.css"
import { hceSpacing, hceTypography } from "../../tokens/hce.tokens"

interface summaryContent{

  label:string
  value:number

}

interface Props {
  /** Número total de registros */
  summary:   summaryContent[]
  /** Página actualmente activa (1-based) */
  currentPage:  number
  /** Número total de páginas */
  totalPages:   number
  /** Callback al cambiar de página */
  onPageChange: (page: number) => void
  /** Máximo de páginas visibles a ambos lados de la página actual (default: 2) */
  siblingCount?: number
  /**
   * Hook de pruebas E2E — id base. Se sufija `-prev`, `-next`,
   * `-page-{n}` en los botones correspondientes.
   */
  testId?: string
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

function ChevronLeftGlyph() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 6 9 12 15 18" />
    </svg>
  )
}
function ChevronRightGlyph() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 6 15 12 9 18" />
    </svg>
  )
}

export const EmergencyPagination = ({
  summary,
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 2,
  testId,
}: Props) => {
  const pages = buildPageRange(currentPage, totalPages, siblingCount)

  return (
    <div
      data-testid={testId}
      style={{
        display:         "flex",
        alignItems:      "center",
        justifyContent:  "flex-end",
        gap:             "6px",
        padding:         `${hceSpacing[3]} ${hceSpacing[4]}`,
      }}
      role="navigation"
      aria-label="Paginación de pacientes"
    >
      {/* casillas genericas */}
      {summary.map((item) => (
        <span key={item.label} className="hce-empag-chip">
          <span style={{ fontWeight: hceTypography.weight.bold }}>{item.value}</span>{" "}
          {item.label}
        </span>
      ))}

      {/* Botón anterior */}
      <button
        type="button"
        className="hce-empag-navbtn"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Página anterior"
        data-testid={testId ? `${testId}-prev` : undefined}
      >
        <ChevronLeftGlyph />
      </button>

      {/* Páginas */}
      {pages.map((page, idx) =>
        page === "..." ? (
          <span
            key={`ellipsis-${idx}`}
            style={{
              fontFamily: "var(--ds-font-family, 'Poppins', sans-serif)",
              fontSize:   "12px",
              color:      "var(--ds-pagination-item-color, #003d96)",
              userSelect: "none",
              padding:    "0 2px",
            }}
          >
            …
          </span>
        ) : (
          <button
            type="button"
            key={page}
            className="hce-empag-pagebtn"
            onClick={() => onPageChange(page)}
            style={{
              "--pagebtn-border":       page === currentPage ? "var(--ds-pagination-selected-bg, #2B5BA8)" : "var(--ds-pagination-nav-border, #D0DBF0)",
              "--pagebtn-bg":           page === currentPage ? "var(--ds-pagination-selected-bg, #2B5BA8)" : " #FFFFFF",
              "--pagebtn-color":        page === currentPage ? "var(--ds-pagination-selected-color, #FFFFFF)" : "var(--ds-pagination-item-color, #003d96)",
              "--pagebtn-weight":       page === currentPage ? hceTypography.weight.bold : hceTypography.weight.regular,
              "--pagebtn-hover-bg":     page === currentPage ? "var(--ds-pagination-selected-hover, #1A3A6B)" : "var(--ds-pagination-hover-bg, #EEF2F9)",
              "--pagebtn-hover-border": page === currentPage ? "var(--ds-pagination-selected-hover, #1A3A6B)" : "var(--ds-color-table-header-bg, #2B5BA8)",
            } as CSSProperties}
            aria-label={`Página ${page}`}
            aria-current={page === currentPage ? "page" : undefined}
            data-testid={testId ? `${testId}-page-${page}` : undefined}
          >
            {page}
          </button>
        )
      )}

      {/* Botón siguiente */}
      <button
        type="button"
        className="hce-empag-navbtn"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Página siguiente"
        data-testid={testId ? `${testId}-next` : undefined}
      >
        <ChevronRightGlyph />
      </button>
    </div>
  )
}
