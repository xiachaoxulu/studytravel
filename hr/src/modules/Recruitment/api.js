/**
* @Created Date       : 2016-08-28T15:36:04+08:00
* @Last Modified time : 2016-11-15T18:36:28+08:00
*/



export default {
    /*
      * 查询系统角色树 【苏新】
      *   << 响应 {}
         result:[{
         companyID:公司ID,
         roleName:角色名称
         parentID:,
         type:类型，角色，角色组
    */
    selectSystemTree: 'acewill/role/selectMyRole.htm',

    /*
      * 查询品牌区域树  【苏新】
    ]
    */
    getBrandAreaStoreTree: 'acewill/OrgEmployee/findBrankArea.htm',

    /*
      * 查询部门树  【苏新】
      << 响应 {}
      result:[
      companyName,
      departList:[],
      storeList:[],
      teamList:[]
    */
    getCompanyDeptStoreTree: 'acewill/OrgEmployee/findDeptTree.htm',

    /*
      * 查询所有人员列表
    */
    getAllEmployee: 'acewill/employee/selectEmployeeAllPage.htm', //查询所有人员列表

    /*
      * 查询岗位列表
      * << 响应 {}
      * result:[{
        
    }]
    */
    listPost: 'acewill/pcrecruit/listPost.htm', //查询岗位列表    ?pageNum=0&pageSize=1

    /*
      * 发布岗位撤回列表
      * >>提交
      * postsid：岗位ID；
      * personnum：招聘人数；
      * type：1发布2撤回
    */
    updateStat: 'acewill/pcrecruit/updateStat.htm', //发布撤回岗位列表    ?pageNum=0&pageSize=1  postListJSON:[{postsid:3,personnum:2,type:1}]1发布2撤回

    /*
      * 删除简历
      * >>提交
      * ids：
    */
    removeRecurit: 'acewill/pcrecruit/removeRecurit.htm?', //删除简历  ids=2

    /*
      * 查询简历列表
    */
    listRecurit: 'acewill/pcrecruit/listRecurit.htm', //查询简历库列表    ?pageNum=0&pageSize=1

    /*
      * 查询个人简历信息
      * >>提交
      * id：人员ID；
    */
    perbyid: 'acewill/pcrecruit/perbyid.htm', //查询简历个人信息  id=3

    /*
      * 岗位导出；
    */
    exportPost: 'acewill/pcrecruit/exportPost.htm', // 岗位导出

    /*
      * 简历导出；
    */
    exportRecurit: 'acewill/pcrecruit/exportRecurit.htm' //简历导出
};
