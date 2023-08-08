import type Shape from './shape';
import type GRender from './grender';
import { createProxyMouseEvent, ProxyMouseEvent } from './utils';

interface EventHandler {
  shape: Shape<unknown>
  handler: (e: ProxyMouseEvent) => void
}

const eventHandlers: EventHandler[] = [];

export function addMouseOverOut<T>(shape: Shape<T>, grender: GRender): void {
  let isOver = false;
  let isEnter = false;
  const handler = (e: ProxyMouseEvent): void => {
    if (shape.contains(e.x, e.y)) {
      if (!isOver) {
        shape.emit('mouseover', createProxyMouseEvent('mouseover', e.event, shape, grender));
        isOver = true;
      }
    } else if (isOver) {
      shape.emit('mouseout', createProxyMouseEvent('mouseout', e.event, shape, grender));
      isOver = false;
    }
    if (e.target === shape) {
      if (!isEnter && isOver) {
        shape.emit('mouseenter', createProxyMouseEvent('mouseenter', e.event, shape, grender));
        isEnter = true;
      }
    } else if (isEnter) {
      shape.emit('mouseleave', createProxyMouseEvent('mouseleave', e.event, shape, grender));
      isEnter = false;
    }
  };

  grender.on('mousemove', handler);

  eventHandlers.push({
    shape,
    handler,
  });
}

export function removeMouseOverOut<T>(shape: Shape<T>, grender: GRender): void {
  const index = eventHandlers.findIndex((item) => item.shape === shape);
  if (index !== -1) {
    const eventHandler = eventHandlers[index];

    grender.off('mousemove', eventHandler.handler);

    eventHandlers.splice(index, 1);
  }
}
