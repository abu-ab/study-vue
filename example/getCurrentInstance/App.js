import {
    h,
    getCurrentInstance
} from "../../lib/guide-mini-vue.esm.js";
import {
    Foo
} from "./Foo.js";
window.self = null;
export const App = {
    name: "app",
    render() {
        return h("div", {
                id: 'root',
                class: ['red', 'hear'],
            },
            [h(Foo, {}, {})]
        )
    },
    setup() {
        const instance = getCurrentInstance();
        console.log("app", instance)

    }
}