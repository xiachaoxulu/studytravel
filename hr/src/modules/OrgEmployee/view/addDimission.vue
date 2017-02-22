<!--
* @Created Date       : 2016-11-07T10:07:25+08:00
* @Last Modified time : 2016-12-02T15:51:36+08:00
 -->


<template>
  <ui-modal :show.sync="display" header="员工离职" type="large" hide-footer>
    <ui-validator name="validation1">
      <form class="form-horizontal container-fluid" role="form" vali-submit="submitBt|submit">
        <div class="row">
          <div class="col-sm-12">
            <div class="form-group   row">
              <label class="col-sm-6 control-label"><span class="must">*</span>员工姓名</label>
              <div class="col-sm-18">
                <div class="choose-input" @click="selectEmployee" :class={'disabled':ID!==''}>
                  <input type="text" v-model="info.userName" vali="required" vali-msg='必填项' class="form-control" placeholder="请选择员工姓名"  >
                  <i class="icon-tool icon-tool-search"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-12">
            <div class="form-group  row">
              <label class="col-sm-6 control-label">员工工号</label>
              <div class="col-sm-18">
                <input type="text" v-model="info.userNum" class="form-control" placeholder="选择员工自动生成" disabled>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <div class="form-group  row">
              <label class="col-sm-6 control-label">组织</label>
              <div class="col-sm-18">
                <input type="text" v-model="info.orgName" class="form-control" placeholder="选择员工自动生成" disabled>
              </div>
            </div>
          </div>
          <div class="col-sm-12">
            <div class="form-group  row">
              <label class="col-sm-6 control-label">岗位</label>
              <div class="col-sm-18">
                <input type="text" v-model="info.postName" class="form-control" placeholder="选择员工自动生成" disabled>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <div class="form-group   row">
              <label class="col-sm-6  control-label"><span class="must">*</span>生效日期</label>
              <div class="col-sm-18">
                <ui-datepicker :time.sync="info.effectTime" format="yyyy-MM-dd" width="100%" vali="required" vali-msg='必填项'></ui-datepicker>
              </div>
            </div>
          </div>
          <div class="col-sm-12">
            <div class="form-group  row">
              <label class="col-sm-6  control-label"><span class="must">*</span>离职原因</label>
              <div class="col-sm-18">
                <select v-model="info.reason" class="form-control" vali="required" vali-msg='必填项'>
                  <option value="">请选择离职原因</option>
                  <template v-for="item in reasons">
                    <option value="{{item.code}}" :selected="item.code==info.reason">{{item.codeName}}</option>
                  </template>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-24">
            <div class="form-group  row">
              <label class="col-sm-3  control-label">离职类型</label>
              <div class="col-sm-21">
                <select v-model="info.leaveType" class="form-control" >
                  <option value="">请选择离职类型</option>
                  <template v-for="item in leaveTypes">
                    <option value="{{item.code}}" :selected="item.code==info.reason">{{item.codeName}}</option>
                  </template>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <div class="form-group   row">
              <label class="col-sm-6  control-label"></label>
              <div class="col-sm-18">
                <ui-checkbox :value.sync="ischeck">是否加入黑名单</ui-checkbox>
              </div>
            </div>
          </div>
          <div class="col-sm-12">
            <div class="form-group  row">
              <label class="col-sm-6  control-label">黑名单原因</label>
              <div class="col-sm-18">
                <select :disabled="!ischeck" v-model="info.blackReason" class="form-control">
                  <option value="">请选择黑名单原因</option>
                  <template v-for="item in blackReasons">
                    <option value="{{item.code}}" :selected="item.code==info.blackReason">{{item.codeName}}</option>
                  </template>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="form-actions">
          <div class="row">
            <div class="text-center">
              <ui-button color="accent" id="submitBt" class="large">保存</ui-button>
            </div>
          </div>
        </div>
      </form>
    </ui-validator>
    <components :is="what" :display.sync="showSelect" :params="params" :callback="chooseEmployeeCallBack">
    </components>
  </ui-modal>
</template>
<script>
import Store from '../store'


