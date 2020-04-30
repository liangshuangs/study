import { pushTarget, popTarget } from './dep';
let id = 0;
class Watcher {
    constructor(vm, exprOrFn, callback, options) {
        this.vm = vm;
        this.callback = callback;
        this.options = options;
        this.id = id++;
        this.getter = exprOrFn;
        this.depsId = new Set();
        this.deps = [];
        this.get();
    }
    get () {
        pushTarget(this); // 把watcher存起来  Dep.target = this
        this.getter(); // 渲染watcher的执行
        popTarget(); // 移除watcher
    }
    addDep(dep) { // watcher 里不能放重复的dep  dep里不能放重复的watcher
        let id = dep.id;
        if (!this.depsId.has(id)) {
            this.depsId.add(id);
            this.deps.push(dep);
            dep.addSub(this);
        }
    }
    update () {
        this.get(); // 渲染watcher的执行
    }
    run () {
        this.get();
    }
}
export default Watcher;
