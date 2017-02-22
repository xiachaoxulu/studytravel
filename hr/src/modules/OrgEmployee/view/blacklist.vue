<template>
  <div class="roster-page">
    <header class="ui-module-navbar pos-topbar-fixed">
      <div class="ui-module-navbar-content">
        <div class="pull-left">
          <h4><strong>黑名单</strong></h4>
        </div>
        <div class="input-group search">
          <input v-model="searchFor.userName" class="form-control">
          <span class="input-group-btn">
                    <button @click="refreshTable" class="btn btn-primary" __code="org-blacklist-search/搜索">搜索</button>
          </span>
        </div>
        <button type="button" class="ui-tool-button" __code="org-blacklist-filter/筛选" @click="choose">
          <span class="icon icon-tool icon-tool-filter pull-left"></span>
          <span class="_name pull-left">筛选</span>
        </button>
      </div>
    </header>
    <section class="warp">
      <main class="main-content">
        <div class="toolbar">
          <div class="quick-info">
            <strong>{{total}}</strong>&nbsp;&nbsp;&nbsp;<span>条记录</span>
          </div>
          <div class="tool" role="group">
            <button type="button " class="ui-tool-button" @click="add" __code="org-blacklist-add/添加">
              <span class="_name pull-left">添加</span>
            </button>
            <button type="button " class="ui-tool-button" @click="update" __code="org-blacklist-edit/编辑">
              <span class="_name pull-left">编辑</span>
            </button>
            <button type="button " class="ui-tool-button" @click="delete" __code="org-blacklist-del/删除">
              <span class="_name pull-left">移出</span>
            </button>
            <v-dropdown class="ui-tool-dropdown" trigger="click">
              <button type="button" data-toggle="dropdown" class="ui-tool-button">
                <span class="_name pull-left">更多</span>
              </button>
              <ul class="dropdown-menu">
                <li __code="org-blacklist-import/导入">
                  <a href="javascript:void(0)">导入</a>
                </li>
                <li __code="org-blacklist-export/导出">
                  <a href="javascript:void(0)" @click="exportExcel">导出</a>
                </li>
                <li __code="org-blacklist-print/打印">
                  <a href="javascript:void(0)">打印</a>
                </li>
              </ul>
            </v-dropdown>
          </div>
        </div>
        <ui-grid v-ref:table class="testtable" :total.sync="total" :url="url" :append-params="searchFor" selectable="multi" :fields="fields" :perpage="30" :pages="[10,20,30,50]" :btrefresh="true" checked="multi" :selected.sync="selected" height="auto" table-title="黑名单" table-name="blackListTable" :column-config="$root.columnConfig"></ui-grid>
      </main>
      <ui-confirm @confirmed="confirmed" confirm-button-text="是" deny-button-text="否" :show.sync="deletedialogShow" close-on-confirm header="提示">
        员工从黑名单移出后可正常办理入职，是否继续？
      </ui-confirm>
      <components :is="what" :display.sync="whatShow" v-if="whatShow" :ID="ID" :office-edit-call-back="officeEditCallBack">
      </components>
      <app-employee-choose :display.sync="chooseShow" :choose-call-back="chooseCallBack"></app-employee-choose>
    </section>
  </div>
</template>
<script>
import Vue from 'vue'
import store from '../store'
import addBlacklist from './addBlacklist'
const Tool = Vue.tool;


export default {
  data() {
      return {
        url: 'api.OrgEmployee.getBlackList', //查询转正url
        what: '',
        whatShow: false,

        chooseShow: false,
        total: 0, //总数
        //要编辑的ID
        ID: '',
        deletedialogShow: false, //删除提示框,默认不显示
        selected: [],
        searchFor: {
          userName: ''
        }, //查询关键字
        fields: [{
          name: 'userNum',
          width: 150,
          title: '员工工号',
          locked: 'first'
        }, {
          name: 'userName',
          title: '姓名',
          width: 150,
          locked: 'first'
        }, {
          name: 'ctrl',
          title: '组织',
          formater: function(value, data, index) {
            var org = data.deptName;
            if (data.storeName) {
              org += "/" + data.storeName;
            }
            if (data.teamName) {
              org += "/" + data.teamName;
            }
            return org;
          },
          width: 200
        }, {
          name: 'rzTime',
          title: '入职日期',
          width: 200
        }, {
          name: 'blackReason',
          title: '黑名单原因',
          width: 200
        }, {
          name: 'operatorName',
          title: '提交人',
          width: 100
        }, {
          name: 'createTime',
          title: '提交日期',
          formater: function(value, data, index) {
            return Tool.iDate(value, 'yy-mm-dd').string;
          },
          width: 100
        }],
      }

    },
    methods: {

      exportExcel() {
        //postc参数转get
        var param = Object.keys(this.searchFor).map((item) => {
          return item + "=" + this.searchFor[item];
        }).join('&');
        this.$root.downloadFile('acewill/basedata/blacklist/selectExcel.htm',param);
      },
      //筛选回调
      chooseCallBack(data) {
        Object.assign(this.searchFor, data);
        this.$refs.table.refresh();
      },
      //刷新表格
      refreshTable() {
        this.$refs.table.refresh();
      },
      add() {
        this.ID = "";
        this.what = "addBlacklist";
        this.whatShow = true;
      },
      update() {
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
        if (self.$refs.table.getSelections()[0].state == "已提交") {
          self.$root.showTip({
            type: 'danger',
            msg: "已提交数据不能修改",
            duration: 2000
          });
          return;
        }
        self.ID = this.selected[0];
        self.what = "addBlacklist";
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
        store.actions.deleteBlackList(self.selected, function(data) {
          self.refreshTable(); //刷新表格
        }, function(error) {
          self.$root.showTip({
            type: 'danger',
            msg: error,
            duration: 2000
          });
        });
      },
      //筛选员工
      choose() {
        this.chooseShow = true;
      },
      //编辑转正回调
      officeEditCallBack(data) {
        this.refreshTable();
      }
    },
    components: {
      addBlacklist
    }
}
</script>
<style scoped>
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
