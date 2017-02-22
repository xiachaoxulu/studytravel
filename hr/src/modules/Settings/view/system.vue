<!-- 系统配置页面，用户配置离职原因等各种 -->
<template>
  <div class="system-page">
    <header class="ui-module-navbar pos-topbar-fixed">
      <div class="ui-module-navbar-content">
        <div class="pull-left">
          <h4><strong>系统配置</strong></h4>
        </div>
      </div>
    </header>
    <section class="warp">
      <nav class="nav-aside">
        <ui-scrollview>
          <div class="list-group">
            <a v-for="item in configItems" class="list-group-item" v-bind:class="{ 'active': activeValue===item.value}" @click="changeItem(item)"><span>{{item.name}}</span></a>
          </div>
        </ui-scrollview>
      </nav>
      <main class="main-content">
        <div class="toolbar">
          <div class="btn-group tool" role="group">
            <button type="button" class="btn btn-default" code="setting-system-add/系统设置新增" @click="add">添加</button>
            <button type="button" class="btn btn-default" code="setting-system-update/系统设置修改" @click="update">修改</button>
            <button type="button" class="btn btn-default" code="setting-system-delete/系统设置删除" @click="delete">删除</button>
          </div>
          <!-- <div class="input-group search">
            <input v-model="searchFor" class="form-control">
            <span class="input-group-btn">
                    <button class="btn btn-primary" @click='search' code="setting-system-search/系统设置查询/disabled">搜索</button>
                </span>
          </div> -->
        </div>
        <ui-grid class="testtable" :nopaging="true" selectable="multi" :fields="fields" :datalist="state.systemConfigs" :perpage="30" :pages="[10,20,30,50]" :btrefresh="true" checked="multi" :selected.sync="selected" height="auto"></ui-grid>
      </main>
      <ui-modal :show.sync="dialogShow" header="添加/修改配置项" hide-footer>
        <div class="dialog-content">
          <ui-validator name="validation1">
            <form class="form-horizontal container-fluid" role="form" vali-submit="submitBt|confirm">
             <!--  <div class="row">
                <label class="col-sm-4 control-label">编码</label>
                <div class="col-sm-20">
                  <input type="text" v-model='itemcode' vali="required" vali-msg='必填项' class="form-control" placeholder="请输入编码">
                </div>
              </div> -->
              <br>
              <div class="row">
                <label class="col-sm-4 control-label">项目内容</label>
                <div class="col-sm-20">
                  <input type="text" v-model='itemcontent' vali="required" vali-msg='必填项' class="form-control" placeholder="请输入项目内容">
                </div>
              </div>
              <br>
              <div class="row">
                <label class="col-sm-4 control-label">排序</label>
                <div class="col-sm-20">
                  <input type="number" class="form-control" min="1" vali="required" vali-msg='必填项' v-model="itemorder" placeholder="请输入排序" />
                </div>
              </div>
              <div class="buttons">
                <ui-button color="primary" id="submitBt">确定</ui-button>
                <ui-button @click='close'>关闭</ui-button>
              </div>
            </form>
            <ui-validator name="validation1">
              <v-spinner :size="md" :fixed="false" text="" v-ref:spinner></v-spinner>
        </div>
      </ui-modal>
      <ui-confirm @confirmed="confirmed" confirm-button-text="是" deny-button-text="否" :show.sync="deletedialogShow" close-on-confirm header="提示">
        数据删除不可恢复,是否继续
      </ui-confirm>

    </section>
  </div>
</template>
<script>
//导入模块store
import store from '../store.js'
import Vue from 'vue'
const Tool = Vue.tool;

// 只允许用户配置各项值
let configItems = [{
  value: '111000',
  name: '学历'
}, {
  value: '112000',
  name: '政治面貌'
}, {
  value: '113000',
  name: '民族'
}, {
  value: '114000',
  name: '婚姻状况'
}, {
  value: '115000',
  name: '健康状况'
}, {
  value: '101000',
  name: '离职原因'
}, {
  value: '103000',
  name: '宿舍用途'
}, {
  value: '104000',
  name: '异常原因'
}, {
  value: '116000',
  name: '银行'
}, {
  value: '117000',
  name: '户口类型'
}, {
  value: '118000',
  name: '性别'
}, {
  value: '105000',
  name: '转正原因'
}, {
  value: '106000',
  name: '经营类型'
}, {
  value: '107000',
  name: '餐厅类型'
}, {
  value: '108000',
  name: '商圈类型'
}, {
  value: '109000',
  name: '异动原因'
}, {
  value: '100000',
  name: '用工类型'
}, {
  value: '102000',
  name: '重新加入原因'
}, {
  value: '120000',
  name: '员工状态'
}, {
  value: '121000',
  name: '黑名单原因'
}, {
  value: '126000',
  name: '补录原因'
}, {
  value: '127000',
  name: '排班任务'
},{
  value: '134000',
  name: '出差原因'
}, {
  value: '139000',
  name: '加班原因'
}, {
  value: '138000',
  name: '请假原因'
}, {
  value: '133000',
  name: '假期类型'
}, {
  value: '151000',
  name: '国籍'
}, {
  value: '128000',
  name: '年假生效时间'
}, {
  value: '129000',
  name: '年假工作年限'
}, {
  value: '130000',
  name: '年假取数规则'
}, {
  value: '131000',
  name: '其他规则清零时间'
}, {
  value: '132000',
  name: '其他规则生效时间'
}, {
  value: '141000',
  name: '薪资停发原因'
}, {
  value: '142000',
  name: '工资项目类别'
}, {
  value: '143000',
  name: '考勤机厂商'
}, {
  value: '144000',
  name: '考勤机类型'
}, {
  value: '145000',
  name: '考勤机用途'
}, {
  value: '146000',
  name: '异常类型'
}, {
  value: '147000',
  name: '工作流业务类型'
}, {
  value: '148000',
  name: '工资项值类型'
}, {
  value: '149000',
  name: '证件类型'
},{
  value:'152000',
  name:'离职类型'
}]

