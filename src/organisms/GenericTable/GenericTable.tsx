import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import type { SxProps, Theme } from "@mui/material"
import { GenericRow } from "../../molecules/GenericRow/GenericRow"
import type {  GenericTableColumn } from "../../molecules/GenericCell/GenericCell"
import { hceBorderRadius, hceClinicalColors, hceColors, hceTypography, hceUi } from "../../tokens/hce.tokens"
import { useEffect, useMemo, useRef, useState } from "react"
import { getColumnWidths, getTableWidthNumber } from "./tableWidth.utils"

// El header (TableCell) se pinta con hceUi.textPrimaryTable — mismo token
// que usa headerCellSx.backgroundColor más abajo. El borde perimetral de la
// tabla debe coincidir exactamente con ese color, no con hceClinicalColors
// .tableHeaderBg / .headerBg (tokens de azul "similares" pero no son el que
// realmente se renderiza en el header de este componente).
const TABLE_BORDER_COLOR = hceUi.textPrimaryTable
const TABLE_RADIUS = hceBorderRadius.md
const SCROLLBAR_THUMB_MIN_HEIGHT = 24

// En <td>/<th>, "height" es un MÍNIMO: si el contenido necesita más (ej. 2
// líneas de texto), el navegador IGNORA el valor y agranda la fila igual.
// lineHeight se achica a propósito (16px, headerCellSx) para que un header de
// 2 líneas (ej. "Indc."/"Med.") no fuerce una fila mucho más alta que una de
// 1 línea (2×16=32px de contenido, cómodo).
// El alto REAL final depende del theme del consumidor (ej. emergencyTheme.ts
// fuerza height:44px en TODO MuiTableRow, un piso que le gana a lo puesto
// acá) — por eso no se puede asumir un número fijo: el thumb mide el header
// de verdad con un ResizeObserver (ver headerRef) y usa este valor solo como
// fallback antes de la primera medición.
const HEADER_HEIGHT_FALLBACK = 44

interface GenericTableProps<T> {
  rows: T[]
  columns: GenericTableColumn<T>[]
  getRowId: (row: T) => string
  maxHeight?: number | string

  getRowSx?: (row: T, index: number) => SxProps<Theme>
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


}


const headerCellSx = {
  height: HEADER_HEIGHT_FALLBACK,
  backgroundColor: hceUi.textPrimaryTable,
  color: `${hceColors.neutro.white[100]} !important`,
  borderLeft: "1px solid #ffff",
  // fontSize / fontWeight / fontFamily NO se fuerzan acá a propósito: el
  // theme (MuiTableHead + MuiTableCell.styleOverrides.head) ya define sus
  // propios tokens hce específicos para headers (ej. weight.bold,
  // size.tableHeader) con selectores de mayor especificidad que este sx —
  // ponerlos acá con tokens genéricos (md/medium) no los reemplaza, solo
  // queda "muerto" y además fontFamily sí ganaba, dejando el header en Poppins
  // (token de plataforma) mientras el body usa fontFamilyClinical (IBM Plex,
  // vía emergencyTheme) — desparejo. Dejar que el theme lo resuelva.
  // Interlineado angosto a propósito — ver HEADER_HEIGHT_FALLBACK más arriba.
  lineHeight: "16px",
  whiteSpace: "normal",
  overflow: "hidden",
  textTransform: "none !important",
}


