import { isObjext, def } from '../util/index.js';
import { arrayMethods } from './array';
import Dep from './dep';
class Observer {
    constructor(value) {
        this.dep = new Dep;
        def(value, '__ob__', this);
        if (Array.isArray(value)) {
            value.__proto__ = arrayMethods;
            this.observeArray(value);
        } else {
            // 对对象进行观测
            this.walk(value);
        }
    }
    walk (data) {
        let keys = Object.keys(data);
        keys.forEach(key => {
            defineReactive(data, key, data[key]);
        })
    }
    observeArray (data) {
        data.forEach(item => {
            observe(item);
        })
    }
}
function defineReactive (data, key, value) {
    let dep = new Dep(); // 这个dep 是为了给对象使用的
    observe(value);
    Object.defineProperty(data, key, {
        get () {
            if (Dep.target) {
                dep.depend();
            }
            return value;
        },
        set (newVal) {
            if (newVal === value) {
                return;
            } else {
                observe(newVal); // 新赋的值也可以是一个对象
                value = newVal;
                dep.notify(); // 通知依赖的watcher来进行一个更新操作
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
