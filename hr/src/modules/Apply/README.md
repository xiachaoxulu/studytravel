## 申请模块

### 开发人员

|    功能模块    | 前端 |  后端  |           备注           |
|----------------|------|--------|--------------------------|
| 各申请页面     | 方堃 | 王兴超 | 列表及申请操作           |
| 工作流提交操作 | 方堃 | 赵志慧 | 按钮将各申请提交至工作流 |

### 文件结构

现无 main.vue 主入口页面，请假、加班、出差申请均为独立路由下的独立标签页进入。

    BizTrip.vue                 出差申请首页
        BizTripApply.vue        出差申请编辑弹窗
        BizTripBack.vue         出差返回编辑弹窗
        BizTripList.vue         出差申请查询列表页
    Overtime.vue                加班申请首页
        OvertimeApply.vue       加班申请编辑弹窗
        OvertimeList.vue        加班申请查询列表页
    Vacation.vue                请假申请首页
        VacationApply.vue       请假申请编辑弹窗
        VacationList.vue        请假申请查询列表页
        VacationUsageApply.vue  销假申请编辑弹窗

### TODO

* Updated 2010-11-10
1. 出差返回现被去除，待添加。
2. 销假申请现被去除，待添加。
3. 三种申请现只有列表视图，待添加日历视图。
