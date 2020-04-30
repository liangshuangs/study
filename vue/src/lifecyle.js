import Watcher from './observer/watcher';
import { patch } from './vdom/patch';

export function lifecycleMixin (Vue) {
    Vue.prototype._update = function (vnode) {
        const vm = this;
        vm.$el = patch(vm.$el, vnode); // 需要用虚拟节点创建出真实节点 替换掉 真实的$el
    }
}
export function mountComponent (vm, el) {
    vm.$el = el;
    // 渲染页面
    let updateComponent = () => {
        vm._update(vm._render());
    };
    // 渲染watcher 每个组件都有一个watcher
    new Watcher(vm, updateComponent, () => { }, true);
}
