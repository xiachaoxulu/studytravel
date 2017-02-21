/**
 * @Created Date       : 2016-10-24T10:11:03+08:00
* @Last Modified time : 2016-12-01T18:13:14+08:00
 */



var mustache = require('../../lib/mustache.min.js');
var head = require('../component/head/head.js');
var tool = require('../tool/Tool.js');
var city = require('../component/city/city.js');
var api = require('../config/api.js');
// var loading = require('../component/loading/loading.js');
// alert(tool);
//头部导航索引 0,1,2,3
head.setActive(0);
head.setNavClickCallBack((index) => {
    if (index != 0) {
        changePage(index);
    }
});

// -----------page1
var currentPageIndex = 0;
var isAnimationRun = false;
var doneAnimationIndexs = [];
var pageslength = 0;

//---------------------page2
//
// var loadingtpl;
var loading = document.querySelector('.loading');
var loadingWrap = document.querySelector('.loading-wrap');
var cors = [5800, 6800, 9800]; //费用
var hrmodules = [{
    className: 'module-left',
    list: [{
        className: 'module org',
        cnName: '组织和员工',
        listp: ['完美解决企业架构问题，重新定义高效企业办公。'],
        clickText: '完美解决企业架构问题，重新定义高效企业办公。'
    }, {
        className: 'module pay',
        cnName: '薪酬管理',
        listp: ['打造全新智能薪酬管理体系，完美解决薪资计算、统计、发放问题。'],
        clickText: '打造全新智能薪酬管理体系，完美解决薪资计算、统计、发放问题。'
    }, {
        className: 'module power',
        cnName: '权限管理',
        listp: ['帮助企业进行精细化分工，权限下发及回收。'],
        clickText: '帮助企业进行精细化分工，权限下发及回收。'
    }, ]
}, {
    className: 'module-right',
    list: [{
        className: 'module time',
        cnName: '时间管理',
        listp: ['灵活有效的提升企业人员工作效率。'],
        clickText: '灵活有效的提升企业人员工作效率。'
    }, {
        className: 'module proval',
        cnName: '审批',
        listp: ['一键完成审批流程，构建成熟人事系统，搭建轻盈管理。'],
        clickText: '一键完成审批流程，构建成熟人事系统，搭建轻盈管理。'
    }, {
        className: 'module move',
        cnName: '移动端',
        listp: ['为企业提供真正便捷、高效的HR移动办公可能。'],
        clickText: '为企业提供真正便捷、高效的HR移动办公可能。'
    }, ]
}]




function regPage() {
    var docclick;
    var cityTriggle = document.querySelector('#expform .choose');
    var cityContainer = document.querySelector('#expform .city');
    var expform2 = document.getElementById('expform2');
    expform2.setAttribute('action', api.basepath + api.api.userinsert);
    tool.listen(cityTriggle, 'click', function(event) {
        cityContainer.style.display = 'block';
        var ev = event || window.event;
        if (ev.stopPropagation) {
            ev.stopPropagation();
        } else if (window.event) { //IE
            window.event.cancelBubble = true; //IE
        }
        docclick = tool.listen(document, 'click', function(){
            cityContainer.style.display = 'none';
            docclick && docclick.remove();
        });
    });
    tool.listen(cityContainer, 'click', function(event){
        var ev = event || window.event;
        if (ev.stopPropagation) {
            ev.stopPropagation();
        } else if (window.event) { //IE
            window.event.cancelBubble = true; //IE
        }
    });
    cityContainer.innerHTML = city.create();
    city.listenControl((obj) => {
        cityTriggle.value = obj;
        cityContainer.style.display = 'none';
        docclick && docclick.remove();
    });


    var pagecontrols = document.querySelectorAll('.page-control > a');
    for (var i = 0; i < pagecontrols.length; i++) {
        (function(idx) {
            tool.listen(pagecontrols[idx], 'click', function() {
                if (currentPageIndex == idx || isAnimationRun) {
                    return;
                } else {
                    for (var j = 0; j < pagecontrols.length; j++) {
                        if (this != pagecontrols[j]) {
                            pagecontrols[j].className = '';
                        }
                    }
                    this.className = 'active';
                    changePage(idx);
                    head.setActive(idx);
                }
            })
        })(i);
    }

    // Array.prototype.slice.call(pagecontrols).forEach((item, index) => {
    //         tool.listen(item, 'click', () => {
    //             if (currentPageIndex == index || isAnimationRun) {
    //                 return;
    //             } else {
    //                 Array.prototype.slice.call(pagecontrols).forEach((item) => {
    //                     item.className = '';
    //                 })
    //                 item.className = 'active';
    //                 changePage(index);
    //                 head.setActive(index);
    //             }
    //         });
    //     })
    //申请体验 调转到首页最末尾
    var applyBtn = document.querySelector('.btn');
    tool.listen(applyBtn, 'click', (event) => {
        changePage(3)
        pagecontrols[3].className = 'active';
        head.setActive(3);
    })

    var pages = document.querySelectorAll('.page');
    for (var i = 0; i < pages.length; i++) {
        pages[i].style.top = i * 100 + '%';
    }
    // Array.prototype.slice.call(pages).forEach((item, index) => {
    //     item.style.top = index * 100 + '%';
    // })
    pageslength = pages.length;

    var page = document.querySelector('.wrap-index');
    tool.listen(page, 'mousewheel', scroll);
    tool.listen(page, 'DOMMouseScroll', scroll);

    // var protocol = document.querySelector('.protocol');
    // tool.listen(protocol, 'click', (event) => {
    //     uploadCharte();
    // })


}





