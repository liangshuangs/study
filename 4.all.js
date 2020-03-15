// Promise.all
const fs = require('fs'); // fs 是一个node 中 file System 有文件的读写操作
// 有异步的api （异步是要等待同步代码执行完后 才会执行）
// node中异步方法都有回调 并发 同时去读取文件，读取完毕的时机不一样
// 并发操作 就是两个操作互不影响
const after = (times,fn)=>()=>--times == 0 && fn();

let out = after(2,()=>{ // 并发的解决核心就是靠定时来维护
    console.log(renderObj)
})
let renderObj = {};
fs.readFile('./name.txt','utf8',function (err,data) {
    renderObj.name = data;
    out();
})

fs.readFile('./age.txt','utf8',function (err,data) {
    renderObj.age = data;
    out();
})
