var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "../shape"], function (require, exports, shape_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    shape_1 = __importDefault(shape_1);
    var Ellipse = /** @class */ (function (_super) {
        __extends(Ellipse, _super);
        function Ellipse() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.name = 'Ellipse';
            return _this;
        }
        Ellipse.prototype.render = function (ctx, shape) {
            var x = shape.x, y = shape.y, rx = shape.rx, ry = shape.ry;
            var k = 0.5522848;
            var ox = rx * k; // 水平控制点偏移量
            var oy = ry * k; // 垂直控制点偏移量
            // 从椭圆的左端点开始顺时针绘制四条三次贝塞尔曲线
            ctx.moveTo(x - rx, y);
            ctx.bezierCurveTo(x - rx, y - oy, x - ox, y - ry, x, y - ry);
            ctx.bezierCurveTo(x + ox, y - ry, x + rx, y - oy, x + rx, y);
            ctx.bezierCurveTo(x + rx, y + oy, x + ox, y + ry, x, y + ry);
            ctx.bezierCurveTo(x - ox, y + ry, x - rx, y + oy, x - rx, y);
            return this;
        };
        return Ellipse;
    }(shape_1.default));
    exports.default = Ellipse;
});
//# sourceMappingURL=ellipse.js.map