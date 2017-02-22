<!--
* @Created Date       : 2016-08-28T15:36:04+08:00
* @Last Modified time : 2016-12-22T11:17:09+08:00
 -->


<template>
  <div class="ui-module">
    <header class="ui-module-navbar pos-topbar-fixed">
      <app-modulenavbar :show="showNavbar">
        <div class="pull-left">
          <!-- <input type="text" class="emp-search-input" placeholder="搜索员工" /> -->
          <ui-search :value.sync="empKey" :search-callback="searchEmp"></ui-search>
        </div>
        <div class="pull-left emp-center-tab">
          <ui-buttongroup active-class="btn-primary">
            <button type="button" class="btn btn-primary" @click="change" v-link="{ path: '/OrgEmployee/ByOrg', activeClass:'btn-primary', replace: true}">按组织</button>
            <button type="button" class="btn btn-default" @click="change" v-link="{ path: '/OrgEmployee/ByPost', activeClass:'btn-primary', replace: true}">按岗位</button>
          </ui-buttongroup>
        </div>
        <div class="pull-right">
          <v-dropdown class="ui-tool-dropdown" trigger="click">
            <button type="button" data-toggle="dropdown" class="ui-tool-button">
              <span class="icon icon-tool icon-tool-addUser pull-left"></span>
              <span class="_name pull-left">添加</span>
            </button>
            <ul class="dropdown-menu">
              <!-- __code="org-addEmployee/员工入职"   -->
              <li __code="org-addEmployee/添加员工按钮">
                <a name="dropdown-item" href="javascript:void(0)" @click="adde">添加员工</a>
              </li>
              <li __code="org-store-add/添加门店按钮">
                <a name="dropdown-item" href="javascript:void(0)" @click="adds">添加门店</a>
              </li>
              <li __code="org-orgTree-dept-add/添加部门">
                <a name="dropdown-item" href="javascript:void(0)" @click="addo">添加部门</a>
              </li>
              <li __code="org-brand-add/添加品牌按钮">
                <a name="dropdown-item" href="javascript:void(0)" @click="addBrand">添加品牌</a>
              </li>
            </ul>
          </v-dropdown>
          <v-dropdown class="ui-tool-dropdown" trigger="click">
            <button type="button" data-toggle="dropdown" class="ui-tool-button">
              <span class="icon icon-tool icon-tool-edit pull-left"></span>
              <span class="_name pull-left">修改</span>
            </button>
            <ul class="dropdown-menu">
              <li __code="org-orgTree/修改组织树按钮">
                <a name="dropdown-item" href="javascript:void(0)" @click="org">修改组织树</a>
              </li>
              <li __code="org-postTree/修改岗位树">
                <a name="dropdown-item" href="javascript:void(0)" @click="post">修改岗位树</a>
              </li>
            </ul>
          </v-dropdown>
          <!-- 去除筛选按钮 -->
          <!--           <button type="button " class="ui-tool-button">
            <span class="icon icon-tool icon-tool-filter pull-left"></span>
            <span class="_name pull-left">筛选</span>
          </button> -->

          <v-dropdown class="ui-tool-dropdown" trigger="click">
            <button type="button" data-toggle="dropdown" class="ui-tool-button">
              <span class="icon icon-tool icon-tool-work pull-left"></span>
              <span class="_name pull-left">导入</span>
            </button>
            <ul class="dropdown-menu">
              <li __code="org-import-importOrg/导入组织按钮">
                <a name="dropdown-item" href="javascript:void(0)" @click="importOrg">导入组织</a>
              </li>
              <li __code="org-import-importStore/导入门店按钮">
                <a name="dropdown-item" href="javascript:void(0)" @click="importStore">导入门店</a>
              </li>
              <li __code="org-import-importStoreTeam/导入门店小组">
                <a name="dropdown-item" href="javascript:void(0)" @click="importStoreTeam">导入门店小组</a>
              </li>
              <li __code="org-import-importPosition/导入职位按钮">
                <a name="dropdown-item" href="javascript:void(0)" @click="importPosition">导入职位</a>
              </li>
              <li __code="org-import-importRank/导入职级按钮">
                <a name="dropdown-item" href="javascript:void(0)" @click="importRank">导入职级</a>
              </li>
              <li __code="org-import-importPostType/导入岗位分类按钮">
                <a name="dropdown-item" href="javascript:void(0)" @click="importPostType">导入岗位分类</a>
              </li>
              <li __code="org-import-importPost/导入岗位按钮">
                <a name="dropdown-item" href="javascript:void(0)" @click="importPost">导入岗位</a>
              </li>
              <li __code="org-import-importUsers/导入员工按钮">
                <a name="dropdown-item" href="javascript:void(0)" @click="importUsers">导入员工</a>
              </li>
            </ul>
          </v-dropdown>

          <v-dropdown class="ui-tool-dropdown" trigger="click">
            <button type="button" data-toggle="dropdown" class="ui-tool-button">
              <span class="icon icon-tool icon-tool-more pull-left"></span>
              <span class="_name pull-left">更多</span>
            </button>
            <ul class="dropdown-menu">
              <li __code="org-regular/转正">
                <a href="javascript:void(0)" @click="zhuan" name="dropdown-item">转正</a>
              </li>
              <li __code="org-transaction/异动">
                <a href="javascript:void(0)" @click="yi" name="dropdown-item">异动</a>
              </li>
              <li __code="org-dimission/离职">
                <a href="javascript:void(0)" @click="li" name="dropdown-item">离职</a>
              </li>
              <li __code="org-blacklist/黑名单">
                <a href="javascript:void(0)" @click="hei" name="dropdown-item">黑名单</a>
              </li>
              <!--  __code="org-blacklist/入职员工"  -->
              <!-- <li>
                <a href="javascript:void(0)" @click="ru" name="dropdown-item">员工入职</a>
              </li> -->
              <li __code="org-dormitory/员工宿舍">
                <a href="javascript:void(0)" @click="su" name="dropdown-item">员工宿舍</a>
              </li>
              <li __code="org-structureMap/组织架构图">
                <a href="javascript:void(0)" @click="heng" name="dropdown-item">组织架构图</a>
              </li>
              <li __code="org-area/区域管理">
                <a href="javascript:void(0)" @click="areaTree" name="dropdown-item">区域管理</a>
              </li>
              <li>
                <a href="javascript:void(0)" @click="employeeInfoVerify" name="dropdown-item">员工录入信息核对</a>
              </li>
            </ul>
          </v-dropdown>

        </div>
      </app-modulenavbar>
    </header>
    <router-view class="main" transition="main" transition-mode="out-in"></router-view>
    <components :is="what" :display.sync="dymicshow" v-if="dymicshow">
    </components>
    <ui-sidecontent :show.sync="bigdymicshow">
      <components :is="bigwhat" v-if="bigdymicshow">
      </components>
    </ui-sidecontent>
    <ui-modal :show.sync="uploadShow"  v-if="uploadShow" header="上传文件" hide-footer type="large">
      <ui-upload :filecountlimit="filecountlimit" filetypelimit="xls,xlsx" :submiturl="fileUrl" :callback="uploadDone" :errortime="1000*60"></ui-upload>
    </ui-modal>
  </div>
