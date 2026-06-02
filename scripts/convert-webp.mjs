import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const root = path.resolve('public/imgs')
const exts = new Set(['.png', '.jpg', '.jpeg'])

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      await walk(fullPath)
      continue
    }
    const ext = path.extname(entry.name).toLowerCase()
    if (!exts.has(ext)) continue
    const outPath = fullPath.replace(/\.(png|jpg|jpeg)$/i, '.webp')
    try { await fs.access(outPath); continue } catch {}
    try {
      await sharp(fullPath).webp({ quality: 82, effort: 4 }).toFile(outPath)
    } catch (error) {
      process.stderr.write(`failed: ${path.relative(process.cwd(), fullPath)} -> ${error.message}\n`)
    }
  }
}

await walk(root)