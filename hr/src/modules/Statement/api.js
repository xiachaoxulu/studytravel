/**
 * @Created Date       : 2016-10-12T15:01:43+08:00
* @Last Modified time : 2016-12-03T14:28:02+08:00
 */



export default {
    selectSystemTree: 'acewill/role/selectMyRole.htm',
    // 组织树
    getBrandAreaStoreTree: 'acewill/OrgEmployee/findBrankArea.htm',
    getCompanyDeptStoreTree: 'acewill/OrgEmployee/findDeptTree.htm',

    /*
     *查询组织类型
     * >> 响应
     * resule:[{
        orgCode:'dept',
        orgName:'部门'
      }]
     *
     */
    selectOrgTypeReport: 'acewill/basedata/selectOrgType.htm', //查询组织类型


    /*
     *查询组织名称
     */
    selectTabRegisterReport: 'acewill/basedata/selectTabRegister.htm', //查询组织名称


    /*
     *  部门 【公用接口】
     * <<响应 {}
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
    selectByType: 'acewill/department/selectByType.htm',


    /*
     *  门店 【公用接口】
     * << 响应 {}
     *result:[{
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
     *  小组 【公用接口】
     * << 响应 {}
           * result:[{
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
     * 查询日出勤 【宋宁宁】
     * >>提交
     * startTime:开始时间；
     * endTime:结束时间；
     * timeType:事件类型；【month,day】
     * IDs:组织类型IDs；
     * userType:用工类型；
     */
    selectDayAttendanceReport: 'acewill/common/mwDayAttendanceReport.htm', //查询日出勤

    /*
     * 查询补签卡  木屋 【宋宁宁】
     * >>提交
     * startTime:开始时间；
     * endTime:结束时间；
     * timeType:事件类型；【month,day】
     * IDs:组织类型IDs；
     * userType:用工类型；
     */

    selectMonthAttendanceReport: 'acewill/common/mwMonthAttendanceReport.htm', //查询月考勤

    /*
     * 查询员工人数统计  木屋 【宋宁宁】
     * >>提交
     * startTime:开始时间；
     * endTime:结束时间；
     * timeType:事件类型；【month,day】
     * IDs:组织类型IDs；
     * userType:用工类型；
     */

     selectXzyDayAttendanceReport: 'acewill/common/xzyDayAttendanceReport.htm', //查询日出勤

     /*
      * 查询补签卡  木屋 【宋宁宁】
      * >>提交
      * startTime:开始时间；
      * endTime:结束时间；
      * timeType:事件类型；【month,day】
      * IDs:组织类型IDs；
      * userType:用工类型；
      */

     selectXzyMonthAttendanceReport: 'acewill/common/xzyMonthAttendanceReport.htm', //查询月考勤

     /*
      * 查询员工人数统计  木屋 【宋宁宁】
      * >>提交
      * startTime:开始时间；
      * endTime:结束时间；
      * timeType:事件类型；【month,day】
      * IDs:组织类型IDs；
      * userType:用工类型；
      */

     selectRetroactiveCardReport: 'acewill/common/retroactiveCardReport.htm', //查询补签卡

     /*
      * 查询月考勤 【宋宁宁】
      * >>提交
      * startTime:开始时间；
      * endTime:结束时间；
      * timeType:事件类型；【month,day】
      * IDs:组织类型IDs；
      * userType:用工类型；
      */

    selectEmployeeNumberReport: 'acewill/common/employeeNumberReport.htm', //查询员工人数统计

    /*
     * 查询离职人数列表 【宋宁宁】
     * >>提交
     * startTime:开始时间；
     * endTime:结束时间；
     * timeType:事件类型；【month,day】
     * IDs:组织类型IDs；
     * userType:用工类型；
     */
    selectLeaveEmployeeNumberReport: 'acewill/common/leaveEmployeeNumberReport.htm', //查询离职人数列表

    /*
     * 查询员工异动列表 【宋宁宁】
     * >>提交
     * startTime:开始时间；
     * endTime:结束时间；
     * timeType:事件类型；【month,day】
     * IDs:组织类型IDs；
     * userType:用工类型；
     */
    selectMoveEmployeeNumberReport: 'acewill/common/moveEmployeeNumberReport.htm', //查询员工异动列表

    /*
     * 查询用工类型人数统计列表 【宋宁宁】
     * >>提交
     * startTime:开始时间；
     * endTime:结束时间；
     * timeType:事件类型；【month,day】
     * IDs:组织类型IDs；
     * userType:用工类型；
     */
    selectUserTypeEmployeeNumberReport: 'acewill/common/userTypeEmployeeNumberReport.htm', //查询用工类型人数统计列表

    /*
     * 查询离职率统计列表 【宋宁宁】
     * >>提交
     * startTime:开始时间；
     * endTime:结束时间；
     * timeType:事件类型；【month,day】
     * IDs:组织类型IDs；
     * userType:用工类型；
     */
    selectLeaveRateEmployeeNumberReport: 'acewill/common/leaveRateEmployeeNumberReport.htm', //查询离职率统计列表

    /*
     * 查询离职年龄分析【宋宁宁】
     * >>提交
     * startTime:开始时间；
     * endTime:结束时间；
     * timeType:事件类型；【month,day】
     * IDs:组织类型IDs；
     * userType:用工类型；
     */
    selectLeaveEmployeeAgeAnalysisReport: 'acewill/common/leaveEmployeeAgeAnalysisReport.htm', //查询离职年龄分析

    /*
     * 查询离职司龄分析【宋宁宁】
     * >>提交
     * startTime:开始时间；
     * endTime:结束时间；
     * timeType:事件类型；【month,day】
     * IDs:组织类型IDs；
     * userType:用工类型；
     */
    selectLeaveEmployeeWorkAgeAnalysisReport: 'acewill/common/leaveEmployeeWorkAgeAnalysisReport.htm', //查询离职司龄分析

    /*
     * 查询职员工籍贯分析【宋宁宁】
     * >>提交
     * startTime:开始时间；
     * endTime:结束时间；
     * timeType:事件类型；【month,day】
     * IDs:组织类型IDs；
     * userType:用工类型；
     */
    selectOnlineEmployeeNativeAgeAnalysisReport: 'acewill/common/onlineEmployeeNativeAnalysisReport.htm', //查询在职员工籍贯分析

    /*
     * 查询在职员工年龄分析【宋宁宁】
     * >>提交
     * startTime:开始时间；
     * endTime:结束时间；
     * timeType:事件类型；【month,day】
     * IDs:组织类型IDs；
     * userType:用工类型；
     */
    selectOnlineEmployeeAgeAnalysisReport: 'acewill/common/onlineEmployeeAgeAnalysisReport.htm', //查询在职员工年龄分析

    /*
     * 查询在职员工文化程度分析【宋宁宁】
     * >>提交
     * startTime:开始时间；
     * endTime:结束时间；
     * timeType:事件类型；【month,day】
     * IDs:组织类型IDs；
     * userType:用工类型；
     */
    selectOnlineEmployeeEducationAgeAnalysisReport: 'acewill/common/onlineEmployeeEducationAnalysisReport.htm', //查询在职员工文化程度分析

    /*
     * 查询在职员职级分析【宋宁宁】
     * >>提交
     * startTime:开始时间；
     * endTime:结束时间；
     * timeType:事件类型；【month,day】
     * IDs:组织类型IDs；
     * userType:用工类型；
     */
    selectOnlineEmployeeRankAnalysisReport: 'acewill/common/onlineEmployeeRankAnalysisReport.htm', //查询在职员职级分析

    /*
     * 查询假期余额【宋宁宁】
     * >>提交
     * startTime:开始时间；
     * endTime:结束时间；
     * timeType:事件类型；【month,day】
     * IDs:组织类型IDs；
     * userType:用工类型；
     */
    selectEmployeeVacationBalanceReport: 'acewill/common/employeeVacationBalanceReport.htm', //查询假期余额

    /*
     * 查询华工薪酬 >　工资发放报表【刘春霖】
     * >>提交
     * startTime:开始时间；
     * endTime:结束时间；
     * timeType:事件类型；【month,day】
     * IDs:组织类型IDs；
     * userType:用工类型；
     */
    huagongPayMonth: 'Pay/counter/huagong/month.htm', //华工薪酬 >　工资发放报表【刘春霖】





    /*
     * 查询新煮意薪酬 >　工资发放报表【刘春霖】
     * >>提交
     * startTime:开始时间；
     * endTime:结束时间；
     * timeType:事件类型；【month,day】
     * IDs:组织类型IDs；
     * userType:用工类型；
     */
    xzyPayMonth: 'Pay/counter/xinzhuyi/month.htm',


    /*
     *查询岗位   【刘春霖】
     */
    postSelect: 'acewill/basedata//post/selectall.htm',

};
