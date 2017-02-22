<template>
  <div class="roster-page">
    <header class="ui-module-navbar pos-topbar-fixed">
      <div class="ui-module-navbar-content">
        <div class="pull-left">
          <h4><strong>员工宿舍</strong></h4>
        </div>
        <div class="input-group search">
          <input v-model="searchFor.dormitoryCode" class="form-control">
          <span class="input-group-btn">
                    <button @click="refreshTable" class="btn btn-primary" __code="org-dormitory-search/搜索">搜索</button>
                </span>
        </div>
      </div>
    </header>
    <section class="warp">
      <main class="main-content">
        <div class="toolbar">
          <div class="quick-info">
            <strong>{{total}}</strong>&nbsp;&nbsp;&nbsp;<span>个(所有宿舍)</span>
          </div>
          <div class="tool" role="group">
            <button type="button " class="ui-tool-button" @click="add" __code="org-dormitory-add/添加">
              <span class="_name pull-left">添加</span>
            </button>
            <button type="button " class="ui-tool-button" @click="update" __code="org-dormitory-edit/编辑">
              <span class="_name pull-left">编辑</span>
            </button>
            <button type="button " class="ui-tool-button" @click="delete" __code="org-dormitory-del/删除">
              <span class="_name pull-left">删除</span>
            </button>
            <v-dropdown class="ui-tool-dropdown" trigger="click" >
              <button type="button" data-toggle="dropdown" class="ui-tool-button">
                <span class="_name pull-left">更多</span>
              </button>
              <ul class="dropdown-menu">
                <li __code="org-dormitory-import/导入">
                  <a href="javascript:void(0)" >导入</a>
                </li>
                <li  __code="org-dormitory-export/导出">
                  <a href="javascript:void(0)">导出</a>
                </li>
                <li __code="org-dormitory-print/打印">
                  <a href="javascript:void(0)" >打印</a>
                </li>
              </ul>
            </v-dropdown>
          </div>
        </div>
        <ui-grid :total.sync="total" v-ref:table class="testtable" :nopaging="true" :append-params="searchFor" selectable="multi" :fields="fields" :perpage="30" :pages="[10,20,30,50]" :btrefresh="true" checked="multi" :selected.sync="selected" height="auto" :url="url" table-title="员工宿舍" table-name="dormitoryTable" :column-config="$root.columnConfig"></ui-grid>
      </main>
      <ui-confirm @confirmed="confirmed" confirm-button-text="是" deny-button-text="否" :show.sync="deletedialogShow" close-on-confirm header="提示">
        数据删除不可恢复,是否继续
      </ui-confirm>
      <add-dormitory :type="type" :ID="ID" :display.sync="display" :callback="callback">
      </add-dormitory>
    </section>
  </div>
</template>
<script>
import Vue from 'vue'
import addDormitory from './addDormitory'
import store from '../store'
export default {
  data() {
      return {
        total: 0,
        url: 'api.OrgEmployee.getDormitory',
        deletedialogShow: false, //删除提示框,默认不显示
        type: 'add', //add 新增,update 修改
        display: false,
        selected: [],
        ID: '',
        showError: false, //错误提示框
        errorMsg: '', //错误提示信息
        searchFor: {
          dormitoryCode: ''
        },
        fields: [{
          name: 'dormitoryCode',
          title: '宿舍编码',
          locked: 'first'
        }, {
          name: 'address',
          title: '地址'
        }, {
          name: 'bedCount',
          title: '床位数'
        }, {
          name: 'inNum',
          title: '入住人数'
        }, {
          name: 'surplusNum',
          title: '剩余床位'
        }, {
          name: 'landlordName',
          title: '房东'
        }, {
          name: 'bankNo',
          title: '银行账号'
        }, {
          name: 'openBank',
          title: '开户银行'
        }, {
          name: 'rent',
          title: '租金'
        }, {
          name: 'startTime',
          title: '起租日期'
        }, {
          name: 'endTime',
          title: '到期日期'
        }]
      }
    },
    methods: {
      //刷新表格
      refreshTable() {
        this.$refs.table.refresh();
      },
      callback() {
        this.$refs.table.refresh();
      },
      add() {
        this.ID = "";
        this.type = 'add';
        this.display = true;
      },
      update() {
        var self = this;
        if (self.selected.length > 1) {
          self.$root.showTip({
            type: 'danger',
            msg: '只能选择单条进行修改',
            duration: 2000
          });
          return;
        }
        if (self.selected.length == 0) {
          self.$root.showTip({
            type: 'danger',
            msg: '请选择单条进行修改',
            duration: 2000
          });
          return;
        }
        self.ID = self.selected[0];
        self.type = 'update';
        this.display = true;
      },
      delete() {
        var self = this;
        if (self.selected.length == 0) {
          self.$root.showTip({
            type: 'danger',
            msg: '请选择数据进行操作',
            duration: 2000
          });
          return;
        }
        self.deletedialogShow = true;
      },

      //删除确认
      confirmed() {
        var self = this;
        store.actions.deleteDormitory(self.selected, function(data) {
          self.refreshTable();
        }, function(error) {
          self.$root.showTip({
            type: 'danger',
            msg: error,
            duration: 2000
          });
        });
      }
    },
    components: {
      addDormitory
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
