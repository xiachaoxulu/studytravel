<template>
  <div class="ui-module module-workflow">
    <header class="ui-module-navbar pos-topbar-fixed">
      <app-modulenavbar :show="true">
        <div class="pull-left emp-center-tab">
          <strong class="_headerTitle">审批</strong>
          <ui-search class="ui-search" placeholder="输入员工姓名" :value.sync="state.searchParams.userName" :search-callback="cbSearchApproval"></ui-search>
          <button type="button" class="ui-tool-button approval-filter" @click="$broadcast('showConditions')">
            <span class="icon icon-tool icon-tool-filter pull-left" style="height:20px;"></span>
            <span class="_name pull-left" style="position: relative; top: -4px; left: -5px">筛选</span>
          </button>
          <ui-buttongroup active-class="btn-primary">
            <button type="button" class="btn btn-primary" v-link="{path: '/Workflow/Pending', activeClass: 'btn-primary', replace: true}" @click="changeTab(0)">待审批</button>
            <button type="button" class="btn btn-default" v-link="{path: '/Workflow/Resolved', activeClass: 'btn-primary', replace: true}" @click="changeTab(1)">已审批</button>
            <button type="button" class="btn btn-default" v-link="{path: '/Workflow/My', activeClass: 'btn-primary', replace: true}" @click="changeTab(2)">我的</button>
          </ui-buttongroup>
        </div>
        <components :is="menuID"></components>
      </app-modulenavbar>
    </header>
    <section class="ui-module-content ui-panel">
      <router-view class="view" transition="main" transition-mode="out-in" keep-alive></router-view>
    </section>
  </div>
</template>
<script>
import store from '../store'

import menuApprovalPending from './MenuApprovalPending'
import menuApprovalResolved from './MenuApprovalResolved'
import menuApprovalMy from './MenuApprovalMy'
export default {
  data() {
      return {
        state: store.state,
        menuID: 'menuApprovalPending',
        mapTab: ['menuApprovalPending', 'menuApprovalResolved', 'menuApprovalMy']
      };
    },
    components: {
      menuApprovalPending,
      menuApprovalResolved,
      menuApprovalMy
    },
    methods: {
      changeTab(idx) {
        store.mutations.SetApprovalTabIdx(idx);
        this.menuID = this.mapTab[idx];
      },
      cbSearchApproval(kw) {
        this.state.searchParams.userName = kw;
        this.$broadcast('refreshApproval');
      }
    }
};
</script>
<style lang="css" scoped>
.approval-filter {
  height: 30px;
  position: relative;
  top: 5px;
  margin-left: 0;
  margin-right: 10px;
}
</style>
<style lang="scss">
.module-workflow {
  ._headerTitle {
    font-size: 16px;
    padding-right: 20px;
    padding-left: 5px;
  }
  .back-btn {
    float: left;
  }
  .emp-center-tab {
    position: absolute;
    margin-left: -5px;
  }
  .com-col-m1-left {
    width: 200px !important;
  }
  .com-col-m1-middle {
    right: 0 !important;
  }
  .com-menuList {
    overflow: hidden;
    position: relative;
    height: 100%;
  }
  .com-menuList ul li {
    height: 30px;
    line-height: 30px;
    padding-left: 20px;
    margin-top: 2px;
    cursor: pointer;
  }
  .com-menuList ul li i {
    float: right;
    margin-top: 4px;
    color: #fff;
  }
  .com-menuList ul li a {
    color: #000000;
    display: inline-block;
    outline: none;
    text-decoration: none;
  }
  .com-menuList ul li:hover {
    background: #a9adb9;
  }
  .com-menuList ul li.active {
    background: #a9adb9;
  }
  .com-menuList ul li.active {
    color: #fff;
  }
  .com-menuList ul li:hover {
    color: #fff;
  }
  .com-menuList ._title {
    padding-left: 0px;
    font-size: 16px;
    font-weight: 700;
    color: #333;
    margin-bottom: 10px;
  }
}
</style>
