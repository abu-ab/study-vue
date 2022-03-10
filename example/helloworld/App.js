import {
    h
} from "../../lib/guide-mini-vue.esm.js";
export const App = {
    // .vue
    // <template></template>

    // render

    render() {
        // ui逻辑
        return h("div", {
                id: 'root',
                class: ['red', 'hear']
            },
            // string
            // "hi," + this.msg
            // "hi, mini-vue"
            // array
            [h("p", {
                class: 'red'
            }, "h1"), h("p", {
                class: "blue"
            }, 'mini-vue')]
        )
    },
    setup() {
        // composition api
        return {
            msg: "mini-vue"
        }
    }
}