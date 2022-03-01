import {reactive} from "../reactive"
describe("reactive",()=>{
    it("happy path",()=>{
        const origin1 = {foo:1}
        const observed = reactive(origin1);
        expect(observed).not.toBe(origin1);
        expect(observed.foo).toBe(1);
    })
})