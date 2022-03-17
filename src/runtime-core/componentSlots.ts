import { ShapeFlags } from "../shared/ShapeFlags";

export function initSlots(instance, children) {
    const { vnode } = instance
    if (vnode.shapeFlag & ShapeFlags.SLOT_CHILDREN) {
        normalizeObjectSlots(children, instance.slots);
    }
}

function normalizeSlotValue(value) {
    return Array.isArray(value) ? value : [value];
}

function normalizeObjectSlots(children, slots) {
    for (const key in children) {
        const value = children[key];
        // slot
        slots[key] = (props) => normalizeSlotValue(value(props));
    }
    console.log("slots", slots)
}