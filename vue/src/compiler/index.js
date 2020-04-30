import { parseHTML } from './parser-html';
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;
function genProps (attrs) {
    if (!attrs.length) return 'undefined';
    let obj = {};
    attrs.forEach(element => {
        if (element.name === 'style') {
            element.value.split(';').forEach(item => {
                let [key, value] = item.split(':')
                let subObj = {};
                subObj[key] = value
                obj[element.name] = JSON.stringify(subObj)
            })
        } else {
            obj[element.name] = element.value;
        }

    });
    return JSON.stringify({...obj});
}
function genChildren (el) {
    let children = el.children;
    if (children && children.length) {
        return `${children.map(node => gen(node)).join(',')}`;
    } else {
        return false;
    }
}
function gen (node) {
    if (node.type === 1) {
        return generate(node);
    } else {
        let text = node.text;
        let tokens = [];
        let match,index;
        // 每次的偏移量 buffer.split()
        let lastIndex = defaultTagRE.lastIndex = 0; // 只要是全局匹配 就需要将lastIndex每次匹配的时候调到0处
        while(match = defaultTagRE.exec(text)){
            index = match.index;
            if(index > lastIndex){
                tokens.push(JSON.stringify(text.slice(lastIndex,index)));
            }
            tokens.push(`_s(${match[1].trim()})`);
            lastIndex = index + match[0].length;
        }
        if(lastIndex < text.length){
            tokens.push(JSON.stringify(text.slice(lastIndex)))
        }
        return `_v(${tokens.join('+')})`;
    }
}
function generate (el) {
    let children = genChildren(el);
    let code = `_c("${el.tag}",${genProps(el.attrs)}${children ? `,${children}`: ''})`;
    return code;
}
export function compileToFunction (template) {
    // 解析html字符串 将html => set语法树
    let root = parseHTML(template);
    // 将ast 语法树正常render函数 字符串拼接
    // div id="app"><p>{{name}}world</p></div>
    // _c(标签，属性，子标签，子标签。。。。) _v() => 生产文本 _S() JSON.Stringfy
    // 最终是_c('div',{id:app},_c('p',undefined,_s(name)),_v(world))
    let code = generate(root);
    let renderFn = new Function(`with(this){ return ${code}}`);
    return renderFn;
}

