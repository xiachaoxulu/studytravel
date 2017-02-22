<template>
  <div class="system-page">
    <header class="ui-module-navbar pos-topbar-fixed">
      <div class="ui-module-navbar-content">
        <div class="pull-left">
          <h4><strong>表单必填项设置</strong></h4>
        </div>
      </div>
    </header>
    <section class="warp">
      <nav class="nav-aside">
        <ui-scrollview>
          <div class="list-group">
            <a v-for="item in tables" class="list-group-item" v-bind:class="{ 'active': activeValue===item.tableNameEn}" @click="changeItem(item)"><span>{{item.tableNameCh}}</span></a>
          </div>
        </ui-scrollview>
      </nav>
      <main class="main-content">
        <ui-table v-ref:table height="auto" class="com-table-wrap" :loading="loading">
          <template slot="headerLockedFirst">
            <table class="table table-bordered">
              <colgroup>
                <col width="200px" />
              </colgroup>
              <thead>
                <tr>
                  <th>字段英文名</th>
                  <th></th>
                </tr>
              </thead>
            </table>
          </template>
          <template slot="headerNormal">
            <table class="table table-bordered">
              <colgroup>
                <col width="200px"></col>
                <col width="200px"></col>
              </colgroup>
              <thead>
                <tr>
                  <th>字段中文名</th>
                  <th>状态</th>
                </tr>
              </thead>
            </table>
          </template>
          <template slot="headerLockedLast">
            <table class="table table-bordered">
              <colgroup>
                <col width="100px" />
              </colgroup>
              <thead>
                <tr>
                  <th>操作</th>
                </tr>
              </thead>
            </table>
          </template>
          <template slot="bodyLockedFirst">
            <table class="table table-bordered">
              <colgroup>
                <col width="200px"></col>
              </colgroup>
              <tbody>
                <template v-for="column in tableColumnList">
                  <tr>
                    <td>{{column.fieldNameEn}}</td>
                  </tr>
                </template>
              </tbody>
            </table>
          </template>
          <template slot="bodyNormal">
            <table class="table table-bordered">
              <colgroup>
                <col width="200px"></col>
                <col width="200px"></col>
              </colgroup>
              <tbody>
                <template v-for="column in tableColumnList">
                  <tr>
                    <td>{{column.fieldNameCh}}</td>
                    <td>{{column.valid | validfilter}}</td>
                  </tr>
                </template>
              </tbody>
            </table>
          </template>
          <template slot="bodyLockedLast">
            <table class="table table-bordered">
              <colgroup>
                <col width="100px" />
              </colgroup>
              <tbody>
                <template v-for="column in tableColumnList">
                  <tr>
                    <td>
                      <ui-switch name="s1" :value.sync="column.valid | ruleValid column" checked></ui-switch>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </template>
        </ui-table>
      </main>
    </section>
  </div>
</template>
<script>
//导入模块store
import store from '../store.js'
import Vue from 'vue'
const Tool = Vue.tool;

export default {
  data() {
      return {
        tableColumnList: [],
        tables: [],
        state: store.state,
        activeValue: '',
        loading: true
      };
    },
    filters: {
      validfilter(data) {
        switch (data) {
          case 0:
            return '必填';
          case 1:
            return '非必填';
          case 2:
            return '默认';
          default:

            return data ? '必填' : '非必填';
        }
      },
      ruleValid(value, column) {
            console.log('ruleValid')
            var self = this;
            if (value === true || value === false) {

                store.actions.updateTableColumnInfo({
                    id: column.id,
                    valid: value ? 0 : 1
                }, function(data) {

                    self.loading = true;
                    store.actions.getTableColumnInfo({
                        tableNameEn: self.activeValue
                    }, function(data) {
                        self.tableColumnList = data;
                        self.loading = false;
                        self.$nextTick(()=>{
                            self.$refs.table.refresh();
                        })
                    }, function(error) {
                        self.$root.showTip({
                            type: 'danger',
                            msg: error,
                            duration: 2000
                        });
                        self.loading = false;
                    })

                    self.$root.showTip({
                        type: 'info',
                        msg: '操作成功！',
                        duration: 2000
                    });
                }, function(error) {
                    self.$root.showTip({
                        type: 'danger',
                        msg: error,
                        duration: 2000
                    });
                })

                return value;
            } else {
                return value == '0';
            }
        }
    },
    methods: {
      //切换左侧的表
      changeItem(item) {
        var self = this;
        this.activeValue = item.tableNameEn;



        store.actions.getTableColumnInfo({
          tableNameEn: self.activeValue
        }, function(data) {
          self.tableColumnList = data;

          self.$nextTick(() => {
            self.$refs.table.refresh();
          })

        }, function(error) {
          self.$root.showTip({
            type: 'danger',
            msg: error,
            duration: 2000
          });
        })
      }
    },
    ready() {
      var self = this;

      self.loading = true;
      var syncdataP = new Promise(function(resolve, reject) {
        store.actions.getSyncData(function(data) {
          self.loading = false;
          resolve(data);
        }, function(error) {
          self.loading = false;
          self.$root.showTip({
            type: 'danger',
            msg: '同步数据失败',

            duration: 2000
          });
          reject(error);
        })
      });

      syncdataP.then(function() {
        store.actions.getTableInfo(function(data) {
          self.tables = data;

        }, function(error) {
          self.$root.showTip({
            type: 'danger',
            msg: '同步数据失败',
            duration: 2000
          });
        })
      });
    }
}
</script>
<style lang="css" scoped>
.system-page,
.warp {
  height: 100%;
  overflow: hidden;
}

.system-page .warp {
  background-color: #fff;
  position: relative;
}

.system-page .nav-aside {
  width: 150px;
  padding: 10px;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  overflow: hidden;
}

.system-page .list-group {
  text-align: center;
  cursor: pointer;
  overflow-x: hidden;
}

.system-page .toolbar {
  position: absolute;
  height: 40px;
  top: 10px;
  left: 0;
  width: 100%;
  overflow: hidden;
}

.system-page .tool {
  position: absolute;
  left: 0;
  top: 0;
  width: 200px;
  text-align: right;
}

.system-page .search {
  position: absolute;
  left: 210px;
  top: 0;
  width: 400px;
}

.system-page .main-content {
  position: absolute;
  padding: 10px;
  left: 160px;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>
