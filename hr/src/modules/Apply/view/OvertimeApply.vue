<template>
  <ui-modal :show.sync="display" header="加班申请" type="large" hide-footer>
    <ui-validator>
      <form class="form-horizontal container-fluid" role="form" vali-submit="submitBtn|submitedCall">
        <div class="row form-group">
          <div class="col-sm-12">
            <label class="col-sm-8 control-label">姓名：</label>
            <div class="col-sm-16">
              <input type="text" class="form-control" readonly="readonly" vali="required" vali-msg="必填项" placeholder="点击选择加班人员" v-model="overtimeApply.userName" @click="displayEmployeeSelect=true" style="width: 220px" />
            </div>
          </div>
          <div class="col-sm-12">
            <label class="col-sm-8 control-label">员工工号：</label>
            <div class="col-sm-16">
              <input type="text" class="form-control" readonly="readonly" v-model="overtimeApply.userNum" style="width: 220px" />
            </div>
          </div>
        </div>
        <div class="row form-group">
          <div class="col-sm-12">
            <label class="col-sm-8 control-label">开始时间：</label>
            <div class="col-sm-16">
              <ui-datepicker :HHMM="true" :time.sync="overtimeApply.sDate" vali="required" vali-msg="请选择开始时间" style="width: 220px"></ui-datepicker>
            </div>
          </div>
          <div class="col-sm-12">
            <label class="col-sm-8 control-label">结束时间：</label>
            <div class="col-sm-16">
              <ui-datepicker :HHMM="true" :time.sync="overtimeApply.eDate" vali="required" vali-msg="请选择结束时间" style="width: 220px"></ui-datepicker>
            </div>
          </div>
        </div>
        <div class="row form-group">
          <div class="col-sm-12">
            <label class="col-sm-8 control-label">时长：</label>
            <div class="col-sm-12">
              <input type="text" class="form-control" v-model="overtimeApply.dayOrHours" vali="required" vali-msg="请输入时长" style="width: 180px" />
            </div>
            <label class="col-sm-4 control-label">{{empDurationUnit}}</label>
          </div>
          <div class="col-sm-12">
            <label class="col-sm-8 control-label">加班原因：</label>
            <div class="col-sm-16">
              <input type="text" v-model="overtimeApply.reason" class="form-control" vali="required|maxStr:30" vali-msg="必填项|最大长度30" style="width: 220px">
            </div>
          </div>
        </div>
        <div class="row form-group">
          <div class="col-sm-12">
            <label class="col-sm-8 control-label">加班类型：</label>
            <div class="col-sm-12">
              <select class="form-control" v-model="overtimeApply.actoverType" vali="required" vali-msg="必选项" style="width: 220px">
                <option v-for="item in overtimeReason" :value="item.code" :selected="item.code==overtimeApply.actoverType">{{item.codeName}}</option>
              </select>
            </div>
          </div>
        </div>
        <!--<div class="row form-group">
          <div class="col-sm-offset-1 col-sm-12">
            <label class="control-label">
              提示：请您准备好以下资料
            </label>
          </div>
        </div>
        <div class="row form-group">
          <div v-for="material in overtimeApplyMaterial" class="col-sm-offset-1 col-sm-23">
            {{$index+1}}.{{material.codeName}}
          </div>
        </div>-->
        <div class="form-actions">
          <div class="row">
            <div class="text-center">
              <ui-button id="submitBtn" color="accent">保存</ui-button>
              <ui-button color="default" @click="close">取消</ui-button>
            </div>
          </div>
        </div>
      </form>
    </ui-validator>
  </ui-modal>
  <app-select-employee :display.sync="displayEmployeeSelect" v-if="displayEmployeeSelect" :callback="employeeSelected"></app-select-employee>
