const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`; // abc-aaa
const qnameCapture = `((?:${ncname}\\:)?${ncname})`; // <aaa:asdads>
const startTagOpen = new RegExp(`^<${qnameCapture}`); // 标签开头的正则 捕获的内容是标签名
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`); // 匹配标签结尾的 </div>
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 匹配属性的
const startTagClose = /^\s*(\/?)>/; // 匹配标签结束的 >  <div>
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;

const ELEMENT_TYPE = 1;
const TEXT_TYPE = 3;
let root;
let currentParent;
let stack = [];

function createASTElement(tagName, attrs) {
    return {
        tag: tagName,
        type: ELEMENT_TYPE,
        children: [],
        attrs,
        parent: null
    }
}
function start (tagName, attrs) {
    // 遇到开始标签 就创建一个ast元素s
    let element = createASTElement(tagName, attrs);
    if (!root) {
        root = element;
    }
    currentParent = element; // 把当前元素标记成父ast树
    stack.push(element); // 将开始标签存放到栈中
}
function end (tagName) {
    let element = stack.pop();
    let currentParent = stack[stack.length - 1];
    if (currentParent) {
        element.parent = currentParent;
        currentParent.children.push(element);
    }
}
function chars(text) {
    text = text.replace(/\s/g,'');
    if(text){
        currentParent.children.push({
            text,
            type:TEXT_TYPE
        })
    }
}
export function parseHTML (html) {
    while (html) {
        let textEnd = html.indexOf('<');
        if (textEnd === 0) {
            // < 在开头的位置， 则肯定是一个标签 有可能是一个开始标签 也有可能是一个结束标签
            let startTagMatch = parseStartTag(); // 匹配开始标签
            if (startTagMatch) {
                start(startTagMatch.tagName, startTagMatch.attrs); // 解析开始标签
                continue;
            }
            let endTagMatch = html.match(endTag);
            if (endTagMatch) {
                advance(endTagMatch[0].length);
                end(endTagMatch[1]); // 2解析结束标签
                continue;
            }
        }
        let text;
        if (textEnd >= 0) {
            text = html.substring(0, textEnd);
        }
        if (text) {
            advance(text.length);
            chars(text); // 3解析文本
        }
    };
    function parseStartTag () {
        let start = html.match(startTagOpen);
        if (start) {
            const match = {
                tagName: start[1],
                attrs: []
            };
            advance(start[0].length); // 进行字符串截取
            let end, attr;
            while(!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
                advance(attr[0].length);
                match.attrs.push({
                    name: attr[1],
                    value: attr[3] || attr[4] || attr[5]
                });
            }
            if (end) { // // 去掉开始标签的 >
                advance(end[0].length);
                return match;
            };
        };
    };
    function advance (n) {
        html = html.substring(n);
    }
    return root;
}