function scroll(e) {
    var value = e.wheelDelta || e.detail;
    if (value > 0) {
        if (currentPageIndex == 0) {
            return;
        }
        changePage(currentPageIndex - 1);
        head.setActive(currentPageIndex);
    } else {
        if (currentPageIndex == pageslength - 1) {
            return;
        }
        changePage(currentPageIndex + 1);
        if (currentPageIndex <= 2) {
            head.setActive(currentPageIndex);
        }

    }
}

function changePage(index) {
    if (isAnimationRun) {
        return;
    }
    currentPageIndex = index;
    isAnimationRun = true;

    var pages = document.querySelectorAll('.page');

    for (var i = 0; i <= pages.length - 1; i++) {
        var targetPer = -(index - i) * 100;
        animation(i, pages[i], targetPer, (index) => {
            doneAnimationIndexs.push(index);
            if (doneAnimationIndexs.length == pages.length) {
                isAnimationRun = false;
                doneAnimationIndexs = [];

                var pagecontrols = document.querySelectorAll('.page-control > a');
                for (var k = 0; k < pagecontrols.length; k++) {
                    pagecontrols[k].className = '';
                    pagecontrols[currentPageIndex].className = 'active';
                }
                // Array.prototype.slice.call(pagecontrols).forEach((item, index) => {
                //     item.className = '';
                //     pagecontrols[currentPageIndex].className = 'active';
                // })
            }
        });
    };
}

function animation(index, target, targetPer, animationDone) {
    var curPer = target.style.top.substring(0, target.style.top.length - 1) - 0;
    var sec = 200; //动画2秒
    var step = (targetPer - curPer) / (sec / 10);
    var interval = setInterval(() => {
        var curPer = target.style.top.substring(0, target.style.top.length - 1) - 0;
        if (curPer == targetPer) {
            animationDone(index);
            clearInterval(interval);
        } else {
            target.style.top = (curPer + step) + '%';
        }
    }, 10)
}


function page2Reg() {
    // var storelist = document.querySelectorAll('.store-list > .store');
    // var current = document.querySelector('.store-wrap .current');
    // var money = document.querySelector('.page2 money');
    // Array.prototype.slice.call(storelist).forEach((item, index) => {
    //     tool.listen(item, 'click', () => {
    //         Array.prototype.slice.call(storelist).forEach((c) => {
    //             c.className = 'store';
    //         })
    //         item.className = 'store active';
    //         current.style.left = item.offsetLeft + 112 + 'px';
    //
    //         var moneynum = cors[index] || 5800;
    //         var text = `${moneynum}`;
    //
    //         money.innerText = tool.xss(text);
    //     })
    // });
    createHrmoudle();

}


