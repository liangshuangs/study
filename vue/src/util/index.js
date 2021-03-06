// 实现一个代理效果
export function proxy (vm, source, key) {
    Object.defineProperty(vm, key, {
        get () {
            return vm[source][key];
        },
        set (newVal) {
            vm[source][key] = newVal;
        }
    })
}
export function isObjext (data) {
    return typeof data === 'object' && data !== null;
}
export function def (data, key, value) {
    return Object.defineProperty(data, key, {
        value: value,
        enumerable: false,
        configurable: false
    })
}
