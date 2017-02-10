// nodejs 模块之间的循环依赖
// 
// 猜想nodejs的模块实现。
// 其伪代码可能是这样：
// var Module={};
// 
// if(!Module["module1"]){
// 	 var mod={ exports:{} };
// 	 var exports=mod.exports;
// 	 Module["module1"]=mod;
// 	 var modsource=readFromFile('./module');
// 	  执行源代码:eval(modsource,exports,mod.exports)
// }else{
//   return Module["module1"].exports;
// }
// 
// webpack modjs 都是类似的处理
// module1.js.......                                          
console.log('1 01')
var a = 10;
exports.bb = "abc";
var c = require('./module2.js');
console.log('1 02')
exports.cc = "cccc";
console.log('1 03')


// module2.js.......
// console.log('2 01')
// var bba = 10;
// exports.ddd = "abc";
// console.log('2 02')
// var c = require('./module1.js');
// console.log(c);
// exports.eee = "cccc";
// console.log('2 03')


// 最后结果
// 1 01
// 2 01
// 2 02
// { bb : "cc" }
// 2 03
// 1 02
// 1 03
