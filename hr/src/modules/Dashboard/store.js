import Vue from 'vue';
// VUEX
// flux view>actions>mutations>state>view

// 数据、状态
const state = {
    /* 卡片配置信息 */
    cardConfig: {
      // order: ['cardStore', 'cardAttendance', 'cardWarning', 'cardEmployee', 'cardNotice', 'cardApply', 'cardAgenda', 'cardOther'],
      order: [ /*'cardAttendance', 'cardWarning', 'cardEmployee'*/ ],
      // carePageID:'',
      list: {
        // // 考勤管理
        // 'cardAttendance': {
        //     id: 'cardAttendance', // 卡片id
        //     type:'dataCard',      // 卡片类型： 数据卡片，其他卡片
        //     name: '考勤管理',     // 卡片名
        //     info: '展示考勤异常信息', // 卡片简介
        //     url:'api.Dashboard.getCardDataOfAttendance', // 数据接口
        //     show: true,
        //     itemsOrder: [0, 1],
        //     items: [
        //         {
        //             id: 'noSolveAbnormal', // 数据id
        //             name: '未处理异常(人)', // 数据名
        //             info: '', // 数据简介
        //             show: true,
        //             ctrl: { // 数据操作，一个字段即可
        //                 type:'tab',
        //                 name:'考勤异常',
        //                 link:'/Attendence/dailyWorktime'
        //             }
        //         },
        //         {
        //             id: 'noConfirmAbnormal',
        //             name: '未确认调拨(人)',
        //             info: '',
        //             show: true,
        //             ctrl: {
        //                 type:'link',
        //                 name:'员工异动',
        //                 link:'/OrgEmployee/ByOrg/action_transaction'
        //             }
        //         },
        //         // {
        //         //     id: 'onWorkNumber',
        //         //     name: '实到人数／排班人数',
        //         //     info: '',
        //         //     show: true,
        //         //     ctrl: {
        //         //         type:'tab',
        //         //         name:'考勤',
        //         //         link:'/Attendence/dailyWorktime'
        //         //     }
        //         // },
        //     ],
        //     itmesData:{
        //         'noSolveAbnormal':0,
        //         'noConfirmAbnormal':0,
        //         'onWorkNumber':0,
        //     },
        // },
        // // 店铺运营数据
        // 'cardStore': {
        //     id: 'cardStore',
        //     type:'dataCard',
        //     name: '店铺运营',
        //     info: '展示店铺运营信息',
        //     show: true,
        //     itemsOrder: [0, 1, 2],
        //     items: [
        //         {
        //             id: 'data1',
        //             name: '人力成本(元/天)',
        //             info: '每日薪酬/每日营业额',
        //             show: true
        //         },
        //         {
        //             id: 'data2',
        //             name: '工作效率(桌/时)',
        //             info: '每日服务桌数/每日总共时',
        //             show: true
        //         },
        //         {
        //             id: 'data3',
        //             name: '人均收益(元/时)',
        //             info: '每日薪酬/每日员工总数',
        //             show: true
        //         },
        //     ],
        //     itmesData:{
        //         'data1':0,
        //         'data2':0,
        //         'data3':0,
        //     },
        // },
        // // 预警提示
        // 'cardWarning': {
        //     id: 'cardWarning',
        //     type:'dataCard',
        //     name: '预警提示',
        //     info: '展示预警信息',
        //     url:'api.Dashboard.getCardDataOfWarning',
        //     show: true,
        //     itemsOrder: [0, 1, 2],
        //     items: [
        //         {
        //             id: 'healthCardWarning',
        //             name: '健康证预警(人)',
        //             info: '',
        //             show: true,
        //             ctrl: {
        //                 type: 'link',
        //                 name: '健康证预警',
        //                 link: '/OrgEmployee/ByOrg/action_roster?healthEndTime=30'
        //             }
        //         },
        //         // {
        //         //     id: 'contractWarning',
        //         //     name: '合同预警(人)',
        //         //     info: '',
        //         //     show: true
        //         // },
        //         {
        //             id: 'monthCheckWorkWarning',
        //             name: '月工时预警(人)',
        //             info: '',
        //             show: true
        //         },
        //         {
        //             id: 'dayCheckWorkWarning',
        //             name: '日工时预警(人)',
        //             info: '',
        //             show: true
        //         },
        //     ],
        //     itmesData:{

        //         'healthCardWarning':0,
        //         'contractWarning':0,
        //         'monthCheckWorkWarning':0,
        //         'dayCheckWorkWarning':0,

        //     },
        // },
        // // 员工状态
        // 'cardEmployee': {
        //     id: 'cardEmployee',
        //     type:'dataCard',
        //     name: '员工状态',
        //     info: '展示员工状态信息',
        //     url:'api.Dashboard.getCardDataOfEmployee',
        //     show: true,
        //     itemsOrder: [0, 1, 2],
        //     items: [
        //         {
        //             id: 'stayPositive',
        //             name: '待转正(人)',
        //             info: '',
        //             show: true,
        //             ctrl: {
        //                 type:'link',
        //                 name:'待转正',
        //                 link: '/OrgEmployee/ByOrg/action_office'
        //             }
        //         },
        //         {
        //             id: 'tobePromoted',
        //             name: '待晋升(人)',
        //             info: '',
        //             show: true,
        //             ctrl: {
        //                 type:'link',
        //                 name:'待晋升',
        //                 link: '/OrgEmployee/ByOrg/action_transaction'
        //             }
        //         },
        //         {
        //             id: 'applyLeaveOffice',
        //             name: '离职申请(人)',
        //             info: '',
        //             show: true,
        //             ctrl: {
        //                 type:'link',
        //                 name:'离职申请',
        //                 link: '/OrgEmployee/ByOrg/action_dimission'
        //             }
        //         },
        //     ],
        //     itmesData:{

        //         'stayPositive':0,
        //         'tobePromoted':0,
        //         'applyLeaveOffice':0,

        //     },
        // },
        // // 通知
        // 'cardNotice': {
        //     id: 'cardNotice',
        //     name: '公告',
        //     info: '展示公告信息',
        //     show: true,
        //     itemsOrder: [],
        //     items: [],
        //     itmesData:{},
        // },
        // // 申请
        // 'cardApply': {
        //     id: 'cardApply',
        //     name: '审批',
        //     info: '展示审批信息',
        //     show: true,
        //     itemsOrder: [],
        //     items: [],
        //     itmesData:{},
        // },
        // // 日程
        // 'cardAgenda': {
        //     id: 'cardAgenda',
        //     name: '日程',
        //     info: '展示日程信息',
        //     show: true,
        //     itemsOrder: [],
        //     items: [],
        //     itmesData:{},
        // },
        // // 其他
        // 'cardOther': {
        //     id: 'cardOther',
        //     name: '其他',
        //     info: '展示公告信息',
        //     show: true,
        //     itemsOrder: [],
        //     items: [],
        //     itmesData:{},
        // },

      }

    },
    cardList: {},

    approvalPendingCount: {
        pendingRecentCount: 0,
        pendingSumCount: 0
    },

  }
  // 数据修改
