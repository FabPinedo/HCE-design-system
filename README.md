# HCE Design System

Librería de componentes compartida para los proyectos HCE. Construida con React, MUI y Vite. Incluye Storybook para documentación visual y Verdaccio como registry npm privado.

---

## Tabla de contenidos

- [Estructura del proyecto](#estructura-del-proyecto)
- [Desarrollo local](#desarrollo-local)
- [Agregar un componente nuevo](#agregar-un-componente-nuevo)
- [Generar stories automáticamente](#generar-stories-automáticamente)
- [Build de la librería](#build-de-la-librería)
- [Docker — Verdaccio y Storybook](#docker--verdaccio-y-storybook)
- [Publicar en Verdaccio](#publicar-en-verdaccio)
- [Actualizar una versión publicada](#actualizar-una-versión-publicada)
- [Consumir el paquete en otros proyectos](#consumir-el-paquete-en-otros-proyectos)
- [Versionado](#versionado)

---

## Estructura del proyecto

```
HCE-design-system/
├── src/
│   ├── atoms/          # Componentes básicos (Button, TextInput, Badge...)
│   ├── molecules/      # Combinaciones de átomos (Card, PageHeader, DataTable...)
│   ├── organisms/      # Secciones complejas (Header, SideNav, DataTable...)
│   ├── provider/       # ThemeProvider (DSProvider)
│   ├── theme/          # Temas MUI (base + emergency)
│   ├── tokens/         # Design tokens (colores, tipografía, espaciado)
│   └── index.ts        # Punto de entrada público del paquete
├── stories/
│   ├── atoms/          # Stories de átomos
│   ├── molecules/      # Stories de moléculas
│   └── organisms/      # Stories de organismos
├── scripts/
│   └── generate-stories.mjs   # Script de auto-generación de stories
├── docker/
│   ├── verdaccio/      # Config de Verdaccio
│   ├── storybook/      # Dockerfile + nginx para Storybook
│   └── publisher/      # Script de publicación automática
├── docker-compose.yml
├── vite.config.ts      # Build en modo librería
├── tsconfig.lib.json   # TS config para el build de la lib
└── tsconfig.storybook.json
```

---

## Desarrollo local

### Instalar dependencias

```bash
npm install
```

### Levantar Storybook en modo dev

```bash
npm start
# → http://localhost:10101
```

Los cambios en `src/` se reflejan en tiempo real sin reiniciar.

---

## Desarrollo en caliente con proyectos consumidores (npm link)

Permite probar cambios del design system directamente en `jarvis-platform-starter` o `jarvis-mf-platform` sin pasar por el ciclo de publicación en Verdaccio.

### Activar el link

```bash
# 1. En HCE-design-system — compilar y registrar el paquete localmente
npm run build
npm link

# 2. En el proyecto consumidor (repetir para cada uno)
cd ../jarvis-platform-starter/jarvis-ui
npm link @hce/design-system

# o en mf-platform
cd ../jarvis-mf-platform
npm link @hce/design-system
```

A partir de acá, `node_modules/@hce/design-system` apunta directamente a la carpeta local. Cada vez que se hace `npm run build` en el design system, el cambio se ve al recargar el proyecto.

### Flujo de trabajo

```bash
# 1. Modificar src/ en HCE-design-system
# 2. Recompilar
npm run build

# 3. Recargar el navegador en el proyecto consumidor — el cambio ya está
```

### Desactivar el link (volver al paquete de Verdaccio)

```bash
# En el proyecto consumidor
npm unlink @hce/design-system
npm install

# En HCE-design-system (opcional, limpia el link global)
npm unlink
```

> Usar `npm link` solo durante desarrollo. Para producción siempre publicar la versión en Verdaccio y consumir vía `npm install`.

> **⚠️ `npm link` y Docker no son compatibles.** Si el link está activo cuando se ejecuta `docker compose build` en un proyecto consumidor, el build fallará porque Docker no puede seguir el symlink fuera del contexto de build. Siempre desactivar el link antes de buildear Docker.

---

## Agregar un componente nuevo

### 1. Crear el archivo del componente

```
src/atoms/MiAtomo/MiAtomo.tsx
```

Seguir la convención existente:

```tsx
interface Props {
  label: string
  disabled?: boolean
}

export const MiAtomo = ({ label, disabled = false }: Props) => {
  return <div>{label}</div>
}
```

### 2. Exportarlo en el índice

Abrir `src/index.ts` y agregar:

```ts
export { MiAtomo } from './atoms/MiAtomo/MiAtomo'
```

### 3. Generar el story

```bash
npm run generate:stories
```

El script detecta que `MiAtomo` no tiene story y crea `stories/atoms/MiAtomo.stories.tsx` automáticamente.

### 4. Ajustar el story si se necesitan más casos

El story generado tiene un caso `Default` básico. Se pueden agregar más casos manualmente:

```tsx
export const Disabled: Story = {
  args: {
    label: 'Deshabilitado',
    disabled: true,
  },
}
```

---

## Generar stories automáticamente

```bash
# Crea stories solo para componentes que aún no tienen uno
npm run generate:stories

# Regenera TODOS los stories (sobreescribe los existentes)
npm run generate:stories:force
```

El script escanea `src/atoms/`, `src/molecules/` y `src/organisms/`. Por cada carpeta de componente que no tenga un `.stories.tsx` correspondiente en `stories/`, genera uno con:

- Import del componente desde `@hce/design-system`
- `meta` con `title` y `tags: ['autodocs']`
- Story `Default` con args inferidos desde la interface `Props`

> `--force` es útil cuando se renombraron props o se cambió la interface de un componente.

---

## Build de la librería

```bash
npm run build
```

Genera en `dist/`:
- `index.js` — módulo ESM
- `index.cjs` — módulo CommonJS
- `index.d.ts` — declaraciones TypeScript

---

## Docker — Verdaccio y Storybook

### Servicios disponibles

| Servicio | Puerto | Descripción |
|---|---|---|
| `verdaccio` | 10100 | Registry npm privado, persistente |
| `storybook` | 10101 | Storybook estático servido con nginx |
| `publisher` | — | Publica el paquete a Verdaccio (perfil: `publish`) |

### Levantar Verdaccio y Storybook

```bash
docker compose up -d
```

- Storybook disponible en `http://localhost:10101`
- Verdaccio disponible en `http://localhost:10100`

### Detener los servicios

```bash
docker compose down
```

### Reconstruir imágenes

```bash
docker compose down
docker compose build
docker compose up -d
```

---

## Publicar en Verdaccio

### Convención de versionado

| Tipo de cambio | Comando | Ejemplo |
|---|---|---|
| Bugfix, ajuste visual menor | `npm version patch` | `1.0.6 → 1.0.7` |
| Nuevo componente, nueva prop | `npm version minor` | `1.0.6 → 1.1.0` |
| Cambio que rompe compatibilidad | `npm version major` | `1.0.6 → 2.0.0` |

### Publicar rápido (sin cambios de versión)

Si Verdaccio ya está corriendo y solo querés publicar la versión actual:

```bash
# Desde el servidor donde corre Verdaccio
docker compose --profile publish run --rm publisher
```

O desde cualquier máquina con Node/npm apuntando al registry:

```bash
npm run build
npm publish --registry http://localhost:10100
# Si Verdaccio está en otro servidor:
# npm publish --registry http://192.168.42.44:10100
```

---

### Flujo completo de publicación

Se usa `--no-git-tag-version` para que npm solo actualice `package.json` sin generar commit ni tag automáticos. Esto permite usar el mensaje de gitflow en el commit y crear el tag automáticamente sobre ese commit.

```bash
# 1. Hacer los cambios en src/

# 2. Generar stories para componentes nuevos (si aplica)
npm run generate:stories

# 3. Verificar que TypeScript no tiene errores
npx tsc -b tsconfig.lib.json --noEmit

# 4. Documentar los cambios en CHANGELOG.md

# 5. Bump de versión — solo toca package.json, sin commit ni tag automático
#    Elegir según el tipo de cambio:
npm version patch --no-git-tag-version
# npm version minor --no-git-tag-version
# npm version major --no-git-tag-version

# 6. Commit con mensaje gitflow (incluye src/, CHANGELOG.md y package.json)
git add .
git commit -m "feature: descripcion de los cambios"

# 7. Tag automático — lee la versión de package.json sin escribirla a mano
git tag "v$(node -p "require('./package.json').version")"

# 8. Push al repositorio
git push
git push --tags

# 9. Reconstruir imágenes y publicar en Verdaccio
docker compose down
docker compose build
docker compose up -d
docker compose --profile publish run --build publisher
```

El servicio `publisher` espera a que Verdaccio esté listo, construye la librería y publica `@hce/design-system@<nueva-versión>`.

Con este flujo cada versión publicada en Verdaccio queda vinculada a un tag de git (`v1.0.7`) que apunta exactamente al commit con los cambios y el CHANGELOG actualizado.

### Verificar versiones publicadas

```bash
npm view @hce/design-system versions --registry http://localhost:10100
```

### Rollback a una versión anterior

En el proyecto consumidor, instalar la versión específica que se necesita:

```bash
npm install @hce/design-system@1.0.3
```

Para ver qué cambió en esa versión consultar `CHANGELOG.md`, o buscar el tag en git:

```bash
git show v1.0.3
```

---

## Consumir el paquete en otros proyectos

### Configurar el registry en el proyecto consumidor

Crear o editar `.npmrc` en la raíz del proyecto:

```
@hce:registry=http://localhost:10100
```

Esto hace que solo los paquetes `@hce/*` vengan de Verdaccio. El resto (react, axios, etc.) sigue viniendo de npm público.

Si Verdaccio está en otra máquina de la red, reemplazar `localhost` por la IP:

```
@hce:registry=http://192.168.1.100:10100
```

### Instalar el paquete

```bash
npm install @hce/design-system
```

### Instalar una versión específica

```bash
npm install @hce/design-system@1.1.0
```

### Actualizar a la última versión disponible

```bash
npm update @hce/design-system
```

### Usar en el código

```tsx
import { DSProvider } from '@hce/design-system'
import { Button, TextInput, DataTable } from '@hce/design-system'
import { theme, emergencyTheme } from '@hce/design-system'
import { baseTokens, emergencyTokens } from '@hce/design-system'

// Envolver la app con el provider
function App() {
  return (
    <DSProvider>
      <Button label="Guardar" onClick={handleSave} />
    </DSProvider>
  )
}
```

---

## Versionado

Este proyecto sigue [Semantic Versioning](https://semver.org/):

```
MAJOR.MINOR.PATCH

1.0.0
│ │ └── Patch: bugfixes, ajustes sin romper compatibilidad
│ └──── Minor: nuevos componentes, nuevas props opcionales
└────── Major: cambios que rompen compatibilidad (props renombradas, componentes eliminados)
```
