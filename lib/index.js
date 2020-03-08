var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "./shape", "./grender", "./shapes/rect", "./shapes/circle", "./shapes/ellipse"], function (require, exports, shape_1, grender_1, rect_1, circle_1, ellipse_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    shape_1 = __importDefault(shape_1);
    grender_1 = __importDefault(grender_1);
    rect_1 = __importDefault(rect_1);
    circle_1 = __importDefault(circle_1);
    ellipse_1 = __importDefault(ellipse_1);
    exports.Shape = shape_1.default;
    exports.default = grender_1.default;
    exports.Rect = rect_1.default;
    exports.Circle = circle_1.default;
    exports.Ellipse = ellipse_1.default;
});
//# sourceMappingURL=index.js.map