const mutations = {

    // 获取卡片排序
    getCardsOrder(data) {

      console.log(data)

      let order = [];

      for (let key in data) {
        let card = data[key];

        if (card.orderNum - 0 == -1) {
          order.push(card.id);
        } else {

          if (!!order[card.orderNum - 0]) {
            order.push(card.id);
          } else {
            order[card.orderNum - 0] = card.id;
          }

        }

      }

      // 过滤空值
      order = order.filter(cardID => {
        return !!cardID;
      })

      return order;

    },

    // 获取卡片数据排序
    getItemsOrder(item) {


      if (!item.cardDetailPojoList) return [];

      let order = [];

      item.cardDetailPojoList.forEach(item => {

        // if(item.isShow-0==1){
        if (item.orderNum - 0 == -1) {
          order.push(item.name);
        } else {

          if (!!order[item.orderNum - 0]) {
            order.push(item.name);
          } else {
            order[item.orderNum - 0] = item.name;
          }

        }
        // }

      })

      // 过滤空值
      order = order.filter(cardID => {
        return !!cardID;
      })

      return order;

    },
    // 获取卡片数据列表
    getItems(item) {

      if (!item.cardDetailPojoList) return {};

      let fileds = {
        ID: item => {
          return item.ID },
        id: item => {
          return item.name }, // 'cardAttendance', // 卡片id
        name: item => {
          return item.alias }, // '考勤管理',     // 卡片名
        info: item => {
          return item.info }, // '展示考勤异常信息', // 卡片简介
        ctrl: item => {
          return item.ctrl ? eval('(' + item.ctrl + ')') : '' }, // 'api.Dashboard.getCardDataOfAttendance', // 数据接口
        show: item => {
          return item.isShow - 0 == 1 ? true : false }, // true,
        _show: item => {
          return item.isShow - 0 == 1 ? true : false }, // true,
        orderNum: item => {
          return item.orderNum },
      }

      let _data = {};
      item.cardDetailPojoList.forEach(card => {
        let _item = {};
        for (let key in fileds) {
          _item[key] = fileds[key](card);
        }
        _data[card.name] = _item;
      })

      return _data;

    },
    // 预设卡片数据空值
    setItemsData(item) {

      if (!item.cardDetailPojoList) return {};

      let _data = {};
      item.cardDetailPojoList.forEach(card => {
        _data[card.name] = 0;
      })

      return _data;

    },

    // 设置卡片列表数据
    SetCardListData(data) {

      let _data = {
        order: [],
        list: {},
      };

      let fileds = {
        ID: item => {
          return item.ID },
        id: item => {
          return item.name }, // 'cardAttendance', // 卡片id
        type: item => {
          return item.type }, // 'dataCard',      // 卡片类型： 数据卡片，其他卡片
        name: item => {
          return item.alias }, // '考勤管理',     // 卡片名
        info: item => {
          return item.info }, // '展示考勤异常信息', // 卡片简介
        url: item => {
          return item.url }, // 'api.Dashboard.getCardDataOfAttendance', // 数据接口
        ctrl: item => {
          return item.ctrl ? JSON.parse(item.ctrl) : '' }, // 'api.Dashboard.getCardDataOfAttendance', // 数据接口
        show: item => {
          return item.isShow - 0 == 1 ? true : false }, // true,
        _show: item => {
          return item.isShow - 0 == 1 ? true : false }, // true,
        itemsOrder: item => {
          return mutations.getItemsOrder(item) }, // [0, 1],
        _itemsOrder: item => {
          return mutations.getItemsOrder(item) }, // [0, 1],
        items: item => {
          return mutations.getItems(item) }, // []
        itmesData: item => {
          return mutations.setItemsData(item) },
        orderNum: item => {
          return item.orderNum },
      }

      //
      if (data.length > 0) {

        //
        data.forEach((item, index) => {

          let _item = {};
          for (let key in fileds) {
            _item[key] = fileds[key](item);
          }

          _data.list[item.name] = _item;

        })

      }

      _data.order = mutations.getCardsOrder(_data.list);
      _data._order = [].concat(_data.order);

      console.log(_data)

      state.cardConfig = _data;

    },

    /**
     * 设置card展示数据
     * @param {string} cardID   卡片id
     * @param {object} cardData 卡片展示数据
     */
    SetCardData(cardID, cardData) {

      if (state.cardConfig.list[cardID]) {
        for (var i in cardData) {

          state.cardConfig.list[cardID].itmesData[i] = cardData[i]

        }
      }

    },
    // SetShowTransferMain(carePageID){
    //     state.carePageID=carePageID;
    // }
    SetApprovalPendingCount(recentCnt, sumCnt) {
        state.approvalPendingCount.pendingRecentCount = recentCnt;
        state.approvalPendingCount.pendingSumCount = sumCnt;
    },

  }
  // 操作
