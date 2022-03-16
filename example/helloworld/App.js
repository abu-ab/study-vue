import {
    h
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
            })]
        )
    },
    setup() {
        // composition api
        return {
            msg: "mini-vue-1"
        }
    }
}