/**
* @Created Date       : 2016-11-30T15:29:19+08:00
* @Last Modified time : 2016-12-20T16:21:24+08:00
*/



import Vue from 'vue';
const Tool = Vue.tool;

// VUEX
// flux view>actions>mutations>state>view

// 数据、状态
const state = {


  brandAreaStoreTree: [], // 品牌、区域、门店三级树
  companyDeptStoreTree: [], // 公司、部门、门店三级树
  deptList: [], // 部门数组数据
  deptTree: [], // 部门树结构数据

  deptStoreTree: {}, // 部门门店树结构数据

  postTree: {}, // 岗位树结构数据
  postTypeList: [], // 岗位分类数组数据
  postTypeTree: {}, // 岗位分类树结构数据
  // 岗位类型操作数据单个暂存
  postType: {
    id: null,
    name: null
  },
  rankList: [], // 职级数组数据
  rank: {}, // 职级操作数据单个暂存
  skillList: [], // 技能数组数据
  skill: {}, // 技能操作数据单个暂存
  skillLevel: {}, // 技能等级
  postList: [], // 岗位数组数据
  post: {}, // 岗位操作数据单个暂存
  positionList: [], // 职位数组数据
  position: {}, // 职位操作数据单个暂存

  brandList: [], // 品牌数组数据
  areaList: [], // 区域数组数据
  areaTree: {}, // 区域树结构数据

  employeeByPostList: [], // 按岗位下的员工数组数据
  employeeByOrgList: [], // 按组织下的员工数组数据
  employeeByOrgCount: 0, // 按组织下的员工的总数目

  authorityTree: [], //

  chosenSelectedNodeID: null, // 左侧点选组织树节点的编号
  chosenSelectedNodeType: null, // 左侧点选组织树节点的类型，brand, area, department, store, team
  chosenSelectedPostID: null, // 左侧点选岗位树节点岗位编号
  chosenEmployeeIsAll: false, // 当前按组织视图是否显示所有员工
  employeeCountCacade: 0, // 当前所选组织下所有员工数量

  // 组织与员工首页右侧显示的公司名称，门店数量和员工数量
  companyInfo: {
    companyName: null,
    storeCount: null,
    employeeCount: null
  }
}

// 数据修改
const mutations = {
  // 品牌数组
  SetBrandList(list) {
    state.brandList = list;
  },
  // 区域数组
  SetAreaList(list) {
    state.areaList = list;
  },
  // 区域树
  SetAreaTree(tree) {
    state.areaTree = tree;
  },
  // 品牌区域门店树数据
  SetBrandAreaStoreTree(tree) {
    state.brandAreaStoreTree = tree;
  },
  // 公司部门门店树数据
  SetCompanyDeptStoreTree(tree) {
    state.companyDeptStoreTree = tree;
  },
  // 部门数组
  SetDeptList(list) {
    state.deptList = list;
  },
  // 部门树树
  SetDeptTree(deptTree) {
    state.deptTree = deptTree;
  },
  // 部门门店树
  SetDeptStoreTree(tree) {
    state.deptStoreTree = tree;
  },
  // 岗位树
  SetPostTree(postTree) {
    state.postTree = postTree;
  },
  // 岗位分类数组
  SetPostTypeList(list) {
    state.postTypeList = list;
  },
  // 岗位分类树
  SetPostTypeTree(postTypeTree) {
    state.postTypeTree = postTypeTree;
  },
  // 单个岗位分类
  SetPostType(postType) {
    state.postType = postType;
  },
  // 职级数组
  SetRankList(rank) {
    state.rankList = rank;
  },
  // 单个职级
  SetRank(rank) {
    state.rank = rank;
  },
  // 技能数组
  SetSkillList(list) {
    state.skillList = list;
  },
  // 单个技能
  SetSkill(skill) {
    state.skill = skill;
  },
  // 技能等级
  SetSkillLevel(level) {
    state.skillLevel = level;
  },
  // 岗位数组
  SetPostList(list) {
    state.postList = list;
  },
  // 单个岗位
  SetPost(post) {
    state.post = post;
  },
  // 职位数组
  SetPositionList(list) {
    state.positionList = list;
  },
  // 单个职位
  SetPosition(position) {
    state.position = position;
  },
  // 按岗位查询的员工列表
  SetEmployeeByPostList(list) {
    state.employeeByPostList = list;
  },
  // 按组织查询的员工列表
  SetEmployeeByOrgList(list) {
    state.employeeByOrgList = list;
  },
  // 按组织查询的员工数目
  SetEmployeeByOrgCount(count) {
    state.employeeByOrgCount = count;
  },
  //****************************花名册mutation
  SetRosterErrorStatu(show, msg) {
    state.rosterShowError = show;
    state.rosterErrorMsg = msg;
  },
  //通知是否需要刷新Table
  SetRosterTableRefreshStatu(isdone) {
    state.rosterRefreshTable = isdone;
  },
  //设置将要操作的人员列表信息
  SetRosterOperatorEList(data) {
    state.rosterOperatorEList = data;
  },
  //设置将要操作的人员加载状态
  SetRosterLoadStatu(statu) {
    state.rosterOperatorEListLoading = statu;
  },
  // 设置在左侧选择的组织树节点的编号
  SetChosenSelectedNodeID(id) {
    state.chosenSelectedNodeID = id;
  },
  // 设置在左侧选择的组织树节点的类型
  SetChosenSelectedNodeType(id) {
    state.chosenSelectedNodeType = id;
  },
  // 设置早左侧岗位树种选择的节点编号
  SetChosenSelectedPostID(id) {
    state.chosenSelectedPostID = id;
  },
  SetChosenEmployeeIsAll(isAll) {
    state.chosenEmployeeIsAll = isAll;
  },
  SetEmployeeCountCacade(cnt) {
    state.employeeCountCacade = cnt;
  },
  // 设置公司信息
  SetCompanyInfo(companyName, storeCount, employeeCount) {
    state.companyInfo.companyName = companyName;
    state.companyInfo.storeCount = storeCount;
    state.companyInfo.employeeCount = employeeCount;
  }
}

