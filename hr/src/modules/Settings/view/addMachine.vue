<!--
* @Created Date       : 2016-11-07T10:07:27+08:00
* @Last Modified time : 2016-12-02T17:07:31+08:00
 -->


<template>
  <ui-modal :show.sync="display" header="添加设备" type="large" hide-footer>
    <ui-validator name="validation1">
      <form class="form-horizontal container-fluid" role="form" vali-submit="submitBt|submit">
        <div class="row">
          <div class="col-sm-12">
            <div class="form-group   row">
              <label class="col-sm-6 control-label"><span class="must">*</span>序列号</label>
              <div class="col-sm-18">
                <input type="text" vali="required" vali-msg='必填项' v-model="info.sn" class="form-control" placeholder="请填写序列号">
              </div>
            </div>
          </div>
          <div class="col-sm-12">
            <div class="form-group  row">
              <label class="col-sm-6 control-label"><span class="must">*</span>归属组织</label>
              <div class="col-sm-18">
                <template v-if="id == ''">
                  <combo-tree :treedata="org" :multiple="true" :checkable="true" idprop="ID" :rootvisible="false" :nodeclicked="nodeClicked">
                    <div data-toggle="dropdown">
                      <div class="choose-input">
                        <input type="text" class="form-control" vali="required" vali-msg='必填项' v-model="info.orgDisplayName" placeholder="请选择组织" readonly>
                        <i class="icon-tool icon-tool-search"></i>
                      </div>
                    </div>
                  </combo-tree>
                </template>
                <template v-else>
                  <combo-tree :treedata="org" :multiple="false" idprop="ID" :rootvisible="false" :nodeclicked="nodeClicked">
                    <div data-toggle="dropdown">
                      <div class="choose-input">
                        <input type="text" class="form-control" vali="required" vali-msg='必填项' v-model="info.orgDisplayName" placeholder="请选择组织" readonly>
                        <i class="icon-tool icon-tool-search"></i>
                      </div>
                    </div>
                  </combo-tree>
                </template>
              </div>
            </div>
          </div>
        </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <div class="form-group  row">
              <label class="col-sm-6 control-label"><span class="must">*</span>设备别名</label>
              <div class="col-sm-18">
                <input type="text" v-model="info.displayName" vali="required" vali-msg='必填项' class="form-control" placeholder="请填写设备别名">
              </div>
            </div>
          </div>
          <div class="col-sm-12">
            <div class="form-group  row">
              <label class="col-sm-6 control-label"><span class="must">*</span>设备用途</label>
              <div class="col-sm-18">
                <select v-model="info.useType" class="form-control" vali="required" vali-msg='必填项'>
                  <option value="">请选择设备用途</option>
                  <template v-for="item in useTypes">
                    <option value="{{item.code}}" :selected="item.code==info.useType">{{item.codeName}}</option>
                  </template>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <div class="form-group  row">
              <label class="col-sm-6 control-label"><span class="must">*</span>所属厂商</label>
              <div class="col-sm-18">
                <select v-model="info.vendor" class="form-control" vali="required" vali-msg='必填项'>
                  <option value="">请选择所属厂商</option>
                  <template v-for="item in vendors">
                    <option value="{{item.code}}" :selected="item.code==info.vendor">{{item.codeName}}</option>
                  </template>
                </select>
              </div>
            </div>
          </div>
          <div class="col-sm-12">
            <div class="form-group  row">
              <label class="col-sm-6 control-label"><span class="must">*</span>设备类型</label>
              <div class="col-sm-18">
                <select v-model="info.type" class="form-control" vali="required" vali-msg='必填项'>
                  <option value="">请选择设备类型</option>
                  <template v-for="item in types">
                    <option value="{{item.code}}" :selected="item.code==info.type">{{item.codeName}}</option>
                  </template>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-24">
            <div class="form-group  row">
              <label class="col-sm-3  control-label">所在位置</label>
              <div class="col-sm-21">
                <input type="text" v-model="info.address" class="form-control" placeholder="请填写所在位置">
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
        useTypes: [],
        vendors: [],
        types: [],
        org: {},

        info: {
          useType: '', //设备用途
          sn: '', //序列号
          displayName: '', //设备名称
          otherid: '', //组织ID
          orgDisplayName: '',
          address: '', //所在位置
          vendor: '', //设备厂商
          type: '', //设备类型
        }
      }
    },
    events: {
      submit() {
        var self = this;
        if (self.id == "") {
          Store.actions.addAttendanceMachine(self.info, function(data) {
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
          self.info.id = self.id;
          Store.actions.updateMachine(self.info, function(data) {
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
      nodeClicked(data) {

        var self = this;
        if (data instanceof Array) {
          self.info.otherid ='['+ data.map((item) => {
            return item.organizeID
          }).join(',') +']';
          self.info.orgDisplayName = data.map((item) => {
            return item.text
          }).join(',');;
        } else {
          self.info.otherid = data.organizeID;
          self.info.orgDisplayName = data.text;
        }

      }
    },
    ready() {
      var self = this;
      if (this.id != "") {
        Store.actions.getOneMachine({
          ID: this.id
        }, function(data) {
          data.orgDisplayName = data.orgName;
          self.info = data;
        }, function(error) {
          self.$root.showTip({
            type: 'danger',
            msg: error,
            duration: 2000
          });
        })
      }
      //加载设备厂商
      Store.actions.findSystemConfig("143000", '', function(data) {
        self.vendors = data;
      }, function(error) {
        self.$root.showTip({
          type: 'danger',
          msg: error,
          duration: 2000
        });
      });
      //加载设备厂商
      Store.actions.findSystemConfig("144000", '', function(data) {
          self.types = data;
        }, function(error) {
          self.$root.showTip({
            type: 'danger',
            msg: error,
            duration: 2000
          });
        })
        //加载设备用途
      Store.actions.findSystemConfig("145000", '', function(data) {
        self.useTypes = data;
      }, function(error) {
        self.$root.showTip({
          type: 'danger',
          msg: error,
          duration: 2000
        });
      })

      Store.actions.loadOrgListTree(function(data) {
        console.log(data);
        self.org = data;
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
  top: 4px;
  right: 0;
  color: #999;
}

.disabled {
  pointer-events: none;
}
</style>
