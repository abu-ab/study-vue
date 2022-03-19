import { isObject } from "../shared/index";
import { ShapeFlags } from "../shared/ShapeFlags";
import { createComponentInstance, setupComponent } from "./component";
import { Fragment } from "./vnode";

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
    // shapeFlags
    // vnode -> flag
    // element

    // 处理组件
    // TODO 是不是一个element类型
    // 是element 那么就应该处理element
    // 如何去区分是element类型还是component类型
    console.log(vnode.type);
    const { type, shapeFlag } = vnode;

    // Fragment -> 只渲染children
    switch (type) {
        case Fragment:
            processFragment(vnode, container);
            break;
        default:
            // if (typeof vnode.type === "string") {
            if (shapeFlag & ShapeFlags.ELEMENT) {
                processElement(vnode, container);
                // STATEFUL_COMPONENT
            } else if (shapeFlag & ShapeFlags.STATEFULE_COMPONENT) {
                // else if (isObject(vnode.type)) {
                processComponent(vnode, container);
            }
            break;
    }
}

function processFragment(vnode: any, container: any) {
    // Implement
    mountChildren(vnode, container);
}

function processElement(vnode: any, container: any) {
    // init
    mountElement(vnode, container);
}

function mountElement(vnode: any, container: any) {
    // vnode -> element -> div
    const el = (vnode.el = document.createElement(vnode.type));
    const { children, props, shapeFlag } = vnode
    // string类型 array类型
    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
        // typeof children === "string"
        // text_children 
        el.textContent = children;
    } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
        // Array.isArray(children)
        // array_children
        // vnode
        mountChildren(vnode, el);

    }
    for (const key in props) {
        const val = props[key];
        // 具体的 click -》通用
        // on + event name
        // onMousedown
        const isOn = (key: string) => /^on[A-Z]/.test(key);
        if (isOn(key)) {
            const event = key.slice(2).toLowerCase();
            el.addEventListener(event, val);
        }
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


