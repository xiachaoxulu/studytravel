<!--
* @Created Date       : 2016-11-07T10:07:27+08:00
* @Last Modified time : 2016-12-05T17:33:23+08:00
 -->


<template>
  <div class="wrap">
    <header class="ui-module-navbar pos-topbar-fixed">
      <div class="ui-module-navbar-content">
        <div class="pull-left title">
          <h4><strong>假期规则</strong></h4>
        </div>
        <div class="pull-left emp-center-tab">
          <ui-buttongroup active-class="btn-primary">
            <button type="button" class="btn btn-primary" @click="yearRule">年假规则</button>
            <button type="button" class="btn btn-default" @click="otherRule">其他规则</button>
          </ui-buttongroup>
        </div>
        <div class="pull-right vacation-right">
          <button type="button" data-toggle="dropdown" class="ui-tool-button" @click="add">
            <span class="icon icon-tool icon-tool-add pull-left"></span>
            <span class="_name pull-left">添加</span>
          </button>
          <button type="button " class="ui-tool-button" @click="edit">
            <span class="icon icon-tool icon-tool-edit pull-left"></span>
            <span class="_name pull-left">修改</span>
          </button>
          <button type="button " class="ui-tool-button" @click="delete">
            <span class="icon icon-tool icon-tool-delete pull-left"></span>
            <span class="_name pull-left">删除</span>
          </button>
          <!-- 去除筛选按钮 -->
          <button type="button " class="ui-tool-button" @click="copy" v-if="currentRuleName != '其他规则'">
            <span class="icon icon-tool icon-tool-save pull-left"></span>
            <span class="_name pull-left">复制</span>
          </button>
          <!--  <button type="button " class="ui-tool-button">
            <span class="icon icon-tool icon-tool-filter pull-left"></span>
            <span class="_name pull-left">列选</span>
          </button> -->
  
        </div>
      </div>
    </header>
    <div class="wrap-content">
      <ui-grid v-ref:table :url="ruleUrl" :reader="reader" class="testtable" selectable="multi" :fields="fields" :nopaging="true" :perpage="30" :pages="[10,20,30,50]" :btrefresh="true" checked="multi" :selected.sync="selected" height="auto" tdheight="50px"></ui-grid>
    </div>
    <components :is="what" :id="id" :display.sync="dymicshow" v-if="dymicshow" :component-call-back="componentCallBack">
    </components>
    <ui-confirm @confirmed="confirmed" confirm-button-text="是" deny-button-text="否" :show.sync="deletedialogShow" close-on-confirm header="提示">
      数据删除不可恢复,是否继续
    </ui-confirm>
    <ui-sidecontent :show.sync="bigdymicshow">
      <components :is="bigwhat" v-if="bigdymicshow" :id="id" :name="scopename">
      </components>
    </ui-sidecontent>
    <copy-year-rule :id="id" :name="yearname" :display.sync="copydisplay" v-if="copydisplay" :component-call-back="componentCallBack"></copy-year-rule>
  </div>
</template>
<script>
import store from '../store'
import addYearRule from './addYearRule'
import addOtherRule from './addOtherRule'
import yearRuleScope from './yearRuleScope'
import otherRuleScope from './otherRuleScope'
import copyYearRule from './copyYearRule'

let yearfileds = [{
  name: 'ctrl',
  title: '员工范围',
  width: 100,
  locked: 'first',
  formater: function(value, data, index) {
    return '<span class="icon icon-tool icon-tool-apply pull-left" onclick="vacation.scope(\'' + data.id + '\',\'' + data.holidayname + '\')"></span>'
  }
}, {
  name: 'holidayname',
  title: '年假规则',
  width: 100,
  locked: 'first'
}, {
  name: 'effectivetimeName',
  title: '生效时间',
  width: 200,
}, {
  name: 'isextensionName',
  title: '是否延期',
  width: 100,
}, {
  name: 'postponetime',
  title: '延期时间',
  width: 100,
}, {
  name: 'ageTypeName',
  title: '工作年限',
  width: 100,
}, {
  name: 'hmixName',
  title: '最小单位',
  width: 100,
}, {
  name: 'formulatext',
  title: '公式',
  width: 100,
}, {
  name: 'numberruleName',
  title: '取数规则',
  width: 100,
}, {
  name: 'cleartime',
  title: '清零时间',
  width: 100,
}];

let yearUrl = "api.Settings.getYearRuleList";
let otherUrl = "api.Settings.getOtherRuleList";

let otherfileds = [{
  name: 'ctrl',
  title: '员工范围',
  width: 100,
  locked: 'first',
  formater: function(value, data, index) {
    return '<span class="icon icon-tool icon-tool-refresh pull-left" onclick="vacation.scope(\'' + data.id + '\',\'' + data.holidayname + '\')"></span>'
  }
}, {
  name: 'holidayvalue',
  title: '假期类型',
  width: 100,
  locked: 'first',
  formater: (value, data, index) => {
    var h = window.vacation.holidaytypes[data.holidaytype];
    return h ? h : "";
  }
}, {
  name: 'holidayname',
  title: '规则名称',
  width: 100,
}, {
  name: 'valueName',
  title: '值类型',
  width: 100,
}, {
  name: 'fixedvalue',
  title: '固定值',
  width: 100,
}, {
  name: 'mixunit',
  title: '假期最小单位',
  width: 100,
}, {
  name: 'sickmax',
  title: '病假转事假天数',
  width: 100,
}, {
  name: 'cleartimeName',
  title: '清零时间',
  width: 100,
}, {
  name: 'sickclearyear',
  title: '病假取消年假',
  width: 100,
}, {
  name: 'thingclearyear',
  title: '事假取消年假',
  width: 100,
}];

