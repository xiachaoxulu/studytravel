/**
* @Created Date       : 2016-11-11T15:54:04+08:00
* @Last Modified time : 2016-11-29T14:09:38+08:00
*/



var mustache = require( '../../../lib/mustache.min.js')
var tool = require( '../../tool/Tool.js')


var tpl = __inline('progress.tpl');

function create(option,callback){

	var div = document.createElement('div');
  	div.innerHTML = tpl;

  	document.body.appendChild(div);

}


module.exports= { create:create }
