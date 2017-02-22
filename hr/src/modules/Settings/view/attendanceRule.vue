<!--
* @Created Date       : 2016-09-27T19:07:25+08:00
* @Last Modified time : 2016-12-02T17:03:25+08:00
 -->
<template>
  <header class="ui-module-navbar pos-topbar-fixed">
    <div class="ui-module-navbar-content">
      <div class="pull-left">
        <h4><strong>考勤规则</strong></h4>
      </div>
    </div>
  </header>
  <section class="ui-module-content ui-panel">
    <div>
      <!--  <div class="pull-left title">
        <h4><strong>考勤规则</strong></h4>
      </div> -->
      <div class="pull-right">
        <a href="javascript:void(0)" @click="addRule" __code="config-attendance-add/添加">
          <i class="icon-tool icon-tool-add" style="color:#fd6d5a;font-size:12px;display:inline-block;"></i><span>添加</span></a>
      </div>
    </div>
    <div style="clear: both"></div>
    <ui-scrollview>
      <div class="rule-list">
        <div class="rule" v-for="rule in state.attendanceRuleList">
          <div><span class="serial">{{$index+1}}</span></div>
          <div><span class="rule-name">{{rule.checkworkName}}</span></div>
          <div>
            <v-dropdown trigger="hover">
              <div data-toggle="dropdown">
                <i class="icon-tool icon-tool-infooutline"></i>
              </div>
              <div v-if="rule.checkworkType==1" slot="dropdown-menu" class="dropdown-menu rule-info">
                <ui-scrollview>
                  <table>
                    <tr>
                      <td style="width: 80px; vertical-align: top">
                        考勤周期：
                      </td>
                      <td>
                        上月{{rule.startDate}}日——本月{{rule.endDate}}日
                      </td>
                    </tr>
                    <tr>
                      <td>
                        打卡设置：
                      </td>
                      <td>
                        上班延迟{{rule.onDelayNotBeLate}}分钟不算迟到，迟到大于{{rule.onDelayBeLate}}分钟记为旷工{{rule.onAbsenteeism}}天
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>下班提前{{rule.offDelayNotBeLate}}分钟不算早退，早退大于{{rule.offDelayBeLate}}分钟记为旷工{{rule.offAbsenteeism}}天</td>
                    </tr>
                    <!--  <tr>
                      <td></td>
                      <td>跨日打卡算 {{rule.cardType == 1 ? '前' : '后'}}一天</td>
                    </tr> -->
                    <tr>
                      <td>加班设置：</td>
                      <td v-if="rule.aheadOn || rule.delayOff">上班提前{{rule.aheadOn}}分钟打卡记加班；下班延迟{{rule.delayOff}}分钟打卡记加班</td>
                      <td v-else>无</td>
                    </tr>
                    <tr>
                      <td>
                        休息设置：
                      </td>
                      <!-- 列表 -->
                      <td v-if="rule.fixedRestList != null"><span>固定休息时间（</span><span v-for="fixedRest in rule.fixedRestList">
                      {{fixedRest.restStartTime}}-{{fixedRest.restEndTime}}
                    </span><span>）</span></td>
                      <template v-else>
                        <td v-if="rule.fixedRestNotList != null"><span>非固定休息时间（</span>
                          <template v-for="unfixedRest in rule.fixedRestNotList"><span>上班{{unfixedRest.minTime}}小时—{{unfixedRest.maxTime}}小时，休息{{unfixedRest.cutRestTime}}分钟</span>
                          </template>
                          <span>）</span></td>
                        <td v-else>无</td>
                      </template>
                    </tr>
                    <tr>
                      <td>夜班设置：</td>
                      <td v-if="rule.nightShiftLaborType == 1">{{rule.nightStartTime}}-{{rule.nightEndTime}}</td>
                      <template v-else>
                        <td v-if="rule.nightShiftLaborType == 2">不计算夜班工时</td>
                        <td v-else>无</td>
                      </template>
                    </tr>
                  </table>
                </ui-scrollview>
              </div>
              <div v-else slot="dropdown-menu" class="dropdown-menu rule-info-simple">
                {{rule.checkworkType == 1 ? '需要打卡' : (rule.checkworkType == 2 ? '无需打卡' : '不考勤')}}
              </div>
            </v-dropdown>
          </div>
          <div class="rule-fill">{{rule.checkworkType == 1 ? '需要打卡' : (rule.checkworkType == 2 ? '无需打卡' : '不考勤')}}</div>
          <div>{{rule.valid == 1 ? '启用中' : '停用'}}</div>
          <div>
            <ui-switch name="s1" :value.sync="rule.valid | ruleValid rule" checked></ui-switch>
          </div>
          <div __code="config-attendance-edit/修改" v-if="$root.checkAuthorityByID('config-attendance-edit')" @click="editRule(rule.ID)"><span class="icon icon-tool icon-tool-edit pull-left"></span><span>修改</span></div>
        </div>
      </div>
    </ui-scrollview>
    <attendance-edit :display.sync="showEdit" v-if="showEdit" :rule.sync="rule"></attendance-edit>
  </section>
