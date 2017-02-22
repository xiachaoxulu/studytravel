## 组织与员工模块

### 开发人员

|                                             功能模块                                             | 前端 |         后端         | 备注 |
|--------------------------------------------------------------------------------------------------|------|----------------------|------|
| 黑名单、离职、宿舍、员工编辑、转正、异动、花名册                                                 | 夏超 | 苏新、刘春霖（下同） |      |
| 部门、门店、小组、区域、品牌、员工组织视图、员工岗位视图、公司、职位职级、岗位及分类、技能及等级 | 方堃 |                      |      |
|                                                                                                  |      |                      |      |

### 文件结构

    main.vue
        byOrg.vue                          组织与员工按组织视图
            employeeOrgList.vue            员工按组织列表
                rost.vue                   员工花名册
            company.vue                    主界面右侧公司信息
            store.vue                      主界面右侧滑动门店信息
            userInfo.vue                   主界面右侧滑动员工信息                  
            department.vue                 主界面右侧滑动部门信息
            area.vue                       主界面右侧滑动区域信息
            brand.vue                      主界面右侧滑动品牌信息
            team.vue                       主界面右侧滑动门店小组信息
            addStore.vue                   修改门店关联信息或添加下属门店
            addStoreTeam.vue               修改小组关联信息或添加门店下小组
            batchZhuanForm.vue             右侧员工滑动栏下员工转正
            batchLiForm.vue                右侧员工滑动栏下员工离职
            batchHeiForm.vue               右侧员工滑动栏下员工加入黑名单
            addEmployee.vue                右侧员工滑动栏下员工修改关联信息
            batchTransaction.vue           右侧员工滑动栏下员工异动
            addDepartment.vue              修改部门关联信息或添加下级部门
            areaEdit.vue                   修改区域关联信息
            brandEdit.vue                  修改品牌关联信息
        byPost                             组织与员工按岗位视图
            employeePostList.vue           员工按岗位列表
                rost.vue                   员工花名册
            post.vue                       主界面右侧岗位信息
            userInfo.vue                   主界面右侧滑动员工信息
            batchZhuanForm.vue             右侧员工滑动栏下员工转正
            batchLiForm.vue                右侧员工滑动栏下员工离职
            batchHeiForm.vue               右侧员工滑动栏下员工加入黑名单
            addEmployee.vue                右侧员工滑动栏下员工修改关联信息
            batchTransaction.vue           右侧员工滑动栏下员工异动
        brandEdit.vue                      品牌编辑
        userInfo.vue                       员工信息右滑页
        post.vue                           岗位信息右边页
            postDialog.vue                 岗位信息编辑弹出框
        addEmployee.vue                    添加员工弹出框
            selectDormitory.vue            员工选择宿舍查找带回             
            extendEmployeeInfo.vue         员工扩展字段编辑弹出框
        addDepartment.vue                  添加或修改部门信息
        addStore.vue                       添加门店弹出框
            selectEmployee
            selectDormitory.vue            员工选择宿舍查找带回
        dimission.vue                      员工离职列表操作页面
            addDimission.vue               员工离职添加编辑页面
        dormitory.vue                      员工宿舍列表操作页面
            addDormitory.vue               添加或修改宿舍信息
        office.vue                         员工转正列表操作界面
            addOffice.vue                  员工转正添加编辑界面
        blacklist.vue                      黑名单列表操作界面
            addBlacklist.vue               黑名单添加编辑界面
        transaction.vue                    员工异动列表操作界面
            addTransaction.vue             员工异动添加编辑界面
        postManage.vue                     横向岗位结构图
        orgManage.vue                      横向组织结构图
        departmentTreeEdit.vue             修改组织树界面
            addDepartment.vue              添加或修改部门信息
        postTreeEdit.vue                   添加或修改岗位信息
            rank.vue                       管理职级界面
                rankEdit.vue               职级添加或编辑界面
            postType.vue                   岗位分类树显示界面
                postTypeEdit.vue           岗位分类添加编辑界面 
            postDialog.vue                 岗位添加编辑界面
            positionEdit.vue               职位添加编辑界面
        areaTree.vue                       区域树显示界面
            areaEdit.vue                   区域添加编辑弹出框                                          


# TO DO LIST

_**已过期**_

| 序号 |      任务      | 状态 |
|------|----------------|------|
|    1 | 员工按组织架构 |      |
|    2 | 员工按列表     |      |
|    3 | 员工筛选       |      |
|    4 | 组织树         |      |
|    5 | 岗位树，职级   |      |
|    6 | 员工异动       |      |
|    7 | 员工转正       |      |
|    8 | 员工离职       |      |
|    9 | 黑名单         |      |
|   10 | 组织树横向视图 |      |
|   11 | 员工宿舍       |      |

| 序号 |      界面      | 状态 |
|------|----------------|------|
|    1 | 员工操作header |      |
|    2 | 组织树         |      |
|    3 | 员工列表       |      |
