import {
  defineConfig,
  extractorSvelte,
  presetAttributify,
  presetUno,
  presetWebFonts,
  transformerDirectives
} from 'unocss'

export default defineConfig({
  transformers: [transformerDirectives()],
  extractors: [extractorSvelte],
  presets: [
    presetAttributify(),
    presetWebFonts({
      provider: 'google', // default provider
      fonts: {
        // these will extend the default theme
        sans: 'Roboto',
        mono: ['IBM Plex Mono', 'Fira Code', 'Fira Mono:400,700']
      }
    }),
    presetUno()
  ]
})
