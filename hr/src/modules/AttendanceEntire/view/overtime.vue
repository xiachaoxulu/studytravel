<template>
  <div class="roster-page">
    <header class="ui-module-navbar pos-topbar-fixed">
      <div class="ui-module-navbar-content">
        <div class="pull-left">
          <h4><strong>加班人数</strong></h4>
        </div>
        <div class="input-group search">
          <ui-search :value.sync="searchFor.userName" :search-callback="searchAtt"></ui-search>
        </div>
      </div>
    </header>
    <section class="warp">
      <main class="main-content">
        <div class="toolbar">
          <div class="quick-info">
            <strong>目前加班人数:&nbsp;&nbsp;{{total}}人</strong>
            <button type="button" class="btn btn-default" @click="overtimeHistory">
              查看加班历史
            </button>
          </div>
        </div>
        <ui-grid :total.sync="total" v-ref:table class="testtable" :append-params="queryParam" selectable="multi" :fields="fields" :perpage="30" :pages="[10,20,30,50]" :btrefresh="true" checked="multi" :selected.sync="selected" height="auto" :url="url"></ui-grid>
      </main>
    </section>
  </div>
  <ui-sidecontent :show.sync="bigdymicshow">
    <components :is="bigwhat" v-if="bigdymicshow">
    </components>
  </ui-sidecontent>
</template>
<script>
import Vue from 'vue'
import store from '../store'
import overtimeHistory from './overtimeHistory'
const Tool = Vue.tool;
export default {
  data() {
      return {
        total: 0,
        url: 'api.AttendanceEntire.getOvertime',
        selected: [],

        bigwhat: '',
        bigdymicshow: false,


        searchFor: {
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
            return data.dayOrHours + data.unit || '';
          }
        }, {
          name: "rq",
          title: "申请时间",
          formater: function(value, data, index) {
            return Tool.iDate(data.rq, 'yy-mm-dd hh:mm:ss').string;
          }
        }]
      }
    },
    computed: {
      queryParam: {
        get: function() {
          let p = {};
          Object.assign(p, this.query, this.searchFor)
          return p;
        }
      }
    },
    props: {
      query: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    methods: {
      searchAtt(){
        this.refreshTable();
      },
      //刷新表格
      refreshTable() {
        this.$refs.table.refresh();
      },
      //点击加班历史
      overtimeHistory() {

        this.bigwhat = 'overtimeHistory';
        this.bigdymicshow = true;
      }
    },
    components:{
      overtimeHistory
    }
}
</script>
<style lang="css" scoped>
.roster-page {
  margin-top: -8px;
}

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
}

.roster-page .quick-info {
  float: left;
  height: 50px;
  line-height: 50px;
}

.roster-page .quick-info strong {
  font-size: 18px;
  margin-right: 50px;
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
</style>
