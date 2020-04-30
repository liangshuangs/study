const oldArrayMetods = Array.prototype;
export const arrayMethods = Object.create(oldArrayMetods);
const methods = [
    'push',
    'shift',
    'unshift',
    'pop',
    'sort',
    'splice',
    'reverse'
]
methods.forEach(key => {
    arrayMethods[key] = function (...args) {
        let result = oldArrayMetods[key].apply(this,args);
        let inserted;
        let ob = this.__ob__;
        switch (key) {
            case 'push':
            case 'unshift':
                inserted = args;
                break;
            case 'splice': // 3个  新增的属性 splice 有删除 新增的的功能 arr.splice(0,1,{name:1})
                inserted = args.slice(2)
            default:
                break;
        }
        if (inserted) {
            ob.observeArray(inserted);
        }
        return result
    }
})
