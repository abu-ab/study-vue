import {
    h,
    createTextVNode
} from "../../lib/guide-mini-vue.esm.js";
import {
    Foo
} from "./Foo.js";
window.self = null;
export const App = {
    // .vue
    // <template></template>

    // render

    render() {
        // ui逻辑
        window.self = this;
        return h("div", {
                id: 'root',
                class: ['red', 'hear'],
                // onClick() {
                //     alert("123")
                // },
                // onMousedown() {
                //     console.log("13456")
                // }
            },
            // setupState
            // this.$el ->get root element
            // string
            // "hi," + this.msg
            // "hi, mini-vue"
            // array
            // [h("p", {
            //     class: 'red'
            // }, "h1"), h("p", {
            //     class: "blue"
            // }, 'mini-vue')]
            [h("div", {}, "hi" + this.msg), h(Foo, {
                    // on + Event
                    onAdd(a, b) {
                        console.log("a", a, "b", b)
                        console.log("onAdd")
                    },
                    onAddFoo() {
                        console.log("add fo0")
                    }
                    // slots 可以为一个虚拟节点，也可以为一个数组
                },
                // [h("p", {}, "123"), h("p", {}, "456")]
                // 具名插槽
                // {
                //     header: h("p", {}, "header"),
                //     footer: h("p", {}, "footer")
                // }
                // 作用域插槽
                {
                    header: ({
                        age
                    }) => [h("p", {}, "header" + age), h("p", {}, "23"), createTextVNode("你好呀")],
                    footer: () => h("p", {}, "footer")
                }
            )]
        )
    },
    setup() {
        // composition api
        return {
            msg: "mini-vue-1"
        }
    }
}