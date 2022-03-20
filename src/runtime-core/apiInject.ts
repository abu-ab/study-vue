import { getCurrentInstance } from "./component";

export function provide(key, value) {
    // 存
    const currentInstance: any = getCurrentInstance();
    if (currentInstance) {
        let { provides, type } = currentInstance;
        const parentProvides = currentInstance.parent.provides;
        // init
        if (provides === parentProvides) {
            // TODO 没看懂这里
            provides = currentInstance.provides = Object.create(parentProvides);
        }
        provides[key] = value;
        console.log("name-provides", type.name, ":", JSON.parse(JSON.stringify(provides)), JSON.parse(JSON.stringify(parentProvides)));
    }
}

export function inject(key, defaultValue) {
    // 取
    const currentInstance: any = getCurrentInstance();
    if (currentInstance) {
        const parentProvides = currentInstance.parent.provides
        if (key in parentProvides) {
            return parentProvides[key]
        } else if (defaultValue) {
            if (typeof defaultValue === "function") {
                return defaultValue();
            }
            return defaultValue;
        }
    }
}