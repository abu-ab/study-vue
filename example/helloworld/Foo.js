import {
    h
} from "../../lib/guide-mini-vue.esm.js"

export const Foo = {
    setup(props) {
        // props.count
        console.log(props)
        props.count++;
        //3 Shallowreadonly
    },
    render() {
        return h("div", {}, "foo" + this.count)
    }
}