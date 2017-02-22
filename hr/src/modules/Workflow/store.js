import Vue from 'vue';
const Tool = Vue.tool;

// VUEX
// flux view>actions>mutations>state>view

// 数据、状态
const state = {
  commonData: {
    EmployeeType: [],
    BizType: [],
    WorkflowStatus: []
  },
  approvalPendingList: [],
  orgTree: [],
  searchParams: {
    userName: null
  },
  approvalTabIdx: 0
};

// 数据修改
const mutations = {
  SetCommonData(key, data) {
    state.commonData[key] = data;
  },
  SetApprovalPendingList(lst) {
    if (!Array.isArray(lst)) lst = [];
    state.approvalPendingList = lst;
  },
  SetOrgTree(tree) {
    state.orgTree = tree;
  },
  SetApprovalTabIdx(idx) {
    state.approvalTabIdx = idx;
  }
};

// 操作
const actions = {
  loadApprovalPendingList(cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Workflow.getApprovalPendingList',
      success(data, res) {
        mutations.SetApprovalPendingList(data);
        cbSuccess && cbSuccess(data);
      },
      error(res) {
        cbError && cbError(res);
      }
    });
  },
  approvalResolve(id, msg, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Workflow.approvalResolve',
      data: {
        taskId: id,
        msg: msg
      },
      success(data, res) {
        cbSuccess && cbSuccess(data);
      },
      error(res) {
        cbError && cbError(res);
      }
    });
  },
  approvalReject(id, msg, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Workflow.approvalReject',
      data: {
        taskId: id,
        msg: msg
      },
      success(data, res) {
        cbSuccess && cbSuccess(data);
      },
      error(res) {
        cbError && cbError(res);
      }
    });
  },
  approvalTransfer(id, msg, assigneeID, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Workflow.approvalTransfer',
      data: {
        taskId: id,
        msg: msg,
        assigneeID: assigneeID
      },
      success(data, res) {
        cbSuccess && cbSuccess(data);
      },
      error(res) {
        cbError && cbError(res);
      }
    });
  },
  getSystemCode(key, code, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Workflow.getSystemConfigData',
      data: {
        defintionCode: code
      },
      success(data, res) {
        mutations.SetCommonData(key, data);
        cbSuccess && cbSuccess(data);
      },
      error(res) {
        cbError && cbError(res);
      }
    });
  },
  loadOrgTree(cbSuccess, cbError) {
    // 加载部门
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

    // 加载门店
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
      if (Array.isArray(deptData)) {
        deptData.forEach(function(elem) {
          elem.nodeType = "department";
          Vue.set(elem, 'expanded', true);
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
      mutations.SetOrgTree(root);
      if (cbSuccess) cbSuccess(root);
    }).catch((e) => {
      if (cbError) cbError(e);
    });;
  },
};

