<script lang="ts" context="module">
  type TFileUploadButtonProps<
    TSlotProps extends {},
    TAsProp extends SupportedAs
  > = TPassThroughProps<TSlotProps, TAsProp, 'button'> & {}
</script>

<script lang="ts">
  import {tick} from 'svelte'
  import {useFileUploadContext} from './FileUpload.svelte'
  import {useId} from '$lib/hooks/use-id'
  import {Keys} from '$lib/utils/keyboard'
  import {Focus} from '$lib/utils/calculate-active-index'
  import {forwardEventsBuilder} from '$lib/internal/forwardEventsBuilder'
  import type {SupportedAs} from '$lib/internal/elements'
  import type {HTMLActionArray} from '$lib/hooks/use-actions'
  import {get_current_component} from 'svelte/internal'
  import Render from '$lib/utils/Render.svelte'
  import {resolveButtonType} from '$lib/utils/resolve-button-type'
  import type {TPassThroughProps} from '$lib/types'
  /***** Props *****/
  type TAsProp = $$Generic<SupportedAs>
  type $$Props = TFileUploadButtonProps<typeof slotProps, TAsProp>
  export let as: SupportedAs = 'button'
  export let use: HTMLActionArray = []
  /***** Events *****/
  const forwardEvents = forwardEventsBuilder(get_current_component())
  /***** Component *****/
  let api = useFileUploadContext('FileUploadButton')
  let id = `headlessui-fileupload-button-${useId()}`
  let buttonRef = $api.buttonRef
  let labelRef = $api.labelRef
  let inputRef = $api.inputRef
  async function handleKeyDown(e: CustomEvent) {
    let event = e as any as KeyboardEvent
    switch (event.key) {
      // Ref: https://www.w3.org/TR/wai-aria-practices-1.2/#keyboard-interaction-13
      case Keys.Space:
      case Keys.Enter:
      case Keys.ArrowDown:
        event.preventDefault()
        break
      case Keys.ArrowUp:
        event.preventDefault()
        break
    }
  }
  function handleKeyUp(e: CustomEvent) {
    let event = e as any as KeyboardEvent
    switch (event.key) {
      case Keys.Space:
        // Required for firefox, event.preventDefault() in handleKeyDown for
        // the Space key doesn't cancel the handleKeyUp, which in turn
        // triggers a *click*.
        event.preventDefault()
        break
    }
  }
  async function handleClick(e: CustomEvent) {
    if ($api.disabled) return
    // open the files expolorer
    $inputRef?.click()
  }
  $: propsWeControl = {
    id,
    role: 'button',
    type: 'button',
    'aria-labelledby': $labelRef ? [$labelRef?.id, id].join(' ') : undefined,
    disabled: $api.disabled === true ? true : undefined
  }
  $: slotProps = {
    disabled: $api.disabled
  }
</script>

<Render
  {...$$restProps}
  {...propsWeControl}
  {as}
  {slotProps}
  use={[...use, forwardEvents]}
  name={'FileUploadButton'}
  bind:el={$buttonRef}
  on:click={handleClick}
  on:keydown={handleKeyDown}
  on:keyup={handleKeyUp}
>
  <slot {...slotProps} />
</Render>
