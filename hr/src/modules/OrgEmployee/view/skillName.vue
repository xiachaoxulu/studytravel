<template>
  <ui-modal :show.sync="visibility" hide-footer header="添加技能" type="medium">
    <div class="panel panel-default">
      <div class="panel-body" style="padding-top: 30px">
        <ui-validator>
          <form class="form-horizontal container-fluid" role="form" vali-submit="submitBtn|submitedCall">
            <div class="row">
              <div class="col-sm-24">
                <div class="form-group row">
                  <label class="col-sm-6 control-label">技能编码</label>
                  <div class="col-sm-18">
                    <input type="text" v-model="skill.skillCode" vali="required" vali-msg="必填项" class="form-control" placeholder="请输入技能编码" />
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-24">
                <div class="form-group row">
                  <label class="col-sm-6 control-label">技能名称</label>
                  <div class="col-sm-18">
                    <input type="text" v-model="skill.skillName" vali="required" vali-msg="必填项" class="form-control" placeholder="请输入技能名称" />
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
      skill: {
        twoWay: true,
        default: {}
      },
      visibility: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      close() {
        this.visibility = false;
        this.skill = {};
      }
    },
    events: {
      submitedCall() {
        let me = this;
        if (me.skill.ID) {
          store.actions.editSkill(this.skill, () => {
            store.actions.loadSkillList();
            me.visibility = false;
          }, (error) => {
            me.$root.showTip({
              type: 'danger',
              msg: error,
              duration: 2000
            });
          });
        } else {
          store.actions.addSkill(this.skill, () => {
            store.actions.loadSkillList();
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
