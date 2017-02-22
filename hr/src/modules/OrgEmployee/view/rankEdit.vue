<template>
  <ui-modal :show.sync="visibility" hide-footer :header.sync="header" type="medium">
    <div class="panel panel-default">
      <div class="panel-body" style="padding-top: 30px">
        <ui-validator>
          <form class="form-horizontal container-fluid" role="form" vali-submit="submitBtn|submitedCall">
            <div class="row">
              <div class="col-sm-24">
                <div class="form-group row">
                  <label class="col-sm-6 control-label">职级名称</label>
                  <div class="col-sm-18">
                    <input type="text" v-model="rank.rankName" vali="required" vali-msg="必填项" class="form-control" placeholder="请输入职级名称" />
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-24">
                <div class="form-group row">
                  <label class="col-sm-6 control-label">级别</label>
                  <div class="col-sm-18">
                    <input type="text" v-model="rank.rankCode" vali="required" vali-msg="必填项" class="form-control" placeholder="" />
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-24">
                <div class="form-group row">
                  <label class="col-sm-6 control-label">排序</label>
                  <div class="col-sm-18">
                    <input type="text" v-model="rank.orderNum" vali="required|minNum:1" vali-msg="必填项||排序应为数字" class="form-control" placeholder="" />
                  </div>
                </div>
              </div>
            </div>
            <div class="form-actions">
              <div class="row">
                <div class="text-center">
                  <ui-button id="submitBtn" color="accent">保存</ui-button>
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
import store from '../store.js'
export default {
  data() {
      return {
        state: store.state
      };
    },
    props: {
      rank: {
        twoWay: true,
        default: {}
      },
      visibility: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      header() {
        return this.rank.ID == null ? '添加职级' : '修改职级';
      }
    },
    methods: {
      close() {
        this.visibility = false;
        this.rank = {};
      }
    },
    events: {
      submitedCall() {
        let me = this;
        if (me.rank.ID) {
          store.actions.editRank(this.rank, () => {
            store.actions.loadRankList(() => {
              this.$nextTick(() => {
                this.$parent.$refs.table.refresh();
              });
            });
            me.visibility = false;
          }, (error) => {
            me.$root.showTip({
              type: 'danger',
              msg: error,
              duration: 2000
            });
          });
        } else {
          store.actions.addRank(this.rank, () => {
            store.actions.loadRankList(() => {
              this.$nextTick(() => {
                this.$parent.$refs.table.refresh();
              });
            });
            me.visibility = false;
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
