<template>
  <ui-modal :show.sync="display" header="员工离职" type="large" hide-footer>
    <ui-validator name="validation1">
      <form class="form-horizontal container-fluid" role="form" vali-submit="submitBt|submit">
        <div class="row">
          <div class="col-sm-12">
            <div class="form-group   row">
              <label class="col-sm-6  control-label"><span class="must">*</span>生效日期</label>
              <div class="col-sm-18">
                <ui-datepicker :time.sync="info.effectTime" format="yyyy-MM-dd" width="100%" vali="required" vali-msg='必填项'></ui-datepicker>
              </div>
            </div>
          </div>
          <div class="col-sm-12">
            <div class="form-group  row">
              <label class="col-sm-6  control-label">离职类型</label>
              <div class="col-sm-18">
                <select v-model="info.leaveType" class="form-control">
                  <option value="">请选择离职类型</option>
                  <template v-for="item in leaveTypes">
                    <option value="{{item.code}}" :selected="item.code==info.reason">{{item.codeName}}</option>
                  </template>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
           <div class="col-sm-24">
            <div class="form-group  row">
              <label class="col-sm-3  control-label"><span class="must">*</span>离职原因</label>
              <div class="col-sm-21">
                <select v-model="info.reason" class="form-control" vali="required" vali-msg='必填项'>
                  <option value="">请选择离职原因</option>
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
              <ui-button color="accent" id="submitBt" class="large">保存</ui-button>
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
        leaveTypes:[],
        info: {
          leaveType:'',
          effectTime: '', //生效日期
          reason: '' //离职原因
        }
      }
    },
    events: {
      submit() {
        var self = this;

        // //验证时间
        // var oDate1 = new Date(self.info.effectTime);
        // var oDate2 = new Date();

        // oDate1 = new Date(oDate1.getFullYear() + "-" + (oDate1.getMonth() + 1) + "-" + oDate1.getDate());
        // oDate2 = new Date(oDate2.getFullYear() + "-" + (oDate2.getMonth() + 1) + "-" + oDate2.getDate());

        // if (oDate1<oDate2) {
        //   self.$root.showTip({
        //     type: 'danger',
        //     msg: '生效日期不能小于今天',
        //     duration: 2000
        //   });
        //   return;
        // }
        var params = this.ids.map((item) => {
          var obj = {};
          obj.userID = item;
          obj.effectTime = self.info.effectTime;
          obj.reason = self.info.reason;
          return obj;
        });
        var info = {
          leaveofficeList: JSON.stringify(params)
        }
        Store.actions.batchAddDimission(info, function(data) {
          self.officeEditCallBack();
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
    methods: {
      cancel() {
        this.display = false;
      }
    },
    ready() {
      var self = this;
      //加载离职原因
      Store.actions.findSystemConfig("101000", function(data) {
        self.reasons = data;
      }, function(error) {
        self.$root.showTip({
          type: 'danger',
          msg: error,
          duration: 2000
        });
      })

      Store.actions.findSystemConfig("152000", function(data) {
        self.leaveTypes = data;
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
