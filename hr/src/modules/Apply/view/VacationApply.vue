<template>
  <ui-modal :show.sync="display" header="请假申请" type="large" hide-footer>
    <ui-validator>
      <form class="form-horizontal container-fluid" role="form" vali-submit="submitBtn|submitedCall">
        <div class="row form-group">
          <div class="col-sm-12">
            <label class="col-sm-8 control-label">姓名：</label>
            <div class="col-sm-16">
              <input type="text" class="form-control" readonly="readonly" vali="required" vali-msg="必填项" placeholder="点击选择请假人员" v-model="vacationApply.userName" @click="displayEmployeeSelect=true" style="width: 220px" />
            </div>
          </div>
          <div class="col-sm-12">
            <label class="col-sm-8 control-label">员工工号：</label>
            <div class="col-sm-16">
              <input type="text" class="form-control" readonly="readonly" v-model="vacationApply.userNum" style="width: 220px" />
            </div>
          </div>
        </div>
        <div class="row form-group">
          <div class="col-sm-12">
            <label class="col-sm-8 control-label">开始时间：</label>
            <div class="col-sm-16">
              <ui-datepicker :HHMM="true" :time.sync="vacationApply.sDate" format="yyyy-MM-dd" vali="required" vali-msg="必填项"></ui-datepicker>
            </div>
          </div>
          <div class="col-sm-12">
            <label class="col-sm-8 control-label">结束时间：</label>
            <div class="col-sm-16">
              <ui-datepicker :HHMM="true" :time.sync="vacationApply.eDate" format="yyyy-MM-dd" vali="required" vali-msg="必填项"></ui-datepicker>
            </div>
          </div>
        </div>
        <div class="row form-group">
          <div class="col-sm-12">
            <label class="col-sm-8 control-label">假期类型：</label>
            <div class="col-sm-16">
              <select class="form-control" v-model="vacationApply.type" vali="required" vali-msg="请选择假期类型" style="width: 220px">
                <option v-for="item in vacationCategory" :value="item.code" :selected="item.code==vacationApply.type">{{item.codeName}}</option>
              </select>
            </div>
          </div>
          <div class="col-sm-12">
            <label class="col-sm-8 control-label">时长：</label>
            <div class="col-sm-12">
              <input type="text" class="form-control" v-model="vacationApply.dayOrHours" vali="required" vali-msg="请输入时长" style="width: 180px" :placeholder="empDurationUnit&&remainDuration?'剩余'+remainDuration+empDurationUnit:null" />
            </div>
            <label class="col-sm-4 control-label">{{empDurationUnit}}</label>
          </div>
        </div>
        <div class="row form-group">
          <div class="col-sm-12">
            <label class="col-sm-8 control-label">请假原因：</label>
            <div class="col-sm-16">
              <select class="form-control" v-model="vacationApply.reason" vali="required" vali-msg="请选择请假原因" style="width: 220px">
                <option v-for="item in vacationReason" :value="item.code" :selected="item.code==vacationApply.reason">{{item.codeName}}</option>
              </select>
            </div>
          </div>
          <div class="col-sm-12" v-if="showRemain">
            <!-- 年假和调休显示剩余时长 -->
            <label class="col-sm-8 control-label">剩余时长：</label>
            <label class="col-sm-16 control-label" style="text-align: left">
              {{remainDuration}}{{empDurationUnit}}
            </label>
          </div>
        </div>
        <!-- <div class="row form-group">
          <div class="col-sm-offset-1 col-sm-12">
            <label class="control-label">
              提示：请您准备好以下材料
            </label>
          </div>
        </div> -->
        <div class="row form-group">
          <div v-for="material in vacationApplyMaterial" class="col-sm-offset-1 col-sm-23">
            {{$index+1}}.{{material.codeName}}
          </div>
        </div>
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
        vacationApplyMaterial: [],
        vacationReason: [],
        vacationCategory: [],
        vacationApply: {
          userID: null,
          userName: null,
          userNum: null,
          sDate: vue.Tool.iDate(new Date(), 'yy-mm-dd').string + ' 00:00:00',
          eDate: vue.Tool.iDate(new Date(), 'yy-mm-dd').string + ' 00:00:00'
        },
        empDurationUnit: null,
        remainDuration: null,
        showRemain: false
      };
    },
    watch: {
      'vacationApply.userID': function(val) {
        this.getDurationUnit();
        this.getVacationRemain();
      },
      'vacationApply.type': function(val) {
        this.getDurationUnit();
        this.getVacationRemain();
      },
      'vacationApply.sDate': function(val) {
        if(!val || val.length <= 10) return;
        this.getDurationUnit();
        this.getVacationRemain();
      },
      'vacationApply.eDate': function(val) {
        if(!val || val.length <= 10) return;
        this.getDurationUnit();
        this.getVacationRemain();
      }
    },
    methods: {
      employeeSelected(emp) {
        if (!emp || emp.length <= 0) {
          this.vacationApply.userName = null;
          this.vacationApply.userID = null;
          this.vacationApply.userNum = null;
          return;
        }
        this.vacationApply.userName = emp[0].userName;
        this.vacationApply.userID = emp[0].ID;
        this.vacationApply.userNum = emp[0].userNum;
      },
      getDurationUnit() {
        if (!this.vacationApply.userID || !this.vacationApply.type) {
          this.empDurationUnit = '';
          return;
        }
        store.actions.loadEmployeeVacationDurationUnit(this.vacationApply.userID, this.vacationApply.type, (data) => {
          this.empDurationUnit = data;
        }, (error) => {
          this.$root.showTip({
            type: 'danger',
            msg: error,
            duration: 2000
          });
        });
      },
      getVacationRemain() {
        if (!this.vacationApply.type || !(this.vacationApply.type == 133001 || this.vacationApply.type == 133003)) {
          // this.showRemain = false;
          this.remainDuration = 0;
          return;
        }
        if (!this.vacationApply.userID || !this.vacationApply.sDate) {
          // this.showRemain = false;
          this.remainDuration = 0;
          return;
        }
        if (this.vacationApply.type == 133001) { // 年假
          store.actions.getAnnualVacationRemain(this.vacationApply.userID, this.vacationApply.sDate, (data) => {
            this.remainDuration = parseFloat(data.resday || 0) + parseFloat(data.residueday || 0);
            if (this.remainDuration == 0) {
              this.$root.showTip({
                type: 'warning',
                msg: '该员工无年假！'
              });
            }
            // this.showRemain = true;
            // this.$set('vacationApply.dayOrHours', parseFloat(this.remainDuration - 0));
            return;
          }, (error) => {
            this.$root.showTip({
              type: 'danger',
              msg: error
            });
          });
        } else if (this.vacationApply.type == 133003) { // 调休
          if (!this.vacationApply.eDate) {
            // this.showRemain = false;
            return;
          }
          store.actions.getCompensationVacationRemain(this.vacationApply.sDate, this.vacationApply.eDate, this.vacationApply.userID, (data) => {
            this.remainDuration = parseFloat(data);
            if (this.remainDuration == 0) {
              this.$root.showTip({
                type: 'warning',
                msg: '该员工无调休！'
              });
            }
            // this.$set('vacationApply.dayOrHours', parseFloat(this.remainDuration - 0));
            // this.showRemain = true;
          }, (error) => {
            this.$root.showTip({
              type: 'danger',
              msg: error
            });
          });
        }
      },
      close() {
        this.display = false;
      }
    },
    props: {
      display: {
        type: Boolean,
        default: false
      }
    },
    events: {
      submitedCall() {
        if ((this.vacationApply.type == 133001 || this.vacationApply.type == 133003) && this.remainDuration == 0) {
          if (this.remainDuration == 0) {
            this.$root.showTip({
              type: 'danger',
              msg: '该员工无该请假类型时长！',
              duration: 2000
            });
            return;
          } else if (parseFloat(this.vacationApply.dayOrHours) > parseFloat(this.remainDuration)) {
            this.$root.showTip({
              type: 'danger',
              msg: '该员工剩余时长不够！',
              duration: 2000
            });
            return;
          }
        }
        if (this.vacationApply.sDate >= this.vacationApply.eDate) {
          this.$root.showTip({
            type: 'danger',
            msg: '结束时间应大于开始时间！',
            duration: 2000
          });
          return;
        }

        // var elapsedHours = (new Date(this.vacationApply.eDate) - new Date(this.vacationApply.sDate)) / (1000 * 60 * 60.0);

        // if (this.empDurationUnit == "小时") {
        //   if (elapsedHours < parseFloat(this.vacationApply.dayOrHours)) {
        //     this.$root.showTip({
        //       type: 'danger',
        //       msg: '时长应小于结束时间到开始时间的间隔小时数！',
        //       duration: 2000
        //     });
        //     return;
        //   }
        // } else if (this.empDurationUnit == "天") {
        //   if (elapsedHours / 24.0 < parseFloat(this.vacationApply.dayOrHours)) {
        //     this.$root.showTip({
        //       type: 'danger',
        //       msg: '时长应小于结束时间到开始时间的间隔天数！',
        //       duration: 2000
        //     });
        //     return;
        //   }
        // }

        this.vacationApply.unit = this.empDurationUnit;

        store.actions.addVacationApply(this.vacationApply, () => {
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
    },
    ready() {
      // // 查询请假申请材料
      // store.actions.findSystemConfig(store.config.VacationApplyMaterialCode, (data) => {
      //   this.vacationApplyMaterial = data;
      // }, (error) => {
      //   this.$root.showTip({
      //     type: 'danger',
      //     msg: error,
      //     duration: 2000
      //   });
      // });
      // 查询请假原因
      store.actions.findSystemConfig(store.config.VacationReasonCode, (data) => {
        this.vacationReason = data;
      }, (error) => {
        this.$root.showTip({
          type: 'danger',
          msg: error,
          duration: 2000
        });
      });
      // 查询假期类型
      store.actions.findSystemConfig(store.config.VacationCategoryCode, (data) => {
        this.vacationCategory = data;
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
