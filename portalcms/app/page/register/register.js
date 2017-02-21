/**
* @Created Date       : 2016-11-11T15:54:05+08:00
* @Last Modified time : 2016-11-29T14:08:03+08:00
*/



var head = require( '../../component/head2/head2')
var city = require( '../../component/city/city')
var tool = require( '../../tool/tool')


function regPage() {

  var docclick;
  var cityTriggle = document.querySelector('#expform .choose');
  var cityContainer = document.querySelector('#expform .city');
  tool.listen(cityTriggle, 'click', (event) => {
    cityContainer.style.display = 'block';
    event.stopPropagation();
    docclick = tool.listen(document, 'click', () => {
      cityContainer.style.display = 'none';
      docclick && docclick.remove();
    });
  });
  tool.listen(cityContainer, 'click', (event) => {
    event.stopPropagation();
  });
  cityContainer.innerHTML = city.create();
  city.listenControl((obj) => {
    cityTriggle.value = obj;
    cityContainer.style.display = 'none';
    docclick && docclick.remove();
  });
}

function submit() {
  var submitBtn = document.getElementById('submitBtn');
  var expform = document.getElementById('expform');
  var errorTip = document.getElementById('errorTip');
  tool.listen(submitBtn, 'click', () => {
    var result = tool.validator(expform);
    if (result.success) {
      console.log(result.content);
      errorTip.innerHTML = "&nbsp;";
    } else {
      errorTip.innerHTML = result.errorMsg;
    }
  });
}


regPage();
submit();
