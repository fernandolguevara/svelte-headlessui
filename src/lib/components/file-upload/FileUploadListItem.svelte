<script lang="ts" context="module">
  type TFileUploadListItem<TSlotProps extends {}, TAsProp extends SupportedAs> = TPassThroughProps<
    TSlotProps,
    TAsProp,
    'li'
  > & {file: File}
</script>

<script lang="ts">
  import type {TPassThroughProps} from '$lib/types'
  import type {SupportedAs} from '$lib/internal/elements'
  import Render from '$lib/utils/Render.svelte'
  import {useFileUploadContext} from './FileUpload.svelte'
  import {Keys} from '$lib/utils/keyboard'
  import type {HTMLActionArray} from '$lib/hooks/use-actions'
  import {tick} from 'svelte'
  import {get_current_component, onMount} from 'svelte/internal'
  import {useId} from '$lib/hooks/use-id'
  import {Focus} from '$lib/utils/calculate-active-index'
  import {match} from '$lib/utils/match'
  import {forwardEventsBuilder} from '$lib/internal/forwardEventsBuilder'
  /***** Props *****/
  type TAsProp = $$Generic<SupportedAs>
  type $$Props = TFileUploadListItem<typeof slotProps, TAsProp>
  export let as: SupportedAs = 'li'
  export let use: HTMLActionArray = []
  export let file: File
  /***** Events *****/
  const forwardEvents = forwardEventsBuilder(get_current_component())
  /***** Component *****/
  let api = useFileUploadContext('FileUploadListItem')
  let id = `headlessui-fileupload-listitem-${useId()}`
  $: propsWeControl = {
    id,
    role: 'listitem',
    tabIndex: $api.disabled === true ? undefined : -1,
    'aria-disabled': $api.disabled === true ? true : undefined
  }
  function remove(file: File) {
    const dt = new DataTransfer()
    dt.items.add(file)
    $api.removeFiles(dt.files)
  }
  $: slotProps = {disabled: $api.disabled, remove, file}
</script>

{#if file}
  <Render
    {...$$restProps}
    {...propsWeControl}
    {as}
    {slotProps}
    use={[...use, forwardEvents]}
    name={'FileUploadListItem'}
  >
    <slot {...slotProps}><span>File</span></slot>
  </Render>
{/if}
