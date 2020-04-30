import { createElement, createTextNode } from './vdom/create-element';
export function renderMixin (Vue) {
    Vue.prototype._render = function (el) {
        const vm = this;
        const {
            render
        } = vm.$options;
        let vnode = render.call(vm); // 去实例上 取值

        return vnode;
    }
    Vue.prototype._c = function () {
        return createElement(...arguments);
    }
    Vue.prototype._v = function (text) {
        return createTextNode(text);
    }
    Vue.prototype._s = function (val) {
        return val == null ? '' : (typeof val === 'object' ? JSON.stringify(val) : val);
    }
}
