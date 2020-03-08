var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
define(["require", "exports"], function (require, exports) {
    "use strict";
    var _a;
    Object.defineProperty(exports, "__esModule", { value: true });
    var EVENTS = Symbol('Events');
    var Events = /** @class */ (function () {
        function Events() {
            var _this = this;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this[_a] = {};
            args.forEach(function (event) {
                _this[EVENTS][event] = [];
            });
        }
        /**
         * 绑定事件
         * @param event
         * @param handler
         */
        Events.prototype.on = function (event, handler) {
            if (!this[EVENTS][event]) {
                throw new Error("unknown event: " + event);
            }
            if (typeof handler !== 'function') {
                throw new TypeError('argument is not function');
            }
            this[EVENTS][event].push({
                type: 'on',
                handler: handler
            });
            return this;
        };
        /**
         * 绑定事件只触发一次
         * @param event
         * @param handler
         */
        Events.prototype.once = function (event, handler) {
            if (!this[EVENTS][event]) {
                throw new Error("unknown event: " + event);
            }
            if (typeof handler !== 'function') {
                throw new TypeError('argument is not function');
            }
            this[EVENTS][event].push({
                type: 'once',
                handler: handler
            });
            return this;
        };
        /**
         * 移除事件
         * event不存在时移除所有事件
         * handler不存在时移除该事件的所有绑定
         * @param event
         * @param handler
         */
        Events.prototype.off = function (event, handler) {
            var _this = this;
            if (!event) {
                Object.keys(this[EVENTS]).forEach(function (key) {
                    _this[EVENTS][key] = [];
                });
            }
            else {
                var handlers = this[EVENTS][event];
                if (!handlers) {
                    throw new Error("unknown event: " + event);
                }
                // handler不存在，则移除该事件的所有监听
                if (!handler) {
                    this[EVENTS][event] = [];
                }
                else {
                    var index = handlers.findIndex(function (f) { return f.handler === handler; });
                    if (index > -1) {
                        handlers.splice(index, 1);
                    }
                }
            }
            return this;
        };
        /**
         * 触发事件
         * @param event
         * @param args
         */
        Events.prototype.emit = function (event) {
            var _this = this;
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var handlers = this[EVENTS][event];
            if (!handlers) {
                throw new Error("unknown event: " + event);
            }
            handlers.forEach(function (f) {
                var _b;
                if (f.type === 'once') {
                    _this.off(event, f.handler);
                }
                (_b = f.handler).call.apply(_b, __spreadArrays([_this], args));
            });
            return this;
        };
        return Events;
    }());
    exports.default = Events;
    _a = EVENTS;
});
//# sourceMappingURL=events.js.map