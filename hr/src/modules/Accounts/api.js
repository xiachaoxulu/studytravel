/**
* @Created Date       : 2016-08-28T15:36:04+08:00
* @Last Modified time : 2016-11-25T11:19:06+08:00
*/



export default {
    login: 'login/login.htm',//?name=suxin&pass=123456
    logOut: 'login/zhuxiao.htm',
    updatePassword: 'acewill/operator/updatePassword.htm',
    //查询所有菜单
    selectMyMenu:'acewill/roleAuthority/selectMyMenu.htm',

    insertUserMenu: 'acewill/roleAuthority/insertUserMenu.htm',// userMenuJSON:{[menuID:1,orderNum:1],[menuID:2,orderNum:2]}
    deleteRoleMenuByID: 'acewill/roleAuthority/deleteRoleMenuByID.htm',//   ID
    selectSysmenu: 'acewill/roleAuthority/selectSysmenu.htm',//   userID

    /*
      查询登录人头像 【苏新】
      <<响应
    */
    selectEmployeeByLoginName:'acewill/OrgEmployee/selectEmployeeByLoginName.htm',
    resetPassword:'acewill/operator/resetPassword.htm',//loginName == 工号
};
