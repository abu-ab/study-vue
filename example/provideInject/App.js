import {
    h,
    provide,
    inject
} from "../../lib/guide-mini-vue.esm.js";

const Provider = {
    name: "provider",
    render() {
        return h("div", {},
            [h("div", {}, "provide"), h(ProviderTwo)]
        )
    },
    setup() {
        provide("foo", "foovalue")
        provide("bar", "barvalue")
    }
}

const ProviderTwo = {
    name: "ProviderTwo",
    render() {
        return h("div", {},
            [h("div", {}, "ProviderTwo"), h(ProviderThree)]
        )
    },
    setup() {
        provide("foo", "ProviderTwo")
    }
}
const ProviderThree = {
    name: "ProviderThree",
    render() {
        return h("div", {},
            [h("div", {}, "ProviderThree-" + this.foo), h(Consumer)]
        )
    },
    setup() {
        const foo = inject("foo")
        return {
            foo
        }
    }
}

const Consumer = {
    name: "Consumer",
    setup() {
        const foo = inject("foo")
        const bar = inject("bar")
        return {
            foo,
            bar
        }
    },
    render() {
        return h("div", {}, "consumer-" + this.foo + "-" + this.bar)
    }

}

export const App = {
    name: "app",
    setup() {

    },
    render() {
        return h("div", {}, [h(Provider)])
    }
}