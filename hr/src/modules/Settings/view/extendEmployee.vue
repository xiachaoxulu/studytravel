<template>
  <div class="roster-page">
    <header class="ui-module-navbar pos-topbar-fixed">
      <div class="ui-module-navbar-content">
        <div class="pull-left">
          <h4><strong>员工扩展字段</strong></h4>
        </div>
      </div>
    </header>
    <section class="warp">
      <main class="main-content">
        <div class="toolbar">
          <div class="tool" role="group">
           <button type="button " class="ui-tool-button" @click="refresh">
              <span class="_name pull-left">刷新</span>
            </button>
            <button type="button " class="ui-tool-button" @click="add">
              <span class="_name pull-left">添加</span>
            </button>
            <button type="button " class="ui-tool-button" @click="edit">
              <span class="_name pull-left">编辑</span>
            </button>
            <button type="button " class="ui-tool-button" @click="delete">
              <span class="_name pull-left">删除</span>
            </button>
          </div>
        </div>
        <ui-grid v-ref:table :total.sync="total" :url="url" class="testtable"   selectable="multi" :fields="fields"  :perpage="30" :pages="[10,20,30,50]" :btrefresh="true" checked="multi" :selected.sync="selected" height="auto" tdheight="50px"></ui-grid>
      </main>
      <components :is="what" :display.sync="whatShow"  :id="editID" v-if="whatShow" :component-call-back="componentCallBack">
      </components>
      <ui-confirm @confirmed="confirmed" confirm-button-text="是" deny-button-text="否" :show.sync="deletedialogShow" close-on-confirm header="提示">
        数据删除不可恢复,是否继续
      </ui-confirm>
    </section>
  </div>
</template>
<script>
//导入模块store
import Vue from 'vue'
import store from '../store.js'
import addExtendEmployee from './addExtendEmployee'

const Tool = Vue.tool;

export default {
  data() {
      return {
        total: 0,
        selected: [],
        editID: '',
        whatShow: false,
        what: '',
        url: 'api.Settings.getextendEmployeeList',
        deletedialogShow: false,

        fields: [{
          name: 'showName',
          title: '显示名称',
          width: 150,
          locked: 'first'
        }, {
          name: 'orderNum',
          title: '排序',
          width: '100px'
        }, {
          name: 'dbNullable',
          title: '是否为空',
          width: '100px',
          formater: function(value, data, index) {
            if (value == "1") {
              return "是"
            } else {
              return "否"
            }
          }
        }, {
          name: 'createTime',
          title: '创建时间',
          width: '200px',
          formater: function(value, data, index) {
            if (!value) {
              return '';
            }
            return Tool.iDate(value, 'yy-mm-dd').string;
          }
        }]
      };
    },
    methods: {
      refresh(){
        this.refreshTable();
      },
      add() {
        this.editID = "";
        this.what = 'addExtendEmployee';
        this.whatShow = true;
      },
      edit() {
        var self = this;
        if (self.selected.length > 1) {
          self.$root.showTip({
            type: 'danger',
            msg: "只能选择单条进行修改",
            duration: 2000
          });
          return;
        }
        if (self.selected.length == 0) {
          self.$root.showTip({
            type: 'danger',
            msg: "请选择单条进行修改",
            duration: 2000
          });
          return;
        }
        self.editID = this.selected[0];
        self.what = "addExtendEmployee";
        self.whatShow = true;
      },
      delete() {
        var self = this;
        if (self.selected.length == 0) {
          self.$root.showTip({
            type: 'danger',
            msg: "请选择数据进行操作",
            duration: 2000
          });
          return;
        }
        self.deletedialogShow = true;
      },
      //删除确认
      confirmed() {
        var self = this;
        store.actions.deleteExtends(self.selected, function(data) {
          self.refreshTable(); //刷新表格
        }, function(error) {
          self.$root.showTip({
            type: 'danger',
            msg: error,
            duration: 2000
          });
        });
      },
      //刷新表格
      refreshTable() {
        this.$refs.table.refresh();
      },
      componentCallBack() {
        this.refreshTable();
      },
    },

    components: {
      addExtendEmployee, //编辑自定义列

    }
};
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
}

.roster-page .quick-info {
  float: left;
}

.roster-page .quick-info strong {
  font-size: 30px;
}

.roster-page .tool {
  float: right;
  width: 275px;
  color: red;
  padding-right: 10px;
  text-align: right;
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
