
//  var exports=module.exports={};  require 函数取的是 module.exports 的值。

console.log(module.exports===exports)

exports.ss="sss";

console.log(module.exports)

console.log(module.exports===exports)

exports={
	asda:'sada'
}
console.log(module.exports)
console.log(module.exports===exports)



