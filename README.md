# Nectarize

As i've mentioned, this library was heavily inspired by @modulz/stitches. When Stitches came around, I was blown away by how simple it made everything. Yet the more and more I used Stitches, I found .

Compiler
x

## Features

### Configuration

1. Declare multiple themes in the same config.
2. Use `$scale$token` syntax to reference a token from another scale, or `$token` to reference a token from the same scale.
3. Tokens are transformed to css custom properties.
4. Supply a prefix that will be applied to all class names.
5. Utils are custom css properties are replaced with the contents of the util.
6. Modifiers accept a scale property, which accept dynamic props

```ts
import type { Config } from '@nectarize/core'

const config: Config = {
  // Theme properties are converted to css custom properties.
  themes: {

    // The base theme properties are declared on `:root {}`.
    base: {
      colors: {
        white: '#ffffff',
        black: '#222222',
        gray: '#999999',
        red: '#d83018',
        // Reference properties from the same scale via '$property' syntax or properties from another scale via the '$scale$property' syntax.
        link: '$red',
        bg: '$white'
        text: '$gray'
      },
      fontWeights: {
        thin: 100,
        med: 400,
        thick: 700
      }
    },

    // Additional themes properties are declared on a selector. For example, the dark themes properties are declared on `.dark`.
    dark: {
      colors: {
        bg: '$black',
        text: '$white'
      }
    }
  },

  // A custom prefix to append to class names. Default is 'nc'.
  prefix: 'nectar',

  // Utils are custom css properties. They are passed one argument, an array. They can accept any number of values.
  utils: {

    // A property for applying width/height together
    size: ([width, height]) => ({
      width: width,
      height: height,
    }),

    // A property to apply a linear gradient
    linearGradient: (value) => ({
      backgroundImage: `linear-gradient(${value})`,
    }),

    // An abbreviated property for border-radius
    br: (value) => ({
      borderRadius: value,
    })
  },

  // Modifiers are what other libraries typically call variants. You can declare theme scoped variants here.
  modifiers: {

    // A weight modifier will be available on all class names and as a prop on styled components.
    weight: {
      // Provide the boolean prop to only accept true/false values.
      boolean: true,
      // Provide a default value for this modifier.
      default: '400',

      css: (modifier) => {
        fontWeight: modifier
      }
    }
  }

}
```

### Styled Functions

```ts
// Styled Component function, accepts any number of composers.
// A composer is an intrinsic element, a css function, a style block, or another react component with a toString method.
export const Text = styled('span', {
	// Pass styles.
	transition: '1s',
	height: '40px',
	margin: '20px',

	// Reference a value from your theme. Theme scales are mapped dynamically to certain properties.
	color: '$dark',

	// Use any css selector.
	'& .primary': {
		color: 'red'
	},

	// Declare modifiers.
	modifiers: {
		size: {
			sm: {
				fontSize: '$sm'
			},
			md: {
				fontSize: '$md'
			}
		}
	},
	// Dynamic modifiers.
	dynamicModifiers: {
		color: value => ({
			color: value
		}),
		weight: value => ({
			fontWeight: value
		})
	},
	compoundModifiers: [
		{
			if: ['size', 'weight'],
			css: (size, weight) => {
				//...
			}
		},
		{
			if: {
				size: 'sm',
				color: 'red'
			},
			css: {
				// ..
			}
		}
	],
	defaultModifiers: {
		size: 'sm',
		color: 'red'
	},
	variants: {
		body: {},
		footnote: {}
	}
})
```

1. Css

- Compiles values containing an `$xx` or `$xx$xx` syntax to a custom property.
- Compiles properties containing an `$xx` syntax to a locally scoped custom property.
- Compiles blocks containing an `@xx` syntax to the theme referenced media query.
- Compiles modifiers to an
- Updates the stylesheet.
- Returns a class name optionally prefixed with a config specified prefix.

2. Styled: Returns a React Component,
3. GlobalCss
4. Ssr
5. Keyframes
6. Compose
7. Transform

---

1. Create Config
2. Pass Config to createNectar
3. Convert theme properties to customProperties
4. Add customProperties to sheet.
5.

## Installation

Install `@nectarize/core`.

```sh
$ npm i @nectarize/core
```
