import type { CSSProperties } from "react"
import "./GenericTable.css"
import { GenericRow } from "../../molecules/GenericRow/GenericRow"
import type {  GenericTableColumn } from "../../molecules/GenericCell/GenericCell"
import { hceBorderRadius, hceClinicalColors, hceColors, hceTypography } from "../../tokens/hce.tokens"
import { useEffect, useMemo, useRef, useState } from "react"
import { getColumnWidths, getTableWidthNumber } from "./tableWidth.utils"

// El header (th) se pinta con hceUi.textPrimaryTable — mismo token que usa
// headerCellStyle.backgroundColor más abajo. El borde perimetral de la
// tabla debe coincidir exactamente con ese color, no con hceClinicalColors
// .tableHeaderBg / .headerBg (tokens de azul "similares" pero no son el que
// realmente se renderiza en el header de este componente).
const TABLE_BORDER_COLOR = `var(--ds-color-interactive, #003d96)`
const TABLE_RADIUS = hceBorderRadius.md
const TABLE_BORDER_WIDTH = 1
const SCROLLBAR_THUMB_MIN_HEIGHT = 24

// En <td>/<th>, "height" es un MÍNIMO: si el contenido necesita más (ej. 2
// líneas de texto), el navegador IGNORA el valor y agranda la fila igual.
// lineHeight se achica a propósito (16px, headerCellStyle) para que un
// header de 2 líneas (ej. "Indc."/"Med.") no fuerce una fila mucho más alta
// que una de 1 línea (2×16=32px de contenido, cómodo).
// El alto REAL final dependía antes del theme MUI del consumidor (ej. el
// tema clínico de Emergencia forzaba height:44px en toda fila) — ahora que
// el theme ya no envuelve la tabla vía MUI, el thumb sigue midiendo el
// header de verdad con un ResizeObserver (ver headerRef) y usa este valor
// solo como fallback antes de la primera medición.
const HEADER_HEIGHT_FALLBACK = 44

interface GenericTableProps<T> {
  rows: T[]
  columns: GenericTableColumn<T>[]
  getRowId: (row: T) => string
  /**
   * Hook de pruebas E2E (Playwright) — `data-testid` por fila, análogo a
   * `getRowId`. Debe derivarse de un id técnico opaco (ej. `row.id`), nunca
   * de datos identificables del paciente (nombre, DNI). Convención:
   * `{microfrontend}-{componente}-row-{id}` (ver docs/testing-convention.md).
   */
  getRowTestId?: (row: T) => string
  maxHeight?: number | string

  /** Estilo puntual por fila — objeto plano de CSS (antes SxProps<Theme> de MUI). */
  getRowSx?: (row: T, index: number) => CSSProperties
    /**
  * Permite marcar una fila como alerta sin amarrar la tabla
   * a un campo específico como row_alert_color.
   */
  rowAlertGetter?: (row: T) => boolean

   /**
   * Permite ordenar las filas sin que la tabla conozca reglas de negocio.
   * Ejemplo Monitor: prioridad ascendente y luego fecha/hora de atención.
   */
  sortComparator?: (a: T, b: T) => number
  /**
   * Campo para definir mensaje por defecto cuando la tabla se encuentre sin datos
  */
  emptyMessage?: string
}


const headerCellStyle: CSSProperties = {
  height: HEADER_HEIGHT_FALLBACK,
  backgroundColor: `var(--ds-color-interactive, #003d96)`,
  color: hceColors.neutro.white[100],
  borderLeft: "1px solid #ffff",
  fontSize: "12px",
  // fontSize / fontWeight / fontFamily NO se fuerzan acá a propósito: antes
  // el theme (MuiTableHead + MuiTableCell.styleOverrides.head) definía sus
  // propios tokens hce específicos para headers (ej. weight.bold,
  // size.tableHeader). Ahora que el theme ya no envuelve la tabla vía MUI,
  // esto queda pendiente de reconectar a las variables `--ds-table-head-*`
  // que expone el tema activo de `DSProvider` (ver theme/themes.ts) — ver
  // nota en atoms/Button/Button.tsx sobre el mismo pendiente.
  // Interlineado angosto a propósito — ver HEADER_HEIGHT_FALLBACK más arriba.
  lineHeight: "16px",
  whiteSpace: "normal",
  overflow: "hidden",
  textTransform: "none",
  textAlign: "center",
  boxSizing: "border-box",
}


