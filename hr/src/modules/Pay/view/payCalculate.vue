<template>
  <!-- 模块主内容 -->
  <section class="ui-module-content pos-content">
    <template v-if="$root.checkAuthorityByID('pay-calculate')">
      <div class="ui-module-row">
        <!--  -->
        <pay-suite-list v-ref:suiteList @selectsuite="showSuiteData" :valid="true"></pay-suite-list>
        <div class="com-col-m1-middle ui-panel">
          <!-- <components :is="what"></components> -->
          <!--<router-view class="main" transition="main" transition-mode="out-in"></router-view>-->
          <div>
            <ui-buttongroup active-class="btn-primary">
              <button type="button" class="btn btn-primary" :class="{'btn-primary':menuType=='distribute'}" @click="changeTab(0)">发放员工</button>
              <button type="button" class="btn btn-default" :class="{'btn-primary':menuType=='suspend'}" @click="changeTab(1)">停发员工</button>
            </ui-buttongroup>
            <ui-search __code="pay-calculate-search/搜索" class="ui-search" placeholder="搜索员工姓名" :value.sync="state.searchPayEmployee.userName" :search-callback="cbSearchPayEmployee"></ui-search>
            <div class="pull-right">
              <span>工资月份：</span>
              <select class="selector" v-model="state.searchPayEmployee.monthID" @change="loadPay">
                <option v-for="month in state.payYearMonth" :value="month.ID" :selected="state.searchPayEmployee.monthID==month.ID">
                  {{month.month.substr(0, 4)+'-'+month.month.substr(4)}}</option>
              </select>
            </div>
          </div>
          <div class="emp-list">
            <ui-grid v-ref:t1 v-show="menuType == 'distribute'" :url="urlDistribute" :fields="fieldsDistribute" :perpage="30" :selectable="true" :pages="[10,20,30,50]" :btrefresh="true" checked="single" :selected.sync="state.payDistributeEmployeeSelected" height="auto" tdheight="60px" :before-render="convertDataDistribute" :append-params="state.searchPayEmployee" table-title="发放员工"  :table-name="tableName" :column-config="$root.columnConfig" saved-refresh="all"></ui-grid>
            <ui-grid v-ref:t2 v-show="menuType == 'suspend'" :url="urlSuspend" :fields="fieldsSuspend" :perpage="30" :selectable="true" :pages="[10,20,30,50]" :btrefresh="true" checked="single" :selected.sync="state.paySuspendEmployeeSelected" height="auto" tdheight="60px" :before-render="convertDataSuspend" :append-params="state.searchPayEmployee" table-title="停发员工"  :table-name="tableName" :column-config="$root.columnConfig" saved-refresh="all"></ui-grid>
          </div>
          <div class="save">
            <ui-button color="accent" @click="savePay">保存</ui-button>
          </div>
        </div>
      </div>
      <edit-pay :display.sync="showEditPay" v-if="showEditPay" :pay.sync="pay"></edit-pay>
      <pay-suspended :display.sync="showSuspended"></pay-suspended>
      <pay-re-compute-item :display.sync="showReCompute" v-if="showReCompute" :payids.sync="reComputePayIDs" :pay-items="reComputePayItems"></pay-re-compute-item>
      <ui-confirm type="danger" confirm-button-text="确认" deny-button-text="取消" @confirmed="reComputeAll" :show.sync="showReComputeAll" close-on-confirm header="提示">
        确认要在当前工资套和工资年月下进行全部重新计算操作吗？
      </ui-confirm>
      <pay-suspended :display.sync="showSuspendPay"></pay-suspended>
      <ui-confirm type="danger" confirm-button-text="确认" deny-button-text="取消" @confirmed="recoverPay" :show.sync="showRecoverPay" close-on-confirm header="提示">
        确认要对选择的员工进行恢复操作吗？
      </ui-confirm>
      <ui-confirm type="danger" confirm-button-text="确认" deny-button-text="取消" @confirmed="updatePayConfirmed" :show.sync="showUpdateConfirm" close-on-confirm header="提示">
        {{updateStatusMsg[updateStatusIdx]}}
      </ui-confirm>
    </template>
  </section>
