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
    var Circle = /** @class */ (function (_super) {
        __extends(Circle, _super);
        function Circle() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.name = 'Circle';
            return _this;
        }
        Circle.prototype.render = function (ctx, shape) {
            var x = shape.x, y = shape.y, r = shape.r;
            ctx.fillStyle = 'red';
            ctx.strokeStyle = 'red';
            console.log(shape);
            ctx.arc(x, y, r, 0, 2 * Math.PI);
            ctx.stroke();
            return this;
        };
        return Circle;
    }(shape_1.default));
    exports.default = Circle;
});
//# sourceMappingURL=circle.js.map