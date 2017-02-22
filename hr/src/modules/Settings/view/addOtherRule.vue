<!--
* @Created Date       : 2016-11-07T10:07:26+08:00
* @Last Modified time : 2016-12-02T17:07:07+08:00
 -->
<template>
  <ui-modal :show.sync="display" header="其他规则" type="large" hide-footer>
    <ui-validator name="validation1" v-ref:validator>
      <form class="form-horizontal container-fluid" role="form" vali-submit="submitBt|submit">
        <div class="row text-center block">
          <span class="block-content">基本信息</span>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <div class="form-group   row">
              <label class="col-sm-6 control-label"><span class="must">*</span>假期类型</label>
              <div class="col-sm-18">
                <select v-model="info.holidaytype" class="form-control" vali="required" vali-msg='必填项'>
                  <option value="">请选择假期类型</option>
                  <template v-for="item in holidaytypes">
                    <option value="{{item.code}}" :selected="item.code==info.holidaytype">{{item.codeName}}</option>
                  </template>
                </select>
              </div>
            </div>
          </div>
          <div class="col-sm-12">
            <div class="form-group  row">
              <label class="col-sm-6  control-label"><span class="must">*</span>假期规则</label>
              <div class="col-sm-18">
                <input type="text" v-model="info.holidayname" vali="required" vali-msg='必填项' class="form-control" placeholder="请输入假期名称">
              </div>
            </div>
          </div>
        </div>
        <div v-if="info.holidaytype!='133005' && info.holidaytype!='133002'">
          <div class="row">
            <div class="col-sm-12">
              <div class="form-group  row">
                <label class="col-sm-6  control-label"><span class="must">*</span>值类型</label>
                <div class="col-sm-18">
                  <select v-model="info.valuetype" class="form-control" vali="required" vali-msg='必填项'>
                    <option value="">请选择值类型</option>
                    <template v-for="item in valuetypes">
                      <option value="{{item.code}}" :selected="item.code==info.valuetype">{{item.codeName}}</option>
                    </template>
                  </select>
                </div>
              </div>
            </div>
            <div class="col-sm-12">
              <div class="form-group  row">
                <template v-if="info.valuetype=='1'">
                  <label class="col-sm-6 control-label"><span class="must">*</span>固定值</label>
                  <div class="col-sm-18">
                    <input type="text" v-model="info.fixedvalue" class="form-control" placeholder="请输入固定值" value="1" vali="required|minNum:1|maxNum:365" vali-msg="必填项|固定值应为数字" autocomplete="off">
                  </div>
                </template>
                <template v-else>
                  <label class="col-sm-6 control-label">固定值</label>
                  <div class="col-sm-18">
                    <input type="text" v-model="info.fixedvalue" class="form-control" placeholder="请输入固定值" readonly value="0" autocomplete="off">
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
        <div v-if="info.holidaytype!='133006' && info.holidaytype!='133004' && info.holidaytype!='133007'">
          <div class="row">
            <!-- <div class="col-sm-12">
                <div class="form-group  row">
                  <label class="col-sm-6 control-label"><span class="must">*</span>生效时间</label>
                  <div class="col-sm-18">
                    <select v-model="info.effectivetime" class="form-control" vali="required" vali-msg='必填项'>
                      <option value="">请选择生效时间</option>
                      <template v-for="item in effectivetimes">
                        <option value="{{item.code}}" :selected="item.code==info.effectivetime">{{item.codeName}}</option>
                      </template>
                    </select>
                  </div>
                </div>
              </div> -->
            <div class="col-sm-12">
              <div class="form-group  row">
                <label class="col-sm-6  control-label"><span class="must">*</span>最小单位</label>
                <div class="col-sm-18">
                  <select v-model="info.hmix" class="form-control inline-select" vali="required" vali-msg='必填项'>
                    <option value="">请选择数值</option>
                    <template v-for="item in hmixs">
                      <option value="{{item.code}}" :selected="item.code==info.hmix">{{item.codeName}}</option>
                    </template>
                  </select>
                  <select v-model="info.unit" class="form-control inline-select" vali="required" vali-msg='必填项'>
                    <option value="">请选择单位</option>
                    <template v-for="item in units">
                      <option value="{{item.code}}" :selected="item.code==info.unit">{{item.codeName}}</option>
                    </template>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="row">
              <div class="col-sm-12">
                <div class="form-group  row">
                  <label class="col-sm-6  control-label">清零时间</label>
                  <div class="col-sm-18">
                    <select v-model="info.cleartime" class="form-control">
                      <option value="">请选择清零时间</option>
                      <template v-for="item in cleartimes">
                        <option value="{{item.code}}" :selected="item.code==info.cleartime">{{item.codeName}}</option>
                      </template>
                    </select>
                  </div>
                </div>
              </div>
            </div> -->
          <div v-if="info.holidaytype=='133005'">
            <div class="row text-center block">
              <span class="block-content">其他设置</span>
            </div>
            <div class="othersettingitem">
              <ui-checkbox :value.sync="othersetting[0]" checked class="check">病假在一年内累积超过</ui-checkbox>
              <input type="text" :disabled="!othersetting[0]" v-model="info.sickmax" class="form-control inline-input" vali="minNum:1" vali-msg="应为数字" autocomplete="off">
              <span>,将超出天数自动转为事假</span>
            </div>
            <div class="othersettingitem">
              <ui-checkbox :value.sync="othersetting[1]" checked class="check">病假在一年内累积超过</ui-checkbox>
              <input type="text" v-model="info.sickclearyear" :disabled="!othersetting[1]" class="form-control inline-input" vali="minNum:1" vali-msg="应为数字" autocomplete="off">
              <span>,取消年假</span>
            </div>
          </div>
          <div v-if="info.holidaytype=='133002'">
            <div class="row text-center block">
              <span class="block-content">其他设置</span>
            </div>
            <div class="othersettingitem">
              <ui-checkbox :value.sync="othersetting[2]" checked class="check">事假在一年内累积超过</ui-checkbox>
              <input type="text" v-model="info.thingclearyear" :disabled="!othersetting[2]" class="form-control inline-input" vali="minNum:1" vali-msg="应为数字" autocomplete="off">
              <span>天,取消年假</span>
            </div>
          </div>
        </div>
        <div class="row text-center block">
          <span class="block-content">员工范围</span>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <div class="form-group  row">
              <label class="col-sm-6 control-label">组织</label>
              <div class="col-sm-18">
                <combo-tree :treedata="orgs" :multiple="true" :checkable="true" idprop="ID" :rootvisible="false" :nodeclicked="nodeClicked">
                  <div data-toggle="dropdown">
                    <div class="choose-input">
                      <input type="text" class="form-control" v-model="orgDisplayName" placeholder="请选择组织" readonly>
                      <i class="icon-tool icon-tool-search"></i>
                    </div>
                  </div>
                </combo-tree>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-24">
            <div class="form-group  row">
              <label class="col-sm-3 control-label">待选岗位</label>
              <div class="col-sm-21">
                <div class="form-group  row">
                  <div class="col-sm-20">
                    <ui-checkboxgroup class="post-container" :list="posts" name="name" id="ID" :value.sync="postschecked">
                    </ui-checkboxgroup>
                  </div>
                  <div class="col-sm-4">
                    <button type="button" class="computer control" @click="addpost">添加</button>
                    <button type="button" class="computer control" @click="addpostall">全部添加</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-24">
            <div class="form-group  row">
              <label class="col-sm-3 control-label">已选岗位</label>
              <div class="col-sm-21">
                <div class="form-group  row">
                  <div class="col-sm-20">
                    <ui-checkboxgroup class="post-container" :list="chooseposts" name="name" id="ID" :value.sync="choosechecked">
                    </ui-checkboxgroup>
                  </div>
                  <div class="col-sm-4">
                    <button type="button" class="computer control" @click="deletepost">删除</button>
                    <button type="button" class="computer control" @click="deletepostall">全部删除</button>
                  </div>
                </div>
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
import store from '../store'

