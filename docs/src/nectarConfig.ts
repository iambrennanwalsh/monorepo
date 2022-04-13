import type { Config } from '@nectarize/core'
import { createNectar } from '@nectarize/core'

const nectarConfig: Config = {
	themes: {
		base: {
			colors: {
				green: '#d83018',
				gray: '#555555',
				white: '#ffffff',
				black: '#222222',
				text: '$colors$gray',
				bg: '$colors$white'
			},
			fontSizes: {
				sm: '14px',
				md: '16px',
				lg: '18px'
			}
		},
		dark: {
			colors: {
				text: '$colors$white',
				bg: '$colors$black'
			}
		}
	},
	variants: {
		text: {
			body: {
				fontSize: '$fontSizes$sm'
			},
			footnote: {
				base: {
					color: '#d83018'
				},
				dark: {
					color: '#269e4a'
				}
			}
		}
	},
	media: {
		xs: '(min-width: 32em)',
		sm: '(min-width: 48em)',
		md: '(min-width: 64em)',
		lg: '(min-width: 80em)',
		xl: '(min-width: 96em)'
	}
}

export const { css, ssr } = createNectar(nectarConfig)
