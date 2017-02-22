<template>
  <div>
	<ui-modal v-ref:modal :show.sync="display" :header="(rule.ID?'修改':'添加')+'考勤规则'" type="large" hide-footer>
		<ui-validator  @failed="inputFailed" v-ref:validator>
			<form class="form-horizontal form rule-add" role="form" vali-submit="submitBt1|submit">
				<!-- 公用表单头 -->
				<template v-for="1 in 1">
					<div class="form-group row">
						<label class="col-sm-3 control-label">考勤名称：</label>
						<div class="col-sm-9">
							<input type="text" v-model="rule.checkworkName" vali="required" vali-msg="必填项" tip="考勤名称" class="form-control" placeholder="请输入考勤名称"
							/>
						</div>
						<label class="radio-inline">
              <ui-radio name="checkwork_type" :model.sync="rule.checkworkType" label="打卡" value="1"></ui-radio>
              <ui-radio name="checkwork_type" :model.sync="rule.checkworkType" label="不打卡" value="2"></ui-radio>
              <ui-radio name="checkwork_type" :model.sync="rule.checkworkType" label="不考勤" value="3"></ui-radio>
            </label>
					</div>
					<div class="form-group row">
						<label class="col-sm-3 control-label">考勤月份：</label>
						<div class="col-sm-21">
							<label class="radio-inline">
                <ui-radio :model.sync="rule.periodType" label="本月" value="2"></ui-radio>
                <ui-radio :model.sync="rule.periodType" label="上月" value="1"></ui-radio>
              </label>
						</div>
					</div>
					<div class="form-group row">
						<label class="col-sm-3 control-label">考勤周期：</label>
						<div class="col-sm-21">
							<input type="text" v-model="rule.startDate" vali="required|maxNum:31|minNum:1|float:0" vali-msg="必填项||1-31之间的整数" tip="考勤周期开始日期" class="form-control input-number" />
							<span>日 — </span>
							<input type="text" v-model="rule.endDate" vali="required|maxNum:31|minNum:1|float:0" vali-msg="必填项||1-31之间的整数" tip="考勤周期结束日期" class="form-control input-number"
							/>
							<span>日</span>
						</div>
					</div>
				</template>
				<!-- Tab导航 -->
				<template v-for="1 in 1">
					<div v-show="rule.checkworkType==1" class="divider"></div>
					<div class="form-group row" v-if="rule.checkworkType==1">
						<div class="col-sm-24">
							<ui-buttongroup active-class="btn-primary">
								<button type="button" @click="tabIdx=0" class="btn btn-primary">基本设置</button>
								<button type="button" @click="tabIdx=1" class="btn btn-default">加班设置</button>
								<button type="button" @click="tabIdx=2" class="btn btn-default">预警设置</button>
								<button type="button" @click="tabIdx=4" class="btn btn-default">移动打卡设置</button>
								<button type="button" @click="tabIdx=5" class="btn btn-default">休息日设置</button>
								<button type="button" @click="tabIdx=6" class="btn btn-default">法定节假日设置</button>
								<button type="button" @click="tabIdx=3" class="btn btn-default">其他设置</button>
							</ui-buttongroup>
						</div>
					</div>
				</template>
				<!-- 基本设置 -->
				<template v-for="1 in 1">
					<div class="form-group row" v-if="rule.checkworkType==1" v-show="tabIdx==0">
						<label class="col-sm-3 control-label">打卡设置：</label>
						<div class="col-sm-21">
							<span>上班最早刷卡</span>
							<input type="text" v-model="rule.onBefore" class="input-number form-control" vali="required|minNum:0|float:0" vali-msg="必填项|应为整数" tip="基本设置-上班最早刷卡" />
							<span>分钟</span><span>下班最晚刷卡</span>
							<input type="text" v-model="rule.offLate" class="input-number form-control" vali="required|minNum:0|float:0" vali-msg="必填项|应为整数" tip="基本设置-下班最晚刷卡" />
							<span>分钟</span>
						</div>
					</div>
					<div class="form-group row" v-if="rule.checkworkType==1" v-show="tabIdx==0">
						<div class="col-sm-offset-3 col-sm-21">
							<span>上班延迟</span>
							<input type="text" v-model="rule.onDelayNotBeLate" class="input-number form-control" vali="required|minNum:0|float:0" vali-msg="必填项|应为整数" tip="基本设置-上班延迟"
							/>
							<span>分钟不算迟到，上班延迟</span>
							<input type="text" v-model="rule.onDelayBeLate" class="input-number form-control" vali="required|minNum:0|float:0" vali-msg="必填项|应为整数" tip="基本设置-上班延迟"
							/>
							<span>分钟记为旷工</span>
							<input type="text" v-model="rule.onAbsenteeism" class="input-number form-control" vali="required|minNum:0" vali-msg="必填项|应为数字" tip="基本设置-上班延迟旷工" />
							<span>天</span>
						</div>
					</div>
					<div class="form-group row" v-if="rule.checkworkType==1" v-show="tabIdx==0">
						<div class="col-sm-offset-3 col-sm-21">
							<span>下班提前</span>
							<input type="text" v-model="rule.offDelayNotBeLate" class="input-number form-control" vali="required|minNum:0|float:0" vali-msg="必填项|应为整数" tip="基本设置-下班提前">
							<span>分钟不算早退，下班提前</span>
							<input type="text" v-model="rule.offDelayBeLate" class="input-number form-control" vali="required|minNum:0|float:0" vali-msg="必填项|应为整数" tip="基本设置-下班提前">
							<span>分钟记为旷工</span>
							<input type="text" v-model="rule.offAbsenteeism" class="input-number form-control" vali="required|minNum:0" vali-msg="必填项|应为数字" tip="基本设置-下班提前旷工">
							<span>天</span>
						</div>
					</div>
				</template>
				<!-- 加班设置 -->
				<template v-for="1 in 1">
					<div class="form-group row" v-if="rule.checkworkType==1" v-show="tabIdx==1">
						<div class="col-sm-24">
							<ui-buttongroup active-class="btn-primary">
								<button type="button" @click="otTabIdx=0" class="btn btn-primary">平常加班</button>
								<button type="button" @click="otTabIdx=1" class="btn btn-default">休息日加班</button>
								<button type="button" @click="otTabIdx=2" class="btn btn-default">节假日加班</button>
							</ui-buttongroup>
						</div>
					</div>
					<!-- 平常加班 -->
					<template v-for="1 in 1">
						<div class="form-group row" v-if="rule.checkworkType==1" v-show="tabIdx==1&&otTabIdx==0">
							<label class="col-sm-3 control-label">是否启用：</label>
							<div class="col-sm-7">
								<ui-switch name="s1" :value.sync="isValidOvertime1"></ui-switch>
							</div>
						</div>
						<div class="form-group row" v-if="rule.checkworkType==1&&isValidOvertime1" v-show="tabIdx==1&&otTabIdx==0">
							<label class="col-sm-3 control-label">结算方式：</label>
							<div class="col-sm-7">
								<select class="form-control" v-model="rule.payType" vali="required" vali-msg="请选择" tip="平常加班-结算方式">
                  <option value="1" :selected="rule.payType==1">支付加班费</option>
                  <option value="2" :selected="rule.payType==2">调休</option>
                  <option value="3" :selected="rule.payType==3">支付加班费优先</option>
                  <option value="4" :selected="rule.payType==4">调休优先</option>
                </select>
							</div>
						</div>
						<div class="form-group row" v-if="rule.checkworkType==1&&isValidOvertime1" v-show="tabIdx==1&&otTabIdx==0">
							<label class="col-sm-3 control-label">加班规则：</label>
							<div class="col-sm-7">
								<select class="form-control" v-model="rule.overtimeRule" vali="required" vali-msg="请选择" tip="平常加班-加班规则">
                  <!--<option value="1" :selected="rule.overtimeRule==1">打卡记加班</option>-->
                  <option value="2" :selected="rule.overtimeRule==2">审批记加班</option>
                  <!--<option value="4" :selected="rule.overtimeRule==4">打卡和审批最低为准记加班</option>-->
                  <!--<option value="5" :selected="rule.overtimeRule==5">打卡和审批最高为准记加班</option>-->
                  <option value="3" :selected="rule.overtimeRule==3">超额工时记加班</option>
                </select>
							</div>
							<div class="col-sm-14" v-if="rule.overtimeRule==1">
								<span>提前上班</span>
								<input type="text" v-model="rule.aheadOn" class="input-number form-control" vali="required|minNum:0|float:0" vali-msg="必填项||应为整数" tip="平常加班-提前上班记加班">
								<span>分钟记加班，延迟下班</span>
								<input type="text" v-model="rule.delayOff" class="input-number form-control" vali="required|minNum:0|float:0" vali-msg="必填项||应为整数" tip="平常加班-延迟下班记加班">
								<span>分钟记加班</span>
							</div>
						</div>
						<div class="form-group row" v-if="rule.checkworkType==1&&isValidOvertime1" v-show="tabIdx==1&&otTabIdx==0">
							<label class="col-sm-3 control-label">累计：</label>
							<div class="col-sm-7">
								<select class="form-control" v-model="rule.isAccumulativeType" vali="required" vali-msg="请选择" tip="平常加班-累计">
                  <option value="1" :selected="rule.isAccumulativeType==1">加班不累计</option>
                  <option value="2" :selected="rule.isAccumulativeType==2">加班无限累计</option>
                  <option value="3" :selected="rule.isAccumulativeType==3">加班累计清零日期每月</option>
                  <option value="4" :selected="rule.isAccumulativeType==4">加班累计</option>
                </select>
							</div>
							<!-- 加班累计清零日期每月 -->
							<div class="col-sm-14 form-inline" v-if="rule.isAccumulativeType==3">
								<input type="text" v-model="rule.accumulativeClearDay" class="input-number form-control" vali="required|minNum:1|maxNum:31|float:0"
									vali-msg="1-31之间的整数" tip="平常加班-加班清零" />
								<span>日</span>
							</div>
							<!-- 加班累计 -->
							<div class="col-sm-14 form-inline" v-if="rule.isAccumulativeType==4">
								<input type="text" v-model="rule.howTime" class="input-number form-control" vali="required|minNum:1|float:0" vali-msg="必填项||应为正整数" tip="平常加班-加班清零">
								<select v-model="rule.accumulativeTimeType" vali="required" vali-msg="请选择" class="form-control" vali="required" vali-msg="请选择" tip="平常加班-加班清零周期">
                  <option value="1" :selected="rule.accumulativeTimeType==1">日</option>
                  <option value="2" :selected="rule.accumulativeTimeType==2">周</option>
                  <option value="3" :selected="rule.accumulativeTimeType==3">月</option>
                </select>
								<span>清零</span>
							</div>
						</div>
						<div class="form-group row form-inline" v-if="rule.checkworkType==1&&isValidOvertime1" v-show="tabIdx==1&&otTabIdx==0">
							<label class="col-sm-3 control-label">计算方法：</label>
							<div class="col-sm-18">
								<span>最小单位</span>
								<select class="form-control" v-model="rule.overtimeUnit" vali="required" vali-msg="请选择" tip="平常加班-计算最小单位">
                  <option value="" :selected="!rule.overtimeUnit">请选择</option>
                  <option v-for="unit in overtimeUnitList1" :value="unit" :selected="rule.overtimeUnit==unit">{{unit}}</option>
                </select>
								<select class="form-control" v-model="rule.overtimeUnitGenre" vali="required" vali-msg="请选择" tip="平常加班-计算最小单位" @change="overtimeUnitGenreChanged(1)">
                  <option value="" :selected="!rule.overtimeUnitGenre">请选择</option>
                  <option value="1" :selected="rule.overtimeUnitGenre==1">天</option>
                  <option value="2" :selected="rule.overtimeUnitGenre==2">小时</option>
                  <option value="3" :selected="rule.overtimeUnitGenre==3">分钟</option>
                </select>
								<select class="form-control" v-model="rule.overtimeUnitType" vali="required" vali-msg="请选择" tip="平常加班-计算最小单位">
                  <option value="4" :selected="rule.overtimeUnitType==4">实际值</option>
                  <option value="1" :selected="rule.overtimeUnitType==1">四舍五入</option>
                  <option value="2" :selected="rule.overtimeUnitType==2">进位取整</option>
                  <option value="3" :selected="rule.overtimeUnitType==3">舍去小数取整</option>
                </select>
							</div>
						</div>
					</template>
					<!-- 休息日加班 -->
					<template v-for="1 in 1">
						<div class="form-group row" v-if="rule.checkworkType==1" v-show="tabIdx==1&&otTabIdx==1">
							<label class="col-sm-3 control-label">是否启用：</label>
							<div class="col-sm-7">
								<ui-switch name="s1" :value.sync="isValidOvertime2"></ui-switch>
							</div>
						</div>
						<div class="form-group row" v-if="rule.checkworkType==1&&isValidOvertime2" v-show="tabIdx==1&&otTabIdx==1">
							<label class="col-sm-3 control-label">结算方式：</label>
							<div class="col-sm-7">
								<select class="form-control" v-model="rule.checkworkOvertimeList[0].payType" vali="required" vali-msg="请选择" tip="休息日加班-结算方式">
                  <option value="1" :selected="rule.checkworkOvertimeList[0].payType==1">支付加班费</option>
                  <option value="2" :selected="rule.checkworkOvertimeList[0].payType==2">调休</option>
                  <option value="3" :selected="rule.checkworkOvertimeList[0].payType==3">支付加班费优先</option>
                  <option value="4" :selected="rule.checkworkOvertimeList[0].payType==4">调休优先</option>
                </select>
							</div>
						</div>
						<div class="form-group row" v-if="rule.checkworkType==1&&isValidOvertime2" v-show="tabIdx==1&&otTabIdx==1">
							<label class="col-sm-3 control-label">加班规则：</label>
							<div class="col-sm-7">
								<select class="form-control" v-model="rule.checkworkOvertimeList[0].overtimeRule" vali="required" vali-msg="请选择" tip="休息日加班-加班规则">
                  <!--<option value="1" :selected="rule.checkworkOvertimeList[0].overtimeRule==1">打卡记加班</option>-->
                  <option value="2" :selected="rule.checkworkOvertimeList[0].overtimeRule==2">审批记加班</option>
                  <!--<option value="4" :selected="rule.checkworkOvertimeList[0].overtimeRule==4">打卡和审批最低为准记加班</option>-->
                  <!--<option value="5" :selected="rule.checkworkOvertimeList[0].overtimeRule==5">打卡和审批最高为准记加班</option>-->
                  <option value="3" :selected="rule.checkworkOvertimeList[0].overtimeRule==3">超额工时记加班</option>
                </select>
							</div>
							<div class="col-sm-14" v-if="rule.checkworkOvertimeList[0].overtimeRule==1">
								<span>提前上班</span>
								<input type="text" v-model="rule.checkworkOvertimeList[0].aheadOn" class="input-number form-control" vali="required|minNum:0|float:0"
									vali-msg="必填项||应为整数" tip="休息日加班-提前上班记加班">
								<span>分钟记加班，延迟下班</span>
								<input type="text" v-model="rule.checkworkOvertimeList[0].delayOff" class="input-number form-control" vali="required|minNum:0|float:0"
									vali-msg="必填项||应为整数" tip="休息日加班-延迟下班记加班">
								<span>分钟记加班</span>
							</div>
						</div>
						<div class="form-group row" v-if="rule.checkworkType==1&&isValidOvertime2" v-show="tabIdx==1&&otTabIdx==1">
							<label class="col-sm-3 control-label">累计：</label>
							<div class="col-sm-7">
								<select class="form-control" v-model="rule.checkworkOvertimeList[0].isAccumulativeType" vali="required" vali-msg="请选择" tip="休息日加班-累计">
                  <option value="1" :selected="rule.checkworkOvertimeList[0].isAccumulativeType==1">加班不累计</option>
                  <option value="2" :selected="rule.checkworkOvertimeList[0].isAccumulativeType==2">加班无限累计</option>
                  <option value="3" :selected="rule.checkworkOvertimeList[0].isAccumulativeType==3">加班累计清零日期每月</option>
                  <option value="4" :selected="rule.checkworkOvertimeList[0].isAccumulativeType==4">加班累计</option>
                </select>
							</div>
							<!-- 加班累计清零日期每月 -->
							<div class="col-sm-14 form-inline" v-if="rule.checkworkOvertimeList[0].isAccumulativeType==3">
								<input type="text" v-model="rule.checkworkOvertimeList[0].accumulativeClearDay" class="input-number form-control" vali="required|minNum:1|maxNum:31|float:0"
									vali-msg="必填项||1-31之间的整数" tip="休息日加班-加班清零" />
								<span>日</span>
							</div>
							<!-- 加班累计 -->
							<div class="col-sm-14 form-inline" v-if="rule.checkworkOvertimeList[0].isAccumulativeType==4">
								<input type="text" v-model="rule.checkworkOvertimeList[0].howTime" class="input-number form-control" vali="required|minNum:1|float:0"
									vali-msg="必填项||应为正整数" tip="休息日加班-加班清零">
								<select v-model="rule.checkworkOvertimeList[0].accumulativeTimeType" class="form-control" vali="required" vali-msg="请选择" tip="休息日加班-加班清零周期">
                  <option value="1" :selected="rule.checkworkOvertimeList[0].accumulativeTimeType==1">日</option>
                  <option value="2" :selected="rule.checkworkOvertimeList[0].accumulativeTimeType==2">周</option>
                  <option value="3" :selected="rule.checkworkOvertimeList[0].accumulativeTimeType==3">月</option>
                </select>
								<span>清零</span>
							</div>
						</div>
						<div class="form-group row form-inline" v-if="rule.checkworkType==1&&isValidOvertime2" v-show="tabIdx==1&&otTabIdx==1">
							<label class="col-sm-3 control-label">计算方法：</label>
							<div class="col-sm-18">
								<span>最小单位</span>
								<select class="form-control" v-model="rule.checkworkOvertimeList[0].overtimeUnit" vali="required" vali-msg="请选择" tip="休息日加班-计算最小单位">
                  <option value="" :selected="!rule.checkworkOvertimeList[0].overtimeUnit">请选择</option>
                  <option v-for="unit in overtimeUnitList2" :value="unit" :selected="rule.checkworkOvertimeList[0].overtimeUnit==unit">{{unit}}</option>
                </select>
								<select class="form-control" v-model="rule.checkworkOvertimeList[0].overtimeUnitGenre" vali="required" vali-msg="请选择" tip="休息日加班-计算最小单位" @change="overtimeUnitGenreChanged(2)">
                  <option value="" :selected="!rule.checkworkOvertimeList[0].overtimeUnitGenre">请选择</option>
                  <option value="1" :selected="rule.checkworkOvertimeList[0].overtimeUnitGenre==1">天</option>
                  <option value="2" :selected="rule.checkworkOvertimeList[0].overtimeUnitGenre==2">小时</option>
                  <option value="3" :selected="rule.checkworkOvertimeList[0].overtimeUnitGenre==3">分钟</option>
                </select>
								<select class="form-control" v-model="rule.checkworkOvertimeList[0].overtimeUnitType" vali="required" vali-msg="请选择" tip="休息日加班-计算最小单位">
                  <option value="4" :selected="rule.checkworkOvertimeList[0].overtimeUnitType==4">实际值</option>
                  <option value="1" :selected="rule.checkworkOvertimeList[0].overtimeUnitType==1">四舍五入</option>
                  <option value="2" :selected="rule.checkworkOvertimeList[0].overtimeUnitType==2">进位取整</option>
                  <option value="3" :selected="rule.checkworkOvertimeList[0].overtimeUnitType==3">舍去小数取整</option>
                </select>
							</div>
						</div>
					</template>
					<!-- 节假日加班 -->
					<template v-for="1 in 1">
						<div class="form-group row" v-if="rule.checkworkType==1" v-show="tabIdx==1&&otTabIdx==2">
							<label class="col-sm-3 control-label">是否启用：</label>
							<div class="col-sm-7">
								<ui-switch name="s1" :value.sync="isValidOvertime3"></ui-switch>
							</div>
						</div>
						<div class="form-group row" v-if="rule.checkworkType==1&&isValidOvertime3" v-show="tabIdx==1&&otTabIdx==2">
							<label class="col-sm-3 control-label">结算方式：</label>
							<div class="col-sm-7">
								<select class="form-control" v-model="rule.checkworkOvertimeList[1].payType" vali="required" vali-msg="请选择" tip="节假日加班-结算方式">
                  <option value="1" :selected="rule.checkworkOvertimeList[1].payType==1">支付加班费</option>
                  <option value="2" :selected="rule.checkworkOvertimeList[1].payType==2">调休</option>
                  <option value="3" :selected="rule.checkworkOvertimeList[1].payType==3">支付加班费优先</option>
                  <option value="4" :selected="rule.checkworkOvertimeList[1].payType==4">调休优先</option>
                </select>
							</div>
						</div>
						<div class="form-group row" v-if="rule.checkworkType==1&&isValidOvertime3" v-show="tabIdx==1&&otTabIdx==2">
							<label class="col-sm-3 control-label">加班规则：</label>
							<div class="col-sm-7">
								<select class="form-control" v-model="rule.checkworkOvertimeList[1].overtimeRule" vali="required" vali-msg="请选择" tip="节假日加班-加班规则">
                  <!--<option value="1" :selected="rule.checkworkOvertimeList[1].overtimeRule==1">打卡记加班</option>-->
                  <option value="2" :selected="rule.checkworkOvertimeList[1].overtimeRule==2">审批记加班</option>
                  <!--<option value="4" :selected="rule.checkworkOvertimeList[1].overtimeRule==4">打卡和审批最低为准记加班</option>-->
                  <!--<option value="5" :selected="rule.checkworkOvertimeList[1].overtimeRule==5">打卡和审批最高为准记加班</option>-->
                  <option value="3" :selected="rule.checkworkOvertimeList[1].overtimeRule==3">超额工时记加班</option>
                </select>
							</div>
							<div class="col-sm-14" v-if="rule.checkworkOvertimeList[1].overtimeRule==1">
								<span>提前上班</span>
								<input type="text" v-model="rule.checkworkOvertimeList[1].aheadOn" class="input-number form-control" vali="required|minNum:0|float:0"
									vali-msg="必填项||应为整数" tip="节假日加班-提前上班记加班">
								<span>分钟记加班，延迟下班</span>
								<input type="text" v-model="rule.checkworkOvertimeList[1].delayOff" class="input-number form-control" vali="required|minNum:0|float:0"
									vali-msg="必填项||应为整数" tip="节假日加班-延迟下班记加班">
								<span>分钟记加班</span>
							</div>
						</div>
						<div class="form-group row" v-if="rule.checkworkType==1&&isValidOvertime3" v-show="tabIdx==1&&otTabIdx==2">
							<label class="col-sm-3 control-label">累计：</label>
							<div class="col-sm-7">
								<select class="form-control" v-model="rule.checkworkOvertimeList[1].isAccumulativeType" vali="required" vali-msg="请选择" tip="节假日加班-累计">
                  <option value="1" :selected="rule.checkworkOvertimeList[1].isAccumulativeType==1">加班不累计</option>
                  <option value="2" :selected="rule.checkworkOvertimeList[1].isAccumulativeType==2">加班无限累计</option>
                  <option value="3" :selected="rule.checkworkOvertimeList[1].isAccumulativeType==3">加班累计清零日期每月</option>
                  <option value="4" :selected="rule.checkworkOvertimeList[1].isAccumulativeType==4">加班累计</option>
                </select>
							</div>
							<!-- 加班累计清零日期每月 -->
							<div class="col-sm-14 form-inline" v-if="rule.checkworkOvertimeList[1].isAccumulativeType==3">
								<input type="text" v-model="rule.checkworkOvertimeList[1].accumulativeClearDay" class="input-number form-control" vali="required|minNum:1|maxNum:31|float:0"
									vali-msg="必填项||1-31之间的整数" tip="节假日加班-加班清零" />
								<span>日</span>
							</div>
							<!-- 加班累计 -->
							<div class="col-sm-14 form-inline" v-if="rule.checkworkOvertimeList[1].isAccumulativeType==4">
								<input type="text" v-model="rule.checkworkOvertimeList[1].howTime" class="input-number form-control" vali="required|minNum:1|float:0"
									vali-msg="必填项||应为正整数" tip="节假日加班-加班清零">
								<select v-model="rule.checkworkOvertimeList[1].accumulativeTimeType" class="form-control" vali="required" vali-msg="请选择" tip="节假日加班-加班清零周期">
                  <option value="1" :selected="rule.checkworkOvertimeList[1].accumulativeTimeType==1">日</option>
                  <option value="2" :selected="rule.checkworkOvertimeList[1].accumulativeTimeType==2">周</option>
                  <option value="3" :selected="rule.checkworkOvertimeList[1].accumulativeTimeType==3">月</option>
                </select>
								<span>清零</span>
							</div>
						</div>
						<div class="form-group row form-inline" v-if="rule.checkworkType==1&&isValidOvertime3" v-show="tabIdx==1&&otTabIdx==2">
							<label class="col-sm-3 control-label">计算方法：</label>
							<div class="col-sm-18">
								<span>最小单位</span>
								<select class="form-control" v-model="rule.checkworkOvertimeList[1].overtimeUnit" vali="required" vali-msg="请选择" tip="节假日加班-计算最小单位">
                  <option value="" :selected="!rule.checkworkOvertimeList[1].overtimeUnit">请选择</option>
                  <option v-for="unit in overtimeUnitList3" :value="unit" :selected="rule.checkworkOvertimeList[1].overtimeUnit==unit">{{unit}}</option>
                </select>
								<select class="form-control" v-model="rule.checkworkOvertimeList[1].overtimeUnitGenre" vali="required" vali-msg="请选择" tip="节假日加班-计算最小单位" @change="overtimeUnitGenreChanged(3)">
                  <option value="" :selected="!rule.checkworkOvertimeList[1].overtimeUnitGenre">请选择</option>
                  <option value="1" :selected="rule.checkworkOvertimeList[1].overtimeUnitGenre==1">天</option>
                  <option value="2" :selected="rule.checkworkOvertimeList[1].overtimeUnitGenre==2">小时</option>
                  <option value="3" :selected="rule.checkworkOvertimeList[1].overtimeUnitGenre==3">分钟</option>
                </select>
								<select class="form-control" v-model="rule.checkworkOvertimeList[1].overtimeUnitType" vali="required" vali-msg="请选择" tip="节假日加班-计算最小单位">
                  <option value="4" :selected="rule.checkworkOvertimeList[1].overtimeUnitType==4">实际值</option>
                  <option value="1" :selected="rule.checkworkOvertimeList[1].overtimeUnitType==1">四舍五入</option>
                  <option value="2" :selected="rule.checkworkOvertimeList[1].overtimeUnitType==2">进位取整</option>
                  <option value="3" :selected="rule.checkworkOvertimeList[1].overtimeUnitType==3">舍去小数取整</option>
                </select>
							</div>
						</div>
					</template>
				</template>
				<!-- 预警设置 -->
				<template v-for="1 in 1">
					<div class="form-group row" v-if="rule.checkworkType==1" v-show="tabIdx==2">
						<div class="col-sm-offset-4 col-sm-6">
							<span>日工时预警值</span>
							<input type="text" class="input-number form-control" v-model="rule.dayWarningTime" vali="minNum:0.01|float:2|maxNum:24" vali-msg="最多为2位小数数字，最大24" tip="预警设置-日工时预警值"
							/><span>小时</span>
						</div>
						<div class="col-sm-offset-2 col-sm-10">
							<span>不超过</span>
							<input type="text" class="input-number form-control" v-model="rule.dayWarningSurpassTime" vali="minNum:0.01|float:2|maxNum:24" vali-msg="最多为2位小数数字，最大24" tip="预警设置-日工时最大预警值"><span>小时</span>
						</div>
					</div>
					<div class="form-group row" v-if="rule.checkworkType==1" v-show="tabIdx==2">
						<div class="col-sm-offset-4 col-sm-6">
							<span>月工时预警值</span>
							<input type="text" class="input-number form-control" v-model="rule.monthWarningTime" vali="minNum:0.01|float:2|maxNum:720" vali-msg="最多为2位小数数字，最大720" tip="预警设置-月工时预警值"
							/><span>小时</span>
						</div>
						<div class="col-sm-offset-2 col-sm-10">
							<span>月工时限额</span>
							<input type="text" class="input-number form-control" v-model="rule.legalLimitTime" vali="minNum:0.01|float:2|maxNum:720" vali-msg="最多为2位小数数字，最大720" tip="预警设置-月工时限额"><span>小时</span>
						</div>
					</div>
					<div class="form-group row" v-if="rule.checkworkType==1" v-show="tabIdx==2">
						<div class="col-sm-offset-4 col-sm-8">
							<span>加班工时预警</span>
							<input type="text" class="input-number form-control" v-model="rule.overtimeWarningTime" vali="minNum:0.01|float:2|maxNum:720" vali-msg="最多为2位小数数字，最大720" tip="预警设置-加班工时预警值"
							/>
							<span>小时/月</span>
						</div>
						<div class="col-sm-10">
							<span>加班工时限额</span>
							<input type="text" class="input-number form-control" v-model="rule.overtimeLimitTime" vali="minNum:0.01|float:2|maxNum:720" vali-msg="最多为2位小数数字，最大720" tip="预警设置-加班工时限额">小时/月
						</div>
					</div>
					<div class="form-group row" v-if="rule.checkworkType==1" v-show="tabIdx==2">
						<div class="col-sm-offset-4 col-sm-6">
							<input type="text" class="input-number form-control" v-model="rule.dayReportTime" vali="minNum:1|float:0" vali-msg="应为整数" tip="预警设置-日结提醒天数"
							/>
							<span>天未完成日结提醒</span>
						</div>
						<div class="col-sm-offset-2 col-sm-8">
							<combo-tree :treedata="state.postTree" idprop="ID" :nodeclicked="postClicked" textprop="postName" :multiple="false">
								<div data-toggle="dropdown">
									<input type="text" readonly="readonly" v-model="rule.dayReportTimePost" class="form-control" :title="rule.dayReportTimePost"
										placeholder="点击选择岗位">
								</div>
							</combo-tree>
						</div>
						<div class="col-sm-2">
							<ui-switch name="s1" :value.sync="isDayReportTimeBool"></ui-switch>
						</div>
					</div>
				</template>
				<!--移动打卡设置-->
				<template v-for="1 in 1">
					<div class="form-group row" v-if="rule.checkworkType==1" v-show="tabIdx==4">
						<label class="col-sm-3 control-label">是否启用：</label>
						<div class="col-sm-7">
							<ui-switch name="s1" :value.sync="isValidMobile"></ui-switch>
						</div>
					</div>
					<div class="form-group row" v-if="rule.checkworkType==1&&isValidMobile" v-show="tabIdx==4">
						<div class="col-sm-offset-3 col-sm-8">
							<ui-checkbox :value.sync="isAllMobile">全部组织打卡</ui-checkbox>
						</div>
					</div>
					<div class="form-group row" v-if="rule.checkworkType==1&&isValidMobile" v-show="tabIdx==4">
						<label class="col-sm-3 control-label">打卡范围：</label>
						<label class="col-sm-3 control-label">距考勤地点</label>
						<div class="col-sm-4">
							<select class="form-control" v-model="rule.mobileClockList[0].distance">
                <option value="50" :selected="rule.mobileClockList[0].distance == 50 || !rule.mobileClockList[0].distance">50米</option>
                <option value="100" :selected="rule.mobileClockList[0].distance == 100">100米</option>
                <option value="150" :selected="rule.mobileClockList[0].distance == 150">150米</option>
                <option value="200" :selected="rule.mobileClockList[0].distance == 200">200米</option>
                <option value="250" :selected="rule.mobileClockList[0].distance == 250">250米</option>
                <option value="300" :selected="rule.mobileClockList[0].distance == 300">300米</option>
              </select>
						</div>
					</div>
					<div class="form-group row" v-if="rule.checkworkType==1" v-show="tabIdx==4&&isValidMobile">
						<div class="col-sm-24">
							说明：如选择50米，代表以考勤地点为中心半径为50米的范围内可以打卡。
						</div>
					</div>
				</template>
				<!--休息日设置-->
				<template v-for="1 in 1">
					<div class="form-group row"></div>
					<div class="form-group row" v-if="rule.checkworkType==1" v-show="tabIdx==5">
						<div class="col-sm-23 col-sm-offset-1">
							<ui-checkboxgroup :list="weekdayList" name="weekdayName" id="ID" :value.sync="weekdayChecked"></ui-checkboxgroup>
						</div>
					</div>
          <div class="form-group row" v-if="rule.checkworkType==1" v-show="tabIdx==5">
            <label class="col-sm-offset-1 col-sm-23 control-label">说明：如果不勾选，从排班中获取休息信息。</label>
          </div>
				</template>
				<!--法定节假日设置-->
				<template v-for="1 in 1">
					<div class="form-group row" v-if="rule.checkworkType==1" v-show="tabIdx==6">
						<div class="pull-right">
							<a class="oper" href="javascript:void(0)" @click="addLegalHoliday">
								<i class="icon-tool icon-tool-add"></i><span>添加</span></a>
							<a class="oper" href="javascript:void(0)" @click="editLegalHoliday">
								<i class="icon-tool icon-tool-edit"></i><span>修改</span></a>
							<a class="oper" href="javascript:void(0)" @click="removeLegalHoliday">
								<i class="icon-tool icon-tool-delete"></i><span>删除</span></a>
						</div>
					</div>
					<div class="form-group row table-holiday" v-if="rule.checkworkType==1" v-show="tabIdx==6" style="position: relative">
						<ui-table v-ref:table :refreshed.sync="refreshHoliday" height="370px" class="com-table-wrap">
							<template slot="headerNormal">
								<table class="table table-bordered">
									<colgroup>
										<col width="25px"></col-group>
                    <!--<col width="100px"></col-group>-->
                    <col width="200px"></col-group>
                    <col width="100px"></col-group>
                    <col width="100px"></col-group>
									</colgroup>
									<thead>
										<tr>
											<th></th>
											<!--<th>年度</th>-->
											<th>假期名称</th>
											<th>开始日期</th>
											<th>结束日期</th>
										</tr>
									</thead>
								</table>
							</template>
							<template slot="bodyNormal">
								<table class="table table-bordered">
									<colgroup>
										<col width="25px"></col-group>
                    <!--<col width="100px"></col-group>-->
                    <col width="200px"></col-group>
                    <col width="100px"></col-group>
                    <col width="100px"></col-group>
									</colgroup>
									<tbody>
										<template v-for="holiday in rule.statutoryHolidaysStr">
											<tr v-if="holiday.flag!='D'">
												<td><ui-checkbox :value.sync="statutoryHolidaysChecked[$index]"></ui-checkbox></td>
												<!--<td></td>-->
												<td>{{holiday.holidaysName}}</td>
												<td>{{holiday.startTime | dateConverter}}</td>
												<td>{{holiday.endTime | dateConverter}}</td>
											</tr>
										</template>
									</tbody>
								</table>
							</template>
						</ui-table>
					</div>
				</template>
				<!-- 其他设置 -->
				<template v-for="1 in 1">
					<div class="form-group row" v-if="rule.checkworkType==1" v-show="tabIdx==3">
						<label class="col-sm-3 control-label">休息设置：</label>
						<label class="radio-inline">
              <ui-radio name="fixed-rest-type" :model.sync="rule.fixedRestType" label="固定休息时间" value="1" :required="false" @cancel="rule.fixedRestType=null"></ui-radio>
              <ui-radio name="fixed-rest-type" :model.sync="rule.fixedRestType" label="不固定休息时间" value="2" :required="false" @cancel="rule.fixedRestType=null"></ui-radio>
            </label>
					</div>
					<!-- 固定休息时间 -->
					<div class="form-group row" v-if="rule.checkworkType==1" v-show="tabIdx==3&&rule.fixedRestType==1">
						<div class="col-sm-offset-3">
							<template v-for="fixRest in rule.fixedRestList">
								<label class="col-sm-6" class="control-label">
                  <span>{{fixRest.restStartTime+"-"+fixRest.restEndTime}}</span>
                  <i class="material-icons remove" title="点击移除" @click="removeFixRest(fixRest)">remove_circle_outline</i></label>
							</template>
						</div>
					</div>
					<div class="form-group row" v-if="rule.checkworkType==1&&tabIdx==3&&rule.fixedRestType==1">
						<div class="col-sm-offset-3 col-sm-21">
              <span>从</span>
              <input type="text" v-model="fixedRestTime1" class="input-number form-control" vali="minNum:0|maxNum:23" vali-msg="应在0-23之间" tip="其他设置-固定休息开始时间">
              <span>:</span>
              <input type="text" v-model="fixedRestTime2" class="input-number form-control" vali="minNum:0|maxNum:59" vali-msg="应在0-59之间" tip="其他设置-固定休息开始时间">
              <span>到</span>
              <input type="text" v-model="fixedRestTime3" class="input-number form-control" vali="minNum:0|maxNum:23" vali-msg="应在0-23之间" tip="其他设置-固定休息结束时间">
              <span>:</span>
              <input type="text" v-model="fixedRestTime4" class="input-number form-control" vali="minNum:0|maxNum:59" vali-msg="应在0-59之间" tip="其他设置-固定休息结束时间">
						</div>
					</div>
					<div class="form-group row" v-show="rule.checkworkType==1&&tabIdx==3&&rule.fixedRestType==1">
						<div class="col-sm-offset-3">
							<a href="javascript:void(0)" @click="addFixedRest">+ 添加时间段</a>
						</div>
					</div>
					<!-- 不固定休息时间 -->
					<div class="form-group row" v-show="rule.checkworkType==1&&tabIdx==3&&rule.fixedRestType==2">
						<div class="col-sm-offset-3">
							<template v-for="unfixRest in rule.fixedRestNotList">
								<label class="col-sm-9" class="control-label">
                  <span>{{unfixRest.minTime+"小时—"+unfixRest.maxTime+"小时(休息"+unfixRest.cutRestTime+"分钟)"}}</span>
                  <i class="material-icons remove" title="点击移除" @click="removeUnfixRest(unfixRest)">remove_circle_outline</i> </label>
							</template>
						</div>
					</div>
					<div class="form-group row" v-if="rule.checkworkType==1&&tabIdx==3&&rule.fixedRestType==2">
						<div class="col-sm-offset-3 col-sm-21">
							<span>上班时间</span>
							<input type="text" v-model="unfixedRestTime1" class="input-number form-control" vali="minNum:1|maxNum:24" vali-msg="应在1-24之间" tip="其他设置-休息设置上班小时">
							<span>小时到</span>
							<input type="text" v-model="unfixedRestTime2" class="input-number form-control" vali="minNum:1|maxNum:24" vali-msg="应为1-24之间" tip="其他设置-休息设置上班小时">
							<span>小时 扣减休息</span>
							<input type="text" v-model="unfixedRestTime3" class="input-number form-control" vali="minNum:1" vali-msg="应为整数" tip="其他设置-休息设置上班休息分钟数">
							<span>分钟</span>
						</div>
					</div>
					<div class="form-group row" v-show="rule.checkworkType==1&&tabIdx==3&&rule.fixedRestType==2">
						<div class="col-sm-offset-3">
							<a href="javascript:void(0)" @click="addUnfixedRest">+ 添加时间段</a>
						</div>
					</div>
					<!-- *********** -->
					<div class="form-group row" v-show="rule.checkworkType==1&&tabIdx==3">
						<label class="col-sm-4 control-label">夜班工时设置：</label>
					</div>
					<div class="form-group row" v-show="rule.checkworkType==1&&tabIdx==3">
						<div class="col-sm-offset-3 col-sm-21 radio-inline">
							<ui-radio :model.sync="rule.nightShiftLaborType" label="计算夜班工时" value="1" :required="false" @cancel="rule.nightShiftLaborType=null"></ui-radio>
							<ui-radio :model.sync="rule.nightShiftLaborType" label="不计算夜班工时" value="2" :required="false" @cancel="rule.nightShiftLaborType=null"></ui-radio>
						</div>
					</div>
					<div class="form-group row" v-if="rule.checkworkType==1&&tabIdx==3&&rule.nightShiftLaborType==1">
						<div class="col-sm-offset-3 col-sm-21">
							<span>从</span>
							<input type="text" v-model="nightStartTime1" class="input-number form-control" vali="required|minNum:0|maxNum:23" vali-msg="必填项||应在0-23之间" tip="其他设置-夜班工时开始时间">
							<span>:</span>
							<input type="text" v-model="nightStartTime2" class="input-number form-control" vali="required|minNum:0|maxNum:59" vali-msg="必填项||应在0-59之间" tip="其他设置-夜班工时开始时间">
							<span>到</span>
							<input type="text" v-model="nightEndTime1" class="input-number form-control" vali="required|minNum:0|maxNum:23" vali-msg="必填项||应在0-23之间" tip="其他设置-夜班工时结束时间">
							<span>:</span>
							<input type="text" v-model="nightEndTime2" class="input-number form-control" vali="required|minNum:0|maxNum:59" vali-msg="必填项||应在0-59之间" tip="其他设置-夜班工时结束时间">
							<span>为夜班工时</span>
						</div>
					</div>
					<!-- ********** -->
					<div class="form-group row" v-show="rule.checkworkType==1&&tabIdx==3">
						<label class="col-sm-4 control-label">日结/月结设置：</label>
					</div>
					<div class="form-group row" v-show="rule.checkworkType==1&&tabIdx==3">
						<div class="col-sm-offset-3 col-sm-9 row-line">
							<span>每天</span>
							<input type="text" v-model="everyDayReportTime1" class="input-number form-control" vali="minNum:0|maxNum:23|float:0" vali-msg="0-23之间的整数" tip="其他设置-日结设置">
							<span>:</span>
							<input type="text" v-model="everyDayReportTime2" class="input-number form-control" vali="minNum:0|maxNum:59|float:0" vali-msg="0-59之间的整数" tip="其他设置-日结设置">
							<span>前完成工时日结</span>
						</div>
						<div class="col-sm-4">
							<ui-switch name="s1" :value.sync="isEveryDayReportTimeBool"></ui-switch>
						</div>
					</div>
					<div class="form-group row" v-show="rule.checkworkType==1&&tabIdx==3">
						<div class="col-sm-offset-3 col-sm-21 row-line">
							<span>每月</span>
							<input type="text" class="input-number form-control" v-model="rule.monthReportStartTime" vali="minNum:1|maxNum:31|float:0"
								vali-msg="1-31之间的整数" tip="其他设置-月结设置">
							<span>日 —</span>
							<input type="text" class="input-number form-control" v-model="rule.monthReportEndTime" vali="minNum:1|maxNum:31|float:0"
								vali-msg="1-31之间的整数" tip="其他设置-月结设置">
							<span>日 完成工时月结</span>
						</div>
					</div>
					<div class="form-group row" v-show="rule.checkworkType==1&&tabIdx==3">
						<div class="col-sm-offset-3 col-sm-21 row-line">
							<span>有日结工时未完成不允许运行月结工时</span>
						</div>
					</div>
				</template>
				<!-- 提交 -->
				<template v-for="1 in 1">
					<div class="form-actions">
						<div class="row">
							<div class="text-center">
								<ui-button color="accent" id="submitBt1">提交</ui-button>
								<ui-button color="default" @click="showRemoveRule= true" v-if="rule.ID" __code="config-attendance-remove/删除">删除</ui-button>
							</div>
						</div>
					</div>
				</template>
			</form>
		</ui-validator>
		<ui-confirm type="danger" confirm-button-text="删除" deny-button-text="取消" @confirmed="removeRule" :show.sync="showRemoveRule"
			close-on-confirm header="提示">
			确认要删除该条考勤规则吗？
		</ui-confirm> 
	</ui-modal>
  <ui-modal :show.sync="displayHolidayModal" :header="holidayModalHeader" type="small" hide-footer>
      <ui-validator @failed="inputFailed">
        <form class="form-horizontal form" role="form" vali-submit="submitBtHoliday|submitHoliday">
          <div class="form-group row">
            <label class="col-sm-8 control-label">假期名称：</label>
            <div class="col-sm-16">
              <input type="text" v-model="operatedHoliday.holidaysName" class="form-control" vali="required" vali-msg="必填项">
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-8 control-label">开始日期：</label>
            <div class="col-sm-16">
              <ui-datepicker :time.sync="operatedHoliday.startTime" format="yyyy-MM-dd" vali="required" vali-msg="必填项" width="172px"></ui-datepicker>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-8 control-label">结束日期：</label>
            <div class="col-sm-16">
              <ui-datepicker :time.sync="operatedHoliday.endTime" format="yyyy-MM-dd" vali="required" vali-msg="必填项" width="172px"></ui-datepicker>
            </div>
          </div>
          <div class="form-actions">
          <div class="row">
            <div class="text-center">
              <ui-button color="accent" id="submitBtHoliday">提交</ui-button>
              <ui-button color="default" @click="displayHolidayModal=false">取消</ui-button>
            </div>
          </div>
					</div>
        </form>
      </ui-validator>
    </ui-modal>
  <ui-modal :show.sync="displayErrorMsg" header="错误消息" type="medium" hide-footer>
    <div class="form-group row col-sm-offset-1">
      {{{errorMsg}}}
    </div>
    <div class="form-actions">
      <div class="text-center">
        <ui-button color="accent" @click="displayErrorMsg=false">确定</ui-button>
      </div>
    </div>
  </ui-modal>
  </div>
