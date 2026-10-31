# Spotlight

Spotlight is a [Tailwind UI](https://tailwindui.com) site template built using [Tailwind CSS](https://tailwindcss.com) and [Next.js](https://nextjs.org).

## Getting started

To get started with this template, first install the npm dependencies:

```bash
npm install
```

Next, create a `.env.local` file in the root of your project and set the `NEXT_PUBLIC_SITE_URL` variable to your site's public URL:

```
NEXT_PUBLIC_SITE_URL=https://example.com
```

Next, run the development server:

```bash
npm run dev
```

Finally, open [http://localhost:3000](http://localhost:3000) in your browser to view the website.

## Design system

The site is styled by the Kashlabs design system (`k/kashlabs-design-system` on Forgejo). `src/design-system/` is a copy of its built files, so the Docker build never needs access to that repository; don't edit the copy. To update it, build the design system, then run:

```bash
node scripts/sync-design-system.mjs ../kashlabs-design-system
```

`src/design-system/SOURCE` records which commit the copy came from. Components use the system's `kl-` classes; Tailwind only knows the system's colours, border widths and families.

## Articles

Each article's metadata needs a `docNo`: `KL-` and the next four-digit number, never reused. Record changes of substance as `revisions: [{ rev: 'B', description: '…', date: 'YYYY-MM-DD' }]`; revision letters skip I, O, Q, S, X and Z. Revision A, the first issue, is added automatically.

## Diagrams

Write a diagram as a `d2` code block in an article, starting with `# title:` and `# description:` lines (see the design system's Diagrams section for the classes). The build renders each block with the design system's kl-d2 and caches the SVG in `src/diagrams/`, keyed by the diagram's source and the D2 theme, so the Docker build does not need D2.

When you add or change a diagram, or sync a design system with a new D2 theme, install D2 0.9.0 (`brew install d2`, or set `D2_BIN`), run `bun run dev` or `bun run build` once, and commit the new SVG in `src/diagrams/`. Old SVGs are not removed automatically.

## License

This site template is a commercial product and is licensed under the [Tailwind UI license](https://tailwindui.com/license).

## Learn more

To learn more about the technologies used in this site template, see the following resources:

- [Tailwind CSS](https://tailwindcss.com/docs) - the official Tailwind CSS documentation
- [Next.js](https://nextjs.org/docs) - the official Next.js documentation
- [Headless UI](https://headlessui.dev) - the official Headless UI documentation
- [MDX](https://mdxjs.com) - the MDX documentation
