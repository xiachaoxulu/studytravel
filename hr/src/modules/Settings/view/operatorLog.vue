<template>
  <div class="warp">
    <ui-grid v-ref:table :url="url" class="testtable" selectable="multi" :fields="fields" :perpage="50" :pages="[50]" :btrefresh="true" checked="multi" height="auto" tdheight="50px"></ui-grid>
  </div>
</template>
<script>
import Vue from 'vue'
const Tool = Vue.tool;

export default {
  data() {
    return {
      url: 'api.Settings.getSystemLog',
      fields: [{
          name: 'IP',
          title: 'IP',
          width: 200,
          locked: 'first'
        },{
          name: 'loginName',
          title: '登录人',
          width: 150
        },
        {
          name: 'userName',
          title: '用户姓名',
          width: 150
        },
        {
          name: 'createTime',
          title: '访问日期',
           formater: function(value, data, index) {
            return Tool.iDate(value, 'yy-mm-dd hh:mm:ss').string;
          },
          width: 200
        },
        {
          name: 'operatDes',
          title: '描述',
          width: 200
        }]
    };
  }
};
</script>
<style lang="css" scoped>
.warp {
  height: 100%;
  width: 100%;
  position: relative;
}
</style>