function createHrmoudle() {
    var tpl = __inline('hrmodule.tpl');
    mustache.parse(tpl);
    var result = mustache.render(tpl, hrmodules);

    var modulesContainer = document.querySelector('.page2 .modules');
    modulesContainer.innerHTML = result;

    var modules = modulesContainer.querySelectorAll('.module');
    for (var i = 0; i < modules.length; i++) {
        (function(idx) {
            tool.mouseenter(modules[idx], (event) => {
                var innerItem = modules[idx].querySelector('.click-module');
                innerItem.style.display = 'block';
            });
            tool.mouseleave(modules[idx], (event) => {
                var innerItem = modules[idx].querySelector('.click-module');
                innerItem.style.display = 'none';
            });

            tool.listen(modules[idx], 'click', (event) => {
                var index = modules[idx].getAttribute('class').split(' ')[1];
                window.location.href = 'app/page/product/product.html?ID=' + index;
            })
        })(i)
    }
    // Array.prototype.slice.call(modules).forEach((item) => {
    //     tool.mouseenter(item, (event) => {
    //         var innerItem = item.querySelector('.click-module');
    //         innerItem.style.display = 'block';
    //     });
    //
    //     tool.mouseleave(item, (event) => {
    //         var innerItem = item.querySelector('.click-module');
    //         innerItem.style.display = 'none';
    //     });
    //
    //     tool.listen(item, 'click', (event) => {
    //         var index = item.getAttribute('class').split(' ')[1];
    //         window.location.href = 'app/page/product/product.html?ID=' + index;
    //     })
    // });
}

function page3Reg() {
    // var explist = document.querySelectorAll('.exp-list > .exp');
    // var current = document.querySelector('.exp-wrap .current');
    // var expitems = document.querySelectorAll('.exp-item');
    // Array.prototype.slice.call(explist).forEach((item, index) => {
    //     tool.listen(item, 'click', () => {
    //         Array.prototype.slice.call(explist).forEach((c) => {
    //             c.className = 'exp';
    //         })
    //         item.className = 'exp active';
    //         current.style.left = item.offsetLeft + 200 + 'px';
    //
    //         Array.prototype.slice.call(expitems).forEach((c) => {
    //             if (c.getAttribute('data-key') == item.getAttribute('data-key')) {
    //                 c.className = "exp-item active";
    //             } else {
    //                 c.className = "exp-item";
    //             }
    //         });
    //     })
    // });
};

function submit() {
    var submitBtn = document.getElementById('submitBtn');
    var expform = document.getElementById('expform');
    var errorTip = document.getElementById('errorTip');

    var city = document.getElementById('city');
    var companyName = document.getElementById('companyName');
    var companyFormsId = document.getElementById('companyFormsId');
    var storeNum = document.getElementById('storeNum');
    var userName = document.getElementById('userName');
    var passWord = document.getElementById('passWord');
    var telephone = document.getElementById('telephone');
    var contactName = document.getElementById('contactName');
    var selectShow=document.querySelector('.select-show');

    tool.listen(submitBtn, 'click', () => {
        var result = tool.validator(expform);


        if (result.success) {
            var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？%+_]");
            if(result.content[2].value>9999){
              errorTip.innerHTML = "门店数量最多为9999家！";
            }else if(result.content[1].value.length>60 || pattern.test(result.content[1].value)){
              errorTip.innerHTML = "公司名称最长限度为60字符，且不能输入特殊字符！";
            }else if(result.content[4].value.length>40  || pattern.test(result.content[4].value)){
              errorTip.innerHTML = "联系人最长限度为40字符，且不能输入特殊字符！";
            }else{
              uploadCharte();
              city.value = result.content[0].value;
              companyName.value = result.content[1].value;
              // companyFormsId.value = result.content[2].value;
              storeNum.value = result.content[2].value;
              // userName.value = result.content[4].value;
              // passWord.value = result.content[5].value;
              telephone.value = result.content[3].value;
              contactName.value = result.content[4].value;
              companyFormsId.value=selectShow.getAttribute('data-index');
              errorTip.innerHTML = "&nbsp;";
            }
        } else {
            errorTip.innerHTML = result.errorMsg;
        }
    });

};


