<!--
* @Created Date       : 2016-11-14T09:45:21+08:00
* @Last Modified time : 2016-12-02T16:01:05+08:00
 -->


<template>
  <ui-modal :show.sync="display" header="员工异动" type="large" hide-footer>
    <ui-validator name="validation1" v-ref:validator>
      <form class="form-horizontal container-fluid" role="form" vali-submit="submitBt|submit">
        <div class="row text-center block">
          <span class="block-content">基本信息</span>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <div class="form-group  row">
              <label class="col-sm-6  control-label"><span class="must">*</span>异动类型</label>
              <div class="col-sm-18">
                <select v-model="info.type" class="form-control" vali="required" vali-msg='必填项'>
                  <option value="">请选择异动类型</option>
                  <template v-for="item in types">
                    <option value="{{item.code}}" :selected="item.code==info.type">{{item.codeName}}</option>
                  </template>
                </select>
              </div>
            </div>
          </div>
          <div class="col-sm-12">
            <div class="form-group  row">
              <label class="col-sm-6  control-label"><span class="must">*</span>异动原因</label>
              <div class="col-sm-18">
                <select v-model="info.reasion" class="form-control" vali="required" vali-msg='必填项'>
                  <option value="">请选择异动原因</option>
                  <template v-for="item in reasons">
                    <option value="{{item.code}}" :selected="item.code==info.reasion">{{item.codeName}}</option>
                  </template>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <div class="form-group   row">
              <label class="col-sm-6  control-label"><span class="must">*</span>生效日期</label>
              <div class="col-sm-18">
                <ui-datepicker :time.sync="info.effectiveTime" format="yyyy-MM-dd" width="100%" vali="required" vali-msg='必填项'></ui-datepicker>
              </div>
            </div>
          </div>
        </div>
        <div v-if="info.type=='124002'">
          <div class="row text-center block">
            <span class="block-content">借调信息</span>
          </div>
          <div class="row">
            <div class="col-sm-12">
              <div class="form-group  row">
                <label class="col-sm-6  control-label">调出日期</label>
                <div class="col-sm-18">
                  <ui-datepicker disabled :start-time="info.effectiveTime" format="yyyy-MM-dd" width="100%"></ui-datepicker>
                </div>
              </div>
            </div>
            <div class="col-sm-12">
              <div class="form-group  row">
                <label class="col-sm-6  control-label">调回日期</label>
                <div class="col-sm-18">
                  <ui-datepicker :time.sync="info.endTime" format="yyyy-MM-dd" width="100%"></ui-datepicker>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row text-center block">
          <span class="block-content">组织信息</span>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <div class="form-group  row">
              <label class="col-sm-6 control-label"><span class="must">*</span>目标组织</label>
              <div class="col-sm-18">
                <combo-tree :treedata="orgs" :multiple="false" idprop="ID" :rootvisible="false" :nodeclicked="nodeClicked">
                  <div class="choose-input" data-toggle="dropdown">
                    <input type="text" class="form-control" v-model="orgDisplayName" placeholder="请选择目标组织" disabled vali="required" vali-msg='必填项'>
                    <i class="icon-tool icon-tool-search"></i>
                  </div>
                </combo-tree>
              </div>
            </div>
          </div>
          <div class="col-sm-12">
            <div class="form-group  row">
              <label class="col-sm-6 control-label"><span class="must">*</span>目标岗位</label>
              <div class="col-sm-18">
                <combo-tree :treedata="postTree" :multiple="false" idprop="ID" textprop="postName" :rootvisible="false" :nodeclicked="postnodeClicked">
                  <div class="choose-input" data-toggle="dropdown">
                    <input type="text" class="form-control" v-model="postDisplayName" placeholder="目标岗位" disabled vali="required" vali-msg='必填项'>
                    <i class="icon-tool icon-tool-search"></i>
                  </div>
                </combo-tree>
              </div>
            </div>
          </div>
        </div>
        <div v-if="info.type!='124002'">
          <div class="row">
            <div class="col-sm-12">
              <div class="form-group  row">
                <label class="col-sm-6 control-label"><span class="must">*</span>目标职级</label>
                <div class="col-sm-18">
                  <select v-model="info.toRankID" class="form-control" vali="required" vali-msg='必填项'>
                    <option value="">请选择目标职级</option>
                    <template v-for="item in ranks">
                      <option value="{{item.ID}}" :selected="item.ID==info.toRankID">{{item.rankName}}</option>
                    </template>
                  </select>
                </div>
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

        orgDisplayName: '', //组织呈现名称
        postDisplayName: '', //岗位呈现名称

        reasons: [], //异动原因
        orgs: {}, //组织树
        postTree: [], //岗位树
        ranks: [], //职级列表
        types: [{
          code: '124001',
          codeName: '调动'
        }, {
          code: '124002',
          codeName: '借调'
        }, {
          code: '124003',
          codeName: '升迁'
        }, {
          code: '124004',
          codeName: '降职'
        }], //异动类型
        info: {
          type: '', //异动类型
          endTime: '', //调回时间
          toOrganizeID: '', //目标组织
          toPostID: '', //目标岗位
          toRankID: '', //目标职级
          effectiveTime: '', //生效日期
          reasion: '', //异动原因
        }
      }
    },
    events: {
      submit() {
        var self = this;

        var oDate1 = new Date(self.info.effectiveTime);
        var oDate2 = new Date();

        oDate1 = new Date(oDate1.getFullYear() + "-" + (oDate1.getMonth() + 1) + "-" + oDate1.getDate());
        oDate2 = new Date(oDate2.getFullYear() + "-" + (oDate2.getMonth() + 1) + "-" + oDate2.getDate());

        if (oDate1 < oDate2) {
          self.$root.showTip({
            type: 'danger',
            msg: '生效日期不能小于今天',
            duration: 2000
          });
          return;
        }

        var params = this.ids.map((item) => {
          var obj = {};
          obj.userID = item;
          obj.type = self.info.type;
          obj.endTime = self.info.endTime;
          obj.toOrganizeID = self.info.toOrganizeID;
          obj.toPostID = self.info.toPostID;
          obj.toRankID = self.info.toRankID;
          obj.effectiveTime = self.info.effectiveTime;
          obj.reasion = self.info.reasion;
          return obj;
        });
        var info = {
          transferworkAll: JSON.stringify(params)
        }
        Store.actions.batchAddTransaction(info, function(data) {
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
      //组织点击
      nodeClicked(data) {
        var self = this;
        self.info.toOrganizeID = data.organizeID;
        self.orgDisplayName = data.text;
      },
      //目标岗位点击
      postnodeClicked(data) {
        var self = this;
        self.info.toPostID = data.ID;
        self.postDisplayName = data.postName;
      },
      cancel() {
        this.display = false;
      }
    },
    ready() {
      var self = this;
      //加载异动原因
      Store.actions.findSystemConfig("109000", function(data) {
        self.reasons = data;
      }, function(error) {
        self.$root.showTip({
          type: 'danger',
          msg: error,
          duration: 2000
        });
      })
      Store.actions.loadOrgListTreeNonPower(function(data) {
        self.orgs = data;
      }, function(error) {
        self.$root.showTip({
          type: 'danger',
          msg: error,
          duration: 2000
        });
      });
    },
    watch: {
      'info.toOrganizeID': function(a, b) {
        if (a != "") {
          var self = this;
          self.postDisplayName = "";
          //清空岗位选择
          self.info.toPostID = "";
          self.postTree = [];
          //清空职级选择和列表
          self.info.rankID = "";
          self.ranks = [];
          Store.actions.loadPostTreeByOrgID(self.info.toOrganizeID, function(data) {
            self.postTree = data;
          }, function(error) {
            self.$root.showTip({
              type: 'danger',
              msg: error,
              duration: 2000
            });
          })
        }
      },
      //如果岗位ID变化了，更新职级树
      'info.toPostID': function(a, b) {
        if (a != "") {
          var self = this;
          //清空职级选择,职级列表
          self.info.toRankID = "";
          self.ranks = [];
          //加载联动职级
          Store.actions.loadRankByPostID(self.info.toPostID, function(data) {
            self.ranks = data;
          }, function(error) {
            if (self.info.type != '124002') {
              self.$root.showTip({
                type: 'danger',
                msg: error,
                duration: 2000
              });
            }
          })
        }
      },
      'info.type': function(a, b) {
        this.$nextTick(()=>{
          this.$refs.validator.refresh();
        })
        //如果当前选择的是调拨,则清空职级信息。否则清空调出调回日期
        if (a == "124002") {
          this.info.toRankID = "";
        } else {
          this.info.endTime = "";
        }
      }
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
  top: 4px;
  right: 0;
  color: #999;
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
</style>
