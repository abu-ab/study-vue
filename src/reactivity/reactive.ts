import { mutableHandler, readonlyHandlers, shallowReadonlyHandlers } from "./baseHandlers";

export const enum ReactiveFlags {
    IS_REACTIVE = "__v_isReactive",
    IS_READONLY = "__v_isReadonly"
}

export function reactive(raw: any) {
    return createActiveObject(raw, mutableHandler);
}

export function readonly(raw) {
    return createActiveObject(raw, readonlyHandlers);
}

export function shallowReadonly(raw) {
    return createActiveObject(raw, shallowReadonlyHandlers);
}

export function isReactive(raw) {
    return !!raw[ReactiveFlags.IS_REACTIVE];
}

export function isReadonly(raw) {
    return !!raw[ReactiveFlags.IS_READONLY];
}

export function isProxy(raw) {
    return isReactive(raw) || isReadonly(raw);
}

function createActiveObject(raw: any, baseHandlers) {
    return new Proxy(raw, baseHandlers);
}

