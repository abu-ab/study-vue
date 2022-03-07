import { isProxy, isReadonly, readonly } from "../reactive";

describe("readonly", () => {
    it("happy path", () => {
        // not set
        const obj = { foo: 1, bar: { baz: 2 } }
        const wrapped = readonly(obj);
        expect(wrapped).not.toBe(obj);
        expect(wrapped.foo).toBe(1);
        expect(isReadonly(obj)).toBe(false);
        expect(isReadonly(wrapped)).toBe(true);
        expect(isReadonly(obj.bar)).toBe(false);
        expect(isReadonly(wrapped.bar)).toBe(true);
        expect(isProxy(wrapped)).toBe(true)
    })

    it('warn then call set', () => {
        // console.warn()
        // mock 
        console.warn = jest.fn();
        const user = readonly({
            age: 10
        })
        user.age = 11;
        expect(console.warn).toBeCalled();
    });
})