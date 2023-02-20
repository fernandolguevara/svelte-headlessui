<script lang="ts" context="module">
  export enum ValueMode {
    Single,
    Multi
  }
  export type StateDefinition = {
    // State
    value: FileList
    mode: ValueMode
    accept?: string
    labelRef: Writable<HTMLLabelElement | null>
    inputRef: Writable<HTMLInputElement | null>
    listRef: Writable<HTMLUListElement | null>
    dropZoneRef: Writable<HTMLDivElement | null>
    buttonRef: Writable<HTMLButtonElement | null>
    disabled: boolean
    // State mutators
    change(value: FileList): void
    removeFiles(file: FileList): void
    addFiles(file: FileList): void
  }
  type TFileUploadProps<TSlotProps extends {}, TAsProp extends SupportedAs> = TPassThroughProps<
    TSlotProps,
    TAsProp,
    'div'
  > & {
    multiple?: boolean

    name?: string
    /** Whether the entire `FileUpload` and its children should be disabled */
    disabled?: boolean
    /** The file value */
    value?: StateDefinition['value']
  }
  const FILEUPLOAD_CONTEXT_NAME = 'headlessui-fileupload-context'
  export function useFileUploadContext(component: string): Readable<StateDefinition> {
    let context: Writable<StateDefinition> | undefined = getContext(FILEUPLOAD_CONTEXT_NAME)
    if (context === undefined) {
      throw new Error(`<${component} /> is missing a parent <FileUpload /> component.`)
    }
    return context
  }
</script>

<script lang="ts">
  import {writable, type Readable, type Writable} from 'svelte/store'
  import type {SupportedAs} from '$lib/internal/elements'
  import type {TPassThroughProps} from '$lib/types'
  import {getContext} from 'svelte'
  import type {HTMLActionArray} from '$lib/hooks/use-actions'
  import {forwardEventsBuilder} from '$lib/internal/forwardEventsBuilder'
  import {createEventDispatcher, get_current_component, setContext, tick} from 'svelte/internal'
  import Render from '$lib/utils/Render.svelte'
  import {useId} from '$lib/hooks/use-id'
  /** Props **/
  type TAsProp = $$Generic<SupportedAs>
  type $$Props = TFileUploadProps<typeof slotProps, TAsProp>
  export let as: SupportedAs = 'div'
  export let use: HTMLActionArray = []
  export let disabled: StateDefinition['disabled'] = false
  export let value: StateDefinition['value']
  export let multiple = false
  export let accept: StateDefinition['accept']
  /***** Events *****/
  const forwardEvents = forwardEventsBuilder(get_current_component(), ['change'])
  /***** Component *****/
  let labelRef: StateDefinition['labelRef'] = writable(null)
  let inputRef: StateDefinition['inputRef'] = writable(null)
  let buttonRef: StateDefinition['buttonRef'] = writable(null)
  let dropZoneRef: StateDefinition['dropZoneRef'] = writable(null)
  let listRef: StateDefinition['listRef'] = writable(null)
  let api = writable<StateDefinition>({
    value,
    mode: multiple ? ValueMode.Multi : ValueMode.Single,
    labelRef,
    inputRef,
    buttonRef,
    dropZoneRef,
    listRef,
    disabled,
    async change(files: FileList) {
      if (disabled || !$inputRef) return
      value = files
      $inputRef.files = files
      await tick()
      const event = new Event('change')
      $inputRef.dispatchEvent(event)
    },
    async removeFiles(files: FileList) {
      if (!$inputRef || !$api.value?.length) return
      // remove the file from inputRef
      const dt: DataTransfer = new DataTransfer()
      for (let i = 0; i < $api.value.length; i++) {
        const f = $api.value.item(i)
        if (f) {
          let isMatched = false
          for (let j = 0; j < files.length; j++) {
            const rf = files.item(j)
            if (rf && !isMatched && isSameFile(rf, f)) {
              isMatched = true
            }
          }
          if (!isMatched) {
            dt.items.add(f)
          }
        }
      }
      $api.change(dt.files)
    },
    async addFiles(files: FileList) {
      if (!$inputRef) return
      // add the file to inputRef
      const dt: DataTransfer = new DataTransfer()
      if ($api.mode === ValueMode.Single) {
        const f = files.item(0)
        if (f) {
          dt.items.add(f)
        }
      } else {
        for (let i = 0; i < files.length; i++) {
          const f = files.item(i)
          if (f) {
            dt.items.add(f)
          }
        }
      }
      $api.change(dt.files)
    }
  })
  function isSameFile(fileA: File, fileB: File): boolean {
    return fileA.lastModified === fileB.lastModified && fileA.size === fileB.size
  }
  setContext(FILEUPLOAD_CONTEXT_NAME, api)
  $: api.update((obj) => {
    return {
      ...obj,
      value,
      disabled,
      mode: multiple ? ValueMode.Multi : ValueMode.Single,
      accept
    }
  })
  const inputId = `headlessui-fileupload-input-${useId()}`
  $: slotProps = {}
  $: inputProps = {
    id: $$restProps.id || inputId,
    name: $$restProps.name || inputId,
    'aria-hidden': true,
    'aria-controls': $$restProps.id || inputId,
    'tab-index': -1,
    style: 'opacity: 0; height: 0; width: 0;',
    autocomplete: 'off',
    disabled: $api.disabled === true ? true : undefined,
    multiple: $api.mode === ValueMode.Multi,
    accept
  }
</script>

<Render {...$$restProps} {as} {slotProps} use={[...use, forwardEvents]} name={'FileUpload'}>
  <input type="file" {...inputProps} bind:this={$inputRef} bind:files={$api.value} on:change />
  <slot {...slotProps} />
</Render>
