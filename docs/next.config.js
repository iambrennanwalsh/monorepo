const withTM = require('next-transpile-modules')(['@nectarize/core'])

/** @type {import('next').NextConfig} */
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

module.exports = withTM(nextConfig)
