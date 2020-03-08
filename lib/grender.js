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
define(["require", "exports", "./events"], function (require, exports, events_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    events_1 = __importDefault(events_1);
    var GRender = /** @class */ (function (_super) {
        __extends(GRender, _super);
        function GRender(el) {
            var _this = _super.call(this, 'click', 'dbclick', 'mouseenter', 'mousemove', 'mouseleave', 'mousedown', 'mouseup', 'mouseover', 'contextmenu') || this;
            _this.shapes = [];
            _this.el = el;
            _this.canvas = document.createElement('canvas');
            _this.canvas.width = _this.el.offsetWidth;
            _this.canvas.height = _this.el.offsetHeight;
            _this.el.appendChild(_this.canvas);
            _this.ctx = _this.canvas.getContext('2d');
            return _this;
        }
        Object.defineProperty(GRender.prototype, "width", {
            get: function () {
                return this.canvas.width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GRender.prototype, "height", {
            get: function () {
                return this.canvas.height;
            },
            enumerable: true,
            configurable: true
        });
        GRender.prototype.resize = function () {
            this.canvas.width = this.el.offsetWidth;
            this.canvas.height = this.el.offsetHeight;
            this.render();
            return this;
        };
        GRender.prototype.add = function (shape) {
            shape.parent = this;
            this.shapes.push(shape);
            this.render();
            return this;
        };
        GRender.prototype.remove = function (shape) {
            var index = this.shapes.findIndex(function (item) { return item === shape; });
            if (index !== -1) {
                this.shapes.splice(index, 1);
            }
            this.render();
            return this;
        };
        GRender.prototype.render = function () {
            var _this = this;
            if (this.ctx != null) {
                this.shapes.forEach(function (shape) { return shape.render(_this.ctx, shape.shape); });
                console.log('render');
            }
            return this;
        };
        return GRender;
    }(events_1.default));
    exports.default = GRender;
});
//# sourceMappingURL=grender.js.map