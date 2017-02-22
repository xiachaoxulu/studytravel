<template>
  <ui-modal :show.sync="visibility" hide-footer :header.sync="header" type="medium">
    <div class="panel panel-default">
      <div class="panel-body" style="padding-top: 30px">
        <ui-validator>
          <form class="form-horizontal container-fluid" role="form" vali-submit="submitBtn|submitedCall">
            <!--  <div class="row">
              <div class="col-sm-24">
                <div class="form-group row">
                  <label class="col-sm-6 control-label">岗位编码</label>
                  <div class="col-sm-18">
                    <input type="text" v-model="position.positionCode" vali="required" vali-msg="必填项" class="form-control" placeholder="请输入岗位编码" />
                  </div>
                </div>
              </div>
            </div> -->
            <div class="row">
              <div class="col-sm-24">
                <div class="form-group row">
                  <label class="col-sm-6 control-label">职位名称</label>
                  <div class="col-sm-18">
                    <input type="text" v-model="position.positionName" vali="required" vali-msg="必填项" class="form-control" placeholder="请输入职位名称" />
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
      position: {
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
        return this.position.ID == null ? '添加职位' : '修改职位'
      }
    },
    methods: {
      close() {
        this.visibility = false
        this.position = {};
      }
    },
    events: {
      submitedCall() {
        let me = this;
        if (me.position.ID) {
          store.actions.editPosition(this.position, () => {
            store.actions.loadPositionList();
            me.visibility = false;
          }, (error) => {
            me.$root.showTip({
              type: 'danger',
              msg: error,
              duration: 2000
            });
          });
        } else {
          store.actions.addPosition(this.position, () => {
            store.actions.loadPositionList(() => {
              this.$parent.$nextTick(() => {
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
