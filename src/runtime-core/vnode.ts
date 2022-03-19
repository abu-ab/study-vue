import { ShapeFlags } from "../shared/ShapeFlags";
export const Fragment = Symbol("Fragment");
export const Text = Symbol("text");
/**
 * 
 * @param type 
 * @param props 
 * @param children 
 * @returns 
 */
export function createVNode(type, props?, children?) {
    const vnode = {
        type,
        props,
        children,
        shapeFlag: getShapeFlag(type),
        el: null
    };
    // children
    if (typeof children === "string") {
        vnode.shapeFlag |= ShapeFlags.TEXT_CHILDREN;
    } else if (Array.isArray(children)) {
        vnode.shapeFlag |= ShapeFlags.ARRAY_CHILDREN;
    }
    // 组件类型 +children object
    if (vnode.shapeFlag & ShapeFlags.STATEFULE_COMPONENT) {
        if (typeof children === "object") {
            vnode.shapeFlag |= ShapeFlags.SLOT_CHILDREN;
        }
    }
    return vnode;
}

export function createTextVNode(text: string) {
    return createVNode(Text,{},text)
}

function getShapeFlag(type) {
    return typeof type === "string" ? ShapeFlags.ELEMENT : ShapeFlags.STATEFULE_COMPONENT
}