

const ShapeFlags = {
    element: 0,
    statefule_component: 0,
    text_children: 0,
    array_children: 0,
}

//  vnode -> stateful_component ->
// 1. 可以设置 修改
ShapeFlags.statefule_component = 1;
ShapeFlags.array_children = 1;

// 2. 查找
// if(ShapeFlags.element)
// if(ShapeFlags.statefule_component)

// 不够高效 -> 位运算的方式来解决

// 0000
// 0001 -> element
// 0010 -> stateful
// 0100 -> text_children
// 1000 -> array_children

// 1010

// | (两位都为0才为0)
// & (两位都为1才为1)

// 修改
// 0000    |
// 0001
// ----
// 0001

// // 查找 &
// 0001
// 0001
// ----
// 0001

// 0010
// 0001
// ----
// 0000