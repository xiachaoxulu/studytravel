<template>
  <div class="emp-verify">
    <header class="ui-module-navbar pos-topbar-fixed">
      <div class="ui-module-navbar-content">
        <div class="pull-left">
          <h4><strong>员工录入信息核对</strong></h4>
        </div>
        <div class="pull-right btn-list">
          <button type="button" data-toggle="dropdown" class="ui-tool-button" @click="showConfig">
            <span class="icon icon-tool icon-font pull-left">&#xe60e;</span>
            <span class="_name pull-left">录入信息配置</span>
          </button>
          <button type="button" data-toggle="dropdown" class="ui-tool-button" @click="displayQRCode=true">
            <!-- <span class="icon icon-tool icon-tool-edit pull-left"></span> -->
            <span class="_name pull-left">分享到微信</span>
          </button>
        </div>
      </div>
    </header>
    <section class="warp">
      <main class="main-content">
        <div class="toolbar">
          <div class="quick-info">
            <ui-combotree :tree="orgTree" :selected-value.sync="searchFor.organizeID" :multiple="true" :checkable="true" :ancestorcheck="true" :rootvisible="false" idprop="organizeID" placeholder="请选择组织"></ui-combotree>
          </div>
          <div class="tool" role="group">
            <button type="button " class="ui-tool-button" @click="edit">
              <span class="_name pull-left">修改信息</span>
            </button>
            <button type="button " class="ui-tool-button" @click="approve">
              <span class="_name pull-left">审核通过</span>
            </button>
            <button type="button " class="ui-tool-button" @click="remove">
              <span class="_name pull-left">删除</span>
            </button>
          </div>
        </div>
        <ui-grid v-ref:table class="testtable" :url="url" :append-params="searchFor" selectable="multi" :fields="fields" :perpage="30" :pages="[10,20,30,50]" :btrefresh="true" checked="multi" :selected.sync="selected" height="auto"></ui-grid>
      </main>
      <ui-modal :show.sync="false" hide-footer header="批量编辑员工信息" type="medium">
        <ui-validator>
          <form class="form-horizontal container-fluid" role="form" vali-submit="submitBtn|submitedCall">
            <div class="row form-group">
              <label>已选员工：</label>
            </div>
            <div class="row form-group">
              <div class="col-sm-24 tag-list">
                <ui-scrollview>
                  <ui-tags :tags.sync="empTagList" type="label-default" class="tags"></ui-tags>
                </ui-scrollview>
              </div>
            </div>
            <div class="row form-group">
              <div class="col-sm-24">
                <label class="col-sm-8 control-label">*员工工号</label>
                <div class="col-sm-12">
                  <input type="text" class="form-control" placeholder="请输入员工工号">
                </div>
              </div>
            </div>
            <div class="row form-group">
              <div class="col-sm-24">
                <label class="col-sm-8 control-label">*职级</label>
                <div class="col-sm-12">
                  <select class="form-control" placeholder="请选择职级"></select>
                </div>
              </div>
            </div>
            <div class="row form-group">
              <div class="col-sm-24">
                <label class="col-sm-8 control-label">*考勤卡号</label>
                <div class="col-sm-12">
                  <input type="text" class="form-control" placeholder="请输入考勤卡号">
                </div>
              </div>
            </div>
            <div class="row form-group">
              <div class="col-sm-24">
                <label class="col-sm-8 control-label">考勤ID</label>
                <div class="col-sm-12">
                  <input type="text" class="form-control" placeholder="请输入员工工号">
                </div>
              </div>
            </div>
            <div class="row form-group">
              <div class="col-sm-24">
                <label class="col-sm-8 control-label">*考勤规则</label>
                <div class="col-sm-12">
                  <input type="text" class="form-control" placeholder="请输入员工工号">
                </div>
              </div>
            </div>
            <div class="form-actions">
              <div class="row">
                <div class="text-center">
                  <ui-button id="submitBtn" color="accent">提交</ui-button>
                  <ui-button color="default" @click="displayEdit=false">取消</ui-button>
                </div>
              </div>
            </div>
          </form>
        </ui-validator>
      </ui-modal>
      <ui-modal :show.sync="displayConfig" hide-footer header="录入信息配置" type="medium">
        <div class="form-horizontal container-fluid">
          <div class="row form-group">
            <label class="control-label">员工添加的字段：</label>
          </div>
          <div class="row form-group field-box">
            <template v-for="field in fieldEmployee">
              <div class="field-line" track-by="ID">
                <div>{{field.nameCN}}</div>
                <div>
                  <ui-checkbox :value.sync="field.isRequired | convertToBoolean field 'isRequired'">必选</ui-checkbox>
                </div>
                <div>
                  <ui-checkbox :value.sync="field.isHide | convertToBoolean field 'isHide'">隐藏</ui-checkbox>
                </div>
              </div>
            </template>
          </div>
          <div class="form-actions">
            <div class="row">
              <div class="text-center">
                <!-- <ui-button id="submitBtn" color="accent">提交</ui-button> -->
                <ui-button color="default" @click="displayConfig=false">确定</ui-button>
              </div>
            </div>
          </div>
        </div>
      </ui-modal>
    </section>
    <div v-if="displayQRCode" class="mask" @click="displayQRCode=false"></div>
    <div class="qrcode" v-if="displayQRCode">
      <img :src="QRCodeUrl" width="250" height="250">
      <div class="info">扫描二维码将信息收集链接分享给员工</div>
    </div>
    <edit-employee-user v-if="displayEdit" :display.sync="displayEdit" :employee-id="editUserID"></edit-employee-user>
  </div>
