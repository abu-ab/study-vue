import {
    h
} from "../../lib/guide-mini-vue.esm.js";
export const App = {
    // .vue
    // <template></template>

    // render

    render() {
        // ui逻辑
        return h("div", "hi," + this.msg)
    },
    setup() {
        // composition api
        return {
            msg: "mini-vue"
        }
    }
}