/**
* @Created Date       : 2016-11-11T15:54:04+08:00
* @Last Modified time : 2016-11-29T14:09:02+08:00
*/



var tool = require( '../../tool/Tool.js')
var mustache = require( '../../../lib/mustache.min.js')


var funcallback;
var regBtncallback;


function init() {

  var logintpl = __inline('loginstate.tpl');
  mustache.parse(logintpl);
  var state = tool.getLoginState();
  var result = mustache.render(logintpl, state);
  var logincontainer = document.querySelector('.header2 .login');
  logincontainer.innerHTML = result;

  if (state.islogin) {
    inlogin();
  } else {
    unlogin();
  }

}

function inlogin() {
  var photo = document.querySelector('.header2 .photo');
  var inlogin = document.querySelector('.header2 .inlogin');
  var itemcontainer = document.querySelector('.header2 .item-container');
  var items = document.querySelectorAll('.header2 .item');
  tool.listen(photo, 'mouseover', () => {
    itemcontainer.style.display = 'block';
  });
  tool.mouseleave(inlogin, () => {
    itemcontainer.style.display = 'none';
  });

  [].slice.call(items).forEach((item) => {
    tool.listen(item, 'click', () => {
      var key = item.getAttribute('data-key');
      if (key) {
        switch (key) {
          case 'exit':
            exit();
            break;
        }
      }
    });
  });
}

function unlogin() {
  var login = document.getElementById('loginBtn');
  tool.listen(login, 'click', () => {

    var logindialog = require('../logindialog/logindialog');

    logindialog.create((arg) => {
      init();
    });

  });

  var regBtn = document.getElementById('regBtn');
  tool.listen(regBtn, 'click', () => {
    window.location.href = '/app/page/register/register.html';
    regBtncallback && regBtncallback();
  });
}

//------------登录后处理函数
function exit() {
  tool.clearCookie('islogin');
  init();
}




//-----------------------
function changeActive() {
  var nav = document.querySelectorAll('.main-nav > ul li');
  [].slice.call(nav).forEach((item, index) => {
    tool.listen(item, 'click', () => {
      funcallback && funcallback(index);
    });
    tool.listen(item, 'mouseover', () => {
      if (item.className !== 'active') {
        item.className = 'hover';
      }
    });
    tool.listen(item, 'mouseout', () => {
      if (item.className !== 'active') {
        item.className = '';
      }
    });
  })
}



function setActive(index) {
  var nav = document.querySelectorAll('.main-nav > ul li');
  [].slice.call(nav).forEach((item, index2) => {
    item.className = "";
    if (index2 == index) {
      item.className = 'active';
    }
  })
}


function setNavClickCallBack(callback) {
  funcallback = callback;
}

function setRegBtnCallBack(callback) {
  regBtncallback = callback;
}

init();
changeActive();


module.exports={
  setActive: setActive,
  setNavClickCallBack: setNavClickCallBack,
  setRegBtnCallBack: setRegBtnCallBack
};
