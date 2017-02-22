<template>
  <ui-modal :show.sync="display" header="补录工时录入" hide-footer>
    <ui-validator name="validation1">
      <form class="form-horizontal container-fluid" role="form" vali-submit="submitBt|submit">
        <div class="row">
          <div class="col-sm-24">
            <div class="form-group   row">
              <label class="col-sm-5 control-label"><span class="must">*</span>员工工号:</label>
              <div class="col-sm-19">
                <div class="choose-input" @click="selectEmployee">
                  <input type="text" vali="required" vali-msg='必输项' title="{{info.userNums}}" v-model="info.userNums" class="form-control" placeholder="请选择员工编号">
                  <span class="users"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-24">
            <div class="form-group  row">
              <label class="col-sm-5 control-label">姓名:</label>
              <div class="col-sm-19">
                <input type="text" class="form-control" title="{{info.userNames}}" v-model="info.userNames" placeholder="选择员工自动生成" readonly>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-24">
            <div class="form-group   row">
              <label class="col-sm-5 control-label"><span class="must">*</span>日期:</label>
              <div class="col-sm-19">
                <ui-datepicker :time.sync="info.date" format="yyyy-MM-dd" width="100%" vali="required" vali-msg='必填项'></ui-datepicker>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-24">
            <div class="form-group  row">
              <label class="col-sm-5  control-label"><span class="must">*</span>工时数量:</label>
              <div class="col-sm-19">
                <input type="text" v-model="info.hour" vali="required|maxNum:23|minNum:0|float:0" vali-msg='必填项|值应在0-23之间||必须是整数' class="form-control inline-input"><span>小时</span>
                <input type="text" v-model="info.min" vali="required|maxNum:59|minNum:0|float:0" vali-msg='必填项|值应在0-59之间||必须是整数' class="form-control inline-input">分钟
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-24">
            <div class="form-group  row">
              <label class="col-sm-5  control-label"><span class="must">*</span>补录原因:</label>
              <div class="col-sm-19">
                <select v-model="info.reason" class="form-control" vali="required" vali-msg='必输项'>
                  <option value="">请选择补录原因</option>
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
              <ui-button color="accent" id="submitBt" class="large">保存</ui-button>
            </div>
          </div>
        </div>
      </form>
    </ui-validator>
    <components :is="what" :display.sync="showSelect" :callback="chooseEmployeeCallBack" check-type="multi">
    </components>
  </ui-modal>
</template>
<script>
import Store from '../store'

export default {
  data() {
      return {
        showSelect: false, //是否显示查询员工接口
        what: '',
        reasons: [],
        info: {
          hour: '',
          min: '',
          date: '', //员工编码
          userNames: [],
          userNums: [], //用户ID
          reason: '' //补录原因
        }
      }
    },
    events: {
      submit() {
        var self = this;
        var obj = {};
        obj.IDs = JSON.stringify(self.info.userNums);
        obj.hou = (self.info.hour-0)  + ((self.info.min/60).toFixed(1)-0);
        obj.reason = self.info.reason;
        obj.daystr = self.info.date.replace(/-/g, '');

        Store.actions.addothertimeentry(obj, function(data) {
          self.componentscallback();
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

      //选择人员回调
      chooseEmployeeCallBack(data) {
        this.info.userNums = data.map((item) => {
          return item.userNum;
        });
        this.info.userNames = data.map((item) => {
          return item.userName;
        });
      },
      //查询员工
      selectEmployee() {
        this.what = "appSelectEmployee";
        this.showSelect = true;
      },

      cancel() {
        this.display = false;
      }
    },
    ready() {
      var self = this;
      //加载补录原因
      Store.actions.findSystemConfig("126000", function(data) {
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
      componentscallback: {
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

.inline-input {
  width: 135px;
  margin-right: 10px;
  display: inline-block;
}

.choose-input .users {
  display: inline-block;
  position: absolute;
  width: 30px;
  height: 30px;
  top: 8px;
  right: 0;
  color: #999;
  background: url(../../../assets/images/jbxi.png);
}
</style>
