<template>
  <ui-modal :show.sync="visibility" hide-footer :header="header" type="medium">
    <div class="panel panel-default">
      <div class="panel-body" style="padding-top: 30px">
        <ui-validator>
          <form class="form-horizontal container-fluid" role="form" vali-submit="submitPostTypeBtn|submitedPostTypeCall">
            <div class="row">
              <div class="col-sm-24">
                <div class="form-group row">
                  <label class="col-sm-8 control-label">岗位分类名称</label>
                  <div class="col-sm-16">
                    <input type="text" v-model="posttype.postType" vali="required" vali-msg="必填项" class="form-control" placeholder="请输入岗位分类名称" />
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-24">
                <div class="form-group row">
                  <label class="col-sm-8 control-label">岗位类型</label>
                  <div class="col-sm-16">
                    <select class="form-control" v-model="posttype.mngType" vali="required" vali-msg="必选项">
                      <option value="1" selected="posttype.mngType==1">管理组</option>
                      <option value="2" selected="posttype.mngType==2">服务组</option>
                      <option value="3" selected="posttype.mngType==3">其它</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-actions">
              <div class="row">
                <div class="text-center">
                  <ui-button id="submitPostTypeBtn" color="accent">保存</ui-button>
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
      posttype: {
        twoWay: true,
        default: {}
      },
      visibility: {
        type: Boolean,
        default: false
      },
      header: {
        type: String
      }
    },
    methods: {
      close() {
        this.visibility = false;
        this.posttype = {};
      }
    },
    events: {
      submitedPostTypeCall() {
        let me = this;
        if (me.posttype.ID) {
          store.actions.editPostType(this.posttype, () => {
            store.actions.loadPostTypeTree();
            me.visibility = false;
          }, (error) => {
            me.$root.showTip({
              type: 'danger',
              msg: error,
              duration: 2000
            });
          });
        } else {
          store.actions.addPostType(this.posttype, () => {
            store.actions.loadPostTypeTree();
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
