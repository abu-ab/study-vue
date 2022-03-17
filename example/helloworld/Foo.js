import {
    h,
    renderSlots
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
        const age = 10;
        const btn = h("button", {
            onClick: this.emitAdd
        }, "emitAdd")
        const p = h("p", {}, "emit add")
        console.log(this.$slots);
        // children -> vnode
        // renderSlots
        // return h("div", {}, [p, btn, h("div", {}, this.$slots)])
        // 1. 获取到要渲染的元素
        // 2. 获取到渲染的位置
        return h("div", {}, [renderSlots(this.$slots, "header", {
            age
        }), p, btn, renderSlots(this.$slots, "footer")])
    }
}