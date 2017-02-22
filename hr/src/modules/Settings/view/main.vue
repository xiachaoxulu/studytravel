<!--
* @Created Date       : 2016-11-29T13:44:01+08:00
* @Last Modified time : 2016-12-26T17:43:57+08:00
 -->


<template>
  <!-- 模块 vue -->
  <div class="ui-module app-settings">
    <!-- 模块功能条 -->
    <header class="ui-module-navbar pos-topbar-fixed">
      <app-header :show="showNavbar"></app-header>
    </header>
    <!-- 模块主内容 -->
    <section class="ui-module-content pos-content demoShow">
      <div class="ui-module-row">
        <ui-scrollview>
          <ul class="app-settings-list">
            <li __code="config-attendance/考勤规则">
              <div class="_item" @click='kaoQItemClicked' code="setting-main-kaoq/考勤规则/disabled">
                <div class="_icon"><span class="icon icon-fn icon-attendance"></span></div>
                <div class="_name">考勤规则</div>
              </div>
            </li>
            <li __code="config-vacation/假期规则">
              <div class="_item" @click='jiaQItemClicked' code="setting-main-jiaq/假期规则/disabled">
                <div class="_icon"><span class="icon icon-fn icon-holiday"></span></div>
                <div class="_name">假期规则</div>
              </div>
            </li>
            <li __code="config-pay/薪酬规则">
              <div class="_item" @click='xinZItemClicked' code="setting-main-xinz/薪酬规则/disabled">
                <div class="_icon"><span class="icon icon-fn icon-payment"></span></div>
                <div class="_name">薪酬规则</div>
              </div>
            </li>
            <li __code="config-workflow/审批规则">
              <div class="_item" @click='shenPItemClicked' code="setting-main-shenp/审批规则/disabled">
                <div class="_icon"><span class="icon icon-fn icon-apply"></span></div>
                <div class="_name">审批设置</div>
              </div>
            </li>
            <!--<li>
              <div class="_item" @click='quanXItemClicked' code="setting-main-quanx/权限规则/disabled">
                <div class="_icon"><span class="icon icon-fn icon-authority"></span></div>
                <div class="_name">权限</div>
              </div>
            </li> -->
            <li __code="config-schedule/排班规则">
              <div class="_item" @click='paiBItemClicked'>
                <div class="_icon"><span class="icon icon-fn icon-schedule"></span></div>
                <div class="_name">排班规则</div>
              </div>
            </li>
            <li __code="config-system/系统设置">
              <div class="_item" @click='xiTItemClicked'>
                <div class="_icon"><span class="icon icon-fn icon-system"></span></div>
                <div class="_name">系统设置</div>
              </div>
            </li>
            <li __code="config-extendTable/员工扩展">
              <div class="_item" @click="extendEmployeeClicked">
                <div class="_icon"><span class="icon icon-fn icon-extendTable"></span></div>
                <div class="_name">员工扩展</div>
              </div>
            </li>
            <li __code="config-ATmachine/考勤机">
              <div class="_item" @click="attendanceMachineClicked">
                <div class="_icon"><span class="icon icon-fn icon-ATmachine"></span></div>
                <div class="_name">考勤机</div>
              </div>
            </li>
            <li __code="config-requireItem/必填项设置" v-if="isCustomService">
              <div class="_item" @click="requireItemClicked">
                <div class="_icon"><span class="icon icon-fn icon-require"></span></div>
                <div class="_name">必填项设置</div>
              </div>
            </li>
            <li __code="config-safeSetting/安全设置">
              <div class="_item" @click="safeSettingClicked">
                <div class="_icon"><span class="icon icon-fn icon-require"></span></div>
                <div class="_name">安全设置</div>
              </div>
            </li>
            <li __code="config-orgRule/组织与员工规则">
                <div class="_item" @click="employeeNumRuleClicked">
                    <div class="_icon"><span class="icon icon-fn icon-orgRule"></span></div>
                    <div class="_name">组织与员工规则</div>
                </div>
            </li>
          </ul>
        </ui-scrollview>
      </div>
    </section>
    <ui-sidecontent :show.sync="dymicshow">
      <components v-if="dymicshow" :is="what">
      </components>
    </ui-sidecontent>
  </div>
</template>
<script>
import store from '../store'
import system from './system'
import schedule from './schedule'
import vacation from './vacation'
import payment from './payment'
import approval from './approval'
import attendanceMachine from './attendanceMachine'
import attendance from './attendanceRule'
import extendEmployee from './extendEmployee'
import requireItem from './requireItem'
import safeSetting from './safeSetting'
    import employeeNumRule from './employeeNumRuleMain'
