<template>
  <div class="panel panel-default storedisplay">
    <div class="panel-heading">
      <h3 class="panel-title"><strong>{{team.teamName}}</strong>
      </h3>
    </div>
    <div class="panel-body">
      <!-- <table class="table">
        <tr>
          <td style="width: 40px;">
            <span class="label">小组编码:</span>
          </td>
          <td>
            <span>{{team.teamCode}}</span>
          </td>
        </tr>
      </table> -->
      <div class="controls">
        <div>
          <button type="button" class="ui-tool-button" @click="editRelativeInfo" __code="org-team-edit/修改关联信息">修改关联信息</button>
        </div>
        <div>
          <button type="button" class="ui-tool-button" @click="removeTeam" __code="org-team-del/删除">删除</button>
        </div>
      </div>
    </div>
  </div>
  <ui-confirm confirm-button-text="是" deny-button-text="否" header="提示" type="danger" @confirmed="confirmed" :show.sync="showConfirm" close-on-confirm>
    确定要删除该小组吗？
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
        team: {},
        showConfirm: false
      };
    },
    ready() {
      this.$nextTick(function() {})
    },
    props: {
      editteamrelativeclicked: {
        type: Function
      },
      ID: {}
    },
    methods: {
      editRelativeInfo() {
        if (this.editteamrelativeclicked) this.editteamrelativeclicked(this.team.ID);
        this.$data.showSidebar = false;
      },
      removeTeam() {
        this.showConfirm = true;
      },
      confirmed() {
        store.actions.removeStoreTeamList([this.team.ID], () => {
          // store.actions.loadBrandAreaStoreTree();
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
        store.actions.loadStoreTeam(this.ID, (data) => {
          this.team = data;
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
