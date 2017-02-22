/* 引入各模块 api */
import Dashboard from 'modules/Dashboard/api'
import common from 'modules/common/api'
import schedule from 'modules/schedule/api'
import OrgEmployee from 'modules/OrgEmployee/api'
import Permission from 'modules/Permission/api'
import Accounts from 'modules/Accounts/api'
import Settings from 'modules/Settings/api'
import Demo from 'modules/Demo/api'
import DataReport from './modules/DataReport/api'
import Attendence from './modules/Attendence/api'
import AttendanceEntire from './modules/AttendanceEntire/api'
import Pay from './modules/Pay/api'


import Recruitment from './modules/Recruitment/api'
import Statement from './modules/Statement/api'
import Apply from './modules/Apply/api'
import Workflow from './modules/Workflow/api'
export default {
  api: {
    /* 首页 */
    Dashboard,
    /* 公用模块 */
    common,
    // 排班模块api
    schedule,
    // 组织和员工模块api
    OrgEmployee,
    //权限模块api
    Permission,
    //登录
    Accounts,
    //规则配置模块api
    Settings,
    //Demo模块
    Demo,
    //数据报表模块
    DataReport,
    // 考勤
    Attendence,
    //招聘
    Recruitment,
    //离职报表
    Statement,
    // 申请
    Apply,
    AttendanceEntire,
    Pay,
    Workflow
  }
}
