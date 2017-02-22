<template>
  <ui-modal :show.sync="display" header="添加宿舍" type="large" hide-footer>
    <ui-validator name="validation1">
      <form class="form-horizontal container-fluid" role="form" vali-submit="submitBt|submit">
        <div class="row text-center block">
          <span class="block-content">基本信息</span>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <div class="form-group row">
              <label class="col-sm-6 control-label"><span class="must">*</span>宿舍编码</label>
              <div class="col-sm-18">
                <input type="text" v-bind:disabled="type=='update'" v-model="dormitoryCode" vali="required" vali-msg='必填项' class="form-control" placeholder="请输入宿舍编码">
              </div>
            </div>
          </div>
          <div class="col-sm-12">
            <div class="form-group  row">
              <label class="col-sm-6 control-label">地址</label>
              <div class="col-sm-18">
                <input type="text" v-model="address" class="form-control" placeholder="请输入地址">
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <div class="form-group   row">
              <label class="col-sm-6 control-label">床位</label>
              <div class="col-sm-18">
                <input type="number" class="form-control" min="1" max="12" v-model="bedCount" placeholder="请输入床位数" />
              </div>
            </div>
          </div>
          <div class="col-sm-12">
            <div class="form-group  row">
              <label class="col-sm-6 control-label"><span class="must">*</span>性别</label>
              <div class="col-sm-18">
                <select class="form-control" v-model="gender" vali="required" vali-msg='必填项'>
                  <option value="">请选择性别</option>
                  <option value="男">男</option>
                  <option value="女">女</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <div class="form-group   row">
              <label class="col-sm-6 control-label">面积</label>
              <div class="col-sm-18">
                <input type="number" name="points" class="form-control" min="1" v-model="acreage" />
              </div>
            </div>
          </div>
        </div>
        <div class="row text-center block">
          <span class="block-content">租赁信息</span>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <div class="form-group   row">
              <label class="col-sm-6 control-label">房东姓名</label>
              <div class="col-sm-18">
                <input type="text" v-model="landlordName" class="form-control" placeholder="请输入房东姓名" />
              </div>
            </div>
          </div>
          <div class="col-sm-12">
            <div class="form-group   row">
              <label class="col-sm-6 control-label">租金</label>
              <div class="col-sm-18">
                <input type="number" v-model="rent" class="form-control" min="1" max="12" placeholder="请输入租金" />
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <div class="form-group   row">
              <label class="col-sm-6 control-label">开户银行</label>
              <div class="col-sm-18">
                <input type="text" v-model="openBank" class="form-control" placeholder="请输入开户银行" />
              </div>
            </div>
          </div>
          <div class="col-sm-12">
            <div class="form-group   row">
              <label class="col-sm-6 control-label">银行账号</label>
              <div class="col-sm-18">
                <input type="text" class="form-control" v-model="bankNo" placeholder="请输入银行账号" />
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <div class="form-group   row">
              <label class="col-sm-6 control-label"><span class="must">*</span>起租日期</label>
              <div class="col-sm-18">
                <ui-datepicker format="yyyy-MM-dd" width="100%" :time.sync="startTime" vali="required" vali-msg='必填项'></ui-datepicker>
              </div>
            </div>
          </div>
          <div class="col-sm-12">
            <div class="form-group   row">
              <label class="col-sm-6 control-label"><span class="must">*</span>到期日期</label>
              <div class="col-sm-18">
                <ui-datepicker format="yyyy-MM-dd" width="100%" :time.sync="endTime" vali="required" vali-msg='必填项'></ui-datepicker>
              </div>
            </div>
          </div>
        </div>
        <div class="form-actions">
          <div class="row">
            <div class="text-center">
              <ui-button color="accent" id="submitBt">提交</ui-button>
              <ui-button color="default" @click="close">取消</ui-button>
            </div>
          </div>
        </div>
      </form>
    </ui-validator>
  </ui-modal>
</template>
<script>
import store from '../store'

export default {
  data() {
      return {
        dormitoryCode: '', //宿舍编码
        address: '', //地址
        bedCount: '', //床位
        gender: '', //性别
        acreage: '', //面积
        landlordName: '', //房东姓名
        rent: '', //租金
        openBank: '', //开户银行
        bankNo: '', //银行账号
        startTime: '', //起租时间
        endTime: '', //结束时间
      }
    },
    events: {
      //提交
      submit() {
        var self = this;

        //验证时间
        var oDate1 = new Date(self.startTime);
        var oDate2 = new Date(self.endTime);
        if (oDate2 < oDate1) {
          self.$root.showTip({
            type: 'danger',
            msg: '结束日期不能小于起租日期',
            duration: 2000
          });
          return;
        }

        if (self.type == "add") {
          console.log(self.$data);
          store.actions.addDormitory(self.$data, function(data) {
            self.callback(data);
            self.display = false;
          }, function(error) {
            self.$root.showTip({
              type: 'danger',
              msg: error,
              duration: 2000
            });
          })
        } else {
          self.$data.ID = this.ID;
          store.actions.updateDormitory(self.$data, function(data) {
            self.callback(data);
            self.close();
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

      close() {
        this.display = false;
      }
    },
    watch: {
      ID(a, b) {
        console.log(a, b);
        var self = this;
        if (!!a) {
          store.actions.getOneDormitory(self.ID, function(data) {
            self.$data = data;
            self.$delete("createTime");
          }, function(error) {
            self.$root.showTip({
              type: 'danger',
              msg: error,
              duration: 2000
            });
          })
        } else {
          for (var i in self.$data) {
            self.$data[i] = "";
          }
          console.log(self.$data);
        }
      }
    },
    props: {
      display: {
        type: Boolean,
        default: false
      },
      ID: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'add'
      },
      callback: {
        type: Function,
        default: function() {}
      }
    }
};
</script>
<style lang="css" scoped>
.block {
  border-bottom: 1px #ccc dashed;
  height: 12px;
  margin-bottom: 28px;
  text-align: center;
}

.block-content {
  display: inline-block;
  height: 30px;
  padding: 0px 10px;
  background-color: white;
  color: #ccc;
}

.must {
  color: red;
}
</style>
