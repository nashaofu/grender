declare const EVENTS: unique symbol;
export interface Handler {
    type: 'on' | 'once';
    handler: (...args: unknown[]) => unknown;
}
export interface Handlers {
    [key: string]: Handler[];
}
export default class Events {
    readonly [EVENTS]: Handlers;
    constructor(...args: string[]);
    /**
     * 绑定事件
     * @param event
     * @param handler
     */
    on(event: string, handler: (...args: unknown[]) => unknown): this | never;
    /**
     * 绑定事件只触发一次
     * @param event
     * @param handler
     */
    once(event: string, handler: (...args: unknown[]) => unknown): this | never;
    /**
     * 移除事件
     * event不存在时移除所有事件
     * handler不存在时移除该事件的所有绑定
     * @param event
     * @param handler
     */
    off(event?: string, handler?: (...args: unknown[]) => unknown): this | never;
    /**
     * 触发事件
     * @param event
     * @param args
     */
    emit(event: string, ...args: unknown[]): this;
}
export {};
