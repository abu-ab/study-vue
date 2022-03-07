import { isProxy, isReactive, reactive } from "../reactive"
describe("reactive", () => {
    it("happy path", () => {
        const origin1 = { foo: 1 }
        const observed = reactive(origin1);
        expect(observed).not.toBe(origin1);
        expect(observed.foo).toBe(1);
        expect(isReactive(origin1)).toBe(false)
        expect(isReactive(observed)).toBe(true)
        expect(isProxy(observed)).toBe(true)
    })
    it('nested reactive', () => {
        const original = {
            nested: {
                foo: 1
            },
            array: [{ bar: 2 }]
        }
        const observed = reactive(original);
        expect(isReactive(observed.nested)).toBe(true);
        expect(isReactive(observed.array)).toBe(true);
        expect(isReactive(observed.array[0])).toBe(true)
    });
})