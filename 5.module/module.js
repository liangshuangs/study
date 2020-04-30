const fs = require('fs');
const path = require('path');
const vm = require('vm');

function Module (id) {
    this.id = id;
    this.exports = {};
}
Module.prototype.load = function () {
    let extname = path.extname(this.id);
    Module._extensions[extname](this);
}
Module.wrapper = [
    `(function (exports, require, module, __filename, __dirname) {`,  
    `})`
]
Module._extensions = {
    '.js' (module) {
        let content = fs.readFileSync(module.id);
        content = Module.wrapper[0] + content + Module.wrapper[1];
        let fn = vm.runInThisContext(content);
        let exports = module.exports;
        let dirpath = path.dirname(module.id);
        fn.call(exports, exports, req, module, module.id, dirpath);
    },
    '.json' (module) {
        let constent = fs.readFileSync(module.id);
        module.exports = JSON.parse(content);
    }
}
Module._reslovePath = function (filename) {
    let absPath = path.resolve(__dirname, filename);
    let isExits = fs.existsSync(absPath);
    if (isExits) {
        return absPath;
    } else {
        let keys = Object.keys(Module._extensions);
        for (let i = 0, len = keys.length; i < len; i++) {
            let newPath = absPath + keys[i];
            if (fs.existsSync(newPath)) {
                return newPath;
            }
        }
    }
    throw new Error('module no found');
}
Module.cache = {};
function req (filename) {
    let abspath = Module._reslovePath(filename);
    let cacheModule = Module.cache[abspath];
    if (cacheModule) {
        return cacheModule.exports;
    }
    let module = new Module(abspath);
    Module.cache[abspath] = module;
    module.load();
    return module.exports;
}

let {test} = req('./test1.js');
test();