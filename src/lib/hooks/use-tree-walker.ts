type AcceptNode = (
  node: HTMLElement
) =>
  | typeof NodeFilter.FILTER_ACCEPT
  | typeof NodeFilter.FILTER_SKIP
  | typeof NodeFilter.FILTER_REJECT

export function treeWalker({
  container,
  accept,
  walk,
  enabled
}: {
  container: HTMLElement | null
  accept: AcceptNode
  walk(node: HTMLElement): void
  enabled?: boolean
}) {
  const root = container
  if (!root) return
  if (enabled !== undefined && !enabled) return

  const acceptNode = Object.assign((node: HTMLElement) => accept(node), {
    acceptNode: accept
  })
  const walker = document.createTreeWalker(
    root,
    NodeFilter.SHOW_ELEMENT,
    acceptNode,
    // @ts-ignore-error Typescript bug thinks this can only have 3 args
    false
  )

  while (walker.nextNode()) walk(walker.currentNode as HTMLElement)
}
