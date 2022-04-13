import { exec } from 'child_process'
import { build as esbuild, type BuildOptions } from 'esbuild'
import { access, readdir } from 'fs/promises'
import { createRequire } from 'module'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

export const require = createRequire(import.meta.url)

const PACKAGE_ROOTS = ['packages']

export default class Builder {
	root: string
	packageRoots: string[]

	constructor(root?: string) {
		this.root = root ? root : dirname(fileURLToPath(import.meta.url))
		this.packageRoots = PACKAGE_ROOTS.map(path => join(this.root, path))
	}

	async build() {
		try {
			this.packageRoots.forEach(async path => {
				const packages = await this.findPackages(path)

				packages.forEach(async pkg => {
					const esbuildConfig = join(path, 'esbuild.config.ts')
					const hasEsbuildConfig = await this.exists(esbuildConfig)
					if (hasEsbuildConfig) {
						const SubBuilder: typeof Builder = await import(esbuildConfig)
						const builder = new SubBuilder(this.root)
						await builder.loadPackage(pkg)
					} else {
						await this.loadPackage(pkg)
					}
				})
			})
		} catch (error) {
			console.error(error)
		}
	}

	async findPackages(path: string): Promise<string[] | never> {
		try {
			const packages = await readdir(path).then(pkg =>
				pkg.filter(val => val.charAt(0) != '.')
			)
			return packages
				.map(pkg => join(path, pkg))
				.filter(
					async pkg => await (await readdir(pkg)).includes('package.json')
				)
		} catch {
			throw new Error(`Couldn't find the directory pointed to by path: ${path}`)
		}
	}

	async loadPackage(path: string) {
		const packageJson = join(path, 'package.json')
		const json = require(packageJson)

		if (json.main) {
			await this.esbuildTask(path, json)
		}

		if (json.types) {
			await this.tscTask(path, json)
		}
	}

	async esbuildTask(
		path: string,
		packageJson: any,
		overrides: BuildOptions = {}
	) {
		try {
			esbuild({
				bundle: true,
				minify: true,
				sourcemap: true,
				absWorkingDir: path,
				inject: [join(this.root, 'packages/tools/build-utils/react-shim.js')],
				entryPoints: [join(path, 'src/index.ts')],
				external: Object.keys(packageJson.dependencies ?? {}).concat(
					Object.keys(packageJson.peerDependencies ?? {})
				),
				outfile: join(path, packageJson.main),
				format: 'esm',
				...overrides
			})
		} catch (error) {
			throw new Error(`ESBuild error in package: ${packageJson.name}\n${error}`)
		}
	}

	async tscTask(
		path: string,
		packageJson: any,
		flags = '--emitDeclarationOnly'
	) {
		try {
			exec(`${this.root}/node_modules/.bin/tsc --project ${path} ${flags}`)
		} catch (error) {
			throw new Error(
				`Typescript error in package: ${packageJson.name}\n${error}`
			)
		}
	}

	async exists(path: string): Promise<boolean> {
		try {
			await access(path)
			return true
		} catch {
			return false
		}
	}
}

if (process.argv.includes('run')) {
	const builder = new Builder()
	builder.build()
}
