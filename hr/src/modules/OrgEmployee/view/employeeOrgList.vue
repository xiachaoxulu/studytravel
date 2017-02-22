<template>
  <div class="emp-box">
    <div>
      <div class="emp-count">
        <span class="count" v-bind:class="{ 'clicked': !state.chosenEmployeeIsAll  }" @click="showAllEmployee(false)">{{state.employeeByOrgCount}}</span>
        <span>/</span>
        <span class="count" v-bind:class="{ 'clicked': state.chosenEmployeeIsAll }" @click="showAllEmployee(true)">{{state.employeeCountCacade}}</span>
        <span class="title">名（所有员工）</span>
        <button type="button" class="btn btn-default rosterbtn" @click="roster" __code="org-roster/花名册">花名册</button>
      </div>
      <div class="cat-type">
        <!-- <ui-buttongroup active-class="btn-primary"> -->
        <!--<button type="button" class="{{postOrAlphabetOrder?'btn btn-default':'btn btn-primary'}}" @click="postOrAlphabetOrder=false;">岗位</button>-->
        <button type="button" class="{{postOrAlphabetOrder?'btn btn-primary':'btn btn-default'}}" @click="postOrAlphabetOrder=true">A-Z</button>
        <!-- </ui-buttongroup> -->
      </div>
      <div style="clear: both;"></div>
    </div>
    <ul v-show="postOrAlphabetOrder" class="az-tool-bar">
      <li v-for="(key, value) in state.employeeByOrgList">
        <a class="alphabet" href="javascript:void(0)" @click="scrollEmpList(key)">{{key}}</a>
      </li>
    </ul>
    <div class="emp-list" v-el:list>
      <!-- <ui-scrollview> -->
      <div v-show="!postOrAlphabetOrder">
        <!--<div class="emp-grp">
            <div class="emp-grp-title">
              <div>管理组</div>
              <div></div>
            </div>
            <div class="emp-grp-item">
              <a href="javascript:void(0)" @click="empClicked()">
                <ui-avatar username="张三的" :size="48" style="float: left" background-color="#03A9F4"></ui-avatar>
                <div class="emp-text">
                  <span>袁琳</span>
                  <span>|</span>
                  <span>店经理</span>
                </div>
              </a>
            </div>
            <div class="emp-grp-item">
              <a href="javascript:void(0)" @click="empClicked()">
                <div class="emp-avatar">
                  <img src="../../../assets/images/avatar.jpg">
                </div>
                <div class="emp-text">
                  <span>袁琳</span>
                  <span>|</span>
                  <span>店经理</span>
                </div>
              </a>
            </div>
            <div class="emp-grp-item">
              <a href="javascript:void(0)" @click="empClicked()">
                <div class="emp-avatar">
                  <img src="../../../assets/images/avatar.jpg">
                </div>
                <div class="emp-text">
                  <span>袁琳</span>
                  <span>|</span>
                  <span>店经理</span>
                </div>
              </a>
            </div>
          </div>
          <div class="emp-grp">
            <div class="emp-grp-title">
              <div>资深服务员</div>
              <div></div>
            </div>
            <div class="emp-grp-item">
              <a href="javascript:void(0)" @click="empClicked()">
                <div class="emp-avatar">
                  <img src="../../../assets/images/avatar.jpg">
                </div>
                <div class="emp-text">
                  <span>陈美玲</span>
                </div>
              </a>
            </div>
            <div class="emp-grp-item">
              <a href="javascript:void(0)" @click="empClicked()">
                <div class="emp-avatar">
                  <img src="../../../assets/images/avatar.jpg">
                </div>
                <div class="emp-text">
                  <span>陈美玲</span>
                </div>
              </a>
            </div>
          </div>-->
      </div>
      <template v-if="postOrAlphabetOrder">
        <div v-for="(key, value) in state.employeeByOrgList" class="emp-grp">
          <div class="emp-grp-title">
            <div><a class="alphabet" href="javascript:void(0)" name="{{'emp'+key}}">{{key}}</a></div>
            <div>
            </div>
          </div>
          <div v-for="emp in value" class="emp-grp-item">
            <a href="javascript:void(0)" @click="empClicked(emp.ID)">
              <div v-if="emp.photourl" class="emp-avatar">
                <img :src="'/acewill/employee/getHeadImag.htm?userId='+emp.ID" height="48" width="48">
              </div>
              <ui-avatar v-else :username="emp.userName" :size="48" style="float: left" background-color="#03A9F4"></ui-avatar>
              <div class="emp-text">
                <span>{{emp.userName}}</span>
              </div>
            </a>
          </div>
        </div>
      </template>
      <!-- </ui-scrollview> -->
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
        // postOrAlphabetOrder: false
        postOrAlphabetOrder: true
      };
    },
    props: {
      employeeclicked: {
        type: Function
      }
    },
    methods: {
      empClicked(data) {
        if (this.employeeclicked) this.employeeclicked(data);
      },
      roster() {
        this.bigwhat = "roster";
        this.bigdymicshow = true;
      },
      scrollEmpList(alphabet) {
        var divAlphabet = this.$els.list.querySelector('.emp-grp a[name=emp' + alphabet + ']').parentElement.parentElement.parentElement;
        var divContainer = divAlphabet.parentElement;
        divContainer.scrollTop = divAlphabet.offsetTop;
      },
      showAllEmployee(isAll) {
        store.actions.loadEmployeeByTreeNodeList(isAll);
      }
    },
    components: {
      roster
    },
    events: {
      routerChange() {
        if (this.$route.params && this.$route.params.action == "action_roster") {
          this.roster();
        }
      }
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

.emp-box > div:nth-child(1) {
  position: absolute;
  top: 10px;
  width: 100%;
}

.emp-list {
  position: absolute;
  top: 65px;
  bottom: 0;
  width: 100%;
  padding: 20px;
  overflow-y: auto;
}

.emp-count {
  float: left;
  height: 55px;
  line-height: 40px;
}

.rosterbtn {
  vertical-align: middle;
}

.emp-count .title {
  font-size: 14px;
}

.emp-count .clicked {
  color: #fd6d5a !important;
}

.emp-count span {
  font-size: 40px;
  color: #4b4753;
}

.emp-count .count:hover {
  cursor: pointer;
  color: #fd6d5a;
}

.cat-type {
  float: right;
  height: 55px;
  line-height: 55px;
  vertical-align: middle;
}

.alphabet {
  color: #737373;
}

.alphabet:hover {
  color: #737373;
  text-decoration: none;
}

.alphabet:focus {
  text-decoration: none;
}

.emp-grp-title {
  height: 40px;
  min-width: 285px;
  width: 40%;
  line-height: 40px;
}

.emp-grp-title div:nth-child(1) {
  float: left;
  position: relative;
  font-size: 12px;
  color: #737373;
  height: 40px;
  line-height: 40px;
  padding-left: 10px;
  padding-right: 11px;
  background-color: #fff;
}

.emp-grp-title div:nth-child(2) {
  width: 100%;
  height: 21px;
  border-bottom: 1px dashed #737373;
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
  height: 48px;
  line-height: 48px;
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

.emp-text span:nth-child(3) {
  font-size: 14px;
  color: #939393;
}

.az-tool-bar {
  color: #4b4753;
  position: absolute;
  top: 250px;
  right: 15px;
  z-index: 1;
}

.az-tool-bar li {
  width: 30px;
  text-align: center;
  cursor: pointer;
}

.az-tool-bar li:hover {
  font-weight: bold;
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
}

::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
}
</style>