export const GenericTable = <T,>({
  rows,
  columns,
  getRowId,
  maxHeight,
  getRowSx,
  rowAlertGetter,
  sortComparator,

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
  // scrollbar nativo solo en el eje vertical (ver "&::-webkit-scrollbar" del
  // Table más abajo) y este thumb lo reemplaza visualmente, sincronizado con
  // el scroll real del TableContainer.
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
    () => getColumnWidths(columns, tableWidth, scrollMetrics.clientWidth),
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
    // Una sola tabla (header + body) dentro de un único TableContainer con
    // scroll — el header queda fijo vía <Table stickyHeader> (posicionamiento
    // nativo de MUI) en vez de separar header/body en dos <table> con medición
    // manual del ancho del scrollbar. Con un solo elemento scrolleable, el
    // scroll (horizontal y vertical) siempre queda contenido acá adentro: no
    // hay forma de que "se escape" a un ancestro, sin importar cómo el
    // consumidor arme su propio layout alrededor de este componente.
    <Box
      sx={{
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
      <TableContainer
        ref={containerRef}
        sx={{
          width: "100%",
          flex: 1,
          minHeight: 0,
          maxHeight: maxHeight ?? "none",
          overflow: "auto",

          // El scrollbar vertical nativo se oculta (width:0) porque lo
          // reemplaza el thumb dibujado a mano de acá abajo, superpuesto
          // sobre el contenido en vez de reservar su propio ancho. El
          // horizontal se deja nativo (height sí definido) — no hubo queja
          // sobre ese eje y así se conserva el indicador visual al scrollear
          // a los costados.
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            width: 0,
            height: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: hceClinicalColors.border,
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: hceClinicalColors.rowAlternate,
          },
        }}
      >
        <Box 
         sx={{
          border: `1px solid ${TABLE_BORDER_COLOR}`,
          borderRadius: TABLE_RADIUS,
          width: "100%",
          minWidth: tableMinWidth,
          boxSizing: "border-box",
          overflow: "hidden",
        }}>
        <Table
          stickyHeader
          aria-label="generic table"
          sx={{
            tableLayout: "fixed",
            width: "100%",
            minWidth: tableMinWidth,
            borderCollapse: "separate",
            borderSpacing: 0,
            // El theme (MuiTable.styleOverrides.root) fuerza borderRadius: xl
            // + overflow:hidden en TODO <Table>. overflow:hidden en el propio
            // <table> rompe el position:sticky del header (cualquier ancestro
            // entre la celda sticky y el TableContainer con overflow != visible
            // lo desactiva) — se anula acá; el radius/clip visual ya lo da el
            // Box exterior.
           
            overflow: "visible",
            //  border: `1px solid ${TABLE_BORDER_COLOR}`,
            //  borderRadius: TABLE_RADIUS,
          }}
        >
          {renderColGroup()}

          <TableHead>
            <TableRow ref={headerRowRef}>
              {columns.map((column, index) => (
                // El header siempre centrado, independiente del align de la
                // columna (ese align es para el contenido del body, no
                // necesariamente para su etiqueta).
                <TableCell
                  key={column.key}
                  align="center"
                  sx={{
                    ...headerCellSx,
                    width: columnWidths[index],
                    ...(index === 0 && {
                      borderLeft: "none",
                    }),
                  }}
                >
                  {column.header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {sortedRows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  sx={{
                    textAlign: "center",
                    height: 120,
                    borderBottom: "none",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "8px",
                      color: hceClinicalColors.textSecondary,
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: hceTypography.fontFamilyClinical,
                        fontSize: "14px",
                        color: hceClinicalColors.textSecondary,
                      }}
                    >
                      No hay pacientes en el Monitor de Emergencia
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              sortedRows.map((row, index) => (
                <GenericRow
                  key={getRowId(row)}
                  row={row}
                  index={index}
                  columns={columns}
                  rowSx={getRowSx?.(row, index)}
                  rowAlertGetter={rowAlertGetter}
                />
              ))
            )}
          </TableBody>
        </Table>
        </Box>
      </TableContainer>

      {needsVerticalScroll && (
        <Box
          onMouseDown={handleThumbMouseDown}
          sx={{
            position: "absolute",
            top: 0,
            right: 2,
            width: 6,
            borderRadius: "4px",
            backgroundColor: hceClinicalColors.border,
            cursor: "pointer",
            zIndex: 2,
          }}
          style={{
            height: thumbHeight,
            transform: `translateY(${thumbTop}px)`,
          }}
        />
      )}
    </Box>
  )
}
