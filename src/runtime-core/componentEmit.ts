import { camelize, toHandlerkey } from "../shared/index";

export function emit(instance, event, ...args) {
    console.log("emit1", event)

    // instance.props -> event
    const { props } = instance;
    // TPP
    // 先去写一个特定的行为 -》重构成通用的行为
    // add -> Add
    
    const handlerName = toHandlerkey(camelize(event));
    const handler = props[handlerName];
    handler && handler(...args);
}