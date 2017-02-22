<!--
* @Created Date       : 2016-11-07T10:07:24+08:00
* @Last Modified time : 2016-12-02T16:42:29+08:00
 -->


<template>
  <div class="app-card">
    <div class="ui-panel">
      <header class="ui-panel-header">
        <h2 class="ui-panel-title">待审批 <i class="icon-tool icon-tool-expandmore"></i></h2>
      </header>
      <section class="ui-panel-content">
        <div class="ui n3 statistics">
          <div class="statistic grey">
            <div class="value">
              <span class="_link">{{state.approvalPendingCount.pendingRecentCount}}/{{approvalPendingCount.pendingSumCount}}</span>
            </div>
            <div class="label">
              待审批
            </div>
          </div>
        </div>
      </section>
    </div>
</template>
<script>
import store from '../store'
export default {
  data() {
      return {
        state: store.state
      };
    },
    ready() {
      store.actions.loadApprovalPendingCount(null, (error) => {
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
