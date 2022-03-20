import { render } from "./renderer";
import { createVNode } from "./vnode";

/**
 * 根组件
 * @param rootComponent 
 * 返回App对象
 * @returns 
 */
export function createApp(rootComponent) {
    return {
        /**
         * element实例
         * @param rootContainer 
         */
        // TODO
        // 如何在代码中获取容器
        mount(rootContainer) {
            // 先vnode
            // component->vnode
            // 所有的逻辑操作都会基于vnode做处理
            
            const vnode = createVNode(rootComponent);
            
            render(vnode,rootContainer);
        }
    }
}

