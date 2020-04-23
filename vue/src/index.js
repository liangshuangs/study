import {initMixin} from './init.js';
function Vue (options) {
    this._init(options);
}
initMixin(Vue); // 给Vue原型上添加一个_init方法
export default Vue;
