/**
 * @Created Date       : 2016-09-27T10:58:50+08:00
* @Last Modified time : 2016-12-26T14:54:40+08:00
 */


import Vue from 'vue';
const Tool = Vue.tool;

import orgMap from 'src/menuMap'

// VUEX
// flux view>actions>mutations>state>view

// 数据、状态
const state = {
    //已选择屏蔽字段
    tagList: [],
    //左侧树
    systemTreeData: [],
    //菜单树
    menuTree: [],
    //菜单按钮树
    menuBtnTree: [],
    //卡片管理
    cardTree: [],
    // 工资套管理
    paySuiteTree: [],
    //组织架构树
    orgChartTree: [],
    //分级授权系统树
    systemAccreditTreeData: [],
    // 功能按钮树Data
    funTreeData: [],
    fieldTree: [],
    listOperationNodes: [],
    //屏蔽字段
    fieldData: [],
    //角色人员列表
    personRoleList: [],
    personRoleList2: [],
    // 选择人员列表
    roleList: [],
    //已选用工类型
    selectedEmploymentType: [],
    //被授权代理人
    procurator: {},
    //左侧系统树添加数据
    addSystemTreeItemVal: '',
    addSystemTreeItemValDes: '',
    // 系统树菜单data
    menuItemClickedData: '',
    //系统树菜单event
    menuItemClickedMenuName: '',
    //添加或者修改角色
    addOrUpdateRole: {},
    //功能权限tab切换
    tabCurIdx: -1,
    //角色添加菜单变量
    roleMenuJSON: [],
    //角色添加菜单按钮变量
    rolePageBtnJSON: [],
    //显示右侧当前角色或角色组属性
    showSystemRoleItemName: '',
    showSystemRoleItemDes: '',
    showSystemRoleItemGroup: '',
    //通过部门、门店、姓名查询在职员工接口树
    showEmployeeForAutTree: [],
    //删除角色人员
    deleteRole: '',
    //用工类型
    employmentType: [],

    //选择添加的角色人员
    checkRoleList: [],
    //用工类型选择
    employmentTypeChecked: [],
    //组织架构树选中的值
    setOrgChartTreeClickedVal: [],
    //修改角色人员时间
    updateDateRolePerson: [],

    //已勾选的分级授权值
    roleRoleJSON: [],
    //添加或者修改角色角色组摊出框header
    roleAddOrUpdateFlag: '',
    roleAddOrUpdateText: '',
    //搜索人员
    searchRoleName: '',


    nodeClickedID: '',

    treeClickedBool: true,

    feildChecked: [],
    feildChecked2: [],
};
// 数据修改
const mutations = {

    SetNodeClickedID(ID) {
        state.nodeClickedID = ID;
    },

    // 合并 菜单树和按钮树
    ComboOrgBtnTree(menuData, pageData, buttonData) {

        let menus = menuData || [],
            buttonPage = pageData || [],
            buttonList = buttonData || [],
            newTree = {},
            newMenu = {};

        // 使用page构建 newTree
        buttonPage.forEach(_page => {

            if (!_page) return;

            let pageCode = _page.pageName.split(':')[0];

            // filter children
            buttonList.forEach(btn => {

                // 如果btnCode跟pageCode相同，将此按钮合并为page，button与buttonPage 有相同code时，并不一样属于该page
                if (pageCode == btn.btnCode) {
                    // console.log(pageCode == btn.btnCode, pageCode, btn.btnCode)
                    _page.btnID = btn.btnID;

                    // 如果button选中，则page必选中
                    if (btn.checked) {
                        _page.checked = true;
                    }

                }

                // 将button添加至page
                else if (btn.pageID == _page.ID) {

                    if (!_page.buttons) {
                        _page.buttons = {}
                    }

                    // 如果button选中，则page必选中
                    if (btn.checked) {
                        _page.checked = true;
                    }


                    // 通过btnCode 去重，合并btnName
                    if (_page.buttons[btn.btnCode]) {
                        btn.name += '/' + btn.btnName;
                    } else {
                        btn.name = btn.btnName;
                    }

                    _page.buttons[btn.btnCode] = btn;

                }

            })

            // console.warn(_page)

            // module menu page
            let keys = pageCode.split('-');

            // console.log(keys)

            let menu;
            let menuData;
            let page;
            let pageData;


            // 根据page的Keys构建newTree
            // page 可能会出现的类型有  module-menu-page, module-menu(page),module-menu(page,button)

            if (!orgMap.map[keys[0]]) return;

            // module
            if (keys[0]) {

                let key = keys[0];

                if (!newTree[key] && orgMap.map[key]) {
                    newTree[key] = {
                        name: orgMap.map[key].name,
                        moduleID: orgMap.map[key].moduleID,
                        menus: {}
                    }
                }

                menu = newTree[key].menus;
                menuData = orgMap.map[key].menus;

            }
            // level2: menu[page,button]
            if (keys[1]) {

                let key = keys[1];

                if (!menu[key] && menuData[key]) {
                    menu[key] = {
                        name: menuData[key].name,
                    }

                    // 如果 menuID 存在，类型之一为menu
                    if (menuData[key].menuID) {
                        menu[key].menuID = menuData[key].menuID
                        menu[key].name += '   (--全局菜单)'
                    }

                }


                if (!menu[key]) return;

                // page==menu 的情况
                if (keys.length == 2) {

                    // button==menu
                    if (_page.btnID) menu[key].btnID = _page.btnID;

                    // has buttons
                    if (_page.buttons && Object.keys(_page.buttons).length > 0) {

                        menu[key].buttons = _page.buttons;
                        menu[key].hasButtons = true;
                        menu[key].checked = _page.checked;

                    }

                    // no pages ,set pageID to menu
                    if (!menuData[key].pages) {
                        menu[key].pageID = _page.ID;
                        menu[key].checked = _page.checked;
                    }

                }
                // 层级=3，menuMap中有pages时，module-menu-pages
                else if (keys.length == 3 || menuData[key].pages) {

                    if (!menu[key].pages) {
                        menu[key].pages = {}
                        menu[key].hasPages = true;
                    }

                    page = menu[key].pages;
                    pageData = menuData[key].pages;


                }

            }
            // level3: menu[page]
            if (keys[2]) {

                let key = keys[2];

                // 如果page既是button又是page，则从父级buttons中删除该page的button，
                if (menu[keys[1]].hasButtons) {
                    delete menu[keys[1]].buttons[pageCode]
                }


                if (!page[key] && pageData[key]) {
                    page[key] = _page;
                    page[key].name = pageData[key].name;
                    page[key].pageID = _page.ID;
                    // console.log(page[key])
                }

                if (!page[key]) return;

                // 添加 btnID，每一级都可能存在button
                if (_page.btnID) {
                    // console.warn('page[key].btnID =', _page.btnID)
                    page[key].btnID = _page.btnID;
                    // menu[key].checked = _page.checked;  // 入口按钮选中状态不能代替menu选中状态
                }

            }

            // if(pageCode=='schedule-menu')console.error(pageCode,menu['menu'])


        });

        // 提取 ID <> key 对照表
        let moduleIDs = {};
        let menuIDs = {};
        for (let m in orgMap.map) {

            let mod = orgMap.map[m];

            if (mod.moduleID) {
                moduleIDs[mod.moduleID] = {
                    key: m,
                    name: mod.name
                };
            }

            if (mod.menus) {
                for (let k in mod.menus) {

                    let menu = mod.menus[k] || {};

                    if (menu.menuID) {
                        menuIDs[menu.menuID] = {
                            key: k,
                            name: menu.name,
                        };
                    }

                }
            }


        }

        // 使用加载的menu数据构建 menuTree，防止遗漏没有button的menu
        let menuTree = {};
        menus.forEach(item => {

            // module
            if (item.ID < 0) {

                let mod = moduleIDs[-item.ID];

                if (mod && !menuTree[mod.key]) {
                    menuTree[mod.key] = {
                        name: mod.name,
                        moduleID: item.moduleID,
                        menus: {},
                        checked: false
                    }
                }

            }
            // menu
            else {

                let mod = moduleIDs[item.moduleID];

                if (mod && !menuTree[mod.key]) {
                    menuTree[mod.key] = {
                        name: mod.name,
                        moduleID: item.moduleID,
                        menus: {},
                        checked: false
                    }
                }

                // // 如果子集选中，则父级必选中，不完整，还需要判断生成的newTree中menu级的状态
                // if(item.checked){
                //     menuTree[mod.key].checked = true;
                // }

                let menu = menuIDs[item.ID];

                if (menu && !menuTree[mod.key].menus[menu.key]) {
                    menuTree[mod.key].menus[menu.key] = {
                        name: menu.name,
                        menuID: item.ID,
                        checked: item.checked
                    }
                }
                // console.warn('item.checked',mod.key+'-'+menu.key,item.checked)

            }

        });

        // console.log(menuTree)

        // 将menuTree 合并到 newTree ，防止遗漏没有button的menu
        for (let key in menuTree) {

            let mod = menuTree[key];

            if (!newTree[key]) {
                newTree[key] = mod || {};
            } else {

                newTree[key].checked = mod.checked

                if (mod.menus) {

                    for (let m in mod.menus) {

                        let menu = mod.menus[m] || {};

                        if (!newTree[key].menus[m]) {

                            newTree[key].menus[m] = menu;
                        }

                        newTree[key].menus[m].checked = newTree[key].menus[m].checked || menu.checked;

                    }
                }


            }

        }

        // 与menuTree比对，剔除newTree中没有权限的多余模块,多余menu
        for (let key in newTree) {

            // 删除没权限的module
            if (!menuTree[key]) {
                delete newTree[key]
            } else {

                for (let m in newTree[key].menus) {

                    // 删除没权限的 menu: menuTree中没有该menu，且该menu有menuID，非orgMap自建menu
                    if (!menuTree[key].menus[m] && newTree[key].menus[m].menuID) {
                        delete newTree[key].menus[m];
                    }

                }

            }
        }

        // console.log(newTree)

        // 转换成treeData,生成新的对照ID
        let treeData = {
            ID: -1,
            name: '根节点',
            expanded: true,
            children: []
        };
        for (let m in newTree) {

            let mod = newTree[m];

            let node_mod = {
                ID: 'moduleID-' + mod.moduleID,
                name: mod.name,
                leaf: false,
                checked: mod.checked,
                children: []
            }

            if (Object.keys(mod.menus).length == 0) continue;

            // menu
            for (let u in mod.menus) {

                let menu = mod.menus[u];

                let node_menu = {
                    ID: (menu.menuID ? 'menuID-' + menu.menuID + ',' : '') + (menu.pageID ? 'pageID-' + menu.pageID + ',' : '') + (menu.btnID ? 'btnID-' + menu.btnID : ''),
                    name: menu.name,
                    leaf: true,
                    checked: menu.checked,
                    children: []
                }


                // 添加page
                if (menu.hasPages) {

                    // page
                    for (let p in menu.pages) {

                        let pg = menu.pages[p];

                        // console.error('pg.btnID',pg.btnID)

                        let node_pg = {
                            ID: 'pageID-' + pg.ID + (pg.btnID ? ',btnID-' + pg.btnID : ''),
                            name: pg.name,
                            leaf: true,
                            checked: pg.checked,
                            children: []
                        }

                        if (pg.buttons) {
                            for (let b in pg.buttons) {

                                let bt = pg.buttons[b];

                                let node_bt = {
                                    ID: 'btnID-' + bt.btnID,
                                    name: bt.btnName,
                                    checked: bt.checked,
                                    leaf: true
                                }

                                node_pg.children.push(node_bt);

                            }
                        }

                        node_menu.children.push(node_pg);
                    }

                }

                // 添加button
                if (menu.hasButtons) {

                    for (let b in menu.buttons) {

                        let bt = menu.buttons[b];

                        let node_bt = {
                            ID: 'btnID-' + bt.btnID,
                            name: bt.btnName,
                            checked: bt.checked,
                            leaf: true
                        }

                        node_menu.children.push(node_bt);

                    }

                }

                // 如果menu选中，则module选中
                if (menu.checked) {
                    node_mod.checked = true;
                }

                node_mod.children.push(node_menu);
            }

            treeData.children.push(node_mod)

        }

        console.log(treeData)

        state.funTreeData = treeData;


        return treeData;

    },

    // 获取 菜单树和按钮树的选中结果
    GetOrgBtnTreeChecked() {

        let checkedList = [],
            modChecked = [],
            menuChecked = [],
            pageChecked = [],
            buttonChecked = [];

        state.funTreeData.children.forEach(mod => {

            mod && mod.children.forEach(menu => {

                if (menu.checked) menu.ID ? checkedList.push(menu.ID) : console.log('menu', menu.ID)

                menu.children && menu.children.forEach(page => {

                    if (page.checked) page.ID ? checkedList.push(page.ID) : console.log('page', page);

                    page.children && page.children.forEach(button => {

                        // console.log(button)

                        if (button.checked) button.ID ? checkedList.push(button.ID) : console.log('btn', button.name)
                    })

                })

            })

        })
        checkedList.forEach(item => {

            let IDs = item.split(',');

            IDs.forEach(item => {

                // btn
                if (item.indexOf('btnID-') > -1) {
                    buttonChecked.push(item.replace('btnID-', '') - 0);
                }

                if (item.indexOf('menuID-') > -1) {
                    menuChecked.push(item.replace('menuID-', '') - 0);
                }

            })


        })


        console.warn(JSON.stringify(checkedList))

        return {
            menus: menuChecked,
            buttons: buttonChecked
        };

    },

    clearAll() {
        state.menuBtnTree = [];
        state.menuTree = [];
        state.orgChartTree = [];
        state.systemAccreditTreeData = [];
        state.cardTree = [];
        state.paySuiteTree = [];
        state.employmentType = [];
        state.personRoleList = [];
    },
    //设置卡片权限数据
    SetSystemCardTree(data) {
        state.cardTree = data;
    },
    //设置工资套权限数据
    SetPaySuiteTree(data) {
        state.paySuiteTree = data;
    },
    //删除角色人员
    clearRoleListUi(ID) {
        //匹配item.userRoleID == ID
        var a = state.personRoleList.filter((item) => {
            if (item.userRoleID == ID) return true;
            return false
        });
        if (a.length > 0) state.personRoleList.$remove(a[0]);
    },
    clearCheckRoleList() {
        state.checkRoleList = [];
        state.roleList = [];
    },
    //清空添加修改角色角色组val
    changeAddSystemTreeItemVal() {
        state.addSystemTreeItemVal = ''
    },
    //改变添加修改角色弹窗header
    changeRoleAddOrUpdateFlag(data, menuName) {
        console.log(menuName, data);
        if (menuName == 'itemAddGroup') {
            state.roleAddOrUpdateFlag = '添加角色组'
            state.roleAddOrUpdateText = '角色组名称'
        } else if (menuName == 'itemAddRole') {
            state.roleAddOrUpdateFlag = '添加角色'
            state.roleAddOrUpdateText = '角色名称'
        } else if (menuName == 'itemEdit') {
            if (data.type == '2') {
                state.roleAddOrUpdateFlag = '修改角色'
                state.roleAddOrUpdateText = '角色名称'
            } else {
                state.roleAddOrUpdateFlag = '修改角色组'
                state.roleAddOrUpdateText = '角色组名称'
            }
        }
    },
    //分级授权系统树
    SetSystemAccreditTree(data) {
        state.systemAccreditTreeData = data;
    },
    //改变添加完成后的角色人员列表
    addpersonRoleListUi() {
        for (var i = 0; i < state.checkRoleList.length; i++) {
            state.personRoleList.$set(state.personRoleList.length, {
                endTime: state.checkRoleList[i].endTime,
                startTime: state.checkRoleList[i].startTime,
                userName: state.checkRoleList[i].userName,
                userNum: state.checkRoleList[i].userNum,
                userRoleID: state.checkRoleList[i].id,
            })
        }

        var arr = [];
        state.personRoleList.forEach(function (item) {
            var obj = {};
            obj.ID = item.ID;
            obj.userRoleID = item.userRoleID;
            obj.startTime = item.startTime;
            obj.endTime = item.endTime;
            obj.roleID = item.roleID;
            arr.push(obj);
        })
        state.personRoleList2 = arr;
        console.error(state.personRoleList)
    },
    //给角色添加分级授权
    systemAccreditTreeDataRecursion(systemAccreditTreeData) {
        if (systemAccreditTreeData.children) {
            for (var i = 0; i < systemAccreditTreeData.children.length; i++) {
                if (systemAccreditTreeData.children[i].checked) {
                    state.roleRoleJSON.$set(state.roleRoleJSON.length, {
                        toRoleID: systemAccreditTreeData.children[i].ID, //3 4 9 10 11
                        roleID: state.addOrUpdateRole.ID
                    })
                }
                this.systemAccreditTreeDataRecursion(systemAccreditTreeData.children[i]);
            }
        }
    },
    // 给角色添加菜单
    setMenuTreeRecursion(menuTree) {
        if (menuTree.children) {
            for (var i = 0; i < menuTree.children.length; i++) {
                if (menuTree.children[i].checked && menuTree.children[i].leaf) {
                    state.roleMenuJSON.$set(state.roleMenuJSON.length, {
                        menuID: menuTree.children[i].ID,
                        roleID: state.addOrUpdateRole.ID
                    })
                }
                this.setMenuTreeRecursion(menuTree.children[i]);
            }
        }
    },
    //给角色添加菜单按钮
    setMenuBtnTreeRecursion(menuBtnTree) {
        if (menuBtnTree.children) {
            for (var i = 0; i < menuBtnTree.children.length; i++) {
                if (menuBtnTree.children[i].checked && menuBtnTree.children[i].btnID) {
                    state.rolePageBtnJSON.$set(state.rolePageBtnJSON.length, {
                        btnID: menuBtnTree.children[i].btnID,
                        roleID: state.addOrUpdateRole.ID
                    })
                }
                this.setMenuBtnTreeRecursion(menuBtnTree.children[i]);
            }
        }
    },
    //人员权限 选择组织架构树
    setOrgChartTreeRecursion(orgChartTree) {
        if (orgChartTree.children) {
            for (var i = 0; i < orgChartTree.children.length; i++) {
                if (orgChartTree.children[i].checked) {
                    state.setOrgChartTreeClickedVal.$set(state.setOrgChartTreeClickedVal.length, {
                        organizeID: orgChartTree.children[i].organizeID,
                        organizeType: orgChartTree.children[i].organizeType,
                        roleID: state.addOrUpdateRole.ID,
                    })
                }
                this.setOrgChartTreeRecursion(orgChartTree.children[i]);
            }
        }
    },
    // 系统树点击菜单当前数据（roleID,），菜单名
    setMenuItemClicked(data, menuName) {
        state.menuItemClickedData = data;
        state.menuItemClickedMenuName = menuName;
    },
    //设置当前角色ID  roleID
    setAddOrUpdateRole(data) {
        state.addOrUpdateRole.roleName = data.roleName;
        state.addOrUpdateRole.ID = data.ID;
        state.addOrUpdateRole.type = data.type;
    },
    //设置组织架构树
    OrgChartTree(data) {
        state.orgChartTree = data;
    },
    //设置用工类型
    setEmploymentType(data) {
        state.employmentType = data;
    },
    //通过部门、门店、姓名查询在职员工接口树
    setEmployeeForAutTree(data) {
        state.showEmployeeForAutTree = data;
    },
    //设置显示右侧当前角色或角色组属性
    SetSystemRoleItem(data) {
        //state.showSystemRoleItemName=data.
        if (data[0]) {
            if (data[0].type == 1) {
                state.showSystemRoleItemName = '';
                state.showSystemRoleItemGroup = data[0].roleName;
            } else if (data[0].type == 2) {
                state.showSystemRoleItemGroup = data[0].parentName;
                state.showSystemRoleItemName = data[0].roleName;
            }
            state.showSystemRoleItemDes = data[0].des;
        }
    },
    //页面最左侧系统树
    SetSystemTree(data) {
        state.systemTreeData = data;
        //console.log(state.systemTreeData)
    },
    //页面最右侧人员数据
    SetPersonRoleList(data) {
        state.personRoleList = [];
        state.personRoleList = data;

        var arr = [];


        data.forEach(function (item) {
            var obj = {};
            obj.ID = item.ID;
            obj.userRoleID = item.userRoleID;
            obj.startTime = item.startTime;
            obj.endTime = item.endTime;
            obj.roleID = item.roleID;
            arr.push(obj);
        })
        state.personRoleList2 = arr;


    },
    // 屏蔽人员字段条件数据
    SetFieldData(data) {
        state.fieldData = data;
    },
    //设置菜单树
    SetMenuTree(data) {
        state.menuTree = [];
        state.menuTree = data;
    },
    //设置菜单按钮树
    SetMenuBtnTree(data) {
        state.menuBtnTree = [];
        state.menuBtnTree = data;
    },
    //查询弹窗人员列表
    SetRoleList(data) {
        state.roleList = [];
        state.roleList = data;
    },
    //删除已选屏蔽人员字段
    removeTagList(val) {
        for (var i = 0; i < state.fieldData.length; i++) {
            if (state.fieldData[i].fieldS) {
                for (var j = 0; j < state.fieldData[i].fieldS.length; j++) {
                    if (state.fieldData[i].fieldS[j].id == val) {
                        state.fieldData[i].fieldS[j].checked = false;
                    }
                }
            }
        }
    },
    //清空已选屏蔽人员字段
    clearTagList() {
        state.tagList = [];
        for (var i = 0; i < state.fieldData.length; i++) {
            if (state.fieldData[i].fieldS) {
                for (var j = 0; j < state.fieldData[i].fieldS.length; j++) {
                    state.fieldData[i].fieldS[j].checked = false;
                }
            }
        }
    },
    //屏蔽人员字段勾选
    cascadeCheck(index, fieldS) {
        if (fieldS.checked) {
            fieldS.checked = false;
            for (var i = 0; i < state.tagList.length; i++) {
                if (state.tagList[i].label == fieldS.fieldText) {
                    state.tagList.$remove(state.tagList[i]);
                    break;
                }
            }
        } else {
            if (state.tagList.length >= 10) {
                return;
            } else {
                fieldS.checked = true;
                state.tagList.$set(state.tagList.length, {
                    label: fieldS.fieldText,
                    value: fieldS.id
                })
            }
        }
    },
    // 勾选用工类型
    addEmploymentType(index, text) {
        if (text.checked) {
            text.checked = false;
            for (var i = 0; i < state.selectedEmploymentType.length; i++) {
                if (state.selectedEmploymentType[i].name == text.name) {
                    state.selectedEmploymentType.$remove(state.selectedEmploymentType[i]);
                    break;
                }
            }
        } else {
            text.checked = true;
            state.selectedEmploymentType.$set(state.selectedEmploymentType.length, {
                name: text.name,
                id: text.id
            })
        }
    },
    //勾选被授权代理人
    addForProcurator(index, item) {
        for (var i = 0; i < state.roleList.length; i++) {
            state.roleList[i].checked = false;
        }
        item.checked = true;
        state.procurator = {
            name: item.name,
        };
    },
    //设置字段权限树
    setFieldTree(data, listOperationNodes) {
        // this.fieldTreeRecursion(data);
        state.fieldTree = data;
        state.listOperationNodes = listOperationNodes;
    },
    feildSelect(column) {
        column.children.forEach(c => {
            c.children.forEach(m => {
                if (m.type == 'field') {
                    m.children.forEach(d => {
                        if (d.checked) {
                            state.feildChecked.push({
                                roleID: state.addOrUpdateRole.ID,
                                columnID: m.ID,
                                columnStatus: d.columnStatus,
                            })
                        }
                    })
                } else {
                    m.children.forEach(k => {
                        if (Array.isArray(k.children)) {
                            k.children.forEach(d => {
                                if (d.checked) {
                                    state.feildChecked.push({
                                        roleID: state.addOrUpdateRole.ID,
                                        columnID: k.ID,
                                        columnStatus: d.columnStatus,
                                    })
                                }
                            })
                        }

                    })
                }
            })
            // console.log(c)
            // if (c.text == '花名册' || c.text == '薪酬核算') {
            //     c.children.forEach(m => {
            //         if (m.text == '员工工号' || m.text == '姓名' || m.text == '组织' || m.text == '岗位') {
            //             m.children.forEach(d => {
            //                 if (d.checked) {
            //                     state.feildChecked.push({
            //                         roleID: state.addOrUpdateRole.ID,
            //                         columnID: m.ID,
            //                         columnStatus: d.columnStatus,
            //                     })
            //                 }
            //             })
            //         } else {
            //             m.children.forEach(k => {
            //                 if (Array.isArray(k.children)) {
            //                     k.children.forEach(d => {
            //                         if (d.checked) {
            //                             state.feildChecked.push({
            //                                 roleID: state.addOrUpdateRole.ID,
            //                                 columnID: k.ID,
            //                                 columnStatus: d.columnStatus,
            //                             })
            //                         }
            //                     })
            //                 }

            //             })
            //         }

            //     })
            // } else {
            //     c.children.forEach(m => {
            //         if (Array.isArray(m.children)) {
            //             m.children.forEach(d => {
            //                 if (d.checked) {
            //                     state.feildChecked.push({
            //                         roleID: state.addOrUpdateRole.ID,
            //                         columnID: m.ID,
            //                         columnStatus: d.columnStatus,
            //                     })
            //                 }
            //             })
            //         }
            //     })
            // }

        })
    },

};
// 操作
const actions = {

    // 设置选中树节点ID
    setNodeClickedID(ID) {
        mutations.SetNodeClickedID(ID);
    },

    clearAll() {
        mutations.clearAll();
    },
    //每次点击添加角色人员清空上次的操作
    clearCheckRoleList() {
        mutations.clearCheckRoleList();
    },
    //添加用工类型
    addEmploymentType(index, text) {
        mutations.addEmploymentType(index, text);
    },
    //处理业务逻辑
    removeTagList(val) {
        mutations.removeTagList(val);
    },
    clearTagList() {
        mutations.clearTagList();
    },
    cascadeCheck(index, fieldS) {
        mutations.cascadeCheck(index, fieldS);
    },
    addRolePerson(index, person) {
        mutations.addRolePerson(index, person);
    },
    addForProcurator(index, item) {
        mutations.addForProcurator(index, item);
    },
    //设置当前角色ID  roleID
    setAddOrUpdateRole(data) {
        mutations.setAddOrUpdateRole(data);
    },
    // 系统树点击菜单当前数据，菜单名
    setMenuItemClicked(data, menuName) {
        mutations.setMenuItemClicked(data, menuName);
        mutations.changeRoleAddOrUpdateFlag(data, menuName);
        mutations.changeAddSystemTreeItemVal();
    },
    // 全局保存
    goSaveBtn() {
        var self = this;
        if (state.tabCurIdx == 0) { //保存功能权限

            let checkedList = mutations.GetOrgBtnTreeChecked();

            // console.error(checkedList)

            // return;

            if (checkedList.menus.length > 0) {
                var params = '';

                let mList = [];

                checkedList.menus.forEach(m => {
                    mList.push({
                        menuID: m,
                        roleID: state.addOrUpdateRole.ID
                    })
                })

                params = '&roleMenuJSON=' + JSON.stringify(mList);
            } else {
                var params = {};
                params.roleID = state.addOrUpdateRole.ID;
            }

            console.log(params)
            console.log(state.addOrUpdateRole.ID)
            console.log(checkedList)
            Tool.ajax({
                url: 'api.Permission.insertRoleMenuList',
                data: params,
                success(data, res) {
                    if (res.data.success) {
                        Vue.tool.showTip({
                            type: 'success', // 提示类型 success,warning,info,danger
                            msg: res.data.err_msg, // 提示文字
                            duration: 1000 // 自动消失时间
                        });
                        state.treeClickedBool = true;
                    }
                },
                error(res) {
                    Vue.tool.showTip({
                        type: 'danger', // 提示类型 success,warning,info,danger
                        msg: res, // 提示文字
                        duration: 1000 // 自动消失时间
                    });
                }
            });
            state.roleMenuJSON = [];

            /* 提交按钮*/

            if (checkedList.buttons.length > 0) {
                var params = '';

                let btList = [];

                checkedList.buttons.forEach(btnID => {
                    btList.push({
                        btnID: btnID,
                        roleID: state.addOrUpdateRole.ID
                    })
                })

                params = '&rolePageBtnJSON=' + JSON.stringify(btList)
            } else {
                var params = {};
                params.roleID = state.addOrUpdateRole.ID;
            }
            Tool.ajax({
                url: 'api.Permission.insertRolePageBtn',
                data: params,
                success(data, res) {
                    if (res.data.success) {
                        Vue.tool.showTip({
                            type: 'success', // 提示类型 success,warning,info,danger
                            msg: res.data.err_msg, // 提示文字
                            duration: 1000 // 自动消失时间
                        });
                        state.treeClickedBool = true;
                    }
                },
                error(res) {
                    Vue.tool.showTip({
                        type: 'danger', // 提示类型 success,warning,info,danger
                        msg: res, // 提示文字
                        duration: 1000 // 自动消失时间
                    });
                }
            });


        } else if (state.tabCurIdx == 1) { //保存人员权限
            state.setOrgChartTreeClickedVal = [];
            mutations.setOrgChartTreeRecursion(state.orgChartTree);
            if (state.setOrgChartTreeClickedVal.length > 0) {
                var params = '';
                params = '&roleOrganizeJSON=' + JSON.stringify(state.setOrgChartTreeClickedVal)
            } else {
                var params = {};
                params.roleID = state.addOrUpdateRole.ID;
            }
            Tool.ajax({
                url: 'api.Permission.insertRoleOrganize',
                data: params,
                success(data, res) {
                    if (res.data.success) {
                        Vue.tool.showTip({
                            type: 'success', // 提示类型 success,warning,info,danger
                            msg: res.data.err_msg, // 提示文字
                            duration: 1000 // 自动消失时间
                        });
                        state.treeClickedBool = true;
                    }
                },
                error(res) {
                    Vue.tool.showTip({
                        type: 'danger', // 提示类型 success,warning,info,danger
                        msg: res, // 提示文字
                        duration: 1000 // 自动消失时间
                    });
                }
            });

            var roleStateJSON = [];
            for (var i = 0; i < state.employmentType.length; i++) {
                for (var j = 0; j < state.employmentTypeChecked.length; j++) {
                    if (state.employmentType[i].ID == state.employmentTypeChecked[j]) {
                        roleStateJSON.push({
                            stateCode: state.employmentType[i].code,
                            roleID: state.addOrUpdateRole.ID
                        })
                    }
                }
            }
            if (roleStateJSON.length > 0) {
                var params = '';
                params = '&roleStateJSON=' + JSON.stringify(roleStateJSON)
            } else {
                var params = {};
                params.roleID = state.addOrUpdateRole.ID;
            }
            Tool.ajax({
                url: 'api.Permission.insertRoleState',
                data: params,
                success(data, res) {
                    if (res.data.success) {
                        Vue.tool.showTip({
                            type: 'success', // 提示类型 success,warning,info,danger
                            msg: res.data.err_msg, // 提示文字
                            duration: 1000 // 自动消失时间
                        });
                        state.treeClickedBool = true;
                    }
                },
                error(res) {
                    Vue.tool.showTip({
                        type: 'danger', // 提示类型 success,warning,info,danger
                        msg: res, // 提示文字
                        duration: 1000 // 自动消失时间
                    });
                }
            });
        } else if (state.tabCurIdx == 2) { //分级授权
            //插入分级授权
            //roleRoleJSON:[{roleID:1,toRoleID:1},{}]
            mutations.systemAccreditTreeDataRecursion(state.systemAccreditTreeData);
            if (state.roleRoleJSON.length > 0) {
                var params = '';
                params = '&roleRoleJSON=' + JSON.stringify(state.roleRoleJSON)
            } else {
                var params = {};
                params.roleID = state.addOrUpdateRole.ID;
            }
            Tool.ajax({
                url: 'api.Permission.insertRoleRole',
                data: params,
                success(data, res) {
                    if (res.data.success) {
                        Vue.tool.showTip({
                            type: 'success', // 提示类型 success,warning,info,danger
                            msg: res.data.err_msg, // 提示文字
                            duration: 1000 // 自动消失时间
                        });
                        state.treeClickedBool = true;
                    }
                },
                error(res) {
                    if (res) {
                        Vue.tool.showTip({
                            type: 'danger', // 提示类型 success,warning,info,danger
                            msg: res, // 提示文字
                            duration: 1000 // 自动消失时间
                        });
                    }
                }
            });
            state.roleRoleJSON = [];
        } else if (state.tabCurIdx == 14) {
            //按钮权限
            // //rolePageBtnJSON:[{roleID:1,btnID,}]
            // mutations.setMenuBtnTreeRecursion(state.menuBtnTree);
            // if (state.rolePageBtnJSON.length > 0) {
            //     var params = '';
            //     params = '&rolePageBtnJSON=' + JSON.stringify(state.rolePageBtnJSON)
            // } else {
            //     var params = {};
            //     params.roleID = state.addOrUpdateRole.ID;
            // }
            // Tool.ajax({
            //     url: 'api.Permission.insertRolePageBtn',
            //     data: params,
            //     success(data, res) {
            //         if (res.data.success) {
            //             Vue.tool.showTip({
            //                 type: 'success', // 提示类型 success,warning,info,danger
            //                 msg: res.data.err_msg, // 提示文字
            //                 duration: 1000 // 自动消失时间
            //             });
            //             state.treeClickedBool = true;
            //         }
            //     },
            //     error(res) {
            //         Vue.tool.showTip({
            //             type: 'danger', // 提示类型 success,warning,info,danger
            //             msg: res, // 提示文字
            //             duration: 1000 // 自动消失时间
            //         });
            //     }
            // });
            // state.rolePageBtnJSON = [];
        } else if (state.tabCurIdx == 3) { //卡片权限
            var roleCardJSON = [];
            if (state.cardTree.children) {
                for (var i = 0; i < state.cardTree.children.length; i++) {
                    if (state.cardTree.children[i].checked) {
                        roleCardJSON.$set(roleCardJSON.length, {
                            cardID: state.cardTree.children[i].ID,
                            roleID: state.addOrUpdateRole.ID
                        })
                    }
                }
            }
            var params = {
                roleID: state.addOrUpdateRole.ID,
            }
            if (roleCardJSON.length > 0) {
                params.roleCardJSON = JSON.stringify(roleCardJSON);
            }

            Tool.ajax({
                url: 'api.Permission.insertRoleCardList',
                data: params,
                success(data, res) {
                    if (res.data.success) {
                        Vue.tool.showTip({
                            type: 'success', // 提示类型 success,warning,info,danger
                            msg: res.data.err_msg, // 提示文字
                            duration: 1000 // 自动消失时间
                        });
                        state.treeClickedBool = true;
                    }
                },
                error(res) {
                    Vue.tool.showTip({
                        type: 'danger', // 提示类型 success,warning,info,danger
                        msg: res, // 提示文字
                        duration: 1000 // 自动消失时间
                    });
                }
            });
        } else if (state.tabCurIdx == 4) { //工资套权限
            var rolePayitemsJSON = [];
            if (state.paySuiteTree.children) {
                for (var i = 0; i < state.paySuiteTree.children.length; i++) {
                    if (state.paySuiteTree.children[i].checked) {
                        rolePayitemsJSON.$set(rolePayitemsJSON.length, {
                            payitemsID: state.paySuiteTree.children[i].ID,
                            roleID: state.addOrUpdateRole.ID
                        })
                    }
                }
            }
            var params = {
                roleID: state.addOrUpdateRole.ID,
            }
            if (rolePayitemsJSON.length > 0) {
                params.rolePayitemsJSON = JSON.stringify(rolePayitemsJSON);
            }
            Tool.ajax({
                url: 'api.Permission.insertRolePaySuiteList',
                data: params,
                success(data, res) {
                    if (res.data.success) {
                        Vue.tool.showTip({
                            type: 'success', // 提示类型 success,warning,info,danger
                            msg: res.data.err_msg, // 提示文字
                            duration: 1000 // 自动消失时间
                        });
                        state.treeClickedBool = true;
                    }
                },
                error(res) {
                    Vue.tool.showTip({
                        type: 'danger', // 提示类型 success,warning,info,danger
                        msg: res, // 提示文字
                        duration: 1000 // 自动消失时间
                    });
                }
            });
        } else if (state.tabCurIdx == 5) {
            state.feildChecked = [];
            var temp = [];
            mutations.feildSelect(state.fieldTree);

            var params = {
                roleID: state.addOrUpdateRole.ID,
            }
            if (state.feildChecked.length > 0) {
                params.roleFieldJSON = JSON.stringify(temp.concat(state.feildChecked));
            }

            console.log(params.roleFieldJSON)
            console.log(temp)
            Tool.ajax({
                url: 'api.Permission.insertRoleFieldList',
                data: params,
                success(data, res) {
                    // Vue.$nextTick(()=>{
                    // self.temp=state.feildChecked;
                    // })
                    // console.log(self.temp);
                    if (res.data.success) {
                        Vue.tool.showTip({
                            type: 'success', // 提示类型 success,warning,info,danger
                            msg: res.data.err_msg, // 提示文字
                            duration: 1000 // 自动消失时间
                        });
                        state.treeClickedBool = true;
                    }
                },
                error(res) {
                    Vue.tool.showTip({
                        type: 'danger', // 提示类型 success,warning,info,danger
                        msg: res, // 提示文字
                        duration: 1000 // 自动消失时间
                    });
                }
            });
        }
    },

    // 加载系统树
    loadSystemTreeData(cbSuccess, cbError) {
        Tool.ajax({
            url: 'api.Permission.selectSystemTree',
            data: '',
            success(data, res) {
                var treeData = Tool.convertToTree(data);
                var root = {
                    ID: -1,
                    roleName: '系统角色树',
                    children: [],
                    expanded: true,
                    type: 0
                };
                treeData.forEach(function (item) {
                    item.expanded = true;
                    root.children.push(item);
                });
                mutations.SetSystemTree(root);
                // if (cbSuccess) cbSuccess(data);
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
    //修改角色人员的过期时间
    updateDate(data, ID) {
        console.log(state.personRoleList2)
        console.log(data)
        var params = {};
        for (var k = 0; k < state.personRoleList2.length; k++) {
            if (Number(ID) == state.personRoleList2[k].userRoleID) {
                console.log(data, state.personRoleList2[k].startTime, state.personRoleList2[k].endTime)
                if (state.personRoleList2[k].startTime != data[0] || state.personRoleList2[k].endTime != data[1]) {
                    params.startTime = data[0];
                    params.endTime = data[1];
                    state.personRoleList2[k].startTime = params.startTime;
                    state.personRoleList2[k].endTime = params.endTime;
                    params.ID = Number(ID);
                    Tool.ajax({
                        url: 'api.Permission.updateUserRole',
                        data: params,
                        success(roleNameData, res) {
                            if (res.data.success) {
                                Vue.tool.showTip({
                                    type: 'success', // 提示类型 success,warning,info,danger
                                    msg: res.data.err_msg, // 提示文字
                                    duration: 1000 // 自动消失时间
                                });
                            }
                        },
                        error(res) {

                        }
                    });
                }
            }
        }

        var abc = "sdad";

        function asd(s) {
            s = s + "sadad";
        }

        asd(abc);
        console.log(abc);

    },
    //通过人员名查询人员
    searchRoleNameFn(name) {
        Tool.ajax({
            url: 'api.Permission.selectEmployeeForAut',
            data: '&name=' + name,
            success(nameData, res) {
                mutations.SetRoleList(nameData);
            },
            error(res) {

            }
        })
    },
    // 加载添加（摊出框）角色人员列表组织架构树
    loadRoleList(cbSuccess, cbError) {
        // Tool.ajax({
        //   url: 'api.Permission.selectDepartment',
        //   success(deptData, res) {
        //     Tool.ajax({
        //       url: 'api.Permission.selectStore',
        //       success(storeData, res) {
        //         if (Array.isArray(deptData)) {
        //           deptData.forEach(function(elem) {
        //             elem.nodeType = "department";
        //             elem.expanded = false;
        //             elem.text = elem.departmentName;
        //             if (Array.isArray(storeData)) {
        //               var childrenButton = storeData.filter(function(item) {
        //                 return item.deptID == elem.ID;
        //               });
        //               elem.children = [];
        //               childrenButton.forEach(function(item) {
        //                 item.nodeType = "store";
        //                 item.text = item.storeName;
        //                 elem.children.push(item);
        //               });
        //             }
        //           });
        //         }
        //         // var treeData = Tool.convertToTree(deptData, 'deptID');
        //         var treeData2 = Tool.convertToTree(deptData)
        //         var root = {
        //           ID: -1,
        //           pageName: '系统树',
        //           children: [],
        //           expanded: true
        //         };
        //         treeData2.forEach(function(item) {
        //           item.expanded = true;
        //           root.children.push(item);
        //         });
        //
        //         // 处理没有挂载在部门的 store
        //         if (Array.isArray(storeData)) {
        //           storeData.forEach((elem) => {
        //             if (!elem.nodeType) {
        //               elem.text = elem.storeName;
        //               root.children.push(elem);
        //             }
        //           });
        //         }
        //         //通过部门、门店、姓名查询在职员工接口树
        //         mutations.setEmployeeForAutTree(root);
        //       },
        //       error(res) {
        //         Vue.tool.showTip({
        //           type: 'danger', // 提示类型 success,warning,info,danger
        //           msg: res, // 提示文字
        //           duration: 1000 // 自动消失时间
        //         });
        //       }
        //     });
        //   },
        //   error(res) {
        //     Vue.tool.showTip({
        //       type: 'danger', // 提示类型 success,warning,info,danger
        //       msg: res, // 提示文字
        //       duration: 1000 // 自动消失时间
        //     });
        //   }
        // })
    },
    //通过部门、门店、姓名查询在职员工接口树 查询人员列表并展示
    showEmployeeForAutTreeRole(data) {
        console.log('load')
        var params = {};
        if (data.nodeType == 'store') {
            params.storeID = data.ID;
        } else if (data.nodeType == 'department') {
            params.deptID = data.ID;
        } else {
            params.teamID = data.ID;
        }
        params.roleID = state.addOrUpdateRole.ID;
        Tool.ajax({
            url: 'api.Permission.selectEmployeeForAut',
            data: params,
            success(data, res) {
                mutations.SetRoleList(data);
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
    // 添加角色人员
    addRolePersonBtn(cbSuccess, cbError) {
        var self = this;
        var params = [];
        for (var i = 0; i < state.checkRoleList.length; i++) {
            if (!state.checkRoleList[i].endTime || !state.checkRoleList[i].startTime) {
                Vue.tool.showTip({
                    type: 'danger', // 提示类型 success,warning,info,danger
                    msg: '请填写到期时间', // 提示文字
                    duration: 1000 // 自动消失时间
                });
                return;
            }
            params.push({
                roleID: state.addOrUpdateRole.ID,
                operatorID: state.checkRoleList[i].id,
                endTime: Tool.iDate(state.checkRoleList[i].endTime).y + '/' + Tool.iDate(state.checkRoleList[i].endTime).mm + '/' + Tool.iDate(state.checkRoleList[i].endTime).dd,
                startTime: Tool.iDate(state.checkRoleList[i].startTime).y + '/' + Tool.iDate(state.checkRoleList[i].startTime).mm + '/' + Tool.iDate(state.checkRoleList[i].startTime).dd
            })
        }
        if (params.length > 0) {
            Tool.ajax({
                url: 'api.Permission.inserUserRole',
                data: '&userRoleJSON=' + JSON.stringify(params),
                success(data, res) {
                    cbSuccess(data);
                    if (res.data.success) {
                        // 改变添加成功后的角色人员列表
                        mutations.addpersonRoleListUi();
                        mutations.clearCheckRoleList();
                        var selectEmployeeByRoleIDParsms = {};
                        selectEmployeeByRoleIDParsms.roleID = state.nodeClickedID;
                        //查询角色人员
                        Tool.ajax({
                            url: 'api.Permission.selectUserRole',
                            data: selectEmployeeByRoleIDParsms,
                            success(data, res) {
                                mutations.SetPersonRoleList(data);
                            },
                            error(res) {
                                Vue.tool.showTip({
                                    type: 'danger', // 提示类型 success,warning,info,danger
                                    msg: res, // 提示文字
                                    duration: 1000 // 自动消失时间
                                });
                            }
                        });
                        Vue.tool.showTip({
                            type: 'success', // 提示类型 success,warning,info,danger
                            msg: res.data.err_msg, // 提示文字
                            duration: 1000 // 自动消失时间
                        });
                    }
                },
                error(res) {
                    Vue.tool.showTip({
                        type: 'danger', // 提示类型 success,warning,info,danger
                        msg: res, // 提示文字
                        duration: 1000 // 自动消失时间
                    });
                }
            });
        } else {
            Vue.tool.showTip({
                type: 'danger', // 提示类型 success,warning,info,danger
                msg: '您当前没有选中要操作的人员！', // 提示文字
                duration: 2000 // 自动消失时间
            });
        }

    },
    //删除角色人员
    goDeleteRole() {
        var params = {};
        params.ID = state.deleteRole.userRoleID;
        Tool.ajax({
            url: 'api.Permission.deleteUserRole',
            data: params,
            success(data, res) {
                mutations.clearRoleListUi(state.deleteRole.userRoleID);
                if (res.data.success) {
                    Vue.tool.showTip({
                        type: 'success', // 提示类型 success,warning,info,danger
                        msg: res.data.err_msg, // 提示文字
                        duration: 1000 // 自动消失时间
                    });
                }
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
    //添加左侧系统树 角色或者角色组
    addSystemTreeItem() {
        var self = this;
        if (state.menuItemClickedMenuName == 'itemAddGroup') {
            var params = {};
            params.roleName = state.addSystemTreeItemVal;
            params.parentID = -1;
            params.type = 1;
            params.des = '';
            Tool.ajax({
                url: 'api.Permission.insertSystemTree',
                data: params,
                success(data, res) {
                    Vue.tool.showTip({
                        type: 'success', // 提示类型 success,warning,info,danger
                        msg: '添加成功', // 提示文字
                        duration: 1000 // 自动消失时间
                    });
                    self.loadSystemTreeData();
                },
                error(res) {
                    Vue.tool.showTip({
                        type: 'danger', // 提示类型 success,warning,info,danger
                        msg: res, // 提示文字
                        duration: 1000 // 自动消失时间
                    });
                }
            });

        } else if (state.menuItemClickedMenuName == 'itemAddRole') {
            var params = {};
            params.roleName = state.addSystemTreeItemVal;
            params.parentID = state.menuItemClickedData.ID;
            params.type = 2;
            params.des = state.addSystemTreeItemValDes;
            Tool.ajax({
                url: 'api.Permission.insertSystemTree',
                data: params,
                success(data, res) {
                    Vue.tool.showTip({
                        type: 'success', // 提示类型 success,warning,info,danger
                        msg: '添加成功', // 提示文字
                        duration: 1000 // 自动消失时间
                    });
                    self.loadSystemTreeData();
                    console.log(data)
                },
                error(res) {
                    Vue.tool.showTip({
                        type: 'danger', // 提示类型 success,warning,info,danger
                        msg: res, // 提示文字
                        duration: 1000 // 自动消失时间
                    });
                }
            });
        } else if (state.menuItemClickedMenuName == 'itemEdit') {
            var params = {};
            params.ID = state.menuItemClickedData.ID;
            params.roleName = state.addSystemTreeItemVal;
            params.des = state.addSystemTreeItemValDes;
            Tool.ajax({
                url: 'api.Permission.updateSystemTree',
                data: params,
                success(data, res) {
                    Vue.tool.showTip({
                        type: 'success', // 提示类型 success,warning,info,danger
                        msg: '修改成功', // 提示文字
                        duration: 1000 // 自动消失时间
                    });
                    self.loadSystemTreeData();
                },
                error(res) {
                    Vue.tool.showTip({
                        type: 'danger', // 提示类型 success,warning,info,danger
                        msg: res, // 提示文字
                        duration: 1000 // 自动消失时间
                    });
                }
            });


        }

    },
    //删除系统左侧角色树
    deleteSystemTreeItem() {
        var self = this;
        if (state.menuItemClickedData.children.length > 0) {
            console.log(state.menuItemClickedData)
            Vue.tool.showTip({
                type: 'danger', // 提示类型 success,warning,info,danger
                msg: '当前角色组下含有角色，请勿删除', // 提示文字
                duration: 1000 // 自动消失时间
            });
            return;
        }
        if (state.menuItemClickedMenuName == 'deleteItem') {
            var params = {};
            params.ID = state.menuItemClickedData.ID;
            Tool.ajax({
                url: 'api.Permission.deleteSystemTree',
                data: params,
                success(data, res) {
                    Vue.tool.showTip({
                        type: 'success', // 提示类型 success,warning,info,danger
                        msg: '删除成功', // 提示文字
                        duration: 1000 // 自动消失时间
                    });
                    self.loadSystemTreeData();
                    console.log(data)
                },
                error(res) {
                    Vue.tool.showTip({
                        type: 'danger', // 提示类型 success,warning,info,danger
                        msg: res, // 提示文字
                        duration: 1000 // 自动消失时间
                    });
                }
            });
        }
    },
    // 点击系统树加载数据
    onSystemTreeShow() {
        var selectRoleParams = {};
        selectRoleParams.ID = state.nodeClickedID;
        //显示右侧当前角色或角色组属性
        Tool.ajax({
            url: 'api.Permission.selectRole',
            data: selectRoleParams,
            success(data, res) {
                mutations.SetSystemRoleItem(data);
            },
            error(res) {
                Vue.tool.showTip({
                    type: 'danger', // 提示类型 success,warning,info,danger
                    msg: res, // 提示文字
                    duration: 1000 // 自动消失时间
                });
            }
        });
        var selectEmployeeByRoleIDParsms = {};
        selectEmployeeByRoleIDParsms.roleID = state.nodeClickedID;
        //查询角色人员
        Tool.ajax({
            url: 'api.Permission.selectUserRole',
            data: selectEmployeeByRoleIDParsms,
            success(data, res) {
                mutations.SetPersonRoleList(data);
            },
            error(res) {
                Vue.tool.showTip({
                    type: 'danger', // 提示类型 success,warning,info,danger
                    msg: res, // 提示文字
                    duration: 1000 // 自动消失时间
                });
            }
        });


        Vue.Tool.asyncLoader([actions.loadDataOfMenu, actions.loadDataOfButtons], function () {
            mutations.ComboOrgBtnTree(state.menuTree, state.menuBtnTree.btnPageList, state.menuBtnTree.buttonList);
        })();


        actions.loadOrgTree();
        actions.loadLevelTree();
        actions.loadCardTree();
        actions.loadPaySuiteTree();
        actions.loadFieldTree();


    },
    // 加载菜单
    loadFnTree() {
        Vue.Tool.asyncLoader([actions.loadDataOfMenu, actions.loadDataOfButtons], function () {
            mutations.ComboOrgBtnTree(state.menuTree, state.menuBtnTree.btnPageList, state.menuBtnTree.buttonList);
        })();
    },
    loadRole() {
        actions.loadOrgTree();
        actions.loadEmploymentType();
    },

    // 加载菜单

    loadDataOfMenu(callback) {

        //查询菜单
        Tool.ajax({
            url: 'api.Permission.selectMyMenu',
            data: '',
            success(data, res) {
                var selectRoleMenuByRoleIDParams = {};
                selectRoleMenuByRoleIDParams.roleID = state.nodeClickedID;
                //查询当前角色所拥有的菜单
                Tool.ajax({
                    url: 'api.Permission.selectRoleMenuByRoleID',
                    data: selectRoleMenuByRoleIDParams,
                    success(RoleMenuData, res) {

                        // mutations.SetMenuTree(RoleMenuData);

                        if (RoleMenuData) {
                            for (var i = 0; i < RoleMenuData.length; i++) {
                                for (var j = 0; j < data.length; j++) {
                                    if (RoleMenuData[i].ID == data[j].ID) {
                                        data[j].checked = true;
                                    }
                                }
                            }
                        }


                        mutations.SetMenuTree(data);
                        callback();
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
            error(res) {
                Vue.tool.showTip({
                    type: 'danger', // 提示类型 success,warning,info,danger
                    msg: res, // 提示文字
                    duration: 1000 // 自动消失时间
                });
            }
        });

    },

    // 加载按钮
    loadDataOfButtons(callback) {

        //加载菜单按钮树
        Tool.ajax({
            url: 'api.Permission.selectMyButton',
            success(data, res) {

                Tool.ajax({
                    url: 'api.Permission.selectButton',
                    data: '&roleID=' + state.addOrUpdateRole.ID,
                    success(selectButtonData, res) {


                        if (data && data.buttonList) {
                            for (var i = 0; i < data.buttonList.length; i++) {
                                for (var j = 0; j < selectButtonData.length; j++) {
                                    if (data.buttonList[i].btnID == selectButtonData[j].btnID) {
                                        data.buttonList[i].checked = true;

                                        console.warn('button checked')
                                    }
                                }
                            }
                        }

                        mutations.SetMenuBtnTree(data);

                        callback();


                    },
                    error(res) {
                        Vue.tool.showTip({
                            type: 'danger', // 提示类型 success,warning,info,danger
                            msg: res, // 提示文字
                            duration: 1000 // 自动消失时间
                        });
                    }
                });

            },
            error(res) {
                Vue.tool.showTip({
                    type: 'danger', // 提示类型 success,warning,info,danger
                    msg: res, // 提示文字
                    duration: 1000 // 自动消失时间
                });
            }
        });

    },

    //加载组织架构树
    loadOrgTree() {
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
                data: '',
                success(storeData, res) {
                    resolve(storeData);
                },
                error(res) {
                    reject(res);
                }
            })
        });
        var teamPromise = new Promise((resolve, reject) => {
            Tool.ajax({
                url: 'api.Permission.selectMyTeam',
                data: '',
                success(teamData, res) {
                    resolve(teamData)
                },
                error(res) {
                    reject(res);
                }
            });
        });
        var roleOrganizePromise = new Promise((resolve, reject) => {
            Tool.ajax({
                url: 'api.Permission.selectRoleOrganize',
                data: '&roleID=' + state.addOrUpdateRole.ID,
                success(teamData, res) {
                    resolve(teamData)
                },
                error(res) {
                    reject(res);
                }
            });
        });

        Promise.all([deptPromise, storePromise, teamPromise, roleOrganizePromise]).then((val) => {
            var deptData = val[0];
            var storeData = val[1];
            var teamData = val[2];
            var roleOrganizeData = val[3];
            if (Array.isArray(teamData)) {
                if (roleOrganizeData.teamIDList) {
                    roleOrganizeData.teamIDList.forEach((item) => {
                        var s = teamData.find((team) => {
                            return team.ID === item;
                        });
                        if (s) s.checked = true;
                    });
                }
                teamData.forEach(function (elem) {
                    elem.nodeType = "team";
                    elem.text = elem.teamName;
                    elem.organizeType = 'team'
                });
            };
            console.error(storeData)
            if (Array.isArray(storeData)) {
                if (roleOrganizeData.storeIDList) {
                    roleOrganizeData.storeIDList.forEach((item) => {
                        var s = storeData.find((store) => {
                            return store.ID === item;
                        });
                        if (s) s.checked = true;
                    });
                }
                storeData.forEach(function (elem) {
                    if (Array.isArray(teamData)) {
                        var childrenButton = teamData.filter(function (item) {
                            return item.storeID == elem.ID;
                        });
                        elem.children = [];
                        childrenButton.forEach(function (item) {
                            elem.children.push(item);
                        });
                    }
                });
            };

            if (Array.isArray(deptData)) {
                if (roleOrganizeData.deptIDList) {
                    roleOrganizeData.deptIDList.forEach((item) => {
                        var d = deptData.find((dept) => {
                            return dept.ID === item;
                        });
                        if (d) d.checked = true;
                    });
                }
                deptData.forEach(function (elem) {
                    elem.nodeType = "department";
                    elem.expanded = false;
                    elem.text = elem.departmentName;
                    if (Array.isArray(storeData)) {
                        var childrenButton = storeData.filter(function (item) {
                            return item.deptID == elem.ID;
                        });
                        elem.children = [];
                        childrenButton.forEach(function (item) {
                            item.nodeType = "store";
                            item.text = item.storeName;
                            elem.children.push(item);
                        });
                    }
                });
            };
            var treeData2 = Tool.convertToTree(deptData)

            var root = {
                ID: -1,
                pageName: '组织树',
                children: [],
                expanded: true
            };
            treeData2.forEach(function (item) {
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
            };
            // 处理没有挂载在store的 小组
            if (Array.isArray(teamData)) {
                teamData.forEach((elem) => {
                    if (!elem.nodeType) {
                        elem.text = elem.teamName;
                        root.children.push(elem);
                    }
                });
            };
            mutations.OrgChartTree(root);
            mutations.setEmployeeForAutTree(root);

        }).catch((e) => {
            // if (cbError) cbError(e);
        });
    },


    //加载分级授权的系统树
    loadLevelTree() {

        Tool.ajax({
            url: 'api.Permission.selectSystemTree',
            data: '',
            success(data, res) {
                //查询当前角色的分级授权
                Tool.ajax({
                    url: 'api.Permission.selectRoleRole',
                    data: '&roleID=' + state.addOrUpdateRole.ID,
                    success(roleRoleData, res) {
                        for (var i = 0; i < data.length; i++) {
                            for (var j = 0; j < roleRoleData.stateCodeList.length; j++) {
                                if (data[i].ID == roleRoleData.stateCodeList[j]) {
                                    data[i].checked = true;
                                }
                            }
                        }
                        var treeData = Tool.convertToTree(data);
                        var root = {
                            ID: -1,
                            roleName: '',
                            children: [],
                            expanded: true,
                            type: 1
                        };
                        treeData.forEach(function (item) {
                            item.expanded = true;
                            root.children.push(item);
                        });
                        mutations.SetSystemAccreditTree(root);
                    },
                    error(res) {
                        Vue.tool.showTip({
                            type: 'danger', // 提示类型 success,warning,info,danger
                            msg: res, // 提示文字
                            duration: 1000 // 自动消失时间
                        });
                    }
                });
                // if (cbSuccess) cbSuccess(data);
            },
            error(res) {
                Vue.tool.showTip({
                    type: 'danger', // 提示类型 success,warning,info,danger
                    msg: res, // 提示文字
                    duration: 1000 // 自动消失时间
                });
                // if (cbError) cbError(res);
            }
        });

    },
    //加载卡片权限
    loadCardTree() {

        Tool.ajax({
            url: 'api.Permission.selectMyCard',
            data: '',
            success(data, res) {
                //查询当前角色的分级授权
                Tool.ajax({
                    url: 'api.Permission.selectCardByRoleID',
                    data: '&roleID=' + state.addOrUpdateRole.ID,
                    success(cardData, res) {
                        console.log(cardData)
                        console.log(data)
                        for (var i = 0; i < data.length; i++) {
                            for (var j = 0; j < cardData.length; j++) {
                                if (data[i].ID == cardData[j]) {
                                    data[i].checked = true;
                                }
                            }
                        }
                        var treeData = Tool.convertToTree(data);
                        var root = {
                            ID: -1,
                            alias: '',
                            children: [],
                            expanded: true,
                            type: 1
                        };
                        treeData.forEach(function (item) {
                            item.expanded = true;
                            root.children.push(item);
                        });
                        mutations.SetSystemCardTree(root);
                    },
                    error(res) {
                        Vue.tool.showTip({
                            type: 'danger', // 提示类型 success,warning,info,danger
                            msg: res, // 提示文字
                            duration: 1000 // 自动消失时间
                        });
                    }
                });
                // if (cbSuccess) cbSuccess(data);
            },
            error(res) {
                Vue.tool.showTip({
                    type: 'danger', // 提示类型 success,warning,info,danger
                    msg: res, // 提示文字
                    duration: 1000 // 自动消失时间
                });
                // if (cbError) cbError(res);
            }
        });


    },
    //加载工资套权限
    loadPaySuiteTree() {

        Tool.ajax({
            url: 'api.Permission.selectMyPaySuite',
            data: '',
            success(data, res) {
                //查询当前角色的分级授权
                Tool.ajax({
                    url: 'api.Permission.selectPaySuiteByRoleID',
                    data: '&roleID=' + state.addOrUpdateRole.ID,
                    success(cardData, res) {
                        console.log(cardData)
                        console.log(data)
                        for (var i = 0; i < data.length; i++) {
                            for (var j = 0; j < cardData.length; j++) {
                                if (data[i].ID == cardData[j]) {
                                    data[i].checked = true;
                                }
                            }
                        }
                        var treeData = Tool.convertToTree(data);
                        var root = {
                            ID: -1,
                            alias: '',
                            children: [],
                            expanded: true,
                            type: 1
                        };
                        treeData.forEach(function (item) {
                            item.expanded = true;
                            root.children.push(item);
                        });
                        mutations.SetPaySuiteTree(root);
                    },
                    error(res) {
                        Vue.tool.showTip({
                            type: 'danger', // 提示类型 success,warning,info,danger
                            msg: res, // 提示文字
                            duration: 1000 // 自动消失时间
                        });
                    }
                });
                // if (cbSuccess) cbSuccess(data);
            },
            error(res) {
                Vue.tool.showTip({
                    type: 'danger', // 提示类型 success,warning,info,danger
                    msg: res, // 提示文字
                    duration: 1000 // 自动消失时间
                });
                // if (cbError) cbError(res);
            }
        });


    },
    //加载用工类型
    loadEmploymentType() {
        //state.employmentTypeChecked=[];
        Tool.ajax({
            url: 'api.Permission.selectByDifintionCode',
            data: '',
            success(data, res) {
                Tool.ajax({
                    url: 'api.Permission.selectRoleState',
                    data: '&roleID=' + state.addOrUpdateRole.ID,
                    success(stateCodeListData, res) {
                        state.employmentTypeChecked = [];
                        for (var j = 0; j < data.length; j++) {
                            for (var i = 0; i < stateCodeListData.stateCodeList.length; i++) {
                                if (data[j].code == stateCodeListData.stateCodeList[i]) {
                                    state.employmentTypeChecked.$set(state.employmentTypeChecked.length, data[j].ID);
                                } else {

                                }
                            }

                        }

                    },
                    error(res) { }
                });
                mutations.setEmploymentType(data);
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
    editSystemTree(menuName, data) {
        if (menuName == 'itemEdit') state.addSystemTreeItemVal = data.roleName;
        state.addSystemTreeItemValDes = data.des;
    },
    loadFieldTree() {
        var myFieldPromise = new Promise((resolve, reject) => {
            Tool.ajax({
                url: 'api.Permission.selectMyField',
                success(myFieldData, res) {
                    resolve(myFieldData)
                },
                error(res) {
                    reject(res);
                }
            });
        });
        var fieldByRoleIDPromise = new Promise((resolve, reject) => {
            Tool.ajax({
                url: 'api.Permission.selectFieldByRoleID',
                data: '&roleID=' + state.addOrUpdateRole.ID,
                success(fieldByRoleIDData, res) {
                    resolve(fieldByRoleIDData)
                },
                error(res) {
                    reject(res);
                }
            });
        });
        Promise.all([myFieldPromise, fieldByRoleIDPromise]).then((val) => {
            var myFieldData = val[0];
            var fieldByRoleIDData = val[1];
            var referenceList = [];
            var nodes = {
                children: []
            };
            var nodesTree = [];

            var listOperationNodes = [];
            console.log(new Date().getTime())
            myFieldData.forEach(p => {
                referenceList.push(p);

                var node = {};
                node.text = p.fieldModule.fieldModuleName;
                node.ID = p.fieldModule.ID;
                node.parentID = p.fieldModule.parentID;
                node.children = [];
                node.expanded = true;
                if (Array.isArray(p.fieldColumnList)) {
                    p.fieldColumnList.forEach((elem) => {
                        referenceList.push(elem);

                        if (p.fieldModule.ID == elem.moduleID) {
                            var operationNodes = [{
                                ID: node.ID + '_' + elem.ID + '_0',
                                columnStatus: 0,
                                text: '不可查看',
                                type: 'state',
                                expanded: true,
                            }, {
                                ID: node.ID + '_' + elem.ID + '_1',
                                columnStatus: 1,
                                text: '不可修改',
                                type: 'state',
                                expanded: true,
                            }, {
                                ID: node.ID + '_' + elem.ID + '_2',
                                columnStatus: 2,
                                text: '可修改',
                                type: 'state',
                                expanded: true,
                            }];
                            node.children.push({
                                ID: elem.ID,
                                text: elem.title,
                                stateList: elem.stateList,
                                type: 'field',
                                children: operationNodes
                            });
                            Array.prototype.push.call(listOperationNodes, ...operationNodes);
                        }
                    });
                }

                node.children.forEach(m => {

                    var field = fieldByRoleIDData.find(p => {
                        return p.columnID == m.ID;
                    });
                    if (field) {
                        m.checked = true;
                        m.children.forEach(p => {
                            if (p.columnStatus == field.columnStatus) {
                                p.checked = true;
                            }
                        })
                    }
                });

                nodes.children.push(node);
                nodesTree.push(node)

            });
            console.log(new Date().getTime())
            // return;
            var treeData = Tool.convertToTree(nodesTree);
            var root = {
                ID: -1,
                alias: '',
                children: [],
                expanded: true,
                type: 1
            };
            treeData.forEach(function (item) {
                item.expanded = true;
                root.children.push(item);
            });
            mutations.setFieldTree(root, listOperationNodes);
            console.log(new Date().getTime())
        })
    },
    checkFieldTreeClicked(data) {
        console.log(data);
    }

    // 加载字段权限
    //loadFeildData(cbSuccess, cbError) {
    //    Tool.ajax({
    //        url: 'api.Permission.getFieldData',
    //        success(data, res) {
    //            var vm = this;
    //            var fieldData = data;
    //            for (var i = 0; i < fieldData.length; i++) {
    //                if (fieldData[i].fieldS) {
    //                    for (var j = 0; j < fieldData[i].fieldS.length; j++) {
    //                        if (fieldData[i].fieldS[j].checked == true) {
    //                            state.tagList.$set(state.tagList.length, {
    //                                label: fieldData[i].fieldS[j].fieldText,
    //                                value: fieldData[i].fieldS[j].id,
    //                            })
    //                        }
    //                    }
    //                }
    //            }
    //            mutations.SetFieldData(data);
    //        },
    //        error(res) {
    //        }
    //    })
    //},
};

export default {
    state,
    mutations,
    actions
};
