<!--
* @Created Date       : 2016-11-07T10:07:30+08:00
* @Last Modified time : 2016-12-02T16:25:10+08:00
 -->


<template>
  <div class="roster-page">
    <header class="ui-module-navbar pos-topbar-fixed">
      <div class="ui-module-navbar-content">
        <div class="pull-left">
          <h4><strong>补录工时</strong></h4>
        </div>
        <div class="input-group search">
          <ui-search :value.sync="searchFor.userName" :search-callback="searchAtt"></ui-search>
        </div>
      </div>
    </header>
    <section class="warp">
      <main class="main-content">
        <div class="toolbar">
          <div class="toolbar-item">
            <span>日期</span>
            <ui-datepicker :time.sync="searchFor.startd" width="150px" vali="required" vali-msg='必填项'></ui-datepicker>
            <span>到</span>
            <ui-datepicker :time.sync="searchFor.endd" width="150px" vali="required" vali-msg='必填项'></ui-datepicker>
          </div>
          <div class="toolbar-item">
            <combo-tree class="orgtype" :treedata="org" vali="required" vali-msg="必填项" :multiple="true" :checkable="true" idprop="ID" :rootvisible="false" :nodeclicked="nodeclicked">
              <div data-toggle="dropdown">
                <div class="choose-input">
                  <input type="text" class="form-control" v-model="orgDisplayName" placeholder="请选择组织" readonly>
                  <i class="icon-tool icon-tool-search"></i>
                </div>
              </div>
            </combo-tree>
          </div>
          <div class="toolbar-item">
            总计: <strong>{{sum}}</strong> 工时
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
const Tool = Vue.tool;

export default {
  data() {
      return {
        total: 0,
        sum: 0,

        url: 'api.AttendanceEntire.getOtherList',
        selected: [],
        org: {},
        orgDisplayName: '',
        searchFor: {
          userName: '',
          organizes: '',
          startd: Vue.tool.iDate(new Date(), "yy-mm-dd").string,
          endd: Vue.tool.iDate(new Date(), "yy-mm-dd").string
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
          name: 'userType',
          title: '用工类型',
          width: '100px',
        }, {
          name: 'tabRegisterDes',
          title: '组织',
          width: '200px',
        }, {
          name: 'workday',
          title: '日期',
          formater: function(value, data, index) {
            if (value) {
              return Tool.iDate(value, 'yy-mm-dd').string;
            } else {
              return ''
            }
          }
        }, {
          name: 'fillcard',
          title: '补录原因',
          width: '200px'
        }, {
          name: 'fillwork',
          title: '工时数量',
          width: '100px'
        }]
      }
    },
    methods: {
      nodeclicked(data) {
        this.orgDisplayName = data.map((item) => {
          return item.text
        }).join(',');
        this.searchFor.organizes = JSON.stringify(data.map((item) => {
          return item.organizeID;
        }));
      },
      searchAtt() {
        this.refreshTable();
      },
      //刷新表格
      refreshTable() {
        this.getSum();
        this.$refs.table.refresh();
      },
      getSum() {
        var self=this;
        store.actions.getSum(this.searchFor, function(data) {
          self.sum = data;
        }, function(error) {
          self.$root.showTip({
            type: 'danger',
            msg: error,
            duration: 2000
          });
        });
      }
    },
    watch:{
      'searchFor.startd':function(){
        this.getSum();
        this.$refs.table.refresh();
      },
      'searchFor.endd':function(){
        this.getSum();
        this.$refs.table.refresh();
      }
    },
    ready() {
      var self = this;
      self.getSum();
      store.actions.loadOrgListTree(function(data) {
        self.org = data;
      }, function(error) {
        self.$root.showTip({
          type: 'danger',
          msg: error,
          duration: 2000
        });
      })
    }
}
</script>
<style lang="css" scoped>
.roster-page,
.warp {
  height: 100%;
  overflow: hidden;
}

.roster-page .warp {
  background-color: #fff;
  position: relative;
}

.roster-page .list-group {
  text-align: center;
  cursor: pointer;
  overflow-x: hidden;
}

.roster-page .search {
  float: left;
  margin-left: 50px;
  width: 300px;
}

.roster-page .toolbar {
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

.roster-page .main-content {
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

.toolbar-item {
  float: left;
  margin-right: 40px;
}

.toolbar-item:last-child {
  margin-right: 0px;
  margin-top: 2px;
  width: 200px;
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
  font-size: 18px;
  top: 8px;
  right: 0;
  color: #999;
  line-height: 30px;
}
</style>
