<template>
  <ui-modal :show.sync="display" header="审批转审" type="medium" hide-footer>
    <ui-validator>
      <form class="form-horizontal container-fluid" role="form" vali-submit="submitBtn|submitedCall">
        <div class="form-group row">
          <label class="col-sm-6 control-label">选择审批人</label>
          <div class="col-sm-18">
            <input type="text" v-model="transferUserName" readonly="readonly" @click="showEmployeeSelect=true" class="form-control" placeholder="点击选择审批人">
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-6 control-label">转审原因</label>
          <div class="col-sm-18">
            <input type="text" v-model="msgTransfer" class="form-control" placeholder="请输入转审原因" vali="required" vali-msg="必填项" autocomplete="off">
          </div>
        </div>
        <div class="form-actions">
          <div class="row">
            <div class="text-center">
              <ui-button color="accent" id="submitBtn">提交</ui-button>
              <ui-button color="default" @click="close">取消</ui-button>
            </div>
          </div>
        </div>
      </form>
    </ui-validator>
    <app-select-employee v-if="showEmployeeSelect" :display.sync="showEmployeeSelect" :callback="employeeSelected"></app-select-employee>
  </ui-modal>
</template>
<script>
import store from '../store'
export default {
  data() {
      return {
        state: store.state,
        transferUserID: null,
        transferUserName: null,
        msgTransfer: null,
        showEmployeeSelect: false
      };
    },
    props: {
      display: {
        type: Boolean,
        twoWay: true,
        default: false
      },
      wkid: {
        type: Array,
        twoWay: true,
        default: () => {
          return [];
        }
      },
      cardId: {
        type: String
      }
    },
    methods: {
      employeeSelected(emp) {
        if (emp && emp.length > 0) {
          this.transferUserName = emp[0].userName + "(" + emp[0].deptName + ")";
          this.transferUserID = emp[0].ID;
        } else {
          this.transferUserID = null;
          this.transferUserName = null;
        }
      },
      close() {
        this.display = false;
        this.wkid = [];
        this.msgTransfer = null;
      }
    },
    events: {
      submitedCall() {
        if (!Array.isArray(this.wkid) || this.wkid.length <= 0) {
          this.$root.showTip({
            type: 'danger',
            msg: "未获取到审批编号，请关闭后重试！",
            duration: 2000
          });
          return;
        }
        store.actions.approvalTransfer(this.wkid, this.msgTransfer, this.transferUserID, () => {
          this.display = false;
          this.transferUserID = null;
          this.transferUserName = null;
          this.wkid = [];
          this.msgTransfer = null;
          store.actions.loadApprovalPendingList(() => {
            this.$dispatch('refreshCardSlideTitle', "全部待审批（" + this.state.approvalPendingList.length + "）", ['allcount', 'pcount']);
            this.$dispatch('refreshApprovalCard', this.cardId);
            this.$dispatch('refreshApprovalList');
            this.$parent.$parent.$broadcast('refreshApproval');
          });
        }, (error) => {
          this.$root.showTip({
            type: 'danger',
            msg: error,
            duration: 2000
          });
        });
      }
    }
};
</script>
<style lang="css" scoped>
</style>
