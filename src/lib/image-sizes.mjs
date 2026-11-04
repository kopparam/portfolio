// The widths next/image may ask for, shared by next.config.mjs and
// scripts/export-images.mjs. The site is a static export with no image
// server, so the build writes a copy of every raster image at each width.
// Photos are shown at 11rem to 20rem, so these cover 1x to 3x screens.
export const imageSizes = [64, 128, 256, 384]
export const deviceSizes = [640, 828, 1080, 1536]
