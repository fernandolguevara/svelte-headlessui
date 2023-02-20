export function contains(containers: Set<HTMLElement>, element: HTMLElement) {
  for (const container of containers) {
    if (container.contains(element)) return true
  }

  return false
}
