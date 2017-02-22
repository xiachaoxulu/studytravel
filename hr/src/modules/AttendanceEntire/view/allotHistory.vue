<!--
* @Created Date       : 2016-11-07T10:07:29+08:00
* @Last Modified time : 2016-12-02T15:43:10+08:00
 -->


<template>
  <div class="allotHistory-page">
    <header class="ui-module-navbar pos-topbar-fixed">
      <div class="ui-module-navbar-content">
        <div class="pull-left">
          <h4><strong>调拨历史查询</strong></h4>
        </div>
        <div class="input-group search">
          <ui-search :value.sync="searchFor.userName" :search-callback="searchAtt"></ui-search>
        </div>
      </div>
    </header>
    <section class="warp">
      <main class="main-content">
        <div class="toolbar">
        <div class="time">
            <span>时间</span>
            <ui-datepicker :time.sync="searchFor.startTimeStr" format="yyyy-MM-dd" width="150px" vali="required" vali-msg='必填项'></ui-datepicker>
            <span>到</span>
            <ui-datepicker :time.sync="searchFor.endTimeStr" format="yyyy-MM-dd" width="150px" vali="required" vali-msg='必填项'></ui-datepicker>
          </div>
          <div class="time">
           <combo-tree class="orgtype" :treedata="org2" vali="required" vali-msg="必填项" :multiple="true" :checkable="true" idprop="ID" :rootvisible="false" :nodeclicked="nodeClicked">
              <div data-toggle="dropdown">
                <div class="choose-input">
                  <input type="text" class="form-control" v-model="orgDisplayName" placeholder="请选择调出组织" readonly>
                  <i class="icon-tool icon-tool-search"></i>
                </div>
              </div>
            </combo-tree>
           
          </div>
          <div class="time">
            <combo-tree :treedata="org" vali="required" vali-msg="必填项" :multiple="true" :checkable="true" idprop="ID" :rootvisible="false" :nodeclicked="nodeClicked2">
              <div data-toggle="dropdown">
                <div class="choose-input">
                  <input type="text" class="form-control" v-model="orgDisplayName2" placeholder="请选择调入组织" readonly>
                  <i class="icon-tool icon-tool-search"></i>
                </div>
              </div>
            </combo-tree>
          </div>
          <div class="time">
            <button type="button" class="btn btn-success"   @click="searchAtt">搜索</button> &nbsp;&nbsp;
            <button type="button" class="btn btn-success"   @click="exportExecl">导出</button>
          </div>
        </div>
        <ui-grid :total.sync="total" v-ref:table class="testtable" :append-params="searchFor" selectable="multi" :fields="fields" :perpage="30" :pages="[10,20,30,50]" :btrefresh="true" checked="multi" :selected.sync="selected" height="auto" :url="url"></ui-grid>
      </main>
    </section>
  </div>
</template>
<script>
import Vue from 'vue'
import store from '../store'

