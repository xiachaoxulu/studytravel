## 排班模块

### 开发人员

| 功能模块 |  前端  |          后端          |                    备注                    |
|----------|--------|------------------------|--------------------------------------------|
| 所有     | 杨鹏飞 | 尚斌                   |                                            |

### 文件结构


    main.vue  

        主入口 包括： 顶部切换、顶部右侧菜单、修改记录、班次列表、添加班次、导入预估需求人数

        tableDaysDeparment.vue      部门排班
        tableDaysManager.vue        管理组排班
        tableDaysService.vue        服务组排班

        以上3个文件完全一样，只是引入的store不同

        tableHours.vue              24小时排班

        addWorkClass.vue            添加班次
        listWorkClass.vue           班次列表
        edithistory.vue             修改记录



### 数据说明


    排班类型：周排班，日排班

    班次：1 固定班次 2 自定义班次 3 请假 4 排休

    分组：部门 门店（管理组，服务组）


###TODO

01. 班次修改类型时，已排班数据不更新，workTimeType 字段。						[ok:班次排班后不能修改类型]
02. 如何获取deptID,storeID 														[ok]
03. pointer-events:none; 实现 													[ok]
04. 跨天，跨周，跨月，跨年														[next]
05. 提交审核后不可编辑															[next]
06. 日排班 班次显示 不能因为清空技能而删除。 									[ok]
07. 预估需求人数导入															[ok]
08. 技能api																		[ok]
09. 导出 																		[ok]
10. 休息 时间可为空 或者 0-24													[ok]
11. 日排班 自定义班次  可全时间自定义编辑，且需要将班次数据反馈给周排班			[next]
12. 班次区分部门和门店班次，tab 												[x]
13. 班次添加 验证																[ok]
14. 班次风格修改																[ok]

###TODO 2

01. 排班历史表导出，需要导出对应的历史班次 [ok]
02. 已删除历史班次，需要标记，提示时间
03. 周排版需要确定前后班次是否冲突 【ok】
04. 日排版自定义班次
05. 日排版排休班次需要添加 排休文字 [ok]
06. 实修，实际排班人数联动，与考勤关联
07. 打印
08. 实修天数的实时显示需要跟考勤周期关联（需要考勤规则支持） [next]
09. 实修联动
10. 管理组排班预览
11.

###BUG

01. 日排版刷新数据加载两次
02. 添加排班或任务，再清空，仍然记录已修改状态，无法跳转其他
03. 修改班次时间后，没有进行跨天冲突检测，添加检测，如果已经排班即使没有提交，也不允许修改。
04. 修改排班配置后，返回排班没有更新。
05. 排班配置提示信息位置有问题
06. 自定义班次 格式检测，重复时段检测 [ok]
07. 批量粘贴 跨天冲突不正确 [ok]


08. 打开3种排班，更新配置后，只有当前打开的排班更新状态，其他的没动，attached。。。。

### 字段参数

* workTimeType : 班次类型： 1:固定班次 2:自定义班次 3:请假  4:排休

* workClass.type : 排班类型 1:部门  2:管理组 3:服务组

* workClass.timeType : 班次类型 1:正常上班  4:排休





### 代码结构

`
    mian.vue

        >> 提审
        >> 班次列表
        >> 导出excel
        >> 导入
        >> 修改记录

    depratment.vue

        >> attached

            >> this.setInitStatus();

            >> action.initWorkDataOfDays()

            >> actions.hideHours(true);

        >> ready

            >> this.setInitStatus();

            >> action.init()

        >> events

            >>

            >> searchByUserName()
            >> toDownloadExcel()
            >> toSubmitSechedule()


`


table

    // 班次
    workClass:

        ID:
        name:
        type:





