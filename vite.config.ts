import { createRequire } from 'module'
import path from 'path'
import { type UserConfigExport } from 'vite'
import dts from 'vite-dts'

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
			emptyOutDir: true,
			lib: {
				entry: packageJSON.main,
				formats: ['es']
			},
			outDir: packageJSON.publishConfig.main,
			rollupOptions: {
				external: isExternal
			}
		},
		plugins: [dts()],
		...override
	}
}