</template>
<script>
import store from '../store'
import Vue from 'vue'
import editEmployeeUser from './editEmployeeUser'
export default {
  data() {
      return {
        state: store.state,
        QRCodeUrl: '',
        orgTree: {},
        displayConfig: false,
        displayEdit: false,
        editUserID: null,
        displayQRCode: false,
        fieldEmployee: [], // ID, isHide, isRequired, nameCN, nameEN
        selected: [],
        empTagList: [{
          label: '张三',
          value: '001'
        }, {
          label: '张三',
          value: '001'
        }],
        url: 'api.OrgEmployee.getEmployeeSetList',
        searchFor: {
          organizeID: []
        },
        fields: [{
            name: 'userNum',
            title: '员工工号',
            width: 140,
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
            name: 'statusName',
            title: '审批状态',
            width: '100px'
          }, {
            name: 'userTypeName',
            title: '用工类型',
            width: '100px'
          }, {
            name: 'stateName',
            title: '状态',
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
        ]
      };
    },
    watch: {
      'searchFor.organizeID': function(val) {
        this.$refs.table.refresh();
      }
    },
    filters: {
      convertToBoolean(val, field, fieldName) {
        if (val === "1") return true;
        if (val === "0") return false;

        let isRequired = fieldName == 'isRequired' ? (val ? "1" : "0") : field.isRequired;
        let isHide = fieldName == 'isHide' ? (val ? "1" : "0") : field.isHide;

        this.$root.toggleMask(true);

        // 修改值
        store.actions.editEmployeeSetField(field.ID, isRequired, isHide, () => {
          store.actions.loadEmployeeSetField((fields) => {
            this.fieldEmployee = fields;
          }, (error) => {
            this.$root.showTip({
              type: 'danger',
              msg: error
            });
          });
          this.$root.toggleMask(false);
        }, (error) => {
          this.$root.toggleMask(false);
          this.$root.showTip({
            type: 'danger',
            msg: error
          });
          store.actions.loadEmployeeSetField((fields) => {
            this.fieldEmployee = fields;
          }, (error) => {
            this.$root.showTip({
              type: 'danger',
              msg: error
            });
          });
        });



        return val;
        console.log('123311: ', val);
      },

    },
    methods: {
      edit() {
        let errorMsg = '';
        if (this.selected.length <= 0) {
          errorMsg = "请选择修改的员工信息！";
        } else if (this.selected.length > 1) {
          errorMsg = "请选择单个人员操作修改！";
        }
        if (errorMsg.length <= 0) {
          var rows = this.$refs.table.getSelections();
          var notApproved = rows.every(p => {
            return p.status == '150006'
          });
          if (!notApproved) {
            errorMsg = "该条记录已经审核通过！";
          }
        }
        if (errorMsg.length > 0) {
          this.$root.showTip({
            type: 'warning',
            msg: errorMsg
          });
          return;
        }
        this.editUserID = this.selected[0];
        this.displayEdit = true;
      },
      approve() {
        if (this.selected.length <= 0) {
          this.$root.showTip({
            type: 'warning',
            msg: '请在列表中选择要审批通过的员工信息！'
          });
          return;
        }
        var rows = this.$refs.table.getSelections();
        var notApproved = rows.every(p => {
          return p.status == '150006'
        });
        if (!notApproved) {
          this.$root.showTip({
            type: 'warning',
            msg: "选中的记录已有审核通过的记录！"
          });
          return;
        }

        this.$root.showConfirm({
          msg: "确认操作吗？",
          ok: () => {
            store.actions.approveEmployeeUser(this.selected, () => {
              this.$root.showTip({
                type: 'info',
                msg: "员工审批成功！"
              });
              this.selected = [];
              this.$refs.table.refresh();
            }, (error) => {
              this.$root.showTip({
                type: 'danger',
                msg: error
              });
            })
          }
        });
      },
      remove() {
        if (this.selected.length <= 0) {
          this.$root.showTip({
            type: 'warning',
            msg: '请在列表中选择要删除的员工信息！'
          });
          return;
        }
        var rows = this.$refs.table.getSelections();
        var notApproved = rows.every(p => {
          return p.status == '150006'
        });
        if (!notApproved) {
          this.$root.showTip({
            type: 'warning',
            msg: "选中的记录已有审核通过的记录！"
          });
          return;
        }
        this.$root.showConfirm({
          msg: "确认要删除选中的员工信息吗？",
          ok: () => {
            store.actions.removeEmployeeUserByIDs(this.selected, () => {
              this.$root.showTip({
                type: 'info',
                msg: "删除员工信息成功！"
              });
              this.selected = [];
              this.$refs.table.refresh();
            }, (error) => {
              this.$root.showTip({
                type: 'danger',
                msg: error
              });
            })
          }
        });
      },
      showConfig() {
        store.actions.loadEmployeeSetField((fields) => {
          this.fieldEmployee = fields;
          this.displayConfig = true;
        }, (error) => {
          this.$root.showTip({
            type: 'danger',
            msg: error
          });
        });
      }
    },
    components: {
      editEmployeeUser
    },
    ready() {
      this.QRCodeUrl = 'http://qr.liantu.com/api.php?text=' + encodeURIComponent('http://' + window.location.host + '/getInformation/index.html#!/getInformation/personalInfo');
      console.log('rows: ', this.QRCodeUrl)

      store.actions.loadOrgListTree((tree) => {
        console.log('tree: ', tree);
        this.orgTree = tree;
      }, (error) => {
        this.$root.showTip({
          type: 'danger',
          msg: error
        });
      });

      store.actions.loadEmployeeSetField((fields) => {
        this.fieldEmployee = fields;
      }, (error) => {
        this.$root.showTip({
          type: 'danger',
          msg: error
        });
      });
    }
};
</script>
<style lang="scss">
.emp-verify {
  .tags {
    span {
      display: inline-block;
    }
  }
  .ui-checkbox {
    font-weight: bold;
    margin-bottom: 0;
  }
}
</style>
<style lang="css" scoped>
.qrcode {
  width: 320px;
  height: 320px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -160px;
  margin-top: -240px;
  z-index: 9999;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  background-color: #fff;
}

.mask {
  background-color: #333;
  opacity: 0.3;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 9998;
}

.qrcode img {
  padding-left: 60px;
  padding-top: 40px;
}

.qrcode .info {
  width: 100%;
  text-align: center;
  margin-top: 18px;
  font-size: 15px;
  font-weight: bold;
}

.btn-list {
  margin-right: 30px;
}

.tag-list {
  border: 1px solid #a6a6a6;
  height: 155px;
  padding-top: 15px;
  padding-bottom: 14px;
}

.tags {
  width: 100%;
  height: 130px;
}

.emp-verify,
.warp {
  height: 100%;
  overflow: hidden;
}

.emp-verify .warp {
  background-color: #fff;
  position: relative;
}

.emp-verify .list-group {
  text-align: center;
  cursor: pointer;
  overflow-x: hidden;
}

.emp-verify .search {
  float: left;
  margin-left: 50px;
  width: 300px;
}

.emp-verify .toolbar {
  position: absolute;
  height: 48px;
  left: 0;
  width: 100%;
  padding-left: 20px;
  background-color: #e8eaef;
}

.emp-verify .quick-info {
  float: left;
  width: 400px;
}

.emp-verify .quick-info strong {
  font-size: 30px;
}

.emp-verify .tool {
  float: right;
  width: 275px;
  color: red;
  padding-right: 10px;
  text-align: right;
}

.emp-verify .main-content {
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

.field-box {
  border: 2px solid #E8E8E8;
  height: 414px;
  overflow-y: scroll;
}

.field-line {
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #E9E9E9;
  margin: 10px;
  font-size: 16px;
  font-weight: bold !important;
}

.field-line > div:nth-child(1) {
  flex: 1;
  padding-left: 30px;
}

.field-line > div:nth-child(2) {
  width: 100px;
}

.field-line > div:nth-child(3) {
  width: 100px;
}
</style>
