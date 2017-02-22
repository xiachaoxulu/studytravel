# 工作流模块

### 开发人员

| 功能模块                               | 前端 | 后端   | 备注 |
|:---------------------------------------|:-----|:-------|:-----|
| 待审批列表, 待审批, 已审批, 我的, 导出 | 方堃 | 刘文强 |      |
| 审批同意, 驳回, 转审                   | 方堃 | 赵志慧 |      |

### 文件结构

    main.vue

        主入口 包括: 顶部切换, 顶部菜单切换, 内容页切换

        menuApprovalPending.vue         待审批菜单
        menuApprovalResolved.vue        已审批菜单
        menuApprovalMy.vue              我的审批菜单

        ApprovalPendingList.vue         待审批列表
            ApprovalCondition.vue       审批条件查询
            ApprovalResolve.vue         审批同意弹框
            ApprovalReject.vue          审批驳回弹窗
            ApprovalTransfer.vue        审批转审弹窗
        ApprovalResolvedList.vue        已审批列表
            ApprovalCondition.vue       审批条件查询
        ApprovalMy.vue                  我的审批列表
            ApprovalCondition.vue       审批条件查询

    ApprovalList.vue                    首页卡片弹出右边栏待审批列表
        ApprovalDetail.vue              审批详情右边滑出栏
        ApprovalResolve.vue             审批同意弹框
        ApprovalReject.vue              审批驳回弹窗
        ApprovalTransfer.vue            审批转审弹窗

### TODO

Updated: 2016-11-15
1. ApprovalDetail.vue 审批详情现为静态页面，待与后端联调接口。
2. 转审操作现已去除，界面操作按钮待恢复，及以后端重新联调。
3. 审批撤回功能待完成。
4. 打印功能待完成。
5. 查看报表功能待完成。
