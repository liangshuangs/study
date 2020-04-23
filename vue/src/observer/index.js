import { isObjext } from '../util/index.js';
class Observer {
    constructor(value) {
        console.log(value);
        // 对对象进行观测
        this.walk(value);
    }
    walk (data) {
        let keys = Object.keys(data);
        keys.forEach(key => {
            defineReactive(data, key, data[key]);
        })
    }
}
function defineReactive (data, key, value) {
    Object.defineProperty(data, key, {
        get () {
            return value;
        },
        set (newVal) {
            if (newVal === value) {
                return;
            } else {
                observe(newVal); // 新赋的值也可以是一个对象
                value = newVal;
            }
        }
    });
}
export function observe (data) {
    if (!isObjext(data)) {
        return;
    }
    return new Observer(data);
}
