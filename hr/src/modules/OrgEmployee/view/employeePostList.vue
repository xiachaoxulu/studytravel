<template>
  <div class="emp-box">
    <div class="emp-count">
      <span>{{state.employeeByPostList.length}}</span>
      <span>名（所有员工）</span>
      <button type="button" class="btn btn-default rosterbtn" @click="roster" __code="org-roster/花名册">花名册</button>
    </div>
    <div class="emp-list">
      <ui-scrollview>
        <div class="emp-grp">
          <div v-for="emp in state.employeeByPostList" class="emp-grp-item">
            <a href="javascript:void(0)" @click="empClicked(emp.ID)">
              <div v-if="emp.photourl" class="emp-avatar">
                <img :src="'/acewill/employee/getHeadImag.htm?userId='+emp.ID" height="48" width="48">
              </div>
              <ui-avatar v-else :username="emp.userName" :size="48" style="float: left" background-color="#03A9F4"></ui-avatar>
              <div class="emp-text">
                <span>{{emp.userName}}</span>
                <br/>
                <span>{{emp.storeName?emp.storeName:emp.deptName}}</span>
              </div>
            </a>
          </div>
        </div>
        <!--<div class="emp-history">
          <a href="javascript:void(0)">历任店经理></a>-->
    </div>
    </ui-scrollview>
  </div>
  </div>
  <ui-sidecontent :show.sync="bigdymicshow">
    <components :is="bigwhat">
    </components>
  </ui-sidecontent>
</template>
<script>
import store from '../store'
import Vue from 'vue'
import roster from './roster'


export default {
  data() {
      return {
        state: store.state,
        basePath: '',
        bigdymicshow: false,
        bigwhat: '',
      };
    },
    props: {
      employeeclicked: {
        type: Function
      }
    },
    methods: {
      roster() {
        this.bigwhat = "roster";
        this.bigdymicshow = true;
      },
      empClicked(data) {
        if (this.employeeclicked) this.employeeclicked(data);
      }
    },
    components:{
      roster
    }
};
</script>
<style lang="css" scoped>
.emp-box {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 10px;
  right: 10px;
}

/*.emp-count {
  position: absolute;
  top: 10px;
  width: 100%;
}*/
.emp-count {
  float: left;
  height: 55px;
  line-height: 40px;
}

.rosterbtn {
  vertical-align: middle;
}

.emp-count span:nth-child(1) {
  font-size: 40px;
  color: #4b4753;
}

.emp-count span:nth-child(2) {
  font-style: 14px;
}
.emp-list {
  position: absolute;
  top: 65px;
  bottom: 0;
  width: 100%;
}

.emp-grp-item {
  height: 64px;
}

.emp-avatar {
  float: left;
}

.emp-avatar img {
  border-radius: 50%
}

.emp-text {
  height: 48px;
  float: left;
}

.emp-text span {
  display: inline-block;
  height: 24px;
  line-height: 24px;
  vertical-align: middle;
  padding-left: 20px;
}

.emp-text span:nth-child(1) {
  font-size: 16px;
  font-weight: 700;
  color: #3f3f3f;
}

.emp-text span:nth-child(2) {
  font-size: 14px;
  color: #737373;
}

.emp-history {
  padding-left: 30px;
}
</style>
