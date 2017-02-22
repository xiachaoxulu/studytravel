<template>
  <section class="ui-module-content pos-content">
    <div class="ui-module-row ui-panel">
      <div class="form-inline search">
        <div class="form-group" style="width: 230px">
          <span>出发时间：</span>
          <ui-datepicker :HHMM="true" :time.sync="searchFor.sDate" width="150px"></ui-datepicker>
        </div>
        <div class="form-group">
          <span>返程时间：</span>
          <ui-datepicker :HHMM="true" :time.sync="searchFor.eDate" width="150px"></ui-datepicker>
        </div>
        <div class="form-group">
          <span>出发地：</span>
          <input type="text" class="form-control" v-model="searchFor.startAddr" style="width: 100px" />
        </div>
        <div class="form-group">
          <span>目的地：</span>
          <input type="text" class="form-control" v-model="searchFor.towhere" style="width: 100px" />
        </div>
        <div class="form-group">
          <span>员工姓名</span>
          <input type="text" class="form-control" v-model="searchFor.userName" style="width: 100px">
        </div>
        <div class="form-group">
          <button type="button" class="btn btn-primary" @click="search">查询</button>
          <button type="button" class="btn btn-default" @click="clear">清空</button>
        </div>
      </div>
      <div class="trip-list">
        <ui-grid v-ref:table :url="url" :append-params="searchFor" :fields="fields" :perpage="30" selectable="single" :pages="[10,20,30,50]" :btrefresh="true" checked="single" :selected.sync="state.bizTripSelected" height="auto" tdheight="60px" table-title="出差申请" table-name="applyBizTripTable" :column-config="$root.columnConfig"></ui-grid>
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
        selected: [],
        url: 'api.Apply.getBizTripApplyList',
        searchFor: {
          sDate: null,
          eDate: null,
          startAddr: null,
          towhere: null,
          userName: ''
        },
        fields: [{
            name: "userName",
            title: "姓名",
            locked: "first"
          }, {
            name: "userPost",
            title: "岗位",
            locked: "first"
          }, {
            name: "actbusType",
            title: "类型",
            locked: "first"
          }, {
            name: "reasonDetails",
            title: "出差/外出原因"
          }, {
            name: "duration",
            title: "出差/外出时间",
            formater: function(value, data, index) {
              var tdContent = '从 ' + Tool.iDate(data.startTime, 'yy-mm-dd hh:mm:ss').string;
              var endTime = data.realBackTime ? data.realBackTime : data.endTime;
              tdContent += '<br/>到 ' + Tool.iDate(endTime, 'yy-mm-dd hh:mm:ss').string;
              return tdContent;
            }
          }, {
            name: "hourOrDays",
            title: "时长", // 天，小时
            formater: function(value, data, index) {
              return data.hourOrDays + (data.unit || '');
            }
          }, {
            name: "startAddrName",
            title: "出发地"
          }, {
            name: "towhereName",
            title: "目的地"
          }, {
            name: "applyStatus",
            title: "出差/外出申请状态",
            formater: function(value, data, index) {
              // #10d083
              return '<div style="color: #fd6550; text-align:center">' + data.statusName + '</div>';
            },
            locked: 'last',
            width: 150
          }
          // , {
          //   name: "backStatus",
          //   title: "出差返回状态",
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
      refreshBizTripList() {
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

.approved {
  color: #10d083;
}
</style>
