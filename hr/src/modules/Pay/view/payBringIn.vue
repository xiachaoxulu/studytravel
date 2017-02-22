<template>
  <ui-modal :show.sync="display" header="引入" type="large" hide-footer>
    <ui-validator>
      <form class="form-horizontal container-fluid" role="form" vali-submit="submitBtn|submitedCall">
        <div class="row divider">
          <div>历史数据</div>
          <div></div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <div class="form-group row">
              <label class="col-sm-9 control-label">历史工资月份：</label>
              <div class="col-sm-15">
                <select v-model="selectedHistoryMonthID" vali="required" vali-msg="请选择历史工资月份" class="form-control">
                  <option v-for="month in state.payBringInMonthAndSendNum" :value="month.monthID" :selected="month.monthID==selectedHistoryMonthID">
                    {{month.monthName.substr(0,4) + '-' + month.monthName.substr(4)}}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="col-sm-12">
            <div class="form-group row">
              <label class="col-sm-7 control-label">发放次数：</label>
              <div class="col-sm-12">
                <select v-model="selectedSendNum" vali="required" vali-msg="请选择发放次数" class="form-control">
                  <option v-for="sendNum in sendNumList" :value="sendNum" :selected="sendNum==selectedSendNum">{{sendNum}}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="row divider">
          <div>选择员工</div>
          <div></div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <div class="form-group row">
              <label class="col-sm-9 control-label">组织：</label>
              <div class="col-sm-12">
                <combo-tree :treedata="suiteOrgTree" :multiple="true" :checkable="true" :ancestorcheck="true" :checkonebyone="true" idprop="orgID" textprop="orgName" :rootvisible="false" :nodeclicked="orgNodeClicked">
                  <div data-toggle="dropdown">
                    <div class="choose-input">
                      <input type="text" class="form-control" v-model="orgDisplayName" :title="orgDisplayName" placeholder="请选择组织" readonly>
                      <i class="material-icons">search</i>
                    </div>
                  </div>
                </combo-tree>
              </div>
            </div>
          </div>
          <div class="col-sm-12">
            <div class="form-group row">
              <label class="col-sm-7 control-label">员工状态：</label>
              <div class="col-sm-12">
                <v-select :options="pairUserTypes" :value.sync="searchUserType" :multiple="true" overflow="hidden"></v-select>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <div class="form-group row">
              <label class="col-sm-9 control-label">搜索：</label>
              <div class="col-sm-12">
                <div class="choose-input">
                  <input type="text" class="form-control" placeholder="输入员工姓名" v-model="searchUserName" @keyup="loadEmployee| debounce 500">
                  <i class="material-icons">search</i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="table-wrapper">
            <ui-table v-ref:emp-table height="300px">
              <template slot="headerNormal">
                <div></div>
              </template>
              <template slot="bodyNormal">
                <table class="table table-bordered">
                  <colgroup>
                    <col width="95px"></col>
                    <col width="80px"></col>
                    <col width="130px"></col>
                    <col width="180px"></col>
                    <col width="140px"></col>
                    <col width="80px"></col>
                  </colgroup>
                  <tbody>
                    <tr>
                      <td>
                        <ui-checkbox :value.sync="allEmpsCheck" class="cell-check" />全选
                      </td>
                      <td>姓名</td>
                      <td>员工工号</td>
                      <td>组织</td>
                      <td>岗位</td>
                      <td>员工状态</td>
                    </tr>
                    <tr v-for="emp in employeeList">
                      <td>
                        <ui-checkbox class="cell-check" :value.sync="employeeChecked[$index]" />
                      </td>
                      <td>{{emp.userName}}</td>
                      <td>{{emp.userNum}}</td>
                      <td :title="emp.deptName">{{emp.deptName}}</td>
                      <td :title="emp.postName">{{emp.postName}}</td>
                      <td>{{emp.state}}</td>
                    </tr>
                  </tbody>
                </table>
              </template>
            </ui-table>
          </div>
        </div>
        <div class="row divider">
          <div>工资项目</div>
          <div></div>
        </div>
        <div class="row check-list">
          <ui-checkbox :value.sync="allPayItemsCheck">全选</ui-checkbox>
        </div>
        <div class="row check-list">
          <ui-checkboxgroup name="itemName" :list="payItems" id="itemId" :value.sync="payItemsChecked"></ui-checkboxgroup>
        </div>
        <div class="form-actions">
          <div class="row">
            <div class="col-sm-11" style="text-align:right">
              <ui-button id="submitBtn" color="success">保存</ui-button>
            </div>
            <div class="col-sm-2"></div>
            <div class="col-sm-11">
              <ui-button color="success">工资表预览</ui-button>
            </div>
          </div>
        </div>
      </form>
    </ui-validator>
  </ui-modal>
