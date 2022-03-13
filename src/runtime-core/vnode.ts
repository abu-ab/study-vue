
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
        el: null
    };
    return vnode;
}