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
          <span>员工姓名</span>
          <input type="text" class="form-control" v-model="searchFor.userName">
        </div>
        <div class="form-group">
          <button type="button" class="btn btn-primary" @click="search">查询</button>
          <button type="button" class="btn btn-default" @click="clear">清空</button>
        </div>
      </div>
      <div class="trip-list">
        <ui-grid v-ref:table :url="url" :append-params="searchFor" :fields="fields" :perpage="30" selectable="single" :pages="[10,20,30,50]" :btrefresh="true" checked="single" :selected.sync="state.overtimeSelected" height="auto" tdheight="60px" table-title="加班申请" table-name="applyOvertimeTable" :column-config="$root.columnConfig"></ui-grid>
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
        url: 'api.Apply.getOvertimeApplyList',
        searchFor: {
          sDate: '',
          eDate: '',
          userName: ''
        },
        fields: [{
          name: "userName",
          title: "姓名",
          locked: "first"
        }, {
          name: "userPost",
          title: "岗位",
          locked: "first",
          width: 200
        }, {
          name: "actoverType",
          title: "加班类型"
        }, {
          name: "reasonDetails",
          title: "加班原因"
        }, {
          name: "bizTripTime",
          title: "加班时间",
          formater: function(value, data, index) {
            var tdContent = '从 ' + Tool.iDate(data.startTime, 'yy-mm-dd hh:mm:ss').string +
              '<br/>到 ' + Tool.iDate(data.endTime, 'yy-mm-dd hh:mm:ss').string;
            return tdContent;
          }
        }, {
          name: "dayOrHours",
          title: "时长",
          formater: function(value, data, index) {
            return data.dayOrHours + (data.unit || '');
          }
        }, {
          name: "rq",
          title: "申请时间",
          formater: function(value, data, index) {
            return Tool.iDate(data.rq, 'yy-mm-dd hh:mm:ss').string;
          }
        }, {
          name: "statusName",
          title: "加班申请状态",
          formater: function(value, data, index) {
            // #10d083
            return '<div style="color: #fd6550; text-align:center">' + data.statusName + '</div>';
          },
          locked: 'last',
          width: 105
        }]
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
      refreshOvertimeList() {
        this.$refs.table.refresh();
      }
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