</template>
<script>
import store from '../store'
import Vue from 'vue'
export default {
  data() {
      return {
        state: store.state,
        payItems: [],
        allPayItemsCheck: false,
        payItemsChecked: [],
        selectedHistoryMonthID: null,
        selectedSendNum: null,
        sendNumList: [],
        suiteOrgTree: null,
        orgDisplayName: null,
        orgSelectedList: [],
        searchUserType: [],
        searchUserName: null,
        employeeList: [],
        allEmpsCheck: false,
        employeeChecked: []
      };
    },
    watch: {
      'allPayItemsCheck': function(val, oldVal) {
        this.payItemsChecked = [];
        if (val) {
          this.payItems.forEach((item) => {
            this.payItemsChecked.push(item.itemId);
          });
          console.log(this.payItemsChecked)
        }
      },
      'allEmpsCheck': function(val) {
        for (let i = 0; i < this.employeeList.length; i++) {
          this.employeeChecked.$set(i, val);
        }
      },
      'selectedHistoryMonthID': function(val) {
        this.sendNumList = [];
        this.state.payBringInMonthAndSendNum.every((item) => {
          if (item.monthID == val) {
            for (var i = 1; i <= item.sendNum; i++) {
              this.sendNumList.push(i);
            }
            return false;
          }
          return true;
        });
        if (this.sendNumList.length > 0) {
          this.selectedSendNum = this.sendNumList[this.sendNumList.length - 1];
        }
      },
      'searchUserType': function(val) {
        this.loadEmployee();
      }
    },
    computed: {
      pairUserTypes: function() {
        if (!this.state.commonData.userTypes) return [];
        var pairs = Object.keys(this.state.commonData.userTypes).map(p => {
          return {
            name: this.state.commonData.userTypes[p].codeName,
            value: p
          }
        });
        return pairs;
      }
    },
    methods: {
      orgNodeClicked(data) {
        console.log('nodeData: ', data);
        this.orgDisplayName = data.map((x) => {
          return x.orgName
        }).join(',');
        this.orgSelectedList = data.map((x) => {
          return x.orgID;
        });
        this.loadEmployee();
      },
      loadEmployee() {
        store.actions.getBringInEmployee(this.orgSelectedList, this.searchUserType, this.searchUserName, (data) => {
          this.employeeList = data;
          this.employeeChecked = [];
          this.$nextTick(() => {
            this.$refs.empTable.refresh();
          });
        }, (error) => {
          this.$root.showTip({
            type: 'error',
            msg: error
          });
        });
      }
    },
    events: {
      submitedCall() {
        var hasChosen = false;
        let chosenEmployeeIDs = [];
        if (this.employeeChecked.length <= 0) {
          hasChosen = false;
        } else {
          this.employeeChecked.forEach((item, idx) => {
            if (item) {
              chosenEmployeeIDs.push(this.employeeList[idx].ID);
              hasChosen = true;
            }
          });
        }
        if (!hasChosen) {
          this.$root.showTip({
            type: 'danger',
            msg: "请在列表中选择员工！"
          });
          return;
        }

        if (!Array.isArray(this.payItemsChecked) || this.payItemsChecked.length <= 0) {
          this.$root.showTip({
            type: 'danger',
            msg: '请选择要引入的工资项！'
          });
          return;
        }
        console.log(chosenEmployeeIDs)
        console.log(this.payItemsChecked)
        store.actions.bringInPayHistory({
          historyMonthID: this.selectedHistoryMonthID,
          historySendNum: this.selectedSendNum,
          employeeIDs: chosenEmployeeIDs,
          payItemIDs: this.payItemsChecked
        }, (data) => {
          this.$root.showTip({
            type: 'info',
            msg: '引入数据成功！'
          });
          this.$parent.$refs.t1.refresh();
          this.$parent.$refs.t2.refresh();
          this.display = false;
        }, (error) => {
          this.$root.showTip({
            type: 'danger',
            msg: error
          });
        });

      }
    },
    props: {
      display: {
        type: Boolean,
        twoWay: true,
        default: false
      }
    },
    ready() {
      store.actions.initData();

      this.selectedHistoryMonthID = this.state.payBringInMonthAndSendNum[0].monthID;
      store.actions.getBringInPayItem((data) => {
        this.payItems = data;
      }, (error) => {
        console.log(error)
      });

      store.actions.loadPaySuiteOrgTree((data) => {
        this.suiteOrgTree = data;
        console.log('dddddd: ', this.suiteOrgTree)
      }, (error) => {
        this.$root.showTip({
          type: 'warning',
          msg: error
        });
      });
    }
};
</script>
<style lang="css" scoped>
.divider {
  height: 40px;
  line-height: 40px;
  padding-left: 20px;
  padding-right: 20px;
}

.divider div:nth-child(1) {
  text-align: center;
  position: absolute;
  left: 50%;
  width: 60px;
  margin-left: -25px;
  font-size: 12px;
  color: #737373;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
}

.divider div:nth-child(2) {
  width: 100%;
  height: 21px;
  border-bottom: 1px dashed #737373;
}

.table-wrapper {
  position: relative;
  width: 725px;
  left: 30px;
}

.check-list {
  padding-left: 30px;
  padding-right: 30px;
}

.cell-check {
  position: relative;
  top: 8px;
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
  top: 8px;
  right: 0;
  color: #999;
}
</style>
