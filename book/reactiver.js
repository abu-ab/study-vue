const bucket = new WeakMap();

const data = {
    text: "hello world"
}

// 用一个全部变量存储被注册的副作用函数
let activeEffect;

// 依赖收集
// WeakMap -> Map -> Set
const obj = new Proxy(data, {
    get(target, key) {
        console.log("target:", target, "key:", key)
        // 如果没有activeEffect，则直接return
        if (!activeEffect) return;
        console.log("activeEffect", activeEffect);
        // 根据target 从桶中获取得depsMap，他也是一个Map类型 key --> effects
        let depsMap = bucket.get(target);
        console.log("depsMap", depsMap);
        // 如果不存在depsMap，那么新建一个Map并与target关联（第一次进入）
        if (!depsMap) {
            // 给depsMap 赋值一个新的Map
            bucket.set(target, (depsMap = new Map()))
        }
        // 在根据key从depsMap中获得deps，他是一个Set类型
        // 里面存储着所有与当前key相关联得副作用函数effects
        let deps = depsMap.get(key);
        // 如果不存在deps，同样新建一个set并于Key关联（第一次进入）
        if (!deps) {
            depsMap.set(key, (deps = new Set()))
        }
        console.log("依赖收集前deps", deps)
        // 最后将当前激活得副作用函数添加到桶中
        deps.add(activeEffect);
        console.log("依赖收集后deps", deps)
        return target[key];
    },
    set(target, key, newValue) {
        // 设置属性值
        target[key] = newValue;
        // 根据target从桶中取得depsMap，它是 key -> effects
        const depsMap = bucket.get(target);
        if (!depsMap) return
        // 根据key取得所有得副作用函数 effects
        const effects = depsMap.get(key);
        // 执行副作用函数
        effects && effects.forEach(fn => fn())
    }
})

function effect(fn) {
    // 当调用effect注册副作用函数的时，将副作用函数fn赋值给activeEffect
    activeEffect = fn;
    // 执行一次依赖函数
    fn();
}
effect(() => {
    document.body.innerHTML = obj.text;
});

// 延时任务
setTimeout(() => {
    obj.text = "hello world3"
}, 3000);