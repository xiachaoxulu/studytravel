<!--
* @Created Date       : 2016-11-25T18:38:24+08:00
* @Last Modified time : 2016-11-28T10:28:25+08:00
 -->


<template>
  <section class="ui-module-content pos-content">
    <div class="ui-module-row pos-fullHeight">
      <div class="com-col-m1-left ui-panel">
        <ui-scrollview>
           <!-- <ui-tree :data="state.brandAreaStoreTree" :root="state.brandAreaStoreTree" :nodeclicked="org1Clicked" idprop="ID" :rootvisible="false" :selectedvalue.sync="tree1Selected"></ui-tree>
                             <hr class="divider" />   -->
          <ui-tree :data="state.companyDeptStoreTree" :root="state.companyDeptStoreTree" :nodeclicked="org2Clicked" idprop="ID" :rootvisible="false" :selectedvalue.sync="tree2Selected"></ui-tree>
        </ui-scrollview>
      </div>
      <div class="com-col-m1-middle ui-panel">
        <employee-list :employeeclicked="employeeclicked"></employee-list>
      </div>
      <div class="com-col-m1-right ui-panel">
        <company></company>
      </div>
      <ui-sidebar :show.sync="showSidebar " title="划入栏 " layout="content" :width="417">
        <div slot="content">
          <components :is="what" v-if="showSidebar" :userid="userid" :ID="selectedNodeID" :addteamclicked="addTeam" :editstorerelativeclicked="editStoreRelative" :editteamrelativeclicked="editTeamRelative" :addchilddeptclicked="addChildDept" :editdeptrelativeclicked="editDeptRelative" :editarearelativeclicked="editAreaRelative" :addchildstoreclicked="addChildStore" :addbrandclicked="addBrand" :editbrandrelativeclicked="editBrandRelative" :userinfocallback="userinfocallback">
          </components>
        </div>
      </ui-sidebar>
      <add-store-team :team.sync="storeTeam" :display.sync="showEditTeam" v-if="showEditTeam"></add-store-team>
      <add-store :store.sync="store" :display.sync="showEditStore" v-if="showEditStore"></add-store>
      <add-department :dept.sync="dept" :display.sync="showEditDept" v-if="showEditDept"></add-department>
      <area-edit :area.sync="area" :visibility.sync="showEditArea" v-if="showEditArea"></area-edit>
      <brand-edit :brand.sync="brand" :display.sync="showEditBrand" v-if="showEditBrand"></brand-edit>
      <components :is="modalwhat" :display.sync="showteam" :employee-id="editId" :ids="ids" v-if="showteam"></components>
    </div>
  </section>
</template>
<script>
import employeeList from './employeeOrgList'
import company from './company'
import store from '../store'
import mystore from './store'
import userInfo from './userInfo'
import department from './department'
import area from './area'
import brand from './brand'
import team from './team'
import addStore from './addStore'
import addStoreTeam from './addStoreTeam'
import batchZhuanForm from './batchZhuanForm'
import batchLiForm from './batchLiForm'
import batchHeiForm from './batchHeiForm'
import addEmployee from './addEmployee'
import batchTransaction from './batchTransaction'

import addDepartment from './addDepartment'
import areaEdit from './areaEdit'
import brandEdit from './brandEdit'
import Vue from 'vue';
const Tool = Vue.tool;

