The Kashlabs mark and lockup, built by `scripts/logo-assets.py` from the mark's geometry and the colour tokens. Rebuild them when either changes.

- `kashlabs-lockup.svg`, `kashlabs-lockup-dark.svg`: mark and wordmark, the wordmark as outlines. Light: ink #0c2350, accent #086a9e, tape #a8e4ff. Dark: ink #f1f5ff, accent #8fdcff, tape #a8e4ff.
- `kashlabs-mark.svg`, `kashlabs-mark-dark.svg`: the mark with its status light, for 32 px and up.
- `kashlabs-mark-small.svg`, `kashlabs-mark-small-dark.svg`: the mark without the light, for 16 to 24 px.
- `favicon.svg`: the small mark; it switches between the light and dark colours with the browser's colour scheme.
- `favicon.ico`: 16, 32 and 48 px, the mark on `ground`, for browsers without SVG favicons. Kept in the repository only; this page cannot store ICO files.
- `apple-touch-icon.png`: 180 px, the mark on `ground`.
- `opengraph.png`: the 1200 × 630 card shown when a page is shared.

On the site, draw the mark inline with the `kl-mark` classes so it follows the theme; use these files where an image is needed.
