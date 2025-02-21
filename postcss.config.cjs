const tailwindcss = require('tailwindcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const nesting = require('tailwindcss/nesting')
const {default: unocss} = require('unocss')

const mode = process.env.NODE_ENV
const dev = mode === 'development'

const config = {
  plugins: [
    nesting(),
    tailwindcss(),
    //But others, like autoprefixer, need to run after,
    autoprefixer(),
    !dev &&
      cssnano({
        preset: 'default'
      })
  ]
}

module.exports = config
