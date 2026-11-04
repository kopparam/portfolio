# kashlabs.com

The source of [kashlabs.com](https://kashlabs.com), Kashyap Kopparam's personal site. It is a Next.js 14 site, built as a static export and styled by the Kashlabs design system.

This repository lives on a private Forgejo. `kopparam/portfolio` on GitHub is a mirror of its `main` (see Deploying), so changes made on GitHub are overwritten.

## Running it

Install the dependencies with [Bun](https://bun.sh) 1.4:

```bash
bun install
```

- `bun run dev` serves the site at http://localhost:3000 and reloads on changes.
- `bun run build` writes the static site to `out/`, and `bun run start` serves that at http://localhost:3000.
- `bun run lint` and `bun run test` run ESLint and the Bun tests, as CI does on every pull request.

`NEXT_PUBLIC_SITE_URL` in `.env` is the public address the build uses for absolute links: the feed, the share card and the icons. Override it in `.env.local` if you need to.

## Design system

The site is styled by the Kashlabs design system (`k/kashlabs-design-system` on Forgejo). `src/design-system/` is a copy of its built files, so the deploy build never needs access to that repository; don't edit the copy. To update it, build the design system, then run:

```bash
node scripts/sync-design-system.mjs ../kashlabs-design-system
```

`src/design-system/SOURCE` records which commit the copy came from. Components use the system's `kl-` classes; Tailwind only knows the system's colours, border widths and families.

## Articles

Each article's metadata needs a `docNo`: `KL-` and the next four-digit number, never reused. Record changes of substance as `revisions: [{ rev: 'B', description: '…', date: 'YYYY-MM-DD' }]`; revision letters skip I, O, Q, S, X and Z. Revision A, the first issue, is added automatically.

## Diagrams

Write a diagram as a `d2` code block in an article, starting with `# title:` and `# description:` lines (see the design system's Diagrams section for the classes). The build renders each block with the design system's kl-d2 and caches the SVG in `src/diagrams/`, keyed by the diagram's source and the D2 theme, so the deploy build does not need D2.

When you add or change a diagram, or sync a design system with a new D2 theme, install D2 0.9.0 (`brew install d2`, or set `D2_BIN`), run `bun run dev` or `bun run build` once, and commit the new SVG in `src/diagrams/`. Old SVGs are not removed automatically.

## Deploying

Pushing to `main` runs `.forgejo/workflows/build-deploy.yaml` on the Forgejo runner. It builds the site as a static export in `out/` and force-pushes that to the `gh-pages` branch of `kopparam/portfolio` on GitHub, which GitHub Pages serves at the address in `.env` (`NEXT_PUBLIC_SITE_URL`). The push uses a deploy key with write access to that repository, stored as the Forgejo Actions secret `GH_PAGES_DEPLOY_KEY`.

The same push runs `.forgejo/workflows/mirror-github.yaml`, which force-pushes `main` to `main` on `kopparam/portfolio` with that deploy key, so GitHub's `main` is a public copy of this repository's `main` and anything committed there directly is overwritten.

There is no image server in a static export, so `bun run build` also writes each JPEG and PNG at the widths in `src/lib/image-sizes.mjs` (`scripts/export-images.mjs`) and builds `feed.xml` from the exported articles (`scripts/build-feed.mjs`). `bun run start` serves `out/` locally.

## License

The site started from Spotlight, a [Tailwind UI](https://tailwindui.com) template. The code that remains from it is covered by the [Tailwind UI license](LICENSE.md).
