# @iambrennanwalsh/monorepo

A pure esm monorepo template.

---

## Features

- Pure ESM.
- TypeScript (with project references).
- Package management via Pnpm.
- Testing via Jest (with snapshot testing).
- Linting via ESLint
- Formatting via Prettier.
- VSCode integration.
- Build via Vite.
- Changesets, publishing, and versioning via @changesets/changesets.
- Continuous integration and deployment via Github Actions.
- Documentation app via Next.js.

## Commands

- `build`: Compiles packages for production.
- `changeset`: Add an entry to changeset.
- `clean`: Removes any files ignored by .gitignore.
- `format`: Runs Prettier.
- `lint`: Runs ESLint.
- `init`: Runs pnpm install.
- `test`: Runs Jest,
- `tsc`: Runs TypeScript (type checking only).
- `version`: Update package versions (handled automatically via github actions).
- `publish`: Publish changed packages to npm (handled automatically via github actions).
