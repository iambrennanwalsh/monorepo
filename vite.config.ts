import { createRequire } from 'module'
import path from 'path'
import { type UserConfigExport } from 'vite'
import dts from 'vite-plugin-dts'

export default function getBaseViteConfig(
	dirname: string,
	override?: UserConfigExport
): UserConfigExport {
	const isExternal = (id: string) => !id.startsWith('.') && !path.isAbsolute(id)

	const packageJSON = createRequire(import.meta.url)(
		path.resolve(dirname, 'package.json')
	)

	return {
		esbuild: {
			jsxInject: "import React from 'react'"
		},
		build: {
			lib: {
				entry: packageJSON.exports,
				formats: ['es']
			},
			outDir: 'dist',
			rollupOptions: {
				external: isExternal
			}
		},
		plugins: [
			dts({
				outputDir: 'types'
			})
		],
		...override
	}
}
