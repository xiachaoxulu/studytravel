## 考勤模块

### 开发人员

|       功能模块       | 前端 |  后端  | 备注 |
|----------------------|------|--------|------|
| 日考勤               | 夏超 | 王兴超 |      |
| 月考勤               | 夏超 | 孙彦飞 |      |
| 其它工时录入         | 夏超 | 孙彦飞 |      |
| 调拨                 | 夏超 | 尚斌   |      |
| 调拨历史             | 夏超 | 尚斌   |      |
| 出勤                 | 夏超 | 王兴超 |      |
| 考勤明细             | 夏超 | 王兴超 |      |
| 出差人数             | 夏超 | 王兴超 |      |
| 考勤异常             | 夏超 | 王兴超 |      |
| 从调拨过来的考勤异常 | 夏超 | 王兴超 |      |
| 其他工时             | 夏超 | 王兴超 |      |
| 加班工时             | 夏超 | 王兴超 |      |
| 加班工时历史         | 夏超 | 王兴超 |      |
| 调拨总工时           | 夏超 | 尚斌   |      |
| 请假                 | 夏超 | 王兴超 |      |
| 假期历史             | 夏超 | 王兴超 |      |

### 文件结构

    main.vue                                    考勤主页面
        day.vue                                 日考勤主页面
            dayDetailTip.vue                    考勤明细页面
            allot.vue                           调拨页面
            allotHistory.vue                    调拨历史查询
            attendance.vue                      出勤页面   
            evection.vue                        出差页面   
            evectionHistory.vue                 出差历史页面 
            exception.vue                       异常页面
            exceptionFromAllot.vue              从调拨过来的异常页面
            overtime.vue                        加班工时
            overtimeHistory.vue                 加班工时历史
            totalAllot.vue                      总工时页面
            vacation.vue                        假期页面   
            vacationHistory.vue                 假期历史页面
        month.vue                               月考勤页面 
        otherentry.vue                          其他工时录入
        otherlist.vue                           其他工时列表





