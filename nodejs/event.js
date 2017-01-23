var util = require("util");
var events = require("events"); 
var path =require("path");

// console.log(__dirname)
// console.log(path.normalize(__dirname+'../..//'))

var from="‪C:\\Users\\xiachao\\Desktop\\tt";

var _path=path.relative(from, __dirname);
 
 console.log(_path);

// function Man(age){

// }


// util.inherits(Man,events.EventEmitter);
 
// var p=new Man();

// console.dir(Object.getOwnPropertyNames(p.__proto__.__proto__));
// p.on("myself", function(data) {
//   console.log(data);
// });
 

// p.on("error", function(err) {
//   console.dir(err);
// });

// p.emit("error",new Error('sadasdadad'));
// console.log(p.__proto__.__proto__==events.EventEmitter.prototype);