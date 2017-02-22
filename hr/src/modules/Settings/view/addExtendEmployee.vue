<template>
  <ui-modal :show.sync="display" header="扩展字段" hide-footer>
    <ui-validator name="validation1">
      <form class="form-horizontal container-fluid" role="form" vali-submit="submitBt|submit">
        <div class="row">
          <div class="form-group   row">
            <label class="col-sm-5 control-label"><span class="must">*</span>显示名称</label>
            <div class="col-sm-19">
              <div class="choose-input">
                <input type="text" vali="required" vali-msg='必填项' v-model="info.showName" class="form-control" placeholder="请填写显示名称">
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="row">
          <div class="form-group   row">
            <label class="col-sm-5 control-label"><span class="must">*</span>英文名称</label>
            <div class="col-sm-19">
              <div class="choose-input" :class={'disabled':id!==''}>
                <input type="text" vali="required" vali-msg='必填项' v-model="info.dbName" class="form-control" placeholder="请填写英文名称">
              </div>
            </div>
          </div>
        </div> -->
        <div class="row">
          <div class="form-group   row">
            <label class="col-sm-5 control-label"><span class="must">*</span>是否可空</label>
            <div class="col-sm-19">
              <div class="choose-input" :class={'disabled':id!==''}>
                <select v-model="info.dbNullable" class="form-control">
                  <option value="">请选择是否可空</option>
                  <option value="1" :selected="info.dbNullable=='1'">是</option>
                  <option value="0" :selected="info.dbNullable=='0'">否</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="form-group   row">
            <label class="col-sm-5 control-label"><span class="must">*</span>排序号</label>
            <div class="col-sm-19">
              <input type="text" vali="required|maxNum:999|minNum:1" vali-msg='必填项,1-999之间' v-model="info.orderNum" class="form-control" placeholder="请填写排序号">
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
        info: {
          // dbName: '',
          showType: 'show_inputStr',
          showName: '',
          dbNullable: '1',
          orderNum: ''
        }
      }
    },
    events: {
      submit() {
        var self = this;
        if (self.id == "") {
          Store.actions.addExtendEmployeeColumn(self.info, function(data) {
            self.componentCallBack();
            self.display = false;
          }, function(error) {
            self.$root.showTip({
              type: 'danger',
              msg: error,
              duration: 2000
            });
          })
        } else {
          self.info.ID = this.id;
          Store.actions.updateExtendEmployee(self.info, function(data) {
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
      }
    },
    methods: {

    },
    ready() {
      var self = this;
      if (this.id != "") {
        Store.actions.getOneExtendEmpoyeeColumn({
          ID: this.id
        }, function(data) {
          // self.info.dbName = data.dbName;
          self.info.showName = data.showName;
          self.info.dbNullable = data.dbNullable;
          self.info.orderNum = data.orderNum;
        }, function(error) {
          self.$root.showTip({
            type: 'danger',
            msg: error,
            duration: 2000
          });
        })
      }

    },
    props: {
      display: {
        type: Boolean,
        default: false,
        twoWay: true,
      },
      id: {
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

.choose-input {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  font-family: 'Microsoft YaHei', serif;
  width: 100%;
}

.disabled {
  pointer-events: none;
}
</style>
