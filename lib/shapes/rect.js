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
    var Rect = /** @class */ (function (_super) {
        __extends(Rect, _super);
        function Rect() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.name = 'Rect';
            return _this;
        }
        // shape: RectShape = {
        //   x: 0,
        //   y: 0,
        //   width: 0,
        //   height: 0
        // }
        Rect.prototype.render = function (ctx, shape) {
            var x = shape.x, y = shape.y, width = shape.width, height = shape.height;
            ctx.rect(x, y, width, height);
            return this;
        };
        return Rect;
    }(shape_1.default));
    exports.default = Rect;
});
//# sourceMappingURL=rect.js.map