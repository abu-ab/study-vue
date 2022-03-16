import { shallowReadonly } from "../reactivity/reactive";
import { emit } from "./componentEmit";
import { initProps } from "./componentProps";
import { PublicInstanceProxyHandlers } from "./componentPublicInstance";

export function createComponentInstance(vnode) {
    const component = {
        vnode,
        type: vnode.type,
        setupState: {},
        props: {},
        emit: () => { }
    }
    component.emit = emit.bind(null, component) as any;
    return component;
}

// instance 当前组件的实例

export function setupComponent(instance) {
    // TODO 
    initProps(instance, instance.vnode.props);
    // initSlots()

    setupStatefulComponent(instance);
}

function setupStatefulComponent(instance: any) {
    const Component = instance.type;

    instance.proxy = new Proxy({ _: instance }, PublicInstanceProxyHandlers)

    const { setup } = Component;
    if (setup) {
        // function Object
        const setupResult = setup(shallowReadonly(instance.props), {
            emit: instance.emit
        })
        handleSetupResult(instance, setupResult);
    }
}
function handleSetupResult(instance, setupResult: any) {
    //function object
    // TODO function

    if (typeof setupResult === "object") {
        instance.setupState = setupResult;
    }

    finishComponentSetup(instance);
}

function finishComponentSetup(instance: any) {
    const Component = instance.type;
    instance.render = Component.render;
}

