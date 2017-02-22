/**
* @Created Date       : 2016-11-18T15:58:02+08:00
* @Last Modified time : 2016-12-22T10:30:13+08:00
*/



export default {

  //不加权限的
  nonPowerdepartment:'acewill/department/selectAll.htm',
  nonPowerstore:'acewill/store/selectAll.htm',
  nonPowerstoreTeam:'acewill/storeTeam/selectAllTeam.htm',
  //导入
  initOrg: 'acewill/init/initOrg.htm',
  /**
   * 导入门店
   */
  initStore: 'acewill/init/initStore.htm',
  /**
   * 导入职位
   */
  initPosition: 'acewill/init/initPosition.htm',
  /**
   * 导入岗位
   */
  initPost: 'acewill/init/initPost.htm',
  /**
   * 导入职级
   */
  initRank: 'acewill/init/initRank.htm',
  /**
   * 导入员工
   */
  initEmployee: 'acewill/init/initEmployee.htm',
  /**
   * 导入岗位分类
   */
  initPostType: 'acewill/init/initPostType.htm',
  /**
   * 导入门店小组
   */
  initStoreTeam: 'acewill/init/initStoreTeam.htm',
  /**
   * 获取当前系统的考勤ID
   * >> 提交 无
   * << 响应 String
   * e.g. 60396
   */
  getMaxPin: 'acewill/employee/selectMaxPin.htm',
  /**
   * 获取当前系统中可用的考勤规则列表
   * >> 提交 无
   * << 响应 [{}]
   * ID: 考勤规则ID
   * checkworkName: 考勤规则名称
   */
  getAllRules: 'checkworkrule/selectCheckworkRule.htm',

  /**
   * 获取员工扩展字段列表
   * >> 提交 无
   * << 响应 [{}]
   * ID: 扩展字段ID
   * dbLength: 数据库中该字段最大长度(100)
   * dbNullable: 是否允许为空(0: 不允许, 1: 允许)
   * dbType: 数据库字段类型(db_varchar)
   * entityName: 字段名(_peiou)
   * entityType: 字段类型(en_string)
   * orderNum: 字段排序号(114)
   * shortName: 字段中文名(配偶)
   * showType: 界面显示类型(show_inputStr)
   * tableName: 对应数据表名(employee)
   */
  getExtendList: 'acewill/employee/selectEmployeeForExtend.htm',
  /**
   * 查询公司名称，门店数量，员工数量
   * >> 提交 无
   * << 响应 {}
   * companyName: 公司名称
   * storeCount: 门店数量
   * employeeCount: 员工数量
   */

   getExtendEntryList: 'acewill/employee/selectEmployeeEntryForExtend.htm',
   /**
    * 查询公司名称，门店数量，员工数量  [宋宁宁]
    * >> 提交 无
    * << 响应 {}
    * companyName: 公司名称
    * storeCount: 门店数量
    * employeeCount: 员工数量
    */
  getStoreEmployeeCount: 'acewill/OrgEmployee/selectCount.htm',
  /**
   * 花名册，查询所有人员列表
   * >> 提交
   * userName: 员工姓名
   * pageNum: 页码
   * pageSize: 每页显示数
   * << 响应 {}
   * pageCount: 页数
   * pageNum: 当前页
   * pageSize: 每页显示数
   * recordCount: 总记录数
   * recordList: []
   *   ID: 员工编号
   *   bankCard: 银行卡号
   *   bankName: 银行编码
   *   bankNameName: 银行名称
   *   birthday: 生日
   *   checkworkNo: 考勤Pin编号
   *   checkworkName: 考勤规则名称
   *   checkworkCode: 考勤卡号
   *   checkworkid: 考勤规则ID
   *   companyID: 公司编码
   *   companyName: 公司名称
   *   deptID: 部门编号
   *   deptName: 部门名称
   *   effectiveTime: 生效日期
   *   extList: [{}] 扩展字段
   *     des: 扩展字段描述
   *     showName: 扩展字段名称
   *   firstWorkTime: 首次工作时间
   *   gender: 性别编码
   *   genderName: 性别名称
   *   gongling: 工龄
   *   healthEndTime: 健康证到期时间
   *   hukouAddress: 户口地址
   *   hukouType: 户口类型编码
   *   hukouTypeName: 户口类型名称
   *   idCardType: 证件类型编码
   *   idCardTypeName: 证件类型名称
   *   isMarried: 婚姻状态编码
   *   isMarriedName: 婚姻状态名称
   *   mail: 邮箱
   *   nation: 民族编码
   *   nationName: 民族名称
   *   nowCode: 居住地邮编
   *   offerTime: 转正日期
   *   organizeID: 组织编号
   *   phone: 联系电话
   *   photourl: 头像服务器路径
   *   positionID: 职位编号
   *   positionName: 职位名称
   *   postID: 岗位编号
   *   postName: 岗位名称
   *   qq: qq号
   *   rankID: 职级编号
   *   rankName:
   *   siling: 司龄
   *   startTime: 生效日期
   *   state: 用工状态编码
   *   stateName: 用工状态名称
   *   status: 工作流状态编码
   *   statusName: 工作流状态名称
   *   urgentPerson: 紧急联系人
   *   urgentPhone: 紧急联系电话
   *   userIDCard: 证件卡号
   *   userName: 员工姓名
   *   userNamePY: 员工姓名拼音
   *   userNum: 员工工号
   *   userType: 用工类型编码
   *   userTypeName: 员工类型名称
   *   weChat: 微信号
   */
  getAllEmployee: 'acewill/employee/selectEmployeeAllPage.htm',
  /**
   * 添加员工
   * >> 提交
   * employeeMSG: Json 字符串
   * << 响应
   */
  addEmployee: 'acewill/employee/addEmployee.htm',

  /**
   * 员工入职【宋宁宁】
   * >> 提交
   * employeeMSG: Json 字符串
   * << 响应
   */
  pushEmployee: 'acewill/employee/addEmployeeEntry.htm',

  /**
   * 员工入职 提交【宋宁宁】
   * >> 提交
   * employeeMSG: Json 字符串
   * << 响应
   */
  updateEmployeeEntryStatus: 'acewill/employee/updateEmployeeEntryStatus.htm',

  /**
   * 员工入职 删除【宋宁宁】
   * >> 提交
   * employeeMSG: Json 字符串
   * << 响应
   */
  deleteEmployeeEntry: 'acewill/employee/deleteEmployeeEntry.htm',

  /**
   * 员工入职 查询【宋宁宁】
   * >> 提交
   * employeeMSG: Json 字符串
   * << 响应
   */
  selectEmployeeEntryAllPage: 'acewill/employee/selectEmployeeEntryAllPage.htm',

  /**
   * 根据人员ID查询个人详细信息
   * >> 提交 {}
   * ID: 员工编号
   * << 响应 {}
   * employee {}
   * educateList [] 教育经历
   * jobexperience: [] 工作经历
   */
  getOneEmployeeInfo: 'acewill/employee/selectEmployeeByID.htm',

  /**
   * 根据人员ID查询个人详细信息【员工入职   宋宁宁】
   * >> 提交 {}
   * ID: 员工编号
   * << 响应 {}
   * employee {}
   * educateList [] 教育经历
   * jobexperience: [] 工作经历
   */
  getOneEmployeeEntryInfo: 'acewill/employee/selectEmployeeEntryByID.htm',


  /**
   * 修改员工信息
   * >> 提交
   * employeeMSG: Json 字符串
   * << 响应
   */
  updateEmployeeInfo: 'acewill/employee/updateEmployee.htm',


  /**
   * 修改员工信息 [员工入职  宋宁宁]
   * >> 提交
   * employeeMSG: Json 字符串
   * << 响应
   */
  updateEmployeeEntryInfo: 'acewill/employee/updateEmployeeEntry.htm',

  /**
   * 根据人员id查询人员信息
   */
  getEmployeesByIDs: '',
  /**
   * 根据员工姓名模糊查询员工列表
   * >> 提交
   * userName: 员工姓名关键字
   * << 响应 [{}]
   */
  getEmployeesByKey: 'acewill/employee/selectEmployeeByName.htm',
  /**
   * 上传头像url
   */
  photoUpload: 'acewill/employee/addHeadImag.htm',
  identityUrl: 'acewill/employee/addIdentityImag.htm',
  healthUrl: 'acewill/employee/addHealthImag.htm',
  contractUrl: 'acewill/employee/addContractImag.htm',
  bankUrl: 'acewill/employee/addBankImag.htm',
  /**
   * 查询所有部门
   */
  getDeptTree: 'acewill/department/select.htm',
  /**
   * 按身份证号查询员工信息
   * >> 提交
   * idCard: 身份证号
   * << 响应 {}
   */
  selectEmployeeByIDCard: ' acewill/employee/selectEmployeeByIDCard.htm',
  /**
   * 删除宿舍
   */
  deleteDormitory: 'acewill/basedata/dormitory/deletebyids.htm',
  /**
   * 添加宿舍
   */
  addDormitory: 'acewill/basedata/dormitory/insert.htm',
  /**
   * 修改宿舍
   */
  updateDormitory: 'acewill/basedata/dormitory/update.htm',
  /**
   * 按ID查询单个宿舍
   */
  getOneDormitory: 'acewill/basedata/dormitory/selectbyid.htm',
  /**
   * 查询宿舍
   */
  getDormitory: 'acewill/basedata/dormitory/selectall.htm',


  /**
   * 查询品牌，区域，门店树原始列表数据
   * >> 提交 无
   * << 响应 {}
   * allList [{}]: 区域
   *   ID: 区域编号
   *   areaCode: 区域编码
   *   brandID: 品牌编号
   *   companyID: 公司编号
   *   parentID: 上级区域编号
   *   storeCount: 门店数量
   * brandList [{}]: 品牌
   *   ID: 品牌编号
   *   brandCode: 品牌编码
   *   brandName: 品牌名称
   *   storeCount: 门店数量
   * storeList [{}]: 门店
   *   ID: 门店编号
   *   acreage: 面积
   *   address: 地址
   *   areaID: 区域编号
   *   brandID: 品牌编号
   *   businessEndTime: 开始营业时间
   *   businessStartTime: 结束营业时间
   *   cbdID: 商圈类型编码
   *   city: 所在城市名称
   *   companyID: 公司编号
   *   companyName: 公司名称
   *   deptID: 部门编号
   *   leadingID: 负责人编号
   *   manageType: 经营类型
   *   organizeID: 组织编号
   *   organizeType: 组织类型
   *   province: 所在省份名称
   *   storeCode: 门店编码
   *   storeName: 门店名称
   *   storeType: 门店类型编码
   * teamList [{}]: 门店小组
   *   ID: 小组编号
   *   companyID: 公司编号
   *   deptID: 部门编号
   *   organizeID: 组织编号
   *   storeID: 门店编号
   *   teamName: 小组名称
   */
  getBrandAreaStoreTree: 'acewill/OrgEmployee/findBrankArea.htm',

  /**
   * 查询公司，部门，门店树原始列表数据
   * >> 提交 无
   * << 响应 {}
   * storeList [{}]: 门店
   * departList: [{}]: 部门
   *   ID: 部门编号
   *   companyID: 公司编号
   *   departmentName: 部门名称
   *   organizeID: 组织编号
   *   parentID: 上级部门编号
   *   type: "dept"
   * teamList: [{}]: 门店小组
   * companyName: 公司名称
   */
  getCompanyDeptStoreTree: 'acewill/OrgEmployee/findDeptTree.htm',

  // 品牌
  addBrand: 'acewill/basedata/brand/insert.htm',
  removeBrand: 'acewill/basedata/brand/deletebyid.htm',
  editBrand: 'acewill/basedata/brand/update.htm',
  getBrandByID: 'acewill/basedata/brand/selectbyid.htm',
  getBrand: 'acewill/basedata/brand/selectall.htm',

  // 区域
  addArea: 'acewill/basedata/area/insert.htm',
  removeArea: 'acewill/basedata/area/deletebyid.htm',
  editArea: 'acewill/basedata/area/update.htm',
  getAreaByID: 'acewill/basedata/area/selectbyid.htm',
  getArea: 'acewill/basedata/area/selectall.htm',

  // 部门
  addDept: 'acewill/department/insert.htm',
  removeDept: 'acewill/department/delete.htm',
  editDept: 'acewill/department/update.htm',
  getDeptByID: 'acewill/department/selectByID.htm',

  // 门店
  addStore: 'acewill/store/insert.htm',
  removeStoreList: 'acewill/store/delete.htm',
  editStore: 'acewill/store/update.htm',
  getStoreByID: 'acewill/store/selectByID.htm',
  getStore: 'acewill/store/selectStore.htm',

  // 门店小组
  addStoreTeam: 'acewill/storeTeam/insert.htm',
  removeStoreTeamList: 'acewill/storeTeam/delete.htm',
  editStoreTeam: 'acewill/storeTeam/update.htm',
  getAllStoreTeam: 'acewill/storeTeam/selectMyTeam.htm',
  getStoreTeamByID: 'acewill/storeTeam/selectByID.htm',

  //转正
  deleteOffice: 'acewill/employee/deleteOfficial.htm', //删除转正记录
  submitOffice: 'acewill/employee/updateOfficiaAllState.htm', //提交转正
  updateOffice: 'acewill/employee/updateOfficial.htm', //更新转正
  addOffice: 'acewill/employee/insertOfficial.htm', //添加转正
  getOffices: 'acewill/employee/selectOfficial.htm', //获取转正列表
  getOneOffice: 'acewill/employee/selectOfficialByID.htm', //获取单条转正记录
  batchAddOffice: 'acewill/employee/insertOfficialAll.htm', //批量员工转正

  //离职
  batchAddDimission: 'acewill/employee/insertLeaveofficeAll.htm', //批量员工离职
  getDimission: 'acewill/employee/selectLeaveoffice.htm', //获取离职列表
  getOneDimission: 'acewill/employee/selectLeaveofficeByID.htm', //获取单条离职记录
  addDimission: 'acewill/employee/insertLeaveoffice.htm', //添加离职
  deleteDimission: 'acewill/employee/deleteLeaveoffice.htm', //删除离职
  updateDimission: 'acewill/employee/updateLeaveoffice.htm', //更新离职
  submitDimission: 'acewill/employee/updateLeaveofficeStatu.htm', //离职批量提交

  //黑名单
  getBlackList: 'acewill/basedata/blacklist/selectbypage.htm', //
  getOneBlackList: 'acewill/basedata/blacklist/findBlacklistByID.htm',
  addBlackList: 'acewill/basedata/blacklist/insert.htm', //新增黑名单
  deleteBlackList: 'acewill/basedata/blacklist/deletebyids.htm', //删除黑名单
  updateBlackList: 'acewill/basedata/blacklist/update.htm', //修改黑名单
  batchAddBlackList: 'acewill/basedata/blacklist/insertAll.htm', //批量新增黑名单


  //异动
  deleteTransaction: 'acewill/employee/deleteTransferwork.htm', //删除异动
  submitTransaction: 'acewill/employee/updateTransferworkStatu.htm', //提交异动
  updateTransaction: 'acewill/employee/updateTransferwork.htm', //更新异动记录
  addTransaction: 'acewill/employee/insertTransferwork.htm', //新增一条异动
  getTransactions: 'acewill/employee/selectTransferwork.htm', //获取异动列表
  getOneTransaction: 'acewill/employee/selectTransferworkByID.htm', //获取一条记录
  batchAddTransaction: 'acewill/employee/insertTransferworkAll.htm', //批量异动
  batchBackTransaction: 'acewill/employee/updateTransferworkBackTime.htm', //批量调回

  // 职级
  getRank: 'acewill/basedata/rank/selectall.htm',
  getRankByNum: 'acewill/basedata/rank/selectbynum.htm', //根据岗位查询对应的职级
  getRankByID: 'acewill/basedata/rank/selectbyid.htm',
  addRank: 'acewill/basedata/rank/insert.htm',
  editRank: 'acewill/basedata/rank/update.htm',
  removeRank: 'acewill/basedata/rank/deletebyid.htm',

  // 岗位分类
  getPostTypeTree: 'acewill/basedata/posttype/selectall.htm',
  getPostTypeByID: 'acewill/basedata/posttype/selectbyid.htm',
  addPostType: 'acewill/basedata/posttype/insert.htm',
  editPostType: 'acewill/basedata/posttype/update.htm',
  removePostType: 'acewill/basedata/posttype/deletebyid.htm',

  // 技能
  getSkill: 'acewill/basedata/skill/selectAll.htm',
  getSkillByID: 'acewill/basedata/skill/selectByID.htm',
  getSkillLevelByID: 'acewill/basedata/skilllevel/selectByID.htm',
  addSkill: 'acewill/basedata/skill/insert.htm',

  // 技能等级
  addSkillLevel: 'acewill/basedata/skilllevel/insert.htm',
  removeSkill: 'acewill/basedata/skill/delete.htm',
  removeSkillLevel: 'acewill/basedata/skilllevel/delete.htm',
  editSkill: 'acewill/basedata/skill/update.htm',
  editSkillLevel: 'acewill/basedata/skilllevel/update.htm',

  // 岗位
  getPost: 'acewill/basedata/post/selectall.htm',
  getPostNoAuth:'acewill/basedata/post/selectallNoAuth.htm',
  getPostTree: 'acewill/basedata/post/selectall.htm',
  getPostTree2: 'acewill/basedata/post/selectalls',
  getPostByID: 'acewill/basedata/post/selectbyid.htm',
  addPost: 'acewill/basedata/post/insert.htm',
  removePost: 'acewill/basedata/post/deletebyid.htm',
  editPost: 'acewill/basedata/post/update.htm',

  // 岗位名称
  getPosition: 'acewill/basedata/position/selectall.htm',
  getPositionByID: 'acewill/basedata/position/selectbyid.htm',
  addPosition: 'acewill/basedata/position/insert.htm',
  removePosition: 'acewill/basedata/position/deletebyid.htm',
  editPosition: 'acewill/basedata/position/update.htm',

  /**
   * 根据品牌ID查询员工列表
   * >> 提交 {}
   * brandID: 品牌ID
   * << 响应 [{}]
   * ID: 员工ID
   * deptID: 员工所属部门ID
   * deptName: 员工所属部门名称
   * gongling: 工龄
   * photourl: 员工头像url地址
   * postName: 岗位名称
   * postTypeName: 岗位分类名称
   * siling: 司龄
   * storeID: 所属门店ID
   * storeName: 所属门店名称
   * userName: 员工姓名
   * userNamePY: 员工姓名拼音
   * userNum: 员工工号
   */
  getEmployeesByBrandID: 'acewill/OrgEmployee/selectEmployeeByBrandIDOrderByName.htm',

  /**
   * 根据区域ID及品牌ID查询员工列表
   * >> 提交 {}
   * brandID: 品牌ID
   * areaID: 区域ID
   * << 响应 [{}]
   * 同上
   */
  getEmployeesByAreaID: 'acewill/OrgEmployee/selectEmployeeByAreaIDOrderByName.htm',

  /**
   * 根据岗位ID查询员工列表
   * >> 提交 {}
   * postID: 岗位ID
   * << 响应 [{}]
   * 同上
   */
  getEmployeeByPostID: 'acewill/OrgEmployee/selectEmployeeByPostOrderByName.htm',

  /**
   * 根据组织(门店或部门)ID查询员工列表
   * >> 提交 {}
   * organizeID: 组织ID
   * << 响应 [{}]
   * 同上
   */
  getEmployeeByOrgID: 'acewill/OrgEmployee/selectEmployeeByOrganizeOrderByName.htm',

  /**
   * 根据门店小组ID查询员工列表
   * >> 提交 {}
   * teamID: 门店小组ID
   * << 响应: [{}]
   * 同上
   */
  getEmployeeByTeamID: 'acewill/OrgEmployee/selectEmployeeByTeamIDOrderByName.htm',


  /* --------------------------- 员工录入信息核对 --------------------------- */

  /**
   * 获取员工录入信息所有可用字段信息
   * >> 提交 {}
   * << 响应 [{}]
   * ID: 字段编号
   * isHide: 是否隐藏
   * isRequired: 是否必填
   * nameCN: 字段中文名称
   * nameEN: 字段英文名称
   * valid: 是否可用
   */
  getEmployeeSetField: 'set_acewill/SetEmployee/selectEmployeeSet.htm',

  /**
   * 添加员工录入信息的字段
   */
  addEmployeeSetField: 'set_acewill/SetEmployee/insertSetEmployee.htm',

  /**
   * 删除员工录入信息的字段
   */
  removeEmployeeSetField: 'set_acewill/SetEmployee/deleteSetEmployee.htm',

  /**
   * 编辑员工录入信息的字段
   */
  editEmployeeSetField: 'set_acewill/SetEmployee/updateEmployeeSet.htm',


  getEmployeeSetList: 'set_acewill/SetEmployee/selectEmployeeUser.htm',

  /**
   * 批量删除员工录入的信息
   */
  removeEmployeeUserByIDs: 'set_acewill/SetEmployee/deleteEmployeeUser.htm',

  /**
   * 依员工录入信息ID查询单个员工信息
   * >> 提交 {}
   *   ID: 员工录入信息ID
   * << 响应 [{}]
   */
  getEmployeeUserByID: 'set_acewill/SetEmployee/selectEmployeeUserByID.htm',

  /**
   * 修改单个员工录入信息
   * >> 提交 {}
   *  employeeMSG: json 字符串
   */
  editEmployeeUser: 'set_acewill/SetEmployee/updateEmployeeUser.htm',

  /**
   * 批量审核通过员工录入信息
   * >> 提交 {}
   *   IDS: json 数组字符串
   */
  approveEmployeeUser: 'set_acewill/SetEmployee/submitEmployeeUser.htm',

  /**
   * 添加员工之前调用自动生成员工工号  【宋宁宁】
   * 
   */
  createNumByEmployeeNumRule:'acewill/employee/createNumByEmployeeNumRule.htm',

  /**
   * 查询该部门下及所有下级部门的所有员工的的数量
   */
  selectEmployeeCountCascadeByOrgID: 'acewill/OrgEmployee/selectEmployeeCountByOrganize.htm',

  /**
   * 查询该部门下及所有下级部门的所有员工信息
   */
  getEmployeeCascadeByOrgID: 'acewill/OrgEmployee/selectEmployeeByOrganizeListOrderByName.htm',
};
