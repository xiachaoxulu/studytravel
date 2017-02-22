<template>
  <ui-modal :show.sync="display" header="员工黑名单" type="large" hide-footer>
    <ui-validator name="validation1">
      <form class="form-horizontal container-fluid" role="form" vali-submit="submitBt|submit">
        <div class="row">
          <div class="col-sm-24">
            <div class="form-group  row">
              <label class="col-sm-3  control-label">黑名单原因</label>
              <div class="col-sm-21">
                <select v-model="info.reason" class="form-control" vali="required" vali-msg='必填项'>
                  <option value="">请选择黑名单原因</option>
                  <template v-for="item in reasons">
                    <option value="{{item.code}}" :selected="item.code==info.reason">{{item.codeName}}</option>
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
        reasons: [],
        info: {
          reason: '' //黑名单原因
        }
      }
    },
    events: {
      submit() {
        var self = this;


        var params = this.ids.map((item) => {
          var obj = {};
          obj.userID = item;
          obj.reason = self.info.reason;
          return obj;
        });
        var info = {
          blacklist: JSON.stringify(params)
        }

        Store.actions.batchAddBlackList(info, function(data) {
          self.officeEditCallBack();
          self.display = false;
        }, function(error) {
          this.$root.showTip({
            type: 'danger',
            msg: error,
            duration: 2000
          });
        })

      }
    },
    methods: {
      cancel() {
        this.display = false;
      }
    },
    ready() {
      var self = this;
      //加载黑名单原因
      Store.actions.findSystemConfig("121000", function(data) {
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
      officeEditCallBack: {
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

.choose-input {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  font-family: 'Microsoft YaHei', serif;
  width: 100%;
}

.choose-input > input {
  font-family: 'Microsoft YaHei', serif;
  color: #666;
  box-sizing: border-box;
  outline: none;
  padding: 0 30px 0 7px;
  font-size: 13px;
  width: 100%;
  cursor: pointer;
  background: #fff;
}

.choose-input > i {
  display: inline-block;
  position: absolute;
  width: 30px;
  height: 30px;
  top: 8px;
  right: 0;
  color: #999;
}
</style>