</template>
<script>
import store from '../store'

import brandEdit from './brandEdit'

import userInfo from './userInfo'
import post from './post'
import addEmployee from './addEmployee'
import addDepartment from './addDepartment'
import addStore from './addStore'

import dimission from './dimission'
import dormitory from './dormitory'
import office from './office'
import blacklist from './blacklist'
import pushEmployeeList from './pushEmployeeList'
import transaction from './transaction'
import postManage from './postManage'
import orgManage from './orgManage'


import departmentTreeEdit from './departmentTreeEdit'
import postTreeEdit from './postTreeEdit'
import areaTree from './areaTree'

import employeeInfoVerify from './employeeInfoVerify'

export default {
  data() {
      return {
        filecountlimit: 1,
        fileUrl: '',
        uploadShow: false,

        state: store.state,
        dymicshow: false,
        showNavbar: false,
        showSidebar: true,
        orgactive: true,
        sideElement: '',
        what: '',
        bigwhat: '',
        bigdymicshow: false,
        empKey: null
      };
    },
    components: {
      userInfo,
      post,
      addEmployee,
      addDepartment,
      addStore,
      dimission,
      dormitory,
      office,
      blacklist,
      pushEmployeeList,
      transaction,
      postManage,
      orgManage,
      departmentTreeEdit,
      postTreeEdit,
      brandEdit,
      areaTree,
      employeeInfoVerify
    },
    methods: {
      uploadDone() {
        this.uploadShow = false;
        this.$root.showTip({
          type: 'info',
          msg: '导入完成!',
          duration: 2000
        });
      },
      //导入组织
      importOrg() {
        this.fileUrl = "api.OrgEmployee.initOrg";
        this.uploadShow = true;
      },
      //导入门店
      importStore() {
        this.fileUrl = "api.OrgEmployee.initStore";
        this.uploadShow = true;
      },
      importStoreTeam(){
        this.fileUrl = "api.OrgEmployee.initStoreTeam";
        this.uploadShow = true;
      },
      //导入职位
      importPosition() {
        this.fileUrl = "api.OrgEmployee.initPosition";
        this.uploadShow = true;

      },
      //导入职级
      importRank() {
        this.fileUrl = "api.OrgEmployee.initRank";
        this.uploadShow = true;
      },
      importPostType(){
        this.fileUrl = "api.OrgEmployee.initPostType";
        this.uploadShow = true;
      },
      //导入岗位
      importPost() {
        this.fileUrl = "api.OrgEmployee.initPost";
        this.uploadShow = true;
      },
      //导入员工
      importUsers() {
        this.fileUrl = "api.OrgEmployee.initEmployee";
        this.uploadShow = true;
      },

      change() {
        this.orgactive = !this.orgactive;
      },
      org() {
        this.bigwhat = "departmentTreeEdit";
        this.bigdymicshow = true;
      },
      post() {
        this.bigwhat = "postTreeEdit";
        this.bigdymicshow = true;
      },
      zhuan() {
        this.bigwhat = "office";
        this.bigdymicshow = true;
      },
      li() {
        this.bigwhat = "dimission";
        this.bigdymicshow = true;
      },
      yi() {
        this.bigwhat = "transaction";
        this.bigdymicshow = true;
      },
      hei() {
        this.bigwhat = "blacklist";
        this.bigdymicshow = true;
      },
      ru(){
        this.bigwhat = "pushEmployeeList";
        this.bigdymicshow = true;
      },
      su() {
        this.bigwhat = "dormitory";
        this.bigdymicshow = true;
      },
      heng() {
        if (this.orgactive) {
          this.bigwhat = "orgManage";
        } else {
          this.bigwhat = "postManage";
        }
        this.bigdymicshow = true;
      },
      toggleSidebar(id) {
        this.showSidebar = true;
        this.sideElement = id;
      },
      adde() {
        this.$data.dymicshow = true;
        this.$data.what = 'addEmployee';
      },
      adds() {
        this.$data.what = 'addStore';
        this.$data.dymicshow = true;
      },
      addo() {
        this.$data.dymicshow = true;
        this.$data.what = 'addDepartment';
      },
      addBrand() {
        this.what = "brandEdit";
        this.dymicshow = true;
      },
      areaTree() {
        this.bigwhat = "areaTree";
        this.bigdymicshow = true;
      },
      employeeInfoVerify() {
        this.bigwhat = "employeeInfoVerify";
        this.bigdymicshow = true;
      },
      searchEmp() {
        store.actions.loadEmployeeByKey(this.empKey, (data) => {
          if (!data || Object.keys(data).length <= 0) {
            this.$root.showTip({
              type: 'info',
              msg: '未查询到相关员工信息！',
              duration: 2000
            });
          }
        }, (error) => {
          this.$root.showTip({
            type: 'error',
            msg: error,
            duration: 2000
          });
        });
      },

    },
    ready() {

      // store.actions.loadAuthority();

    },

    attached() {
      let _this = this;
      setTimeout(function() {
        _this.showNavbar = true;
      }, 500)

      this.hasReady = true;
    },
    detached() {
      this.showNavbar = false;
      this.hasReady = false;
    },

    watch: {
      dymicshow(val) {
        if (!val && !this.isCloseAll) {
          // if(('addEmployee').indexOf(this.what)>-1){
          this.$root.closeTab(this.$route.path);
          // }
        }
        this.isCloseAll = false;
      },
      bigdymicshow(val) {
        if (!val && !this.isCloseAll) {

          // if(('addEmployee').indexOf(this.bigwhat)>-1){
          this.$root.closeTab(this.$route.path);
          // }

        }
        this.isCloseAll = false;
      },
    },

    events: {
      routerChange(goNow) {
        let _this = this;
        this.$root.routerAction(goNow, this.hasReady, {
          // 关闭所有
          closeAll() {
            _this.isCloseAll = true;
            _this.bigdymicshow = false;
            _this.dymicshow = false;
          },
          //调店
          'action_transaction': this.yi,
          //新员工入职
          'action_newemployee': this.adde,
          //转正
          'action_office': this.zhuan,
          //调岗
          'action_transaction': this.yi,
          //离职
          'action_dimission': this.li,
          //黑名单
          'action_blacklist': this.hei,
          //宿舍
          'action_dormitory': this.su, //岗位树
          'action_orgmanage': this.heng, //修改组织树
          'action_editorg': this.org, //修改岗位树
          'action_editpost': this.post,
        });
        return true;
      }
    }
};
</script>
<style lang="css" scoped>
.emp-center-tab {
  position: absolute;
  right: 50%;
}

.emp-search-input {
  text-indent: 2.5em;
  height: 30px;
  line-height: 30px;
  width: 190px;
  border-radius: 40px;
  border: 1px solid #ccc;
  background: url(../../../assets/images/search.png) no-repeat 7% center;
  background-color: #d3d6dd;
}

.emp-search-input:focus {
  outline: none;
}
</style>