</template>
<script>
import store from '../store'
import attendanceEdit from './addAttendanceRule'
export default {
  data() {
      return {
        state: store.state,
        rule: {},
        showEdit: false
      };
    },
    components: {
      attendanceEdit
    },
    filters: {
      ruleValid(value, rule) {
        if (value === true || value === false) {
          var arrIDs = [rule.ID]
          store.actions.validAttendanceRuleList({
            IDs: JSON.stringify(arrIDs),
            valid: value ? 1 : 0
          }, (data) => {
            this.$root.showTip({
              type: 'info',
              msg: '操作成功！',
              duration: 2000
            });
          }, (error) => {
            this.$root.showTip({
              type: 'danger',
              msg: error,
              duration: 2000
            });
            store.actions.getAttendanceRuleList({}, null, (error) => {
              this.$root.showTip({
                type: 'danger',
                msg: error,
                duration: 2000
              });
            });
          })
        }
        return value == 1;
      }
    },
    methods: {
      addRule() {
        this.rule = {
          checkworkOvertimeList: [{}, {}],
          fixedRestList: [],
          fixedRestNotList: [],
          fixedRestListStr: null,
          fixedRestNotPojoListStr: null,
          mobileClockList: [{}] // 移动打卡设置
        };
        this.showEdit = true;
      },
      editRule(ruleID) {
        if (!ruleID) return;
        // 加载该考勤规则数据
        store.actions.getAttendanceRuleByID(ruleID, (data) => {
          delete data.createTime;
          delete data.updateTime;
          if (!data.checkworkOvertimeList) {
            data.checkworkOvertimeList = [{}, {}];
          } else {
            if (data.checkworkOvertimeList.length <= 0) {
              data.checkworkOvertimeList = [{}, {}];
            } else if (data.checkworkOvertimeList.length == 1) {
              data.checkworkOvertimeList.push({});
            }
          }

          if(!data.mobileClockList || data.mobileClockList.length <= 0) data.mobileClockList = [{}];

          if(data.statutoryHolidaysStr) {
            data.statutoryHolidaysStr.forEach(p => {
              p.status = '1';
              p.valid = '1';
              p.flag = 'N';
            });
          } else {
            data.statutoryHolidaysStr = [];
          }
          
          console.log(JSON.stringify(data))
          this.rule = data;
          this.showEdit = true;
        }, (error) => {
          this.$root.showTip({
            type: 'danger',
            msg: error,
            duration: 2000
          });
        });
      }
    },
    attached() {
      store.actions.getAttendanceRuleList({}, null, (error) => {
        this.$root.showTip({
          type: 'danger',
          msg: error,
          duration: 2000
        });
      });
    }
};
</script>
<style lang="css" scoped>
.pull-left.title {
  margin-left: 15px;
}

.pull-right {
  margin-right: 20px;
  font-weight: bold;
}

.pull-right i {
  position: relative;
  text-align: right;
  /*top: 7px;*/
}

.pull-right span {
  display: inline-block;
}

.rule-name {
  display: inline-block;
  min-width: 130px;
}

.rule-info {
  padding: 20px;
  height: 270px !important;
  width: 500px !important;
  margin-left: 25px;
}

.rule-info-simple {
  padding: 20px;
  height: 65px !important;
  width: 100px !important;
  margin-left: 25px;
}

.rule-list {
  padding-bottom: 60px;
}

.rule {
  clear: both;
  height: 60px;
  display: flex;
  padding-bottom: 15px;
  padding-left: 12px;
  padding-right: 21px;
}

.rule:hover {
  background-color: #f2f3f5;
}

.rule i {
  position: relative;
  top: -27px;
}

.rule i:hover {
  cursor: pointer;
}

.serial {
  display: inline-block;
  text-align: center;
  font-weight: bold;
  background-color: #e5e5e5;
  width: 30px;
  border-radius: 50%;
}

.rule-fill {
  flex: 1;
}

.rule div {
  float: left;
  line-height: 30px;
  vertical-align: middle;
  height: 30px;
  padding-top: 15px;
  font-weight: bold;
}

.rule > div:nth-child(1) {
  padding-right: 14px;
}

.rule > div:nth-child(2) {
  padding-right: 8px;
  font-weight: bold;
}

.rule > div:nth-child(3) {
  padding-right: 42px;
}

.rule > div:nth-child(4) {}

.rule > div:nth-child(5) {
  padding-right: 42px;
  color: #727274;
  padding-right: 14px;
}

.rule > div:nth-child(6) {
  padding-right: 42px;
}

.rule > div:nth-child(7):hover {
  cursor: pointer;
  color: #fc664e;
}

.dropdown-group.open > .dropdown-menu {
  animation: none;
}

.ui-icon.material-icons:hover {
  color: #fd6d5a;
}
</style>