export default {
  data() {
      return {
        info: {
          holidaytype: '', //假期类型133000
          holidayname: '', //假期规则
          valuetype: '', //值类型
          // effectivetime: '', //生效时间
          fixedvalue: '', //固定值
          hmix: '', //假期最小单位
          sickmax: '', //病假转事假天数
          // cleartime: '', //清零时间
          sickclearyear: '', //病假取消年假
          thingclearyear: '', //事假取消年假
          unit: '', //单位
        },
        orgs: [],
        orgDisplayName: '',
        organizeID: [],

        holidaytypes: [],
        // effectivetimes: [], //年假生效时间
        // cleartimes: [], //清零时间

        othersetting: [false, false, false],
        valuetypes: [{
          code: '1',
          codeName: '固定值'
        }, {
          code: '2',
          codeName: '非固定值'
        }],
        units: [{
          code: "1",
          codeName: "小时"
        }, {
          code: "2",
          codeName: "天"
        }],
        hmixs: [{
          code: "1",
          codeName: "1"
        }, {
          code: "0.5",
          codeName: "0.5"
        }],

        posts: [], //根据组织选择查询出所属该组织的岗位
        chooseposts: [], //已选岗位
        postschecked: [], //待选岗位check
        choosechecked: [], //已选岗位check

      }
    },
    events: {
      submit() {
        var self = this;
        //如果选择的是固定类型，则检查是否填写了固定值
        if (self.valuetype == "1") {
          if (self.fixedvalue == "") {
            self.$root.showTip({
              type: 'danger',
              msg: "请填写固定值",
              duration: 2000
            });
            return;
          }
        }

        //如果othersetting 第一项勾选则检查其对象项是否有值
        // if (self.othersetting[0]) {
        //   if (self.info.sickmax == "") {
        //     self.$root.showTip({
        //       type: 'danger',
        //       msg: "请填写病假转事假天数",
        //       duration: 2000
        //     });
        //     return;
        //   }
        // }
        // if (self.othersetting[1]) {
        //   if (self.info.sickclearyear == "") {
        //     self.$root.showTip({
        //       type: 'danger',
        //       msg: "请填写病假取消年假天数",
        //       duration: 2000
        //     });
        //     return;
        //   }
        // }
        // if (self.othersetting[2]) {
        //   if (self.info.thingclearyear == "") {
        //     self.$root.showTip({
        //       type: 'danger',
        //       msg: "请填写事假取消年假天数",
        //       duration: 2000
        //     });
        //     return;
        //   }
        // }

        if (this.id == "") {
          store.actions.insertOtherRule({
            info: JSON.stringify(self.info),
            posts: JSON.stringify(self.chooseposts)
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
        } else {
          self.info.id = self.id;
          store.actions.updateOtherRule({
            info: JSON.stringify(self.info),
            posts: JSON.stringify(self.chooseposts)
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
      }
    },
    watch: {

      'info.valuetype': function(a, b) {
        this.$nextTick(() => {
          this.$refs.validator.refresh();
        })
      },
      'info.holidaytype': function(a, b) {
        if (b != "") {
          this.othersetting = [false, false, false];
          this.info.valuetype = ''; //值类型
          // this.info.effectivetime = ''; //生效时间
          this.info.fixedvalue = ''; //固定值
          this.info.hmix = ''; //假期最小单位
          this.info.sickmax = ''; //病假转事假天数
          // cleartime= ''; //清零时间
          this.info.sickclearyear = ''; //病假取消年假
          this.info.thingclearyear = ''; //事假取消年假
          this.info.unit = ''; //单位

          if (a == '133006' || a == '133004' || a == '133007') {
            this.valuetypes = [{
              code: '1',
              codeName: '固定值'
            }]
          } else {
            this.valuetypes = [{
              code: '1',
              codeName: '固定值'
            }, {
              code: '2',
              codeName: '非固定值'
            }]
          }


        }
        this.$nextTick(() => {
          this.$refs.validator.refresh();
        })
      },
      organizeID(a, b) {
        var self = this;
        if (a.length != 0) {

          //清空岗位选择

          store.actions.loadPostTreeByOrgIDs(self.organizeID, function(data) {

            var arr = data.map((item) => {
              return {
                ID: item.ID,
                name: item.postName
              }
            });
            self.posts = arr;

          }, function(error) {
            self.$root.showTip({
              type: 'danger',
              msg: error,
              duration: 2000
            });
          })
        } else {
          self.posts = [];
          self.postschecked = [];
        }
      },
      othersetting(a, b) {
        if (!a[0]) {
          this.info.sickmax = '';
        }
        if (!a[1]) {
          this.info.sickclearyear = '';
        }
        if (!a[2]) {
          this.info.thingclearyear = '';
        }
      }
    },
    methods: {
      nodeClicked(data) {

        var self = this;
        if (data instanceof Array) {
          self.organizeID = data.map((item) => {
            return item.organizeID
          });
          self.orgDisplayName = data.map((item) => {
            return item.text
          }).join(',');
        }

      },
      //添加岗位
      addpost() {
        var self = this;
        if (self.postschecked.length == 0) {
          self.$root.showTip({
            type: 'danger',
            msg: "请选择添加岗位项",
            duration: 2000
          });
          return;
        } else {
          var arr = self.postschecked.concat([]);
          arr.forEach((item) => {
            if (self.chooseposts.length == 0 || self.chooseposts.map((c) => {
                return c.ID
              }).indexOf(item) == -1) {
              self.chooseposts.push(self.posts.find((c) => {
                if (c.ID == item) {
                  return true;
                }
              }));
            }
          });
          self.postschecked = [];
        }

      },
      //添加所有待选岗位
      addpostall() {
        var self = this;
        if (self.posts.length == 0) {
          self.$root.showTip({
            type: 'danger',
            msg: "待选岗位列表为空",
            duration: 2000
          });
          return;
        } else {
          var arr = self.posts.concat([]);
          arr.forEach((item) => {
            if (self.chooseposts.length == 0 || self.chooseposts.indexOf(item) == -1) {
              self.chooseposts.push(item);
            }
          });
          self.postschecked = [];
        }
      },
      //删除岗位
      deletepost() {
        var self = this;
        if (self.choosechecked.length == 0) {
          self.$root.showTip({
            type: 'danger',
            msg: "请选择删除岗位项",
            duration: 2000
          });
          return;
        } else {
          var arr = self.choosechecked.concat([]);
          arr.forEach((item) => {
            var index = self.chooseposts.map((c) => {
              return c.ID
            }).indexOf(item);
            if (index != -1) {
              self.chooseposts.splice(index, 1);
            }
          });
          self.choosechecked = [];
        }
      },
      //删除所有已选岗位
      deletepostall() {
        var self = this;
        self.choosechecked = [];
        self.chooseposts = [];
      }
    },
    ready() {
      var self = this;
      if (self.id != "") {
        store.actions.getOneOtherRule(self.id, function(data) {
          Object.assign(self.info, data.info);
          self.chooseposts = data.posts;
        }, function(error) {
          self.$root.showTip({
            type: 'danger',
            msg: error,
            duration: 2000
          });
        })
      }

      store.actions.loadDeptStoreTree(function(data) {
        self.orgs = data;
      }, function(error) {
        self.$root.showTip({
          type: 'danger',
          msg: error,
          duration: 2000
        });
      });
      //加载假期类型
      store.actions.findSystemConfigNotKey("133000", function(data) {
        console.log(data);
        if (Array.isArray(data)) {
          data = data.filter((item) => {
            return item.code != '133001' && item.code != '133003';
          });
        }
        self.holidaytypes = data;
      }, function(error) {
        self.$root.showTip({
          type: 'danger',
          msg: error,
          duration: 2000
        });
      });
      //加载清零时间
      // store.actions.findSystemConfigNotKey("131000", function(data) {
      //   self.cleartimes = data;
      // }, function(error) {
      //   self.$root.showTip({
      //     type: 'danger',
      //     msg: error,
      //     duration: 2000
      //   });
      // });
      //加载生效时间
      // store.actions.findSystemConfigNotKey("132000", function(data) {
      //   self.effectivetimes = data;
      // }, function(error) {
      //   self.$root.showTip({
      //     type: 'danger',
      //     msg: error,
      //     duration: 2000
      //   });
      // });
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

.inline-select {
  width: 45%;
  float: left;
}

.inline-select:first-child {
  margin-right: 10%;
}

.itemcontainer {
  display: -webkit-flex;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 10px;
}

.itemcontainer .item {
  margin-right: 10px;
  margin-bottom: 10px;
}

.condition-container {
  margin-top: 10px;
}

.computer-row {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  margin-bottom: 10px;
}

.computer-row:last-child {
  margin-bottom: 0px;
}

.computer {
  border: 1px solid #ccc;
  color: black;
  background-color: transparent;
  border-radius: 3px;
  float: left;
  margin-right: 10px;
}

.computer:last-child {
  margin-right: 0px;
}

.computer:hover {
  background-color: #DCDCDC;
}

.computer:active {
  background-color: #FC4028;
}

.single {
  width: 40px;
  height: 40px;
}

.double {
  width: 90px;
}

.double-last {
  width: 80px;
  height: 40px;
}

.control {
  width: 85px;
  height: 30px;
  margin-bottom: 10px;
}

.post-container {
  display: -webkit-flex;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  border: 1px solid #ccc;
  padding: 10px;
  padding-bottom: 0px;
  min-height: 80px;
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

.check {
  vertical-align: bottom;
}

.inline-input {
  width: 100px;
  display: inline-block;
}

.othersettingitem {
  position: relative;
  margin-bottom: 10px;
}

.othersettingitem:last-child {
  margin-bottom: 0px;
}
</style>
