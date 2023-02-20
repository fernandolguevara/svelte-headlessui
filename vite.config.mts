import {sveltekit} from '@sveltejs/kit/vite'
import UnoCSS from '@unocss/vite'
import type {UserConfig} from 'vite'

const config: UserConfig = {
  resolve: {
    alias: {
      '@popperjs/core': '@popperjs/core'
    }
  },
  plugins: [UnoCSS(), sveltekit()]
}

export default config
