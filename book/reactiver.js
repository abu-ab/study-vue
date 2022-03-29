const bucket = new WeakMap();

const data = {
    text: "hello world"
}

// 用一个全部变量存储被注册的副作用函数
let activeEffect;

const obj = new Proxy(data, {
    get(target, key) {
        // 如果没有activeEffect，则直接return
        if (!activeEffect) return;
        let depsMap = bucket.get(target);
        if (!depsMap) {
            bucket.set(target, (depsMap = new Map()))
        }
        let deps = depsMap.get(key);
        if (!deps) {
            depsMap.set(key, (deps = new Set()))
        }
        deps.add(activeEffect);
        return target[key];
    },
    set(target, key, newValue) {
        target[key] = newValue;
        const depsMap = bucket.get(target);
        if (!depsMap) return
        const effects = depsMap.get(key);
        effects && effects.forEach(fn => fn())
    }
})

function effect(fn) {
    // 当调用effect注册副作用函数的时，将副作用函数fn赋值给activeEffect
    activeEffect = fn;
    fn();
}
effect(() => {
    document.body.innerHTML = obj.text;
});

setTimeout(() => {
    obj.text = "hello world3"
}, 3000);