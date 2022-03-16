import {
    h
} from "../../lib/guide-mini-vue.esm.js"

export const Foo = {
    setup(props, {
        emit
    }) {
        // props.count
        console.log(props)
        props.count++;
        //3 Shallowreadonly

        const emitAdd = () => {
            console.log("emit add")
            emit("add", 1, 2);
            emit("add-foo")
        }
        return {
            emitAdd
        }
    },
    render() {
        const btn = h("button", {
            onClick: this.emitAdd
        }, "emitAdd")
        const p = h("p", {}, "emit add")
        return h("div", {}, [p, btn])
    }
}