export default {
  data() {
      return {
        total: 0,
        url: 'api.AttendanceEntire.selectAllotHistory',
        selected: [],
        org: {},
        org2: {},
        orgDisplayName: '',
        orgDisplayName2: '',


        bigwhat: '',
        bigdymicshow: false,

        reasons: [],

        searchFor: {
          userName: '',
          startTimeStr: Vue.tool.iDate(new Date(), "yyyy-mm-dd").string,
          endTimeStr: Vue.tool.iDate(new Date(), "yyyy-mm-dd").string,
          orgID:'',
          toOrgID:''
        },
        fields: [{
          name: 'userName',
          title: '姓名',
          width: '100px',
          locked: 'first'
        }, {
          name: 'userNum',
          title: '员工工号',
          width: '150px',
        }, {
          name: 'userTypeName',
          title: '用工类型',
          width: '100px',
        }, {
          name: 'dateStr',
          title: '工时日期',
          width: '100px',
        }, {
          name: 'hoursForDay',
          title: '总工时',
          width: '100px'
        }, {
          name: 'ctrl',
          title: '调出组织',
          width: '250px',
          formater: function(value, data, index) {
            var org = data.deptName;
            if (data.storeName) {
              org += "/" + data.storeName;
            }
            if (data.teamName) {
              org += "/" + data.teamName;
            }
            return org;
          },
        }, {
          name: 'ctrl2',
          title: '调入组织',
          width: '250px',
          formater: function(value, data, index) {
            var org = data.toDeptName;
            if (data.toStoreName) {
              org += "/" + data.toStoreName;
            }
            if (data.toTeamName) {
              org += "/" + data.toTeamName;
            }
            return org;
          },
        }]
      }
    },
    methods: {

      exportExecl() {
        //postc参数转get
        var param = Object.keys(this.searchFor).map((item) => {
          return item + "=" + this.searchFor[item];
        }).join('&');
        this.$root.downloadFile('acewill/checkwork/checkworkrule/exportTransferworkCheckworkHis.htm',param);
      },
      searchAtt() {

        this.$refs.table.refresh();
      },
      nodeClicked(data) {
 
        var self = this;
        if (data instanceof Array) {
          self.searchFor.orgID = data.map((item) => {
            return item.organizeID
          }).join(',');
          self.orgDisplayName = data.map((item) => {
            return item.text
          }).join(',');;
        } else {
          self.searchFor.orgID = data.organizeID;
          self.orgDisplayName = data.text;
        }
        this.refreshTable();
      },
      nodeClicked2(data) {
 
        var self = this;
        if (data instanceof Array) {
          self.searchFor.toOrgID = data.map((item) => {
            return item.organizeID
          }).join(',');
          self.orgDisplayName2 = data.map((item) => {
            return item.text
          }).join(',');;
        } else {
          self.searchFor.toOrgID = data.organizeID;
          self.orgDisplayName2 = data.text;
        }

        this.refreshTable();
      },
      // //调出
      // allotout() {
      //   this.searchFor.transferType = 1;
      //   this.refreshTable();
      // },
      // allotin() {
      //   this.searchFor.transferType = 2;
      //   this.refreshTable();
      // },
      //刷新表格
      refreshTable() {
        this.$refs.table.refresh();
      },
    },
    watch:{
      'searchFor.startTimeStr':function(){
        this.$refs.table.refresh();
      },
      'searchFor.endTimeStr':function(){
        this.$refs.table.refresh();
      }
    },
    ready() {
      var self = this;
      store.actions.loadOrgListTreeNonPower(function(data) {
        self.org = data;
        
      }, function(error) {
        self.$root.showTip({
          type: 'danger',
          msg: error,
          duration: 2000
        });
      });
      store.actions.loadOrgListTree(function(data){
        self.org2 = data;
      },function(error){
        self.$root.showTip({
          type: 'danger',
          msg: error,
          duration: 2000
        });
      });
    }
}
</script>
<style lang="css" scoped>
.allotHistory-page {
  margin-top: -8px;
}

.allotHistory-page,
.warp {
  height: 100%;
  overflow: hidden;
}

.allotHistory-page .warp {
  background-color: #fff;
  position: relative;
}

.allotHistory-page .list-group {
  text-align: center;
  cursor: pointer;
  overflow-x: hidden;
}

.allotHistory-page .search {
  float: left;
  margin-left: 50px;
  width: 300px;
}

.allotHistory-page .toolbar {
  position: absolute;
  height: 50px;
  left: 0;
  width: 100%;
  padding-left: 20px;
  background-color: #e8eaef;
  line-height: 50px;
}

.inline {
  display: inline-block;
}

.allotHistory-page .main-content {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.testtable {
  position: absolute;
  top: 60px;
  left: 10px;
  right: 10px;
  bottom: 0px;
}

.dialog-content {
  position: relative;
}

.control-label {
  padding-left: 0px;
}

.buttons {
  margin-top: 30px;
  text-align: center;
}

.choose-input {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  font-family: 'Microsoft YaHei', serif;
  width: 100%;
}

.choose-input > input {
  font-family: 'Microsoft YaHei', serif;
  color: #666;
  box-sizing: border-box;
  outline: none;
  padding: 0 30px 0 7px;
  font-size: 13px;
  width: 100%;
  cursor: pointer;
  background: #fff;
}

.choose-input > i {
  display: inline-block;
  position: absolute;
  width: 30px;
  height: 30px;
  line-height: 30px;
  top: 6px;
  right: 0;
  color: #999;
}

.orgtype {
  width: 200px;
  float: left;
}

.typecontrol {
  width: 125px;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 10px;
  float: left;
}

.time {
  float: left;
  margin-right: 20px;
}

.time:nth-child(2) {
  margin-right: 10px;
}
</style>
