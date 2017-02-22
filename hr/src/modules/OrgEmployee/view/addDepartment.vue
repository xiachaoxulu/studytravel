<template>
  <ui-modal :show.sync="display" :header="header" type="medium" hide-footer>
    <ui-validator>
      <form class="form-horizontal container-fluid" role="form" vali-submit="submitBtn|submitedCall">
        <div class="row">
          <div class="col-sm-24">
            <div class="form-group row">
              <label class="col-sm-6 control-label">部门名称：</label>
              <div class="col-sm-18">
                <input type="text" v-model="dept.departmentName" vali="required" vali-msg="必填项" class="form-control" placeholder="请输入部门名称">
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-24">
            <div class="form-group row">
              <label class="col-sm-6 control-label">负责人：</label>
              <div class="col-sm-18">
                <input type="text" v-model="dept.leadingName" readonly="readonly" @click="chooseLeading" class="form-control" placeholder="点击选择负责人" class="combo-input">
              </div>
            </div>
          </div>
        </div>
        <div class="row" v-show="dept.parentID==null || dept.ID!=null">
          <div class="col-sm-24">
            <div class="form-group row">
              <label class="col-sm-6 control-label">上级部门：</label>
              <div class="col-sm-18">
                <combo-tree :treeData="state.deptTree" idprop="ID" :nodeclicked="deptClicked" textprop="departmentName" :multiple="false" :rootvisible="false">
                  <div data-toggle="dropdown">
                    <input type="text" v-model="dept.parentName" readonly="readonly" class="form-control" placeholder="点击选择上级部门" class="combo-input">
                  </div>
                </combo-tree>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-24">
            <div class="form-group row">
              <label class="col-sm-6 control-label">所属城市：</label>
              <div class="col-sm-18">
                <app-district-select :province.sync="dept.province" :city.sync="dept.city" :use-value="true"></app-district-select>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-24">
            <div class="form-group row">
              <label class="col-sm-6 control-label">地址：</label>
              <div class="col-sm-18">
                <input type="text" v-model="dept.address" class="form-control">
              </div>
            </div>
          </div>
        </div>
        <div class="form-actions">
          <div class="row">
            <div class="text-center">
              <ui-button id="submitBtn" color="accent">提交</ui-button>
              <ui-button color="default" @click="close">取消</ui-button>
            </div>
          </div>
        </div>
      </form>
    </ui-validator>
    <app-select-employee :display.sync="displayEmployeeSelect" v-if="displayEmployeeSelect" :callback="employeeSelected"></app-select-employee>
  </ui-modal>
</template>
<script>
import store from '../store'
export default {
  data() {
      return {
        state: store.state,
        displayEmployeeSelect: false,
        paramsEmployee: {
          deptID: null
        }
      }
    },
    computed: {
      header() {
        return this.dept.ID == null ? '新建部门' : '修改部门';
      }
    },
    methods: {
      employeeSelected(emp) {
        if (emp && emp.length > 0) {
          this.dept.leadingName = emp[0].userName;
          this.dept.leadingID = emp[0].ID;
        } else {
          this.dept.leadingName = null;
          this.dept.leadingID = null;
        }
      },
      chooseLeading() {
        this.displayEmployeeSelect = true;
      },
      deptClicked(data) {
        this.dept.parentName = data.departmentName;
        this.dept.parentID = data.ID;
      },
      close() {
        this.display = false;
      }
    },
    props: {
      dept: {
        twoWay: true,
        default: () => {
          return {};
        }
      },
      display: {
        type: Boolean,
        default: false
      }
    },
    events: {
      submitedCall() {
        let me = this;
        if (me.dept.ID) {
          if (me.dept.ID == me.dept.parentID) {
            me.$root.showTip({
              type: 'danger',
              msg: '上级部门不能选择自身部门！',
              duration: 2000
            });
            return;
          }
          store.actions.editDept(this.dept, () => {
            store.actions.loadCompanyDeptStore();
            // store.actions.loadBrandAreaStoreTree(); // 刷新品牌区域门店树数据
            store.actions.loadDeptTree(); // 刷新组织树数据
            store.actions.loadOrgListTree();
            me.dept = {};
            me.display = false;
          }, (error) => {
            me.$root.showTip({
              type: 'danger',
              msg: error,
              duration: 2000
            });
          });
        } else {
          store.actions.addDept(this.dept, () => {
            store.actions.loadCompanyDeptStore();
            // store.actions.loadBrandAreaStoreTree(); // 刷新品牌区域门店树数据
            store.actions.loadDeptTree(); // 刷新组织树数据
            store.actions.loadOrgListTree();
            me.dept = {};
            me.display = false;
          }, (error) => {
            me.$root.showTip({
              type: 'danger',
              msg: error,
              duration: 2000
            });
          })
        }
      }
    },
    created() {
      if (!this.dept.parentID) store.actions.loadDeptTree();
    }
};
</script>
<style lang="css" scoped>
.combo-input {
  background-color: #FFF;
}
</style>
