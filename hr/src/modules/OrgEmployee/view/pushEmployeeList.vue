<!--
* @Created Date       : 2016-12-08T15:02:12+08:00
* @Last Modified time : 2016-12-15T15:51:33+08:00
 -->


<!-- 员工花名册页面，批量进行转正等操作 -->
<template>
<div class="roster-page">
    <header class="ui-module-navbar pos-topbar-fixed">
        <div class="ui-module-navbar-content">
            <div class="pull-left">
                <h4><strong>员工入职</strong></h4>
            </div>
            <div class="input-group search">
                <input v-model="searchFor.userName" class="form-control" placeholder="输入姓名或卡号模糊查询">
                <span class="input-group-btn">
                    <button @click="refreshTable" class="btn btn-primary" __code="org-roster-search/搜索">搜索</button>
                </span>
            </div>
            <button type="button" class="ui-tool-button" __code="org-roster-filter/筛选" @click="choose">
          <span class="icon icon-tool icon-tool-filter pull-left"></span>
          <span class="_name pull-left">筛选</span>
        </button>
        </div>
    </header>
    <section class="warp">
        <main class="main-content">
            <div class="toolbar">
                <div class="quick-info">
                    <strong>{{total}}</strong>&nbsp;&nbsp;&nbsp;<span>名(所有员工)</span>
                </div>
                <div class="tool" role="group">
                    <!-- __code="org-roster-add/添加" -->
                    <button type="button " class="ui-tool-button" @click="add">
              <span class="_name pull-left">添加</span>
            </button>
                    <button type="button " class="ui-tool-button" __code="org-roster-edit/编辑" @click="edit">
              <span class="_name pull-left">编辑</span>
            </button>
                    <!-- __code="org-roster-commit/提交" -->
                    <button type="button " class="ui-tool-button" @click='submit'>
              <span class="_name pull-left">提交</span>
            </button>
                    <!-- __code="org-roster-delete/删除" -->
                    <button type="button " class="ui-tool-button" @click='delete'>
              <span class="_name pull-left">删除</span>
            </button>
                    <!-- <v-dropdown class="ui-tool-dropdown" trigger="click">
              <button type="button" data-toggle="dropdown" class="ui-tool-button">
                <span class="_name pull-left">批量</span>
              </button>
              <ul class="dropdown-menu">
                <li __code="org-regular-add/添加">
                  <a href="javascript:void(0)" @click="batchZhuan">批量转正</a>
                </li>
                <li __code="org-transaction-add/添加">
                  <a href="javascript:void(0)" @click="batchTransaction">批量异动</a>
                </li>
                <li __code="org-dimission-add/添加">
                  <a href="javascript:void(0)" @click="batchLi">批量离职</a>
                </li>
                <li __code="org-blacklist-add/添加">
                  <a href="javascript:void(0)" @click="batchHei">批量黑名单</a>
                </li>
              </ul>
            </v-dropdown> -->
                    <!-- <v-dropdown class="ui-tool-dropdown" trigger="click">
              <button type="button" data-toggle="dropdown" class="ui-tool-button">
                <span class="_name pull-left">更多</span>
              </button>
              <ul class="dropdown-menu">
                <li __code="org-roster-import/导入">
                  <a href="javascript:void(0)">导入</a>
                </li>
                <li __code="org-roster-export/导出">
                  <a href="javascript:void(0)" @click="exportExecl">导出</a>
                </li>
                <li __code="org-roster-print/打印">
                  <a href="javascript:void(0)">打印</a>
                </li>
              </ul>
            </v-dropdown> -->
                </div>
            </div>
            <ui-grid v-ref:table :before-render="convertDataDistribute" :total.sync="total" :url="rosterUrl" class="testtable" :append-params="searchFor" selectable="multi" :fields="fields" :datalist="rosterList" :perpage="30" :pages="[10,20,30,50]" :btrefresh="true"
                checked="multi" :selected.sync="selected" height="auto" tdheight="50px"></ui-grid>
        </main>
        <ui-confirm @confirmed="confirmed" confirm-button-text="是" deny-button-text="否" :show.sync="deletedialogShow" close-on-confirm header="提示">
            数据删除不可恢复,是否继续
        </ui-confirm>
        <components :is="what" :display.sync="whatShow" :employee-id="editId" :ids="selected" v-if="whatShow" :employeecallback="employeecallback" :office-edit-call-back="batchcallback">
        </components>
        <components :is="bigWhat" :display.sync="bigWhatShow" v-if="bigWhatShow">
        </components>
        <app-employee-choose :display.sync="chooseShow" :choose-call-back="chooseCallBack" :displayuserstate="false"></app-employee-choose>
    </section>
