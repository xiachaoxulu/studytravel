/**
 * @Created Date       : 2016-11-11T15:54:05+08:00
* @Last Modified time : 2016-12-01T14:49:07+08:00
 */
var tool = require('../../tool/Tool.js');
var navs = document.querySelectorAll('.nav-bar ul li');
var pages = document.querySelectorAll('.page');
var imgs1 = {
    "组织与员工": '../../../resource/image/icon1.png',
    "时间管理": '../../../resource/image/icon5.png',
    "薪酬管理": '../../../resource/image/icon4.png',
    "审批": '../../../resource/image/icon3.png',
    "权限管理": '../../../resource/image/icon2.png',
    "移动端": '../../../resource/image/icon6.png'
};
var imgs2 = [
    '../../../resource/image/icon11.png',
    '../../../resource/image/icon55.png',
    '../../../resource/image/icon44.png',
    '../../../resource/image/icon33.png',
    '../../../resource/image/icon22.png',
    '../../../resource/image/icon66.png'
];

function toggleProduct() {
    for (var i = 0; i < navs.length; i++) {
        (function(idx) {
            tool.listen(navs[idx], 'click', function() {
                for (var m = 0; m < navs[idx].parentNode.childNodes.length; m++) {
                    if (navs[idx].parentNode.childNodes[m].nodeName.toLowerCase() != 'li') {
                        continue;
                    }
                    if (navs[idx].parentNode.childNodes[m] == navs[idx]) {
                        pages[idx].style.display='block';
                        navs[idx].parentNode.childNodes[m].childNodes[0].className = 'hover';
                        navs[idx].parentNode.childNodes[m].childNodes[0].childNodes[0].childNodes[0].src = imgs2[idx];
                    } else {
                        var index = navs[idx].parentNode.childNodes[m].childNodes[0].childNodes[1].innerHTML;
                        navs[idx].parentNode.childNodes[m].childNodes[0].className = ' ';
                        pages[idx].parentNode.childNodes[m].style.display='none';
                        navs[idx].parentNode.childNodes[m].childNodes[0].childNodes[0].childNodes[0].src = imgs1[index];
                    }

                }
            })
        })(i)
    }
}


function targetPage() {
  var ID = window.location.search.substr(1).split('=')[1];
  var IDs = {
      org: 0,
      power: 4,
      proval: 3,
      pay: 2,
      time: 1,
      move: 5,
  };
  for (var i = 0; i < navs.length; i++) {
      (function(idx) {
          idx=IDs[ID];
          for (var m = 0; m < navs[idx].parentNode.childNodes.length; m++) {
              if (navs[idx].parentNode.childNodes[m].nodeName.toLowerCase() != 'li') {
                  continue;
              }
              if (navs[idx].parentNode.childNodes[m] == navs[idx]) {
                  pages[idx].style.display='block';
                  navs[idx].parentNode.childNodes[m].childNodes[0].className = 'hover';
                  navs[idx].parentNode.childNodes[m].childNodes[0].childNodes[0].childNodes[0].src = imgs2[idx];
              } else {
                  var index = navs[idx].parentNode.childNodes[m].childNodes[0].childNodes[1].innerHTML;
                  navs[idx].parentNode.childNodes[m].childNodes[0].className = ' ';
                  pages[idx].parentNode.childNodes[m].style.display='none';
                  navs[idx].parentNode.childNodes[m].childNodes[0].childNodes[0].childNodes[0].src = imgs1[index];
              }

          }
      })(i)
  }
}

targetPage();
toggleProduct();
