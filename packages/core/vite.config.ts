import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import getBaseViteConfig from '../../vite.config'

export default defineConfig(
	getBaseViteConfig(dirname(fileURLToPath(import.meta.url)))
)
