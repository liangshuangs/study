// 三种buffer的声明方式 内存 大小是不能发生变化的
// buffer可以通过数字 字符串 数组 声明

let buffer = Buffer.alloc(10);
let buffer1 = Buffer.from('珠');
let buffer2 = Buffer.from([0xe7, 0x8f, 0xa0]);
console.log(buffer, buffer1, buffer2);
//  buffer转string
console.log(buffer2.toString());
console.log(buffer2.toString('base64'));

// base64转码原理
// 一个汉字是3个字节  一个字节是8位  即 3 * 8 （24） 转base64 就是 变成 4 * 6
// 比如 珠 的buffer是  e7 8f a0 二进制是 11100111 10001111 10100000
// 变成是 4 * 6 就是  111001 111000 111110  100000
// 不够8位这高位补0   00111001 00111000 00111110  00100000
console.log(0xe7.toString(2));
console.log(0x8f.toString(2));
console.log(0xa0.toString(2));

// 00111001 00111000 00111110  00100000 转为二进制是 57 56 62 32

console.log(parseInt('00111001', 2))
console.log(parseInt('00111000', 2))
console.log(parseInt('00111110', 2))
console.log(parseInt('00100000', 2))

// base64的规范表
let str = 'ABCDEFGHIGKLNMOPQRSTUVWXYZ';
str += str.toLocaleLowerCase();
str += '0123456789+/';
let base64Code = str[57] + str[56] + str[62] + str[32];
console.log(base64Code);

// 前端的二进制