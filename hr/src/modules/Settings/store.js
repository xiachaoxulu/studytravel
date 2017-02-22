/**
 * @Created Date       : 2016-12-05T17:55:04+08:00
 * @Last Modified time : 2016-12-26T17:47:33+08:00
 */



import Vue from 'vue';
const Tool = Vue.tool;

// VUEX
// flux view>actions>mutations>state>view

// 数据、状态
const state = {
  /* 公用数据*/
  commonData: {
    orgWithTeam: {}, // 组织数据
    orgNoTeam: {}, // 组织数据，不包含小组
    postTree: {}, // 岗位数
    codeBus: [], // 业务类型
  },


  //系统配置操作列表
  systemConfigs: [],

  // 岗位树
  postList: [],
  postTree: {},

  //组织树
  orgComboTree: [],
  orgDisplayName: [],
  orgDisplayID: [],
  //树结构原始数据
  firsthandTreeData: [],

  ruleData: {
    ruleName: '',
    orgName: '',
    stateName: '',
    detailList: [],
  },
  ruleList: [],

  // 排班设置
  scheduleConfig: {

    ID: '',

    // 排班周期
    managePeriod: '',
    servicePeriod: '',
    departmentPeriod: '',

    acrossDayClasses: '',

    // 应休天数
    manageRest: '',
    serviceRest: '',
    departmentRest: '',
  },

  // 薪酬规则
  //职级工资列表
  payRankList: [],
  //岗位工资列表
  payPostList: [],
  payPostMap: {},

  personalTaxRuleList: [{ taxList: [], taxType: {} }, { taxList: [], taxType: {} }],

  /* 工作流数据 */
  orgList: {}, // 组织树
  codeBus: {}, // 业务类型 字典项
  // 工作流审批
  approvalSettingList: [],

  attendanceRuleList: [],

}

// 数据修改
const mutations = {

    /* 公用数据 字典项等 */
    SetCommonData(key, data) {
      state.commonData[key] = data;
    },

    SetSystemConfigs(data) {
      state.systemConfigs = data;
    },

    SetScheduleConfig(data) {

      for (var i in state.scheduleConfig) {

        state.scheduleConfig[i] = data[i];

      }

    },

    SetPostList(list) {
      state.postList = list;
    },
    SetPostTree(tree) {
      state.postTree = tree;
    },

    SetAttendanceRuleList(list) {
      state.attendanceRuleList = list;
    },

    SetPersonalTaxRuleList(list) {
      state.personalTaxRuleList = list;
    },

    //设置职级工资列表数据
    SetPayRankList(data) {
      state.payRankList = data;
    },
    //设置岗位工资列表数据
    SetPayPostList(data) {
      state.payPostList = data;

      let postMap = {};

      // 职位 岗位 归类
      data.forEach(post => {

        if (!postMap['p_' + post.positionID]) {
          postMap['p_' + post.positionID] = [];
        }
        postMap['p_' + post.positionID].push(post);

      })

      state.payPostMap = postMap;

    },

    // 审批设置列表数据
    SetApprovalSettingList(lst) {
      state.approvalSettingList = lst;
    },
    //combo 组织树
    SetComboTree(data) {
      state.orgDisplayName = [];
      state.orgDisplayID = [];

      // this.setOrgChartTreeRecursion(data);
      state.orgComboTree = data;
    },
    //设置门店部门组织树所选择的值
    setOrgDisplayName(data) {
      state.orgDisplayName = [];
      state.orgDisplayID = [];
      for (var i = 0; i < data.length; i++) {
        state.orgDisplayName.$set(state.orgDisplayName.length, data[i].text);
        state.orgDisplayID.$set(state.orgDisplayID.length, data[i].organizeID);
      }
    },
    setEmployeeNumberRuleList(data) {
      state.ruleList = data;
    }

  }
  // 操作