</template>
<script>
import store from '../store'
import vue from 'Vue'
export default {
  data() {
      return {
        state: store.state,
        displayEmployeeSelect: false,
        overtimeApplyMaterial: [],
        overtimeReason: [],
        overtimeApply: {
          userName: null,
          ID: null,
          userNum: null,
          sDate: vue.Tool.iDate(new Date(), 'yy-mm-dd').string + ' 00:00:00',
          eDate: vue.Tool.iDate(new Date(), 'yy-mm-dd').string + ' 00:00:00'
        },
        empDurationUnit: null
      };
    },
    methods: {
      employeeSelected(emp) {
        if (!emp || emp.length <= 0) {
          this.overtimeApply.userName = null;
          this.overtimeApply.userID = null;
          this.overtimeApply.userNum = null;
          return;
        }
        store.actions.loadEmployeeOvertimeDurationUnit(emp[0].ID, (data) => {
          this.empDurationUnit = data;
          this.overtimeApply.unit = this.empDurationUnit;
        }, (error) => {
          this.$root.showTip({
            type: 'danger',
            msg: error,
            duration: 2000
          });
        });
        this.overtimeApply.userName = emp[0].userName;
        this.overtimeApply.userID = emp[0].ID;
        this.overtimeApply.userNum = emp[0].userNum;
      },
      close() {
        this.display = false;
      }
    },
    props: {
      display: {
        twoWay: true,
        type: Boolean,
        default: false
      }
    },
    events: {
      submitedCall() {
        if (this.overtimeApply.sDate >= this.overtimeApply.eDate) {
          this.$root.showTip({
            type: 'danger',
            msg: '结束时间应大于开始时间！',
            duration: 2000
          });
          return;
        }

        // var elapsedHours = (new Date(this.overtimeApply.eDate) - new Date(this.overtimeApply.sDate)) / (1000 * 60 * 60.0);

        // if (this.empDurationUnit == "小时") {
        //   if (elapsedHours < parseFloat(this.overtimeApply.dayOrHours)) {
        //     this.$root.showTip({
        //       type: 'danger',
        //       msg: '时长应小于结束时间到开始时间的间隔小时数！',
        //       duration: 2000
        //     });
        //     return;
        //   }
        // } else if (this.empDurationUnit == "天") {
        //   if (elapsedHours / 24.0 < parseFloat(this.overtimeApply.dayOrHours)) {
        //     this.$root.showTip({
        //       type: 'danger',
        //       msg: '时长应小于结束时间到开始时间的间隔天数！',
        //       duration: 2000
        //     });
        //     return;
        //   }
        // }

        if((new Date(this.overtimeApply.eDate)).getDay() > (new Date(this.overtimeApply.sDate)).getDay()) {
          this.$root.showConfirm({
            msg: '开始日期与结束日期不同。多天加班且加班时长不同，请分开申请，否则加班时间按天数平均计算。是否继续？',
            ok: () => {
              store.actions.addOvertimeApply(this.overtimeApply, () => {
                var children = this.$parent.$children;
                for (var i = 0; i < children.length; i++) {
                  if (children[i].$refs.table) {
                    children[i].$refs.table.refresh();
                    break;
                  }
                }
                this.display = false;
              }, (error) => {
                this.$root.showTip({
                  type: 'danger',
                  msg: error,
                  duration: 2000
                });
              });
            }
          });
        } else {
          store.actions.addOvertimeApply(this.overtimeApply, () => {
            var children = this.$parent.$children;
            for (var i = 0; i < children.length; i++) {
              if (children[i].$refs.table) {
                children[i].$refs.table.refresh();
                break;
              }
            }
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
      // 查询加班申请材料
      store.actions.findSystemConfig(store.config.OvertimeApplyMaterialCode, (data) => {
        this.overtimeApplyMaterial = data;
      }, (error) => {
        this.$root.showTip({
          type: 'danger',
          msg: error,
          duration: 2000
        });
      });
      // 查询加班类型
      store.actions.findSystemConfig(store.config.OvertimeCategoryCode, (data) => {
        this.overtimeReason = data;
      }, (error) => {
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
</style>
