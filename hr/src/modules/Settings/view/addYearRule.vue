<!--
* @Created Date       : 2016-11-07T10:07:27+08:00
* @Last Modified time : 2016-12-05T17:37:59+08:00
 -->
<template>
  <ui-modal :show.sync="display" header="年假规则" type="large" hide-footer>
    <ui-validator name="validation1" v-ref:validator>
      <form class="form-horizontal container-fluid" role="form" vali-submit="submitBt|submit">
        <div class="row text-center block">
          <span class="block-content">基本信息</span>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <div class="form-group   row">
              <label class="col-sm-6 control-label"><span class="must">*</span>年假规则</label>
              <div class="col-sm-18">
                <div class="choose-input">
                  <input type="text" v-model="info.holidayname" vali="required" vali-msg='必填项' class="form-control" placeholder="请输入年假名称">
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-12">
            <div class="form-group  row">
              <label class="col-sm-6  control-label"><span class="must">*</span>生效时间</label>
              <div class="col-sm-18">
                <select v-model="info.effectivetime" class="form-control" vali="required" vali-msg='必填项' style="display:inline">
                  <option value="">请选择生效时间</option>
                  <template v-for="item in effectivetimes">
                    <option value="{{item.code}}" :selected="item.code==info.effectivetime">{{item.codeName}}</option>
                  </template>
                </select>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="row">
          <div class="col-sm-12">
            <div class="form-group  row">
              <label class="col-sm-6  control-label"><span class="must">*</span>是否累积</label>
              <div class="col-sm-18">
                <select v-model="info.isaccumulation" class="form-control" vali="required" vali-msg='必填项'>
                  <option value="">请选择是否累积</option>
                  <template v-for="item in isaccumulations">
                    <option value="{{item.code}}" :selected="item.code==info.isaccumulation">{{item.codeName}}</option>
                  </template>
                </select>
              </div>
            </div>
          </div>
          <div class="col-sm-12">
            <div class="form-group  row">
              <template v-if="info.isaccumulation=='1'">
                <label class="col-sm-6 control-label"><span class="must">*</span>最大值</label>
                <div class="col-sm-18">
                  <input type="text" v-model="info.addmax" class="form-control" placeholder="请输入累计最大值" vali="required|minNum:1" vali-msg="必填项|累计最大值应为数字" autocomplete="off">
                </div>
              </template>
              <template v-else>
                <label class="col-sm-6 control-label">最大值</label>
                <div class="col-sm-18">
                  <input type="text" v-model="info.addmax" class="form-control" placeholder="请输入累计最大值" readonly value="0" autocomplete="off">
                </div>
              </template>
            </div>
          </div>
        </div> -->
        <div class="row">
          <div class="col-sm-12">
            <div class="form-group  row">
              <label class="col-sm-6  control-label"><span class="must">*</span>是否延期</label>
              <div class="col-sm-18">
                <select v-model="info.isextension" class="form-control" vali="required" vali-msg='必填项'>
                  <option value="">请选择是否延期</option>
                  <template v-for="item in isextensions">
                    <option value="{{item.code}}" :selected="item.code==info.isextension">{{item.codeName}}</option>
                  </template>
                </select>
              </div>
            </div>
          </div>
          <div class="col-sm-12">
            <div class="form-group  row">
              <template v-if="info.isextension=='1'">
                <label class="col-sm-6 control-label"><span class="must">*</span>延期时间</label>
                <div class="col-sm-18">
                  <input type="text" v-model="info.postponetime" class="form-control" placeholder="请输入延期时间" vali="required|minNum:1" vali-msg="必填项|延期时间应为数字" autocomplete="off">
                </div>
              </template>
              <template v-else>
                <label class="col-sm-6 control-label">延期时间</label>
                <div class="col-sm-18">
                  <input type="text" v-model="info.postponetime" class="form-control" placeholder="请输入延期时间" readonly value="0" autocomplete="off">
                </div>
              </template>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <div class="form-group  row">
              <label class="col-sm-6  control-label"><span class="must">*</span>司龄</label>
              <div class="col-sm-18">
                <select v-model="info.agetype" class="form-control" vali="required" vali-msg='必填项'>
                  <option value="">请选择工作年限</option>
                  <template v-for="item in agetypes">
                    <option value="{{item.code}}" :selected="item.code==info.agetype">{{item.codeName}}</option>
                  </template>
                </select>
              </div>
            </div>
          </div>
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
        <div class="row">
          <div class="col-sm-12">
            <div class="form-group  row">
              <label class="col-sm-6  control-label"><span class="must">*</span>取数规则</label>
              <div class="col-sm-18">
                <select v-model="info.numberrule" class="form-control" vali="required" vali-msg='必填项'>
                  <option value="">请选择取数规则</option>
                  <template v-for="item in numberrules">
                    <option value="{{item.code}}" :selected="item.code==info.numberrule">{{item.codeName}}</option>
                  </template>
                </select>
              </div>
            </div>
          </div>
          <div class="col-sm-12">
            <div class="form-group  row">
              <label class="col-sm-15  control-label">到达清零日期时不允许申请年假</label>
              <div class="col-sm-9">
                <ui-checkbox :value.sync="info.clearLastStatus2" style="padding-top:6px;"></ui-checkbox>
              </div>
            </div>
          </div>
        </div>
        <div><strong>参与计算项:</strong></div>
        <div class="itemcontainer">
          <template v-for="item in computeritems">
            <ui-button raised class="item" @click="formulaedit(item.name)">{{item.name}}</ui-button>
          </template>
        </div>
        <div><strong>计算器:</strong></div>
        <div class="condition-container">
          <div class="computer-row">
            <button type="button" class="computer single" @click="formulaedit('1')">1</button>
            <button type="button" class="computer single" @click="formulaedit('2')">2</button>
            <button type="button" class="computer single" @click="formulaedit('3')">3</button>
            <button type="button" class="computer single" @click="formulaedit('4')">4</button>
            <button type="button" class="computer single" @click="formulaedit('5')">5</button>
            <button type="button" class="computer single" @click="formulaedit('6')">6</button>
            <button type="button" class="computer single" @click="formulaedit('7')">7</button>
            <button type="button" class="computer single" @click="formulaedit('8')">8</button>
            <button type="button" class="computer single" @click="formulaedit('9')">9</button>
            <button type="button" class="computer single" @click="formulaedit('0')">0</button>
            <button type="button" class="computer double-last">开始</button>
          </div>
          <div class="computer-row">
            <button type="button" class="computer single" @click="formulaedit('+')">+</button>
            <button type="button" class="computer single" @click="formulaedit('-')">-</button>
            <button type="button" class="computer single" @click="formulaedit('*')">*</button>
            <button type="button" class="computer single" @click="formulaedit('/')">/</button>
            <button type="button" class="computer single" @click="formulaedit('=')">=</button>
            <button type="button" class="computer single" @click="formulaedit('>')">></button>
            <button type="button" class="computer single" @click="formulaedit('≥')">≥</button>
            <button type="button" class="computer single" @click="formulaedit('<')">
              <</button>
                <button type="button" class="computer single" @click="formulaedit('≤')">≤</button>
                <button type="button" class="computer single" @click="formulaedit('.')">.</button>
                <button type="button" class="computer double-last">结束</button>
          </div>
          <div class="computer-row">
            <button type="button" class="computer single" @click="formulaedit('(')">(</button>
            <button type="button" class="computer single" @click="formulaedit(')')">)</button>
            <button type="button" class="computer double" @click="formulaedit('如果')">如果</button>
            <button type="button" class="computer double" @click="formulaedit('并且')">并且</button>
            <button type="button" class="computer single" @click="formulaedit('则')">则</button>
            <button type="button" class="computer single" @click="formulaedit('或')">或</button>
            <button type="button" class="computer single" @click="formulaedit('与')">与</button>
            <span class="single" style="margin-right:10px;"></span>
            <button type="button" class="computer double-last" @click="clearf">清空</button>
          </div>
          <div class="computer-row">
            <span class="formulanote">公式:</span>
            <textarea class="formula" v-model="info.formulatext" readonly="true" vali="required" vali-msg='必输项'></textarea>
            <button type="button" class="computer validator" @click="validator">公式验证</button>
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
          holidayname: '',
          effectivetime: '', //生效时间
          // isaccumulation: '', //是否累计
          // addmax: '', //累计最大值
          postponetime: '', //延期时间
          formulatext: '', //公式
          agetype: '', //工作年限计算方式
          hmix: '', //最小单位
          unit: '', //单位
          cleartime: '', //清零时间
          numberrule: '', //取数规则
          isextension: '', //是否延期
          clearLastStatus: 1,
          clearLastStatus2: true
        },
        orgs: [],
        orgDisplayName: '',
        organizeID: [],
        computeritems: [{
          name: '[年假天数]'
        }, {
          name: '[司龄]'
        }, {
          name: '[工作天数]'
        }],
        numberrules: [], //取数规则
        effectivetimes: [], //年假生效时间
        agetypes: [], //工作年限
        isaccumulations: [{
          code: "1",
          codeName: "是"
        }, {
          code: "2",
          codeName: "否"
        }], //是否累积
        isextensions: [{
          code: "1",
          codeName: "是"
        }, {
          code: "2",
          codeName: "否"
        }], //是否延期
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

        validatorflag: false
      }
    },
    events: {

      submit() {
        var self = this;
        if (!self.validatorflag) {
          self.$root.showTip({
            type: 'danger',
            msg: "请先验证公式",
            duration: 2000
          });
          return;
        }
        if (this.id == "") {
          store.actions.insertYearRule({
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
          store.actions.updateYearRule({
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
      'info.clearLastStatus2': function(a, b) {
        if (a) {
          this.info.clearLastStatus = 1;
        } else {
          this.info.clearLastStatus = 0;
        }
        
      },
      'info.isaccumulation': function(a, b) {
        this.$nextTick(() => {
          this.$refs.validator.refresh();
        })
      },
      'info.isextension': function(a, b) {
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
      }
    },
    methods: {

      //验证公式是否合理
      validator() {
        var self = this;
        if (this.info.formulatext == "") {
          self.$root.showTip({
            type: 'danger',
            msg: "公式为空,请输入",
            duration: 2000
          });
          return;
        }
        store.actions.validator(this.info.formulatext, function(data) {
          self.$root.showTip({
            type: 'danger',
            msg: "公式校验成功",
            duration: 2000
          });
          self.validatorflag = true;
        }, function(error) {
          self.$root.showTip({
            type: 'danger',
            msg: error,
            duration: 2000
          });
        })
      },
      formulaedit(f) {
        this.validatorflag = false;
        this.info.formulatext += f + "";
      },
      clearf() {
        this.validatorflag = false;
        this.info.formulatext = "";
      },
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
        self.validatorflag = true;
        store.actions.getOneYearRule(self.id, function(data) {
 
          if(data.info.clearLastStatus==1){
            data.info.clearLastStatus2=true;
          }
          else{
            data.info.clearLastStatus2=false;
          }
          self.info = data.info;
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
      //加载工作年限
      store.actions.findSystemConfigNotKey("129000", function(data) {
        self.agetypes = data;
      }, function(error) {
        self.$root.showTip({
          type: 'danger',
          msg: error,
          duration: 2000
        });
      });
      //加载取数规则
      store.actions.findSystemConfigNotKey("130000", function(data) {
        self.numberrules = data;
      }, function(error) {
        self.$root.showTip({
          type: 'danger',
          msg: error,
          duration: 2000
        });
      });
      //加载生效时间
      store.actions.findSystemConfigNotKey("128000", function(data) {
        self.effectivetimes = data;
      }, function(error) {
        self.$root.showTip({
          type: 'danger',
          msg: error,
          duration: 2000
        });
      });
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
  position: relative;
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

.formulanote {
  vertical-align: middle;
  width: 40px;
  margin-right: 10px;
}

.formula {
  display: inline-block;
  margin-right: 10px;
  width: 440px;
  resize: none;
}

.validator {
  float: none !important;
  width: 80px;
  height: 60px;
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
</style>
