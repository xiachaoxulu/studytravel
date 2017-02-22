<template>
  <div class="panel panel-default storedisplay">
    <div class="panel-heading">
      <h3 class="panel-title"><strong>{{store.storeName}}</strong>
      </h3>
    </div>
    <div class="panel-body">
      <table class="table">
        <tr>
          <td style="width: 40px">
            <span class="label">地址:</span>
          </td>
          <td>
            <span>{{store.address}}</span>
          </td>
        </tr>
        <tr>
          <td>
            <span class="label">电话:</span>
          </td>
          <td>
            <span>无字段</span>
          </td>
        </tr>
        <tr>
          <td>
            <span class="label">编号:</span>
          </td>
          <td>
            <span>{{store.storeCode}}</span>
          </td>
        </tr>
        <tr>
          <td>
            <span class="label">座位:</span>
          </td>
          <td>
            <span>{{store.siteNum}}个</span>
          </td>
        </tr>
        <tr>
          <td>
            <span class="label">商圈:</span>
          </td>
          <td>
            <span>{{store.cbdName}}</span>
          </td>
        </tr>
        <tr>
          <td>
            <span class="label">类型:</span>
          </td>
          <td>
            <span>{{store.manageTypeName}}</span>
          </td>
        </tr>
        <!-- <tr>
          <td>
            <span class="label">宿舍:</span>
          </td>
          <td>
            <span>0231 海淀区湖景东路9号</span>
          </td>
        </tr>
        <tr>
          <td>
            <span class="label">床位:</span>
          </td>
          <td>
            <span>9个</span>
          </td>
        </tr>-->
      </table>
      <div class="controls">
        <div>
          <button type="button" class="ui-tool-button" @click="editRelativeInfo" __code="org-store-editrelative/修改关联信息">修改关联信息</button>
        </div>
        <div>
          <v-dropdown placement="dropup">
            <button type="button" class="ui-tool-button" data-toggle="dropdown">
              更多操作
              <span class="caret"></span>
            </button>
            <ul slot="dropdown-menu" class="dropdown-menu">
              <li __code="org-team-add/添加小组">
                <a href="javascript:void(0);" @click="addTeam">添加小组</a>
              </li>
              <li __code="org-store-del/删除">
                <a href="javascript:void(0);" @click="removeStore">删除</a>
              </li>
            </ul>
          </v-dropdown>
        </div>
      </div>
    </div>
  </div>
  <ui-confirm confirm-button-text="是" deny-button-text="否" header="提示" type="danger" @confirmed="confirmed" :show.sync="showConfirm" close-on-confirm>
    确定要删除该门店吗？
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
        store: {},
        showConfirm: false
      };
    },
    props: {
      addteamclicked: {
        type: Function
      },
      editstorerelativeclicked: {
        type: Function
      },
      ID: {}
    },
    ready() {

    },
    methods: {
      addTeam() {
        if (this.addteamclicked) {
          this.addteamclicked(this.store.ID);
        }
        this.$data.showSidebar = false;
      },
      editRelativeInfo() {
        if (this.editstorerelativeclicked) {
          this.editstorerelativeclicked(this.store.ID);
        }
        this.$data.showSidebar = false;
      },
      removeStore() {
        this.showConfirm = true;
      },
      confirmed() {
        var me = this;
        store.actions.removeStoreList([me.store.ID], () => {
          store.actions.loadCompanyDeptStore();
          // store.actions.loadBrandAreaStoreTree(); // 刷新品牌区域门店树数据
          store.actions.loadDeptTree(); // 刷新组织树数据
          store.actions.loadDeptStoreTree();
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
        store.actions.loadStore(this.ID, (data) => {
          me.store = data;
        }, (res) => {

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
