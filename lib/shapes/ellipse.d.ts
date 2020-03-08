import Shape from '../shape';
interface ShapeOption {
    x: number;
    y: number;
    rx: number;
    ry: number;
}
export default class Ellipse extends Shape {
    name: string;
    render(ctx: CanvasRenderingContext2D, shape: ShapeOption): this;
}
export {};
