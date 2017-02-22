<template>
  <div class="roster-page">
    <header class="ui-module-navbar pos-topbar-fixed">
      <div class="ui-module-navbar-content">
        <div class="pull-left">
          <h4><strong>加班工时预警</strong></h4>
        </div>
        <div class="input-group search">
          <ui-search :value.sync="searchFor.userName" :search-callback="searchAtt" placeholder="搜索"></ui-search>
        </div>
      </div>
    </header>
    <section class="warp">
      <main class="main-content">
        <div class="toolbar">
          <div class="quick-info">
            <strong>加班工时预警人数&nbsp;&nbsp;{{total}}&nbsp;&nbsp;人</strong>
          </div>
          <div class="tool" role="group">
            <!-- <div class="toolbar-item">
              <span>日期&nbsp;:</span>
              <ui-datepicker :time.sync="searchFor.sDate" format="yyyy-MM-dd" width="150px"></ui-datepicker>
              <span>到&nbsp;:</span>
              <ui-datepicker :time.sync="searchFor.eDate" format="yyyy-MM-dd" width="150px"></ui-datepicker>
            </div> -->
            <div class="toolbar-item" style="width:200px;">
              <combo-tree class="orgtype" :treedata="org" vali="required" vali-msg="必填项" :multiple="true" :checkable="true" idprop="ID" :rootvisible="false" :nodeclicked="nodeclicked">
                <div data-toggle="dropdown">
                  <div class="choose-input">
                    <input type="text" class="form-control" v-model="orgDisplayName" placeholder="请选择组织" readonly>
                  </div>
                </div>
              </combo-tree>
            </div>
            <button type="button " class="ui-tool-button orgtype" @click="exportExcel">
              <span class="icon icon-tool icon-tool-work pull-left"></span>
              <span class="_name pull-left">导出</span>
            </button>
          </div>
        </div>
        <ui-grid v-ref:table :total.sync="total" :url="url" class="testtable" :append-params="searchFor" selectable="multi" :fields="fields" :perpage="30" :pages="[10,20,30,50]" :btrefresh="true" height="auto"></ui-grid>
      </main>
    </section>
  </div>
</template>
<script>
//导入模块store
import Vue from 'vue'
import store from '../store'

export default {
  data() {
      return {
        total: 0, //员工总数

        state: store.state,
        org: {},
        orgDisplayName: '',

        url: 'api.Dashboard.getOverTimeWarning',

        searchFor: {
          userName: '',
          organizeID: []
            // sDate: '',
            // eDate: ''
        }, //查询关键字
        fields: [{
          name: 'userName',
          title: '姓名',
          width: 100,
          locked: 'first'
        }, {
          name: 'userNum',
          title: '员工工号',
          width: 100,
          locked: 'first'
        }, {
          name: 'userTypeName',
          title: '用工类型',
          width: '100px'
        }, {
          name: 'moreWork',
          title: '加班工时',
          width: '150px',
          formater: function(value, data, index) {
            if (data.overtimeRule == "5") {
              if (!isNaN(data.totalWorkHours) && !isNaN(data.overtimeLimitTime)) {
                return data.totalWorkHours - data.overtimeLimitTime;
              } else {
                return 'N/A';
              }
            }
            else {
              return value;
            }
          }
        }, {
          name: 'ctrl',
          title: '加班预警差异',
          formater: function(value, data, index) {
            if (data.overtimeRule == "5") {
              if (!isNaN(data.totalWorkHours) && !isNaN(data.overtimeWarningTime)) {
                return ((data.totalWorkHours - 0) - (data.overtimeWarningTime - 0)).toFixed(2);
              } else {
                return 'N/A';
              }

            } else {
              if (!isNaN(data.overtimeWarningTime) && !isNaN(data.moreWork)) {
                return ((data.overtimeWarningTime - 0) - (data.moreWork - 0)).toFixed(2);
              } else {
                return 'N/A';
              }
            }
          },
          width: '150px'
        }, {
          name: 'dateTime',
          title: '日期',
          width: '150px',
          formater: function(value, data, index) {
            return Vue.tool.iDate(new Date(), 'yy-mm-dd').string;
          }
        }, {
          name: 'orginName',
          title: '组织',
          width: 200,
        }]
      };
    },
    methods: {
      exportExcel() {
        var param = Object.keys(this.searchFor).map((item) => {
          return item + "=" + this.searchFor[item];
        }).join('&');
        this.$root.downloadFile('acewill/common/card/exportovertimewarning.htm', param);
      },
      searchAtt() {
        this.refreshTable();
      },
      refreshTable() {
        this.$refs.table.refresh();
      },
      nodeclicked(data) {
        this.orgDisplayName = data.map((item) => {
          return item.text
        }).join(',');
        this.searchFor.organizeID = JSON.stringify(data.map((item) => {
          return item.organizeID;
        }));
        this.refreshTable();
      }

    },
    watch: {
      // 'searchFor.sDate': function(a, b) {
      //   if (this.searchFor.sDate != "" && this.searchFor.eDate != "") {
      //     this.refreshTable();
      //   }
      // },
      // 'searchFor.eDate': function(a, b) {
      //   if (this.searchFor.sDate != "" && this.searchFor.eDate != "") {
      //     this.refreshTable();
      //   }
      // }
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
      });
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
  line-height: 50px;
}

.roster-page .quick-info {
  float: left;
}

.roster-page .quick-info strong {
  font-size: 18px;
}

.roster-page .tool {
  float: right;
  width: 330px;
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

.toolbar-item {
  float: left;
  margin-right: 20px;
}

.orgtype {
  vertical-align: middle;
}
</style>
