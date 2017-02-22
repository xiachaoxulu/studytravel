## 薪酬模块

### 开发人员

| 功能模块 |  前端  |          后端          |                    备注                    |
|----------|--------|------------------------|--------------------------------------------|
| 薪酬帐套 | 杨鹏飞 | 赵志慧                 |                                            |
| 变动应用 | 刘宝至 | 孙彦飞                 |                                            |
| 薪酬计算 | 方堃   | 王兴超，刘春霖，刘文强 | 后期刘春霖负责薪酬计算，刘文强负责导入数据 |
| 薪酬规则 | 刘宝至 | 尚斌                   |                                            |

### 文件结构

    main.vue

        menuPaySeries.vue       薪酬帐套菜单
        menuPayUser.vue         变动应用菜单
        menuPayCalculate.vue    薪酬计算菜单

        paySuiteList.vue        工资套列表，默认展示所有工资套，传入参数valid=true则只显示开启的工资套。

        paySeries.vue 薪酬帐套

            paySeriesItems.vue  工资项目

                editPayItems.vue 工资项目操作

            paySeriesSuite.vue  工资套

                editPaySuite.vue 工资套操作

                editPaySuiteItems.vue 工资套项目操作

        payUsers.vue 变动应用

            payUsersApplyUsers.vue  应用人员

            payUsersChangeUsers.vue 变动人员

            payUsersShelveUSers.vue 搁置人员

        payCalculate.vue 薪酬计算

            editPay.vue 修改工资项

            payReComputeItem.vue 选择重新计算的工资项目

            paySuspended.vue 薪酬停发操作


### TODO

1. 支持工资分段结算
2. 薪酬计算公式完善，支持多种类型参与计算项(数字，字符串，日期)
