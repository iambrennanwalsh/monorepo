import type { NextPage } from 'next'
import { css } from './../nectarConfig'

const textStyles = css({
	color: '$gray'
})

const linkStyles = css(textStyles, {
	color: 'red',
	transition: '.2s',
	'&:hover': {
		color: 'blue'
	},
	variants: {
		color: {
			scale: 'colors',
			dynamic: true
		}
	}
})

const Home: NextPage = () => {
	return (
		<a href="/about" className={linkStyles({ color: 'red' })}>
			About
		</a>
	)
}

export default Home
