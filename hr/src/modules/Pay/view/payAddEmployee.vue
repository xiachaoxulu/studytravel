<template>
  <ui-modal :show.sync="display" header="添加员工" type="large" hide-footer>
    <div class="form-horizontal container-fluid">
    <div class="row">
      
    </div>
      <div class="row">
        <div class="col-sm-8">
          <label class="col-sm-8 control-label">组织</label>
          <div class="col-sm-16">
            <combo-tree :treedata="suiteOrgTree" :multiple="true" :checkable="true" :ancestorcheck="true" :checkonebyone="true" idprop="organizeID" :rootvisible="false" :nodeclicked="orgNodeClicked">
              <div data-toggle="dropdown">
                <div class="choose-input">
                  <input type="text" class="form-control" v-model="orgDisplayName" :title="orgDisplayName" placeholder="请选择组织" readonly>
                  <i class="material-icons">search</i>
                </div>
              </div>
            </combo-tree>
          </div>
        </div>
        <div class="col-sm-10">
          <div class="form-group row">
            <label class="col-sm-8 control-label">员工状态</label>
            <div class="col-sm-12">
              <v-select :options="pairUserTypes" :value.sync="searchUserType" :multiple="true" overflow="hidden" class="form-control"></v-select>
            </div>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="form-group row">
            <div class="choose-input">
              <input type="text" class="form-control" placeholder="搜索员工姓名" v-model="searchUserName" @keyup="loadEmployee| debounce 500">
              <i class="material-icons">search</i>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="table-wrapper">
          <ui-table v-ref:emp-table height="300px">
            <template slot="headerLockedFirst">
              <table class="table table-bordered">
                <colgroup>
                  <col width="100px"></col>
                  <col width="130px"></col>
                  <col width="80px"></col>
                  <col width="140px"></col>
                  <col width="80px"></col>
                </colgroup>
                <tbody>
                  <tr>
                    <td>
                      <ui-checkbox :value.sync="allEmpsCheck" class="cell-check" />全选
                    </td>
                    <td>员工工号</td>
                    <td>姓名</td>
                    <td>组织</td>
                    <td>员工状态</td>
                  </tr>
                </tbody>
              </table>
            </template>
            <template slot="headerNormal">
              <table class="table table-bordered">
                <colgroup>
                  <col width="95px"></col>
                  <col width="80px"></col>
                  <col width="130px"></col>
                  <col width="180px"></col>
                  <col width="140px"></col>
                </colgroup>
                <tbody>
                  <tr>
                    <td>职位</td>
                    <td>职级</td>
                    <td>职级工资</td>
                    <td>岗位</td>
                    <td>岗位工资</td>
                  </tr>
                </tbody>
              </table>
            </template>
            <template slot="bodyLockedFirst">
              <table class="table table-bordered">
                <colgroup>
                  <col width="100px"></col>
                  <col width="130px"></col>
                  <col width="80px"></col>
                  <col width="140px"></col>
                  <col width="80px"></col>
                </colgroup>
                <tbody>
                  <tr v-for="emp in employeeList">
                    <td>
                      <ui-checkbox class="cell-check" :value.sync="employeeChecked[$index]" />{{$index+1}}
                    </td>
                    <td>{{emp.userNum}}</td>
                    <td>{{emp.userName}}</td>
                    <td :title="emp.deptName">{{emp.deptName}}</td>
                    <td>{{emp.state}}</td>
                  </tr>
                </tbody>
              </table>
            </template>
            <template slot="bodyNormal">
              <table class="table table-bordered">
                <colgroup>
                  <col width="95px"></col>
                  <col width="80px"></col>
                  <col width="130px"></col>
                  <col width="180px"></col>
                  <col width="140px"></col>
                </colgroup>
                <tbody>
                  <tr v-for="emp in employeeList">
                    <td>{{emp.positionName}}</td>
                    <td>{{emp.rankName}}</td>
                    <td>{{emp.ranksalary}}</td>
                    <td :title="emp.postName">{{emp.postName}}</td>
                    <td>{{emp.postsalary}}</td>
                  </tr>
                </tbody>
              </table>
            </template>
          </ui-table>
        </div>
      </div>
      <div class="form-actions">
        <div class="row">
          <div style="text-align:center; margin-top: 20px;">
            <ui-button @click="addEmployee" color="success">添加</ui-button>
          </div>
        </div>
      </div>
    </div>
    <v-spinner :size="md" :fixed="false" text="" v-ref:spinner></v-spinner>
  </ui-modal>
</template>
<script>
import store from '../store'
export default {
  data() {
      return {
        state: store.state,
        suiteOrgTree: null,
        orgDisplayName: null,
        orgSelectedList: [],
        searchUserType: [],
        employeeList: [],
        allEmpsCheck: false,
        employeeChecked: []
      };
    },
    watch: {
      'allEmpsCheck': function(val) {
        for (let i = 0; i < this.employeeList.length; i++) {
          this.employeeChecked.$set(i, val);
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
        this.orgDisplayName = data.map((x) => {
          return x.text;
        }).join(',');
        this.orgSelectedList = data.map((x) => {
          return x.organizeID;
        });
        this.loadEmployee();
      },
      loadEmployee() {
        this.$refs.spinner.show();
        store.actions.loadPaySuiteEmployeeToBeAdded(this.orgSelectedList, this.searchUserType, this.searchUserName, (data) => {
          this.employeeList = data;
          this.employeeChecked = [];
          this.$nextTick(() => {
            this.$refs.empTable.refresh();
          });
          this.$refs.spinner.hide();
        }, (error) => {
          this.$refs.spinner.hide();
          this.$root.showTip({
            type: 'error',
            msg: error
          });
        });
      },
      addEmployee() {
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

        store.actions.addPaySuiteEmployee(chosenEmployeeIDs, () => {
          this.$root.showTip({
            type: 'info',
            msg: "工资套添加员工成功！"
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

      store.actions.loadDeptStoreTeamList((data) => {
        this.suiteOrgTree = data;
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

.table-wrapper {
  position: relative;
  width: 800px;
}

.cell-check {
  position: relative;
  top: 8px;
}
</style>
