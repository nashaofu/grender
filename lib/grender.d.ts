import Events from './events';
import Shape from './shape';
export default class GRender extends Events {
    el: HTMLElement;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D | null;
    shapes: Shape[];
    constructor(el: HTMLElement);
    get width(): number;
    get height(): number;
    resize(): this;
    add(shape: Shape): this;
    remove(shape: Shape): this;
    render(): this;
}
