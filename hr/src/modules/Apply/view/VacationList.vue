<template>
  <section class="ui-module-content pos-content">
    <div class="ui-module-row ui-panel">
      <div class="form-inline search">
        <div class="form-group">
          <span>开始时间：</span>
          <ui-datepicker :HHMM="true" :time.sync="searchFor.sDate" width="150px"></ui-datepicker>
        </div>
        <div class="form-group">
          <span>结束时间：</span>
          <ui-datepicker :HHMM="true" :time.sync="searchFor.eDate" width="150px"></ui-datepicker>
        </div>
        <div class="form-group">
          <span>假期类型</span>
          <select class="form-control" v-model="searchFor.type">
            <option v-for="item in vacationCategory" :value="item.code" :selected="item.code==searchFor.type">{{item.codeName}}</option>
          </select>
        </div>
        <div class="form-group">
          <span>员工姓名</span>
          <input type="text" class="form-control" v-model="searchFor.userName">
        </div>
        <div class="form-group">
          <button type="button" class="btn btn-primary" @click="search">查询</button>
          <button type="button" class="btn btn-default" @click="clear">清空</button>
        </div>
      </div>
      <div class="trip-list">
        <ui-grid v-ref:table :url="url" :append-params="searchFor" :fields="fields" :perpage="30" selectable="single" :pages="[10,20,30,50]" :btrefresh="true" checked="single" :selected.sync="state.vacationSelected" height="auto" tdheight="50px" table-title="请假申请" table-name="applyVacationTable" :column-config="$root.columnConfig"></ui-grid>
      </div>
    </div>
    </div>
  </section>
</template>
<script>
import store from '../store'
import Vue from 'vue'
const Tool = Vue.tool;

export default {
  data() {
      return {
        state: store.state,
        url: 'api.Apply.getVacationApplyList',
        vacationCategory: [],
        searchFor: {
          sDate: '',
          eDate: '',
          type: '',
          userName: ''
        },
        fields: [{
            name: "userName",
            title: "姓名",
            locked: "first",
            width: 80
          }, {
            name: "userPost",
            title: "岗位",
            locked: "first"
          }, {
            name: "leaveType",
            title: "假期类型",
            width: 80
          }, {
            name: "reasonDetails",
            title: "请假原因",
          }, {
            name: "duration",
            title: "请假时间",
            formater: function(value, data, index) {
              var tdContent = '从 ' + Tool.iDate(data.startTime, 'yy-mm-dd hh:mm:ss').string;
              var endTime = data.realBackTime ? data.realBackTime : data.endTime;
              tdContent += '<br/>到 ' + Tool.iDate(endTime, 'yy-mm-dd hh:mm:ss').string;
              return tdContent;
            },
            width: 180
          }, {
            name: "dayOrHours",
            title: "时长",
            formater: function(value, data , index) {
              return data.dayOrHours + (data.unit || '');
            },
            width: 80
          }, {
            name: "rq",
            title: "申请时间",
            formater: function(value, data, index) {
              return Tool.iDate(data.rq, 'yy-mm-dd hh:mm:ss').string;
            },
            width: 150
          }, {
            name: "statusName",
            title: "请假申请状态",
            formater: function(value, data, index) {
              // #10d083
              return '<div style="color: #fd6550; text-align:center">' + data.statusName + '</div>';
            },
            locked: 'last',
            width: 105
          },
          // {
          //   name: "reportStatus",
          //   title: "销假申请状态",
          //   formater: function(value, data, index) {
          //     return data.realBackTime ? '<div style="color: #10d083; text-align:center">通过</div>' : '<div style="color: #fd6550; text-align:center">审批中</div>';
          //   },
          //   locked: 'last',
          //   width: 105
          // }
        ]
      };
    },
    methods: {
      search() {
        this.$refs.table.refresh();
      },
      clear() {
        Object.keys(this.searchFor).forEach((key) => {
          this.searchFor[key] = null;
        });
      }
    },
    events: {
      refreshVacationList() {
        this.$refs.table.refresh();
      }
    },
    ready() {
      // 查询加班类型字典
      store.actions.findSystemConfig(store.config.VacationCategoryCode, (data) => {
        this.vacationCategory = data;
      }, (error) => {
        this.$root.showTip({
          type: 'danger',
          msg: error,
          duration: 2000
        });
      });
    }
};
</script>
<style lang="css" scoped>
.search {
  padding: 5px;
}

.form-inline > .form-group {
  padding-left: 5px;
}

.trip-list {
  position: absolute;
  top: 70px;
  bottom: 5px;
  left: 5px;
  right: 5px;
}
</style>
