import { proxy } from './util/index.js';
import { observe } from './observer/index.js';

export function initState (vm) {
    const opts = vm.$options;
    // vue的数据来源 属性 方法 数据 计算属性 watch
    if (opts.props) {
        initProps(vm);
    }
    if (opts.methods) {
        initMethod(vm);
    }
    if (opts.data) {
        initData(vm);
    }
    if (opts.computed) {
        initComputed(vm);
    }
    if (opts.watch) {
        initWatch(vm);
    }
}
function initProps (vm) { };
function initMethod (vm) { };
function initData (vm) {
    // 数据初始化
    let data = vm.$options.data;
    data = typeof data === 'function' ? data.call(vm) : data; // call(vm)保证data方法的this指向vm
    vm['_data'] = data;
    // 做一个数据代理 vm.data.xxx === vm.xxx
    for (let key in data) {
        proxy(vm, '_data', key);
    }
    observe(data); // 响应式原理
};
function initComputed (vm) { };
function initWatch (vm) { };