</template>
<script>
import store from '../store'
import Vue from 'vue'
export default {
  data() {
      return {
        state: store.state,
        tabIdx: 0, // 设置的Tab页设置标签索引
        otTabIdx: 0, // 加班设置下加班标签索引
        showRemoveRule: false, // 是否显示删除规则弹出框确认
        // 固定休息时间编辑
        fixedRestTime1: null,
        fixedRestTime2: null,
        fixedRestTime3: null,
        fixedRestTime4: null,
        // 非固定休息时间编辑
        unfixedRestTime1: null,
        unfixedRestTime2: null,
        unfixedRestTime3: null,
        overtimeUnitList1: [0.5, 1], // 平常加班数字单位列表
        overtimeUnitList2: [0.5, 1], // 休息日加班数字单位列表
        overtimeUnitList3: [0.5, 1], // 节假日加班数字单位列表
        weekdayList:[{weekdayName: '星期一', ID: "1"},{weekdayName: '星期二', ID: "2"},{weekdayName: '星期三', ID: "3"},
          {weekdayName: '星期四', ID: "4"},{weekdayName: '星期五', ID: "5"},{weekdayName: '星期六', ID: "6"},{weekdayName: '星期日', ID: "0"}],
        
        refreshHoliday: false,
        statutoryHolidaysChecked: [],
        displayHolidayModal: false,
        holidayModalHeader: '添加假期',
        operatedHoliday: {
          id: '',
          checkworkRuleId: '',
          holidaysName: '',
          startTime: '',
          endTime: '',
          status: '1', // 1有效，0无效
          valid: '1', // 1未删除，0已删除
          flag: 'A', // A添加，D删除，M修改
        },
        displayErrorMsg: false,
        errorMsg: null
      };
    },
    props: {
      display: {
        default: false,
        twoWay: true
      },
      rule: {
        default: () => {
          return {
            checkworkOvertimeList: [{}, {}],
            fixedRestList: [],
            fixedRestNotList: [],
            fixedRestListStr: null,
            fixedRestNotPojoListStr: null
          }
        },
        twoWay: true
      }
    },
    watch: {
      'rule.checkworkType': function(val) {
        this.$refs.validator.refresh();
      },
      'rule.overtimeRule': function() {
        this.$refs.validator.refresh();
      },
      'rule.checkworkOvertimeList[0].overtimeRule': function() {
        this.$refs.validator.refresh();
      },
      'rule.checkworkOvertimeList[1].overtimeRule': function() {
        this.$refs.validator.refresh();
      },
      'isValidOvertime1': function() {
        this.$refs.validator.refresh();
      },
      'isValidOvertime2': function() {
        this.$refs.validator.refresh();
      },
      'isValidOvertime3': function() {
        this.$refs.validator.refresh();
      },
      'rule.nightShiftLaborType': function() {
        this.$refs.validator.refresh();
      },
      'tabIdx': function(val) {
        this.$refs.validator.refresh();
        if(val == 6) {
          this.$nextTick(() => { 
            this.refreshHoliday = true; 
          });
        }
      }
    },
    filters: {
      boolConverter(val) {
        if (val === "1") return true;
        if (val === "0") return false;
        return val;
      },
      dateConverter(val) {
        if(!val) return val;
        console.log(val);
        return Vue.Tool.iDate(new Date(val), 'yy-mm-dd').string;
      }
    },
    computed: {
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
      },
      // 是否启用
      isValidOvertime1: {
        get() {
          console.log('overtimeValid: ', this.rule.overtimeValid)
          if (!this.rule.overtimeValid) this.$set('rule.overtimeValid', 0);
          console.log('overtimeValid: ', this.rule.overtimeValid)
          return this.rule.overtimeValid == 1 ? true : false;
        },
        set(val) {
          if (!this.rule.overtimeValid) this.rule.overtimeValid = 0;
          this.$set('rule.overtimeValid', (val ? 1 : 0));
        }
      },
      isValidOvertime2: {
        get() {
          if (!this.rule.checkworkOvertimeList[0].valid) this.$set('rule.checkworkOvertimeList[0].valid', 0);
          return this.rule.checkworkOvertimeList[0].valid == 1 ? true : false;
        },
        set(val) {
          if (!this.rule.checkworkOvertimeList[0].valid) this.rule.checkworkOvertimeList[0].valid = 0;
          this.$set('rule.checkworkOvertimeList[0].valid', (val ? 1 : 0));
        }
      },
      isValidOvertime3: {
        get() {
          if (!this.rule.checkworkOvertimeList[1].valid) this.$set('rule.checkworkOvertimeList[1].valid', 0);
          return this.rule.checkworkOvertimeList[1].valid == 1 ? true : false;
        },
        set(val) {
          if (!this.rule.checkworkOvertimeList[1].valid) this.rule.checkworkOvertimeList[1].valid = 0;
          this.$set('rule.checkworkOvertimeList[1].valid', (val ? 1 : 0));
        }
      },
      isValidMobile: {
        get() {
          if(!this.rule.mobileClockList[0].valid) this.$set('rule.mobileClockList[0].valid', 0);
          return this.rule.mobileClockList[0].valid == 1 ? true : false;
        },
        set(val) {
          if (!this.rule.mobileClockList[0].valid) this.rule.mobileClockList[0].valid = 0;
          this.$set('rule.mobileClockList[0].valid', (val ? 1 : 0));
        }
      },
      isAllMobile: {
        get() {
          if(!this.rule.mobileClockList[0].ifTure) this.$set('rule.mobileClockList[0].ifTure', 0);
          return this.rule.mobileClockList[0].ifTure == 1 ? true : false;
        },
        set(val) {
          if (!this.rule.mobileClockList[0].ifTure) this.rule.mobileClockList[0].ifTure = 0;
          this.$set('rule.mobileClockList[0].ifTure', (val ? 1 : 0));
        }
      },
      weekdayChecked: {
        get() {
          if(!this.rule.playday) return [];
          var arr = this.rule.playday.split(',');
          return arr;
        },
        set(val) {
          this.rule.playday = val.join(',');
        }
      }
    },
    methods: {
      inputFailed(fields) {
        var failedFields = fields.filter(p => { return !p.passed; });
        console.log(JSON.stringify(failedFields))
        this.errorMsg = failedFields.map(p => { console.log(p.tip + '：' + p.msg.join() ); return p.tip + '：' + (p.msg.join('，')); }).join('<br/>');
        this.displayErrorMsg = true;
      },
      overtimeUnitGenreChanged(idx) {
        // idx: 1, 2, 3
        // 平常加班, 休息日加班, 节假日加班

        let chosenOvertime = idx == 1 ? this.rule :
          (idx == 2 ? this.rule.checkworkOvertimeList[0] :
            (idx == 3 ? this.rule.checkworkOvertimeList[1] : null));
        if (chosenOvertime == null) return;

        if (chosenOvertime.overtimeUnitGenre == "") {
          this['overtimeUnitList' + idx] = [];
          this['overtimeUnitList' + idx].$set(0, 0.5);
          this['overtimeUnitList' + idx].$set(1, 1);
          chosenOvertime.overtimeUnit = "";
          return;
        }
        this['overtimeUnitList' + idx] = [];
        var val = parseFloat(chosenOvertime.overtimeUnitGenre);
        if (val > 2) {
          if (this['overtimeUnitList' + idx].overtimeUnit != 1)
            this['overtimeUnitList' + idx].overtimeUnit = "";
          this['overtimeUnitList' + idx].$set(0, 1);
        } else {
          this['overtimeUnitList' + idx].$set(0, 0.5);
          this['overtimeUnitList' + idx].$set(1, 1);
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
      // 添加固定休息时间段
      addFixedRest() {
        if (!this.fixedRestTime1 || !this.fixedRestTime2 || !this.fixedRestTime3 || !this.fixedRestTime4) {
          this.$root.showTip({
            type: 'danger',
            msg: "请填写完整固定休息时间段！",
            duration: 2000
          });
          return false;
        }
        if (!this.isInteger(this.fixedRestTime1, 0, 23) || !this.isInteger(this.fixedRestTime2, 0, 59) ||
          !this.isInteger(this.fixedRestTime3, 0, 23) || !this.isInteger(this.fixedRestTime4, 0, 59)) {
          this.$root.showTip({
            type: 'danger',
            msg: "固定休息时间段应为整数(0-23或0-59)！",
            duration: 2000
          });
          return false;
        }
        if (!this.rule.fixedRestList) {
          this.$set('rule.fixedRestList', []);
        } else {
          let valid = this.rule.fixedRestList.every((item) => {
            if (item.restStartTime <= this.padLeft(this.fixedRestTime3, 2, '0') + ":" + this.padLeft(this.fixedRestTime4, 2, '0') && 
              item.restEndTime >= this.padLeft(this.fixedRestTime1, 2, '0') + ":" + this.padLeft(this.fixedRestTime2, 2, '0')) {
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
            return false;
          }
        }
        this.rule.fixedRestList.$set(this.rule.fixedRestList.length, {
          restStartTime: this.padLeft(this.fixedRestTime1, 2, '0') + ":" + this.padLeft(this.fixedRestTime2, 2, '0'),
          restEndTime:  this.padLeft(this.fixedRestTime3, 2, '0') + ":" + this.padLeft(this.fixedRestTime4, 2, '0') 
        });
        this.fixedRestTime1 = null;
        this.fixedRestTime2 = null;
        this.fixedRestTime3 = null;
        this.fixedRestTime4 = null;
        return true;
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
          return false;
        }
        if (!this.isFloat(this.unfixedRestTime1, 0, 24) || !this.isFloat(this.unfixedRestTime2, 0, 24) ||
          !this.isInteger(this.unfixedRestTime1, 0, 10000)) {
          this.$root.showTip({
            type: 'danger',
            msg: "固定休息时间段应为最多两位小数数字！",
            duration: 2000
          });
          return false;
        }
        if (parseFloat(this.unfixedRestTime1) >= parseFloat(this.unfixedRestTime2)) {
          this.$root.showTip({
            type: 'danger',
            msg: "开始小时数应小于结束小时数！",
            duration: 2000
          });
          return false;
        }
        if (!this.rule.fixedRestNotList) {
          this.$set('rule.fixedRestNotList', []);
        } else {
          let valid = this.rule.fixedRestNotList.every((item) => {
            if (parseInt(item.minTime) <= parseInt(this.unfixedRestTime2) && parseInt(item.maxTime) >= parseInt(this.unfixedRestTime1)) return false;
            return true;
          });
          if (!valid) {
            this.$root.showTip({
              type: 'danger',
              msg: "非固定休息时间已有重复！",
              duration: 2000
            });
            return false;
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
        return true;
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
        if (!val) return false;
        try {
          var value = parseFloat(val);
          if (isNaN(value)) return false;
          if (min && max) {
            if (val < min || val > max) return false;
          }
          return true;
        } catch (e) {
          return false;
        }
      },
      padLeft(str, length, chr) {
        if(length <= str.length ) return str;
        var strPad = chr.repeat(length).substr(0, length - str.length) + str;
        console.log(str)
        console.log(strPad)
        return strPad;
      },
      verify() {
        var errorMsg = "";

        if(this.rule.periodType == 2) { // 本月
          if(parseInt(this.rule.startDate) >= parseInt(this.rule.endDate)) {
            errorMsg += "考勤月份为本月时，考勤周期前面日期要小于后面的日期！\r\n";
          }
        } else if(this.rule.periodType == 1) { // 上月
          if(parseInt(this.rule.startDate) < parseInt(this.rule.endDate)) {
            errorMsg += "考勤月份为上月时，考勤周期前面日期要大于后面的日期！\r\n";
          }
        }

        if (this.rule.fixedRestType == 1 && this.fixedRestTime1 && this.fixedRestTime2 && this.fixedRestTime3 && this.fixedRestTime4) {
          // errorMsg += "其他设置中输入的固定休息时间请点击添加时间段按钮！\r\n";
          if(!this.addFixedRest()) {
            errorMsg += "其他设置中输入的固定休息时间有误！\r\n";
          }
        }
        // 非固定休息时间
        if (this.rule.fixedRestType == 2 && this.unfixedRestTime1 && this.unfixedRestTime2 && this.unfixedRestTime3) {
          // errorMsg += "其他设置中输入的非固定休息时间请点击添加时间段按钮！\r\n";
          if(!this.addUnfixedRest()) {
            errorMsg += "其他设置中输入的非固定休息时间有误！\r\n";
          }
        }

        // 夜班工时
        if(this.rule.nightShiftLaborType == 1) {
          if(!this.nightStartTime1 || !this.nightStartTime2 || !this.nightEndTime1 || !this.nightEndTime2) {
            errorMsg += "计算夜班工时时，请填全夜班时间段！"
          }
        }

        if (this.rule.overtimeRule == 3 && this.isValidOvertime1) {
          if (!this.rule.overtimeLimitTime) {
            errorMsg += '平常加班规则为超额工时记加班时，预警设置中加班工时预警和加班工时限额必填！\r\n';
          }
        }

        if (this.rule.checkworkOvertimeList[0].overtimeRule == 3 && this.isValidOvertime2) {
          if (!this.rule.overtimeLimitTime) {
            errorMsg += '休息日加班规则为超额工时记加班时，预警设置中加班工时预警和加班工时限额必填！\r\n';
          }
        }

        if (this.rule.checkworkOvertimeList[1].overtimeRule == 3 && this.isValidOvertime3) {
          if (!this.rule.overtimeLimitTime) {
            errorMsg += '节假日加班规则为超额工时记加班时，预警设置中加班工时预警和加班工时限额必填！\r\n';
          }
        }

        // 日工时预警值不能大于最大值
        if (this.rule.dayWarningTime && this.rule.dayWarningSurpassTime && parseFloat(this.rule.dayWarningTime) > parseFloat(this.rule.dayWarningSurpassTime)) {
          errorMsg += "预警设置中日工时预警值不能大于其限额值！<br/>";
        }
        // 月工时预警值不能大于月工时限额
        if (this.rule.monthWarningTime && this.rule.legalLimitTime && parseFloat(this.rule.monthWarningTime) > parseFloat(this.rule.legalLimitTime)) {
          errorMsg += "预警设置中月工时预警值不能大于其限额值！<br/>";
        }
        // 加班工时预警值不能大于加班工时限额
        if (this.rule.overtimeWarningTime && this.rule.overtimeLimitTime && parseFloat(this.rule.overtimeWarningTime) > parseFloat(this.rule.overtimeLimitTime)) {
          errorMsg += "预警设置中加班工时预警值不能大于其限额值！<br/>";
        }

        // 月工时预警值不能小于日工时预警值
        if (this.rule.monthWarningTime && this.rule.dayWarningTime && parseFloat(this.rule.monthWarningTime) < parseFloat(this.rule.dayWarningTime)) {
          errorMsg += "预警设置中月工时预警值不能小于日工时预警值！<br/>";
        }
        // 月工时限额值不能小于日工时限额值
        if (this.rule.legalLimitTime && this.rule.dayWarningSurpassTime && parseFloat(this.rule.legalLimitTime) < parseFloat(this.rule.dayWarningSurpassTime)) {
          errorMsg += "预警设置中月工时限额值不能小于日工时限额值！<br/>";
        }

        // 预警设置岗位提醒
        if(this.isDayReportTimeBool) {
          if(!this.rule.dayReportTime) {
            errorMsg += "预警设置中岗位提醒开启下日结提醒天数必填！<br/>"
          }
          if(!this.rule.dayReportTimeType) {
            errorMsg += "预警设置中岗位提醒开启下岗位必选！<br/>";
          }
        }

        // 日结/月结设置
        if(this.isEveryDayReportTimeBool) {
          if(!this.everyDayReportTime1 || !this.everyDayReportTime2) {
            errorMsg += "预警设置中日结/月结开启下日结时间必填！<br/>"
          }
          if(!this.rule.monthReportStartTime || !this.rule.monthReportEndTime) {
            errorMsg += "预警设置中日结/月结开启下月结日期必填！<br/>"
          }
        }

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
      },
      addLegalHoliday() {
        this.holidayModalHeader = "添加假期";
        this.operatedHoliday = {
          id: '',
          checkworkRuleId: this.rule.ID,
          holidaysName: '',
          startTime: '',
          endTime: '',
          status: '1', // 1有效，0无效
          valid: '1', // 1未删除，0已删除
          flag: 'A', // A添加，D删除，M修改
        };
        this.displayHolidayModal = true;
      },
      editLegalHoliday() {
        var idx = -1;
        var checkedHoliday = this.statutoryHolidaysChecked.filter((p, index) => {
          if(p) idx = index;
          return p;
        });
        if(checkedHoliday.length <= 0) {
          this.$root.showTip({
            type: 'warning',
            msg: '请在列表中选择要操作的假期！'
          });
          return;
        }
        if(checkedHoliday.length > 1) {
          this.$root.showTip({
            type: 'warning',
            msg: '请选择一条假期记录修改！'
          });
          return;
        }
        this.rule.statutoryHolidaysStr[idx].flag = 'M';
        this.operatedHoliday = Object.assign({}, this.rule.statutoryHolidaysStr[idx]); 
        console.log(JSON.stringify(this.operatedHoliday))
        this.holidayModalHeader = "修改假期";
        this.displayHolidayModal = true;
      },
      removeLegalHoliday() {
        var selection = [];
        var checkedHoliday = this.statutoryHolidaysChecked.filter((p, index) => {
          if(p) selection.push(this.rule.statutoryHolidaysStr[index]);
          return p;
        });
        if(checkedHoliday.length <= 0) {
          this.$root.showTip({
            type: 'warning',
            msg: '请在列表中选择要操作的假期！'
          });
          return;
        }
        this.$root.showConfirm({
          msg: '确认要删除选中的假期吗？',
          ok: () => {
            selection.forEach(p => {
              p.status = "0";
              p.valid ="0";
              p.flag = "D";
            });
            this.statutoryHolidaysChecked.forEach((p, index)=>{
              this.statutoryHolidaysChecked.$set(index, false);
            });
          }
        });
      }
    },
    events: {
      submitHoliday() {
        if(this.operatedHoliday.startTime > this.operatedHoliday.endTime) {
          this.$root.showTip({
            type: 'warning',
            msg: '开始日期应小于或等于结束日期！'
          });
          return;
        }

        var notExistsHoliday = this.rule.statutoryHolidaysStr.every(p => {
          if(this.operatedHoliday.flag == 'A') { // 添加假期
            if(p.holidaysName == this.operatedHoliday.holidaysName) {
              return false;
            }
          } else { // 修改假期
            if(p.id != this.operatedHoliday.id && p.holidaysName == this.operatedHoliday.holidaysName) {
              return false;
            }
          }
          return true;
        });

        if(!notExistsHoliday) {
          this.$root.showTip({
            type: 'warning',
            msg: '假期名称不应重复！'
          });
          return;
        }

        var errorMsg = '';
        this.rule.statutoryHolidaysStr.forEach(p => {
          if(this.operatedHoliday.flag == 'A') { // 添加假期
            if((p.startTime <= this.operatedHoliday.endTime) && (p.endTime >= this.operatedHoliday.startTime)) {
              errorMsg += "输入的时间段与" + p.holidaysName + "时间段有重叠！";
            }
          }
        });
        if(errorMsg.length > 0) {
          this.$root.showTip({
            type: 'warning',
            msg: errorMsg
          });
          return;
        }

        if(!this.operatedHoliday.id && this.operatedHoliday.flag=='A') { // 添加假期
          console.log(JSON.stringify(this.operatedHoliday))
          this.rule.statutoryHolidaysStr.$set(this.rule.statutoryHolidaysStr.length, this.operatedHoliday);
        } else { // 修改假期
          this.operatedHoliday.status = '1';
          this.operatedHoliday.valid = '1';
          if(!this.operatedHoliday.id || !this.operatedHoliday.checkworkRuleId) this.operatedHoliday.flag = 'A';
          var holiday = this.rule.statutoryHolidaysStr.find(p => { return p.id === this.operatedHoliday.id; });
          console.log(JSON.stringify(holiday))
          if(holiday) {
            Object.keys(holiday).forEach(p => {
              holiday[p] = this.operatedHoliday[p];
            })
          }
        }
        this.statutoryHolidaysChecked.forEach((p, index)=>{
          this.statutoryHolidaysChecked.$set(index, false);
        });
        this.$nextTick(() => {
          this.refreshHoliday = true;
        });
        this.displayHolidayModal = false;
      },
      submit() {
        var errorMsg = this.verify();
        console.log(errorMsg);
        if (errorMsg.length > 0) {
          this.errorMsg = errorMsg;
          this.displayErrorMsg = true;
          // this.$root.showTip({
          //   type: 'danger',
          //   msg: errorMsg
          // });
          return;
        }


        var copyRule = Object.assign({}, this.rule);

        if (copyRule.fixedRestNotList) copyRule.fixedRestNotListStr = JSON.stringify(this.rule.fixedRestNotList);

        if (copyRule.fixedRestList) copyRule.fixedRestListStr = JSON.stringify(this.rule.fixedRestList);

        if (copyRule.checkworkOvertimeList) copyRule.checkworkOvertimeStr = JSON.stringify(this.rule.checkworkOvertimeList);

        if(copyRule.mobileClockList) copyRule.mobileclockStr = JSON.stringify(this.rule.mobileClockList);

        delete copyRule.fixedRestNotList;
        delete copyRule.fixedRestList;
        delete copyRule.checkworkOvertimeList;
        delete copyRule.mobileClockList;
        delete copyRule.statutoryHolidaysStr;

        var holidays = [];
        this.rule.statutoryHolidaysStr && this.rule.statutoryHolidaysStr.forEach(p => {
          if(p.flag == "D" && !p.id){ // 用户在界面中先添加后又删除，不用处理

          } else { // 
            holidays.push(p);
          }
        });

        copyRule.statutoryHolidaysStr = JSON.stringify(holidays);

        console.log(JSON.stringify(copyRule));

        if (this.rule.ID) {
          store.actions.editAttendanceRule(copyRule, () => {
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
          store.actions.addAttendanceRule(copyRule, () => {
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
      console.log('statutoryHolidaysStr: ', this.rule.statutoryHolidaysStr)

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

      if(!this.rule.ID) {
        store.actions.loadHolidayByCheckworkRuleID((data) => {
          if(Array.isArray(data)) {
            data.forEach(p => {
              // p.id = null;
              p.checkworkRuleId = 0;
            });
          }
          this.$set('rule.statutoryHolidaysStr', data);
        }, (error) => {
          this.$root.showTip({
            type: 'error',
            errorMsg: error
          });
        });
      } else {
        if(this.rule.dayReportTimeType) {
          store.actions.getEmployeeByPostID(this.rule.dayReportTimeType, (empList) => {
            if (!Array.isArray(empList) || empList.length <= 0) {
              this.rule.dayReportTimePost = null;
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
        }
      }
    }
};
</script>
<style lang="css" scoped>
	.divider {
		width: 100%;
		height: 10px;
		margin-bottom: 20px;
		border-bottom: 1px dashed #737373;
	}
	
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
	
	.ui-icon.material-icons {
		position: relative;
		top: 7px;
	}
	
	.form-horizontal .control-label {
		text-align: left;
	}
	
	.radio-inline,
	.checkbox-inline {
		padding-left: 0px;
	}
	
	.row-line {
		padding-left: 0;
		padding-right: 0;
	}
	
	.no-p-left {
		padding-left: 0;
	}
	
	.no-p-right {
		padding-right: 0;
	}
	
	hr {
		height: 0;
		margin-top: 0;
		margin-bottom: 0;
		border-top: 1px dashed #ccc !important;
	}
	
	.rule-add {
		min-height: 800px; 
	}

  /* 操作 */
  .oper {
    width: 60px;
    display: inline-block;
  }

  .oper i {
    color:#fd6d5a;
    font-size:12px;
    display:inline-block;
    height: 12px; 
    width:14px
  }
</style>

<style lang="scss">
  .rule-add .table-holiday .ui-checkbox{
    position: relative;
    top: 8px;
    left: 4px;
  }
</style>