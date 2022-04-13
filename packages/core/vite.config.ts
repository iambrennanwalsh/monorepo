import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import getBaseViteConfig from '../../vite.config'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig(getBaseViteConfig(__dirname))
