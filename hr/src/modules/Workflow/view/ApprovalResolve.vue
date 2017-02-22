<template>
  <ui-modal :show.sync="display" header="审批同意" type="medium" hide-footer>
    <ui-validator>
      <form class="form-horizontal container-fluid" role="form" vali-submit="submitBtn|submitedCall">
        <div class="form-group row">
          <label class="col-sm-6 control-label">同意意见</label>
          <div class="col-sm-18">
            <input type="text" v-model="msgResolve" class="form-control" placeholder="请输入同意意见" autocomplete="off">
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
  </ui-modal>
</template>
<script>
import store from '../store'
export default {
  data() {
      return {
        state: store.state,
        msgResolve: null
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
      close() {
        this.display = false;
        this.wkid = [];
        this.msgResolve = null;
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
        store.actions.approvalResolve(this.wkid, this.msgResolve, () => {
          this.display = false;
          this.wkid = [];
          this.msgResolve = null;
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
