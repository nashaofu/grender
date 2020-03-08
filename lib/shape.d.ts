import Events from './events';
import GRender from './grender';
export interface ShapeOpts {
    t?: number[];
    s?: number[];
    r?: number;
    z?: number;
    shape: ShapeOptsShape;
    [key: string]: unknown;
}
export interface ShapeOptsShape {
    [key: string]: unknown;
}
export default class Shape extends Events {
    z: number;
    parent?: GRender;
    matrix: number[];
    shape: ShapeOptsShape;
    constructor({ t, s, r, z, shape }: ShapeOpts);
    get t(): number[];
    get s(): number[];
    get r(): number[];
    translate([translateX, translateY]: number[]): this;
    scale([scaleX, scaleY]: number[]): this;
    rotate(rotate: number): this;
    setZ(z: number): this;
    render(ctx: CanvasRenderingContext2D, shape: unknown): this;
}
