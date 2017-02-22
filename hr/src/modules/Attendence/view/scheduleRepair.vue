<template>
  <ui-modal :show.sync="display" header="排班补卡" hide-footer>
    <ui-validator name="validation1">
      <form class="form-horizontal container-fluid" role="form" vali-submit="submitBt|submit">
        <div class="row">
          <div class="col-sm-24">
            <div class="form-group  row">
              <div class="quick-info">
                <span>共选择</span><strong>{{ids.length}}</strong><span>条打卡记录</span>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-24">
            <div class="form-group  row">
              <label class="col-sm-6  control-label"><span class="must">*</span>补卡原因</label>
              <div class="col-sm-18">
                <select v-model="info.reason" class="form-control" vali="required" vali-msg='必填项'>
                  <option value="">请选择补卡原因</option>
                  <template v-for="item in reasons">
                    <option value="{{item.code}}">{{item.codeName}}</option>
                  </template>
                </select>
              </div>
            </div>
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
        reasons: [], //补卡原因
        info: {
          reason: "", //
        }
      }
    },
    events: {
      submit() {
        var self = this;
        this.info.IDs = JSON.stringify(this.ids);
        Store.actions.submitScheduleRepair(this.info, function(data) {
          self.callBack();
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
      var self = this;
      Store.actions.findSystemConfig("104000", function(data) {
        self.reasons = data;
      }, function(error) {
        self.$root.showTip({
          type: 'danger',
          msg: error,
          duration: 2000
        });
      })
    },
    props: {
      display: {
        type: Boolean,
        twoWay: true,
        default: false
      },
      ids: {
        type: Array,
        default: []
      },
      callBack: {
        type: Function,
        default: function() {}
      }
    }
};
</script>
<style lang="css" scoped>
.quick-info {
  margin-left: 40px;
}

.quick-info strong {
  margin: 0px 10px;
  font-size: 30px;
}
</style>