</div>
</template>
<script>
//导入模块store
import Vue from 'vue'
import store from '../store.js'
import batchZhuanForm from './batchZhuanForm'
import batchLiForm from './batchLiForm'
import batchHeiForm from './batchHeiForm'
import addEmployee from './addEmployee'
import batchTransaction from './batchTransaction'
import pushEmployee from './pushEmployee'

export default {
    data() {
        return {
            total: 0, //员工总数
            editId: '', //编辑的ID
            state: store.state,
            chooseShow: false, //筛选
            whatShow: false, //控制动态组件显示与否
            bigWhatShow: false, //控制动态组件显示与否
            deletedialogShow: false, //控制动态组件显示与否
            what: '', //动态组件名称
            bigWhat: '', //动态组件名称
            selected: [], //表格选中IDs
            searchFor: {
                userName: '',
            }, //查询关键字
            rosterUrl: 'api.OrgEmployee.selectEmployeeEntryAllPage', //访问花名册后台接口
            queryParams: {}, //查询参数
            fields: [{
                    name: 'userNum',
                    title: '员工工号',
                    width: 100,
                    locked: 'first'
                }, {
                    name: 'userName',
                    title: '姓名',
                    width: 100,
                    locked: 'first'
                }, {
                    name: 'checkworkcode',
                    title: '考勤卡号',
                    width: '150px'
                }, {
                    name: 'status',
                    title: '审批状态',
                    width: '100px',
                    formater: function(value, data, index) {
                        var status = '';
                        if (value == 150001) {
                            status = '待审批'
                        } else if (value == 150002) {
                            status = '撤回'
                        } else if (value == 150003) {
                            status = '审批中'
                        } else if (value == 150004) {
                            status = '驳回'
                        } else if (value == 150005) {
                            status = '同意'
                        } else if (value == 150006) {
                            status = '保存未提交'
                        }
                        return status;
                    },
                }, {
                    name: 'userTypeName',
                    title: '用工类型',
                    width: '100px'
                }, {
                    name: 'stateName',
                    title: '用工状态',
                    width: '100px'
                }, {
                    name: 'dormName',
                    title: '员工宿舍',
                    width: '150px'
                }, {
                    name: 'hukouTypeName',
                    title: '户口类型',
                    width: '150px'
                }, {
                    name: 'healthEndTime',
                    title: '健康证到期日',
                    width: '150px'
                }, {
                    name: 'weChat',
                    title: '微信',
                    width: '150px'
                }, {
                    name: 'firstWorkTime',
                    title: '首次工作日期',
                    width: '150px'
                }, {
                    name: 'startTime',
                    title: '入职日期',
                    width: '150px'
                }, {
                    name: 'offerTime',
                    title: '转正日期',
                    width: '150px'
                }, {
                    name: 'expiryDate',
                    title: '合同到期日',
                    width: '150px'
                }, {
                    name: 'countryName',
                    title: '国籍',
                    width: '150px'
                }, {
                    name: 'orgName',
                    title: '组织',
                    width: '300px'
                },
                // {
                //   name: 'ctrl1',
                //   title: '组织',
                //   formater: function(value, data, index) {
                //     var org = data.deptName;
                //     if (data.storeName) {
                //       org += "/" + data.storeName;
                //     }
                //     if (data.teamName) {
                //       org += "/" + data.teamName;
                //     }
                //     return org;
                //   },
                //   width: 200,
                // },
                {
                    name: 'positionName',
                    title: '职位',
                    width: 100
                }, {
                    name: 'postName',
                    title: '岗位',
                    width: '100px'
                }, {
                    name: 'rankName',
                    title: '职级',
                    width: '100px'
                }, {
                    name: 'idCardTypeName',
                    title: '证件类型',
                }, {
                    name: 'userIDCard',
                    title: '证明编号',
                }, {
                    name: 'gongling',
                    title: '工龄',
                }, {
                    name: 'siling',
                    title: '司龄',
                }, {
                    name: 'birthDay',
                    title: '生日',
                }, {
                    name: 'genderName',
                    title: '性别',
                    width: '100px'
                }, {
                    name: 'nationName',
                    title: '民族',
                    width: '100px'
                }, {
                    name: 'bankNameName',
                    title: '开户银行',
                }, {
                    name: 'bankCard',
                    title: '银行卡号',
                }, {
                    name: 'checkWorkNo',
                    title: '考勤ID',
                }, {
                    name: 'checkworkName',
                    title: '考勤规则',
                }, {
                    name: 'hukouAddress',
                    title: '户口所在地',
                }, {
                    name: 'isMarriedName',
                    title: '婚姻状况',
                }, {
                    name: 'mail',
                    title: '邮箱',
                }, {
                    name: 'nationName',
                    title: '民族',
                }, {
                    name: 'phone',
                    title: '手机号码',
                }, {
                    name: 'qq',
                    title: 'qq',
                }, {
                    name: 'urgentPerson',
                    title: '紧急联系人',
                }, {
                    name: 'urgentPhone',
                    title: '紧急联系人电话',
                }
            ]
        };
    },
    methods: {
        convertDataDistribute(data) {
            let result = [];
            let fields = [{
                    name: 'userNum',
                    title: '员工工号',
                    width: 100,
                    locked: 'first'
                }, {
                    name: 'userName',
                    title: '姓名',
                    width: 100,
                    locked: 'first'
                }, {
                    name: 'checkworkcode',
                    title: '考勤卡号',
                    width: '150px'
                }, {
                    name: 'status',
                    title: '审批状态',
                    width: '100px',
                    formater: function(value, data, index) {
                        var status = '';
                        if (value == 150001) {
                            status = '待审批'
                        } else if (value == 150002) {
                            status = '撤回'
                        } else if (value == 150003) {
                            status = '审批中'
                        } else if (value == 150004) {
                            status = '驳回'
                        } else if (value == 150005) {
                            status = '同意'
                        } else if (value == 150006) {
                            status = '保存未提交'
                        }
                        return status;
                    },
                }, {
                    name: 'userTypeName',
                    title: '用工类型',
                    width: '100px'
                }, {
                    name: 'stateName',
                    title: '用工状态',
                    width: '100px'
                }, {
                    name: 'healthEndTime',
                    title: '健康证到期日',
                    width: '150px'
                }, {
                    name: 'dormName',
                    title: '员工宿舍',
                    width: '150px'
                }, {
                    name: 'hukouTypeName',
                    title: '户口类型',
                    width: '150px'
                }, {
                    name: 'weChat',
                    title: '微信',
                    width: '150px'
                }, {
                    name: 'firstWorkTime',
                    title: '首次工作日期',
                    width: '150px'
                }, {
                    name: 'startTime',
                    title: '入职日期',
                    width: '150px'
                }, {
                    name: 'offerTime',
                    title: '转正日期',
                    width: '150px'
                }, {
                    name: 'expiryDate',
                    title: '合同到期日',
                    width: '150px'
                }, {
                    name: 'countryName',
                    title: '国籍',
                    width: '150px'
                }, {
                    name: 'orgName',
                    title: '组织',
                    width: '300px'
                },

                // {
                //   name: 'ctrl1',
                //   title: '组织',
                //   formater: function(value, data, index) {
                //     var org = data.deptName;
                //     if (data.storeName) {
                //       org += "/" + data.storeName;
                //     }
                //     if (data.teamName) {
                //       org += "/" + data.teamName;
                //     }
                //     return org;
                //   },
                //   width: 200,
                // },
                {
                    name: 'positionName',
                    title: '职位',
                    width: 100
                }, {
                    name: 'postName',
                    title: '岗位',
                    width: '100px'
                }, {
                    name: 'rankName',
                    title: '职级',
                    width: '100px'
                }, {
                    name: 'idCardTypeName',
                    title: '证件类型',
                }, {
                    name: 'userIDCard',
                    title: '证件号码',
                }, {
                    name: 'gongling',
                    title: '工龄',
                }, {
                    name: 'siling',
                    title: '司龄',
                }, {
                    name: 'birthDay',
                    title: '生日',
                }, {
                    name: 'genderName',
                    title: '性别',
                    width: '100px'
                }, {
                    name: 'nationName',
                    title: '民族',
                    width: '100px'
                }, {
                    name: 'bankNameName',
                    title: '开户银行',
                }, {
                    name: 'bankCard',
                    title: '银行卡号',
                }, {
                    name: 'checkWorkNo',
                    title: '考勤ID',
                }, {
                    name: 'checkworkName',
                    title: '考勤规则',
                }, {
                    name: 'hukouAddress',
                    title: '户口所在地',
                }, {
                    name: 'isMarriedName',
                    title: '婚姻状况',
                }, {
                    name: 'mail',
                    title: '邮箱',
                }, {
                    name: 'nationName',
                    title: '民族',
                }, {
                    name: 'phone',
                    title: '手机号码',
                }, {
                    name: 'qq',
                    title: 'qq',
                }, {
                    name: 'urgentPerson',
                    title: '紧急联系人',
                }, {
                    name: 'urgentPhone',
                    title: '紧急联系人电话',
                }
            ];
            if (data && data.length > 0) {
                if (!!data[0].extList) {
                    data[0].extList.forEach((item, index) => {
                        fields.push({
                            name: 'extItem_' + index,
                            title: item.showName,
                            width: '100px'
                        });
                    });
                }
                data.forEach((item) => {
                    let itemConverted = {};
                    itemConverted = item;

                    if (item.extList && item.extList.length > 0) {
                        item.extList.forEach((payItem, index) => {
                            itemConverted['extItem_' + index] = payItem.des;
                        });
                    }
                    result.push(itemConverted);
                });
            }
            this.$set('fields', fields);
            return result;
        },
        //添加按钮
        add() {
            this.$data.bigWhatShow = true;
            this.$data.bigWhat = 'pushEmployee';
        },
        //编辑按钮
        edit() {
          var self = this;
          if (self.selected.length != 1) {
              self.$root.showTip({
                  type: 'danger',
                  msg: "请选择要单个人员操作!",
                  duration: 2000
              });
              return;
          }
          if (self.$refs.table.getSelections().every((item) => { return item.status == "150005";})) {
            self.$root.showTip({
              type: 'danger',
              msg: "已经提交的不可以修改",
              duration: 2000
            });
            return;
          }else{
            self.editId = self.selected[0] + '';
            self.what = "pushEmployee";
            self.whatShow = true;
          }


        },
        //批量业务回调
        batchcallback() {
            this.$refs.table.refresh();
        },
        exportExecl() {
            //postc参数转get
            var param = Object.keys(this.searchFor).map((item) => {
                return item + "=" + this.searchFor[item];
            }).join('&');
            this.$root.downloadFile('acewill/employee/selectEmployeeAllExcel.htm', param);
        },
        //筛选回调
        chooseCallBack(data) {
            Object.assign(this.searchFor, data);
            this.$refs.table.refresh();
        },
        employeecallback(data) {
            this.$refs.table.refresh();
        },
        /**
         * 单行编辑
         * [employeeItemClick description]
         * @return {[type]} [description]
         */
        employeeItemClick(value) {
            this.editId = value;
            this.what = "addEmployee";
            this.whatShow = true;
        },
        //刷新表格
        refreshTable() {
            //通知花名册表格刷新操作已经完成
            this.$refs.table.refresh();
        },
        delete() {
            if (this.selected.length < 1) {
                this.$root.showTip({
                    type: 'danger',
                    msg: '请选择至少一条数据删除'
                })
            } else {
                this.deletedialogShow = true;
            }
        },
        confirmed() {
            var self = this;
            store.actions.deleteEmployeeEntry(this.selected, () => {
                this.$root.showTip({
                    type: 'success',
                    msg: '删除成功'
                })
                self.refreshTable();
            }, (res) => {
              this.$root.showTip({
                  type: 'danger',
                  msg: res
              })
            });
        },
        submit() {
            var self = this;
            if (self.selected.length >= 1) {
                if (!self.$refs.table.getSelections().every((item) => {
                        return item.state != "已提交";
                    })) {
                    self.$root.showTip({
                        type: 'danger',
                        msg: "已选数据包含已提交状态",
                        duration: 2000
                    });
                    return;
                }
            }
            if (self.selected.length == 0) {
                self.$root.showTip({
                    type: 'danger',
                    msg: "请选择数据进行提交",
                    duration: 2000
                });
                return;
            }

            store.actions.updateEmployeeEntryStatus(self.selected, function(data) {
                self.refreshTable(); //刷新表格

            }, function(error) {
                self.$root.showTip({
                    type: 'danger',
                    msg: error,
                    duration: 2000
                });
            });
        },
        //批量转正
        // batchZhuan() {
        //   var self = this;
        //   //判断如果没有选择人员,则return
        //   if (self.selected.length == 0) {
        //     self.$root.showTip({
        //       type: 'danger',
        //       msg: "请选择要操作的人员!",
        //       duration: 2000
        //     });
        //     return;
        //   }
        //
        //   //判断是否选择的人员可以进行离职操作
        //   if (!self.$refs.table.getSelections().every((item) => {
        //       return item.state == '120001'
        //     })) {
        //     self.$root.showTip({
        //       type: 'danger',
        //       msg: "已选员工包含已转正状态",
        //       duration: 2000
        //     });
        //     return;
        //   }
        //
        //
        //   self.what = "batchZhuanForm";
        //   self.whatShow = true;
        // },
        //批量异动
        // batchTransaction() {
        //   var self = this;
        //   //判断如果没有选择人员,则return
        //   if (self.selected.length == 0) {
        //     self.$root.showTip({
        //       type: 'danger',
        //       msg: "请选择要操作的人员!",
        //       duration: 2000
        //     });
        //     return;
        //   }
        //   //判断是否选择的人员可以进行离职操作
        //   if (!self.$refs.table.getSelections().every((item) => {
        //       return item.state == '120002' || item.state == '120001'
        //     })) {
        //     self.$root.showTip({
        //       type: 'danger',
        //       msg: "已选员工包含已离职状态",
        //       duration: 2000
        //     });
        //     return;
        //   }
        //
        //   self.what = "batchTransaction";
        //   self.whatShow = true;
        // },
        // //批量离职
        // batchLi() {
        //   var self = this;
        //   //判断如果没有选择人员,则return
        //   if (self.selected.length == 0) {
        //     self.$root.showTip({
        //       type: 'danger',
        //       msg: "请选择要操作的人员!",
        //       duration: 2000
        //     });
        //     return;
        //   }
        //   //判断是否选择的人员可以进行离职操作
        //   if (!self.$refs.table.getSelections().every((item) => {
        //       return item.state == '120002' || item.state == '120001'
        //     })) {
        //     self.$root.showTip({
        //       type: 'danger',
        //       msg: "已选员工包含已离职状态",
        //       duration: 2000
        //     });
        //     return;
        //   }
        //
        //   self.what = "batchLiForm";
        //   self.whatShow = true;
        //
        // },
        // //批量黑名单
        // batchHei() {
        //   var self = this;
        //   //判断如果没有选择人员,则return
        //   if (self.selected.length == 0) {
        //     self.$root.showTip({
        //       type: 'danger',
        //       msg: "请选择要操作的人员!",
        //       duration: 2000
        //     });
        //     return;
        //   }
        //   //获取要操作的人员类别完毕,加载转正组件
        //   //判断是否选择的人员可以进行黑名单操作
        //   if (!self.$refs.table.getSelections().every((item) => {
        //       return item.state == '120003' || item.state == '120004'
        //     })) {
        //     self.$root.showTip({
        //       type: 'danger',
        //       msg: "已选员工包含未离职状态",
        //       duration: 2000
        //     });
        //     return;
        //   }
        //   self.what = "batchHeiForm";
        //   self.whatShow = true;
        // },
        //员工筛选
        choose() {
            this.chooseShow = true;
        }

    },
    events: {
        'refreshTable': function() {
            console.log('refreshTable', 'refreshTable')
            this.refreshTable();
        }
    },
    attached() {
        if (this.$route.query && this.$route.query.healthEndTime) {
            if (this.$route.query.healthEndTime) {
                this.searchFor.healthEndTime = this.$route.query.healthEndTime;
                this.$refs.table.refresh();
                var self = this;
                this.$nextTick(function() {
                    delete self.searchFor.healthEndTime;
                })
            }
        }
    },
    ready() {
        // window.roster = this;
    },
    components: {
        addEmployee, //编辑个人信息
        batchZhuanForm, //批量转正表单
        batchLiForm, //批量离职表单
        batchHeiForm, //批量黑名单表单
        batchTransaction, //批量异动
        pushEmployee, //添加员工入职
    }
};
</script>
<style lang="css" scoped>
.roster-page,
.warp {
  height: 100%;
  overflow: hidden;
}

.roster-page .warp {
  background-color: #fff;
  position: relative;
}

.roster-page .list-group {
  text-align: center;
  cursor: pointer;
  overflow-x: hidden;
}

.roster-page .search {
  float: left;
  margin-left: 50px;
  width: 300px;
}

.roster-page .toolbar {
  position: absolute;
  height: 50px;
  left: 0;
  width: 100%;
  padding-left: 20px;
  background-color: #e8eaef;
}

.roster-page .quick-info {
  float: left;
}

.roster-page .quick-info strong {
  font-size: 30px;
}

.roster-page .tool {
  float: right;
  width: 275px;
  color: red;
  padding-right: 10px;
  text-align: right;
}

.roster-page .main-content {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.testtable {
  position: absolute;
  top: 60px;
  left: 10px;
  right: 10px;
  bottom: 0px;
}

.dialog-content {
  position: relative;
}

.control-label {
  padding-left: 0px;
}

.buttons {
  margin-top: 30px;
  text-align: center;
}
</style>
