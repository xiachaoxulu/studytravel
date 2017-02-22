<template>
  <ui-modal :show.sync="display" :header="header" type="large" hide-footer>
    <ui-validator v-if="rule.checkworkType==1">
      <form id="attendance-rule-edit1" class="form-horizontal" role="form" vali-submit="submitBt1|submit">
        <div class="form-group row">
          <div class="col-sm-12">
            <div class="form-group row">
              <label class="col-sm-8 control-label">考勤名称：</label>
              <div class="col-sm-16">
                <input type="text" v-model="rule.checkworkName" vali="required" vali-msg="必填项" class="form-control" placeholder="请输入考勤名称" />
              </div>
            </div>
          </div>
          <div class="col-sm-12">
            <div class="form-group row">
              <div class="col-sm-24">
                <div class="radio-inline">
                  <ui-radio :model.sync="rule.checkworkType" checked label="打卡" value="1"></ui-radio>
                  <ui-radio :model.sync="rule.checkworkType" label="不打卡" value="2"></ui-radio>
                  <ui-radio :model.sync="rule.checkworkType" label="不考勤" value="3"></ui-radio>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="form-group row" v-show="rule.checkworkType == 1">
          <label class="col-sm-4 control-label">考勤月份：</label>
          <div>
            <div class="radio-inline">
              <ui-radio :model.sync="rule.periodType" label="本月" value="2"></ui-radio>
              <ui-radio :model.sync="rule.periodType" label="上月" value="1"></ui-radio>
            </div>
          </div>
        </div>
        <div class="form-group row" v-if="rule.checkworkType == 1">
          <label class="col-sm-4 control-label">考勤周期：</label>
          <div class="col-sm-20">
            <input type="text" v-model="rule.startDate" vali="required" vali-msg="必填项" class="form-control input-number" />
            <span>日 — </span>
            <input type="text" v-model="rule.endDate" vali="required|maxNum:31|minNum:1|float:0" vali-msg="必填项||1-31之间的整数" class="form-control input-number" />
            <span>日</span>
          </div>
        </div>
        <div class="form-group row" v-if="rule.checkworkType == 1">
          <label class="col-sm-4 control-label">打卡设置：</label>
          <div class="col-sm-20">
            <span>上班最早刷卡</span>
            <input type="text" v-model="rule.onBefore" class="input-number form-control" vali="required|minNum:0|float:0" vali-msg="必填项||应为整数" />
            <span>分钟</span><span>下班最晚刷卡</span>
            <input type="text" v-model="rule.offLate" class="input-number form-control" vali="required|minNum:0|float:0" vali-msg="必填项||应为整数" />
            <span>分钟</span>
          </div>
        </div>
        <div class="form-group row" v-if="rule.checkworkType == 1">
          <div class="col-sm-offset-4 col-sm-20">
            <span>上班延迟</span>
            <input type="text" v-model="rule.onDelayNotBeLate" class="input-number form-control" vali="required|minNum:0|float:0" vali-msg="必填项||应为整数" />
            <span>分钟不算迟到，上班延迟</span>
            <input type="text" v-model="rule.onDelayBeLate" class="input-number form-control" vali="required|minNum:0|float:0" vali-msg="必填项||应为整数" />
            <span>分钟记为旷工</span>
            <input type="text" v-model="rule.onAbsenteeism" class="input-number form-control" vali="required|minNum:0" vali-msg="必填项||应为数字" />
            <span>天</span>
          </div>
        </div>
        <div class="form-group row" v-if="rule.checkworkType == 1">
          <div class="col-sm-offset-4 col-sm-20">
            <span>下班提前</span>
            <input type="text" v-model="rule.offDelayNotBeLate" class="input-number form-control" vali="required|minNum:0|float:0" vali-msg="必填项||应为整数">
            <span>分钟不算早退，下班提前</span>
            <input type="text" v-model="rule.offDelayBeLate" class="input-number form-control" vali="required|minNum:0|float:0" vali-msg="必填项||应为整数">
            <span>分钟记为旷工</span>
            <input type="text" v-model="rule.offAbsenteeism" class="input-number form-control" vali="required|minNum:0" vali-msg="必填项||应为数字">
            <span>天</span>
          </div>
        </div>
        <div class="form-group row" v-show="rule.checkworkType == 1">
          <div class="col-sm-4" style="text-align: right">
            <i class="material-icons remove" title="点击清除加班设置" @click="removeOvertime()">remove_circle_outline</i>
            <label class="control-label">加班设置：</label>
          </div>
          <label class="col-sm-4 control-label">加班类型：</label>
          <div class="col-sm-16">
            <div class="radio-inline">
              <ui-radio :model.sync="rule.overtimeType" label="平常加班" value="1"></ui-radio>
              <ui-radio :model.sync="rule.overtimeType" label="休息日加班" value="2"></ui-radio>
              <ui-radio :model.sync="rule.overtimeType" label="节假日加班" value="3"></ui-radio>
            </div>
          </div>
        </div>
        <div class="form-group row" v-show="rule.checkworkType == 1">
          <label class="col-sm-offset-4 col-sm-4 control-label">结算方式：</label>
          <div class="col-sm-16">
            <div class="radio-inline">
              <ui-radio :model.sync="rule.payType" label="支付加班费" value="1"></ui-radio>
              <ui-radio :model.sync="rule.payType" label="调休" value="2"></ui-radio>
              <ui-radio :model.sync="rule.payType" label="支付加班费优先" value="3"></ui-radio>
              <ui-radio :model.sync="rule.payType" label="调休优先" value="4"></ui-radio>
            </div>
          </div>
        </div>
        <div class="form-group row" v-show="rule.checkworkType == 1">
          <label class="col-sm-offset-4 col-sm-4 control-label">加班规则：</label>
          <div class="col-sm-16">
            <div class="radio-inline">
              <ui-radio :model.sync="rule.overtimeRule" label="打卡记加班" value="1"></ui-radio>
            </div>
          </div>
        </div>
        <div class="form-group row" v-if="rule.checkworkType == 1 && rule.overtimeRule == 1">
          <div class="col-sm-offset-10 col-sm-14">
            <span>提前上班</span>
            <input type="text" v-model="rule.aheadOn" class="input-number form-control" vali="required|minNum:0|float:0" vali-msg="必填项||应为整数">
            <span>分钟记加班，延迟下班</span>
            <input type="text" v-model="rule.delayOff" class="input-number form-control" vali="required|minNum:0|float:0" vali-msg="必填项||应为整数">
            <span>分钟记加班</span>
          </div>
        </div>
        <div class="form-group row" v-show="rule.checkworkType == 1">
          <div class="col-sm-offset-8 col-sm-16">
            <div class="radio-inline">
              <ui-radio :model.sync="rule.overtimeRule" label="审批记加班" value="2"></ui-radio>
            </div>
          </div>
        </div>
        <div class="form-group row" v-show="rule.checkworkType == 1">
          <div class="col-sm-offset-8 col-sm-16">
            <div class="radio-inline">
              <ui-radio :model.sync="rule.overtimeRule" label="打卡和审批最低为准记加班" value="4"></ui-radio>
            </div>
          </div>
        </div>
        <div class="form-group row" v-show="rule.checkworkType == 1">
          <div class="col-sm-offset-8 col-sm-16">
            <div class="radio-inline">
              <ui-radio :model.sync="rule.overtimeRule" label="打卡和审批最高为准记加班" value="5"></ui-radio>
            </div>
          </div>
        </div>
        <div class="form-group row" v-show="rule.checkworkType == 1">
          <div class="col-sm-offset-8 col-sm-16">
            <div class="radio-inline">
              <ui-radio :model.sync="rule.overtimeRule" label="超额工时记加班" value="3"></ui-radio>
            </div>
          </div>
        </div>
        <div class="form-group row" v-show="rule.checkworkType == 1">
          <label class="col-sm-offset-4 col-sm-4 control-label">累计：</label>
          <div class="col-sm-16">
            <div class="radio-inline">
              <ui-radio :model.sync="rule.isAccumulativeType" label="加班不累计" value="1"></ui-radio>
              <ui-radio :model.sync="rule.isAccumulativeType" label="加班无限累计" value="2"></ui-radio>
            </div>
          </div>
        </div>
        <!-- *** -->
        <div class="form-group row" v-show="rule.checkworkType == 1">
          <div class="col-sm-offset-8 col-sm-16">
            <div class="radio-inline">
              <ui-radio :model.sync="rule.isAccumulativeType" label="加班累计清零日期每月" value="3"></ui-radio>
            </div>
            <input type="text" v-model="rule.accumulativeClearDay" class="input-number form-control" vali="minNum:1|maxNum:31|float:0" vali-msg="1-31之间的整数" />
            <div class="radio-inline" style="padding-left: 0">日</div>
          </div>
        </div>
        <div class="form-group row" v-show="rule.checkworkType == 1">
          <div class="col-sm-offset-8 col-sm-16 form-inline">
            <div class="radio-inline">
              <ui-radio :model.sync="rule.isAccumulativeType" label="加班累计" value="4"></ui-radio>
            </div>
            <input type="text" v-model="rule.howTime" class="input-number form-control" vali="minNum:1|float:0" vali-msg="应为正整数">
            <select v-model="rule.accumulativeTimeType" class="form-control">
              <option value="1">日</option>
              <option value="2">周</option>
              <option value="3">月</option>
            </select>
            <span>清零</span>
          </div>
        </div>
        <!-- *** -->
        <div class="form-group row form-inline" v-show="rule.checkworkType == 1">
          <label class="col-sm-offset-4 col-sm-4 control-label">计算方法：</label>
          <div class="col-sm-9">
            <span>最小单位</span>
            <select class="form-control" v-model="rule.overtimeUnit">
              <option value="" :selected="!rule.overtimeUnit">请选择</option>
              <option v-for="unit in overtimeUnitList" :value="unit" :selected="rule.overtimeUnit==unit">{{unit}}</option>
            </select>
            <select class="form-control" v-model="rule.overtimeUnitGenre" @change="overtimeUnitGenreChanged">
              <option value="" :selected="!rule.overtimeUnitGenre">请选择</option>
              <option value="1" :selected="rule.overtimeUnitGenre==1">天</option>
              <option value="2" :selected="rule.overtimeUnitGenre==2">小时</option>
              <option value="3" :selected="rule.overtimeUnitGenre==3">分钟</option>
            </select>
          </div>
          <label class="col-sm-7">
            <div class="radio-inline">
              <ui-radio :model.sync="rule.overtimeUnitType" label="四舍五入" value="1"></ui-radio>
              <ui-radio :model.sync="rule.overtimeUnitType" label="进位取整" value="2"></ui-radio>
              <ui-radio :model.sync="rule.overtimeUnitType" label="舍去小数取整" value="3"></ui-radio>
            </div>
          </label>
        </div>
        <div class="form-group row" v-show="rule.checkworkType == 1">
          <label class="col-sm-4 control-label">休息设置：</label>
          <div class="radio-inline">
            <ui-radio :model.sync="rule.fixedRestType" label="固定休息时间" value="1"></ui-radio>
            <ui-radio :model.sync="rule.fixedRestType" label="不固定休息时间" value="2"></ui-radio>
          </div>
        </div>
        <div class="form-group row" v-show="rule.checkworkType == 1 && rule.fixedRestType == 1">
          <div class="col-sm-offset-4">
            <template v-for="fixRest in rule.fixedRestList">
              <label class="col-sm-6" class="control-label">
                <span>{{fixRest.restStartTime+"-"+fixRest.restEndTime}}</span>
                <i class="material-icons remove" title="点击移除" @click="removeFixRest(fixRest)">remove_circle_outline</i></label>
            </template>
          </div>
        </div>
        <!-- 固定休息时间 -->
        <div class="form-group row" v-show="rule.checkworkType == 1 && rule.fixedRestType == 1">
          <div class="col-sm-offset-4">
            <span>从</span>
            <input type="text" v-model="fixedRestTime1" class="input-number form-control" vali="minNum:0|maxNum:23" vali-msg="应在0-23之间">
            <span>:</span>
            <input type="text" v-model="fixedRestTime2" class="input-number form-control" vali="minNum:0|maxNum:59" vali-msg="应在0-59之间">
            <span>到</span>
            <input type="text" v-model="fixedRestTime3" class="input-number form-control" vali="minNum:0|maxNum:23" vali-msg="应在0-23之间">
            <span>:</span>
            <input type="text" v-model="fixedRestTime4" class="input-number form-control" vali="minNum:0|maxNum:59" vali-msg="应在0-59之间">
          </div>
        </div>
        <div class="form-group row" v-show="rule.checkworkType == 1 && rule.fixedRestType == 1">
          <div class="col-sm-offset-4">
            <a href="javascript:void(0)" @click="addFixedRest">+ 添加时间段</a>
          </div>
        </div>
        <div class="form-group row" v-show="rule.checkworkType == 1 && rule.fixedRestType == 2">
          <div class="col-sm-offset-4">
            <template v-for="unfixRest in rule.fixedRestNotList">
              <label class="col-sm-9" class="control-label">
                <span>{{unfixRest.minTime+"小时—"+unfixRest.maxTime+"小时(休息"+unfixRest.cutRestTime+"分钟)"}}</span>
                <i class="material-icons remove" title="点击移除" @click="removeUnfixRest(unfixRest)">remove_circle_outline</i> </label>
            </template>
          </div>
        </div>
        <!-- 不固定休息时间 -->
        <div class="form-group row" v-show="rule.checkworkType == 1 && rule.fixedRestType == 2">
          <div class="col-sm-offset-4" style="position: relative">
            <span>上班时间</span>
            <input type="text" v-model="unfixedRestTime1" class="input-number form-control" vali="minNum:1|maxNum:24|float:2" vali-msg="应在1-24之间的最多两位小数">
            <span>小时到</span>
            <input type="text" v-model="unfixedRestTime2" class="input-number form-control" vali="minNum:1|maxNum:24|float:2" vali-msg="应为1-24之间的最多两位小数">
            <span>小时 扣减休息</span>
            <input type="text" v-model="unfixedRestTime3" class="input-number form-control" vali="minNum:1" vali-msg="应为整数">
            <span>分钟</span>
          </div>
        </div>
        <div class="form-group row" v-show="rule.checkworkType == 1 && rule.fixedRestType == 2">
          <div class="col-sm-offset-4">
            <a href="javascript:void(0)" @click="addUnfixedRest">+ 添加时间段</a>
          </div>
        </div>
        <div class="form-group row" v-show="rule.checkworkType == 1">
          <label class="col-sm-4 control-label">夜班工时设置：</label>
        </div>
        <div class="form-group row" v-show="rule.checkworkType == 1">
          <div class="col-sm-offset-4 radio-inline">
            <ui-radio :model.sync="rule.nightShiftLaborType" label="计算夜班工时" value="1"></ui-radio>
            <ui-radio :model.sync="rule.nightShiftLaborType" label="不计算夜班工时" value="2"></ui-radio>
          </div>
        </div>
        <div class="form-group row input-inline" v-show="rule.checkworkType == 1 && rule.nightShiftLaborType == 1">
          <div class="col-sm-offset-4 col-sm-20">
            <span>从</span>
            <span>
              <input type="text" v-model="nightStartTime1" class="input-number form-control" vali="minNum:0|maxNum:23" vali-msg="应在0-23之间">
            </span>
            <span>:</span>
            <span>
              <input type="text" v-model="nightStartTime2" class="input-number form-control" vali="minNum:0|maxNum:59" vali-msg="应在0-59之间">
            </span>
            <span>到</span>
            <span>
              <input type="text" v-model="nightEndTime1" class="input-number form-control" vali="minNum:0|maxNum:23" vali-msg="应在0-23之间">
            </span>
            <span>:</span>
            <span>
              <input type="text" v-model="nightEndTime2" class="input-number form-control" vali="minNum:0|maxNum:59" vali-msg="应在0-59之间">
            </span>
            <span>为夜班工时</span>
          </div>
        </div>
        <!--  <div class="form-group row" v-show="rule.checkworkType == 1 && rule.nightShiftLaborType == 1">
          <div class="col-sm-offset-4">
            <a href="javascript:void(0)">+ 添加时间段</a>
          </div>
        </div> -->
        <div class="form-group row" v-show="rule.checkworkType == 1">
          <label class="col-sm-4 control-label">日结/月结设置：</label>
        </div>
        <div class="form-group row" v-show="rule.checkworkType == 1">
          <div class="col-sm-offset-4 col-sm-8">
            <span>每天</span>
            <input type="text" v-model="everyDayReportTime1" class="input-number form-control" vali="minNum:0|maxNum:23|float:0" vali-msg="0-23之间的整数">
            <span>:</span>
            <input type="text" v-model="everyDayReportTime2" class="input-number form-control" vali="minNum:0|maxNum:59|float:0" vali-msg="0-59之间的整数">
            <span>前完成工时日结</span>
          </div>
          <div class="col-sm-4">
            <ui-switch name="s1" :value.sync="isEveryDayReportTimeBool"></ui-switch>
          </div>
        </div>
        <div class="form-group row" v-show="rule.checkworkType == 1">
          <div class="col-sm-offset-4 col-sm-20">
            <span>每月</span>
            <input type="text" class="input-number form-control" v-model="rule.monthReportStartTime" vali="minNum:1|maxNum:31|float:0" vali-msg="1-31之间的整数">
            <span>日 —</span>
            <input type="text" class="input-number form-control" v-model="rule.monthReportEndTime" vali="minNum:1|maxNum:31|float:0" vali-msg="1-31之间的整数">
            <span>日 完成工时月结</span>
          </div>
        </div>
        <div class="form-group row" v-show="rule.checkworkType == 1">
          <div class="col-sm-offset-4 col-sm-20">
            <span>有日结工时未完成不允许运行月结工时</span>
          </div>
        </div>
        <div class="form-group row" v-show="rule.checkworkType == 1">
          <label class="col-sm-4 control-label">考勤预警：</label>
        </div>
        <div class="form-group row" v-show="rule.checkworkType == 1">
          <div class="col-sm-offset-4 col-sm-8">
            <span>日工时预警值</span>
            <input type="text" class="input-number form-control" v-model="rule.dayWarningTime" vali="minNum:0.01|float:2" vali-msg="最多为2位小数数字" />
            <span>小时</span>
          </div>
          <div class="col-sm-8">
            <span>不超过</span>
            <input type="text" class="input-number form-control" v-model="rule.dayWarningSurpassTime" vali="minNum:0.01|float:2" vali-msg="最多为2位小数数字">小时
          </div>
        </div>
        <div class="form-group row" v-show="rule.checkworkType == 1">
          <div class="col-sm-offset-4 col-sm-8">
            <span>月工时预警值</span>
            <input type="text" class="input-number form-control" v-model="rule.monthWarningTime" vali="minNum:0.01|float:2" vali-msg="最多为2位小数数字" />
            <span>小时</span>
          </div>
          <div class="col-sm-8">
            <span>月工时限额</span>
            <input type="text" class="input-number form-control" v-model="rule.legalLimitTime" vali="minNum:0.01|float:2" vali-msg="最多为2位小数数字">小时
          </div>
        </div>
        <div class="form-group row" v-show="rule.checkworkType == 1">
          <div class="col-sm-offset-4 col-sm-8">
            <span>加班工时预警</span>
            <input type="text" class="input-number form-control" v-model="rule.overtimeWarningTime" vali="minNum:0.01|float:2" vali-msg="最多为2位小数数字" />
            <span>小时/月</span>
          </div>
          <div class="col-sm-8">
            <span>加班工时限额</span>
            <input type="text" class="input-number form-control" v-model="rule.overtimeLimitTime" vali="minNum:0.01|float:2" vali-msg="最多为2位小数数字">小时/月
          </div>
        </div>
        <div class="form-group row" v-if="rule.checkworkType == 1">
          <div class="col-sm-offset-4 col-sm-6">
            <input type="text" class="input-number form-control" v-model="rule.dayReportTime" vali="minNum:1|float:0" vali-msg="应为整数" />
            <span>天未完成日结提醒</span>
          </div>
          <div class="col-sm-10">
            <combo-tree :treedata="state.postTree" idprop="ID" :nodeclicked="postClicked" textprop="postName" :multiple="false">
              <div data-toggle="dropdown">
                <input type="text" readonly="readonly" v-model="rule.dayReportTimePost" class="form-control" :title="rule.dayReportTimePost" placeholder="点击选择岗位">
              </div>
            </combo-tree>
          </div>
          <div class="col-sm-4">
            <ui-switch name="s1" :value.sync="isDayReportTimeBool"></ui-switch>
          </div>
        </div>
        <div class="form-actions">
          <div class="row">
            <div class="text-center">
              <ui-button color="accent" id="submitBt1">提交</ui-button>
              <ui-button color="default" @click="showRemoveRule= true" v-if="rule.ID" __code="config-attendance-remove/删除">删除</ui-button>
            </div>
          </div>
        </div>
      </form>
    </ui-validator>
    <ui-validator v-if="rule.checkworkType!=1">
      <form id="attendance-rule-edit2" class="form-horizontal" role="form" vali-submit="submitBt2|submit">
        <div class="form-group row">
          <div class="col-sm-12">
            <div class="form-group row">
              <label class="col-sm-8 control-label">考勤名称：</label>
              <div class="col-sm-16">
                <input type="text" v-model="rule.checkworkName" vali="required" vali-msg="必填项" class="form-control" placeholder="请输入考勤名称" />
              </div>
            </div>
          </div>
          <div class="col-sm-12">
            <div class="form-group row">
              <div class="col-sm-24">
                <div class="radio-inline">
                  <ui-radio :model.sync="rule.checkworkType" label="打卡" value="1"></ui-radio>
                  <ui-radio :model.sync="rule.checkworkType" label="不打卡" value="2"></ui-radio>
                  <ui-radio :model.sync="rule.checkworkType" label="不考勤" value="3"></ui-radio>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="form-actions">
          <div class="row">
            <div class="text-center">
              <ui-button color="accent" id="submitBt2">提交</ui-button>
              <ui-button color="default" @click="showRemoveRule= true" v-if="rule.ID" __code="config-attendance-remove/删除">删除</ui-button>
            </div>
          </div>
        </div>
      </form>
    </ui-validator>
    <ui-confirm type="danger" confirm-button-text="删除" deny-button-text="取消" @confirmed="removeRule" :show.sync="showRemoveRule" close-on-confirm header="提示">
      确认要删除该条考勤规则吗？
    </ui-confirm>
  </ui-modal>
