import "./Pagination.css"

interface Props {
  page: number
  total: number
  onChange: (page: number) => void
}

/** Genera el array de páginas visibles con "..." — misma heurística que
 *  MUI Pagination con boundaryCount=1/siblingCount=1 (aproximada). */
function buildPageRange(current: number, total: number): (number | "...")[] {
  const siblings = 1
  if (total <= siblings * 2 + 5) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }
  const pages: (number | "...")[] = [1]
  const rangeStart = Math.max(2, current - siblings)
  const rangeEnd   = Math.min(total - 1, current + siblings)
  if (rangeStart > 2) pages.push("...")
  for (let i = rangeStart; i <= rangeEnd; i++) pages.push(i)
  if (rangeEnd < total - 1) pages.push("...")
  pages.push(total)
  return pages
}

function ChevronLeftGlyph() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 6 9 12 15 18" />
    </svg>
  )
}
function ChevronRightGlyph() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 6 15 12 9 18" />
    </svg>
  )
}

export const Pagination = ({ page, total, onChange }: Props) => {
  if (total <= 0) return null
  const pages = buildPageRange(page, total)

  return (
    <ul className="hce-pagination" role="navigation" aria-label="pagination navigation">
      <li>
        <button
          type="button"
          className="hce-pagination-nav"
          disabled={page === 1}
          onClick={() => onChange(page - 1)}
          aria-label="Go to previous page"
        >
          <ChevronLeftGlyph />
        </button>
      </li>
      {pages.map((p, idx) =>
        p === "..." ? (
          <li key={`ellipsis-${idx}`} className="hce-pagination-ellipsis">…</li>
        ) : (
          <li key={p}>
            <button
              type="button"
              className={`hce-pagination-item${p === page ? " hce-pagination-item--selected" : ""}`}
              onClick={() => onChange(p)}
              aria-current={p === page ? "true" : undefined}
              aria-label={p === page ? `page ${p}` : `Go to page ${p}`}
            >
              {p}
            </button>
          </li>
        )
      )}
      <li>
        <button
          type="button"
          className="hce-pagination-nav"
          disabled={page === total}
          onClick={() => onChange(page + 1)}
          aria-label="Go to next page"
        >
          <ChevronRightGlyph />
        </button>
      </li>
    </ul>
  )
}
