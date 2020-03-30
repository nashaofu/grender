import Shape from './shape'

export interface ProxyEvent {
  event: Event
  type: string
  target: Shape<unknown> | null
  stop: () => void
  prevent: () => void
}

export function createProxyEvent (type: string, event: Event, target: Shape<unknown> | null): ProxyEvent {
  const proxyEvent = {
    event,
    type,
    target,
    stop (): void {
      event.stopPropagation()
      event.cancelBubble = true
    },
    prevent (): void {
      event.preventDefault()
      event.returnValue = false
    }
  }
  return proxyEvent
}
