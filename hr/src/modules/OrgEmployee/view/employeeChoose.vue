<template>
  <ui-sidebar :show.sync="display" title="员工筛选" layout="header-content">
    <div slot="content">
      <div class="module">
        <label>用工类型</label>
        <ui-tree :data="relations" :root="relations" :checkable="true" idprop="code" textprop="codeName" :rootvisible="false" :multiple="true" :nodeclicked="relationnodeClicked"></ui-tree>
      </div>
      <div class="module" v-if="displayuserstate">
        <label>员工状态</label>
        <ui-tree :data="types" :root="types" :checkable="true" idprop="code" textprop="codeName" :rootvisible="false" :multiple="true" :nodeclicked="typenodeClicked"></ui-tree>
      </div>
      <div class="module">
        <ui-tree :data="org" :root="org" :checkable="true" :expanded="true" idprop="ID" :rootvisible="false" :multiple="true" :nodeclicked="orgnodeClicked"></ui-tree>
      </div>
    </div>
  </ui-sidebar>
</template>
<script>
import Vue from 'vue'
import store from '../store'
const Tool = Vue.tool;

export default {
  data() {
      return {
        org: {},
        relations: {}, //用工类型
        types: {}, //用工类型
        callbackInfo: {
          userType: "[]",
          state: "[]",
          organizeID: "[]"
        }
      };
    },
    methods: {
      //用工类型点击
      relationnodeClicked(data) {
        if (data instanceof Array) {
          this.callbackInfo.userType = "[]";
          this.callbackInfo.userType = JSON.stringify(data.map((item) => {
            return item.code
          }));
          this.chooseCallBack(this.callbackInfo);
        }
      },
      //用工类型点击
      typenodeClicked(data) {
        if (data instanceof Array) {
          this.callbackInfo.state = "[]";
          this.callbackInfo.state = JSON.stringify(data.map((item) => {
            return item.code
          }));
          this.chooseCallBack(this.callbackInfo);
        }
      },
      //组织点击
      orgnodeClicked(data) {
        if (data instanceof Array) {
          this.callbackInfo.organizeID = "[]";
          this.callbackInfo.organizeID = JSON.stringify(data.map((item) => {
            return item.organizeID
          }));
          this.chooseCallBack(this.callbackInfo);
        }
      }
    },
    ready() {
      var self = this;
      //加载组织
      store.actions.loadOrgListTree(function(data) {
        self.org = data;
      }, function(error) {
        self.$root.showTip({
          type: 'danger',
          msg: error,
          duration: 2000
        });
      });
      store.actions.findSystemConfig('100000', function(data) {
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
      }, function(error) {
        self.$root.showTip({
          type: 'danger',
          msg: error,
          duration: 2000
        });
      })
      store.actions.findSystemConfig('120000', function(data) {
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
      }, function(error) {
        self.$root.showTip({
          type: 'danger',
          msg: error,
          duration: 2000
        });
      })
    },
    props: {
      display: {
        type: Boolean,
        default: false
      },
      displayuserstate:{
        type:Boolean,
        default:true
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
