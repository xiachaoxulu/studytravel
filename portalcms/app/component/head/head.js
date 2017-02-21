/**
 * @Created Date       : 2016-10-24T10:11:02+08:00
* @Last Modified time : 2016-11-30T11:49:25+08:00
 */



var tool = require('../../tool/Tool.js')
var mustache = require('../../../lib/mustache.min.js')


var funcallback;
var regBtncallback;


function init() {

    var logintpl = __inline('loginstate.tpl');
    mustache.parse(logintpl);
    var state = tool.getLoginState();
    var result = mustache.render(logintpl, state);
    var logincontainer = document.querySelector('.header .login');
    logincontainer.innerHTML = result;

    if (state.islogin) {
        inlogin();
    } else {
        unlogin();
    }

}

function inlogin() {
    var photo = document.querySelector('.header .photo');
    var inlogin = document.querySelector('.header .inlogin');
    var itemcontainer = document.querySelector('.header .item-container');
    var items = document.querySelectorAll('.header .item');
    tool.listen(photo, 'mouseover', () => {
        itemcontainer.style.display = 'block';
    });
    tool.mouseleave(inlogin, () => {
        itemcontainer.style.display = 'none';
    });

    Array.prototype.slice.call(items).forEach((item) => {
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

        var logindialog = require('../logindialog/logindialog.');

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
    for (var k = 0; k < nav.length; k++) {
        (function(idx) {
            tool.listen(nav[idx], 'click', function() {
                for (var i = 0; i < nav[idx].parentNode.childNodes.length; i++) {
                    if(nav[idx].parentNode.childNodes[i].nodeName.toLowerCase()!='li'){
                      continue;
                    }
                    if (nav[idx].parentNode.childNodes[i] == nav[idx]) {
                        nav[idx].parentNode.childNodes[i].className = 'active';
                        console.log(1)
                    } else {
                        nav[idx].parentNode.childNodes[i].className = ' ';
                        console.log(2)
                    }
                }
                funcallback && funcallback(idx);
            })
            tool.listen(nav[idx], 'mouseover', function() {
                if (nav[idx].className !== 'active') {
                    nav[idx].className = 'hover';
                }
            });
            tool.listen(nav[idx], 'mouseout', function() {
                if (nav[idx].className !== 'active') {
                    nav[idx].className = '';
                }
            });
        })(k)
    }
    // Array.prototype.slice.call(nav).forEach((item, index) => {
    //     tool.listen(item, 'click', () => {
    //         for (var i = 0; i < item.parentNode.childNodes.length; i++) {
    //             if (i % 2 != 1) continue;
    //             if (item.parentNode.childNodes[i] == item) {
    //                 item.parentNode.childNodes[i].className = 'active';
    //             } else {
    //                 item.parentNode.childNodes[i].className = ' ';
    //             }
    //         }
    //
    //         funcallback && funcallback(index);
    //     });
    //     tool.listen(item, 'mouseover', () => {
    //         if (item.className !== 'active') {
    //             item.className = 'hover';
    //         }
    //     });
    //     tool.listen(item, 'mouseout', () => {
    //         if (item.className !== 'active') {
    //             item.className = '';
    //         }
    //     });
    // })
}



function setActive(index) {
    var nav = document.querySelectorAll('.main-nav > ul li');
    for (var i = 0; i < nav.length; i++) {
        nav[i].className = "";
        if (i == index) {
            console.log('active')
            nav[i].className = 'active';
        }
    }
    // Array.prototype.slice.call(nav).forEach((item, index2) => {
    //     item.className = "";
    //     if (index2 == index) {
    //         console.log('active')
    //         item.className = 'active';
    //     }
    // })
}


function setNavClickCallBack(callback) {
    funcallback = callback;
}

function setRegBtnCallBack(callback) {
    regBtncallback = callback;
}

init();
changeActive();

module.exports = {
    setActive: setActive,
    setNavClickCallBack: setNavClickCallBack,
    setRegBtnCallBack: setRegBtnCallBack
};
