<template>
  <ui-modal :show.sync="display" :header.sync="header" type="medium" hide-footer>
    <div class="panel panel-default">
      <div class="panel-body" style="padding-top: 30px">
        <ui-validator>
          <form class="form-horizontal container-fluid" role="form" vali-submit="submitBtn|submitedCall">
            <!-- <div class="row">
              <div class="col-sm-24">
                <div class="form-group row">
                  <label class="col-sm-6 control-label">小组编码</label>
                  <div class="col-sm-18">
                    <input type="text" v-model="team.teamCode" vali="required" vali-msg="必填项" class="form-control" placeholder="请输入小组编码" />
                  </div>
                </div>
              </div>
            </div> -->
            <div class="row">
              <div class="col-sm-24">
                <div class="form-group row">
                  <label class="col-sm-6 control-label">小组名称</label>
                  <div class="col-sm-18">
                    <input type="text" v-model="team.teamName" vali="required" vali-msg="必填项" class="form-control" placeholder="请输入小组名称" />
                  </div>
                </div>
              </div>
            </div>
            <div class="form-actions">
              <div class="row">
                <div class="text-center">
                  <ui-button id="submitBtn" color="accent">提交</ui-button>
                  <ui-button color="default" @click="close">取消</ui-button>
                </div>
              </div>
            </div>
          </form>
        </ui-validator>
      </div>
    </div>
  </ui-modal>
</template>
<script>
import store from '../store'
export default {
  data() {
      return {
        state: store.state
      }
    },
    computed: {
      header() {
        return this.team.ID == null ? '添加门店小组' : '修改门店小组';
      }
    },
    props: {
      team: {
        twoWay: true,
        default: () => {
          return {};
        }
      },
      display: {
        twoWay: true,
        type: Boolean,
        default: false
      }
    },
    methods: {
      close() {
        this.display = false;
        this.team = {};
      }
    },
    events: {
      submitedCall() {
        let me = this;
        if (me.team.ID) {
          store.actions.editStoreTeam(this.team, () => {
            // store.actions.loadBrandAreaStoreTree();
            store.actions.loadCompanyDeptStore();
            me.display = false;
          }, (error) => {
            me.$root.showTip({
              type: 'danger',
              msg: error,
              duration: 2000
            });
          });
        } else {
          store.actions.addStoreTeam(this.team, () => {
            // store.actions.loadBrandAreaStoreTree();
            store.actions.loadCompanyDeptStore();
            me.display = false;
          }, (error) => {
            me.$root.showTip({
              type: 'danger',
              msg: error,
              duration: 2000
            });
          });
        }
      }
    }
};
</script>
<style lang="css" scoped>
</style>