</template>
<script>
import store from '../store'
import editPay from './editPay'
import paySuiteList from './paySuiteList'
import paySuspended from './paySuspended'
import chooseCalculateItem from './chooseCalculateItem'
import payReComputeItem from './payReComputeItem'
export default {
  name: 'dfgg',
  data() {
    return {
      state: store.state,
      menuType: 'distribute',
      showSuspended: false,
      showEditPay: false,
      urlDistribute: 'api.Pay.selectPayDistributeEmployee',
      urlSuspend: 'api.Pay.selectPaySuspendEmployee',
      fieldsDistribute: [],
      fieldsSuspend: [],
      pay: {},

      showReComputeAll: false,
      showReCompute: false,
      reComputePayItems: [],

      showSuspendPay: false,

      showRecoverPay: false,

      reComputePayIDs: null,

      updateStatusCode: [, '保存', '提交', '撤回'],
      updateStatusMsg: [, '确认保存当前工资信息吗？', '确认提交当前工资信息吗？', '确认撤回当前工资信息吗？'],
      updateStatusIdx: 0,
      showUpdateConfirm: false,
      tableName:''
    }
  },
  components: {
    paySuiteList,
    paySuspended,
    editPay,
    payReComputeItem,
    paySuspended,
  },
  methods: {
    cbSearchPayEmployee(name) {
      this.$refs.t1.refresh();
      this.$refs.t2.refresh();
    },
    changeTab(idx) {
      var tabs = ['distribute', 'suspend'];
      var tables = [this.$refs.t1, this.$refs.t2];
      this.menuType = tabs[idx];
      this.$nextTick(() => {
        tables[idx].refreshTable();
      });
    },
    changeSuite(id) {
      console.log(id)
    },
    showSuiteData(idx) {
      var suiteID = this.state.paySuiteList[idx].ID;
      this.tableName = 'salaryTable_'+suiteID;
      this.state.searchPayEmployee.payrangeID = suiteID;
      this.$refs.t1.refresh();
      this.$refs.t2.refresh();
    },
    loadPay() {
      this.$refs.t1.refresh();
      this.$refs.t2.refresh();
    },
    savePay() {
      this.updateStatusIdx = 1;
      this.showUpdateConfirm = true;
    },
    updatePayConfirmed() {
      if (!this.state.searchPayEmployee.payrangeID) {
        this.$root.showTip({
          type: 'warning',
          msg: '请先在左侧选择工资套后再操作！'
        });
        return;
      }
      if (!this.state.searchPayEmployee.monthID) {
        this.$root.showTip({
          type: 'warning',
          msg: '请先在右侧上方选择工资月份后再操作！'
        });
        return;
      }
      store.actions.updatePayStatus(this.state.searchPayEmployee.payrangeID, this.state.searchPayEmployee.monthID, this.updateStatusIdx, () => {
        this.$root.showTip({
          type: 'info',
          msg: this.updateStatusCode[this.updateStatusIdx] + '成功！'
        });
        this.$refs.t1.refresh();
        this.$refs.t2.refresh();
      }, (error) => {
        this.$root.showTip({
          type: 'danger',
          msg: error
        });
      });
    },
    convertDataDistribute(data) {
      let result = [];
      let fields = [{
        name: 'userCode',
        title: '员工工号',
        locked: 'first',
        width: '150px'
      }, {
        name: 'userName',
        title: '姓名',
        locked: 'first',
        width: '80px'
      }, {
        name: 'organize',
        title: '组织',
        locked: 'first',
        width: '260px'
      }, {
        name: 'postName',
        title: '岗位',
        locked: 'first',
        width: '150px'
      }];
      if (data && data.length > 0) {
        data[0].payItems.forEach((item) => {
          fields.push({
            name: item.suiteID+'_' + item.payItemID,
            title: item.itemName,
            width: !item.itemName ? '100px' : (item.itemName.length > 2 ? (parseInt(20 * item.itemName.length) + 'px') : '100px')
          });
        });
        data.forEach((item) => {
          let itemConverted = {};
          itemConverted.ID = item.ID;
          itemConverted.userID = item.userID;
          itemConverted.userCode = item.userCode;
          itemConverted.userName = item.userName;
          itemConverted.organize = item.organize;
          itemConverted.postName = item.postName;
          if (item.payItems && item.payItems.length > 0) {
            item.payItems.forEach((payItem) => {
              itemConverted[payItem.suiteID+'_' + payItem.payItemID] = payItem.money;
            });
          }
          result.push(itemConverted);
        });
      } else {
        fields.push({
          name: 'payItem_null',
          title: '',
          width: '100px'
        });
      }
      this.$set('fieldsDistribute', fields);
      console.log(JSON.stringify(result));
      console.log(JSON.stringify(this.fieldsDistribute));
      return result;
    },
    convertDataSuspend(data) {
      let result = [];
      let fields = [{
        name: 'userCode',
        title: '员工工号',
        locked: 'first',
        width: '150px'
      }, {
        name: 'userName',
        title: '姓名',
        locked: 'first',
        width: '80px'
      }];
      if (data && data.length > 0) {
        data[0].payItems.forEach((item) => {
          fields.push({
            name: item.suiteID + '_' + item.payItemID,
            title: item.itemName,
            width: '100px'
          });
        });
        data.forEach((item) => {
          let itemConverted = {};
          itemConverted.ID = item.ID;
          itemConverted.userID = item.userID;
          itemConverted.userCode = item.userCode;
          itemConverted.userName = item.userName;
          if (item.payItems && item.payItems.length > 0) {
            item.payItems.forEach((payItem) => {
              itemConverted[payItem.suiteID + '_' + payItem.payItemID] = payItem.money;
            });
          }
          result.push(itemConverted);
        });
      } else {
        fields.push({
          name: 'payItem_null',
          title: '',
          width: '100px'
        });
      }
      this.$set('fieldsSuspend', fields);
      return result;
    },
    reComputeAll() {
      var rangeID = store.state.searchPayEmployee.payrangeID;
      var monthID = store.state.searchPayEmployee.monthID;
      if (!rangeID || !monthID) return;

      this.$root.toggleMask(true, '努力计算中请稍后...')

      store.actions.reComputePayAll(rangeID, monthID, () => {

        this.$root.toggleMask(false);

        this.$root.showTip({
          type: 'info',
          msg: "重新计算成功！"
        });
        this.$refs.t1.refresh();
        this.$refs.t2.refresh();
      }, (error) => {
        this.$root.toggleMask(false);
        this.$root.showTip({
          type: 'error',
          msg: error
        });
      });
    },
    recoverPay() {
      var IDs = this.state.paySuspendEmployeeSelected.map((item) => {
        return item;
      });

      this.$root.toggleMask(true, '努力计算中请稍后...')

      store.actions.editEmployeePayStatus(0, IDs, null, () => {

        this.$root.toggleMask(false);

        this.$root.showTip({
          type: 'info',
          msg: '恢复操作成功！'
        });
        this.$refs.t1.refresh();
        this.$refs.t2.refresh();
      }, (error) => {
        this.$root.toggleMask(false);
        this.$root.showTip({
          type: 'error',
          msg: error
        });
      });
    },
  },
  attached() {



    // 切换头部菜单
    this.$parent.changeHeaderMenu('PayCalculate');
  },
  events: {
    editPay() {
      if (!Array.isArray(this.state.payDistributeEmployeeSelected) || !Array.isArray(this.state.paySuspendEmployeeSelected)) return;
      var selected = [];
      if (Array.isArray(this.state.payDistributeEmployeeSelected)) {
        if (this.state.payDistributeEmployeeSelected.length > 1) {
          this.$root.showTip({
            type: 'warning',
            msg: '只能同时修改一条薪酬发放员工记录！'
          });
          return;
        } else {
          this.state.payDistributeEmployeeSelected.forEach((item) => {
            selected.push(item);
          });
        }
      }
      if (Array.isArray(this.state.paySuspendEmployeeSelected)) {
        if (this.state.paySuspendEmployeeSelected.length > 1) {
          this.$root.showTip({
            type: 'warning',
            msg: '只能同时修改一条薪酬停发员工记录！'
          });
          return;
        } else {
          this.state.paySuspendEmployeeSelected.forEach((item) => {
            selected.push(item);
          });
        }
      }
      if (selected.length > 1) {
        this.$root.showTip({
          type: 'warning',
          msg: '薪酬发放员工与停发员工只能同时修改一条记录！'
        });
        return;
      }
      if (selected.length <= 0) {
        this.$root.showTip({
          type: 'warning',
          msg: '  请先在列表中选择一条记录进行修改！'
        });
        return;
      }
      store.actions.loadPayByID(selected[0], this.state.searchPayEmployee.monthID, this.state.searchPayEmployee.payrangeID, (data) => {
        this.pay = data;
        this.showEditPay = true;
      }, (error) => {
        this.$root.showTip({
          type: 'error',
          msg: error
        });
      });
    },
    computePay() {
      if (!Array.isArray(this.state.payDistributeEmployeeSelected) || !Array.isArray(this.state.paySuspendEmployeeSelected)) return;
      var selected = [];
      if (Array.isArray(this.state.payDistributeEmployeeSelected)) {
        this.state.payDistributeEmployeeSelected.forEach((item) => {
          selected.push(item);
        });
      }
      if (Array.isArray(this.state.paySuspendEmployeeSelected)) {
        this.state.paySuspendEmployeeSelected.forEach((item) => {
          selected.push(item);
        });
      }
      if (selected.length <= 0) { // 全部重新计算
        this.showReComputeAll = true;
      } else {
        store.actions.loadReComputePayItem(this.state.searchPayEmployee.payrangeID, this.state.searchPayEmployee.monthID, (data) => {
          if (!Array.isArray(data) || data.length <= 0) {
            this.$root.showTip({
              type: 'warning',
              msg: "没有可计算的工资项！",
              duration: 2000
            });
            return;
          }
          data.forEach((item) => {
            item.value = true;
          });
          this.reComputePayIDs = selected;
          this.reComputePayItems = data;
          this.showReCompute = true;
        }, (error) => {
          this.$root.showTip({
            type: 'danger',
            msg: error,
            duration: 2000
          });
        });
      }
    },
    submitPay() {
      this.updateStatusIdx = 2;
      this.showUpdateConfirm = true;
    },
    rollbackPay() {
      this.updateStatusIdx = 3;
      this.showUpdateConfirm = true;
    },
    showSuspendConfirm() {
      if (!Array.isArray(this.state.payDistributeEmployeeSelected)) return;
      if (this.state.payDistributeEmployeeSelected.length <= 0) {
        this.$root.showTip({
          type: 'warning',
          msg: '请先在发放员工列表中选择要操作的项目！'
        });
        return;
      }
      this.showSuspendPay = true;
    },
    showRecoverConfirm() {
      if (!Array.isArray(this.state.paySuspendEmployeeSelected)) return;
      if (this.state.paySuspendEmployeeSelected.length <= 0) {
        this.$root.showTip({
          type: 'warning',
          msg: '请先在停发员工列表中选择要操作的项目！'
        });
        return;
      }
      this.showRecoverPay = true;
    },
    refreshPay(data) {
      store.actions.loadPayYearMonth();
      console.log(store.state.searchPayEmployee)
      store.state.searchPayEmployee.monthID = data.monthID;
      store.state.searchPayEmployee.payrangeID = data.suiteID;

      console.log(this.$refs)
      console.log(data.suiteID)

      this.$refs.suitelist.refresh(data.suiteID);
      this.$refs.t1.refresh();
      this.$refs.t2.refresh();
    }
  },
  ready() {
    let promiseSuiteList = new Promise((resolve, reject) => {
      store.actions.getSuiteList(() => {
        resolve();
      }, (error) => {
        this.$root.showTip({
          type: 'danger',
          msg: error,
          duration: 2000
        });
        reject(error);
      });
    });

    let promisePayYearMonth = new Promise((resolve, reject) => {
      store.actions.loadPayYearMonth((data) => {
        if (data && data.length > 0) {
          this.state.searchPayEmployee.monthID = data[data.length - 1].ID;
        }
        resolve();
      }, (error) => {
        this.$root.showTip({
          type: 'danger',
          msg: error,
          duration: 2000
        });
        reject(error);
      });
    });

    Promise.all([promiseSuiteList, promisePayYearMonth]).then((val) => {
      if (!Array.isArray(this.state.paySuiteList)) return;
      let suiteID = this.state.paySuiteList[0].ID;
      this.state.searchPayEmployee.payrangeID = suiteID;
      this.tableName = 'salaryTable_'+suiteID;
      this.$refs.t1.refresh();
      this.$refs.t2.refresh();
    });

  }
}
</script>
<style scoped>
.save {
  position: absolute;
  bottom: 8px;
  text-align: center;
  left: 10px;
  right: 10px;
}

.selector {
  height: 40px;
  width: 120px;
  box-shadow: none;
  border-radius: 3px;
  font-size: 14px;
  color: #555;
  background-color: #fff;
  border: 1px solid #ccc;
  margin-right: 10px;
}

.emp-list {
  position: absolute;
  top: 60px;
  bottom: 55px;
  left: 10px;
  right: 10px;
}
</style>
