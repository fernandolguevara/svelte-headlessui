<script>
  import '@unocss/reset/tailwind.css'
  import 'uno.css'

  const reset = true
  export {reset}
</script>

<div class="flex flex-col items-center justify-center">
  <slot />
</div>
