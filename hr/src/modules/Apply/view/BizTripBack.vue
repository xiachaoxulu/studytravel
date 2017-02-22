<template>
  <ui-modal :show.sync="display" header="出差返回" type="medium" hide-footer>
    <ui-validator>
      <form class="form-horizontal container-fluid" role="form" vali-submit="submitBtn|submitedCall">
        <div class="row form-group">
          <div class="col-sm-24">
            <label class="col-sm-8 control-label">返回时间：</label>
            <div class="col-sm-16">
              <ui-datepicker :HHMM="true" :time.sync="realBackTime" width="70"></ui-datepicker>
            </div>
          </div>
        </div>
        <div class="form-actions">
          <div class="row">
            <div class="text-center">
              <ui-button id="submitBtn" color="accent">保存</ui-button>
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
        realBackTime: null
      };
    },
    props: {
      display: {
        twoWay: true,
        type: Boolean,
        default: false
      },
      id: {
        twoWay: true,
        type: String
      }
    },
    methods: {
      close() {
        this.display = false;
      }
    },
    events: {
      submitedCall() {
        if (!this.id) {
          this.$root.showTip({
            type: 'danger',
            msg: '请关闭后重新选择返回操作！',
            duration: 2000
          });
          return;
        }
        store.actions.editBizTripApply({
          ID: this.id,
          realBackTime: this.realBackTime
        }, () => {
          this.$root.showTip({
            type: 'info',
            msg: '出差返回操作成功！',
            duration: 2000
          });
          var children = this.$parent.$children;
          for (var i = 0; i < children.length; i++) {
            if (children[i].$refs.table) {
              children[i].$refs.table.refresh();
              break;
            }
          }
          this.display = false;
          this.id = null;
          this.realBackTime = null;
        }, (error) => {
          this.$root.showTip({
            type: 'danger',
            msg: error,
            duration: 2000
          });
        });
      }
    }
}
</script>
<style lang="css" scoped>
</style>
