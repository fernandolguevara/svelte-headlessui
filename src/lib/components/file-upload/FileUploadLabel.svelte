<script lang="ts" context="module">
  type TFileUploadLabelProps<
    TSlotProps extends {},
    TAsProp extends SupportedAs
  > = TPassThroughProps<TSlotProps, TAsProp, 'label'> & {}
</script>

<script lang="ts">
  import {useFileUploadContext} from './FileUpload.svelte'
  import {useId} from '$lib/hooks/use-id'
  import Render from '$lib/utils/Render.svelte'
  import {forwardEventsBuilder} from '$lib/internal/forwardEventsBuilder'
  import type {SupportedAs} from '$lib/internal/elements'
  import type {HTMLActionArray} from '$lib/hooks/use-actions'
  import {get_current_component} from 'svelte/internal'
  import type {TPassThroughProps} from '$lib/types'
  /***** Props *****/
  type TAsProp = $$Generic<SupportedAs>
  type $$Props = TFileUploadLabelProps<typeof slotProps, TAsProp>
  export let as: SupportedAs = 'label'
  export let use: HTMLActionArray = []
  /***** Events *****/
  const forwardEvents = forwardEventsBuilder(get_current_component())
  /***** Component *****/
  let id = `headlessui-fileupload-label-${useId()}`
  let api = useFileUploadContext('FileUploadLabel')
  let labelRef = $api.labelRef
  let buttonRef = $api.buttonRef
  function handleClick(): void {
    $buttonRef?.focus({preventScroll: true})
  }
  $: slotProps = {
    disabled: $api.disabled
  }
</script>

<Render
  {...$$restProps}
  {id}
  {as}
  {slotProps}
  use={[...use, forwardEvents]}
  name={'FileUploadLabel'}
  bind:el={$labelRef}
  on:click={handleClick}
>
  <slot {...slotProps} />
</Render>
