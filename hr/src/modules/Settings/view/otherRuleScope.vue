<!--
* @Created Date       : 2016-11-10T18:31:55+08:00
* @Last Modified time : 2016-12-05T17:35:31+08:00
 -->


<template>
  <div class="yearpage">
    <header class="ui-module-navbar pos-topbar-fixed">
      <div class="ui-module-navbar-content">
        <div class="pull-left">
          <h4><span>其他规则</span> <strong>{{name}}</strong><span>,员工范围</span></h4>
        </div>
      </div>
    </header>
    <section class="warp">
      <main class="main-content">
        <ui-grid v-ref:table :url="url" class="testtable" :append-params="searchFor" selectable="multi" :fields="fields" :datalist="rosterList" :perpage="30" :pages="[10,20,30,50]" :btrefresh="true" checked="multi" height="auto" tdheight="50px"></ui-grid>
      </main>
    </section>
  </div>
</template>
<script>
//导入模块store
import Vue from 'vue'
import store from '../store.js'


export default {
  data() {
      return {
        url: 'api.Settings.getOtherRuleScope', //根据年假ID查询员工URL
        searchFor: {
          Id: ''
        },
        fields: [{
          name: 'userNum',
          title: '员工工号',
          width: 100,
          locked: 'first'
        }, {
          name: 'userName',
          title: '姓名',
          width: 100,
          locked: 'first'
            // ,
            // formater: function(value, data, index) {
            //   return '<a class="btn btn-default" onclick="roster.employeeItemClick(\'' + data.ID + '\')">' + value + '</a>'
            // }
        }, {
          name: 'userTypeName',
          title: '用工类型',
          width: '100px'
        }, {
          name: 'stateName',
          title: '员工状态',
          width: '100px'
        }, {
          name: 'healthEndTime',
          title: '健康证到期日',
          width: '150px'
        }, {
          name: 'ctrl1',
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
          width: 200,
        }, {
          name: 'positionName',
          title: '职位',
          width: 100
        }, {
          name: 'postName',
          title: '岗位',
          width: '100px'
        }, {
          name: 'userIDCard',
          title: '身份证号',
        }, {
          name: 'birthDay',
          title: '生日',
        }, {
          name: 'genderName',
          title: '性别',
          width: '100px'
        }, {
          name: 'nationName',
          title: '民族',
          width: '100px'
        }, {
          name: 'bankCard',
          title: '银行卡号',
        }]
      };
    },
    methods: {


    },
    created() {
      this.searchFor.Id = this.id;
    },
    ready() {},
    props: {
      display: {
        type: Boolean,
        twoWay: true,
        default: false
      },
      id: {
        type: String,
        default: ""
      },
      name: {
        type: String,
        default: ""
      },
      componentCallBack: {
        type: Function,
        default: function() {}
      }
    }
};
</script>
<style lang="css" scoped>
.yearpage,
.warp {
  height: 100%;
  overflow: hidden;
}

.yearpage .warp {
  background-color: #fff;
  position: relative;
}

.yearpage .list-group {
  text-align: center;
  cursor: pointer;
  overflow-x: hidden;
}

.yearpage .search {
  float: left;
  margin-left: 50px;
  width: 300px;
}

.yearpage .toolbar {
  position: absolute;
  height: 50px;
  left: 0;
  width: 100%;
  padding-left: 20px;
  background-color: #e8eaef;
}

.yearpage .quick-info {
  float: left;
}

.yearpage .quick-info strong {
  font-size: 30px;
}

.yearpage .tool {
  float: right;
  width: 275px;
  color: red;
  padding-right: 10px;
  text-align: right;
}

.yearpage .main-content {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.testtable {
  position: absolute;
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
