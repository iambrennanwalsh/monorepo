import transpileModules from 'next-transpile-modules'

const withTM = transpileModules(['@iambrennanwalsh/core'])

const nextConfig = {
	pageExtensions: ['md', 'mdx', 'tsx', 'ts', 'jsx', 'js'],
	webpack: (config, options) => {
		config.module.rules.push({
			test: /\.mdx/,
			use: [
				options.defaultLoaders.babel,
				{
					loader: '@mdx-js/loader',
					options: {}
				}
			]
		})
		return config
	}
}

export default withTM(nextConfig)
