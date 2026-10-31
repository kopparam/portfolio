import { type Config } from 'tailwindcss'

import kashlabs from './src/design-system/dist/tailwind-preset.cjs'

// Colours, radii, border widths and families come from the Kashlabs design
// system, so only its tokens exist as utilities.
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx,mdx}', './mdx-components.tsx'],
  darkMode: ['selector', '[data-theme="dark"]'],
  presets: [kashlabs],
} satisfies Config
