<template>
  <div class="daydetail">
    <header class="ui-module-navbar pos-topbar-fixed">
      <div class="ui-module-navbar-content">
        <div class="pull-left">
          <h4><strong>考勤明细</strong></h4>
        </div>
      </div>
    </header>
    <section class="warp">
      <main class="main-content">
        <div class="toolbar">
          <div class="quick-info">
            <strong>{{user.userName}}</strong>&nbsp;&nbsp;&nbsp;
            <span>{{user.userNum}}</span>&nbsp;&nbsp;&nbsp;
            <span>{{user.userTypeName}}</span>&nbsp;&nbsp;&nbsp;
            <span>{{user.postName}}</span>&nbsp;&nbsp;&nbsp;
            <span>{{user | orgFilter}}</span>
          </div>
        </div>
        <ui-grid v-ref:table :total.sync="total" :url="dayDetailUrl" class="testtable" :append-params="searchFor" :fields="fields" :perpage="30" :pages="[10,20,30,50]" :btrefresh="true" checked="multi" :selected.sync="selected" height="auto" tdheight="40px"></ui-grid>
      </main>
    </section>
  </div>
</template>
<script>
import Vue from 'vue'
const Tool = Vue.tool;

export default {
  data() {
      return {
        dayDetailUrl: 'api.AttendanceEntire.getDayDetailTip',
        total: 0,
        searchFor: {
          userNum: '',
          date: ''
        },
        fields: [{
            name: 'date',
            title: '日期',
            formater: function(value, data, index) {
              return Tool.iDate(value, 'yy-mm-dd').string;
            },
            width: 100
          }, {
            name: 'dakaGs',
            title: '打卡工时',
            width: '150px'
          }, {
            name: 'dkAddress',
            title: '打卡地点',
            width: '150px'
          }, {
            name: 'qtgs',
            title: '其他工时',
            width: '150px'
          }, {
            name: 'ybgs',
            title: '夜班工时',
            width: '150px'
          }, {
            name: 'overTime',
            title: '加班工时',
            width: '150px'
          }, {
            name: 'diaoboTime',
            title: '调拨工时',
            width: '150px'
          }, {
            name: 'hoursForMonth',
            title: '月总工时',
            width: '150px'
          }, {
            name: 'lclx',
            title: '异常类型',
            width: '150px'
          }, {
            name: 'jqlx',
            title: '假期类型',
            width: '150px'
          }, {
            name: 'blyy',
            title: '补录原因',
            width: '100px'
          }

        ]
      };
    },
    filters: {
      orgFilter(item) {
        var org = item.deptName;
        if (item.storeName) {
          org += "/" + item.storeName;
        }
        if (item.teamName) {
          org += "/" + item.teamName;
        }
        return org;
      }
    },
    created() {
      this.searchFor.userNum = this.user.userNum;
      this.searchFor.date = this.date;
    },
    props: {
      user: {
        type: Object,
        default: () => {
          return {};
        }
      },
      date: {
        type: String,
        default: () => {
          return '';
        }
      }
    },
    ready() {

    }
};
</script>
<style lang="css" scoped>
.daydetail,
.warp {
  height: 100%;
  overflow: hidden;
}

.daydetail .warp {
  background-color: #fff;
  position: relative;
}

.daydetail .list-group {
  text-align: center;
  cursor: pointer;
  overflow-x: hidden;
}

.daydetail .search {
  float: left;
  margin-left: 50px;
  width: 300px;
}

.daydetail .toolbar {
  position: absolute;
  height: 50px;
  left: 0;
  width: 100%;
  padding-left: 20px;
}

.daydetail .quick-info {
  float: left;
}

.daydetail .quick-info strong {
  font-size: 30px;
}

.daydetail .quick-info span {
  font-size: 14px;
  font-weight: bold;
}

.daydetail .tool {
  float: right;
  width: 275px;
  color: red;
  padding-right: 10px;
  text-align: right;
}

.daydetail .main-content {
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
</style>
