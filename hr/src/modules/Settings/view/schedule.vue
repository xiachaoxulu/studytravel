<!-- 系统配置页面，用户配置离职原因等各种 -->
<template class="schedule-page">
  <!-- <div class="schedule-page"> -->
    <header class="ui-module-navbar pos-topbar-fixed">
      <div class="ui-module-navbar-content">
        <div class="pull-left">
          <h4><strong>排班规则</strong></h4>
        </div>
      </div>
    </header>
    <section class="ui-module-content ui-panel">
        <ui-validator>
            <div style="margin: 50px auto 0; width: 700px; border: 1px solid #ddd; border-radius: 10px;padding: 30px;">
            <form class="form-horizontal container-fluid" vali-submit="submitBt|submitedCall" vali-reset="resetBt|resetedCall">
                <div class="form-body">
                    <div class="form-group row">
                        <label class="col-sm-6 control-label">管理组排班周期</label>
                        <div class="col-sm-18">
                            <div class="radio-group">
                                <ui-radio name="c1" value="1" :model.sync="state.scheduleConfig.managePeriod" label="按周排班" vali="radio|required" ></ui-radio>
                                <ui-radio name="c1" value="2" :model.sync="state.scheduleConfig.managePeriod" label="按月排班" ></ui-radio>
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-6 control-label">服务组排班周期</label>
                        <div class="col-sm-18">
                            <div class="radio-group">
                                <ui-radio name="c2" value="1" :model.sync="state.scheduleConfig.servicePeriod" label="按周排班" vali="radio|required" ></ui-radio>
                                <ui-radio name="c2" value="2" :model.sync="state.scheduleConfig.servicePeriod" label="按月排班" ></ui-radio>
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-6 control-label">部门排班周期</label>
                        <div class="col-sm-18">
                            <div class="radio-group">
                                <ui-radio name="c3" value="1" :model.sync="state.scheduleConfig.departmentPeriod" label="按周排班" vali="radio|required" ></ui-radio>
                                <ui-radio name="c3" value="2" :model.sync="state.scheduleConfig.departmentPeriod" label="按月排班" ></ui-radio>
                            </div>

                        </div>
                    </div>

                    <!-- <div class="form-group row">
                        <label class="col-sm-6 control-label">跨天班次</label>
                        <div class="col-sm-18">
                            <div class="radio-group">
                                <ui-radio name="c4" value="1" :model.sync="overdayType" label="属于今天" vali="radio|required" vali-msg="必填项||验证失败" checked></ui-radio>
                                <ui-radio name="c4" value="2" :model.sync="overdayType" label="属于明天" ></ui-radio>
                            </div>
                        </div>
                    </div> -->


                    <div class="form-group row">
                        <label class="col-sm-6 control-label">管理组应休天数</label>
                        <div class="col-sm-18">
                             <div class="input-group">
                                <input type="text" class="form-control" placeholder="" vali="required|minNum:0|float:1|floatStep:0.5" vali-msg="必填项,必须为数字||数字，只允许整天或0.5天的情况" v-model="state.scheduleConfig.manageRest">
                                <div class="input-group-addon">天</div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-6 control-label">服务组应休天数</label>
                        <div class="col-sm-18">
                             <div class="input-group">
                                <input type="text" class="form-control" placeholder="" vali="required|minNum:0|float:1|floatStep:0.5" vali-msg="必填项,必须为数字||数字，只允许整天或0.5天的情况" v-model="state.scheduleConfig.serviceRest">
                                <div class="input-group-addon">天</div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-6 control-label">部门应休天数</label>
                        <div class="col-sm-18">
                             <div class="input-group">
                                <input type="text" class="form-control" placeholder="" vali="required|minNum:0|float:1|floatStep:0.5" vali-msg="必填项,必须为数字||数字，只允许整天或0.5天的情况" v-model="state.scheduleConfig.departmentRest">
                                <div class="input-group-addon">天</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-actions">
                    <div class="row">
                        <div class="text-center">
                            <ui-button id="submitBt" color="accent">提交</ui-button>
                            <!-- <ui-button id="resetBt" color="default">取消</ui-button> -->
                        </div>
                    </div>
                </div>
            </form>

            </div>

        </ui-validator>


    </section>
  <!-- </div> -->
</template>
<script>
import storeCom from 'src/store'
import store from '../store'
export default {

    attached(){
        store.actions.getScheduleConfig();
    },
    data(){
        return {
            state:store.state,
        }
    },
    events:{
        submitedCall(){
            let _this = this;
            store.actions.putScheduleConfig(function(){

                // 标记排班设置已更改用于打开排班的时候进行刷新
                _this.$root.state.secheduleConfigChanged = true;

                _this.$root.showTip({
                    type:'success',
                    msg:'提交成功'
                })

            },function(msg){

                _this.$root.showTip({
                    type:'error',
                    msg:msg
                })

            });

        }
    }

}
</script>
<style lang="css" scoped>

</style>
