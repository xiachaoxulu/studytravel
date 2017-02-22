<!--
* @Created Date       : 2016-11-15T11:51:01+08:00
* @Last Modified time : 2016-12-05T17:54:47+08:00
 -->
<template>
  <div class="roster-page">
    <header class="ui-module-navbar pos-topbar-fixed">
      <div class="ui-module-navbar-content">
        <div class="pull-left">
          <h4><strong>考勤机管理</strong></h4>
        </div>
        <div class="pull-right top-tool">
          <button type="button" class="ui-tool-button" @click="refresh">
            <span class="icon icon-tool icon-tool-refresh pull-left"></span>
            <span class="_name pull-left">刷新</span>
          </button>
          <button type="button" class="ui-tool-button" @click="add">
            <span class="icon icon-tool icon-tool-add pull-left"></span>
            <span class="_name pull-left">添加</span>
          </button>
          <button type="button" class="ui-tool-button" @click="update">
            <span class="icon icon-tool icon-tool-edit pull-left"></span>
            <span class="_name pull-left">编辑</span>
          </button>
          <button type="button" class="ui-tool-button" @click="delete">
            <span class="icon icon-tool icon-tool-delete pull-left"></span>
            <span class="_name pull-left">删除</span>
          </button>
          <v-dropdown class="ui-tool-dropdown" trigger="click">
            <button type="button" data-toggle="dropdown" class="ui-tool-button">
              <span class="icon icon-tool icon-tool-more pull-left"></span>
              <span class="_name pull-left">更多</span>
            </button>
            <ul class="dropdown-menu">
              <li>
                <a name="dropdown-item" href="javascript:void(0)" @click="commandQuery">命令查询</a>
              </li>
              <li>
                <a name="dropdown-item" href="javascript:void(0)" @click="collectInfo">收集人员信息</a>
              </li>
            </ul>
          </v-dropdown>
        </div>
      </div>
    </header>
    <section class="warp">
      <main class="main-content">
        <div class="toolbar">
          <combo-tree class="orgtype" :treedata="org" vali="required" vali-msg="必填项" :multiple="true" :checkable="true" idprop="ID" :rootvisible="false" :nodeclicked="nodeclicked">
            <div data-toggle="dropdown">
              <div class="choose-input">
                <input type="text" class="form-control" v-model="orgDisplayName" placeholder="请选择组织" readonly>
                <i class="icon-tool icon-tool-search"></i>
              </div>
            </div>
          </combo-tree>
          <ui-buttongroup active-class="btn-primary" class="state">
            <button type="button" class="btn btn-primary" @click="changeState(1)">正常</button>
            <button type="button" class="btn btn-default" @click="changeState(4)">脱机</button>
          </ui-buttongroup>
          <ui-search :value.sync="searchFor.key" :search-callback="searchcallback" class="pull-right state" placeholder="序列号,设备别名"></ui-search>
        </div>
        <ui-grid :reader="reader" v-ref:table class="testtable" :total.sync="total" :url="url" :append-params="searchFor" selectable="multi" :fields="fields" :perpage="30" :pages="[10,20,30,50]" :btrefresh="true" checked="multi" :selected.sync="selected" height="auto"></ui-grid>
      </main>
      <ui-confirm @confirmed="confirmed" confirm-button-text="是" deny-button-text="否" :show.sync="deletedialogShow" close-on-confirm header="提示">
        数据删除不可恢复,是否继续
      </ui-confirm>
      <components :is="what" :display.sync="whatShow" :id="ID" v-if="whatShow" :component-call-back="componentCallBack">
      </components>
    </section>
    <ui-sidecontent :show.sync="dymicshow">
      <components v-if="dymicshow" :is="dymicwhat" :display.sync="dymicshow">
      </components>
    </ui-sidecontent>
  </div>
</template>
<script>
import Vue from 'vue'
import store from '../store'
import addMachine from './addMachine'
import commandQuery from './commandQuery'
import collectInfo from './collectInfo'
const Tool = Vue.tool;