export const GenericTable = <T,>({
  rows,
  columns,
  getRowId,
  getRowTestId,
  maxHeight,
  getRowSx,
  rowAlertGetter,
  sortComparator,
  emptyMessage = 'No hay datos disponibles.'
}: GenericTableProps<T>) => {
  const sortedRows = useMemo(() => {
    if (!sortComparator) return rows

    return [...rows].sort(sortComparator)
  }, [rows, sortComparator])

  const tableWidth = useMemo(() => getTableWidthNumber(columns), [columns])
  const tableMinWidth = `${tableWidth}px`

  // Scrollbar vertical dibujado a mano, superpuesto sobre la última columna
  // (en vez del nativo, que reserva su propio ancho y deja el borde "después"
  // del scroll — se veía como una franja/columna en blanco). Se oculta el
  // scrollbar nativo solo en el eje vertical (ver GenericTable.css) y este
  // thumb lo reemplaza visualmente, sincronizado con el scroll real del
  // contenedor.
  const containerRef = useRef<HTMLDivElement>(null)
  const headerRowRef = useRef<HTMLTableRowElement>(null)
  const [scrollMetrics, setScrollMetrics] = useState({ scrollTop: 0, clientHeight: 0, scrollHeight: 0, clientWidth: 0 })
  const [headerHeight, setHeaderHeight] = useState(HEADER_HEIGHT_FALLBACK)
  const draggingRef = useRef<{ startY: number; startScrollTop: number } | null>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const measure = () =>
      setScrollMetrics({
        scrollTop: el.scrollTop,
        clientHeight: el.clientHeight,
        scrollHeight: el.scrollHeight,
        clientWidth: el.clientWidth,
      })

    measure()

    el.addEventListener("scroll", measure, { passive: true })
    const resizeObserver = new ResizeObserver(measure)
    resizeObserver.observe(el)

    return () => {
      el.removeEventListener("scroll", measure)
      resizeObserver.disconnect()
    }
  }, [sortedRows, maxHeight])

  // Alto real de la fila del header, medido en vez de asumido — depende del
  // theme del consumidor (ver comentario de HEADER_HEIGHT_FALLBACK).
  useEffect(() => {
    const el = headerRowRef.current
    if (!el) return

    const measure = () => setHeaderHeight(el.getBoundingClientRect().height)

    measure()

    const resizeObserver = new ResizeObserver(measure)
    resizeObserver.observe(el)

    return () => resizeObserver.disconnect()
  }, [columns])

  const needsVerticalScroll = scrollMetrics.scrollHeight > scrollMetrics.clientHeight
  // El track del thumb vive solo debajo de la cabecera (clientHeight ya
  // incluye el alto del header, que no debe poder "taparse").
  const trackHeight = Math.max(scrollMetrics.clientHeight - headerHeight, 0)
  const thumbHeight = needsVerticalScroll
    ? Math.max(
        (scrollMetrics.clientHeight / scrollMetrics.scrollHeight) * trackHeight,
        SCROLLBAR_THUMB_MIN_HEIGHT,
      )
    : 0
  const scrollableTrack = trackHeight - thumbHeight
  const scrollableContent = scrollMetrics.scrollHeight - scrollMetrics.clientHeight
  const thumbTop =
    needsVerticalScroll && scrollableContent > 0
      ? headerHeight + (scrollMetrics.scrollTop / scrollableContent) * scrollableTrack
      : headerHeight

  const handleThumbMouseDown = (event: React.MouseEvent) => {
    event.preventDefault()
    const el = containerRef.current
    if (!el) return

    draggingRef.current = { startY: event.clientY, startScrollTop: el.scrollTop }

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!draggingRef.current) return

      const deltaY = moveEvent.clientY - draggingRef.current.startY
      const track = el.clientHeight - headerHeight - thumbHeight
      const content = el.scrollHeight - el.clientHeight

      if (track <= 0) return

      el.scrollTop = draggingRef.current.startScrollTop + (deltaY / track) * content
    }

    const handleMouseUp = () => {
      draggingRef.current = null
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)
  }

  // Fuente de verdad de los anchos: con table-layout:fixed, el <colgroup>
  // manda sobre cualquier width puesto en celdas individuales (GenericRow
  // sigue poniendo el suyo por compatibilidad, pero es inerte para el layout
  // real). Ver tableWidth.utils.getColumnWidths para la lógica fijo/flex.
  const columnWidths = useMemo(
    () => getColumnWidths(
      columns,
      tableWidth,
      Math.max(scrollMetrics.clientWidth - TABLE_BORDER_WIDTH * 2, 0),
    ),
    [columns, tableWidth, scrollMetrics.clientWidth],
  )

  const renderColGroup = () => (
    <colgroup>
      {columns.map((column, index) => (
        <col
          key={column.key}
          style={{
            width: columnWidths[index],
          }}
        />
      ))}
    </colgroup>
  )

  return (
    // Una sola tabla (header + body) dentro de un único contenedor con
    // scroll — el header queda fijo vía position:sticky nativo (ver
    // GenericTable.css) en vez de separar header/body en dos <table> con
    // medición manual del ancho del scrollbar. Con un solo elemento
    // scrolleable, el scroll (horizontal y vertical) siempre queda
    // contenido acá adentro: no hay forma de que "se escape" a un
    // ancestro, sin importar cómo el consumidor arme su propio layout
    // alrededor de este componente.
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        minHeight: 0,
        overflow: "hidden",
      }}
    >
      <div
        ref={containerRef}
        className="hce-table-container"
        style={{
          width: "100%",
          flex: 1,
          minHeight: 0,
          maxHeight: maxHeight ?? "none",
          overflow: "auto",
        }}
      >
        <div
          className="hce-generic-table-frame"
          style={{
            borderColor: TABLE_BORDER_COLOR,
            borderRadius: TABLE_RADIUS,
            minWidth: `calc(${tableMinWidth} + ${TABLE_BORDER_WIDTH * 2}px)`,
          }}
        >
        <table
          className="hce-generic-table"
          aria-label="generic table"
          style={{
            minWidth: tableMinWidth,
            // El theme (antes MuiTable.styleOverrides.root) forzaba
            // borderRadius: xl + overflow:hidden en TODO <Table>.
            // overflow:hidden en el propio <table> rompe el position:sticky
            // del header (cualquier ancestro entre la celda sticky y el
            // contenedor con overflow != visible lo desactiva) — se deja
            // visible acá; el radius/clip visual ya lo da el div exterior.
            overflow: "visible",
          }}
        >
          {renderColGroup()}

          <thead>
            <tr ref={headerRowRef}>
              {columns.map((column, index) => (
                // El header siempre centrado, independiente del align de la
                // columna (ese align es para el contenido del body, no
                // necesariamente para su etiqueta).
                <th
                  key={column.key}
                  style={{
                    ...headerCellStyle,
                    width: columnWidths[index],
                  }}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {sortedRows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  style={{
                    textAlign: "center",
                    height: 120,
                    borderBottom: "none",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "8px",
                      color: hceClinicalColors.textSecondary,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: hceTypography.fontFamilyClinical,
                        fontSize: "14px",
                        color: hceClinicalColors.textSecondary,
                      }}
                    >
                      {emptyMessage}
                    </span>
                  </div>
                </td>
              </tr>
            ) : (
              sortedRows.map((row, index) => (
                <GenericRow
                  key={getRowId(row)}
                  row={row}
                  index={index}
                  columns={columns}
                  rowSx={getRowSx?.(row, index)}
                  rowAlertGetter={rowAlertGetter}
                  testId={getRowTestId?.(row)}
                />
              ))
            )}
          </tbody>
        </table>
        </div>
      </div>

      {needsVerticalScroll && (
        <div
          onMouseDown={handleThumbMouseDown}
          style={{
            position: "absolute",
            top: 0,
            right: 2,
            width: 6,
            borderRadius: "4px",
            backgroundColor: hceClinicalColors.border,
            cursor: "pointer",
            zIndex: 2,
            height: thumbHeight,
            transform: `translateY(${thumbTop}px)`,
          }}
        />
      )}
    </div>
  )
}
