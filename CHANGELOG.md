# Changelog

Todos los cambios notables de `@hce/design-system` se documentan en este archivo.

Formato basado en [Keep a Changelog](https://keepachangelog.com/es/1.0.0/).
Versionado basado en [Semantic Versioning](https://semver.org/).

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