export default {
  data() {
      return {
        url: 'api.Settings.getMachineList', //
        what: '',
        whatShow: false,
        dymicshow: false,
        dymicwhat: '',
        reader: {
          idProperty: 'id',
          successProperty: 'success', // 成功
          errmsgProperty: 'err_msg', // 失败提示
          totalProperty: 'result.recordCount', // 数据总量
          rootProperty: 'result.recordList', // 数据
        },
        display: false,

        org: {},
        orgDisplayName: '',

        total: 0, //总数
        //要编辑的ID
        ID: '',
        deletedialogShow: false, //删除提示框,默认不显示
        selected: [],
        searchFor: {
          key: '',
          state: 1,
          orgID: ''
        }, //查询关键字
        fields: [{
          name: 'sn',
          width: 150,
          title: '序列号',
          locked: 'first'
        }, {
          name: 'orgName',
          title: '归属组织',
          width: 200,
        }, {
          name: 'displayName',
          title: '设备别名',
          width: 100
        }, {
          name: 'state',
          title: '状态',
          width: 100,
          formater: function(value, data, index) {
            var str = "";
            switch (value) {
              case '1':
                str = '正常';
                break;
              case '2':
                str = '禁用';
                break;
              case '3':
                str = '通信中';
                break;
              case '4':
                str = '脱机';
                break;
            }
            return str;
          }
        }, {
          name: 'address',
          title: '所在位置',
          width: 100
        }, {
          name: 'type',
          title: '类型',
          width: 100
        }, {
          name: 'vendor',
          title: '厂商',
          width: 100
        }, {
          name: 'onlineTime',
          title: '最近联机时间',
          width: 200,
          formater: function(value, data, index) {
            if (!value) {
              return '';
            }
            return Tool.iDate(value, 'yy-mm-dd hh:mm:ss').string;
          }
        }, {
          name: 'userNumber',
          title: '用户数',
          width: 100
        }, {
          name: 'recordNumber',
          title: '记录数',
          width: 100
        }, {
          name: 'fingerNumber',
          title: '指纹数',
          width: 100
        }, {
          name: 'faceNumber',
          title: '面部数',
          width: 100
        }, {
          name: 'version',
          title: '固定版本',
          width: 100
        }, {
          name: 'recordSize',
          title: '记录容量',
          width: 100
        }, {
          name: 'userSize',
          title: '用户容量',
          width: 100
        }, {
          name: 'des',
          title: '备注',
          width: 100
        }],
      }

    },
    methods: {
      commandQuery() {
        this.dymicwhat = "commandQuery";
        this.dymicshow = true;
      },
      collectInfo() {
        this.what = "collectInfo";
        this.whatShow = true;
      },
      componentCallBack() {
        this.refreshTable();
      },

      nodeclicked(data) {
        this.orgDisplayName = data.map((item) => {
          return item.text
        }).join(',');
        this.searchFor.orgID = JSON.stringify(data.map((item) => {
          return item.organizeID;
        }));
        this.refreshTable();
      },
      //搜索回调
      searchcallback() {
        this.refreshTable();
      },
      //切换状态
      changeState(val) {
        this.searchFor.state = val;
        this.refreshTable();
      },
      //刷新
      refresh() {
        this.refreshTable();
      },
      //刷新表格
      refreshTable() {
        this.$refs.table.refresh();
      },
      add() {
        this.ID = "";
        this.what = "addMachine";
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

        self.ID = this.selected[0];
        self.what = "addMachine";
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
        store.actions.deleteMachines(self.selected, function(data) {
          self.refreshTable(); //刷新表格
        }, function(error) {
          self.$root.showTip({
            type: 'danger',
            msg: error,
            duration: 2000
          });
        });
      }
    },
    ready() {
      var self = this;
      store.actions.loadOrgListTree(function(data) {
        self.org = data;
      }, function(error) {
        self.$root.showTip({
          type: 'danger',
          msg: error,
          duration: 2000
        });
      })
    },
    components: {
      addMachine,
      commandQuery,
      collectInfo
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
  width: 345px;
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

.top-tool {
  margin-right: 50px;
}

.orgtype {
  width: 200px;
  margin-right: 50px;
  float: left;
}

.choose-input {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  font-family: 'Microsoft YaHei', serif;
  width: 100%;
}

.choose-input > input {
  font-family: 'Microsoft YaHei', serif;
  color: #666;
  box-sizing: border-box;
  outline: none;
  padding: 0 30px 0 7px;
  font-size: 13px;
  width: 100%;
  cursor: pointer;
  background: #fff;
}

.choose-input > i {
  display: inline-block;
  position: absolute;
  width: 30px;
  height: 30px;
  top: 4px;
  right: 0;
  color: #999;
}

.state {
  margin-top: 3px;
}
</style>
