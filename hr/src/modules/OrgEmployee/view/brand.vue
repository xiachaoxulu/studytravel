<template>
  <div class="panel panel-default branddisplay">
    <div class="panel-heading">
      <h3 class="panel-title"><strong>{{brand.brandName}}</strong>
      </h3>
    </div>
    <div class="panel-body">
      <table class="table">
        <tr>
          <td style="width: 40px;">
            <span class="label">负责人:</span>
          </td>
          <td>
            <span>{{brand.employeeName}}</span>
          </td>
        </tr>
      </table>
      <div class="controls">
        <div>
          <button type="button" class="ui-tool-button" @click="editRelativeInfo" __code="org-brand-edit/修改关联信息">修改关联信息</button>
        </div>
        <div>
          <v-dropdown placement="dropup">
            <button type="button" class="ui-tool-button" data-toggle="dropdown">
              更多操作
              <span class="caret"></span>
            </button>
            <ul slot="dropdown-menu" class="dropdown-menu">
              <li __code="org-brand-add/添加品牌">
                <a href="javascript:void(0);" @click="addBrand">添加品牌</a>
              </li>
              <li __code="org-brand-del/删除">
                <a href="javascript:void(0);" @click="removeBrand">删除</a>
              </li>
            </ul>
          </v-dropdown>
        </div>
      </div>
    </div>
  </div>
  <ui-confirm confirm-button-text="是" deny-button-text="否" header="提示" type="danger" @confirmed="confirmed" :show.sync="showConfirm" close-on-confirm>
    确定要删除该品牌吗？
  </ui-confirm>
</template>
<script>
// // 引入 ECharts 主模块
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
        state: store.state,
        brand: {},
        showConfirm: false
      };
    },
    props: {
      addbrandclicked: {
        type: Function
      },
      editbrandrelativeclicked: {
        type: Function
      },
      ID: {}
    },
    ready() {

    },
    methods: {
      addBrand() {
        if (this.addbrandclicked) {
          this.addbrandclicked();
        }
        this.$data.showSidebar = false;
      },
      editRelativeInfo() {
        if (this.editbrandrelativeclicked) {
          this.editbrandrelativeclicked(this.brand.ID);
        }
        this.$data.showSidebar = false;
      },
      removeBrand() {
        this.showConfirm = true;
      },
      confirmed() {
        var me = this;
        store.actions.removeBrand(me.brand.ID, () => {
          store.actions.loadCompanyDeptStore();
          // store.actions.loadBrandAreaStoreTree(); // 刷新品牌区域门店树数据
          store.actions.loadDeptTree(); // 刷新组织树数据
          store.actions.loadDeptBrandTree();
          store.actions.loadOrgListTree();
          me.showSidebar = false;
        }, (error) => {
          me.$root.showTip({
            type: 'danger',
            msg: error,
            duration: 2000
          });
        });
      }
    },
    created() {
      var me = this;
      if (this.ID) {
        store.actions.loadBrand(this.ID, (data) => {
          me.brand = data;
        }, (res) => {

        });
      }
    }
};
</script>
<style lang="css" scoped>
.branddisplay > a {
  text-decoration: none;
}

.more {
  display: inline-block;
  margin-bottom: 20px;
  cursor: pointer;
}

.label {
  color: #787878;
}

.chart {
  margin: 0px -16px 0px -16px;
  /*width: 420px;*/
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
