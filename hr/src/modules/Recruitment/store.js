/**
 * @Created Date       : 2016-08-28T15:36:04+08:00
* @Last Modified time : 2016-11-01T16:58:55+08:00
 */



import Vue from 'vue';
const Tool = Vue.tool;

// VUEX
// flux view>actions>mutations>state>view

// 数据、状态
const state = {
        //左侧树
        systemTreeData: [],
        //品牌门店树
        brandAreaStoreTree: [],
        //部门门店树
        companyDeptStoreTree: [],
        //岗位名称查询
        searchPostName: '',
        //岗位发布人数
        releaseCount: 0,
        //岗位ID & 招聘人数
        postIDAndNum: {},
        //招聘人数
        personnum: '',
        selectedIDs: [],
        //简历个人信息
        resumeMoreData: {
            workexperience: [], // 工作经历
            studyexperience: [], // 教育经历
            address: '', // 地址
            age: '', // 年龄
            city: '', // 城市
            des: '', // 描述
            dreamcity: '', // 理想城市
            education: '', // 教育经历
            email: '', // 邮箱
            marriage: '', // 婚姻
            name: '', // 姓名
            nation: '', // 国家
            othername: '', // 紧急联系人
            otherphone: '', // 紧急联系人电话
            phone: '', // 电话
            sex: '', // 性别
            workdate: '', // 工作年限
            worktype: '', // 工作类型
            postname: '', // 目标岗位
        },
    }
    // 数据修改
const mutations = {
        // 设置左侧用于筛选岗位的组织架构树；
        SetCompanyDeptStoreTree(tree) {
            state.companyDeptStoreTree = tree;
        },
        //页面最左侧系统树
        SetSystemTree(data) {
            state.systemTreeData = data;
            //console.log(state.systemTreeData)
        },
        //设置招聘人数
        editPersonnum(value, dataID) {
            state.postIDAndNum[dataID] = {
                personnum: value,
                postsid: dataID,
                type: 1
            }
        },
        setSelected(IDs) {
            state.selectedIDs = IDs;
        },
        //设置更多个人信息
        setResumeMoreData(data) {
            state.resumeMoreData.address = data.personrecruitment.address; //地址
            state.resumeMoreData.age = data.personrecruitment.age; //年龄
            state.resumeMoreData.city = data.personrecruitment.city; //城市
            state.resumeMoreData.des = data.personrecruitment.des; //个人简介
            state.resumeMoreData.dreamcity = data.personrecruitment.dreamcity; //理想城市
            state.resumeMoreData.education = data.personrecruitment.education; //学历
            state.resumeMoreData.email = data.personrecruitment.email; //邮箱
            state.resumeMoreData.marriage = data.personrecruitment.marriage; //婚姻
            state.resumeMoreData.name = data.personrecruitment.name; //名字
            state.resumeMoreData.nation = data.personrecruitment.nation; //民族
            state.resumeMoreData.othername = data.personrecruitment.othername; //紧急联系人
            state.resumeMoreData.otherphone = data.personrecruitment.otherphone; //紧急联系人电话
            state.resumeMoreData.phone = data.personrecruitment.phone; //电话
            state.resumeMoreData.sex = data.personrecruitment.sex; //性别
            state.resumeMoreData.workdate = Tool.iDate(data.personrecruitment.workdate, 'yy-mm-dd').string; //工作时间
            state.resumeMoreData.worktype = data.personrecruitment.worktype; //工作类型
            state.resumeMoreData.postname = data.personrecruitment.postName; //申请岗位
            if (Array.isArray(data.studyexperience)) {
                data.studyexperience.forEach((item) => {
                    item.startdate = Tool.iDate(item.startdate, 'yy-mm-dd').string;
                    item.enddate = Tool.iDate(item.enddate, 'yy-mm-dd').string;
                });
            }
            state.resumeMoreData.studyexperience = data.studyexperience;
            if (Array.isArray(data.workexperience)) {
                data.workexperience.forEach((item) => {
                    item.startdate = Tool.iDate(item.startdate, 'yy-mm-dd').string;
                    item.enddate = Tool.iDate(item.enddate, 'yy-mm-dd').string;
                });
            }
            state.resumeMoreData.workexperience = data.workexperience;
        }
    }
    // 操作
