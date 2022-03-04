const {
    effect,
    reactive
} = require("@vue/reactivity")
// let a = 10;
// b = a + 10;
// console.log(b);

// a = 30;
// b = a + 10;
// console.log(b);

let a = reactive({
    number: 10
});
let b;
effect(() => {
    b = ++a.number;
})
console.log(b);