<template>
  <div class="roster-page">
    <header class="ui-module-navbar pos-topbar-fixed">
      <div class="ui-module-navbar-content">
        <div class="pull-left">
          <h4><strong>考勤机命令</strong></h4>
        </div>
      </div>
    </header>
    <section class="warp">
      <main class="main-content">
        <div class="toolbar">
          <div class="toolbar-item">
            <select v-model="searchFor.code" class="form-control" style="display:inline;width:150px;" vali="required" vali-msg='必填项'>
              <template v-for="item in types">
                <option value="{{item.code}}" :selected="$index==1">{{item.codeName}}</option>
              </template>
            </select>
            <span>时间</span>
            <ui-datepicker :time.sync="searchFor.sDate" format="yyyy-MM-dd" width="150px" vali="required" vali-msg='必填项'></ui-datepicker>
            <span>到</span>
            <ui-datepicker :time.sync="searchFor.eDate" format="yyyy-MM-dd" width="150px" vali="required" vali-msg='必填项'></ui-datepicker>
            &nbsp;&nbsp;
            <ui-search :value.sync="searchFor.key" :search-callback="searchAtt"></ui-search>
          </div>
          <div class="input-group search">
          </div>
        </div>
        <ui-grid :total.sync="total" v-ref:table class="testtable" :append-params="searchFor" selectable="multi" :fields="fields" :perpage="30" :pages="[10,20,30,50]" :btrefresh="true" checked="multi" :selected.sync="selected" height="auto" :url="url" :auto-load="false"></ui-grid>
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
        url: 'api.Settings.selectclockcmdpager',
        selected: [],
        types: [],
        searchFor: {
          code: '',
          key: '',
          sDate: Vue.tool.iDate(new Date(), "yyyy-mm-dd").string,
          eDate: Vue.tool.iDate(new Date(), "yyyy-mm-dd").string
        },
        fields: [{
          name: 'sn_id',
          title: '考勤机编码',
          width: '150px',
          locked: 'first'
        },{
          name: 'cmdcontent',
          title: '命令',
          width: '150px',
        }, {
          name: 'status',
          title: '命令状态',
          width: '100px',
        }, {
          name: 'cmdcommittime',
          title: '提交时间',
          width: '150px',
          formater: function(value, data, index) {
            if (value) {
              return Tool.iDate(value, 'yy-mm-dd hh:mm:ss').string;
            } else {
              return ''
            }
          }
        }, {
          name: 'cmdtranstime',
          title: '传送时间',
          width: '150px',
          formater: function(value, data, index) {
            if (value) {
              return Tool.iDate(value, 'yy-mm-dd hh:mm:ss').string;
            } else {
              return ''
            }
          }
        }, {
          name: 'cmdovertime',
          title: '返回时间',
          width: '150px',
          formater: function(value, data, index) {
            if (value) {
              return Tool.iDate(value, 'yy-mm-dd hh:mm:ss').string;
            } else {
              return ''
            }
          }
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
      'searchFor.code': function(a, b) {
        console.log(a);
        if (a != "") {
          this.$refs.table.refresh();
        }
      }
    },
    ready() {
      var self = this;
      store.actions.findSystemConfigNotKey("143000", function(data) {

        self.types = data;
        if (self.types && self.types.length > 0) {
          console.log(self.types[0].code)
          self.searchFor.code = self.types[0].code;
        }
      }, function(error) {
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

.toolbar-item {
  margin-right: 0px;
  margin-top: 2px;
}
</style>
