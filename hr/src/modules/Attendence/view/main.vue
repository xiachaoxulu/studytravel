<template>
  <!-- 模块 vue -->
  <div class="ui-module app-attendence">
    <!-- 模块功能条 -->
    <header class="ui-module-navbar pos-topbar-fixed">
      <app-modulenavbar :show="showNavbar">
        <div>
          <div>
            <div class="input-group search">
              <input v-model="searchFor.userName" class="form-control">
              <span class="input-group-btn">
                    <button @click="refreshTable" class="btn btn-primary" code="attendence-main-search/考勤查询/disabled">搜索</button>
                </span>
            </div>
            <button type="button" class="ui-tool-button" code="attendence-main-choose/考勤筛选/disabled" @click="choose">
              <span class="icon icon-tool icon-tool-filter pull-left"></span>
              <span class="_name pull-left">筛选</span>
            </button>
            <ui-buttongroup active-class="btn-primary" class="app-schedule-tabs  buttongrounp exchange">
              <button type="button" class="btn btn-primary" v-link="{path:'/Attendence/dailyWorktime',  activeClass:'btn-primary', replace:true }">日考勤</button>
              <button type="button" class="btn btn-default" v-link="{path:'/Attendence/monthlyWorktime', activeClass:'btn-primary', replace:true }">月考勤</button>
            </ui-buttongroup>
          </div>
        </div>
      </app-modulenavbar>
    </header>
    <router-view transition="main" transition-mode="out-in"></router-view>
    <app-employee-choose :display.sync="chooseShow" :choose-call-back="chooseCallBack"></app-employee-choose>
  </div>
</template>
<script>
import store from '../store'
import dailyWorktime from './dailyWorktime'
import monthlyWorktime from './monthlyWorktime'

export default {
  methods: {

    //筛选人员
    choose() {
      this.chooseShow = true;
    },
    /**
     * 查询人员
     * [refreshTable description]
     * @return {[type]} [description]
     */
    refreshTable() {
      store.actions.Setsearchparam(this.searchFor);
    },
    chooseCallBack(data) {
      Object.assign(this.searchFor, data);
      store.actions.Setsearchparam(this.searchFor);
    }
  },
  components: {
    dailyWorktime,
    monthlyWorktime
  },
  events: {

  },
  data() {
    return {
      searchFor: {
        userName: ''
      },
      showEditHistory: false,
      showNavbar: false,
      showSideContent: false,
      chooseShow: false,
    }
  },
  attached() {
    var _this = this;
    setTimeout(function() {
      _this.showNavbar = true;
    }, 500)
  },
  detached() {
    this.showNavbar = false;
  }
}
</script>
<style scoped>
.search {
  float: left;
  width: 300px;
}
.exchange{
  margin-left: 30px;
  height: 50px;
  line-height: 50px;
}
</style>