const actions = {

  // 更新卡片数据
  updateCardConfig(type) {

    // 整理要提交数据
    let data = {
      list: []
    }

    // 拖动排序 order show
    if (type == 'order') {
      state.cardConfig.order.forEach((cardID, index) => {
        let card = {
          cardID: state.cardConfig.list[cardID].ID,
          orderNum: index,
          isShowStr: state.cardConfig.list[cardID].show + ''
        }
        data.list.push(card)
      })
    }
    // 卡片管理 _order _show
    else {
      state.cardConfig._order.forEach((cardID, index) => {
        let card = {
          cardID: state.cardConfig.list[cardID].ID,
          orderNum: index,
          isShowStr: state.cardConfig.list[cardID]._show + ''
        }
        data.list.push(card)
      })
    }

    data.list = JSON.stringify(data.list)
    console.log(data)

    Vue.Tool.ajax({
      url: 'api.Dashboard.updateCardList',
      data: data,
      success(data, res) {

        // 同步数据 拖动排序 order => _order
        if (type == 'order') {
          state.cardConfig._order = [].concat(state.cardConfig.order);

          for (let key in state.cardConfig.list) {
            let card = state.cardConfig.list[key];
            card._show = card.show;
          }
        }
        // 同步数据 卡片管理 _order => order
        else {
          state.cardConfig.order = [].concat(state.cardConfig._order);
          for (let key in state.cardConfig.list) {
            let card = state.cardConfig.list[key];
            card.show = card._show;
          }
        }
      },
      error(res) {}
    })



    console.log('更新卡片数据')
  },

  // 卡片管理 点击取消 重置卡片数据 _order <= order
  resetCardConfig() {

    console.log(state.cardConfig._order)
    console.log(state.cardConfig.order)

    state.cardConfig._order = [].concat(state.cardConfig.order);

    console.log(state.cardConfig._order)

    for (let key in state.cardConfig.list) {
      let card = state.cardConfig.list[key];
      card._show = card.show;
    }

  },

  // 更新卡片子元素数据
  updateCardItemConfig(cardID) {

    console.log(cardID)

    let card = state.cardConfig.list[cardID];

    console.log(card)

    // 整理要提交数据
    let data = {
      list: []
    }

    card._itemsOrder.forEach((itemID, index) => {
      let _card = {
        cardDetailID: card.items[itemID].ID,
        orderNum: index,
        isShowStr: card.items[itemID]._show + ''
      }
      data.list.push(_card)
    })

    data.list = JSON.stringify(data.list)
    console.log(data)

    Vue.Tool.ajax({
      url: 'api.Dashboard.updateCardItemList',
      data: data,
      success(data, res) {

        // 同步数据
        card.itemsOrder = [].concat(card._itemsOrder);

        for (let key in card.items) {

          let item = card.items[key];

          item.show = item._show;

        }


      },
      error(res) {}
    })


    console.log('更新卡片子元素数据')
  },

  // 重置卡片子元素数据
  resetCardItemConfig(cardID) {

    let card = state.cardConfig.list[cardID];

    // 同步数据
    card._itemsOrder = [].concat(card.itemsOrder);

    for (let key in card.items) {

      let item = card.items[key];

      item._show = item.show;

    }

  },

  // 卡片列表数据
  loadCardList(callback) {

    // 加载数据
    Vue.Tool.ajax({
      url: 'api.Dashboard.getCardList',
      success(data, res) {
        mutations.SetCardListData(data);
        if (callback) callback();
      },
      error(res) {
        console.log(res)
        if (callback) callback();
      }
    })

  },

  // 加载卡片数据
  loadCardData(cardID) {

    let card = state.cardConfig.list[cardID];
    let type = card.type;

    if (type == 'dataCard') {

      let url = card.url;

      if (!url) return;

      // 加载数据
      Vue.Tool.ajax({
        url: url,
        success(data, res) {
          console.log(data)
          mutations.SetCardData(cardID, data);
        },
        error(res) {
          console.log(res)
        }
      })

    }

  },
    // //显示卡片页面
    // showTransferMain(carePageID){
    //     mutations.SetShowTransferMain(carePageID);
    // },

    loadApprovalPendingCount(cbSuccess, cbError) {
        Tool.ajax({
          url: 'api.Workflow.getApprovalPendingCount',
          success(data, res) {
            mutations.SetApprovalPendingCount(data.pcount, data.allcount);
            cbSuccess && cbSuccess(data);
          },
          error(res) { cbError && cbError(res); }
        });
    },

  //点击弹出
  loadOrgListTree(cbSuccess, cbError) {
  var deptPromise = new Promise((resolve, reject) => {
      Vue.Tool.ajax({
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
      Vue.Tool.ajax({
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
      Vue.Tool.ajax({
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
      var treeData2 = Vue.Tool.convertToTree(deptData)
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


};

export default {
  state,
  mutations,
  actions
};
