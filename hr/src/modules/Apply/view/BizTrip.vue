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
          <button type="button" class="ui-tool-button" __code="apply-trip-apply/出差申请" @click="showApply = true">
            <span class="icon icon-tool pull-left"><img src="../../../assets/images/ccsq.png" alt=""></span>
            <span class="_name pull-left">出差/外出申请</span>
          </button>
          <!-- <button type="button" class="ui-tool-button" ="apply-trip-back/出差返回" @click="bizTripBackClicked">
            <span class="icon icon-tool pull-left"><img src="../../../assets/images/ccfh.png" alt=""></span>
            <span class="_name pull-left">出差返回</span>
          </button> -->
          <button type="button" class="ui-tool-button" __code="apply-trip-submit/提交" @click="bizTripSubmitClicked">
            <span class="icon icon-tool icon-tool-save pull-left"></span>
            <span class="_name pull-left">提交</span>
          </button>
        </div>
      </app-modulenavbar>
    </header>
    <components :is="viewType" v-if="viewType"></components>
    <biz-trip-apply :display.sync="showApply" v-if="showApply"></biz-trip-apply>
    <biz-trip-back :display.sync="showBack" v-if="showBack" :id.sync="applyBackID"></biz-trip-back>
  </div>
</template>
<script>
import store from '../store'
import bizTripApply from './BizTripApply'
import bizTripBack from './BizTripBack'
import bizTripList from './BizTripList'
export default {
  data() {
      return {
        state: store.state,
        showNavbar: false,
        viewType: 'bizTripList',
        showApply: false,
        showBack: false,
        applyBackID: null
      };
    },
    methods: {
      bizTripBackClicked() {
        if (!this.state.bizTripSelected || this.state.bizTripSelected.length <= 0) {
          this.$root.showTip({
            type: 'danger',
            msg: '请先在列表中选择要出差返回的出差申请！',
            duration: 2000
          });
          return;
        }
        store.actions.loadBizTripApplyByID(this.state.bizTripSelected[0], (data) => {
          if (data) {
            if (data.realBackTime) {
              this.$root.showTip({
                type: 'danger',
                msg: '该出差申请的返回状态已通过！',
                duration: 2000
              });
              return;
            }
            this.applyBackID = this.state.bizTripSelected[0];
            this.showBack = true;
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
      bizTripSubmitClicked() {
        if (!this.state.bizTripSelected || this.state.bizTripSelected.length <= 0) {
          this.$root.showTip({
            type: 'danger',
            msg: '请先在列表中选择要提交的出差申请！',
            duration: 2000
          });
          return;
        }
        store.actions.submitToWorkflow('actbustrip', this.state.bizTripSelected[0], () => {
          this.$root.showTip({
            type: 'info',
            msg: "出差提交成功！",
            duration: 2000
          });
          this.$broadcast('refreshBizTripList');
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
      bizTripApply,
      bizTripBack,
      bizTripList
    }
};
</script>
<style lang="css" scoped>
</style>
