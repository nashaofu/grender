import Shape from '../shape';
interface CircleShape {
    x: number;
    y: number;
    r: number;
}
export default class Circle extends Shape {
    name: string;
    render(ctx: CanvasRenderingContext2D, shape: CircleShape): this;
}
export {};
