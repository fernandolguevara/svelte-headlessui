<script lang="ts" context="module">
  type TFileUploadListProps<TSlotProps extends {}, TAsProp extends SupportedAs> = TPassThroughProps<
    TSlotProps,
    TAsProp,
    'ul'
  >
</script>

<script lang="ts">
  import type {TPassThroughProps} from '$lib/types'
  import type {SupportedAs} from '$lib/internal/elements'
  import Render from '$lib/utils/Render.svelte'
  import {useFileUploadContext} from './FileUpload.svelte'
  import type {HTMLActionArray} from '$lib/hooks/use-actions'
  import {get_current_component} from 'svelte/internal'
  import {useId} from '$lib/hooks/use-id'
  import {forwardEventsBuilder} from '$lib/internal/forwardEventsBuilder'
  /***** Props *****/
  type TAsProp = $$Generic<SupportedAs>
  type $$Props = TFileUploadListProps<typeof slotProps, TAsProp>
  export let as: SupportedAs = 'ul'
  export let use: HTMLActionArray = []
  export let files: File[] = []
  /***** Events *****/
  const forwardEvents = forwardEventsBuilder(get_current_component())
  /***** Component *****/
  let api = useFileUploadContext('FileUploadList')
  let id = `headlessui-fileupload-list-${useId()}`
  let listRef = $api.listRef
  $: {
    const list = new Array($api.value?.length || 0)
    for (let i = 0; i < $api.value?.length || 0; i++) {
      list[i] = $api.value.item(i)
    }
    files = list
  }
  $: propsWeControl = {
    id,
    role: 'list',
    disabled: $api.disabled === true ? true : undefined
  }
  $: slotProps = {
    files,
    disabled: $api.disabled
  }
</script>

<Render
  {...$$restProps}
  {...propsWeControl}
  {as}
  {slotProps}
  use={[...use, forwardEvents]}
  name={'FileUploadList'}
  bind:el={$listRef}
>
  <slot {...slotProps} />
</Render>
