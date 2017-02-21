/**
* @Created Date       : 2016-10-24T10:11:03+08:00
* @Last Modified time : 2016-11-29T18:30:27+08:00
*/



var api = {
  login:'acewill/user/loginUser.htm',
  selectcompanyforms:'merchant/user/selectcompanyforms.htm',//公司业态获取
  userinsert:'merchant/user/userinsert.htm',//用户体验
  validateusername:'merchant/user/validateusername.htm',//用户唯一性验证
  uploadfile:'merchant/user/uploadfile.htm',//上传营业执照

};
var basepath = '/';

module.exports={
  api: api,
  basepath: basepath
};
