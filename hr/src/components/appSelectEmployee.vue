<template>
  <ui-modal :show.sync="display" v-if="display" header="选择员工" type="large" hide-footer>
    <div class="wrap">
      <div class="wrap-content">
        <div class="choosecondition">
          <ui-scrollview class="scrollview">
            <div class="search">
              <ui-search :value.sync="searchFor.userName" :search-callback="searchAtt"></ui-search>
            </div>
            <div class="module">
              <label>员工状态</label>
              <ui-tree :data="types" :root="types" :checkable="true" idprop="code" textprop="codeName" :rootvisible="false" :multiple="true" :nodeclicked="typenodeClicked"></ui-tree>
            </div>
            <div class="module">
              <label>组织架构</label>
              <ui-tree :data="org" :root="org" :checkable="true" :expanded="true" idprop="ID" :rootvisible="false" :multiple="true" :nodeclicked="orgnodeClicked"></ui-tree>
            </div>
          </ui-scrollview>
        </div>
        <div class="contentlist">
          <ui-grid v-ref:table :url="url" class="testtable" :append-params="searchFor" :fields="fields" :perpage="30" :selectable="checkType" :pages="[10,20,30,50]" :btrefresh="true" checked="checkType" :selected.sync="selected" height="auto"></ui-grid>
        </div>
      </div>
      <div class="form-actions">
        <div class="row">
          <div class="text-center">
            <ui-button color="accent" @click="confirm">确定</ui-button>
            <ui-button color="default" @click="close">关闭</ui-button>
          </div>
        </div>
      </div>
    </div>
  </ui-modal>
</template>
<script>
import Vue from 'vue'

