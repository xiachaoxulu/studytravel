<template>
  <div class="pull-right">
    <!-- <button class="ui-tool-button" @click="">
      <span class="icon icon-tool icon-tool-rollback pull-left"></span>
      <span class="_name pull-left">撤回</span>
    </button> -->
    <button class="ui-tool-button" __code="workflow-approval-resolved-export/导出" @click="$parent.$parent.$broadcast('exportApprovalResolved')">
      <span class="icon icon-tool icon-tool-export pull-left"></span>
      <span class="_name pull-left">导出</span>
    </button>
  </div>
</template>
<script>
export default {
  data() {
    return {

    };
  }
}
</script>
<style lang="css" scoped>
</style>
