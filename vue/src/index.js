import { initMixin } from './init.js';
import { lifecycleMixin } from './lifecyle.js';
import { renderMixin } from './render.js';

function Vue (options) {
    this._init(options);
}
initMixin(Vue); // 给Vue原型上添加一个_init方法
renderMixin(Vue);
lifecycleMixin(Vue);
export default Vue;