export default {
  data() {
      return {
        state: store.state,

        userid: '', //点击的用户ID
        editId: '', //编辑的用户ID
        ids: [], //转离调


        showSidebar: false,
        showteam: false,
        what: '',
        modalwhat: '',
        tree1Selected: [],
        tree2Selected: [],
        selectedNodeID: null,
        showEditTeam: false,
        showEditStore: false,
        showEditDept: false,
        showEditArea: false,
        showEditBrand: false,
        storeTeam: {},
        store: {},
        dept: {},
        area: {},
        brand: {}
      };
    },
    components: {
      company,
      employeeList,
      department,
      brand,
      area,
      userInfo,
      store,
      team,
      mystore,
      addStore,
      addStoreTeam,
      addDepartment,
      areaEdit,
      brandEdit,
      addEmployee,
      batchZhuanForm,
      batchLiForm,
      batchHeiForm,
      batchTransaction
    },
    methods: {

      userinfocallback(data, type) {

        if (type == "edit") {
          this.editId = data + '';
          this.modalwhat = 'addEmployee';
        }
        if (type == "blacklist") {
          this.ids = [];
          this.ids.push(data);
          this.modalwhat = 'batchHeiForm';
        }
        if (type == "transaction") {
          this.ids = [];
          this.ids.push(data);
          this.modalwhat = 'batchTransaction';
        }
        if (type == "dimission") {
          this.ids = [];
          this.ids.push(data);
          this.modalwhat = 'batchLiForm';
        }
        if (type == "office") {
          this.ids = [];
          this.ids.push(data);
          this.modalwhat = 'batchZhuanForm';
        }
        this.showteam = true;
      },
      //弹出人员信息************************
      employeeclicked(data) {
        this.userid = data;
        this.$data.showSidebar = true;
        this.what = 'userInfo'
      },
      org1Clicked(data) {
        let key = {
          'brand': 'ID',
          'area': 'ID',
          'store': 'organizeID',
          'team': 'ID',
          'department': 'organizeID'
        };

        store.actions.loadEmployeeByTreeNodeList(null, data[key[data.nodeType]], data.nodeType);
        this.tree2Selected = [];
        this.selectedNodeID = data.ID;
        //弹出部门门店信息************************
        switch (data.nodeType) {
          case 'brand':
            this.what = 'brand';
            break;
          case 'area':
            this.what = 'area';
            break;
          case 'department':
            this.what = 'department';
            break;
          case 'store':
            this.what = 'mystore';
            break;
          case 'team':
            this.what = 'team';
            break;
          default:
            break;
        }
        this.$data.showSidebar = true;
      },
      org2Clicked(data) {
        let key = {
          'brand': 'ID',
          'area': 'ID',
          'store': 'organizeID',
          'team': 'ID',
          'department': 'organizeID'
        };
        console.log(data.nodeType);
        console.log(data.organizeType);
        console.log(data.ID);
        console.log(data.organizeID);
        
        store.actions.loadEmployeeCountByOrgID(null, data.nodeType == 'team' ? data.organizeID : data[key[data.nodeType]]);

        store.actions.loadEmployeeByTreeNodeList(null, data[key[data.nodeType]], data.nodeType);
        this.tree1Selected = [];
        this.selectedNodeID = data.ID;
        switch (data.nodeType) {
          case 'brand':
            this.what = 'brand';
            break;
          case 'area':
            this.what = 'area';
            break;
          case 'department':
            this.what = 'department';
            break;
          case 'store':
            this.what = 'mystore';
            break;
          case 'team':
            this.what = 'team';
            break;
          default:
            break;
        }
        this.$data.showSidebar = true;
      },
      addTeam(storeID) {
        this.storeTeam = {
          storeID: storeID
        };
        this.showEditTeam = true;
        this.$data.showSidebar = false;
      },
      editStoreRelative(storeID) {
        store.actions.loadStore(storeID, (data) => {
          delete data.createTime;
          this.store = data;
          // 继续加载该门店下的宿舍信息
          store.actions.loadDormitoryByStore(data.ID, (dors) => {
            Vue.set(this.store, 'dormitoryStore', dors);
            // dors.forEach((elem) => {
            //   this.store.dormitoryStore.$set(this.store.dormitoryStore.length, elem);
            // });
            console.log('this.store: ', this.store)
            this.showEditStore = true;
            this.$data.showSidebar = false;
          }, (error) => {
            this.$root.showTip({
              type: 'danger',
              msg: error,
              duration: 2000
            });
          });
        });
      },
      addChildDept(parentDeptID) {
        this.dept = {
          parentID: parentDeptID
        }
        this.showEditDept = true;
        this.$data.showSidebar = false;
      },
      editDeptRelative(deptID) {
        store.actions.loadDept(deptID, (data) => {
          delete data.createTime;
          this.dept = data;
          this.showEditDept = true;
          this.$data.showSidebar = false;
        });
      },
      editAreaRelative(areaID) {
        store.actions.loadArea(areaID, (data) => {
          delete data.createTime;
          this.area = data;
          this.showEditArea = true;
          this.$data.showSidebar = false;
        });
      },
      addChildStore(areaID) {
        store.actions.loadArea(areaID, (data) => {
          this.store = {
            areaID: areaID,
            areaName: data.areaName
          };
          this.showEditStore = true;
          this.$data.showSidebar = false;
        });
      },
      addBrand() {
        this.brand = {};
        this.showEditBrand = true;
        this.$data.showSidebar = false;
      },
      editBrandRelative(brandID) {
        store.actions.loadBrand(brandID, (data) => {
          delete data.createTime;
          this.brand = data;
          this.showEditBrand = true;
          this.$data.showSidebar = false;
        });
      },
      editTeamRelative(teamID) {
        store.actions.loadStoreTeam(teamID, (data) => {
          delete data.createTime;
          this.storeTeam = data;
          this.showEditTeam = true;
          this.$data.showSidebar = false;
        });
      },
    },
    ready() {
      // store.actions.loadBrandAreaStoreTree();
      store.actions.loadCompanyDeptStore();
    }
};
</script>
<style lang="css" scoped>
.divider {
  /*background-image: linear-gradient(to right, black 33%, rgba(255, 255, 255, 0) 0%);
  background-position: bottom;
  background-size: 3px 1px;
  background-repeat: repeat-x;*/
  border-top: 1px dashed #ccc;
}
.com-col-m1-left{
  width: 260px;
}
.com-col-m1-middle{
  left: 267px;
}
</style>
