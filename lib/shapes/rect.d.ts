import Shape from '../shape';
interface RectShape {
    x: number;
    y: number;
    width: number;
    height: number;
}
export default class Rect extends Shape {
    name: string;
    render(ctx: CanvasRenderingContext2D, shape: RectShape): this;
}
export {};
