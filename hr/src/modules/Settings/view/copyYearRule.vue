<template>
  <ui-modal :show.sync="display" header="复制年假规则" type="large" hide-footer>
    <ui-validator name="validation1">
      <form class="form-horizontal container-fluid" role="form" vali-submit="submitBt|submit">
        <div class="row">
          <div class="col-sm-24 content">
            <span>将年假规则&nbsp;<strong>{{name}}</strong>&nbsp;的规则复制给->年假规则名称</span>
            <input type="text" v-model="newYearName" class="form-control inline-input" autocomplete="off" vali="required" vali-msg='必输项' placeholder="请输入年假规则名称">
          </div>
        </div>
        <div class="form-actions">
          <div class="row">
            <div class="text-center">
              <ui-button color="accent" id="submitBt" class="large">提交</ui-button>
            </div>
          </div>
        </div>
      </form>
    </ui-validator>
  </ui-modal>
</template>
<script>
import Store from '../store'

export default {
  data() {
      return {
        newYearName: ''
      }
    },
    events: {
      submit() {
        var self = this;
        Store.actions.copyYearRule({
          id: this.id,
          newYearName: this.newYearName
        }, function(data) {
          self.componentCallBack();
          self.display = false;
        }, function(error) {
          self.$root.showTip({
            type: 'danger',
            msg: error,
            duration: 2000
          });
        })
      }
    },
    methods: {},
    ready() {

    },
    props: {
      display: {
        type: Boolean,
        twoWay: true,
        default: false
      },
      id: {
        type: String,
        default: ""
      },
      name: {
        type: String,
        default: ""
      },
      componentCallBack: {
        type: Function,
        default: function() {}
      }
    }
};
</script>
<style lang="css" scoped>
.must {
  color: red;
}

.inline-input {
  width: 200px;
  display: inline-block;
}

.content {
  margin-bottom: 30px;
}
</style>