const config = {
  EmployeeType: '100000', // 用工类型
  BizType: '147000', // 业务类型
  WorkflowStatus: '150000', // 工作流审批状态
  WorkflowReferAPI: {
    'actovertime': 'api.Workflow.getOvertimeEmployee', // 加班
    'actleave': 'api.Workflow.getVacationEmployee', // 请假
    'employeeEntry': 'api.Workflow.getEntryEmployee', // 入职
    'leaveoffice': 'api.Workflow.getDimissionEmployee', // 离职
    'official': 'api.Workflow.getOfficalEmployee', // 转正
    'transferwork': 'api.Workflow.getTransferEmployee', // 异动
    'actbustrip': 'api.Workflow.getBizTripEmployee' // 出差
  },
  fieldsWorkflow: {
    'actovertime': 'fieldsOvertime', // 加班
    'actleave': 'fieldsVacation', // 请假
    'employeeEntry': 'fieldsEntry', // 入职
    'leaveoffice': 'fieldsDimission', // 离职
    'official': 'fieldsOffical', // 转正
    'transferwork': 'fieldsTransfer', // 异动
    'actbustrip': 'fieldsBizTrip' // 出差
  },
  exportWorkflow: {
    'actovertime': 'exportOvertimeEmployee', // 加班
    'actleave': 'exportVacationEmployee', // 请假
    'employeeEntry': 'exportEntryEmployee', // 入职
    'leaveoffice': 'exportDismissionEmployee', // 离职
    'official': 'exportOfficalEmployee', // 转正
    'transferwork': 'exportTransferEmployee', // 异动
    'actbustrip': 'exportBizTripEmployee' // 出差
  },
  // 审批加班列表字段
  fieldsOvertime: [{
    name: "userName",
    title: "姓名",
    locked: "first",
    width: "100px"
  }, {
    name: "userPost",
    title: "岗位",
    locked: "first",
    width: "200px"
  }, {
    name: "reasonDetails",
    title: "加班原因",
    width: "300px"
  }, {
    name: "duration",
    title: "加班时间",
    formater: function(value, data, index) {
      var tdContent = '从 ' + Tool.iDate(data.startTime, 'yy-mm-dd hh:mm:ss').string +
        '<br/>到 ' + Tool.iDate(data.endTime, 'yy-mm-dd hh:mm:ss').string;
      return tdContent;
    },
    width: "300px"
  }, {
    name: "dayOrHours",
    title: "时长",
    width: "300px"
  }, {
    name: "rq",
    title: "申请时间",
    formater: function(value, data, index) {
      return Tool.iDate(data.rq, 'yy-mm-dd hh:mm:ss').string;
    },
    width: "300px",
    locked: 'last'
  }, {
    name: 'statusName',
    title: '状态',
    width: '100px',
    locked: 'last'
  }],
  // 审批请假列表字段
  fieldsVacation: [{
    name: "userName",
    title: "姓名",
    locked: "first",
    width: "100px"
  }, {
    name: "userPost",
    title: "岗位",
    locked: "first",
    width: "200px"
  }, {
    name: "leaveType",
    title: "假期类型",
    width: "200px"
  }, {
    name: "reasonDetails",
    title: "请假原因",
    width: "200px"
  }, {
    name: "duration",
    title: "请假时间",
    formater: function(value, data, index) {
      var tdContent = '从 ' + Tool.iDate(data.startTime, 'yy-mm-dd hh:mm:ss').string;
      var endTime = data.realBackTime ? data.realBackTime : data.endTime;
      tdContent += '<br/>到 ' + Tool.iDate(endTime, 'yy-mm-dd hh:mm:ss').string;
      return tdContent;
    },
    width: "200px"
  }, {
    name: "dayOrHours",
    title: "时长",
    width: "100px"
  }, {
    name: "rq",
    title: "申请时间",
    formater: function(value, data, index) {
      return Tool.iDate(data.rq, 'yy-mm-dd hh:mm:ss').string;
    },
    width: "200px",
    locked: 'last'
  }, {
    name: 'statusName',
    title: '状态',
    width: '100px',
    locked: 'last'
  }],
  // 审批入职列表字段
  fieldsEntry: [{
    name: 'userNum',
    title: '员工工号',
    width: "100px",
    locked: 'first'
  }, {
    name: 'userName',
    title: '姓名',
    width: "100px",
    locked: 'first'
  }, {
    name: 'checkworkcode',
    title: '考勤卡号',
    width: '150px'
  }, {
    name: 'userTypeName',
    title: '用工类型',
    width: '100px'
  }, {
    name: 'stateName',
    title: '状态',
    width: '100px'
  }, {
    name: 'healthEndTime',
    title: '健康证到期日',
    width: '150px'
  }, {
    name: 'deptName',
    title: '组织',
    width: "200px",
  }, {
    name: 'positionName',
    title: '职位',
    width: "100px"
  }, {
    name: 'postName',
    title: '岗位',
    width: '100px'
  }, {
    name: 'userIDCard',
    title: '证明编号',
    width: '200px'
  }, {
    name: 'birthDay',
    title: '生日',
    width: '200px'
  }, {
    name: 'genderName',
    title: '性别',
    width: '100px'
  }, {
    name: 'nationName',
    title: '民族',
    width: '100px'
  }, {
    name: 'checkWorkNo',
    title: '考勤编号',
    width: '100px'
  }, {
    name: 'checkworkName',
    title: '考勤规则',
    width: '150px'
  }, {
    name: 'hukouAddress',
    title: '户口所在地',
    width: '150px'
  }, {
    name: 'isMarriedName',
    title: '婚姻状况',
    width: '100px'
  }, {
    name: 'mail',
    title: '邮箱',
    width: '200px'
  }, {
    name: 'phone',
    title: '手机号码',
    width: '100px'
  }, {
    name: 'qq',
    title: 'qq',
    width: '100px'
  }, {
    name: 'urgentPerson',
    title: '紧急联系人',
    width: '100px'
  }, {
    name: 'urgentPhone',
    title: '紧急联系人电话',
    width: '130px'
  }, {
    name: 'statusName',
    title: '状态',
    width: '100px',
    locked: 'last'
  }],
  // 审批转正列表字段
  fieldsOffical: [{
    name: 'userNum',
    width: "150px",
    title: '员工工号',
    locked: 'first'
  }, {
    name: 'userName',
    title: '姓名',
    width: "150px",
    locked: 'first'
  }, {
    name: 'ctrl',
    title: '组织',
    formater: function(value, data, index) {
      var org = data.departmentName;
      if (data.storeName) {
        org += "/" + data.storeName;
      }
      if (data.teamName) {
        org += "/" + data.teamName;
      }
      return org;
    },
    width: "200px",
  }, {
    name: 'rzTime',
    title: '入职日期',
    width: "200px"
  }, {
    name: 'startTime',
    title: '生效日期',
    width: "100px"
  }, {
    name: 'reasonName',
    title: '转正原因',
    width: "200px"
  }, {
    name: 'operatorName',
    title: '提交人',
    width: "100px"
  }, {
    name: 'createTime',
    title: '提交日期',
    formater: function(value, data, index) {
      return Tool.iDate(value, 'yy-mm-dd').string;
    },
    width: "200px"
  }, {
    name: 'statusName',
    title: '状态',
    width: '100px',
    locked: 'last'
  }],
  // 审批异动列表字段
  fieldsTransfer: [{
    name: 'userNum',
    width: "150px",
    title: '员工工号',
    locked: 'first'
  }, {
    name: 'userName',
    title: '姓名',
    width: "150px",
    locked: 'first'
  }, 
  // {
  //   name: 'state',
  //   title: '状态',
  //   width: "100px"
  // }, 
  {
    name: 'typeName',
    title: '异动类型',
    width: "100px"
  }, {
    name: 'ctrl',
    title: '原组织',
    formater: function(value, data, index) {
      var org = data.deptName;
      if (data.storeName) {
        org += "/" + data.storeName;
      }
      if (data.teamName) {
        org += "/" + data.teamName;
      }
      return org;
    },
    width: "200px"
  }, {
    name: 'postName',
    title: '原岗位',
    width: "100px"
  }, {
    name: 'rankName',
    title: '原职级',
    width: "100px"
  }, {
    name: 'ctrl1',
    title: '目标组织',
    formater: function(value, data, index) {
      var org = data.toDeptName;
      if (data.toStoreName) {
        org += "/" + data.toStoreName;
      }
      if (data.toTeamName) {
        org += "/" + data.toTeamName;
      }
      return org;
    },
    width: "200px"
  }, {
    name: 'toPostName',
    title: '目标岗位',
    width: "100px"
  }, {
    name: 'toRankName',
    title: '目标职级',
    width: "100px"
  }, {
    name: 'reasionName',
    title: '异动原因',
    width: "200px"
  }, {
    name: 'effectiveTime',
    title: '生效/调出日期',
    width: "200px"
  }, {
    name: 'endTime',
    title: '结束日期',
    width: "200px"
  }, {
    name: 'backTime',
    title: '调回日期',
    width: "200px"
  }, {
    name: 'operatorName',
    title: '提交人',
    width: "100px"
  }, {
    name: 'createTime',
    title: '提交日期',
    formater: function(value, data, index) {
      return Tool.iDate(value, 'yy-mm-dd').string;
    },
    width: "100px"
  }, {
    name: 'statusName',
    title: '状态',
    width: '100px',
    locked: 'last'
  }],
  // 审批离职列表字段
  fieldsDimission: [{
      name: 'userNum',
      width: "150px",
      title: '员工工号',
      locked: 'first'
    }, {
      name: 'userName',
      title: '姓名',
      width: "150px",
      locked: 'first'
    }, {
      name: 'ctrl',
      title: '组织',
      formater: function(value, data, index) {
        var org = data.deptName;
        if (data.storeName) {
          org += "/" + data.storeName;
        }
        if (data.teamName) {
          org += "/" + data.teamName;
        }
        return org;
      },
      width: "200px",
    },
    // {
    //     name: 'state',
    //     title: '状态',
    //     width: "100px"
    // },
    {
      name: 'startTime',
      title: '入职日期',
      formater: function(value, data, index) {
        if (!value) {
          return '';
        }
        return Tool.iDate(value, 'yy-mm-dd').string;
      },
      width: "200px"
    }, {
      name: 'effectTime',
      title: '生效日期',
      width: "100px"
    }, {
      name: 'reasonName',
      title: '离职原因',
      width: "200px"
    }, {
      name: 'operatorName',
      title: '提交人',
      width: "100px"
    }, {
      name: 'createTime',
      title: '提交日期',
      formater: function(value, data, index) {
        return Tool.iDate(value, 'yy-mm-dd').string;
      },
      width: "100px"
    }, {
      name: 'statusName',
      title: '状态',
      width: '100px',
      locked: 'last'
    }
  ],
  // 审批出差列表字段
  fieldsBizTrip: [{
      name: "userName",
      title: "姓名",
      locked: "first"
    }, {
      name: "userPost",
      title: "岗位",
      locked: "first"
    }, {
      name: "actbusType",
      title: "类型"
    }, {
      name: "reasonDetails",
      title: "出差/外出原因"
    }, {
      name: "duration",
      title: "出差/外出时间",
      formater: function(value, data, index) {
        var tdContent = '从 ' + Tool.iDate(data.startTime, 'yy-mm-dd hh:mm:ss').string;
        var endTime = data.realBackTime ? data.realBackTime : data.endTime;
        tdContent += '<br/>到 ' + Tool.iDate(endTime, 'yy-mm-dd hh:mm:ss').string;
        return tdContent;
      }
    }, {
      name: "hourOrDays",
      title: "时长" // 天，小时
    }, {
      name: "startAddr",
      title: "出发地"
    }, {
      name: "towhere",
      title: "目的地"
    },
    // {
    //     name: "applyStatus",
    //     title: "出差申请状态",
    //     formater: function(value, data, index) {
    //         return '<div style="color: #10d083; text-align:center">已申请</div>';
    //     },
    //     locked: 'last',
    //     width: 105
    // },
    // {
    //     name: "backStatus",
    //     title: "出差返回状态",
    //     formater: function(value, data, index) {
    //         return data.realBackTime ? '<div style="color: #10d083; text-align:center">通过</div>' : '<div style="color: #fd6550; text-align:center">审批中</div>';
    //     },
    //     locked: 'last',
    //     width: 105
    // },
    {
      name: 'statusName',
      title: '状态',
      width: '100px',
      locked: 'last'
    }
  ]
};

export default {
  state,
  mutations,
  actions,
  config
}
