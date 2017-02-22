<template>
  <header class="ui-module-navbar pos-topbar-fixed">
    <div class="ui-module-navbar-content">
      <div class="pull-left">
        <h4><strong>管理职级</strong></h4>
      </div>
    </div>
  </header>
  <div class="ui-panel ui-module-row">
    <ui-table v-ref:table height="auto" class="com-table-wrap" tdheight="50px">
      <template slot="headerLockedFirst">
        <table class="table table-bordered">
          <colgroup>
            <col width="150px" />
          </colgroup>
          <thead>
            <tr>
              <th>职级名称</th>
            </tr>
          </thead>
        </table>
      </template>
      <template slot="headerNormal">
        <table class="table table-bordered">
          <colgroup>
            <col width="200px"></col>
            <col width="100px"></col>
          </colgroup>
          <thead>
            <tr>
              <th>级别</th>
              <th>排序</th>
            </tr>
          </thead>
        </table>
      </template>
      <template slot="headerLockedLast">
        <table class="table table-bordered">
          <colgroup>
            <col width="150px" />
          </colgroup>
          <thead>
            <tr>
              <th></th>
            </tr>
          </thead>
        </table>
      </template>
      <template slot="bodyLockedFirst">
        <table class="table table-bordered">
          <colgroup>
            <col width="150px" />
          </colgroup>
          <tbody>
            <tr v-for="rank in state.rankList">
              <td>{{rank.rankName}}</td>
            </tr>
            <tr>
              <td><a href="javascript:void(0)" @click="addRank()" __code="org-postTree-rank-add/添加" v-if="$root.checkAuthorityByID('org-postTree-rank-add')">+添加级别</a></td>
            </tr>
          </tbody>
        </table>
      </template>
      <template slot="bodyNormal">
        <table class="table table-bordered">
          <colgroup>
            <col width="200px"></col>
            <col width="100px"></col>
          </colgroup>
          <tbody>
            <tr v-for="rank in state.rankList">
              <td>{{rank.rankCode}}</td>
              <td>{{rank.orderNum}}</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </template>
      <template slot="bodyLockedLast">
        <table class="table table-bordered">
          <colgroup>
            <col width="150px" />
          </colgroup>
          <tbody>
            <tr v-for="rank in state.rankList">
              <td>
                <button class="btn btn-info" @click="editRank(rank.ID)" __code="org-postTree-rank-edit/编辑" v-if="$root.checkAuthorityByID('org-postTree-rank-edit')">编辑</button>
                <button class="btn btn-danger" @click="removeRank(rank.ID)" __code="org-postTree-rank-del/删除" v-if="$root.checkAuthorityByID('org-postTree-rank-del')">删除</button>
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </template>
    </ui-table>
  </div>
  <rank-edit :visibility.sync="showRankEdit" :rank.sync="rank"></rank-edit>
</template>
<script>
import store from '../store'
import rankEdit from './rankEdit'
export default {
  data() {
      return {
        state: store.state,
        rank: {},
        showNavbar: false,
        showRankEdit: false
      };
    },
    methods: {
      addRank() {
        store.actions.clearRank();
        this.rank = {};
        this.showRankEdit = true;
      },
      editRank(rankID) {
        let me = this;
        store.actions.loadRank(rankID, (data) => {
          me.rank = {
            ID: me.state.rank.ID,
            rankName: me.state.rank.rankName,
            rankCode: me.state.rank.rankCode,
            orderNum: me.state.rank.orderNum
          };
          me.showRankEdit = true;
        });
      },
      removeRank(rankID) {
        let me = this;
        store.actions.removeRank(rankID, (data) => {
          store.actions.loadRankList(() => {
            this.$nextTick(() => {
              this.$refs.table.refresh();
            });
          });

        }, (error) => {
          me.$root.showTip({
            type: 'danger',
            msg: error,
            duration: 2000
          });
        });
      }
    },
    ready() {
      store.actions.loadRankList();
      var vm = this;
      setTimeout(function() {
        vm.showNavbar = true;
      }, 500);
    },
    components: {
      rankEdit
    }
};
</script>
<style lang="css" scoped>
</style>