function uploadCharteBtn() {

    var uploadCharteBtn = document.getElementById('uploadCharteBtn');
    var uploadDone = document.getElementById('uploadDone');
    var showTpl = document.querySelector('.showTpl');
    var charter = document.querySelector('.charter');
    var success = document.querySelector('.success');
    var closeSuccess = document.querySelector('.closeSuccess');
    var expform2 = document.getElementById('expform2');
    var businessLicense = document.getElementById('businessLicense');

    tool.listen(uploadCharteBtn, 'click', (event) => {
        var iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.name = 'upload';
        document.body.appendChild(iframe);
        iframe.onload = uploadSuccess;
        if (businessLicense.value) {
            expform2.submit();
            loading.style.display = 'block';
            loadingWrap.style.display = 'block';
        } else {
            alert('请选择上传的图片！')
        }

    })
    tool.listen(uploadDone, 'click', (event) => {
        showTpl.style.display = 'none';
        success.style.display = 'none';
        loading.style.display = 'none';
        loadingWrap.style.display = 'none';
    });
    tool.listen(closeSuccess, 'click', (event) => {
        showTpl.style.display = 'none';
        success.style.display = 'none';
        loading.style.display = 'none';
        loadingWrap.style.display = 'none';
    });

}

function checkForm() {

    var wrapIndex = document.querySelector('.wrap-index');
    // loading.create(wrapIndex)
}


function uploadCharte(_params) {
    var submitBtn = document.getElementById('submitBtn');
    var businessLicense = document.getElementById('businessLicense');
    var imgshow = document.getElementById('imgshow');
    var showTpl = document.querySelector('.showTpl');
    var charter = document.querySelector('.charter');
    var closeCharter = document.querySelector('.closeCharter');
    var charteClaim = document.querySelector('.charte-claim');
    var success = document.querySelector('.success');

    charter.style.display = 'block';
    showTpl.style.display = 'block';
    tool.listen(businessLicense, 'change', (event) => {
        var browser = navigator.appName
        var b_version = navigator.appVersion
        var version = b_version.split(";");
        var trim_Version = version[1].replace(/[ ]/g, "");
        if ((browser == "Microsoft Internet Explorer" && trim_Version == "MSIE8.0") || trim_Version == "MSIE9.0") {
            charteClaim.innerHTML = '您的浏览器版本过低不能预览图片！'
        } else {
            if (businessLicense.files && businessLicense.files[0]) {
                if (businessLicense.files[0].size / 1024 > 50) {
                    alert('图片大小限制为50KB！')
                        // var dialog = require('../component/dialog/dialog.js');
                        // var dd = dialog.create({
                        //     title: '提示',
                        //     content: '图片大小限制为50KB！',
                        //     height: 350,
                        //     showfooter: false
                        // });
                } else {
                    var url = URL.createObjectURL(businessLicense.files[0]);
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        if (e) imgshow.setAttribute('src', e.target.result);
                    }
                    reader.readAsDataURL(businessLicense.files[0]);
                    charteClaim.style.display = 'none'
                }

            }
        }
        //
        //   var browser = navigator.appName
        //   var b_version = navigator.appVersion
        //   var version = b_version.split(";");
        //   var trim_Version = version[1].replace(/[ ]/g, "");
        //   var imgSrc = businessLicense.files;
        //   if (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE8.0") {
        //       // var fileobject = new ActiveXObject("Scripting.FileSystemObject"); //获取上传文件的对象
        //       // var file = fileobject.GetFile(document.getElementById("businessLicense").value); //获取上传的文件
        //       // console.log(file)
        //         // var div=document.createElement("div");
        //         // imgDiv.appendChild(div);
        //         // console.log(businessLicense.value)
        //         // div.style.width="380px";imgshow.style.height="140px";
        //         // div.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
        //         // div.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = businessLicense.value;
        //         var imgDiv=document.createElement("div");
        //         var x=businessLicense.value;
        //         document.body.appendChild(imgDiv);
        //         imgDiv.style.width="118px";imgDiv.style.height="127px";
        //         imgDiv.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
        //         imgDiv.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src=x;
        //     } else {
        //         if (businessLicense.files && businessLicense.files[0]) {
        //             if (businessLicense.files[0].size / 1024 > 50) {
        //                 var dialog = require('../component/dialog/dialog.js');
        //                 var dd = dialog.create({
        //                     title: '提示',
        //                     content: '图片大小限制为50KB！',
        //                     height: 350,
        //                     showfooter: false
        //                 });
        //             } else {
        //                 var url = URL.createObjectURL(businessLicense.files[0]);
        //                 var reader = new FileReader();
        //                 reader.onload = function(e) {
        //                     if (e) imgshow.setAttribute('src', e.target.result);
        //                 }
        //                 reader.readAsDataURL(businessLicense.files[0]);
        //                 charteClaim.style.display = 'none'
        //             }
        //
        //         }
        //     }
        //
        //
    });


    tool.listen(closeCharter, 'click', (event) => {
        charter.style.display = 'none';
        showTpl.style.display = 'none';
        loading.style.display = 'none';
        loadingWrap.style.display = 'none';
        // loadingtpl.close();
    })
};