</template>
<script>
import store from '../store'
export default {
  data() {
      return {
        state: store.state,
        showRemoveRule: false,
        // 固定休息时间编辑
        fixedRestTime1: null,
        fixedRestTime2: null,
        fixedRestTime3: null,
        fixedRestTime4: null,
        // 非固定休息时间编辑
        unfixedRestTime1: null,
        unfixedRestTime2: null,
        unfixedRestTime3: null,
        overtimeUnitList: [0.5, 1]
      };
    },
    computed: {
      header() {
        return this.rule.ID == null ? '添加考勤规则' : '修改考勤规则';
      },
      // 夜班工时开始时间
      nightStartTime1: {
        get() {
          if (!this.rule.nightStartTime) return null;
          return this.rule.nightStartTime.split(':')[0];
        },
        set(val) {
          // if (!this.rule.nightStartTime) this.rule.nightStartTime = ":";
          this.rule.nightStartTime = val + ":" + this.rule.nightStartTime.split(":")[1];
        }
      },
      nightStartTime2: {
        get() {
          if (!this.rule.nightStartTime) return null;
          return this.rule.nightStartTime.split(':')[1];
        },
        set(val) {
          // if (!this.rule.nightStartTime) this.rule.nightStartTime = ":";
          this.rule.nightStartTime = this.rule.nightStartTime.split(":")[0] + ":" + val;
        }
      },
      // 夜班工时结束时间
      nightEndTime1: {
        get() {
          if (!this.rule.nightEndTime) return null;
          return this.rule.nightEndTime.split(':')[0];
        },
        set(val) {
          // if (!this.rule.nightEndTime) this.rule.nightEndTime = ":";
          this.rule.nightEndTime = val + ":" + this.rule.nightEndTime.split(":")[1];
        }
      },
      nightEndTime2: {
        get() {
          if (!this.rule.nightEndTime) return null;
          return this.rule.nightEndTime.split(':')[1];
        },
        set(val) {
          // if (!this.rule.nightEndTime) this.rule.nightEndTime = ":";
          this.rule.nightEndTime = this.rule.nightEndTime.split(":")[0] + ":" + val;
        }
      },
      // 每天工时日结时间
      everyDayReportTime1: {
        get() {
          if (!this.rule.everyDayReportTime) return null;
          return this.rule.everyDayReportTime.split(':')[0];
        },
        set(val) {
          // if (!this.rule.everyDayReportTime) this.rule.everyDayReportTime = ":";
          this.rule.everyDayReportTime = val + ":" + this.rule.everyDayReportTime.split(":")[1];
          console.log(this.rule.everyDayReportTime)
        }
      },
      everyDayReportTime2: {
        get() {
          if (!this.rule.everyDayReportTime) return null;
          console.log(this.rule.everyDayReportTime.split(':'))
          return this.rule.everyDayReportTime.split(':')[1];
        },
        set(val) {
          // if (!this.rule.everyDayReportTime) this.rule.everyDayReportTime = ":";
          this.rule.everyDayReportTime = this.rule.everyDayReportTime.split(":")[0] + ":" + val;
        }
      },
      // 开关控制
      isEveryDayReportTimeBool: {
        get() {
          if (!this.rule.isEveryDayReportTime) this.rule.isEveryDayReportTime = 0;
          return this.rule.isEveryDayReportTime == 1 ? true : false;
        },
        set(val) {
          if (!this.rule.isEveryDayReportTime) this.rule.isEveryDayReportTime = 0;
          this.rule.isEveryDayReportTime = (val ? 1 : 0);
        }
      },
      isDayReportTimeBool: {
        get() {
          if (!this.rule.isDayReportTime) this.rule.isDayReportTime = 0;
          return this.rule.isDayReportTime == 1 ? true : false;
        },
        set(val) {
          if (!this.rule.isDayReportTime) this.rule.isDayReportTime = 0;
          this.rule.isDayReportTime = (val ? 1 : 0)
        }
      }
    },
    methods: {
      overtimeUnitGenreChanged() {
        console.log(this.rule.overtimeUnitGenre)
        if (this.rule.overtimeUnitGenre == "") {
          this.overtimeUnitList = [];
          this.overtimeUnitList.$set(0, 0.5);
          this.overtimeUnitList.$set(1, 1);
          this.overtimeUnit = "";
          return;
        }
        this.overtimeUnitList = [];
        var val = parseFloat(this.rule.overtimeUnitGenre);
        if (val > 2) {
          console.log(val);
          if (this.rule.overtimeUnit != 1) this.rule.overtimeUnit = "";
          this.overtimeUnitList.$set(0, 1);
        } else {
          this.overtimeUnitList.$set(0, 0.5);
          this.overtimeUnitList.$set(1, 1);
        }
      },
      postClicked(data) {
        store.actions.getEmployeeByPostID(data.ID, (empList) => {
          if (!Array.isArray(empList) || empList.length <= 0) {
            this.$root.showTip({
              type: 'danger',
              msg: "该岗位下没有对应员工！选择失败！",
              duration: 2000
            });
            return;
          }
          var empStr = empList.map((p) => {
            return p.userName;
          }).join(',');
          this.rule.dayReportTimePost = empStr;
        }, (error) => {
          this.$root.showTip({
            type: 'danger',
            msg: error,
            duration: 2000
          });
        });
        this.rule.dayReportTimeType = data.ID;
      },
      removeOvertime() {
        this.rule.overtimeType = null; // 加班类型
        this.rule.payType = null; // 结算方式

        this.rule.overtimeRule = null; // 加班规则
        this.rule.aheadOn = null; // 提前上班[分钟]记加班
        this.rule.delayOff = null; // 延迟下班[分钟]记加班

        this.rule.isAccumulativeType = null; // 累计
        this.rule.overtimeUnitType = null; // 计算方法
        // 计算方法最小单位
        this.rule.overtimeUnit = null;
        this.rule.overtimeUnitGenre = null;
      },
      // 添加固定休息时间段
      addFixedRest() {
        if (!this.fixedRestTime1 || !this.fixedRestTime2 || !this.fixedRestTime3 || !this.fixedRestTime4) {
          this.$root.showTip({
            type: 'danger',
            msg: "请填写完整固定休息时间段！",
            duration: 2000
          });
          return;
        }
        if (!this.isInteger(this.fixedRestTime1, 0, 23) || !this.isInteger(this.fixedRestTime2, 0, 59) ||
          !this.isInteger(this.fixedRestTime3, 0, 23) || !this.isInteger(this.fixedRestTime4, 0, 59)) {
          this.$root.showTip({
            type: 'danger',
            msg: "固定休息时间段应为整数(0-23或0-59)！",
            duration: 2000
          });
          return;
        }
        if (!this.rule.fixedRestList) {
          this.$set('rule.fixedRestList', []);
        } else {
          let valid = this.rule.fixedRestList.every((item) => {
            if (item.restStartTime == this.fixedRestTime1 + ":" + this.fixedRestTime2 || item.restEndTime == this.fixedRestTime3 + ":" + this.fixedRestTime4) {
              return false;
            }
            return true;
          });
          if (!valid) {
            this.$root.showTip({
              type: 'danger',
              msg: "固定休息时间段已有重复！",
              duration: 2000
            });
            return;
          }
        }
        this.rule.fixedRestList.$set(this.rule.fixedRestList.length, {
          restStartTime: this.fixedRestTime1 + ":" + this.fixedRestTime2,
          restEndTime: this.fixedRestTime3 + ":" + this.fixedRestTime4
        });
        this.fixedRestTime1 = null;
        this.fixedRestTime2 = null;
        this.fixedRestTime3 = null;
        this.fixedRestTime4 = null;
      },
      removeFixRest(fixRest) {
        this.rule.fixedRestList.$remove(fixRest);
      },
      // 添加非固定休息时间段
      addUnfixedRest() {
        if (!this.unfixedRestTime1 || !this.unfixedRestTime2 || !this.unfixedRestTime3) {
          this.$root.showTip({
            type: 'danger',
            msg: "请填写完整非固定休息时间段！",
            duration: 2000
          });
          return;
        }
        if (!this.isFloat(this.unfixedRestTime1, 0, 24) || !this.isFloat(this.unfixedRestTime2, 0, 24) ||
          !this.isInteger(this.unfixedRestTime1, 0, 10000)) {
          this.$root.showTip({
            type: 'danger',
            msg: "固定休息时间段应为最多两位小数数字！",
            duration: 2000
          });
          return;
        }
        if (parseFloat(this.unfixedRestTime1) >= parseFloat(this.unfixedRestTime2)) {
          this.$root.showTip({
            type: 'danger',
            msg: "开始小时数应小于结束小时数！",
            duration: 2000
          });
          return;
        }
        if (!this.rule.fixedRestNotList) {
          this.$set('rule.fixedRestNotList', []);
        } else {
          let valid = this.rule.fixedRestNotList.every((item) => {
            if (item.minTime == this.unfixedRestTime1 || item.maxTime == this.unfixedRestTime2) return false;
            return true;
          });
          if (!valid) {
            this.$root.showTip({
              type: 'danger',
              msg: "非固定休息时间已有重复！",
              duration: 2000
            });
            return;
          }
        }
        this.rule.fixedRestNotList.$set(this.rule.fixedRestNotList.length, {
          minTime: this.unfixedRestTime1,
          maxTime: this.unfixedRestTime2,
          cutRestTime: this.unfixedRestTime3
        });
        this.unfixedRestTime1 = null;
        this.unfixedRestTime2 = null;
        this.unfixedRestTime3 = null;
      },
      removeUnfixRest(unfixRest) {
        this.rule.fixedRestNotList.$remove(unfixRest);
      },
      isInteger(val, min, max) {
        if (!val) return false;
        try {
          var value = parseInt(val);
          if (isNaN(value)) return false;
          if (min && max) {
            if (val < min || val > max) return false;
          }
          return true;
        } catch (e) {
          return false;
        }
      },
      isFloat(val, min, max) {
        if(!val) return false;
        try {
          var value = parseFloat(val);
          if(isNaN(value)) return false;
          if(min && max) {
            if (val < min || val > max) return false;
          }
          return true;
        } catch (e) {
          return false;
        }
      },
      verify() {
        var errorMsg = "";
        // 加班规则 -> 打卡记加班(提前上班[分钟]记加班，延迟下班[分钟]记加班)
        if (this.rule.overtimeRule == 1) {
          if (!this.rule.aheadOn) errorMsg += "提前上班分钟数记加班未填！\r\n";
          if (!this.rule.delayOff) errorMsg += "延迟下班分钟数记加班未填！\r\n";
        }
        // 加班累计 -> 加班累计清零日期每月多少日，加班累计清零
        if (this.rule.isAccumulativeType == 3) {
          if (!this.rule.accumulativeClearDay) errorMsg += "加班累计清零日期未填！\r\n";
        } else if (this.rule.isAccumulativeType == 4) {
          if (!this.rule.howTime) errorMsg += "加班累计清零未填！";
          if (!this.rule.accumulativeTimeType) errorMsg += "加班累计清零日期单位未选！\r\n";
        }

        // 固定休息时间
        console.log(this.fixedRestType)
        console.log(this.fixedRestTime1)
        console.log(this.fixedRestTime2)
        console.log(this.fixedRestTime3)
        console.log(this.fixedRestTime4)
        console.log(JSON.stringify(this.rule))
        if (this.rule.fixedRestType == 1 && this.fixedRestTime1 && this.fixedRestTime2 && this.fixedRestTime3 && this.fixedRestTime4) {
          errorMsg += "输入的固定休息时间请点击添加时间段按钮！\r\n";
        }
        // 非固定休息时间
        if (this.rule.fixedRestType == 2 && this.unfixedRestTime1 && this.unfixedRestTime2 && this.unfixedRestTime3) {
          errorMsg += "输入的非固定休息时间请点击添加时间段按钮！\r\n";
        }

        if (this.rule.overtimeRule == 3) {
          if (!this.rule.overtimeLimitTime) {
            errorMsg += '加班规则为超额工时记加班时，加班工时预警和加班工时限额必填！\r\n';
          }
        }

        // 日工时预警值不能大于最大值
        if (this.rule.dayWarningTime && this.rule.dayWarningSurpassTime && parseFloat(this.rule.dayWarningTime) > parseFloat(this.rule.dayWarningSurpassTime)) {
          errorMsg += "日工时预警值不能大于其限额值！<br/>";
        }
        // 月工时预警值不能大于月工时限额
        if (this.rule.monthWarningTime && this.rule.legalLimitTime && parseFloat(this.rule.monthWarningTime) > parseFloat(this.rule.legalLimitTime)) {
          errorMsg += "月工时预警值不能大于其限额值！<br/>";
        }
        // 加班工时预警值不能大于加班工时限额
        if (this.rule.overtimeWarningTime && this.rule.overtimeLimitTime && parseFloat(this.rule.overtimeWarningTime) > parseFloat(this.rule.overtimeLimitTime)) {
          errorMsg += "加班工时预警值不能大于其限额值！<br/>";
        }

        // 月工时预警值不能小于日工时预警值
        if (this.rule.monthWarningTime && this.rule.dayWarningTime && parseFloat(this.rule.monthWarningTime) < parseFloat(this.rule.dayWarningTime)) {
          errorMsg += "月工时预警值不能小于日工时预警值！<br/>";
        }
        // 月工时限额值不能小于日工时限额值
        if (this.rule.legalLimitTime && this.rule.dayWarningSurpassTime && parseFloat(this.rule.legalLimitTime) < parseFloat(this.rule.dayWarningSurpassTime)) {
          errorMsg += "月工时限额值不能小于日工时限额值！<br/>";
        }
        console.log(errorMsg)
        return errorMsg;
      },
      removeRule() {
        if (!this.rule.ID) return;
        store.actions.removeAttendanceRuleList([this.rule.ID], () => {
          store.actions.getAttendanceRuleList({}, null, (error) => {
            this.$root.showTip({
              type: 'danger',
              msg: error,
              duration: 2000
            });
          });
          this.display = false;
          this.$root.showTip({
            type: 'info',
            msg: '考勤规则删除成功！',
            duration: 2000
          });
        }, (error) => {
          this.$root.showTip({
            type: 'danger',
            msg: error,
            duration: 2000
          });
        });
      }
    },
    props: {
      rule: {
        default: () => {
          return {
            fixedRestList: [],
            fixedRestNotList: [],
            fixedRestListStr: null,
            fixedRestNotPojoListStr: null
          };
        },
        twoWay: true
      },
      display: {
        default: false,
        twoWay: true
      }
    },
    events: {
      submit() {
        var errorMsg = this.verify();
        console.log(errorMsg);
        if (errorMsg.length > 0) {
          this.$root.showTip({
            type: 'danger',
            msg: errorMsg,
            duration: 2000
          });
          return;
        }

        if (this.rule.fixedRestNotList) this.$set('rule.fixedRestNotPojoListStr', JSON.stringify(this.rule.fixedRestNotList));

        if (this.rule.fixedRestList) this.$set('rule.fixedRestListStr', JSON.stringify(this.rule.fixedRestList));

        delete this.rule.fixedRestNotList;
        delete this.rule.fixedRestList;

        console.log(JSON.stringify(this.rule))
        if (this.rule.ID) {
          store.actions.editAttendanceRule(this.rule, () => {
            store.actions.getAttendanceRuleList({}, null, (error) => {
              this.$root.showTip({
                type: 'danger',
                msg: error,
                duration: 2000
              });
            });
            this.display = false;
          }, (error) => {
            this.$root.showTip({
              type: 'danger',
              msg: error,
              duration: 2000
            });
          });
        } else {
          store.actions.addAttendanceRule(this.rule, () => {
            store.actions.getAttendanceRuleList({}, null, (error) => {
              this.$root.showTip({
                type: 'danger',
                msg: error,
                duration: 2000
              });
            });
            this.display = false;
          }, (error) => {
            this.$root.showTip({
              type: 'danger',
              msg: error,
              duration: 2000
            });
          });
        }
      }
    },
    ready() {
      store.actions.loadPostTree();
      if (!this.rule.checkworkType) this.$set('rule.checkworkType', 1);
      if (this.rule.checkworkType == 1 && !this.rule.periodType) {
        this.$set('rule.periodType', 2);
      }
      if (!this.rule.everyDayReportTime) {
        this.$set('rule.everyDayReportTime', ":");
        console.log('everyDayReportTime: ', this.rule.everyDayReportTime)
      }
      if (!this.rule.nightStartTime) {
        this.$set('rule.nightStartTime', ":");
        console.log('nightStartTime: ', this.rule.nightStartTime)
      }
      if (!this.rule.nightEndTime) {
        this.$set('rule.nightEndTime', ":");
        console.log('nightEndTime: ', this.rule.nightEndTime)
      }
    }
};
</script>
<style lang="css" scoped>
label.ratio-inline.form-control {
  border: none !important;
}

.input-number {
  width: 55px;
  display: inline-block;
  padding: 3px 6px !important;
}

.remove {
  font-size: 20px;
  position: relative;
  top: 4px;
}

.remove:hover {
  cursor: pointer;
}

i:hover {
  color: #fd6d5a;
}

.input-inline span {
  display: inline-block;
  position: relative;
}
</style>