export default {
  data() {
      return {
        org: {},
        types: {}, //用工类型

        selected: [],
        searchFor: {
          userName: ''
        }, //查询关键字
        callbackInfo: {
          state: "[]",
          organizeID: "[]"
        },
        fields: [{
          name: 'userNum',
          title: '工号',
          locked: 'first'
        }, {
          name: 'userName',
          title: '姓名',
          locked: 'first'
        }, {
          name: 'deptName',
          title: '部门',
        }, {
          name: 'postName',
          title: '岗位',
          width: '100px'
        }, {
          name: 'userTypeName',
          title: '用工类型',
          width: '100px'
        }, {
          name: 'stateName',
          title: '员工状态',
          width: '100px'
        }]
      };
    },
    methods: {
      searchAtt() {
        this.refreshlist();
      },
      //员工状态节点点击
      typenodeClicked(data) {
        if (data instanceof Array) {
          this.callbackInfo.state = "[]";
          this.callbackInfo.state = JSON.stringify(data.map((item) => {
            return item.code
          }));

          Object.assign(this.searchFor, this.callbackInfo, this.params);
          this.refreshlist();
        }
      },
      //组织架构节点点击
      orgnodeClicked(data) {
        if (data instanceof Array) {
          this.callbackInfo.organizeID = "[]";
          this.callbackInfo.organizeID = JSON.stringify(data.map((item) => {
            return item.organizeID
          }));
          Object.assign(this.searchFor, this.callbackInfo, this.params);
          this.refreshlist();
        }
      },
      refreshlist() {
        this.$refs.table.refresh();
      },
      //选择确定
      confirm() {
        let arr = this.$refs.table.getSelections();

        this.display = false;
        this.callback(arr);

      },
      //关闭窗体
      close() {
        this.display = false;
      },

    },
    created() {

      Object.assign(this.searchFor, this.callbackInfo, this.params);
    },
    ready() {
      const Tool = Vue.tool;
      var self = this;
      //加载组织
      var deptPromise = new Promise((resolve, reject) => {
        Tool.ajax({
          url: 'api.Permission.selectDepartment',
          success(deptData, res) {
            resolve(deptData);
          },
          error(res) {
            reject(res);
          }
        });
      });
      var storePromise = new Promise((resolve, reject) => {
        Tool.ajax({
          url: 'api.Permission.selectStore',
          success(storeData, res) {
            resolve(storeData);
          },
          error(res) {
            reject(res);
          }
        });
      });
      var teamPromise = new Promise((resolve, reject) => {
        Tool.ajax({
          url: 'api.OrgEmployee.getAllStoreTeam',
          success(teamData, res) {
            resolve(teamData);
          },
          error(res) {
            reject(res);
          }
        });
      });
      Promise.all([deptPromise, storePromise, teamPromise]).then((val) => {
        var deptData = val[0];
        var storeData = val[1];
        var teamData = val[2];

        if (Array.isArray(teamData)) {
          teamData.forEach(function(elem) {
            elem.nodeType = "team";
            elem.text = elem.teamName;

          });
        }
        if (Array.isArray(storeData)) {
          storeData.forEach(function(elem) {
            if (Array.isArray(teamData)) {
              var childrenButton = teamData.filter(function(item) {
                return item.storeID == elem.ID;
              });
              elem.children = [];
              childrenButton.forEach(function(item) {
                elem.children.push(item);
              });
            }
          });
        }
        if (Array.isArray(deptData)) {
          deptData.forEach(function(elem) {
            elem.nodeType = "department";
            elem.expanded = false;
            elem.text = elem.departmentName;
            if (Array.isArray(storeData)) {
              var childrenButton = storeData.filter(function(item) {
                return item.deptID == elem.ID;
              });
              elem.children = [];
              childrenButton.forEach(function(item) {
                item.nodeType = "store";
                item.text = item.storeName;
                elem.children.push(item);
              });
            }
          });
        }
        // var treeData = Tool.convertToTree(deptData, 'deptID');
        var treeData2 = Tool.convertToTree(deptData)
        var root = {
          ID: -1,
          pageName: '组织树',
          children: [],
          expanded: true
        };
        treeData2.forEach(function(item) {
          item.expanded = true;
          root.children.push(item);
        });

        // 处理没有挂载在部门的 store 
        if (Array.isArray(storeData)) {
          storeData.forEach((elem) => {
            if (!elem.nodeType) {
              elem.text = elem.storeName;
              root.children.push(elem);
            }
          });
        }
        self.org = root;
      }).catch((e) => {
        Vue.tool.showTip({
          type: 'danger', // 提示类型 success,warning,info,danger
          msg: res, // 提示文字
          duration: 1000 // 自动消失时间
        });
      });
      

      Tool.ajax({
        url: 'api.Settings.getSystemConfigData',
        data: {
          defintionCode: '120000',
          // key: key
        },
        success(data, res) {
          var deptTree = Tool.convertToTree(data);
          var rootTree = {
            code: -1,
            codeName: '员工状态',
            expanded: true,
            children: []
          };
          deptTree.forEach((elem) => {
            elem.expanded = true;
            rootTree.children.push(elem);
          });
          self.types = rootTree;
        },
        error(res) {
          self.$root.showTip({
            type: 'danger',
            msg: res,
            duration: 2000
          });
        }
      });
      self.refreshlist();
    },
    props: {
      display: {
        type: Boolean,
        twoWay: true,
        default: false
      },
      url: {
        type: String,
        default: 'api.OrgEmployee.getAllEmployee'
      },
      params: {
        type: Object,
        default: () => {}
      },
      checkType: {
        type: String,
        default: 'single' //multi
      },
      //查询值回调
      callback: {
        type: Function,
        default: function() {}
      }
    }
};
</script>
<style lang="css" scoped>
.wrap {
  position: relative;
  height: 500px;
  overflow: hidden;
  margin: -30px -24px -24px;
}

.wrap-content {
  position: absolute;
  bottom: 60px;
  top: 0px;
  left: 0px;
  right: 0px;
  border-bottom: 1px solid #ccc;
}

.choosecondition {
  position: absolute;
  left: 0px;
  width: 30%;
  height: 100%;
  box-sizing: border-box;
  border-right: 1px solid #ccc;
  overflow: hidden;
}

.contentlist {
  position: absolute;
  width: 70%;
  top: 0px;
  right: 0px;
  height: 100%;
}

.testtable {
  padding: 10px;
}

.scrollview {
  overflow: hidden;
}

.search {
  padding: 5px 15px 5px;
}

.module {
  padding: 5px 15px 5px;
}

.form-actions {
  width: 100%;
  position: absolute;
  text-align: center;
  bottom: 10px;
}
</style>