export default {
  data() {
      return {

        ischeck: false, //是否加入黑名单
        params: {
          state: "['120001','120002']"
        },
        showSelect: false, //是否显示查询员工接口
        what: '',
        reasons: [],
        leaveTypes:[],
        blackReasons: [], //黑名单原因
        info: {
          userName: '',
          userNum: '', //员工编码
          userID: '', //用户ID
          leaveType:'',//离职类型
          orgName: '', //组织名称
          postName: '', //岗位名称
          effectTime: '', //生效日期
          reason: '', //转正原因
          blackReason: ''
        }
      }
    },
    events: {
      submit() {
        var self = this;

        //验证时间
        // var oDate1 = new Date(self.info.effectTime);
        // var oDate2 = new Date();
        // oDate1 = new Date(oDate1.getFullYear() + "-" + (oDate1.getMonth() + 1) + "-" + oDate1.getDate());
        // oDate2 = new Date(oDate2.getFullYear() + "-" + (oDate2.getMonth() + 1) + "-" + oDate2.getDate());

        // if (oDate1 < oDate2) {
        //   self.$root.showTip({
        //     type: 'danger',
        //     msg: '生效日期不能小于今天',
        //     duration: 2000
        //   });
        //   return;
        // }

        if (self.ID == "") {
          Store.actions.addDimission(self.info, function(data) {
            self.officeEditCallBack();
            self.display = false;
          }, function(error) {
            self.$root.showTip({
              type: 'danger',
              msg: error,
              duration: 2000
            });
          })
        } else {
          self.info.ID = self.ID;
          Store.actions.updateDimission(self.info, function(data) {
            self.officeEditCallBack();
            self.display = false;
          }, function(error) {
            self.$root.showTip({
              type: 'danger',
              msg: error,
              duration: 2000
            });
          })
        }
      }
    },
    methods: {
      //选择人员回调
      chooseEmployeeCallBack(data) {
        if (data.length > 0) {
          this.info.userName = data[0].userName;
          this.info.userNum = data[0].userNum;
          var orgname = data[0].deptName;

          if (data[0].storeName) {
            orgname += "/" + data[0].storeName;
          }
          if (data[0].teamName) {
            orgname += "/" + data[0].teamName;
          }
          this.info.orgName = orgname;
          this.info.userID = data[0].ID;
          this.info.postName = data[0].postName;
        }
      },
      //查询员工
      selectEmployee() {
        this.what = "appSelectEmployee";
        this.showSelect = true;
      },

      cancel() {
        this.display = false;
      }
    },
    ready() {
      var self = this;
      if (this.ID != "") {
        Store.actions.getOneDimission(this.ID, function(data) {
          self.info.userName = data.userName;
          self.info.userNum = data.userNum;
          self.info.userID = data.userID;
          var orgname = data.deptName;
          if (data.storeName) {
            orgname += "/" + data.storeName;
          }
          if (data.teamName) {
            orgname += "/" + data.teamName;
          }
          self.info.orgName = orgname;
          self.info.postName = data.postName;
          self.info.effectTime = data.effectTime;
          self.info.reason = data.reason;
          self.info.blackReason = data.blackReason;
          if (self.info.blackReason)
            self.ischeck = true;
        }, function(error) {
          self.$root.showTip({
            type: 'danger',
            msg: error,
            duration: 2000
          });
        })
      } else {

      }

      //加载转正原因
      Store.actions.findSystemConfig("101000", function(data) {
        self.reasons = data;
      }, function(error) {
        self.$root.showTip({
          type: 'danger',
          msg: error,
          duration: 2000
        });
      })

      Store.actions.findSystemConfig("121000", function(data) {
        self.blackReasons = data;
      }, function(error) {
        self.$root.showTip({
          type: 'danger',
          msg: error,
          duration: 2000
        });
      })

      Store.actions.findSystemConfig("152000", function(data) {
        self.leaveTypes = data;
      }, function(error) {
        self.$root.showTip({
          type: 'danger',
          msg: error,
          duration: 2000
        });
      })

    },
    watch: {
      ischeck(a, b) {
        if (!a) {
          this.info.blackReason = "";
        }
      }
    },
    props: {
      display: {
        type: Boolean,
        twoWay: true,
        default: false
      },
      ID: {
        type: String,
        default: ""
      },
      officeEditCallBack: {
        type: Function,
        default: function() {}
      }
    }
};
</script>
<style lang="css" scoped>
.must {
  color: red;
}

.choose-input {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  font-family: 'Microsoft YaHei', serif;
  width: 100%;
}

.choose-input > input {
  font-family: 'Microsoft YaHei', serif;
  color: #666;
  box-sizing: border-box;
  outline: none;
  padding: 0 30px 0 7px;
  font-size: 13px;
  width: 100%;
  cursor: pointer;
  background: #fff;
}

.choose-input > i {
  display: inline-block;
  position: absolute;
  width: 30px;
  height: 30px;
  top: 4px;
  right: 0;
  color: #999;
}
.disabled { pointer-events: none; }
</style>
