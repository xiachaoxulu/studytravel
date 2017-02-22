<template>
  <div class="roster-page">
    <header class="ui-module-navbar pos-topbar-fixed">
      <div class="ui-module-navbar-content">
        <div class="pull-left">
          <h4><strong>查看出差历史</strong></h4>
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
            <span>时间</span>
            <ui-datepicker :time.sync="searchFor.sDate" format="yyyy-MM-dd" width="150px" vali="required" vali-msg='必填项'></ui-datepicker>
            <span>到</span>
            <ui-datepicker :time.sync="searchFor.eDate" format="yyyy-MM-dd" width="150px" vali="required" vali-msg='必填项'></ui-datepicker>
          </div>
          <div class="toolbar-item">
            <select v-model="searchFor.reason" class="inline form-control" vali="required" vali-msg='必填项'>
              <option value="">请选择出差原因</option>
              <template v-for="item in reasons">
                <option value="{{item.code}}">{{item.codeName}}</option>
              </template>
            </select>
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
        url: 'api.AttendanceEntire.getEvectionMan',
        selected: [],

        bigwhat: '',
        bigdymicshow: false,

        reasons: [],

        searchFor: {
          userName: '',
          reason: '',
          sDate: Vue.tool.iDate(new Date(), "yyyy-mm-dd").string,
          eDate: Vue.tool.iDate(new Date(), "yyyy-mm-dd").string
        },
        fields: [{
          name: 'userName',
          title: '姓名',
          width: '100px',
          locked: 'first'
        }, {
          name: 'userPost',
          title: '岗位',
          width: '150px',
        }, {
          name: "duration",
          title: "出差时间",
          formater: function(value, data, index) {
            var tdContent = '从 ' + Tool.iDate(data.startTime, 'yy-mm-dd hh:mm:ss').string;
            var endTime = data.realBackTime ? data.realBackTime : data.endTime;
            tdContent += '<br/>到 ' + Tool.iDate(endTime, 'yy-mm-dd hh:mm:ss').string;
            return tdContent;
          }
        }, {
          name: 'hourOrDays',
          title: '时长',
          width: '100px'
        },{
          name: 'startAddrName',
          title: '出发地',
          width: '100px'
        }, {
          name: 'towhereName',
          title: '目的地',
          width: '100px'
        }]
      }
    },
    methods: {
      searchAtt() {
        this.refreshTable();
      },
      //刷新表格
      refreshTable() {
        this.$refs.table.refresh();
      },
    },
    watch: {
      'searchFor.sDate': function() {
        this.$refs.table.refresh();
      },
      'searchFor.eDate': function() {
        this.$refs.table.refresh();
      },
      'searchFor.reason': function(a, b) {
        if (a != "") {
          this.$refs.table.refresh();
        }
      }
    },
    ready() {
      var self = this;
      store.actions.findSystemConfig("134000", function(data) {
        self.reasons = data;
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
</style>
