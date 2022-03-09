import { createComponentInstance, setupComponent } from "./component";

/**
 * 
 * @param vnode 虚拟节点
 * @param container 容器
 */
export function render(vnode, container) {
    // 调用patch方法，为后序的递归处理
    patch(vnode, container);
}

function patch(vnode, container) {
    // 处理组件
    // TODO 是不是一个element类型
    // 是element 那么就应该处理element
    // 如何去区分是element类型还是component类型
    processElement();

    processComponent(vnode, container);



}

function processComponent(vnode: any, container: any) {
    // 挂载组件
    mountComponent(vnode, container);
}

function mountComponent(vnode, container) {
    // 通过虚拟节点创建组件实例对象
    const instance = createComponentInstance(vnode);
    setupComponent(instance);

    setupRenderEffect(instance, container);
}



function setupRenderEffect(instance, container) {
    const subTree = instance.render();
    // vnode -> element -> mountElement
    patch(subTree, container);

}

