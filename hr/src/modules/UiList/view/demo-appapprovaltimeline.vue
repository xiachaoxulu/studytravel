<template>
  <div class="ui-panel">
    <div class="ui-panel-title">审批节点查看</div>
    <div class="ui-panel-content">
      <table class="table table-bordered">
        <thead>
          <td colspan="2">组件说明</td>
        </thead>
        <tr>
          <td>list</td>
          <td>审批节点集合数组</td>
          <td>默认空数组</td>
        </tr>
        <tr>
          <td>idProp</td>
          <td>节点员工ID属性名称</td>
          <td>默认 "ID"</td>
        </tr>
        <tr>
          <td>nameProp</td>
          <td>节点员工Name属性名称</td>
          <td>默认 "Name"</td>
        </tr>
        <tr>
          <td>photoUrl</td>
          <td>节点员工头像路径属性名称</td>
          <td>默认 "Photo"</td>
        </tr>
        <tr>
          <td>timeProp</td>
          <td>节点员工审批时间属性名称</td>
          <td>默认 "Time"</td>
        </tr>
        <tr>
          <td>approvalProp</td>
          <td>节点审批状态属性名称</td>
          <td>默认 "isApproved"</td>
        </tr>
      </table>
      <div>
        <app-approval-timeline :list="list"></app-approval-timeline>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [{
        ID: '1',
        Name: "张三",
        Photo: '/static/avatar.c8999e7.png',
        Time: "04-28",
        isApproved: true
      }, {
        ID: '1',
        Name: "李四",
        Photo: '/static/avatar.c8999e7.png',
        Time: "04-28",
        isApproved: true
      }, {
        ID: '1',
        Name: "欧阳兰兰",
        Photo: '/static/avatar.c8999e7.png',
        Time: "04-28",
        isApproved: false
      }]
    };
  }
};
</script>
<style lang="css" scoped>
</style>