// 操作
const actions = {
  // 获取公司名称，门店数量，员工数量
  getStoreEmployeeCount(cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.getStoreEmployeeCount',
      success(data, res) {
        mutations.SetCompanyInfo(data.companyName, data.storeCount, data.employeeCount);
        cbSuccess && cbSuccess(data);
      },
      error(res) { cbError && cbError(res); }
    });
  },
  //**********加载系统配置 114000
  findSystemConfig(activeValue, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Settings.getSystemConfigData',
      data: {
        defintionCode: activeValue,
        // key: key
      },
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },

  // 品牌列表
  loadBrandList(cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.getBrand',
      success(data, res) {
        mutations.SetBrandList(data);
        cbSuccess && cbSuccess(data);
      },
      error(res) { cbError && cbError(res); }
    });
  },
  // 按品牌ID查询单个品牌
  loadBrand(id, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.getBrandByID',
      data: { ID: id },
      success(data, res) { cbSuccess && cbSuccess(data); },
      error(res) { cbError && cbError(res); }
    });
  },
  // 添加品牌
  addBrand(brand, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.addBrand',
      data: brand,
      success(data, res) {
        console.log(this)
        cbSuccess && cbSuccess();
      },
      error(res) { cbError && cbError(res); }
    });
  },
  // 修改品牌
  editBrand(brand, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.editBrand',
      data: brand,
      success(data, res) { cbSuccess && cbSuccess(); },
      error(res) { cbError && cbError(res); }
    });
  },
  // 删除品牌
  removeBrand(id, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.removeBrand',
      data: { ID: id },
      success(data, res) { cbSuccess && cbSuccess(); },
      error(res) { cbError && cbError(res); }
    });
  },

  // 加载区域树
  loadAreaTree(cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.getArea',
      success(data, res) {
        mutations.SetAreaList(data);
        var areaTree = Tool.convertToTree(data);
        var rootTree = { ID: -1, areaName: '区域树', expanded: true, children: [] };
        areaTree.forEach((elem) => {
          Vue.set(elem, 'expanded', true);
          rootTree.children.push(elem);
        });
        mutations.SetAreaTree(rootTree);
        cbSuccess && cbSuccess(data);
      },
      error(res) { cbError && cbError(res); }
    });
  },
  // 添加区域
  addArea(area, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.addArea',
      data: area,
      success(data, res) { cbSuccess && cbSuccess(); },
      error(res) { cbError && cbError(res); }
    });
  },
  // 修改区域
  editArea(area, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.editArea',
      data: area,
      success(data, res) { cbSuccess && cbSuccess(); },
      error(res) { cbError && cbError(res); }
    });
  },
  // 删除区域
  removeArea(id, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.removeArea',
      data: { ID: id },
      success(data, res) { cbSuccess && cbSuccess(); },
      error(res) { cbError && cbError(res); }
    });
  },
  // 按区域ID查询单个区域
  loadArea(id, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.getAreaByID',
      data: { ID: id },
      success(data, res) { cbSuccess && cbSuccess(data); },
      error(res) { cbError && cbError(res); }
    });
  },
  // 加载品牌区域门店树数据
  loadBrandAreaStoreTree(cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.getBrandAreaStoreTree',
      success(data, res) {
        var brand = data.brandList; // 必有层级节点
        var area = data.allList; // 若下有门店则必有，否则不会返回
        var store = data.storeList; // 层级不会上移
        var team = data.teamList; //  无权限控制

        // store 单层树结构,只处理节点类型和节点显示文本
        if (Array.isArray(store)) {
          store.forEach(function(elem) {
            elem.children = [];
            if (Array.isArray(team)) {
              var childrenTeam = team.filter((item) => {
                return item.storeID === elem.ID;
              });
              childrenTeam.forEach((team) => {
                team.nodeType = 'team';
                team.text = team.teamName;
                elem.children.push(team);
              });
            }
            elem.nodeType = "store"; // 可直接赋nodeType，因为store没有孤立节点
            elem.text = elem.storeName;
          });
        }
        if (Array.isArray(area)) {
          // 将store节点挂载到相应area节点下
          area.forEach(function(elem) {
            // 交换ID areaID
            elem.areaID = elem.ID;
            elem.ID = elem.ID + '-' + elem.brandID;
            elem.nodeType = "area";
            elem.text = elem.areaName;
            console.log(elem);
            if (Array.isArray(store)) {
              var childrenStore = store.filter(function(item) {
                // store的areaID等于area的ID 且 store的brandID等于area的brandID
                // 才可将此 store 挂载在当前 area 下
                return item.areaID == elem.areaID && item.brandID == elem.brandID;
              });
              elem.children = [];
              childrenStore.forEach(function(child) {
                elem.children.push(child);
              });
            }
          });
        }
        // 将 area 数组处理为树结构
        var areaTree = [];
        if (Array.isArray(area)) {
          area.forEach(function(item) {
            // 找出当前 area 的父area
            var fatherArea = area.filter(function(elem) {
              // 父area条件: area 的 ID 等于当前 area 的 parentID 且 area 的 brandID 等于当前 area 的 brandID
              return elem.areaID == item.parentID && elem.brandID == item.brandID;
            });
            if (fatherArea && fatherArea.length > 0) { // 说明当前区域item有父区域
              // 父区域的 children push 当前 area
              if (!fatherArea[0].children) fatherArea[0].children = [];
              fatherArea[0].children.push(item);
            } else { // 说明当前区域item是根区域
              // 直接将当前 area push 到树根数组中
              areaTree.push(item);
            }
          });
        }
        var tree = { ID: -1, text: '品牌区域门店树', expanded: true, children: [] };
        // area -> brand 将 area 挂载到 brand 下
        if (Array.isArray(brand)) {
          brand.forEach(function(elem) {
            elem.nodeType = "brand";
            elem.expanded = true; // 品牌默认展开节点
            elem.text = elem.brandName;
            var childrenArea = areaTree.filter(function(item) {
              return item.brandID == elem.ID;
            });
            elem.children = [];
            childrenArea.forEach(function(child) {
              elem.children.push(child);
            });
            // 将当前 brand 挂载到树根节点下
            tree.children.push(elem);
          });
        }
        mutations.SetBrandAreaStoreTree(tree);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  // 依员工姓名模糊查询员工列表，并按首字母分类
  loadEmployeeByKey(key, cbSuccess, cbError) {
    if (!key) return;
    Tool.ajax({
      url: 'api.OrgEmployee.getEmployeesByKey',
      data: { userName: key },
      success(data, res) {
        if (!Array.isArray(data)) data = [];
        mutations.SetEmployeeByOrgCount(data.length);
        // 排序
        var result = {
          'A': [],
          'B': [],
          'C': [],
          'D': [],
          'E': [],
          'F': [],
          'G': [],
          'H': [],
          'I': [],
          'J': [],
          'K': [],
          'L': [],
          'M': [],
          'N': [],
          'O': [],
          'P': [],
          'Q': [],
          'R': [],
          'S': [],
          'T': [],
          'U': [],
          'V': [],
          'W': [],
          'X': [],
          'Y': [],
          'Z': [],
          '#': []
        };
        console.log('data: ', data);
        data.forEach((item) => {
          if (!item.userNamePY || !result[item.userNamePY[0].toUpperCase()]) {
            result['#'].push(item);
            return;
          }
          result[item.userNamePY[0].toUpperCase()].push(item);
        });
        for (var key in result) {
          if (result[key].length <= 0) delete result[key];
        }
        mutations.SetEmployeeByPostList(data);
        mutations.SetEmployeeByOrgList(result);
        cbSuccess && cbSuccess(result);
      },
      error(res) { cbError && cbError(res); }
    });
  },

  //加载部门门店小组
  loadOrgListTreeNonPower(cbSuccess, cbError) {
    var deptPromise = new Promise((resolve, reject) => {
      Tool.ajax({
        url: 'api.OrgEmployee.nonPowerdepartment',
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
        url: 'api.OrgEmployee.nonPowerstore',
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
        url: 'api.OrgEmployee.nonPowerstoreTeam',
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
  //加载部门门店小组
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
      state.checkedOrgDeptData=val[0];
      state.checkedOrgStoreData=val[1];
      state.checkedOrgTeamData=val[2];
      if (cbSuccess) cbSuccess(root);
    }).catch((e) => {
      if (cbError) cbError(e);
    });
  },
  // 加载公司部门门店树数据
  loadCompanyDeptStore(cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.getCompanyDeptStoreTree',
      success(data, res) {
        var dept = data.departList; // 部门列表
        var store = data.storeList; // 可能门店没有挂载在相应的部门节点下，因为没有该部门的权限，则这时门店的层级直接挂在根节点下
        var team = data.teamList;
        if (Array.isArray(store)) {
          store.forEach(function(elem) {
            elem.children = [];
            if (Array.isArray(team)) {
              var childrenTeam = team.filter((item) => {
                return item.storeID === elem.ID;
              });
              if (childrenTeam.length > 0) elem.expanded = true;
              childrenTeam.forEach((team) => {
                team.nodeType = 'team';
                team.text = team.teamName;
                elem.children.push(team);
              });
            }
            elem.text = elem.storeName;
          });
        }
        if (Array.isArray(dept)) {
          dept.forEach(function(elem) {
            elem.nodeType = "department";
            elem.expanded = true;
            elem.text = elem.departmentName;
            if (Array.isArray(store)) {
              var childrenStore = store.filter(function(item) {
                return item.deptID == elem.ID;
              });
              elem.children = [];
              childrenStore.forEach(function(item) {
                item.nodeType = "store";
                elem.children.push(item);
              });
            }
          });
        }
        var deptTree = Tool.convertToTree(dept);
        var tree = { ID: -1, text: data.companyName, expanded: true, children: [] };
        deptTree.forEach(function(elem) {
          elem.expanded = true;
          tree.children.push(elem);
        });
        // 处理没有挂载到dept下的store
        if (Array.isArray(store)) {
          store.forEach(function(elem) {
            if (elem.nodeType === undefined) {
              elem.nodeType = 'store';
              tree.children.push(elem);
            }
          });
        }
        mutations.SetCompanyDeptStoreTree(tree);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  // 加载部门树数据
  loadDeptTree(cbSuccess, cbError) {
    // 加载数据
    Tool.ajax({
      url: 'api.OrgEmployee.getDeptTree',
      success(data, res) {
        mutations.SetDeptList(data);
        var deptTree = Tool.convertToTree(data);
        var rootTree = { ID: -1, departmentName: '组织树', expanded: true, children: [] };
        deptTree.forEach((elem) => {
          Vue.set(elem, 'expanded', true);
          rootTree.children.push(elem);
        });
        mutations.SetDeptTree(rootTree);
        cbSuccess && cbSuccess(data);
      },
      error(res) { cbError && cbError(res); }
    });
  },
  // 加载部门门店树数据
  loadDeptStoreTree(cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.getDeptTree',
      success(data, res) {
        var deptList = data;
        Tool.ajax({
          url: 'api.OrgEmployee.getStore',
          success(storeList, res) {
            if (Array.isArray(deptList)) {
              deptList.forEach((item) => {
                item.nodeType = "department";
                item.text = item.departmentName;
                if (Array.isArray(storeList)) {
                  var childrenStore = storeList.filter((elem) => {
                    return elem.deptID === item.ID
                  });
                  item.children = [];
                  childrenStore.forEach((elem) => {
                    elem.nodeType = "store";
                    elem.text = elem.storeName;
                    item.children.push(elem);
                  });
                }
              });
            }
            var deptStoreTree = Tool.convertToTree(deptList);
            var rootTree = { ID: -1, departmentName: '组织树', expanded: true, children: [] };
            deptStoreTree.forEach((elem) => {
              Vue.set(elem, 'expanded', true);
              rootTree.children.push(elem);
            });
            // 处理没有挂载在部门的 store
            if (Array.isArray(storeList)) {
              storeList.forEach((elem) => {
                if (!elem.nodeType) {
                  elem.text = elem.storeName;
                  rootTree.children.push(elem);
                }
              });
            }
            mutations.SetDeptStoreTree(rootTree);
            cbSuccess && cbSuccess(rootTree);
          }
        });
      },
      error(res) { cbError && cbError(res); }
    });
  },
  // 添加部门
  addDept(dept, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.addDept',
      data: dept,
      success(data, res) { cbSuccess && cbSuccess(data); },
      error(res) { cbError && cbError(res); }
    });
  },
  // 删除部门
  removeDept(id, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.removeDept',
      data: { ID: id },
      success(data, res) { cbSuccess && cbSuccess(); },
      error(res) { cbError && cbError(res); }
    });
  },
  // 修改部门
  editDept(dept, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.editDept',
      data: dept,
      success(data, res) { cbSuccess && cbSuccess(); },
      error(res) { cbError && cbError(res); }
    });
  },
  // 按部门ID查询单个部门
  loadDept(id, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.getDeptByID',
      data: { ID: id },
      success(data, res) { cbSuccess && cbSuccess(data); },
      error(res) { cbError && cbError(res); }
    });
  },

  // 添加门店
  addStore(store, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.addStore',
      data: store,
      success(data, res) { cbSuccess && cbSuccess(data); },
      error(res) { cbError && cbError(res); }
    });
  },
  // 批量删除门店
  removeStoreList(ids, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.removeStoreList',
      data: { IDs: JSON.stringify(ids) },
      success(data, res) { cbSuccess && cbSuccess(); },
      error(res) { cbError && cbError(res); }
    });
  },
  // 修改门店
  editStore(store, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.editStore',
      data: store,
      success(data, res) { cbSuccess && cbSuccess(); },
      error(res) { cbError && cbError(res); }
    });
  },
  // 按门店ID查询单个门店
  loadStore(id, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.getStoreByID',
      data: { ID: id },
      success(data, res) { cbSuccess && cbSuccess(data); },
      error(res) { cbError && cbError(res); }
    });
  },

  // 添加门店小组
  addStoreTeam(team, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.addStoreTeam',
      data: team,
      success(data, res) { cbSuccess && cbSuccess(data); },
      error(res) { cbError && cbError(res); }
    });
  },
  // 批量删除门店小组
  removeStoreTeamList(ids, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.removeStoreTeamList',
      data: { IDs: JSON.stringify(ids) },
      success(data, res) { cbSuccess && cbSuccess(); },
      error(res) { cbError && cbError(res); }
    });
  },
  // 修改门店小组
  editStoreTeam(team, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.editStoreTeam',
      data: team,
      success(data, res) { cbSuccess && cbSuccess(); },
      error(res) { cbError && cbError(res); }
    });
  },
  // 按门店小组ＩＤ查询单个门店小组
  loadStoreTeam(id, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.getStoreTeamByID',
      data: { ID: id },
      success(data, res) { cbSuccess && cbSuccess(data); },
      error(res) { cbError && cbError(res); }
    });
  },
  // 加载岗位树
  loadPostTree(cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.getPostTree',
      success(data, res) {
        mutations.SetPostList(data);
        if (Array.isArray(data)) {
          data.forEach(p => { Vue.set(p, 'expanded', true); });
        }
        var postTree = Tool.convertToTree(data);
        var rootTree = { ID: -1, postName: '岗位树', expanded: true, children: [] };
        postTree.forEach((elem) => {
          // Vue.set(elem, 'expanded', true);
          rootTree.children.push(elem);
        });
        mutations.SetPostTree(rootTree);
        cbSuccess && cbSuccess(data);
      },
      error(res) { cbError && cbError(res); }
    });
  },
  // 按组织ID加载该组织下的岗位树
  loadPostTreeByOrgID(orgID, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.getPostNoAuth',
      data: {
        organizeID: orgID
      },
      success(data, res) {
        var postTree = Tool.convertToTree(data);
        var rootTree = { ID: -1, postName: '岗位树', expanded: true, children: [] };
        postTree.forEach((elem) => {
          Vue.set(elem, 'expanded', true);
          rootTree.children.push(elem);
        });
        cbSuccess && cbSuccess(rootTree);
      },
      error(res) { cbError && cbError(res); }
    });
  },
  // 加载岗位树，直接回调
  loadPostTree2(cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.getPostTree',
      success(data, res) {
        var postTree = Tool.convertToTree(data);
        var rootTree = { ID: -1, postName: '岗位树', expanded: true, children: [] };
        postTree.forEach((elem) => {
          Vue.set(elem, 'expanded', true);
          rootTree.children.push(elem);
        });
        cbSuccess && cbSuccess(rootTree);
      },
      error(res) { cbError && cbError(res); }
    });
  },
  // 加载岗位分类树
  loadPostTypeTree(cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.getPostTypeTree',
      success(data, res) {
        mutations.SetPostTypeList(data);
        var tree = Tool.convertToTree(data.concat([]));
        var rootNode = {
          ID: -1,
          parentID: null,
          postType: '岗位分类',
          expanded: true,
          children: []
        };
        tree.forEach(function(item) {
          rootNode.children.push(item);
        });
        mutations.SetPostTypeTree(rootNode);
        if (cbSuccess) cbSuccess(tree);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  // 按岗位分类ID查询单个岗位分来
  loadPostType(ID, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.getPostTypeByID',
      data: { ID: ID },
      success(data, res) {
        mutations.SetPostType(data);
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  // 添加岗位分类
  addPostType(postType, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.addPostType',
      data: postType,
      success(data, res) {
        mutations.SetPostType({});
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        mutations.SetPostType({});
        if (cbError) cbError(res);
      }
    });
  },
  // 修改岗位分类
  editPostType(postType, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.editPostType',
      data: postType,
      success(data, res) {
        mutations.SetPostType({});
        if (cbSuccess) cbSuccess();
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  // 清除 state 中单个岗位分类缓存
  clearPostType() {
    mutations.SetPostType({});
  },
  // 删除岗位分类
  removePostType(ID, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.removePostType',
      data: { ID: ID },
      success(data, res) {
        if (cbSuccess) cbSuccess();
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },

  // 按岗位查询职级
  loadRankByPostID(postID, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.getRankByNum',
      data: {
        postID: postID
      },
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  // 加载职级列表
  loadRankList(cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.getRank',
      success(data, res) {
        mutations.SetRankList(data);
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  // 按职级ID查询单个职级
  loadRank(rankID, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.getRankByID',
      data: { ID: rankID },
      success(data, res) {
        mutations.SetRank(data);
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  // 添加职级
  addRank(rank, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.addRank',
      data: rank,
      success(data, res) {
        mutations.SetRank({});
        if (cbSuccess) cbSuccess();
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  // 修改职级
  editRank(rank, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.editRank',
      data: rank,
      success(data, res) {
        mutations.SetRank({});
        if (cbSuccess) cbSuccess();
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  // 清除操作单个职级缓存
  clearRank() {
    mutations.SetRank({});
  },
  // 删除职级
  removeRank(rankID, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.removeRank',
      data: { ID: rankID },
      success(data, res) {
        if (cbSuccess) cbSuccess();
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },

  // 加载技能列表
  loadSkillList(cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.getSkill',
      success(data, res) {
        mutations.SetSkillList(data);
        cbSuccess && cbSuccess(data);
      },
      error(res) { cbError && cbError(res); }
    });
  },
  // 查询单个技能
  loadSkill(id, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.getSkillByID',
      data: { ID: id },
      success(data, res) {
        mutations.SetSkill(data);
        cbSuccess && cbSuccess(data);
      },
      error(res) { cbError && cbError(res); }
    });
  },
  // 查询单个技能等级
  loadSkillLevel(id, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.getSkillLevelByID',
      data: { ID: id },
      success(data, res) {
        mutations.SetSkillLevel(data);
        cbSuccess && cbSuccess(data);
      },
      error(res) { cbError && cbError(res); }
    });
  },
  // 添加技能
  addSkill(skill, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.addSkill',
      data: skill,
      success(data, res) {
        mutations.SetSkill({});
        cbSuccess && cbSuccess(data);
      },
      error(res) { cbError && cbError(res); }
    });
  },
  // 添加技能等级
  addSkillLevel(level, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.addSkillLevel',
      data: level,
      success(data, res) {
        mutations.SetSkillLevel({});
        cbSuccess && cbSuccess(data);
      },
      error(res) { cbError && cbError(res); }
    });
  },
  // 修改技能
  editSkill(skill, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.editSkill',
      data: skill,
      success(data, res) {
        mutations.SetSkill({});
        cbSuccess && cbSuccess(data);
      },
      error(res) { cbError && cbError(res); }
    });
  },
  // 修改技能等级
  editSkillLevel(level, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.editSkillLevel',
      data: level,
      success(data, res) {
        mutations.SetSkillLevel({});
        cbSuccess && cbSuccess(data);
      },
      error(res) { cbError && cbError(res); }
    });
  },
  // 清除单个操作技能缓存
  clearSkill() { mutations.SetSkill({}); },
  // 清除单个操作技能等级缓存
  clearSkillLevel() { mutations.SetSkillLevel({}); },
  // 删除技能
  removeSkill(id, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.removeSkill',
      data: { ID: id },
      success(data, res) { cbSuccess && cbSuccess(data); },
      error(res) { cbError && cbError(res); }
    });
  },
  // 删除技能等级
  removeSkillLevel(id, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.removeSkillLevel',
      data: { ID: id },
      success(data, res) { cbSuccess && cbSuccess(data); },
      error(res) { cbError && cbError(res); }
    });
  },

  // 加载岗位列表
  loadPostList(cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.getPost',
      success(data, res) {
        mutations.SetPostList(data);
        cbSuccess && cbSuccess(data);
      },
      error(res) { cbError && cbError(res); }
    });
  },
  // 查询当个岗位
  loadPost(id, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.getPostByID',
      data: { ID: id },
      success(data, res) {
        mutations.SetPost(data);
        cbSuccess && cbSuccess(data);
      },
      error(res) { cbError && cbError(res); }
    });
  },
  // 添加岗位
  addPost(post, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.addPost',
      data: post,
      success(data, res) {
        mutations.SetPost({});
        cbSuccess && cbSuccess(data);
      },
      error(res) { cbError && cbError(res); }
    });
  },
  // 修改岗位
  editPost(post, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.editPost',
      data: post,
      success(data, res) {
        mutations.SetPost({});
        cbSuccess && cbSuccess(data);
      },
      error(res) { cbError && cbError(res); }
    });
  },
  // 清除单个操作岗位缓存
  clearPost() { mutations.SetPost({}); },
  // 删除岗位
  removePost(id, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.removePost',
      data: { ID: id },
      success(data, res) { cbSuccess && cbSuccess(data); },
      error(res) { cbError && cbError(res); }
    });
  },

  // 加载职位列表
  loadPositionList(cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.getPosition',
      success(data, res) {
        mutations.SetPositionList(data);
        cbSuccess && cbSuccess(data);
      },
      error(res) { cbError && cbError(res); }
    });
  },
  // 查询单个职位
  loadPosition(id, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.getPositionByID',
      data: { ID: id },
      success(data, res) {
        mutations.SetPost(data);
        cbSuccess && cbSuccess(data);
      },
      error(res) { cbError && cbError(res); }
    });
  },
  // 添加职位
  addPosition(position, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.addPosition',
      data: position,
      success(data, res) {
        mutations.SetPosition({});
        cbSuccess && cbSuccess(data);
      },
      error(res) { cbError && cbError(res); }
    });
  },
  // 修改职位
  editPosition(position, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.editPosition',
      data: position,
      success(data, res) {
        mutations.SetPosition({});
        cbSuccess && cbSuccess(data);
      },
      error(res) { cbError && cbError(res); }
    });
  },
  // 清除单个操作职位缓存
  clearPosition() { mutations.SetPosition({}); },
  // 删除职位
  removePosition(id, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.removePosition',
      data: { ID: id },
      success(data, res) { cbSuccess && cbSuccess(data); },
      error(res) { cbError && cbError(res); }
    });
  },

  // loadAuthority() {
  //   Tool.ajax({
  //     url: 'api.OrgEmployee.testAuthority',
  //     success(data, res) {
  //       // state.authorityTree = data;
  //       var tree = Tool.convertToTree(data)
  //     }
  //   });
  // },

  // 根据岗位ID查询员工列表
  loadEmployeeByPostList(postID, cbSuccess, cbError) {
    console.log('postID: ', postID);
    postID = postID || state.chosenSelectedPostID;
    if (!postID) return;
    mutations.SetChosenSelectedPostID(postID);
    Tool.ajax({
      url: 'api.OrgEmployee.getEmployeeByPostID',
      data: { postID: postID },
      success(data, res) {
        mutations.SetEmployeeByPostList(data);
        cbSuccess && cbSuccess(data);
      },
      error(res) { cbError && cbError(res); }
    });
  },

  // 根据树节点ID及类型查询员工列表
  loadEmployeeByTreeNodeList(isAll, id, nodeType, cbSuccess, cbError) {
    if(isAll === null || isAll === undefined) isAll = state.chosenEmployeeIsAll;
    if(isAll === null || isAll === undefined) return;

    if(id && id != state.chosenSelectedNodeID) {
      isAll = false;
    }
    mutations.SetChosenEmployeeIsAll(isAll);
    id = id || state.chosenSelectedNodeID;
    if (!id) return;
    
    nodeType = nodeType || state.chosenSelectedNodeType;
    if (!nodeType) return;
    mutations.SetChosenSelectedNodeID(id);
    mutations.SetChosenSelectedNodeType(nodeType);
    var url = '';
    var data = {};
    switch (nodeType) {
      case 'brand':
        url = "api.OrgEmployee.getEmployeesByBrandID";
        data = { brandID: id };
        break;
      case 'area':
        url = "api.OrgEmployee.getEmployeesByAreaID";
        var areaID = id.substring(0, id.indexOf('-'));
        var brandID = id.substr(id.indexOf('-') + 1);
        data = { areaID: areaID, brandID: brandID };
        break;
      case 'store':
      case 'department':
        url = isAll ? "api.OrgEmployee.getEmployeeCascadeByOrgID" : "api.OrgEmployee.getEmployeeByOrgID";
        data = { organizeID: id };
        break;
      case 'team':
        url = "api.OrgEmployee.getEmployeeByTeamID";
        data = { teamID: id };
        break;
      default:
        break;
    }
    Tool.ajax({
      url: url,
      data: data,
      success(data, res) {
        if (!Array.isArray(data)) data = [];
        if(!isAll) mutations.SetEmployeeByOrgCount(data.length);
        // 排序
        var result = {
          'A': [],
          'B': [],
          'C': [],
          'D': [],
          'E': [],
          'F': [],
          'G': [],
          'H': [],
          'I': [],
          'J': [],
          'K': [],
          'L': [],
          'M': [],
          'N': [],
          'O': [],
          'P': [],
          'Q': [],
          'R': [],
          'S': [],
          'T': [],
          'U': [],
          'V': [],
          'W': [],
          'X': [],
          'Y': [],
          'Z': [],
          '#': []
        };
        data.forEach((item) => {
          if (!item.userNamePY || !result[item.userNamePY[0].toUpperCase()]) {
            result['#'].push(item);
            return;
          }
          result[item.userNamePY[0].toUpperCase()].push(item);
        });
        for (var key in result) {
          if (result[key].length <= 0) delete result[key];
        }
        mutations.SetEmployeeByOrgList(result);
        cbSuccess && cbSuccess(result);
      },
      error(res) { cbError && cbError(res); }
    });
  },

  loadEmployeeCountByOrgID(key, orgID) {
    key = key || 'organizeID';
    var data = {};
    data[key] = orgID;
    Tool.ajax({
      url: 'api.OrgEmployee.selectEmployeeCountCascadeByOrgID',
      data: data,
      success(data) { mutations.SetEmployeeCountCacade(data); },
      error(res) { cbError && cbError(res); }
    });
  },

  //****************花名册action
  //添加员工
  addEmployee(data, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.addEmployee',
      data: {
        employeeMSG: JSON.stringify(data)
      },
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  //员工入职
  pushEmployee(data, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.pushEmployee',
      data: {
        employeeEntryMSG: JSON.stringify(data)
      },
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  //删除员工入职信息
  deleteEmployeeEntry(IDs,cbSuccess,cbError){
    Tool.ajax({
      url: 'api.OrgEmployee.deleteEmployeeEntry',
      data: {
        IDs: JSON.stringify(IDs)
      },
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  // 按身份证号查询员工信息
  selectEmployeeByIDCard(data, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.selectEmployeeByIDCard',
      data: {
        idCard: data
      },
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  // 修改员工信息
  updateEmployee(data, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.updateEmployeeInfo',
      data: {
        employeeMSG: JSON.stringify(data)
      },
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  // 修改员工入职信息
  updateEmployeeEntry(data, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.updateEmployeeEntryInfo',
      data: {
        employeeEntryMSG: JSON.stringify(data)
      },
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  // 查询单个员工
  getOneEmployeeInfo(ID, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.getOneEmployeeInfo',
      data: {
        ID: ID
      },
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  // 查询单个员工 【员工入职】
  getOneEmployeeEntryInfo(ID, cbSuccess, cbError) {
    console.log('getOneEmployeeEntryInfo')
    Tool.ajax({
      url: 'api.OrgEmployee.getOneEmployeeEntryInfo',
      data: {
        ID: ID
      },
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },

  //删除转正历史记录
  //提交转正
  submitOffice(IDs, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.submitOffice',
      data: {
        IDs: JSON.stringify(IDs)
      },
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  //提交员工入职
  updateEmployeeEntryStatus(IDs, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.updateEmployeeEntryStatus',
      data: {
        IDs: JSON.stringify(IDs)
      },
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  // 批量删除员工转正信息
  deleteOffice(IDs, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.deleteOffice',
      data: {
        IDs: JSON.stringify(IDs)
      },
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  //获取单条转正记录
  getOneOffice(ID, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.getOneOffice',
      data: {
        ID: ID
      },
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  //添加一条转正记录
  addOffice(data, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.addOffice',
      data: data,
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  //更新一条转正记录
  updateOffice(data, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.updateOffice',
      data: data,
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  //批量转正
  batchAddOffice(data, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.batchAddOffice',
      data: data,
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  //异动
  submitTransaction(IDs, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.submitTransaction',
      data: {
        IDs: JSON.stringify(IDs)
      },
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  // 批量删除异动信息
  deleteTransaction(IDs, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.deleteTransaction',
      data: {
        IDs: JSON.stringify(IDs)
      },
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  //获取单条异动记录
  getOneTransaction(ID, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.getOneTransaction',
      data: {
        ID: ID
      },
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  //添加一条异动记录
  addTransaction(data, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.addTransaction',
      data: data,
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  //更新一条异动记录
  updateTransaction(data, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.updateTransaction',
      data: data,
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  //批量添加异动
  batchAddTransaction(data, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.batchAddTransaction',
      data: data,
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  // 批量异动调回
  batchBackTransaction(IDs, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.batchBackTransaction',
      data: {
        IDs: JSON.stringify(IDs)
      },
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  //离职
  submitDimission(IDs, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.submitDimission',
      data: {
        IDs: JSON.stringify(IDs)
      },
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  // 批量删除离职
  deleteDimission(IDs, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.deleteDimission',
      data: {
        IDs: JSON.stringify(IDs)
      },
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  //获取单条转正记录
  getOneDimission(ID, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.getOneDimission',
      data: {
        ID: ID
      },
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  //添加一条转正记录
  addDimission(data, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.addDimission',
      data: data,
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  //更新一条转正记录
  updateDimission(data, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.updateDimission',
      data: data,
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  // 批量添加离职
  batchAddDimission(data, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.batchAddDimission',
      data: data,
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },

  //黑名单
  deleteBlackList(IDs, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.deleteBlackList',
      data: {
        IDs: JSON.stringify(IDs)
      },
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  //获取单条黑名单记录
  getOneBlackList(ID, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.getOneBlackList',
      data: {
        ID: ID
      },
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  //添加一条黑名单记录
  addBlackList(data, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.addBlackList',
      data: data,
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  //更新一条黑名单记录
  updateBlackList(data, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.updateBlackList',
      data: data,
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  //批量添加黑名单
  batchAddBlackList(data, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.batchAddBlackList',
      data: data,
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  //*************宿舍***********
  getOneDormitory(ID, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.getOneDormitory',
      data: {
        ID: ID
      },
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  addDormitory(data, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.addDormitory',
      data: data,
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  updateDormitory(data, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.updateDormitory',
      data: data,
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  //删除宿舍
  deleteDormitory(IDs, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.deleteDormitory',
      data: {
        IDs: JSON.stringify(IDs)
      },
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  loadDormitoryByStore(storeID, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.getDormitory',
      data: { storeID: storeID },
      success(data, res) { cbSuccess && cbSuccess(data) },
      error(res) { cbError && cbError(res) }
    });
  },
  //api.OrgEmployee.getAllRules
  getAllRules(cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Settings.getAttendanceOnRuleList',
      success(data, res) { cbSuccess && cbSuccess(data) },
      error(res) { cbError && cbError(res) }
    });
  },
  getExtendInfo(data, cbSuccess, cbError) {
    Tool.ajax({
      data: data,
      url: 'api.OrgEmployee.getExtendList',
      success(data, res) { cbSuccess && cbSuccess(data) },
      error(res) { cbError && cbError(res) }
    });
  },
  getExtendEntryInfo(data, cbSuccess, cbError) {
    Tool.ajax({
      data: data,
      url: 'api.OrgEmployee.getExtendEntryList',
      success(data, res) { cbSuccess && cbSuccess(data) },
      error(res) { cbError && cbError(res) }
    });
  },
  getTableColumnInfo(data, cbSuccess, cbError) {
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

  getMaxPin(cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.getMaxPin',
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },

  loadEmployeeSetField(cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.getEmployeeSetField',
      success(data, res) { cbSuccess && cbSuccess(data); },
      error(res) { cbError && cbError(res); }
    });
  },

  editEmployeeSetField(id, isRequired, isHide, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.editEmployeeSetField',
      data: { ID: id, isRequired: isRequired, isHide: isHide },
      success(data, res) { cbSuccess && cbSuccess(data); },
      error(res) { cbError && cbError(res); }
    });
  },

  removeEmployeeUserByIDs(ids, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.removeEmployeeUserByIDs',
      data: { IDS: JSON.stringify(ids) },
      success(data, res) { cbSuccess && cbSuccess(data); },
      error(res) { cbError && cbError(res); }
    });
  },

  loadEmployeeUserByID(id, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.getEmployeeUserByID',
      data: { ID: id },
      success(data, res) { cbSuccess && cbSuccess(data); },
      error(res) { cbError && cbError(res); }
    });
  },

   // 修改员工信息
  editEmployeeUser(data, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.editEmployeeUser',
      data: {
        employeeMSG: JSON.stringify(data)
      },
      success(data, res) { cbSuccess && cbSuccess(data); },
      error(res) { cbError && cbError(res); }
    });
  },

  approveEmployeeUser(ids, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.approveEmployeeUser',
      data: {
        IDS: JSON.stringify(ids)
      },
      success(data, res) { cbSuccess && cbSuccess(data); },
      error(res) { cbError && cbError(res); }
    });
  },
  //自动生成员工工号
  createNumByEmployeeNumRule(params,cbSuccess,cbError){
     Tool.ajax({
      url: 'api.OrgEmployee.createNumByEmployeeNumRule',
      data: {
        orgID:params.employee.organizeID,
        stateCode:params.employee.state
      },
      success(data, res) { cbSuccess && cbSuccess(data); },
      error(res) { cbError && cbError(res); }
    });
  }
}

export default {
  state,
  mutations,
  actions
};