const actions = {
  /*公用方法*/

  // 加载字典项
  getSystemCode(key, code, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Settings.getSystemConfigData',
      data: {
        defintionCode: code,
      },
      success(data, res) {
        mutations.SetCommonData(key, data);
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },

  // 根据code获取字典项名字
  getNameInDataBook(name, code) {

    let data = state.commonData[name] || [];
    return data.filter(item => {
      if (item.code == code) return item.codeName;
    })

  },

  // 加载组织信息不包含小组
  loadOrgListTreeNotTeam(cbSuccess, cbError) {
    var deptPromise = new Promise((resolve, reject) => {
      Tool.ajax({
        url: 'api.Permission.selectDepartment',
        success(deptData, res) {
          resolve(deptData);
        },
        error(res) {
          reject(res);
        }
      });
    });
    var storePromise = new Promise((resolve, reject) => {
      Tool.ajax({
        url: 'api.Permission.selectStore',
        success(storeData, res) {
          resolve(storeData);
        },
        error(res) {
          reject(res);
        }
      });
    });

    Promise.all([deptPromise, storePromise]).then((val) => {
      var deptData = val[0];
      var storeData = val[1];
      if (Array.isArray(storeData)) {
        storeData.forEach(function(elem) {
          elem.nodeType = "store";
          elem.text = elem.storeName;
        });
      }
      if (Array.isArray(deptData)) {
        deptData.forEach(function(elem) {
          elem.nodeType = "department";
          elem.expanded = false;
          elem.text = elem.departmentName;
          if (Array.isArray(storeData)) {
            var childrenButton = storeData.filter(function(item) {
              return item.deptID == elem.ID;
            });
            elem.children = [];
            childrenButton.forEach(function(item) {
              elem.children.push(item);
            });
          }
        });
      }


      // var treeData = Tool.convertToTree(deptData, 'deptID');
      var treeData2 = Tool.convertToTree(deptData)
      var root = {
        ID: -1,
        departmentName: '组织架构',
        children: [],
        expanded: true
      };
      treeData2.forEach(function(item) {
        item.expanded = true;
        root.children.push(item);
      });


      // 处理没有挂载在部门的 store
      if (Array.isArray(storeData)) {
        storeData.forEach((elem) => {
          if (!elem.nodeType) {
            elem.text = elem.storeName;
            root.children.push(elem);
          }
        });
      }
      if (cbSuccess) cbSuccess(root);
    }).catch((e) => {
      if (cbError) cbError(e);
    });
  },

  // 加载岗位树
  loadCommonPostTree(cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.getPostTree',
      success(data, res) {
        var postTree = Tool.convertToTree(data.concat([]));
        var rootTree = {
          ID: -1,
          postName: '岗位树',
          expanded: true,
          children: []
        };
        postTree.forEach((elem) => {
          Vue.set(elem, 'expanded', true);
          rootTree.children.push(elem);
        });
        cbSuccess && cbSuccess(rootTree);
      },
      error(res) {
        cbError && cbError(res);
      }
    });
  },

  /****************** 排班设置 ******************/
  // 获取排班设置
  getScheduleConfig() {
    Tool.ajax({
      url: 'api.Settings.getScheduleConfig',
      success(data, res) {
        mutations.SetScheduleConfig(data);
      },
      error(res) {
        Vue.Tool.showTip({
          type: 'error',
          msg: res
        })
      }
    });
  },
  // 提交排班设置
  putScheduleConfig(success, failed) {

    let data = state.scheduleConfig;

    Tool.ajax({
      url: 'api.Settings.putScheduleConfig',
      data: data,
      success(data, res) {
        success();
      },
      error(res) {
        failed(res);
      }
    });

  },

  //******************系统设置模块*****************
  //不分页查询系统设置等数据
  findSystemConfig(activeValue, key, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Settings.getSystemConfigData',
      data: {
        defintionCode: activeValue,
        // key: key
      },
      success(data, res) {
        mutations.SetSystemConfigs(data);
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  //不分页查询系统设置等数据
  findSystemConfigNotKey(activeValue, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Settings.getSystemConfigData',
      data: {
        defintionCode: activeValue,
      },
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  //新增或者修改系统配置数据项内容,根据id 是否有值判断是添加操作还是修改操作
  addOrUpdateSystemConfig(code, itemorder, content, cbSuccess, cbError, id) {

    var data = {};
    var url = "";
    data.defintionCode = code;
    data.codeName = content;
    // data.code = itemcode;
    data.orderNum = itemorder;
    if (id !== undefined) {
      //修改操作
      data.ID = id;
      url = 'api.Settings.updateSystemConfig';
    } else {
      url = 'api.Settings.addSystemConfig';
    }
    Tool.ajax({
      url: url,
      data: data,
      success(refdata, res) {
        actions.findSystemConfig(code, '');
        if (cbSuccess) cbSuccess(refdata);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  //删除系统配置内容项
  deleteSystemConfig(ids, code, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Settings.deleteSystemConfig',
      data: {
        IDs: JSON.stringify(ids)
      },
      success(data, res) {
        actions.findSystemConfig(code, '');
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },

  loadPersonalTaxRuleList(cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Settings.selectPersonalTaxRule',
      success(data, res) {
        mutations.SetPersonalTaxRuleList(data);
        cbSuccess && cbSuccess(data);
      },
      error(res) { cbError && cbError(res); }
    });
  },


  loadDeptStoreTree(cbSuccess, cbError) {
    var deptPromise = new Promise((resolve, reject) => {
      Tool.ajax({
        url: 'api.Permission.selectDepartment',
        success(deptData, res) {
          resolve(deptData);
        },
        error(res) {
          reject(res);
        }
      });
    });
    var storePromise = new Promise((resolve, reject) => {
      Tool.ajax({
        url: 'api.Permission.selectStore',
        success(storeData, res) {
          resolve(storeData);
        },
        error(res) {
          reject(res);
        }
      });
    });

    var teamPromise = new Promise((resolve, reject) => {
      Tool.ajax({
        url: 'api.OrgEmployee.getAllStoreTeam',
        success(teamData, res) {
          resolve(teamData);
        },
        error(res) {
          reject(res);
        }
      });
    });
    Promise.all([deptPromise, storePromise, teamPromise]).then((val) => {
      var deptData = val[0];
      var storeData = val[1];
      var teamData = val[2];

      if (Array.isArray(teamData)) {
        teamData.forEach(function(elem) {
          elem.nodeType = "team";
          elem.text = elem.teamName;

        });
      }
      if (Array.isArray(storeData)) {
        storeData.forEach(function(elem) {
          if (Array.isArray(teamData)) {
            var childrenButton = teamData.filter(function(item) {
              return item.storeID == elem.ID;
            });
            elem.children = [];
            childrenButton.forEach(function(item) {
              elem.children.push(item);
            });
          }
        });
      }
      if (Array.isArray(deptData)) {
        deptData.forEach(function(elem) {
          elem.nodeType = "department";
          elem.expanded = false;
          elem.text = elem.departmentName;
          if (Array.isArray(storeData)) {
            var childrenButton = storeData.filter(function(item) {
              return item.deptID == elem.ID;
            });
            elem.children = [];
            childrenButton.forEach(function(item) {
              item.nodeType = "store";
              item.text = item.storeName;
              elem.children.push(item);
            });
          }
        });
      }
      // var treeData = Tool.convertToTree(deptData, 'deptID');
      var treeData2 = Tool.convertToTree(deptData)
      var root = { ID: -1, pageName: '组织树', children: [], expanded: true };
      treeData2.forEach(function(item) {
        item.expanded = true;
        root.children.push(item);
      });

      // 处理没有挂载在部门的 store
      if (Array.isArray(storeData)) {
        storeData.forEach((elem) => {
          if (!elem.nodeType) {
            elem.text = elem.storeName;
            root.children.push(elem);
          }
        });
      }
      if (cbSuccess) cbSuccess(root);
    }).catch((e) => {
      if (cbError) cbError(e);
    });
  },
  loadPostTreeByOrgIDs(orgID, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.getPostTree2',
      data: {
        posts: JSON.stringify(orgID)
      },
      success(data, res) {
        cbSuccess && cbSuccess(data);
      },
      error(res) {
        cbError && cbError(res);
      }
    });
  },


  getAllYearRuleList(cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Settings.getYearRuleList',
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  insertYearRule(data, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Settings.insertYearRule',
      data: data,
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  updateYearRule(data, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Settings.updateYearRule',
      data: data,
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  getOneYearRule(ID, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Settings.getOneYearRule',
      data: {
        Id: ID
      },
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  deleteYearRule(ids, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Settings.deleteYearRule',
      data: {
        IDs: JSON.stringify(ids),
        type: 'year'
      },
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  //添加其他规则
  insertOtherRule(data, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Settings.insertOtherRule',
      data: data,
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  //删除其他规则
  deleteOtherRule(ids, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Settings.deleteOtherRule',
      data: {
        IDs: JSON.stringify(ids),
        type: 'other'
      },
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  getOneOtherRule(ID, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Settings.getOneOtherRule',
      data: {
        Id: ID
      },
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  updateOtherRule(data, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Settings.updateOtherRule',
      data: data,
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  copyYearRule(data, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Settings.copyYearRule',
      data: data,
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },

  /* 考勤 */
  loadPostTree(cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.getPostTree',
      success(data, res) {
        mutations.SetPostList(data);
        var postTree = Tool.convertToTree(data.concat([]));
        var rootTree = {
          ID: -1,
          postName: '岗位树',
          expanded: true,
          children: []
        };
        postTree.forEach((elem) => {
          Vue.set(elem, 'expanded', true);
          rootTree.children.push(elem);
        });
        mutations.SetPostTree(rootTree);
        cbSuccess && cbSuccess(data);
      },
      error(res) {
        cbError && cbError(res);
      }
    });
  },
  addAttendanceRule(rule, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Settings.addAttendanceRule',
      data: rule,
      success(data, res) {
        cbSuccess && cbSuccess(data);
      },
      error(res) {
        cbError && cbError(res);
      }
    });
  },
  editAttendanceRule(rule, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Settings.editAttendanceRule',
      data: rule,
      success(data, res) {
        cbSuccess && cbSuccess(data);
      },
      error(res) {
        cbError && cbError(res);
      }
    });
  },
  removeAttendanceRuleList(ids, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Settings.removeAttendanceRuleList',
      data: {
        IDs: JSON.stringify(ids)
      },
      success(data, res) {
        cbSuccess && cbSuccess(data);
      },
      error(res) {
        cbError && cbError(res);
      }
    });
  },
  validAttendanceRuleList(data, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Settings.validAttendanceRule',
      data: data,
      success(data, res) {
        cbSuccess && cbSuccess(data);
      },
      error(res) {
        cbError && cbError(res);
      }
    });
  },
  getAttendanceRuleList(conditions, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Settings.getAttendanceRuleList',
      data: conditions,
      success(data, res) {
        mutations.SetAttendanceRuleList(data);
        console.log(data);
        cbSuccess && cbSuccess(data);
      },
      error(res) {
        cbError && cbError(res);
      }
    });
  },
  getAttendanceRuleByID(id, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Settings.getAttendanceRuleByID',
      data: {
        ID: id
      },
      success(data, res) {
        cbSuccess && cbSuccess(data);
      },
      error(res) {
        cbError && cbError(res);
      }
    });
  },
  loadHolidayByCheckworkRuleID(cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Settings.selectHolidayByCheckworkRuleID',
      success(data, res) { cbSuccess && cbSuccess(data); },
      error(res) { cbError && cbError(res); }
    });
  },
  getEmployeeByPostID(id, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Settings.getEmployeeByPostID',
      data: {
        postID: id
      },
      success(data, res) {
        cbSuccess && cbSuccess(data);
      },
      error(res) {
        cbError && cbError(res);
      }
    });
  },


  validator(data, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Settings.validatorYearRule',
      data: {
        formulatext: data
      },
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },



  //员工扩展字段
  getOneExtendEmpoyeeColumn(data, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Settings.getOneExtendEmployeeColumn',
      data: data,
      success(data, res) {
        cbSuccess && cbSuccess(data);
      },
      error(res) {
        cbError && cbError(res);
      }
    });
  },
  addExtendEmployeeColumn(data, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Settings.addExtendEmployeeColumn',
      data: data,
      success(data, res) {
        cbSuccess && cbSuccess(data);
      },
      error(res) {
        cbError && cbError(res);
      }
    });
  },
  deleteExtends(data, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Settings.deleteExtends',
      data: {
        ids: JSON.stringify(data)
      },
      success(data, res) {
        cbSuccess && cbSuccess(data);
      },
      error(res) {
        cbError && cbError(res);
      }
    });
  },
  updateExtendEmployee(data, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Settings.updateExtendEmployee',
      data: data,
      success(data, res) {
        cbSuccess && cbSuccess(data);
      },
      error(res) {
        cbError && cbError(res);
      }
    });
  },

  updateMachine(data, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Settings.updateMachine',
      data: data,
      success(data, res) {
        cbSuccess && cbSuccess(data);
      },
      error(res) {
        cbError && cbError(res);
      }
    });
  },
  addAttendanceMachine(data, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Settings.addAttendanceMachine',
      data: data,
      success(data, res) {
        cbSuccess && cbSuccess(data);
      },
      error(res) {
        cbError && cbError(res);
      }
    });
  },
  getOneMachine(data, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Settings.getOneMachine',
      data: data,
      success(data, res) {
        cbSuccess && cbSuccess(data);
      },
      error(res) {
        cbError && cbError(res);
      }
    });
  },

  deleteMachines(data, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Settings.deleteMachines',
      data: {
        IDs: JSON.stringify(data)
      },
      success(data, res) {
        cbSuccess && cbSuccess(data);
      },
      error(res) {
        cbError && cbError(res);
      }
    });
  },

  commandSend(data, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Settings.selectuserinfobysnpin',
      data: data,
      success(data, res) {
        cbSuccess && cbSuccess(data);
      },
      error(res) {
        cbError && cbError(res);
      }
    });
  },

  loadOrgListTree(cbSuccess, cbError) {

    var deptPromise = new Promise((resolve, reject) => {
      Tool.ajax({
        url: 'api.Permission.selectDepartment',
        success(deptData, res) {
          resolve(deptData);
        },
        error(res) {
          reject(res);
        }
      });
    });
    var storePromise = new Promise((resolve, reject) => {
      Tool.ajax({
        url: 'api.Permission.selectStore',
        success(storeData, res) {
          resolve(storeData);
        },
        error(res) {
          reject(res);
        }
      });
    });
    var teamPromise = new Promise((resolve, reject) => {
      Tool.ajax({
        url: 'api.OrgEmployee.getAllStoreTeam',
        success(teamData, res) {
          resolve(teamData);
        },
        error(res) {
          reject(res);
        }
      });
    });
    Promise.all([deptPromise, storePromise, teamPromise]).then((val) => {
      var deptData = val[0];
      var storeData = val[1];
      var teamData = val[2];

      //      var deptData2 = val[0];
      //     var storeData2 = val[1];
      //     var teamData2 = val[2];

      // var tempData=deptData2.concat(storeData2);
      // state.firsthandTreeData = teamData2.concat(tempData);

      if (Array.isArray(teamData)) {
        teamData.forEach(function(elem) {
          // state.firsthandTreeData.push(elem);
          elem.nodeType = "team";
          elem.text = elem.teamName;

        });
      }
      if (Array.isArray(storeData)) {
        storeData.forEach(function(elem) {
          // state.firsthandTreeData.push(elem);
          if (Array.isArray(teamData)) {
            var childrenButton = teamData.filter(function(item) {
              return item.storeID == elem.ID;
            });
            elem.children = [];
            childrenButton.forEach(function(item) {
              elem.children.push(item);
            });
          }
        });
      }
      if (Array.isArray(deptData)) {
        deptData.forEach(function(elem) {
          // state.firsthandTreeData.push(elem);
          elem.nodeType = "department";
          elem.expanded = false;
          elem.text = elem.departmentName;
          if (Array.isArray(storeData)) {
            var childrenButton = storeData.filter(function(item) {
              return item.deptID == elem.ID;
            });
            elem.children = [];
            childrenButton.forEach(function(item) {
              item.nodeType = "store";
              item.text = item.storeName;
              elem.children.push(item);
            });
          }
        });
      }
      // var treeData = Tool.convertToTree(deptData, 'deptID');
      var treeData2 = Tool.convertToTree(deptData)
      var root = { ID: -1, pageName: '组织树', children: [], expanded: true };
      treeData2.forEach(function(item) {
        item.expanded = true;
        root.children.push(item);
      });

      // 处理没有挂载在部门的 store
      if (Array.isArray(storeData)) {
        storeData.forEach((elem) => {
          if (!elem.nodeType) {
            elem.text = elem.storeName;
            root.children.push(elem);
          }
        });
      }
      mutations.SetComboTree(root);
      if (cbSuccess) cbSuccess(root);
    }).catch((e) => {
      if (cbError) cbError(e);
    });
  },

  /******************************** 薪酬规则 ********************************/
  // 查询职级工资
  loadPayRank(successed) {
    Tool.ajax({
      url: 'api.Settings.payrankSelectall',
      data: '',
      success(data, res) {

        mutations.SetPayRankList(data);
        successed && successed();
      },
      error(res) {

      }
    })
  },
  loadPayPost(successed) {
    Tool.ajax({
      url: 'api.Settings.paypostSelectall',
      data: '',
      success(data, res) {
        console.log(data);
        mutations.SetPayPostList(data);
        successed && successed();
      },
      error(res) {

      }
    })
  },

  //保存职级工资
  savePayRank(successed) {
    var params = [];
    state.payRankList.forEach((item) => {
      params.push({
        ID: item.ID,
        rankID: item.rankID,
        salary: item.salary
      });
    });
    Tool.ajax({
      url: 'api.Settings.payrankUpdate',
      data: '&payRankPojoListStr=' + JSON.stringify(params),
      success(data, res) {
        Vue.tool.showTip({
          type: 'success', // 提示类型 success,warning,info,danger
          msg: res.data.err_msg, // 提示文字
          duration: 1000 // 自动消失时间
        });

        actions.loadPayRank(successed);


      },
      error(res) {

      }
    });

  },
  savePayPost(successed) {
    var params = [];
    state.payPostList.forEach((item) => {
      params.push({
        ID: item.ID,
        postID: item.postID,
        salary: item.salary
      });
    });
    Tool.ajax({
      url: 'api.Settings.paypostUpdate',
      data: '&payPostPojoListStr=' + JSON.stringify(params),
      success(data, res) {
        Vue.tool.showTip({
          type: 'success', // 提示类型 success,warning,info,danger
          msg: res.data.err_msg, // 提示文字
          duration: 1000 // 自动消失时间
        });

        actions.loadPayPost(successed);
      },
      error(res) {

      }
    });
  },
  //开启岗位工资
  changePayPostState(val) {
    var params = {};
    if (val) {
      params.isOpen = 1;
    } else {
      params.isOpen = 0;
    }
    params.item = 'post';
    Tool.ajax({
      url: 'api.Settings.payruleInsert',
      data: params,
      success(data, res) {
        Vue.tool.showTip({
          type: 'success', // 提示类型 success,warning,info,danger
          msg: res.data.err_msg, // 提示文字
          duration: 1000 // 自动消失时间
        });
      },
      error(res) {

      }
    });
  },
  //开启职级工资
  changePayRankState(val) {
    var params = {};
    if (val) {
      params.isOpen = 1;
    } else {
      params.isOpen = 0;
    }
    params.item = 'rank';
    Tool.ajax({
      url: 'api.Settings.payruleInsert',
      data: params,
      success(data, res) {
        Vue.tool.showTip({
          type: 'success', // 提示类型 success,warning,info,danger
          msg: res.data.err_msg, // 提示文字
          duration: 1000 // 自动消失时间
        });
      },
      error(res) {

      }
    });
  },
  //查询职级工资开启状态
  loadPayRankState(cbSuccess) {
    Tool.ajax({
      url: 'api.Settings.payruleSelectall',
      data: '&item=rank',
      success(data, res) {
        cbSuccess(data);
      },
      error(res) {

      }
    });
  },
  loadPayPostState(cbSuccess) {
    Tool.ajax({
      url: 'api.Settings.payruleSelectall',
      data: '&item=post',
      success(data, res) {
        cbSuccess(data);
      },
      error(res) {

      }
    });
  },
  // 导入岗位工资数据
  importPostData(data, successed, failed) {

    Tool.ajax({
      url: 'api.Settings.importPostData',
      data: data,
      success(data, res) {

        successed && successed(data);
      },
      error(err_msg) {
        failed && failed(err_msg);
      }
    });

  },



  // 导入职级工资数据
  importRankData(data, successed, failed) {

    Tool.ajax({
      url: 'api.Settings.importRankData',
      data: data,
      success(data, res) {
        successed && successed(data);
      },
      error(err_msg) {
        failed && failed(err_msg);
      }
    });

  },

  /*************** 工作流列表 *************/
  loadApprovalSettingList(cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Settings.getApprovalSettingList',
      success(data, res) {
        mutations.SetApprovalSettingList(data);
        cbSuccess && cbSuccess(data);
      },
      error(res) {
        cbError && cbError(res);
      }
    });
  },

  validApprovalSetting(id, valid, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Settings.validApprovalSetting',
      data: {
        ID: id,
        valid: valid
      },
      success(data, res) {
        cbSuccess && cbSuccess(data);
      },
      error(res) {
        cbError && cbError(res);
      }
    });
  },

  /**************************** 工作流配置 *********************************/
  /* 根据ID查询工作流数据 */
  getWorkflowByID(ID, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Settings.getWorkflowByID',
      data: {
        id: ID
      },
      success(data, res) {
        cbSuccess && cbSuccess(data);
      },
      error(res) {
        cbError && cbError(res);
        Tool.showTip({
          type: 'error',
          msg: res
        })
      }
    });
  },

  /* 根据ID添加修改工作流 */
  updateWorkflowByID(data, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Settings.updateWorkflowByID',
      data: data,
      success(data, res) {
        cbSuccess && cbSuccess(data);
      },
      error(res) {
        cbError && cbError(res);
        Tool.showTip({
          type: 'error',
          msg: res
        })
      }
    });
  },

  /* 根据ID删除工作流 */
  deleteWorkflowByID(ID, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Settings.deleteWorkflowByID',
      data: {
        id: ID
      },
      success(data, res) {
        cbSuccess && cbSuccess(data);
      },
      error(res) {
        cbError && cbError(res);
        Tool.showTip({
          type: 'error',
          msg: res
        })
      }
    });
  },

  /* 加载业务可选字段 */
  loadConditionsFieldsByBus(busCode, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Settings.loadConditionsFieldsByBus',
      data: {
        fieldCode: busCode
      },
      success(data, res) {
        cbSuccess && cbSuccess(data);
      },
      error(res) {
        cbError && cbError(res);
        Tool.showTip({
          type: 'error',
          msg: res
        })
      }
    });
  },

  /* 根据分支条件字段类型加载数据 */
  loadConditionsFieldData(fieldCode, fieldType, codeID, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Settings.loadConditionsFieldData',
      data: {
        // lableEn: fieldCode,
        parentId: codeID,
        fieldType: fieldType
      },
      success(data, res) {
        cbSuccess && cbSuccess(data);
      },
      error(res) {
        cbError && cbError(res);
        Tool.showTip({
          type: 'error',
          msg: res
        })
      }
    });
  },

  /**************************** 表必填项设置 *********************************/

  getSyncData(cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Settings.getSyncData',
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  getTableInfo(cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Settings.getTableInfo',
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  getTableColumnInfo(data, cbSuccess, cbError) {

    console.log(data);

    Tool.ajax({
      url: 'api.Settings.getTableColumnInfo',
      data: data,
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },

  updateTableColumnInfo(data, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Settings.updateTableColumnInfo',
      data: data,
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  //加载组织树
  // loadOrgListTree(cbSuccess, cbError) {
  //   var deptPromise = new Promise((resolve, reject) => {
  //     Tool.ajax({
  //       url: 'api.Permission.selectDepartment',
  //       success(deptData, res) {
  //         resolve(deptData);
  //       },
  //       error(res) {
  //         reject(res);
  //       }
  //     });
  //   });
  //   var storePromise = new Promise((resolve, reject) => {
  //     Tool.ajax({
  //       url: 'api.Permission.selectStore',
  //       success(storeData, res) {
  //         resolve(storeData);
  //       },
  //       error(res) {
  //         reject(res);
  //       }
  //     });
  //   });
  //   var teamPromise = new Promise((resolve, reject) => {
  //     Tool.ajax({
  //       url: 'api.OrgEmployee.getAllStoreTeam',
  //       success(teamData, res) {
  //         resolve(teamData);
  //       },
  //       error(res) {
  //         reject(res);
  //       }
  //     });
  //   });
  //   Promise.all([deptPromise, storePromise, teamPromise]).then((val) => {
  //     var deptData = val[0];
  //     var storeData = val[1];
  //     var teamData = val[2];

  //     var tempData=deptData.concat(storeData);
  //     state.firsthandTreeData = teamData.concat(tempData);

  //     if (Array.isArray(teamData)) {
  //       teamData.forEach(function(elem) {
  //         elem.nodeType = "team";
  //         elem.text = elem.teamName;

  //       });
  //     }
  //     if (Array.isArray(storeData)) {
  //       storeData.forEach(function(elem) {
  //         if (Array.isArray(teamData)) {
  //           var childrenButton = teamData.filter(function(item) {
  //             return item.storeID == elem.ID;
  //           });
  //           elem.children = [];
  //           childrenButton.forEach(function(item) {
  //             elem.children.push(item);
  //           });
  //         }
  //       });
  //     }
  //     if (Array.isArray(deptData)) {
  //       deptData.forEach(function(elem) {
  //         elem.nodeType = "department";
  //         elem.expanded = false;
  //         elem.text = elem.departmentName;
  //         if (Array.isArray(storeData)) {
  //           var childrenButton = storeData.filter(function(item) {
  //             return item.deptID == elem.ID;
  //           });
  //           elem.children = [];
  //           childrenButton.forEach(function(item) {
  //             item.nodeType = "store";
  //             item.text = item.storeName;
  //             elem.children.push(item);
  //           });
  //         }
  //       });
  //     }
  //     // var treeData = Tool.convertToTree(deptData, 'deptID');
  //     console.log(JSON.stringify(deptData))
  //     var treeData2 = Tool.convertToTree(deptData)
  //     var root = {
  //       ID: -1,
  //       pageName: '组织树',
  //       children: [],
  //       expanded: true
  //     };
  //     treeData2.forEach(function(item) {
  //       item.expanded = true;
  //       root.children.push(item);
  //     });

  //     // 处理没有挂载在部门的 store
  //     if (Array.isArray(storeData)) {
  //       storeData.forEach((elem) => {
  //         if (!elem.nodeType) {
  //           elem.text = elem.storeName;
  //           root.children.push(elem);
  //         }
  //       });
  //     }
  //     mutations.SetComboTree(root);
  //     if (cbSuccess) cbSuccess(root);
  //   }).catch((e) => {
  //     if (cbError) cbError(e);
  //   });
  // },
  //设置门店部门组织树所选择的值
  setOrgDisplayName(data) {
    mutations.setOrgDisplayName(data);
  },
  //查询工号规则list
  loadEmployeeNumberRuleList() {
    Tool.ajax({
      url: 'api.Settings.selectEmployeeNumberRuleAll',
      data: '',
      success(data, res) {
        mutations.setEmployeeNumberRuleList(data);
      },
      error(res) {

      }
    })
  },
  //查询工号规则详情
  loadEmployeeNumberRule(ID, cbSuccess) {
    var ruleID = {};
    ruleID.ruleID = ID;
    Tool.ajax({
      url: 'api.Settings.selectEmployeeNumberRule',
      data: ruleID,
      success(data, res) {
        cbSuccess(data);
        state.ruleData.ruleName = data.ruleName;
        state.ruleData.orgName = data.orgName;
        state.ruleData.stateName = data.stateName;
        state.ruleData.detailList = data.detailList;
        // mutations.setEmployeeNumberRuleList(data);
      },
      error(res) {
        Vue.tool.showTip({
          type: 'danger', // 提示类型 success,warning,info,danger
          msg: res, // 提示文字
          duration: 1000 // 自动消失时间
        });
      }
    })
  },
  //添加员工工号规则
  addEmployeeNumberRule(ruleID, data, numberRule, cbSuccess) {
    var params = {};
    params.ruleName = data.ruleName;
    params.orgIDs = [];
    params.orgIDs = JSON.stringify(data.orgIDs);
    params.state = [];
    params.state = JSON.stringify(data.state);
    params.numberRule = numberRule;
    var employeeNumRuleDetail = [];
    for (var i = 0; i < data.employeeNumRuleDetail.length; i++) {
      employeeNumRuleDetail.push({
        template: data.employeeNumRuleDetail[i].template,
        type: data.employeeNumRuleDetail[i].type,
        orderNo: i
      })
    }

    params.employeeNumberRuleDetailMSG = {
      employeeNumberRuleDetail: employeeNumRuleDetail
    };
    params.employeeNumberRuleDetailMSG = JSON.stringify(params.employeeNumberRuleDetailMSG);
    if (ruleID) {
      params.ruleID = ruleID;
    }
    Tool.ajax({
      url: 'api.Settings.addEmployeeNumberRule',
      data: params,
      success(data, res) {
        cbSuccess(data)
        Vue.tool.showTip({
          type: 'success', // 提示类型 success,warning,info,danger
          msg: res.data.err_msg, // 提示文字
          duration: 1000 // 自动消失时间
        });
        // mutations.setEmployeeNumberRuleList(data);
      },
      error(res) {
        Vue.tool.showTip({
          type: 'danger', // 提示类型 success,warning,info,danger
          msg: res, // 提示文字
          duration: 1000 // 自动消失时间
        });
      }
    })
  },
  //添加员工工号规则
  updateEmployeeNumberRule(ruleID, data, numberRule, cbSuccess) {
    var params = {};
    params.ruleName = data.ruleName;
    params.orgIDs = [];
    params.orgIDs = JSON.stringify(data.orgIDs);
    params.state = [];
    params.state = JSON.stringify(data.state);
    params.numberRule = numberRule;
    var employeeNumRuleDetail = [];
    for (var i = 0; i < data.employeeNumRuleDetail.length; i++) {
      employeeNumRuleDetail.push({
        template: data.employeeNumRuleDetail[i].template,
        type: data.employeeNumRuleDetail[i].type,
        orderNo: i
      })
    }

    params.employeeNumberRuleDetailMSG = {
      employeeNumberRuleDetail: employeeNumRuleDetail
    };
    params.employeeNumberRuleDetailMSG = JSON.stringify(params.employeeNumberRuleDetailMSG);
    if (ruleID) {
      params.ruleID = ruleID;
    }
    Tool.ajax({
      url: 'api.Settings.updateEmployeeNumberRule',
      data: params,
      success(data, res) {
        cbSuccess(data)
        Vue.tool.showTip({
          type: 'success', // 提示类型 success,warning,info,danger
          msg: res.data.err_msg, // 提示文字
          duration: 1000 // 自动消失时间
        });
        // mutations.setEmployeeNumberRuleList(data);
      },
      error(res) {
        Vue.tool.showTip({
          type: 'danger', // 提示类型 success,warning,info,danger
          msg: res, // 提示文字
          duration: 1000 // 自动消失时间
        });
      }
    })
  },
  deleteEmployeeNumberRule(ID, cbSuccess) {
    var params = {};
    params.ruleID = ID;
    Tool.ajax({
      url: 'api.Settings.deleteEmployeeNumberRule',
      data: params,
      success(data, res) {
        cbSuccess(data)
        Vue.tool.showTip({
          type: 'success', // 提示类型 success,warning,info,danger
          msg: res.data.err_msg, // 提示文字
          duration: 1000 // 自动消失时间
        });
      },
      error(res) {
        Vue.tool.showTip({
          type: 'danger', // 提示类型 success,warning,info,danger
          msg: res, // 提示文字
          duration: 1000 // 自动消失时间
        });
      }
    })
  },
  isCanUpdateEmployeeNumberRule(ID, cbSuccess) {
    var params = {};
    params.ruleID = ID;
    Tool.ajax({
      url: 'api.Settings.isCanUpdateEmployeeNumberRule',
      data: params,
      success(data, res) {
        cbSuccess(data)
      },
      error(res) {
        Vue.tool.showTip({
          type: 'danger', // 提示类型 success,warning,info,danger
          msg: res, // 提示文字
          duration: 1000 // 自动消失时间
        });
      }
    })
  },
  checkedOrgComboTree(IDs) {
    // console.log(IDs);
    // state.firsthandTreeData.forEach(item => {
    //   IDs.forEach(i => {
    //     if (item.organizeID == i) {
    //       item.checked=true;
    //       console.log(item);
    //     }
    //   })
    // })
  },


}

export default {
  state,
  mutations,
  actions
};