export default {
  data() {
      return {
        reader: {
          idProperty: 'id',
          successProperty: 'success', // 成功
          errmsgProperty: 'err_msg', // 失败提示
          totalProperty: 'result.recordCount', // 数据总量
          rootProperty: 'result.recordList', // 数据
        },
        bigdymicshow: false, //员工范围控制
        bigwhat: '', //员工范围控制
        scopename: '',

        deletedialogShow: false,
        state: store.state,
        dymicshow: false,
        what: '',

        copydisplay: false,
        id: '', //编辑的ID
        yearname: '', //年假名称

        ruleUrl: yearUrl, //规则列表地址
        currentRuleName: '年假规则', //当前假期规则
        selected: [], //所有选择项
        fields: yearfileds,

        holidaytypes: {}
      };
    },
    components: {
      addYearRule,
      addOtherRule,
      yearRuleScope,
      otherRuleScope,
      copyYearRule
    },
    methods: {
      add() {
        if (this.currentRuleName == "其他规则") {
          this.addother()
        } else {
          this.addyear()
        }
      },
      load() {
        //加载假期类型
        store.actions.findSystemConfigNotKey("133000", (data) => {
          var obj = {};
          if (Array.isArray(data)) {
            data.forEach((item) => {
              obj[item.code] = item.codeName
            });
          }
          this.holidaytypes = obj;
        }, (error) => {
          this.$root.showTip({
            type: 'danger',
            msg: error,
            duration: 2000
          });
        });

      },

      //员工范围
      scope(id, name) {
        this.id = id;
        this.scopename = name;
        if (this.currentRuleName != "其他规则") {
          this.$data.bigwhat = 'yearRuleScope';
          this.$data.bigdymicshow = true;
        } else {
          this.$data.bigwhat = 'otherRuleScope';
          this.$data.bigdymicshow = true;
        }
      },
      //添加修改回调
      componentCallBack() {
        this.$refs.table.refresh();
      },
      yearRule() {
        if (this.currentRuleName != "年假规则") {
          this.currentRuleName = "年假规则";
          this.ruleUrl = yearUrl;
          this.fields = yearfileds;
          this.selected = [];
          setTimeout(() => {
            this.$refs.table.refresh();
          }, 200)

        }
      },
      otherRule() {
        if (this.currentRuleName != "其他规则") {
          this.currentRuleName = "其他规则";
          this.ruleUrl = otherUrl;
          this.fields = otherfileds;
          this.selected = [];
          setTimeout(() => {
            this.$refs.table.refresh();
          }, 200)
        }
      },
      //添加年假规则
      addyear() {
        this.id = "";
        this.$data.dymicshow = true;
        this.$data.what = 'addYearRule';
      },
      addother() {
        this.id = "";
        this.$data.what = 'addOtherRule';
        this.$data.dymicshow = true;
      },
      //编辑
      edit() {
        if (this.selected.length == 0) {
          this.$root.showTip({
            type: 'danger',
            msg: "请选择要操作的数据",
            duration: 2000
          });
          return;
        }
        if (this.selected.length > 1) {
          this.$root.showTip({
            type: 'danger',
            msg: "请选择要单条数据进行编辑",
            duration: 2000
          });
          return;
        }
        this.id = this.selected[0];
        if (this.currentRuleName != "其他规则") {
          this.$data.what = 'addYearRule';
          this.$data.dymicshow = true;
        } else {
          this.$data.what = 'addOtherRule';
          this.$data.dymicshow = true;
        }
      },
      //删除
      delete() {
        var self = this;
        if (self.selected.length == 0) {
          self.$root.showTip({
            type: 'danger',
            msg: '请选择数据进行操作',
            duration: 2000
          });
          return;
        }
        self.deletedialogShow = true;
      },
      confirmed() {
        var self = this;
        if (this.currentRuleName == "其他规则") {
          store.actions.deleteOtherRule(self.selected, function(data) {
            self.$refs.table.refresh();
          }, function(error) {
            self.$root.showTip({
              type: 'danger',
              msg: error,
              duration: 2000
            });
          });
        } else {
          store.actions.deleteYearRule(self.selected, function(data) {
            self.$refs.table.refresh();
          }, function(error) {
            self.$root.showTip({
              type: 'danger',
              msg: error,
              duration: 2000
            });
          });
        }


      },
      //复制规则
      copy() {
        var self = this;
        if (self.currentRuleName == "其他规则") {
          self.$root.showTip({
            type: 'danger',
            msg: '只能针对年假规则进行复制',
            duration: 2000
          });
          return;
        }
        if (self.selected.length == 0) {
          self.$root.showTip({
            type: 'danger',
            msg: '请选择数据进行操作',
            duration: 2000
          });
          return;
        }
        if (this.selected.length > 1) {
          this.$root.showTip({
            type: 'danger',
            msg: "请选择要单条数据进行编辑",
            duration: 2000
          });
          return;
        }
        this.id = this.selected[0];
        var data = self.$refs.table.getSelections();
        this.yearname = data[0].holidayname;

        self.copydisplay = true;
      },
      //导入
      importexcel() {

      },
      //导出
      exportexcel() {

      },
      //打印
      print() {

      }
    },
    init() {
      window.vacation = this;
    },
    created() {
      this.load();
    }
};
</script>
<style lang="css" scoped>
.vacation-right {
  margin-right: 30px;
}

.title {
  margin-right: 20px;
}

.wrap,
.wrap-content {
  height: 100%;
  background: #fff;
}

.wrap-content {
  position: relative;
}

.testtable {
  left: 10px;
  right: 10px;
  top: 10px;
  bottom: 10px;
}
</style>
