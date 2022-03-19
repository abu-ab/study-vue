import {
    h,
    getCurrentInstance
} from "../../lib/guide-mini-vue.esm.js"

export const Foo = {
    name: "foo",
    setup(props, {
        emit
    }) {
        console.log("foo", getCurrentInstance())
    },
    render() {
        return h("div", {}, "foo")
    }
}