<template>
  <ui-modal :show.sync="display" header="自定义补卡" hide-footer type="large">
    <ui-validator name="validation1">
      <form class="form-horizontal container-fluid" role="form" vali-submit="submitBt|submit">
        <div class="row">
          <div class="col-sm-12">
            <div class="form-group   row">
              <label class="col-sm-6 control-label"><span class="must">*</span>开始时间</label>
              <div class="col-sm-18">
                <ui-datepicker :time.sync="info.startTime" format="yyyy-MM-dd" :HHMM="true" width="100%" vali="required" vali-msg='必填项'></ui-datepicker>
              </div>
            </div>
          </div>
          <div class="col-sm-12">
            <div class="form-group  row">
              <label class="col-sm-6 control-label"><span class="must">*</span>结束时间</label>
              <div class="col-sm-18">
                <ui-datepicker :time.sync="info.endTime" format="yyyy-MM-dd" :HHMM="true" width="100%" vali="required" vali-msg='必填项'></ui-datepicker>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-24">
            <div class="form-group  row">
              <label class="col-sm-3  control-label"><span class="must">*</span>补卡原因</label>
              <div class="col-sm-21">
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
          startTime: "", //开始时间
          endTime: "" //结束时间
        }
      }
    },
    events: {
      submit() {
        var self = this;

        var oDate1 = new Date(self.info.startTime);
        var oDate2 = new Date(self.info.endTime);

        if (oDate1 > oDate2) {
          self.$root.showTip({
            type: 'danger',
            msg: '补卡开始时间不能大于补卡结束时间',
            duration: 2000
          });
          return;
        }

        this.info.IDs = JSON.stringify(this.ids);
        Store.actions.submitCustomRepair(this.info, function(data) {
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
