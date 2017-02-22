/**
 * @Created Date       : 2016-09-08T11:20:39+08:00
 * @Last Modified time : 2016-11-15T18:30:45+08:00
 */



export default {
    /*
     查询系统角色树  【苏新】
     */
    selectSystemTree: 'acewill/role/selectMyRole.htm',

    /*
     添加角色角色组   【苏新】
     >> 提交 {}
     roleName:角色名称
     parentID:ID
     type:类型；角色，角色组
     des:备注
     << 响应 {}
     result:[{
     companyID:公司ID,
     roleName:角色名称
     parentID:,
     type:类型，角色，角色组
     }]

     */
    insertSystemTree: 'acewill/role/insert.htm',

    /*
     修改角色角色组    【苏新】
     << 响应 {}
     roleName:角色名称
     parentID:ID
     type:类型；角色，角色组
     des:备注
     */
    updateSystemTree: 'acewill/role/update.htm',

    /*
     删除角色角色组    【苏新】
     ID
     */
    deleteSystemTree: 'acewill/role/delete.htm',

    /*
     查询菜单    【苏新】
     << 响应{}
     result:[{
     ID,
     menuName,
     parentID,
     }]
     */
    selectMyMenu: 'acewill/roleAuthority/selectMyMenu.htm',


    /*
     查询当前角色含有的菜单    【苏新】
     >>提交
     roleID：角色ID；
     << 响应{}
     result:[{
     imagUrl:图标,
     menuName,
     moduleID,
     parentID,
     url:菜单路径
     }]
     */
    selectRoleMenuByRoleID: 'acewill/roleAuthority/selectRoleMenuByRoleID.htm',


    /*
     添加角色菜单    【苏新】
     roleID：角色ID；
     */
    insertRoleMenuList: 'acewill/roleAuthority/insertRoleMenuList.htm', //?roleID=1

    /*
     查询按钮    【苏新】
     << 响应{}
     result:[{
     btnPageList:[{
     moduleID,
     pageName:菜单名
     }],
     buttonList:[{
     btnCode:按钮编码,
     btnName:按钮名称
     pageID:菜单ID
     }],
     }]
     */
    selectMyButton: 'acewill/roleAuthority/selectMyButton.htm',

    /*
     查询当前角色含有按钮权限    【苏新】
     >> 提交
     roleID：角色ID；
     << 响应{}
     result:[{
     btnCode:按钮编码,
     btnID:按钮ID,
     btnName:按钮名称,
     roleBtnID:角色按钮ID
     roleID:角色ID
     }]
     */
    selectButton: 'acewill/roleAuthority/selectButtonByRoleID.htm', // 参数roleID

    /*
     添加角色按钮    【苏新】
     >> 提交
     roleID：角色ID；
     btnID:  按钮ID；
     */
    insertRolePageBtn: 'acewill/roleAuthority/insertRolePageBtn.htm',

    /*
     查询卡片权限    【苏新】
     */
    selectMyCard: 'acewill/roleAuthority/selectMyCard.htm',

    /*
     添加卡片权限    【苏新】
     >>提交
     roleID：角色ID；
     cardID:卡片ID；
     */
    insertRoleCardList: 'acewill/roleAuthority/insertRoleCardList.htm',

    /*
     查询当前角色含有卡片权限    【苏新】
     >> 提交
     roleID：角色ID
     */
    selectCardByRoleID: 'acewill/roleAuthority/selectCardByRoleID.htm',

    /*
     查询工资套权限     【苏新】
     */
    selectMyPaySuite: 'acewill/roleAuthority/selectMyPayitems.htm',

    /*
     添加工资套权限     【苏新】
     >> 提交
     roleID:角色ID；
     PaySuiteID:工资套ID；
     */
    insertRolePaySuiteList: 'acewill/roleAuthority/insertRolePayitemsList.htm',

    /*
     查询当前角色所拥有的工资套权限；
     >> 提交
     roleID:角色ID；
     */
    selectPaySuiteByRoleID: 'acewill/roleAuthority/selectPayitemsByRoleID.htm', // roleID

    /*
     查询角色人员    【苏新】
     >>提交
     roleID:角色ID
     << 响应{}
     result:[{
     ID,
     companyID,
     deptName:部门名称,
     loginName:登录人,
     roleID:,
     userID,
     userName,
     userNum,
     userRoleID,
     }]
     */
    selectUserRole: 'acewill/roleAuthority/selectUserRole.htm', //?roleID=1

    /*
     查询角色，角色组   【苏新】
     >> 提交
     roleID:角色ID
     <<响应 {}
     result:[{
     ID,
     companyID,
     operatorID,
     parentID,
     roleName,
     type,
     }]
     */
    selectRole: 'acewill/role/select.htm',

    /*
     添加角色人员  【苏新】
     roleID:角色ID；
     备注；删除添加走一个接口，后台先清空后添加；
     */
    addRolePerson: 'acewill/role/delete.htm',

    /*
     角色人员受理权限到期时间  【苏新】
     roleID：角色ID；
     operatorID：组织ID；
     startTime：开始时间；
     endTime：结束时间；
     */
    inserUserRole: 'acewill/roleAuthority/inserUserRole.htm',

    /*
     修改角色人员受理权限到期时间  【苏新】
     roleID：角色ID；
     operatorID：组织ID；
     startTime：开始时间；
     endTime：结束时间；
     */
    updateUserRole: 'acewill/roleAuthority/updateUserRole.htm', //修改角色人员时间 ID/userRoleID startTime entTime

    /*
     删除角色人员授权  【苏新】
     userRoleID：角色人员ID；
     */
    deleteUserRole: 'acewill/roleAuthority/deleteUserRole.htm', //ID/userRoleID

    /*
     通过部门、门店、姓名查询在职员工接口  【苏新】
     >> 提交
     deptID：部门ID;
     storeID：门店ID；
     roleID：角色ID；
     << 响应 {}
     个人所有信息
     */
    selectEmployeeForAut: 'acewill/employee/selectEmployeeForAut.htm', //?deptID=95 storeID=1  userName=1 roleID

    /*
     权限内部门树  【苏新】
     << 响应
     *result:[{
     ID:1,
     companyID:1,
     createTime:1462431874000,
     departmentName:"正君餐饮",
     des:"木屋人事",
     organizeID:362,
     organizeType:"dept",
     parentID:-1,
     valid:1
     }]
     */
    selectDepartment: 'acewill/department/select.htm',

    /*
     权限内门店信息  【苏新】
     << 响应
     result:[{
     ID:1,
     acreage:面积
     address:地址
     areaID:区域ID
     brandID:品牌ID
     businessEndTime:商户结束时间
     businessStartTime:商户开始时间
     cbdID:商圈ID
     city:城市
     companyID:公司ID
     companyName:公司名称
     createTime:创建时间
     deptID:部门ID
     leadingID:负责人ID
     manageType:管理类型
     organizeID:组织ID
     organizeType:组织类型
     province:省份
     storeCode:门店编码
     storeName:门店名称
     storeType:门店类型
     valid:有效期
     }]
     */
    selectStore: 'acewill/store/selectStore.htm',

    /*
     查询小组
     << 响应
     result:[{
     ID:
     companyID:公司ID
     companyName:公司名称
     createTime:创建时间
     deptID:部门ID
     deptName:部门名称
     organizeID:组织ID
     storeID:门店ID
     storeName:门店名称
     teamName:小组名称
     valid:有效期
     }]
     */
    selectMyTeam: 'acewill/storeTeam/selectMyTeam.htm',

    /*
     查询用工类型  【苏新】
     >>提交
     << 响应 {}
     result:[{
     ID,
     code,
     codeName,
     difintionID,
     orderNum,
     }]
     defintionCode：code
     */
    selectByDifintionCode: 'acewill/roleAuthority/selectMyRoleState.htm', //?defintionCode=100000

    /*
     人员权限  组织架构树 勾选  【苏新】
     roleOrganizeJSON：Array；
     roleID：角色ID；
     organizeID：组织ID；
     organizeType：组织类型；
     */
    insertRoleOrganize: 'acewill/roleAuthority/insertRoleOrganize.htm', //roleOrganizeJSON：   roleID organizeID  organizeType

    /*
     查询当前角色以有组织  【苏新】
     >> 提交
     roleID:角色ID；
     << 响应{}
     result:[
     deptIDList:[],
     storeIDList:[],
     teamIDList:[],
     ]
     */
    selectRoleOrganize: 'acewill/roleAuthority/selectRoleOrganize.htm', //?roleID=15

    /*
     人员权限  用工类型 勾选
     roleStateJSON：Array；
     roleID：角色ID；
     stateCode：状态；
     */
    insertRoleState: 'acewill/roleAuthority/insertRoleState.htm', //roleStateJSON : roleID stateCode

    /*
     查询当前角色拥有的用工类型
     roleID：角色ID；
     */
    selectRoleState: 'acewill/roleAuthority/selectRoleState.htm', //?roleID=15

    /*
     分级授权
     roleID：角色ID；
     */
    selectRoleRole: 'acewill/roleAuthority/selectRoleRole.htm', //参数 roleID   //查询当前含有的

    /*
     添加分级授权
     roleID：角色ID；
     */
    insertRoleRole: 'acewill/roleAuthority/insertRoleRole.htm',


    /*
     * 查询字段权限  【刘春霖】
     *
     * */
    selectMyField: 'acewill/roleAuthority/selectMyField.htm',

    /*
     * 查询已有字段权限  【刘春霖】
     * roleID=20
     * */
    selectFieldByRoleID: 'acewill/roleAuthority/selectFieldByRoleID.htm',


    /*
     * 添加字段权限 【刘春霖】
     * >> 提交
     * roleFieldJSON
     * roleID
     * roleFieldJSON[
     * roleID
     * columnID
     * columnStatus
     * ]
     * */
    insertRoleFieldList: 'acewill/roleAuthority/insertRoleFieldList.htm',
};
