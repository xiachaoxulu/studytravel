<template>
  <div class="pull-right">
    <button class="ui-tool-button" __code="workflow-approval-pending-approve/同意" @click="$parent.$parent.$broadcast('resolveApproval')">
      <span class="icon icon-tool icon-tool-approve pull-left"></span>
      <span class="_name pull-left">同意</span>
    </button>
    <button class="ui-tool-button" __code="workflow-approval-pending-reject/驳回" @click="$parent.$parent.$broadcast('rollbackApproval')">
      <span class="icon icon-tool icon-tool-reject pull-left"></span>
      <span class="_name pull-left">驳回</span>
    </button>
    <!-- <button class="ui-tool-button" @click="$parent.$parent.$broadcast('transferApproval')">
      <span class="icon icon-tool icon-tool-transfer pull-left"></span>
      <span class="_name pull-left">转审</span>
    </button> -->
    <!-- <v-dropdown class="ui-tool-dropdown" trigger="click">
      <button type="button" data-toggle="dropdown" class="ui-tool-button">
        <span class="icon icon-tool icon-tool-more pull-left"></span>
        <span class="_name pull-left">更多</span>
      </button>
      <ul class="dropdown-menu">
        <li>
          <a href="javascript:void(0)" name="dropdown-item">导出</a>
        </li>
        <li>
          <a href="javascript:void(0)" name="dropdown-item">打印</a>
        </li>
        <li>
          <a href="javascript:void(0)" name="dropdown-item">查看报表</a>
        </li>
      </ul>
    </v-dropdown> -->
  </div>
</template>
<script>
export default {
  data() {
    return {

    };
  }
};
</script>
<style lang="css" scoped>
</style>
