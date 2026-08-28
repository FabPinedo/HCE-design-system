# Convención de `data-testid` (Playwright)

## Regla base

- Usar **solo `data-testid`**, nunca `id` como hook de pruebas. `id` es del
  navegador (CSS, `aria-labelledby`/`describedby`, `htmlFor`) y debe ser
  único en todo el documento — hardcodearlo dentro de un componente
  reutilizable rompe en cuanto se renderiza más de una instancia (ver el fix
  de `HceModal` en este mismo cambio: usaba `id="hce-modal-title"` fijo y
  cruzaba el aria entre dos modales simultáneos). Cuando un componente
  necesita un `id` real para accesibilidad, se genera internamente con
  `useId()` de React — nunca se expone como prop ni se hardcodea.

## Nomenclatura

```
{microfrontend}-{componente}[-elemento][-instancia]
```

kebab-case, todo en minúsculas.

- `{microfrontend}`: el nombre técnico de `federation({ name: "..." })` en el
  `vite.config.ts` del microfrontend (ej. `mf-emergency`), **no** la ruta
  visible en español (`/emergencia`).
- `{componente}`: nombre del componente/pantalla en el microfrontend.
- `{elemento}` (opcional): parte interna cuando el componente es compuesto
  (ej. `-title`, `-confirm`, `-cancel` en `HceModal`).
- `{instancia}` (opcional): cuando se repite (filas de tabla, items de
  lista), un id técnico opaco — **nunca** un dato identificable del paciente
  (nombre, DNI, etc.), porque los testids terminan en reportes/capturas de
  Playwright en CI, con menos control de acceso que la app clínica.

Ejemplos: `mf-emergency-allergy-modal`, `mf-emergency-allergy-modal-confirm`,
`mf-emergency-monitor-row-482931`.

## Mecanismo

El design system expone una prop `testId` en los componentes que la
necesitan; cada componente la reenvía a su nodo DOM raíz como `data-testid`.
El valor final (con el namespace del microfrontend) lo decide siempre el
consumidor en el call site — el design system nunca fija un valor.

- **Átomos de un solo nodo** (`Button`): `testId` → `data-testid` directo.
- **Organismos compuestos** (`HceModal`): una sola prop `testId` base, que el
  propio componente sufija (`-title`, `-description`, `-confirm`,
  `-cancel`).
- **Listas/tablas** (`GenericTable`): `getRowTestId(row)`, análogo a
  `getRowId(row)` — un callback en vez de un valor fijo, porque cada fila
  necesita un testid distinto.

## Componentes con `testId` (piloto)

- `Button` — prop `testId`.
- `Overlay` — prop `testId` (panel raíz).
- `HceModal` — prop `testId` (sufijada: panel, `-title`, `-description`,
  `-confirm`, `-cancel`).
- `GenericTable` / `GenericRow` — prop `getRowTestId`.

El resto de átomos/organismos se va agregando bajo el mismo patrón conforme
se necesite en cada microfrontend — no es necesario cubrir todo el design
system de una sola vez.
