<!--
* @Created Date       : 2016-11-07T10:07:27+08:00
* @Last Modified time : 2016-12-02T17:07:31+08:00
 -->
<template>
  <ui-modal :show.sync="display" header="收集人员指纹,脸部信息" hide-footer>
    <ui-validator name="validation1">
      <form class="form-horizontal container-fluid" role="form" vali-submit="submitBt|submit">
        <div class="row">
          <div class="col-sm-24">
            <div class="form-group   row">
              <label class="col-sm-5 control-label"><span class="must">*</span>设备:</label>
              <div class="col-sm-19">
                <div class="choose-input" @click="selectSn">
                  <input type="text" vali="required" vali-msg='必输项' title="{{info.sn}}" v-model="info.sn" class="form-control" placeholder="请选择设备">
                  <span class="sn"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        <div class="row">
          <div class="col-sm-24">
            <div class="form-group  row">
              <label class="col-sm-5 control-label">人员:</label>
              <div class="col-sm-19">
                <div class="choose-input" @click="selectEmployee">
                  <input type="text" title="{{userName}}" v-model="userName" class="form-control" placeholder="请选择人员">
                  <span class="users"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="form-actions">
          <div class="row">
            <div class="text-center">
              <ui-button color="accent" id="submitBt" class="large">确定</ui-button>
            </div>
          </div>
        </div>
      </form>
    </ui-validator>
    <components :is="what" :display.sync="showSelect" :callback="chooseEmployeeCallBack" :sncallback="sncallback">
    </components>
  </ui-modal>
</template>
<script>
import Store from '../store'
import selectSn from './selectSn'

export default {
  data() {
      return {
        info: {
          sn: '',
          pin: ''
        },
        userName: '',
        what: '',
        showSelect: false
      }
    },
    events: {
      submit() {
        console.log(this.info)
        var self = this;
        Store.actions.commandSend(this.info, function() {
          self.display = false;
        }, function(res) {
          self.$root.showTip({
            type: 'danger',
            msg: res,
            duration: 2000
          });
        })
      }
    },
    methods: {
      sncallback(data) {
        if (data && 　data.length > 0) {
          this.info.sn = data[0].sn;
        }
      },
      chooseEmployeeCallBack(data) {
        if (data && 　data.length > 0) {
          this.info.pin = data[0].checkWorkNo;
          this.userName = data[0].userName;
        }
      },
      selectSn() {
        this.what = "selectSn";
        this.showSelect = true;
      },
      selectEmployee() {
        this.what = "appSelectEmployee";
        this.showSelect = true;
      }
    },
    components: {
      selectSn
    },
    ready() {

    },
    props: {
      display: {
        type: Boolean,
        twoWay: true,
        default: false
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

.choose-input .sn {
  display: inline-block;
  position: absolute;
  width: 30px;
  height: 30px;
  top: 8px;
  right: 0;
  color: #999;
  background: url(../../../assets/images/search.png) no-repeat 50% 40%;
}
</style>
