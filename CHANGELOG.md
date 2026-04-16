# Changelog

Todos los cambios notables de `@hce/design-system` se documentan en este archivo.

Formato basado en [Keep a Changelog](https://keepachangelog.com/es/1.0.0/).
Versionado basado en [Semantic Versioning](https://semver.org/).

---

## [1.0.20] - 2026-04-16

### Agregado

- **`HceHeader`** (Organismo): nuevo header institucional con soporte para selección de sede, notificaciones, menú de usuario y modo flotante. Props: `sede`, `sucursales`, `onSedeCambiada`, `userName`, `userRole`, `onLogout`, `notifications?`, `onVerTodas?`, `floating?`, `onMenuClick?`
  - Panel de notificaciones con iconos por tipo (`info`, `warning`, `success`, `error`), marca como leídas al abrir, contador de no leídas en la campana y footer "Ver todas las notificaciones"
  - Prop `floating`: aplica `borderRadius` + `boxShadow` para alinearse visualmente con el `HceSidebar` flotante
  - Prop `onMenuClick`: muestra botón hamburguesa (`HceBurgerIcon`) en pantallas pequeñas (< 900px) para abrir el sidebar como overlay. El texto "Historia Clínica" se oculta en móvil
- **`HceSidebar`** (Organismo): sidebar de navegación basado en opciones MAC
  - Prop `floating`: esquinas redondeadas + sombra sin romper el flujo del documento
  - Submenús con árbol visual tipo rama (`|─`) y fondo persistente cuando hay hijo activo o está expandido
  - Modo colapsado: muestra `UiIsotipoClinicaIcon`, click en cualquier zona del sidebar lo expande; `e.stopPropagation()` en botones para evitar doble-toggle
  - `ICON_REGISTRY` para resolver el campo `icono` de MAC a componente React
- **`HceBurgerIcon`**: nuevo ícono SVG de hamburguesa (3 líneas horizontales), equivalente al `MenuIcon` de MUI. Agregado en `SvgIconsHce.tsx`
- **`HceStarIcon`**: ícono de estrella (outline, stroke), para favoritos / calificación
- **`HceConfigIcon`**: ícono de engranaje (fill), para configuración
- **`Footer` — prop `color`**: permite sobreescribir el color de fondo. Ej: `hceColors.primary.blue[600]`
- **`CarruselHome`**: carrusel con autoplay, flechas de navegación y dots. Prop `images: string[]` recibe las URLs; `objectFit: "contain"` para mostrar la imagen completa sin recorte

### Exportaciones nuevas
```ts
HceHeader
HceHeaderProps
HceNotificacion
Sucursal
HceSidebar
HceSidebarProps
OpcionMAC
HceBurgerIcon
HceStarIcon
HceConfigIcon
CarruselHome
CarruselHomeProps
```

### Corregido

- **`HceHeader`**: importación incorrecta de íconos de notificación (`../../../src/...` → `../../atoms/Icon/SvgIcons`)
- **`HceSidebar`**: doble-toggle al hacer click en el isotipo cuando el sidebar estaba colapsado (se resolvió con `e.stopPropagation()`)
- **`HceSidebar`**: en modo flotante el sidebar pisaba el footer al ocupar `height: 100vh` con `position: fixed`. Se eliminó el posicionamiento fijo — el padre maneja el espacio vía padding/gap
- **`CarruselHome`**: `objectFit` cambiado de `"cover"` a `"contain"` para mostrar las imágenes sin recorte
- **`HceMenuIcon`** ya existía en `SvgIconsHce.tsx` pero no estaba exportado desde `index.ts`

---

## [1.0.11] - 2026-04-14

### Agregado
- **`CSFLoading`** (Molécula): spinner animado con el logo CSF (Clínica San Felipe). Reproduce una secuencia de 11 frames de intro (build-up + barrido del sector DEF4C5) y luego gira el logo completo indefinidamente con `animateTransform` SVG nativo. Props: `open`, `message?`, `size?` (default 150px), `duration?` (seg/vuelta, default 1.5), `frameDuration?` (ms/frame del intro, default 80), `overlay?`, `opacity?`, `children?`
- Story `Molecules/CSFLoading` con galería de 16 frames Figma, controles de tamaño, velocidad de spin y velocidad del intro (`frameDuration`)

### Cambiado
- **Tipografía Poppins explícita en todos los componentes**: se agregó `fontFamily: hceTypography.fontFamily` a todos los `Typography` de los componentes del design system (`LoadingOverlay`, `PageHeader`, `Card`, `DataTable`, `Header`, `Footer`, `SelectField`, `TextInput`, `CSFLoading`). Garantiza Poppins en contextos de Module Federation donde el tema MUI global no se hereda

### Exportaciones nuevas
```ts
CSFLoading
CSFLoadingProps
```

---

## [1.0.10] - 2026-04-07

### Corregido
- **TextInput — color de texto escrito**: Chrome usa `-webkit-text-fill-color` con mayor prioridad que `color`. Se corrigió seteando `WebkitTextFillColor` vía selector `& .MuiInputBase-input`, resolviendo que el texto dentro del input no adoptaba el color activo

### Agregado
- **`SelectField` — prop `disabled`**: permite mostrar el select como solo lectura (pre-seleccionado e ininteractuable)

---

## [1.0.9] - 2026-04-07

### Agregado
- **Prop `error` en `TextInput`**: cuando `error={true}` todos los elementos del input (label, borde, ícono, placeholder y texto escrito) cambian a `hceColors.alert.error[600]`. El estado se mantiene independientemente del hover/focus
- **Prop `error` en `PasswordInput`**: misma lógica que `TextInput`; el ícono eye también adopta el color de error
- **Prop `error` en `SelectField`**: label, borde y texto del select cambian a rojo en estado de error

### Corregido
- **`TextInput` — color de texto escrito**: añadido `"& .MuiInputBase-input": { color, WebkitTextFillColor }` para que el texto escrito adopte el `inputTextColor` al hacer hover/focus (antes permanecía negro)
- **`PasswordInput` — color del texto al mostrar contraseña**: al mantener presionado el ícono eye, el texto ahora hereda el color activo del input en lugar de mostrarse en negro

---

## [1.0.8] - 2026-04-07

### Cambiado
- **`TextInput` — color activo**: el color de hover/focus cambia de `baseColors.primary` (`#1E4FA3`) a `hceColors.primary.blue[600]` (`#003d96`). Afecta label, placeholder, ícono start y borde
- **`SelectField` — color activo**: mismo cambio de color que `TextInput`
- **`PasswordInput` — reescritura completa**:
  - Reemplazados los íconos MUI `VisibilityOutlined`/`VisibilityOffOutlined` por `UiEyeIcon` (siempre el mismo ícono, sin alternar)
  - Comportamiento cambiado de toggle a **mantener presionado para ver**: `onMouseDown` muestra la contraseña, `onMouseUp`/`onMouseLeave` la oculta. Soporta táctil (`onTouchStart`/`onTouchEnd`)
  - `e.preventDefault()` en mousedown para que el input no pierda el foco al presionar el ícono
  - El color del ícono eye sigue el estado activo (`hceColors.primary.blue[600]` en hover/focus, gris en idle)

---

## [1.0.7] - 2026-04-07

### Agregado
- **Íconos UIKit** (46 íconos): nuevo set importado desde Figma HCE Recursos, expuestos con prefijo `Ui` (`UiArrowIcon`, `UiCalendarIcon`, `UiTrashIcon`, etc.). SVGs en `src/assets/icons/uikit/`, componentes en `SvgIconsUiKit.tsx`
- **Tokens de color HCE** (`hce.tokens.ts`): paleta completa desde Figma — `hceColors.primary.blue/green` (50–900), `hceColors.alert.error/info/warning/success` (50–900), `hceColors.neutro.white/black` (50–900)
- **Tipografía Poppins**: `hceTypography.fontFamily` + `injectHceFonts()` para cargar la fuente desde Google Fonts dinámicamente
- **`LoadingOverlay`** (Molécula): overlay fullscreen con backdrop oscuro y spinner. Props: `open`, `message?`, `color?` (default `hceColors.primary.blue[600]`), `opacity?`, `children?`
- **`HceModal`** (Organismo): modal/dialog configurable al estilo SweetAlert. Soporta: ícono badge opcional, título, descripción, `TextInput` opcional, botón confirmar (verde/filled) y cancelar (outlined azul), ambos independientes. Layout `"row"` o `"column"` para los botones
- Stories de Storybook para `LoadingOverlay` y `HceModal` (galería con 6 variantes visuales)
- Sección **UIKit** en la galería de íconos de Storybook

### Cambiado
- **Tipografía global**: `baseTypography.fontFamily` actualizada de `Montserrat` a `Poppins` — se propaga a todos los componentes MUI vía tema
- **TextInput** y **SelectField**: label, placeholder e ícono cambian al azul corporativo (`#1E4FA3`) en hover/focus
- **Icon story**: galería de Storybook ahora muestra 4 secciones (Lucide / HCE Icon1 Médicos / HCE Icon2 UI / UIKit)

### Exportaciones nuevas
```ts
// Tokens
hceColors, hceTypography, injectHceTokens, injectHceFonts

// Moléculas
LoadingOverlay

// Organismos
HceModal

// UIKit (46 íconos)
UiArrowIcon, UiDoctorIcon, UiCalendarIcon, UiTrashIcon, UiSearchIcon ...
```

---

## [1.0.6] - 2026-03-25

### Agregado
- Componentes de organismos: Header, SideNav, DataTable
- Soporte completo de theming con `emergencyTheme`

### Cambiado
- Mejoras visuales en `Button` y `PriorityBadge`

---

## [1.0.5]

### Agregado
- Molecules: `EmergencyHeader`, `ActionBar`, `PatientRow`, `PatientTable`
- `EmergencyPagination`, `BedsAvailabilityTab`

---

## [1.0.4]

### Agregado
- Tokens de emergencia (`emergency.tokens.ts`)
- `emergencyTheme` para módulo de urgencias

---

## [1.0.3]

### Agregado
- Atoms: `PriorityBadge`, `BoxBadge`, `ClinicalStatusIcon`
- `AttentionCode`, `InfoButton`, `ActionIconButton`

---

## [1.0.2]

### Agregado
- `DSProvider` — ThemeProvider para envolver aplicaciones consumidoras
- Export centralizado en `src/index.ts`

---

## [1.0.1]

### Agregado
- Configuración de Verdaccio y flujo de publicación con Docker
- Storybook con auto-generación de stories (`generate-stories.mjs`)

---

## [1.0.0]

### Agregado
- Setup inicial del proyecto
- Atoms base: `Button`, `TextInput`, `Badge`
- Build en modo librería con Vite (`index.js`, `index.cjs`, `index.d.ts`)
- Tema base MUI (`theme.ts`)
