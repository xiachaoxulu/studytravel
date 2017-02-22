权限管理 permission 							-3

	角色管理 permission-role 					52

		>>角色树管理  permission-role-tree

			添加角色组 		permission-role-tree-addGroup
			<!-- 修改角色组 		permission-role-tree-editGroup -->
			<!-- 删除角色组 		permission-role-tree-delGroup -->

			添加角色 		permission-role-tree-addRole
			<!-- 修改角色 		permission-role-tree-editRole -->
			<!-- 删除角色 		permission-role-tree-delRole -->

            修改            permission-role-tree-edit
            删除            permission-role-tree-del

		>>角色功能授权 permission-role-manage

			功能权限 		permission-role-manage-fn
			人员权限 		permission-role-manage-personnel
			卡片权限 		permission-role-manage-card
			分级授权 		permission-role-manage-grade

			编辑角色人员 	permission-role-manage-userEdit


组织与员工 org


	横向视图 org-structureMap

	导入     org-importData



	// 菜单
	组织架构图 org-map					53


	岗位       org-post					57  【x】


	修改组织树 org-orgTree			    58


		组织树 【2】      org-orgTree-dept

			添加部门 [home]   org-orgTree-dept-add

			添加同级部门  org-orgTree-dept-addBrother
			添加子级部门  org-orgTree-dept-addChildren
			修改		  org-orgTree-dept-edit
			删除		  org-orgTree-dept-del



	修改岗位树 org-postTree				59


		>> 职位树 			org-postTree-position

			添加  			org-postTree-position-add
			编辑  			org-postTree-position-edit
			删除  			org-postTree-position-del

		>> 岗位树 			org-postTree-post

			添加  			org-postTree-post-add
			编辑  			org-postTree-post-edit
			删除  			org-postTree-post-del

		>> 岗位分类  		org-postTree-postClass

			添加同级分类 	org-postTree-postClass-addBrother
			添加子分类 		org-postTree-postClass-addChildren
			修改 			org-postTree-postClass-edit
			删除 			org-postTree-postClass-del


		>> 职级 			org-postTree-rank

			添加 			org-postTree-rank-add
			编辑 			org-postTree-rank-edit
			删除 			org-postTree-rank-del



	新员工入职 org-addEmployee			60


	员工转正   org-regular				61

		批量转正按钮【link】org-regular-batchAdd

		>>员工转正 org-regular

			搜索 	org-regular-search
			筛选 	org-regular-filter
			添加 	org-regular-add
			修改 	org-regular-edit
			提交 	org-regular-submit
			删除 	org-regular-del
			导入 	org-regular-import
			导出 	org-regular-export
			打印 	org-regular-print


	员工异动   org-transaction			62

		批量异动按钮【link】

		>>员工异动
			搜索    org-transaction-search
			筛选    org-transaction-filter
			添加    org-transaction-add
			修改    org-transaction-edit
			提交    org-transaction-submit
			调回	org-transaction-back
			删除    org-transaction-del
			导入    org-transaction-import
			导出    org-transaction-export
			打印    org-transaction-print

	员工离职   org-dimission			63

		批量离职按钮【link】

		>>员工离职
			搜索    org-dimission-search
			筛选    org-dimission-filter
			添加    org-dimission-add
			修改    org-dimission-edit
			提交    org-dimission-submit
			删除    org-dimission-del
			导入    org-dimission-import
			导出    org-dimission-export
			打印    org-dimission-print


	花名册 	   org-roster				64

		>>花名册
			搜索    org-roster-search
			筛选    org-roster-filter
			列选    org-roster-column
			编辑    org-roster-edit

			导入 	org-roster-import
			导出 	org-roster-export
			打印 	org-roster-print

			批量转正按钮【link】
			批量异动按钮【link】
			批量离职按钮【link】
			批量黑名单按钮【link】

	黑名单     org-blacklist			65


		>>黑名单

			批量黑名单按钮【link】org-blacklist-batchAdd

			搜索    org-blacklist-search
			筛选    org-blacklist-filter
			添加    org-blacklist-add
			修改    org-blacklist-edit
			删除    org-blacklist-del
			导入    org-blacklist-import
			导出    org-blacklist-export
			打印    org-blacklist-print


	// 按钮


	>>宿舍  org-dormitory

			搜索    org-dormitory-search
			添加    org-dormitory-add
			修改    org-dormitory-edit
			删除    org-dormitory-del
			导入    org-dormitory-import
			导出    org-dormitory-export
			打印    org-dormitory-print

	>>区域管理 	org-area

		添加同级区域   	org-area-addBrother
		添加子区域   	org-area-addChildren
		修改关联信息   	org-area-edit
		删除  		 	org-area-del

		添加下级门店【link】


	>>门店     org-store

		添加 			org-store-add
		修改关联信息 	org-store-edit
		删除 			org-store-del

	>>门店小组 org-team

		添加小组 		org-team-add
		修改关联信息 	org-team-edit
		删除 			org-team-del

	>>品牌 org-brand
		添加品牌		org-brand-add
		修改关联信息	org-brand-edit
		删除			org-brand-del

排班  schedule 							-9

	部门排班   schedule-department 		54
	服务组排班 schedule-service 		55
	管理组排班 schedule-manager 		56

	>>排班菜单

		提审			schedule-menu-apply
		班次			schedule-menu-workClass
		修改记录		schedule-menu-editHistory
		预估人数导入	schedule-menu-import
		导出排班表		schedule-menu-export
		打印排班表		schedule-menu-print

	>>班次    schedule-menu-workClass
		编辑班次  schedule-menu-workClass-edit
		删除班次  schedule-menu-workClass-del
		添加班次  schedule-menu-workClass-add


考勤 									-10

	日考勤 attendance-day 				66
	月考勤 attendance-month 			67


规则配置 config  						-11

	系统设置 config-system 				68
	排班规则 config-schedule  			69

