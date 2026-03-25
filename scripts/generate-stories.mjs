/**
 * generate-stories.mjs
 *
 * Escanea src/atoms, src/molecules, src/organisms y genera
 * automáticamente un archivo .stories.tsx por cada componente
 * que aún no tenga uno.
 *
 * Uso:
 *   node scripts/generate-stories.mjs
 *   node scripts/generate-stories.mjs --force   ← sobreescribe existentes
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT      = path.resolve(__dirname, '..')
const SRC       = path.join(ROOT, 'src')
const STORIES   = path.join(ROOT, 'stories')
const FORCE     = process.argv.includes('--force')

const LAYERS = ['atoms', 'molecules', 'organisms']

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Extrae el nombre del componente exportado (export const Foo = ...) */
function extractComponentName(source) {
  const match = source.match(/export\s+const\s+(\w+)\s*[=<(]/)
  return match ? match[1] : null
}

/** Extrae las props de la interface Props { ... } */
function extractProps(source) {
  const match = source.match(/interface\s+Props(?:<[^>]+>)?\s*\{([^}]+)\}/)
  if (!match) return []

  return match[1]
    .split('\n')
    .map(line => line.trim())
    .filter(line => line && !line.startsWith('//') && !line.startsWith('*'))
    .map(line => {
      // Ej: "label: string"  |  "onClick?: () => void"  |  "color?: 'primary' | 'secondary'"
      const propMatch = line.match(/^(\w+)(\??):\s*(.+?)[\s,;]*$/)
      if (!propMatch) return null
      const [, name, optional, type] = propMatch
      return { name, optional: optional === '?', type: type.trim() }
    })
    .filter(Boolean)
}

/** Genera un valor de args de ejemplo según el tipo */
function defaultArgValue(name, type) {
  if (type.includes('=>'))            return undefined   // funciones → omitir en args
  if (type === 'boolean')             return false
  if (type === 'number')              return 0
  if (type === 'ReactNode')           return undefined
  if (type.includes('ReactNode'))     return undefined

  // union de strings: 'primary' | 'secondary'  → devuelve "primary" (con comillas)
  const unionMatch = type.match(/^['"](\w+)['"]/)
  if (unionMatch)                     return `"${unionMatch[1]}"`

  // string
  if (type === 'string')              return `"${name}"`

  return undefined
}

/** Construye el bloque args: { ... } */
function buildArgs(props) {
  const lines = props
    .filter(p => !p.optional || true)          // incluye todas
    .map(p => {
      const val = defaultArgValue(p.name, p.type)
      if (val === undefined) return null
      return `    ${p.name}: ${val},`
    })
    .filter(Boolean)

  return lines.length ? `  args: {\n${lines.join('\n')}\n  },` : ''
}

/** Detecta si el componente es genérico: export const Foo = <T extends ...> */
function isGenericComponent(source) {
  return /export\s+const\s+\w+\s*=\s*<\s*T\b/.test(source)
}

/** Genera el contenido del archivo .stories.tsx */
function generateStory(layer, componentName, props, generic) {
  const layerLabel = layer.charAt(0).toUpperCase() + layer.slice(1)
  const argsBlock  = generic ? '' : buildArgs(props)

  const genericNote = generic
    ? `\n// NOTE: componente genérico — completa los args manualmente con un tipo concreto.\n`
    : ''

  return `import type { Meta, StoryObj } from '@storybook/react'
import { ${componentName} } from '@hce/design-system'
${genericNote}
const meta: Meta<typeof ${componentName}> = {
  title: '${layerLabel}/${componentName}',
  component: ${componentName},
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof ${componentName}>

export const Default: Story = {
${argsBlock}
}
`
}

// ── Main ─────────────────────────────────────────────────────────────────────

let created = 0
let skipped = 0

for (const layer of LAYERS) {
  const layerSrc     = path.join(SRC, layer)
  const layerStories = path.join(STORIES, layer)

  if (!fs.existsSync(layerSrc)) continue
  fs.mkdirSync(layerStories, { recursive: true })

  const componentDirs = fs.readdirSync(layerSrc, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name)

  for (const dir of componentDirs) {
    const componentFile = path.join(layerSrc, dir, `${dir}.tsx`)
    if (!fs.existsSync(componentFile)) continue

    const storyFile = path.join(layerStories, `${dir}.stories.tsx`)

    if (fs.existsSync(storyFile) && !FORCE) {
      console.log(`  skip  ${layer}/${dir}  (ya existe, usa --force para sobreescribir)`)
      skipped++
      continue
    }

    const source        = fs.readFileSync(componentFile, 'utf8')
    const componentName = extractComponentName(source) ?? dir
    const props         = extractProps(source)
    const generic       = isGenericComponent(source)
    const storyContent  = generateStory(layer, componentName, props, generic)

    fs.writeFileSync(storyFile, storyContent, 'utf8')
    console.log(`  ✓ created  ${layer}/${dir}.stories.tsx`)
    created++
  }
}

console.log(`\nDone — ${created} created, ${skipped} skipped.`)
