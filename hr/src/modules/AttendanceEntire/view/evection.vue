<template>
  <div class="roster-page">
    <header class="ui-module-navbar pos-topbar-fixed">
      <div class="ui-module-navbar-content">
        <div class="pull-left">
          <h4><strong>出差/外出人数</strong></h4>
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
            <strong>目前出差/外出人数:&nbsp;&nbsp;{{total}}人</strong>
            <button type="button" class="btn btn-default" @click="evectionHistory">
              查看出差历史
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
import evectionHistory from './evectionHistory'
const Tool = Vue.tool;

export default {
  data() {
      return {
        total: 0,
        url: 'api.AttendanceEntire.getEvectionMan',
        selected: [],

        bigwhat: '',
        bigdymicshow: false,
        searchFor: {
          userName: ''
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
        }, {
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
      searchAtt() {
        this.refreshTable();
      },
      //刷新表格
      refreshTable() {
        this.$refs.table.refresh();
      },
      //点击出差历史
      evectionHistory() {

        this.bigwhat = 'evectionHistory';
        this.bigdymicshow = true;
      }
    },
    components: {
      evectionHistory
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