function loadCompany() {
    // var companyFormsId = document.getElementById('companyFormsId2');
    var ul=document.querySelector('.select-list');
    tool.ajax({
            url: 'selectcompanyforms',
            data: '',
        }, function(result) {
            for (var i = 0; i < result.length; i++) {
                var li=document.createElement('li');
                li.innerHTML=result[i].formsName;
                li.setAttribute('data-index',result[i].id);
                ul.appendChild(li);
                // companyFormsId[i] = new Option(result[i].formsName, result[i].id);
            }
            showSelect();
        },
        function(res) {

        })
}

function checkUsername() {
    var userName = document.getElementById('userName2');
    var errorTip = document.getElementById('errorTip');
    userName.onblur = function(event) {
        var params = {
            userName: event.target.value
        };
        tool.ajax({
            url: 'validateusername',
            data: params
        }, function(result) {
            errorTip.innerHTML = "&nbsp;";
        }, function(error) {
            errorTip.innerHTML = "用户名重复";
        })

    }
}

function uploadSuccess(e) {
    // loadingtpl = loading.create(charter);
    console.log(1)
    var iframe = document.getElementsByTagName('iframe')[0];
    var charter = document.querySelector('.charter');
    var success = document.querySelector('.success');
    var timer = setTimeout(function() {
        if (!iframe.contentDocument.body.innerHTML) {

        } else {
            var checkState = JSON.parse(iframe.contentDocument.body.innerHTML).success;
            if (checkState != 'false') {
                // loadingtpl.close();
                charter.style.display = 'none';
                success.style.display = 'block';
                loading.style.display = 'none';
                loadingWrap.style.display = 'none';

            } else {
                // loadingtpl.close();
                loading.style.display = 'none';
                loadingWrap.style.display = 'none';
                alert('请上传PNG JPG JEPG格式的图片!')
                    // var dialog = require('../component/dialog/dialog.js');
                    // var dd = dialog.create({
                    //     title: '提示',
                    //     content: '请上传PNG格式的图片',
                    //     height: 350,
                    //     showfooter: false
                    // });
            }
        }
        document.body.removeChild(iframe);
    }, 1000)





}
function showSelect(){
  var docclick;
  var p=document.querySelector('.select-show');
  var ul=document.querySelector('.select-list');
  var lis=document.querySelectorAll('.select-list li');
  tool.listen(p,'click',function(event){
    ul.style.display='block';
    var ev = event || window.event;
    if (ev.stopPropagation) {
        ev.stopPropagation();
    } else if (window.event) { //IE
        window.event.cancelBubble = true; //IE
    }
    docclick = tool.listen(document, 'click', function(){
        ul.style.display = 'none';
        docclick && docclick.remove();
    });
  })
  for(var i=0;i<lis.length;i++){
    tool.listen(lis[i],'click',function(){
      p.innerHTML=this.innerHTML;
      p.setAttribute('data-index',this.getAttribute('data-index'))
      ul.style.display='none';

    })
  }

}
function targetPage() {
    var ID = window.location.search.substr(1).split('=')[1];
    if (ID) changePage(ID);
}
//page1
regPage();
//page2
page2Reg();
//page3
page3Reg();

submit();

uploadCharteBtn();
// 加载公司业态
loadCompany();
//验证用户名唯一性
// checkUsername();

targetPage();
