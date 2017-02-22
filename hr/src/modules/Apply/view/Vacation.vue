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
          <button type="button" class="ui-tool-button" __code="apply-leave-apply/请假申请" @click="showApply = true">
            <span class="icon icon-tool pull-left"><img src="../../../assets/images/qjsq.png" alt=""></span>
            <span class="_name pull-left">请假申请</span>
          </button>
          <!-- <button type="button" class="ui-tool-button" ="apply-leave-back/销假申请" @click="vacationBackClicked">
            <span class="icon icon-tool pull-left"><img src="../../../assets/images/xjsq.png" alt=""></span>
            <span class="_name pull-left">销假申请</span>
          </button> -->
          <button type="button" class="ui-tool-button" __code="apply-leave-submit/提交" @click="vacationSubmitClicked">
            <span class="icon icon-tool icon-tool-save pull-left"></span>
            <span class="_name pull-left">提交</span>
          </button>
        </div>
      </app-modulenavbar>
    </header>
    <components :is="viewType" v-if="viewType"></components>
    <vacation-usage-apply :display.sync="showUsage" v-if="showUsage" :id.sync="applyBackID"></vacation-usage-apply>
    <vacation-apply :display.sync="showApply" v-if="showApply"></vacation-apply>
  </div>
</template>
<script>
import store from '../store'
import vacationUsageApply from './VacationUsageApply'
import vacationApply from './vacationApply'
import vacationList from './vacationList'
export default {
  data() {
      return {
        state: store.state,
        showNavbar: false,
        viewType: 'vacationList',
        showApply: false,
        showUsage: false,
        applyBackID: null
      };
    },
    methods: {
      vacationBackClicked() {
        if (!this.state.vacationSelected || this.state.vacationSelected.length <= 0) {
          this.$root.showTip({
            type: 'danger',
            msg: '请先在列表中选择要销假的请假申请！',
            duration: 2000
          });
          return;
        }
        store.actions.loadVacationApplyByID(this.state.vacationSelected[0], (data) => {
          if (data) {
            if (data.realBackTime) {
              this.$root.showTip({
                type: 'danger',
                msg: '该请假申请的销假状态已通过！',
                duration: 2000
              });
              return;
            }
            this.applyBackID = this.state.vacationSelected[0];
            this.showUsage = true;
          } else {
            this.$root.showTip({
              type: 'danger',
              msg: '找不到该条数据，请刷新列表后重试！',
              duration: 2000
            });
          }
        }, (error) => {
          this.$root.showTip({
            type: 'danger',
            msg: error,
            duration: 2000
          });
        });
      },
      vacationSubmitClicked() {
        if (!this.state.vacationSelected || this.state.vacationSelected.length <= 0) {
          this.$root.showTip({
            type: 'danger',
            msg: '请先在列表中选择要提交的请假申请！',
            duration: 2000
          });
          return;
        }
        store.actions.submitToWorkflow('actleave', this.state.vacationSelected[0], () => {
          this.$root.showTip({
            type: 'info',
            msg: "请假提交成功！",
            duration: 2000
          });
          this.$broadcast('refreshVacationList');
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
      vacationUsageApply,
      vacationApply,
      vacationList
    }
};
</script>
<style lang="css" scoped>
</style>
