/**
* @Created Date       : 2016-10-24T10:11:03+08:00
* @Last Modified time : 2016-11-29T11:45:50+08:00
*/



var mustache = require('../../../lib/mustache.min.js')

function create(target, arg) {

  if (!target) {
    throw 'loading target is must';
    return;
  }
  var option = {};

  option.type = (arg && arg.type) || 'ball';

  var tpl;
  var className;
  switch (option.type) {
    case 'ball':
      className = "loading-wrap";
      tpl = __inline('loading.tpl');
      break;
    case 'cat':
      className = 'loadingcat-wrap';
      tpl = __inline('loadingcat.tpl');
      break;
    default:
      className = "loading-wrap";
      tpl = __inline('loading.tpl');
      break;
  }



  mustache.parse(tpl);
  var result = mustache.render(tpl);
  var dom = document.createElement('div');
  dom.className = className;
  dom.innerHTML = result;
  target.appendChild(dom);


  function close() {
    target.removeChild(dom);
  }

  return {
    close: close
  }
}

module.exports={ create:create, close:close }
