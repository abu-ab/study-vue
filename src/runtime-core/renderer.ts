import { isObject } from "../shared/index";
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
    console.log(vnode.type);
    if (typeof vnode.type === "string") {
        processElement(vnode, container);
    } else if (isObject(vnode.type)) {
        processComponent(vnode, container);
    }
}

function processElement(vnode: any, container: any) {
    // init
    mountElement(vnode, container);
}

function mountElement(vnode: any, container: any) {
    // vnode -> element -> div
    const el = (vnode.el = document.createElement(vnode.type));
    const { children, props } = vnode
    // string类型 array类型
    console.log(children);
    if (typeof children === "string") {
        el.textContent = children;
    } else if (Array.isArray(children)) {
        // vnode
        mountChildren(vnode, el);

    }
    for (const key in props) {
        const val = props[key];
        el.setAttribute(key, val);
    }
    container.append(el);
}


function mountChildren(vnode: any, container: any) {
    vnode.children.forEach(v => {
        patch(v, container);
    });
}

function processComponent(vnode: any, container: any) {
    // 挂载组件
    mountComponent(vnode, container);
}

function mountComponent(initialVNode, container) {
    // 通过虚拟节点创建组件实例对象
    const instance = createComponentInstance(initialVNode);
    setupComponent(instance);

    setupRenderEffect(instance, initialVNode, container);
}



function setupRenderEffect(instance, initialVNode, container) {
    const { proxy } = instance;
    const subTree = instance.render.call(proxy);
    // vnode -> element -> mountElement
    patch(subTree, container);

    // element -> mount
    initialVNode.el = subTree.el
}



