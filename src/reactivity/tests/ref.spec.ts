import { effect } from "../effect";
import { isReactive, reactive } from "../reactive";
import { isRef, proxyRefs, ref, unRef } from "../ref";

describe('ref', () => {
    it.only("happy path", () => {
        const a = ref(1);
        expect(a.value).toBe(1);
    })
    it("should be reactive", () => {
        const a = ref(1);
        let dummy;
        let calls = 0;
        effect(() => {
            calls++;
            dummy = a.value
        })
        expect(calls).toBe(1);
        expect(dummy).toBe(1);

        a.value = 2;
        expect(calls).toBe(2);
        expect(dummy).toBe(2);

        // same value should not trigger
        a.value = 2;
        expect(calls).toBe(2);
        expect(dummy).toBe(2);

        // expect(isReactive(a)).toBe(true)

    })
    it("should make nested properties reactive", () => {
        const a = ref({
            count: 1
        })
        let dummy;
        effect(() => {
            dummy = a.value.count;
        })
        expect(dummy).toBe(1);
        a.value.count = 2;
        expect(dummy).toBe(2);
    })
    it('isRef', () => {
        const a = ref(1);
        const user = reactive({
            age: 3
        })
        expect(isRef(a)).toBe(true);
        expect(isRef(1)).toBe(false);
        expect(isRef(user)).toBe(false);
    });
    it('unRef', () => {
        const a = ref(1);
        expect(unRef(a)).toBe(true);
        expect(unRef(1)).toBe(false);
    });

    it('proxyRefs', () => {
        const user = {
            age: ref(10),
            name: "小灰"
        }
        // get->age(ref) 那么返回给他value
        const proxyUser = proxyRefs(user);
        expect(user.age.value).toBe(10);
        expect(proxyUser.age).toBe(10);
        expect(proxyUser.name).toBe("小灰")
        proxyUser.age = 20;
        // set -> ref .value
        expect(proxyUser.age).toBe(20);
        expect(user.age).toBe(20);

        proxyUser.age = ref(10);
        expect(proxyUser.age).toBe(10);
        expect(user.age).toBe(10);
    });
})