const actions = {
    //加载组织树
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
                        elem.expanded = false;
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
                var tree = {
                    ID: -1,
                    text: data.companyName,
                    expanded: true,
                    children: []
                };
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
    //发布岗位
    goReleasePost(IDs, selectedData, cbSuccess) {
        if (IDs.length <= 0) {
            Vue.tool.showTip({
                type: 'danger',
                msg: '请选择至少一个岗位发布',
                duration: 1000
            });
        } else {
            var postListJSON = [];
            if (Array.isArray(state.selectedIDs)) {
                state.selectedIDs.forEach((ID) => {
                    if (state.postIDAndNum[ID]) {
                        if (state.postIDAndNum[ID].personnum < 0) {
                            Vue.tool.showTip({
                                type: 'danger',
                                msg: '招聘人数请大于0',
                                duration: 2000
                            });
                        } else {
                            postListJSON.push(state.postIDAndNum[ID])
                        }

                    } else {
                        if (selectedData[ID].personnum < 0) {
                            Vue.tool.showTip({
                                type: 'danger',
                                msg: '招聘人数请大于0',
                                duration: 2000
                            });
                        } else {
                            postListJSON.push({
                                personnum: selectedData[ID].personnum,
                                postsid: selectedData[ID].ID,
                                type: 1,
                            })
                        }

                    }
                });
            }
            Tool.ajax({
                url: 'api.Recruitment.updateStat',
                data: '&postListJSON=' + JSON.stringify(postListJSON),
                success(data, res) {
                    cbSuccess(data);
                    Vue.tool.showTip({
                        type: 'success',
                        msg: res.data.err_msg,
                        duration: 1000
                    });
                    console.log(data, res)
                },
                error(res) {

                }
            })
        }

    },
    //撤回
    goRevocationPost(IDs, selectedData, cbSuccess) {
        if (IDs.length <= 0) {
            Vue.tool.showTip({
                type: 'danger',
                msg: '请选择至少一个岗位发布',
                duration: 1000
            });
        } else {
            var postListJSON = [];
            Object.keys(selectedData).forEach((index) => {
                postListJSON.push({
                    personnum: selectedData[index].personnum,
                    postsid: selectedData[index].ID,
                    type: 2,
                });
            });
            Tool.ajax({
                url: 'api.Recruitment.updateStat',
                data: '&postListJSON=' + JSON.stringify(postListJSON),
                success(data, res) {
                    cbSuccess(data);
                    Vue.tool.showTip({
                        type: 'success',
                        msg: res.data.err_msg,
                        duration: 1000
                    });
                    console.log(data, res)
                },
                error(res) {

                }
            })
        }
    },
    //删除简历
    goDeleteResume(IDs, cbSuccess) {
        if (IDs.length <= 0) {
            Vue.tool.showTip({
                type: 'danger',
                msg: '请选择至少一条简历删除',
                duration: 1000
            });
        } else {
            Tool.ajax({
                url: 'api.Recruitment.removeRecurit',
                data: '&ids=' + JSON.stringify(IDs),
                success(data, res) {
                    cbSuccess(data);
                    Vue.tool.showTip({
                        type: 'success',
                        msg: res.data.err_msg,
                        duration: 1000
                    });
                    console.log(data, res)
                },
                error(res) {

                }
            })
        }
    },
    //显示简历个人信息
    showModalmoreResemeList(id, cbSuccess) {
        Tool.ajax({
            url: 'api.Recruitment.perbyid',
            data: '&id=' + id,
            success(data, res) {
                cbSuccess(data);
                mutations.setResumeMoreData(data);
            },
            error(res) {

            }
        })
    },
    //设置招聘人数
    editPersonnum(value, dataID) {
        mutations.editPersonnum(value, dataID)
    },
    //设置选中的IDs
    setSelected(IDs) {
        mutations.setSelected(IDs)
    },


}

export default {
    state,
    mutations,
    actions
};
