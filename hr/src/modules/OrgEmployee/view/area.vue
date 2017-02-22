<template>
  <div class="panel panel-default storedisplay">
    <div class="panel-heading">
      <h3 class="panel-title"><strong>{{area.areaName}}</strong>
      </h3>
    </div>
    <div class="panel-body">
      <table class="table">
        <tr>
          <td style="width: 40px;">
            <span class="label">负责人:</span>
          </td>
          <td>
            <span>{{area.userName}}</span>
          </td>
        </tr>
        <tr>
          <td>
            <span class="label">上级区域:</span>
          </td>
          <td>
            <span>{{area.parentName}}</span>
          </td>
        </tr>
      </table>
      <div class="controls">
        <div>
          <button type="button" class="ui-tool-button" @click="editRelativeInfo" __code="org-area-edit/修改关联信息">修改关联信息</button>
        </div>
        <div>
          <v-dropdown placement="dropup">
            <button type="button" class="ui-tool-button" data-toggle="dropdown">
              更多操作
              <span class="caret"></span>
            </button>
            <ul slot="dropdown-menu" class="dropdown-menu">
              <li __code="org-store-add/添加下级门店">
                <a href="javascript:void(0);" @click="addChildArea">添加下级门店</a>
              </li>
              <li __code="org-area-del/删除">
                <a href="javascript:void(0);" @click="removeArea">删除</a>
              </li>
            </ul>
          </v-dropdown>
        </div>
      </div>
    </div>
  </div>
  <ui-confirm confirm-button-text="是" deny-button-text="否" header="提示" type="danger" @confirmed="confirmed" :show.sync="showConfirm" close-on-confirm>
    确定要删除该部门吗？
  </ui-confirm>
</template>
<script>
// var echarts = require('echarts/lib/echarts');
// // 引入图
// require('echarts/lib/chart/line');
// // 引入提示框和标题组件
// require('echarts/lib/component/tooltip');
// require('echarts/lib/component/title');
// require('echarts/lib/component/legend');

import store from '../store'

export default {
  data() {
      return {
        store: store.state,
        area: {},
        showConfirm: false
      };
    },
    ready() {
      this.$nextTick(function() {})
    },
    props: {
      addchildstoreclicked: {
        type: Function
      },
      editarearelativeclicked: {
        type: Function
      },
      ID: {}
    },
    methods: {
      editRelativeInfo() {
        if (this.editarearelativeclicked) this.editarearelativeclicked(this.area.ID);
        this.$data.showSidebar = false;
      },
      addChildArea() {
        if (this.addchildstoreclicked) this.addchildstoreclicked(this.area.ID);
        this.$data.showSidebar = false;
      },
      removeArea() {
        this.showConfirm = true;
      },
      confirmed() {
        store.actions.removeArea(this.area.ID, () => {
          store.actions.loadCompanyDeptStore();
          store.actions.loadDeptTree(); // 刷新组织树数据
          store.actions.loadDeptStoreTree();
          store.actions.loadOrgListTree();
          this.showSidebar = false;
        }, (error) => {
          this.$root.showTip({
            type: 'danger',
            msg: error,
            duration: 2000
          });
        });
      }
    },
    created() {
      if (this.ID) {
        store.actions.loadArea(this.ID.substring(0, this.ID.indexOf('-')), (data) => {
          this.area = data;
        }, (error) => {
          this.$root.showTip({
            type: 'danger',
            msg: error,
            duration: 2000
          });
        });
      }
    }
};
</script>
<style lang="css" scoped>
.storedisplay > a {
  text-decoration: none;
}

.more {
  display: inline-block;
  margin-bottom: 20px;
  cursor: pointer;
}

.detail {
  display: none;
}

.label {
  color: #787878;
}

.chart {
  margin: 0px -16px 0px -16px;
  /*width: 420px;*/
  height: 300px;
}

.controls {
  position: absolute;
  bottom: 0;
  left: 10px;
  right: 10px;
  color: #fe6d5a;
  display: flex;
  border-top: 1px solid #e5e5e5;
}

.controls > div {
  flex: 1;
  float: left;
  text-align: center;
  padding-top: 5px;
  padding-bottom: 5px;
}
</style>
