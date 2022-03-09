export function createComponentInstance(vnode) {
    const component = {
        vnode,
        type: vnode.type,
    }
    return component;
}

export function setupComponent(instance) {
    // TODO 
    // initPorps()
    // initSlots()

    setupStatefulComponent(instance);
}

function setupStatefulComponent(instance: any) {
    const Component = instance.type;

    const { setup } = Component;
    if (setup) {
        // function Object
        const setupResult = setup()
        handleSetupResult(instance, setupResult);
    }
}
function handleSetupResult(instance, setupResult: any) {
    //function object
    // TODO function

    if (typeof setupResult === "object") {
        instance.setup.state = setupResult;
    }

    finishComponentSetup(instance);
}

function finishComponentSetup(instance: any) {
    const Component = instance.type;
    if (Component.render) {
        instance.render = Component.render();
    }
}

