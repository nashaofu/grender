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
define(["require", "exports", "./events", "./matrix"], function (require, exports, events_1, matrix_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    events_1 = __importDefault(events_1);
    var Shape = /** @class */ (function (_super) {
        __extends(Shape, _super);
        function Shape(_a) {
            var t = _a.t, s = _a.s, r = _a.r, z = _a.z, shape = _a.shape;
            var _this = _super.call(this, 'click', 'dbclick', 'mouseenter', 'mousemove', 'mouseleave', 'mousedown', 'mouseup', 'mouseover', 'contextmenu') || this;
            _this.z = 0;
            _this.matrix = [1, 0, 0, 1, 0, 0];
            if (t != null) {
                _this.translate(t);
            }
            if (s != null) {
                _this.scale(s);
            }
            if (r != null) {
                _this.rotate(r);
            }
            if (z != null) {
                _this.setZ(z);
            }
            _this.shape = shape;
            return _this;
        }
        Object.defineProperty(Shape.prototype, "t", {
            get: function () {
                return [this.matrix[4], this.matrix[5]];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Shape.prototype, "s", {
            get: function () {
                return [this.matrix[0], this.matrix[3]];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Shape.prototype, "r", {
            get: function () {
                return [this.matrix[0], this.matrix[3]];
            },
            enumerable: true,
            configurable: true
        });
        Shape.prototype.translate = function (_a) {
            var translateX = _a[0], translateY = _a[1];
            this.matrix = matrix_1.multiply(this.matrix, [1, 0, 0, 1, translateX, translateY]);
            if (this.parent) {
                this.parent.render();
            }
            return this;
        };
        Shape.prototype.scale = function (_a) {
            var scaleX = _a[0], scaleY = _a[1];
            this.matrix = matrix_1.multiply(this.matrix, [scaleX, 0, 0, scaleY, 0, 0]);
            if (this.parent) {
                this.parent.render();
            }
            return this;
        };
        Shape.prototype.rotate = function (rotate) {
            if (this.parent) {
                this.parent.render();
            }
            return this;
        };
        Shape.prototype.setZ = function (z) {
            this.z = z;
            return this;
        };
        Shape.prototype.render = function (ctx, shape) {
            return this;
        };
        return Shape;
    }(events_1.default));
    exports.default = Shape;
});
//# sourceMappingURL=shape.js.map