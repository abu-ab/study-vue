import { isObject } from "../shared/index";
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

function createActiveObject(target: any, baseHandlers) {
    if(!isObject(target)){
        console.warn("必须是一个对象")
        return target;
    }
    return new Proxy(target, baseHandlers);
}

