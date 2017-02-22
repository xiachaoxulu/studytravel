<template>
  <ui-modal :show.sync="display" header="停发" type="medium" hide-footer>
    <ui-validator>
      <form class="form-horizontal container-fluid" role="form" vali-submit="submitBtn|submitedCall">
        <div class="row">
          <div class="form-group row">
            <label class="col-sm-8 control-label">停发原因：</label>
            <div class="col-sm-16">
              <select class="form-control" v-model="reason" vali="required" vali-msg="必选项">
                <option v-for="reason in paySuspendReasonList" :value="reason.code">{{reason.codeName}}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="form-actions">
          <div class="row">
            <div class="text-center">
              <ui-button id="submitBtn" color="accent">确定</ui-button>
            </div>
          </div>
        </div>
      </form>
    </ui-validator>
    <ui-confirm type="danger" confirm-button-text="确认" deny-button-text="取消" @confirmed="showSuspendPay=true" :show.sync="showSuspendPay" close-on-confirm header="提示">
      确认要对选择的员工进行停发操作吗？
    </ui-confirm>
  </ui-modal>
</template>
<script>
import store from '../store'
export default {
  data() {
      return {
        state: store.state,
        reason: null,
        paySuspendReasonList: [],
        showSuspendPay: false
      };
    },
    props: {
      display: {
        twoWay: true,
        type: Boolean,
        default: false
      }
    },
    events: {
      submitedCall() {
        var IDs = this.state.payDistributeEmployeeSelected.map((item) => {
          return item;
        });
        store.actions.editEmployeePayStatus(1, IDs, this.reason, () => {
          this.$root.showTip({
            type: 'info',
            msg: '停发操作成功！'
          });
          this.$parent.$refs.t1.refresh();
          this.$parent.$refs.t2.refresh();
          this.display = false;
          this.reason = null;
        }, (error) => {
          this.$root.showTip({
            type: 'error',
            msg: error
          });
        });
      }
    },
    ready() {
      store.actions.findSystemConfig(this.state.paySuspendReasonCode, (data) => {
        this.paySuspendReasonList = data;
      }, (error) => {
        this.$root.showTip({
          type: 'danger',
          msg: error,
          duration: 2000
        });
      });
    }
};
</script>
<style lang="css" scoped>
</style>
