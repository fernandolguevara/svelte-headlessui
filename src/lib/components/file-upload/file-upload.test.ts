import {fireEvent, render} from '@testing-library/svelte'
import FileUpload from './FileUpload.svelte'
import FileUploadLabel from './FileUploadLabel.svelte'
import FileUploadList from './FileUploadList.svelte'
import FileUploadListItem from './FileUploadListItem.svelte'
import FileUploadButton from './FileUploadButton.svelte'
import FileUploadDropZone from './FileUploadDropZone.svelte'
import svelte from 'svelte-inline-compile'
import {suppressConsoleLogs} from '$lib/test-utils/suppress-console-logs'

let mockId = 0
jest.mock('../../hooks/use-id', () => ({
  useId: jest.fn(() => ++mockId)
}))

beforeEach(() => (mockId = 0))
afterAll(() => jest.restoreAllMocks())

beforeEach(() => {
  document.body.innerHTML = ''
})

function nextFrame() {
  return new Promise<void>((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        resolve()
      })
    })
  })
}

function getButton(container: HTMLElement) {
  return container.querySelector('button,[role="button"],[id^="headlessui-fileupload-button-"]')
}
function getItems(container: HTMLElement) {
  return container.querySelector('li,[role="listitem"],[id^="headlessui-fileupload-listitem-"]')
}
function getInput(container: HTMLElement) {
  return container.querySelector('input,[type="file],[id=^headlessui-fileupload-input-]')
}

describe('safeguards', () => {
  it.each([
    ['FileUploadLabel', FileUploadLabel],
    ['FileUploadList', FileUploadList],
    ['FileUploadListItem', FileUploadListItem],
    ['FileUploadButton', FileUploadButton],
    ['FileUploadDropZone', FileUploadDropZone]
  ])(
    'should error when we are using a <%s /> without a parent <FileUpload />',
    suppressConsoleLogs((name, Component) => {
      expect(() => render(Component)).toThrowError(
        `<${name} /> is missing a parent <FileUpload /> component.`
      )
    })
  )

  it(
    'should be possibile to render FileUpload without crashing',
    suppressConsoleLogs(async () => {
      const {container} = render(svelte`
      <FileUpload >
        <FileUploadLabel >Choose a file</FileUploadLabel>
        <FileUploadButton >Select file</<FileUploadButton >
        <FileUploadDropZone />
        <FileUploadList >
          <FileUploadListItem />
        </FileUploadList>
      </FileUpload>
      `)

      const button = getButton(container)
      expect(button).not.toBe(null)
      expect(button).toHaveAttribute('role', 'button')

      const input = getInput(container)
      expect(input).not.toBe(null)
      expect(input).not.toBeVisible()

      const items = getItems(container)
      expect(items).toHaveLength(0)
    })
  )

  it(
    'should open the file explorer if button are clicked',
    suppressConsoleLogs(async () => {
      const {container} = render(svelte`
      <FileUpload >
        <FileUploadLabel >File</FileUploadLabel>
        <FileUploadButton />
        <FileUploadDropZone />
        <FileUploadList >
          <FileUploadListItem />
        </FileUploadList>
      </FileUpload>
      `)

      await nextFrame()

      const input = getInput(container)
      if (input === null) {
        return expect(input).not.toBe(null)
      }

      expect(input).not.toBeVisible()

      const onClick = jest.spyOn(input, 'onclick')
      const button = getButton(container)
      if (button === null) {
        return expect(button).not.toBe(null)
      }
      expect(button).not.toBeNull()

      await fireEvent.click(button)
      expect(onClick).toHaveBeenCalled()
    })
  )
})
