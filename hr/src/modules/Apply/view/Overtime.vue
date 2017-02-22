<template>
  <div class="ui-module">
    <header class="ui-module-navbar pos-topbar-fixed">
      <app-modulenavbar :show="showNavbar">
        <div class="pull-left">
          <!-- <ui-buttongroup active-class="btn-primary"> -->
          <!-- <button type="button" class="btn btn-primary">列表视图</button> -->
          <!-- <button type="button" class="btn btn-default">日历视图</button> -->
          <!-- </ui-buttongroup> -->
        </div>
        <div class="pull-right">
          <button type="button" class="ui-tool-button" __code="apply-overtime-apply/加班申请" @click="showApply = true">
            <span class="icon icon-tool pull-left"><img src="../../../assets/images/jbsq.png" alt=""></span>
            <span class="_name pull-left">加班申请</span>
          </button>
          <button type="button" class="ui-tool-button" __code="apply-overtime-submit/提交" @click="overtimeSubmitClicked">
            <span class="icon icon-tool icon-tool-save pull-left"></span>
            <span class="_name pull-left">提交</span>
          </button>
        </div>
      </app-modulenavbar>
    </header>
    <components :is="viewType" v-if="viewType"></components>
    <overtime-apply :display.sync="showApply" v-if="showApply"></overtime-apply>
  </div>
</template>
<script>
import store from '../store'
import overtimeApply from './OvertimeApply'
import overtimeList from './OvertimeList'
export default {
  data() {
      return {
        state: store.state,
        showNavbar: false,
        viewType: 'overtimeList',
        showApply: false
      };
    },
    methods: {
      overtimeSubmitClicked() {
        if (!this.state.overtimeSelected || this.state.overtimeSelected.length <= 0) {
          this.$root.showTip({
            type: 'danger',
            msg: '请先在列表中选择要提交的加班申请！',
            duration: 2000
          });
          return;
        }
        store.actions.submitToWorkflow('actovertime', this.state.overtimeSelected[0], () => {
          this.$root.showTip({
            type: 'info',
            msg: "加班提交成功！",
            duration: 2000
          });
          this.$broadcast('refreshOvertimeList');
        }, (error) => {
          this.$root.showTip({
            type: 'danger',
            msg: error,
            duration: 2000
          });
        });
      }
    },
    attached() {
      setTimeout(() => {
        this.showNavbar = true;
      }, 500);
    },
    components: {
      overtimeApply,
      overtimeList
    }
};
</script>
<style lang="css" scoped>
</style>
