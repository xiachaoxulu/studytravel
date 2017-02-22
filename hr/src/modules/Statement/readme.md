<!--
* @Created Date       : 2016-10-24T09:59:30+08:00
* @Last Modified time : 2016-11-15T17:18:08+08:00
 -->




## 数据报表


### 开发人员

|     功能模块     |  前端  |  后端  | 备注 |
|:----------------:|:------:|:------:|:----:|
|   离职人数统计   | 刘宝至 | 宋宁宁 |      |
|   离职员工分析   | 刘宝至 | 宋宁宁 |      |
|   员工异动统计   | 刘宝至 | 宋宁宁 |      |
| 用工类型人数统计 | 刘宝至 | 宋宁宁 |      |
|      离职率      | 刘宝至 | 宋宁宁 |      |
|   在职员工分析   | 刘宝至 | 宋宁宁 |      |
|   员工人数统计   | 刘宝至 | 宋宁宁 |      |
|    出勤日报表    | 刘宝至 | 宋宁宁 |      |
|  月考勤明细报表  | 刘宝至 | 宋宁宁 |      |
|    补签卡记录    | 刘宝至 | 宋宁宁 |      |
|     假期余额     | 刘宝至 | 宋宁宁 |      |
|   华工薪酬报表   | 刘宝至 | 刘春霖 |      |
|  新煮意薪酬报表  | 刘宝至 | 刘春霖 |      |



### 文档结构
  main.vue                   模块入口
    attendanceDay.vue        日考勤报表
    attendanceMonth.vue      月考勤报表
    dimissionCount.vue       离职人数统计
    employeeCount.vue        员工人数统计
    holidayBalance.vue       假期余额
    leaveEmployeeCause       离职员工分析
    leaveRateEmployee.vue    离职率
    moveEmployee.vue         员工异动
    onlineEmployeeCause.vue  在职员工分析
    reportMenu.vue           菜单列表
    retroactiveCard.vue      补签卡
    userTypeEmployee.vue     用工类型人数统计
    huagongSalary.vue        华工薪酬报表
    xzySalary.vue            新煮意薪酬报表
api.js                       接口文档api
store.js                     业务逻辑处理
mock.js                      模拟数据



###TODO
  01.同比环比功能 【迭代】
  02.日期月份切换选择 【OK】
  03.所有报表导出功能【OK】
  04.新煮意薪酬报表和华工薪酬报表是订制报表，组织类型跟其他报表有差异【新煮意还增加了岗位名称查询条件】
