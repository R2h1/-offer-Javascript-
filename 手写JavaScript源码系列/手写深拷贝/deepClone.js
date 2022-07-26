/**
 * //未考虑特殊对象和性能优化：考虑数组、循环引用（使用弱引用，避免拷贝对象过大的内存额外消耗）(面试不用写太复杂，否则自己挖坑，用Map就好)
 * @param {*} target 待拷贝对象
 * @param {*} map 循环引用问题，map缓存已拷贝的
 */
const cloneDeep = function(target, map = new WeekMap()) {
    // 拷贝过return 避免循环引用
    if (map.get(target)) return target
    // 对象拷贝
    if (isObject(target)) {
        map.set(target, true)
        // 考虑数组
        let cloneTarget = Array.isArray(target) ? [] : {}
        for (let key in target) {
            // 自有属性
            if (target.hasOwnProperty(key)) {
                cloneTarget[key] = cloneDeep(target[key], map)
            }
        }
        return cloneTarget
    } else {
        return target
    }
}

const isObject = function(target) {
    const type = typeof target
    return value !== null && (type === 'object' || type === 'function')
}