export default {
  data() {
      return {
        isCustomService:false,
        state: store.state,
        showNavbar: false,
        what: '', //动态加载组件的名称
        dymicshow: false, //控制弹出sidebar是否显示,默认为false
      }
    },
    components: {
      system,
      schedule,
      vacation,
      attendance,
      payment,
      approval,
      extendEmployee,
      attendanceMachine,
      requireItem,
      safeSetting,
      employeeNumRule
    },
    methods: {

      //点击<考勤>按钮触发
      kaoQItemClicked() {
        this.what = "attendance";
        this.dymicshow = true;
      },
      //点击<假期>按钮触发
      jiaQItemClicked() {
        this.what = 'vacation';
        this.dymicshow = true;
      },
      //点击<薪资>按钮触发
      xinZItemClicked() {
        this.what = 'payment';
        this.dymicshow = true;
      },
      //点击<审批>按钮触发
      shenPItemClicked() {
        this.what = "approval";
        this.dymicshow = true;
      },
      //点击<权限>按钮触发
      quanXItemClicked() {

      },
      //点击<排班>按钮触发
      paiBItemClicked() {
        this.what = 'schedule';
        this.dymicshow = true;
      },
      //点击<系统>按钮触发
      xiTItemClicked() {
        this.what = 'system';
        this.dymicshow = true;
      },
      //员工扩展
      extendEmployeeClicked() {
        this.what = 'extendEmployee';
        this.dymicshow = true;
      },
      attendanceMachineClicked() {
        this.what = 'attendanceMachine';
        this.dymicshow = true;
      },
      requireItemClicked() {
        this.what = 'requireItem';
        this.dymicshow = true;
      },
      safeSettingClicked() {
        this.what = 'safeSetting';
        this.dymicshow = true;
      },
      employeeNumRuleClicked(){
          this.what = 'employeeNumRule';
          this.dymicshow = true;
      },
    },
    ready() {
      this.isCustomService=this.$root.state.curUserName.toLowerCase()=='customService'.toLowerCase();
      var vm = this;
      setTimeout(function() {
        vm.showNavbar = true;
      }, 500);

    },
    attached() {
      // 组件插入dom时进行授权检测
      this.$root.checkAuthority(this.$el);

      this.userAuthorityButtons = {
        //调店
        'schedule': this.PaiBItemClicked || function() {},
        //新员工入职
        'system': this.XiTItemClicked || function() {},
      }

      var _this = this;
      this.hasReady = true;

      setTimeout(function() {
        if (_this.$route.params && _this.$route.params.action) {

          if (_this.userAuthorityButtons[_this.$route.params.action])
            _this.userAuthorityButtons[_this.$route.params.action]();

        }
      }, 500)

    },
    detached() {
      this.hasReady = false;

      // 切换至其他模块时
      this.$root._event.$emit('settings_workflowDetached');
    },
    watch: {
      dymicshow(val) {
        if (!val && !this.isCloseAll) {
          // if(('addEmployee').indexOf(this.what)>-1){
          this.$root.closeTab(this.$route.path);
          // }
        }

        this.isCloseAll = false;
      },
    },
    events: {
      routerChange(goNow) {
        let _this = this;
        this.$root.routerAction(goNow, this.hasReady, {
          // 关闭所有功能
          closeAll() {
            _this.isCloseAll = true;
            _this.dymicshow = false;
          },
          //排班规则
          'schedule': this.paiBItemClicked,
          //系统设置
          'system': this.xiTItemClicked,
          //假期
          'vacation': this.jiaQItemClicked,

          'rule': this.kaoQItemClicked,
          'iclock': this.attendanceMachineClicked,
          'payrule': this.xinZItemClicked,
          'extendTable': this.extendEmployeeClicked,
          'requireItem': this.requireItemClicked,
          'safeSetting': this.safeSettingClicked,
          'workflow': this.shenPItemClicked,
          'orgRule':this.employeeNumRuleClicked
        });
        return true;
      }

    }

}
</script>
<style scoped>
.app-settings-list {
  overflow: hidden;
}

.app-settings-list li {
  float: left;
  width: 33.3%;
  height: 200px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: all .2s ease;
}

.app-settings-list li ._item {
  height: 100%;
  margin: 5px;
  border-radius: 6px;
  background: #fff;
  text-align: center;
  overflow: hidden;
  box-shadow: 0 0 5px rgba(0, 0, 0, .1);
}

.app-settings-list li ._icon {
  height: 100px;
  margin-top: 30px;
}

.app-settings-list li .icon {
  height: 100%;
}

.app-settings-list li ._name {
  font-size: 16px;
  line-height: 50px;
}

.app-settings-list li:hover {
  transform: scale3d(.95, .95, .95);
}

.app-settings-list li:hover ._item {
  box-shadow: none;
  border: 1px solid #ddd;
}
</style>