export default {
  data() {
      return {
        selected: [],
        state: store.state,
        curName:'',
        fields: [{
          name: 'code',
          title: '编码',
          locked: 'first'
        }, {
          name: 'codeName',
          title: '编码名称',
          width: 200,
          locked: 'first'
        }, {
          name: 'orderNum',
          width: 100,
          title: '排序',
        }, {
          name: 'createTime',
          title: '创建日期',
          formater: function(value, data, index) {
            return Tool.iDate(value, 'yy/mm/dd').string;
          }
        }],
        configItems: configItems,
        activeValue: '101000',
        searchFor: '',
        dialogShow: false, //添加,修改对话框
        itemorder: 1, //排序
        // itemcode: '', //编码
        itemcontent: '', //添加,修改对话框里面呈现的内容默认为空
        errorMsg: '', //错误信息
        type: 'add', //弹出框操作类型，add为添加操作，update 为修改操作
        deletedialogShow: false, //删除提示框,默认不显示
      };
    },
    methods: {
      //切换左侧的配置项
      changeItem(item) {
        this.activeValue = item.value;
        this.fields.find((item)=>{
          if(item.name=="codeName"){
            return true;
          }
        }).title=item.name;
      },
      //为当前左侧选中的定义项添加内容
      add() {
        this.dialogShow = true;
        this.type = 'add';
      },
      //为当前左侧选中的定义项修改内容
      update() {
        var self = this;
        if (self.selected.length > 1) {

          self.$root.showTip({
            type: 'danger',
            msg: '只能选择单条进行修改',
            duration: 2000
          });
          return;
        }
        if (self.selected.length == 0) {
          self.$root.showTip({
            type: 'danger',
            msg: '请选择单条进行修改',
            duration: 2000
          });
          return;
        }
        var ID = self.selected[0];
        self.state.systemConfigs.forEach((item) => {
          if (item.ID == ID) {
            self.itemorder = item.orderNum;
            // self.itemcode = item.code;
            self.itemcontent = item.codeName;
            return;
          }
        })
        this.dialogShow = true;
        self.type = 'update';
      },
      //删除当前选中的定义项内容
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
      search() {
        var self = this;
        if (self.searchFor == "") {
          return;
        }
        store.actions.findSystemConfig(this.activeValue, self.searchFor, self.mainOk, self.mainError);
      },
      //删除确认
      confirmed() {
        var self = this;
        store.actions.deleteSystemConfig(self.selected, self.activeValue, function(data) {}, function(error) {
          self.$root.showTip({
            type: 'danger',
            msg: error,
            duration: 2000
          });
        });
      },

      //弹出框关闭按钮点击事件
      close() {
        //关闭弹出框
        this.dialogShow = false;
      },
      //加载数据成功钩子
      mainOk(data) {

      },
      //加载数据失败钩子
      mainError(error) {
        this.$root.showTip({
            type: 'danger',
            msg: error,
            duration: 2000
          });
      }
    },
    watch: {
      activeValue: function(a, b) {
        store.actions.findSystemConfig(this.activeValue, '', self.mainOk, self.mainError);
      },
      dialogShow: function(a, b) {
        //如果对话框关闭,则loading也关闭
        if (!a) {
          if (this.$refs.spinner.active) {
            this.$refs.spinner.hide();
          }
          this.itemcontent = "";
          this.itemorder = "";
          // this.itemcode = "";
        }
      }
    },
    events: {
      //弹出框确认按钮点击事件
      confirm() {
        //loading show
        var self = this;
        var id = undefined;
        if (self.type == 'update') {
          id = self.selected[0];
        }
        self.$refs.spinner.show();
        store.actions.addOrUpdateSystemConfig(self.activeValue, self.itemorder, self.itemcontent, function(data) {
          self.close();
          self.$refs.spinner.hide();
        }, function(error) {
          self.$root.showTip({
            type: 'danger',
            msg: error,
            duration: 2000
          });

          self.$refs.spinner.hide();
        }, id);
      }
    },
    ready() {
      store.actions.findSystemConfig(this.activeValue, '', self.mainOk, self.mainError);
    },
    attached() {
      // 组件插入dom时进行授权检测
      this.$root.checkAuthority(this.$el);
    }
};
</script>
<style lang="css" scoped>
.system-page,
.warp {
  height: 100%;
  overflow: hidden;
}

.system-page .warp {
  background-color: #fff;
  position: relative;
}

.system-page .nav-aside {
  width: 150px;
  padding: 10px;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  overflow: hidden;
}

.system-page .list-group {
  text-align: center;
  cursor: pointer;
  overflow-x: hidden;
}

.system-page .toolbar {
  position: absolute;
  height: 40px;
  top: 10px;
  left: 0;
  width: 100%;
  overflow: hidden;
}

.system-page .tool {
  position: absolute;
  left: 0;
  top: 0;
  width: 200px;
  text-align: right;
}

.system-page .search {
  position: absolute;
  left: 210px;
  top: 0;
  width: 400px;
}

.system-page .main-content {
  position: absolute;
  padding: 10px;
  left: 160px;
  right: 0;
  top: 0;
  bottom: 0;
}

.testtable {
  position: absolute;
  top: 60px;
  left: 0px;
  right: 10px;
  bottom: 0px;
}

.dialog-content {
  position: relative;
}

.control-label {
  padding-left: 0px;
}

.buttons {
  margin-top: 30px;
  text-align: center;
}
</style>
