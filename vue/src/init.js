import { initState } from "./state";
import { mountComponent } from './lifecyle';
import { compileToFunction } from './compiler/index';

export function initMixin (Vue) {
    Vue.prototype._init = function (options) {

        const vm = this;
        vm.$options = options;

        // 初始化状态
        initState(vm);

        // 渲染页面
        if (vm.$options.el) {
            vm.$mount(vm.$options.el);
        };

    }
    Vue.prototype.$mount = function (el) {
        let vm = this;
        el = document.querySelector(el);
        let template = el.outerHTML;
        const render = compileToFunction(template);
        vm.$options.render = render;
        mountComponent(vm, el);
    }
}
