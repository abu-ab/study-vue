const map = new Map();
const weakMap = new WeakMap();

const foo = {
    foo: 1
};
const bar = {
    bar: 1
};
const bao = {
    bao: 1
};
(function () {
    map.set(foo, 1);
    weakMap.set(bar, 2)
    weakMap.set(bao, 2)
    // bao.a = 2;
    console.log(123)
})()

console.log(foo)
console.log(bar)
console.log(map)
console.log(weakMap)
bao.a = 1