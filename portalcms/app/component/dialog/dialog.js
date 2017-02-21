/**
* @Created Date       : 2016-11-11T15:54:05+08:00
* @Last Modified time : 2016-11-29T11:12:00+08:00
*/



var  mustache = require('../../../lib/mustache.min.js')
var tool =require('../../tool/Tool.js')

var tpl = __inline('dialog.tpl');

/**
 * 创建弹出层, callback ,0 ,1,2 0表示点击关闭按钮，1 ，确定按钮，2 取消按钮
 * [create description]
 * @return {[type]} [description]
 */
function create(option, callback) {

  var obj = {};
  obj.title = option.title || '提示';
  obj.content = option.content || '请输入提示内容';
  obj.close = option.close || true;
  obj.width = option.width || 500;
  obj.height = option.height || 300;
  obj.showfooter = option.showfooter == undefined ? true : option.showfooter;

  mustache.parse(tpl);
  var result = mustache.render(tpl, obj);
  var div = document.createElement('div');
  var id = 'dialog' + Math.floor(Math.random() * 10000 + 1);
  div.setAttribute('id', id);
  div.innerHTML = result;
  document.body.appendChild(div);

  var target = document.querySelector('#' + id + ' .container');
  var title = document.querySelector('#' + id + ' .dialog-container .title');
  var close = document.querySelector('#' + id + ' .dialog-container .close');
  var okbtn = document.querySelector('#' + id + ' .dialog-container .btn0');
  var cancelbtn = document.querySelector('#' + id + ' .dialog-container .btn1');


  //设置自定义宽高
  if (obj.width != 500) {
    target.style.width = obj.width + 'px';
  }
  if (obj.height != 300) {
    target.style.height = obj.height + 'px';
  }
  //绑定拖动事件
  var dragEvent = drag(title, target);

  //绑定按钮事件
  if (close) {
    tool.listen(close, 'click', (item) => {
      callback && callback(0)
      dispose();
    });
  }
  if (okbtn) {
    tool.listen(okbtn, 'click', (item) => {

      callback && callback(1)
      dispose();
    });
  }
  if (cancelbtn) {
    tool.listen(cancelbtn, 'click', (item) => {
      callback && callback(2)
      dispose();
    });
  }

  function dispose() {
    document.body.removeChild(div);
    dragEvent.docmove && dragEvent.docmove.remove();
    dragEvent.docmup && dragEvent.docmup.remove();
  }

  return {
    close: dispose,
    dom: target
  }
}




function drag(trigger, target) {

  //是否开始拖动
  let startFlag = false;

  let firstX = 0;
  let firstY = 0;

  let translateX = 0;
  let translateY = 0;

  let domWidth = target.clientWidth;
  let domHeight = target.clientHeight;

  let docmove, docmup;
  tool.listen(trigger, 'mousedown', (item) => {
    //按下左键
    if (item.button == 0) {
      startFlag = true;
      firstX = item.x;
      firstY = item.y;
      docmove = tool.listen(document, 'mousemove', (item) => {
        move(item.x, item.y);
      })
      docmup = tool.listen(document, 'mouseup', (item) => {
        startFlag = false;
        docmove.remove();
        docmup.remove();

        docmove = null;
        docmup = null;
      })

    }
  });

  function move(x, y) {
    if (startFlag) {

      translateX += x - firstX;
      translateY += y - firstY;

      firstX = x;
      firstY = y;

      if (target.offsetLeft - Math.abs(translateX) >= 0) {
        target.style.transform = 'translate(' + translateX + 'px,' + translateY + 'px)';
      } else {
        if (translateX < 0) {
          translateX = -target.offsetLeft;
        } else {
          translateX = target.offsetLeft;
        }
      }

      if (target.offsetTop - Math.abs(translateY) >= 0) {
        target.style.transform = 'translate(' + translateX + 'px,' + translateY + 'px)';
      } else {
        if (translateY < 0) {
          translateY = -target.offsetTop;
        } else {
          translateY = target.offsetTop;
        }
      }

    }
  }

  return {
    docmove: docmove,
    docmup: docmup
  }
}



module.exports={ create:create }
