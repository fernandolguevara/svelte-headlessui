<script lang="ts" context="module">
  type TFileUploadDropZoneProps<
    TSlotProps extends {},
    TAsProp extends SupportedAs
  > = TPassThroughProps<TSlotProps, TAsProp, 'div'> & {}
</script>

<script lang="ts">
  import {useFileUploadContext} from './FileUpload.svelte'
  import {useId} from '$lib/hooks/use-id'
  import {Keys} from '$lib/utils/keyboard'
  import {forwardEventsBuilder} from '$lib/internal/forwardEventsBuilder'
  import type {SupportedAs} from '$lib/internal/elements'
  import type {HTMLActionArray} from '$lib/hooks/use-actions'
  import {get_current_component} from 'svelte/internal'
  import Render from '$lib/utils/Render.svelte'
  import type {TPassThroughProps} from '$lib/types'
  /***** Props *****/
  type TAsProp = $$Generic<SupportedAs>
  type $$Props = TFileUploadDropZoneProps<typeof slotProps, TAsProp>
  export let as: SupportedAs = 'div'
  export let use: HTMLActionArray = []
  /***** Events *****/
  const forwardEvents = forwardEventsBuilder(get_current_component())
  /***** Component *****/
  let api = useFileUploadContext('FileUploadDropZone')
  let id = `headlessui-fileupload-dropzone-${useId()}`
  let buttonRef = $api.buttonRef
  let inputRef = $api.inputRef
  let hovered = false
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
  function handleDragLeave(e: CustomEvent) {
    e.preventDefault()
    hovered = false
  }
  function handleDragOver(e: CustomEvent) {
    e.preventDefault()
    hovered = true
  }
  function handleDrop(e: CustomEvent) {
    e.preventDefault()
    hovered = false
    let event = e as any as DragEvent
    if (!event.dataTransfer?.items) return
    const dt: DataTransfer = new DataTransfer()
    for (let i = 0; i < event.dataTransfer?.items?.length || 0; i++) {
      const item = event.dataTransfer.items[i]
      if (item.kind === 'file') {
        const file = item.getAsFile()
        file && dt.items.add(file)
      }
    }
    $api.addFiles(dt.files)
  }
  $: propsWeControl = {
    id,
    role: 'button',
    type: 'button',
    'aria-label': 'dropzone',
    'aria-controls': $inputRef?.id,
    disabled: $api.disabled === true ? true : undefined
  }
  $: slotProps = {
    disabled: $api.disabled,
    hovered
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
  on:dragover={handleDragOver}
  on:dragleave={handleDragLeave}
  on:drop={handleDrop}
>
  <slot {...slotProps} />
</Render>
