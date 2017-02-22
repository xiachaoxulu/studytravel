<template>
  <ui-sidebar :show.sync="display" title="员工筛选" layout="header-content">
    <div slot="content">
      <div class="module">
        <ui-tree :data="org" :root="org" :checkable="true" :expanded="true" idprop="ID" :rootvisible="false" :multiple="true" :checkstrict="true" :nodeclicked="orgnodeClicked"></ui-tree>
      </div>
      <div class="module">
        <label>用工类型</label>
        <ui-tree :data="relations" :root="relations" :checkable="true" idprop="code" textprop="codeName" :rootvisible="false" :multiple="true" :nodeclicked="relationnodeClicked"></ui-tree>
      </div>
      <div class="module" v-if="displayuserstate">
        <label>员工状态</label>
        <ui-tree :data="types" :root="types" :checkable="true" idprop="code" textprop="codeName" :rootvisible="false" :multiple="true" :nodeclicked="typenodeClicked"></ui-tree>
      </div>
      <div class="module" v-if="displayrule==2">
        <label>考勤规则</label>
        <ui-tree :data="rules" :root="rules" :checkable="true" idprop="ID" textprop="checkworkName" :rootvisible="false" :multiple="false" :nodeclicked="rulenodeClicked"></ui-tree>
      </div>
    </div>
  </ui-sidebar>
</template>
<script>
import Vue from 'vue'


export default {
  data() {
      return {
        org: {},
        relations: {}, //用工关系
        types: {}, //用工类型
        rules: {}, //考勤规则
        callbackInfo: {
          userType: "[]",
          state: "[]",
          organizeID: "[]"
        }
      };
    },
    watch: {
      'displayrule': function(a, b) {
        if (a == 2) {
          // this.chooseCallBack(this.callbackInfo);
        }
      }
    },
    methods: {
      callback() {
        if (!this.displayuserstate) {
          delete this.callbackInfo.userType;
        }
        if (!this.displayrule && !!this.callbackInfo.checkworkRuleId) {
          delete this.callbackInfo.checkworkRuleId;
        }
        this.chooseCallBack(this.callbackInfo);
      },
      //用工关系点击
      relationnodeClicked(data) {
        if (data instanceof Array) {
          this.callbackInfo.userType = "[]";
          this.callbackInfo.userType = JSON.stringify(data.map((item) => {
            return item.code
          }));
          this.callback();
        }
      },
      //用工类型点击
      typenodeClicked(data) {
        if (data instanceof Array) {
          this.callbackInfo.state = "[]";
          this.callbackInfo.state = JSON.stringify(data.map((item) => {
            return item.code
          }));
          this.callback();
        }
      },
      //组织点击
      orgnodeClicked(data) {
        if (data instanceof Array) {
          this.callbackInfo.organizeID = "[]";
          this.callbackInfo.organizeID = JSON.stringify(data.map((item) => {
            return item.organizeID
          }));
          this.callback();
        }
      },
      rulenodeClicked(data) {
        if (data instanceof Array && data.length > 0) {
          this.callbackInfo.checkworkRuleId = "";
          this.callbackInfo.checkworkRuleId = data[0].ID;
          this.chooseCallBack(this.callbackInfo);
        } else {
          this.callbackInfo.checkworkRuleId = "";
          this.chooseCallBack(this.callbackInfo);
        }
      }
    },

    ready() {
      const Tool = Vue.tool;




      var self = this;

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
          defintionCode: '100000',
          // key: key
        },
        success(data, res) {
          var deptTree = Tool.convertToTree(data);
          var rootTree = {
            code: -1,
            codeName: '用工类型',
            expanded: true,
            children: []
          };
          deptTree.forEach((elem) => {
            elem.expanded = true;
            rootTree.children.push(elem);
          });
          self.relations = rootTree;
        },
        error(res) {
          self.$root.showTip({
            type: 'danger',
            msg: res,
            duration: 2000
          });
        }
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
      if (this.displayrule != 0) {
        self.$Tool.ajax({
          url: 'api.Settings.getAttendanceOnRuleList',
          success(data, res) {
            var deptTree = self.$Tool.convertToTree(data);
            var rootTree = {
              code: -1,
              codeName: '考勤规则',
              expanded: true,
              children: []
            };
            deptTree.forEach((elem) => {
              elem.checked = false;
              elem.expanded = true;
              rootTree.children.push(elem);
            });
            self.rules = rootTree;
            // if (self.rules.children && self.rules.children.length > 0) {
            //   self.rules.children[0].checked = true;
            //   self.callbackInfo.checkworkRuleId = "";
            //   self.callbackInfo.checkworkRuleId = self.rules.children[0].ID;
            //   if (self.displayrule == 2) {
            //     self.chooseCallBack(self.callbackInfo);
            //   }
            // }
          },
          error(res) {
            self.$root.showTip({
              type: 'danger',
              msg: res,
              duration: 2000
            });
          }
        });
      }
    },
    props: {
      display: {
        type: Boolean,
        default: false
      },
      displayuserstate: {
        type: Boolean,
        default: true
      },
      displayrule: {
        type: Number,
        default: 0
      },
      chooseCallBack: {
        type: Function,
        default: function() {}
      }
    }
};
</script>
<style lang="css" scoped>
.module {
  border-top: 1px #ccc solid;
  margin-top: 20px;
  padding: 10px;
}

label {
  text-indent: 1.5em;
}
</style>
