<template>
  <ui-modal :show.sync="display" header="出差/外出申请" type="large" hide-footer>
    <ui-validator v-ref:validator>
      <form class="form-horizontal container-fluid" role="form" vali-submit="submitBtn|submitedCall">
        <div class="row form-group">
          <div class="col-sm-12">
            <label class="col-sm-8 control-label">姓名：</label>
            <div class="col-sm-16">
              <input type="text" class="form-control" readonly="readonly" vali="required" vali-msg="必填项" placeholder="点击选择出差人员" v-model="bizTripApply.userName" @click="displayEmployeeSelect=true" style="width: 220px" />
            </div>
          </div>
          <div class="col-sm-12">
            <label class="col-sm-8 control-label">员工工号：</label>
            <div class="col-sm-16">
              <input type="text" class="form-control" readonly="readonly" v-model="bizTripApply.userNum" style="width: 220px" />
            </div>
          </div>
        </div>
        <div class="row form-group">
          <div class="col-sm-12">
            <label class="col-sm-8 control-label">出发时间：</label>
            <div class="col-sm-16">
              <ui-datepicker :HHMM="true" :time.sync="bizTripApply.sDate" vali="required" vali-msg="请选择出发时间" width="70" style="width: 220px"></ui-datepicker>
            </div>
          </div>
          <div class="col-sm-12">
            <label class="col-sm-8 control-label">返程时间：</label>
            <div class="col-sm-16">
              <ui-datepicker :HHMM="true" :time.sync="bizTripApply.eDate" vali="required" vali-msg="请选择返程时间" width="70" style="width: 220px"></ui-datepicker>
            </div>
          </div>
        </div>
        <div class="row form-group">
          <div class="col-sm-12">
            <label class="col-sm-8 control-label">类型：</label>
            <div class="col-sm-16">
              <select v-model="bizTripApply.actbusType" class="form-control" vali="required" vali-msg="请选择" style="width: 220px">
                <option v-for="category in categoryList" :value="category.code">{{category.codeName}}</option>
              </select>
            </div>
          </div>
          <div class="col-sm-12">
            <label class="col-sm-8 control-label">时长：</label>
            <div class="col-sm-12">
              <input type="text" class="form-control" v-model="bizTripApply.hourOrDays" vali="required" vali-msg="请输入时长" style="width: 180px" />
            </div>
            <label class="col-sm-4 control-label">{{empDurationUnit}}</label>
          </div>
        </div>
        
        <div class="row form-group">
          <div class="col-sm-24">
            <label class="col-sm-4 control-label">出发地：</label>
            <div class="col-sm-{{showAreaSelect?6:10}}">
              <select class="form-control" v-model="selectedProvinceFrom" vali="required" vali-msg="请选择">
                <option v-for="province in provinceList" :value="province.code">{{province.name}}</option>
              </select>
            </div>
            <div class="col-sm-{{showAreaSelect?6:10}}">
              <select class="form-control" v-model="selectedCityFrom" vali="required" vali-msg="请选择">
                <option v-for="city in cityListFrom" :value="city.code">{{city.name}}</option>
              </select>
            </div>
            <div class="col-sm-6" v-if="showAreaSelect">
              <select class="form-control" v-model="selectedAreaFrom" vali="required" vali-msg="请选择">
                <option v-for="area in areaListFrom" :value="area.code">{{area.name}}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="row form-group">
          <div class="col-sm-24">
            <label class="col-sm-4 control-label">目的地：</label>
            <div class="col-sm-{{showAreaSelect?6:10}}">
              <select class="form-control" v-model="selectedProvinceTo" vali="required" vali-msg="请选择">
                <option v-for="province in provinceList" :value="province.code">{{province.name}}</option>
              </select>
            </div>
            <div class="col-sm-{{showAreaSelect?6:10}}">
              <select class="form-control" v-model="selectedCityTo" vali="required" vali-msg="请选择">
                <option v-for="city in cityListTo" :value="city.code">{{city.name}}</option>
              </select>
            </div>
            <div class="col-sm-6" v-if="showAreaSelect">
              <select class="form-control" v-model="selectedAreaTo" vali="required" vali-msg="请选择">
                <option v-for="area in areaListTo" :value="area.code">{{area.name}}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="row form-group">
          
          <div class="col-sm-24">
            <label class="col-sm-4 control-label">出差原因：</label>
            <div class="col-sm-20">
              <input type="text" v-model="bizTripApply.reason" class="form-control" vali="required|maxStr:30" vali-msg="请输入||不超过30个字">
              <!-- <select class="form-control" v-model="bizTripApply.reason" style="width: 220px">
                <option v-for="item in bizTripReason" :value="item.code" :selected="item.code==bizTripApply.reason">{{item.codeName}}</option>
              </select> -->
            </div>
          </div>
        </div>
        <!--<div class="row form-group">
          <div class="col-sm-offset-1 col-sm-12">
            <label class="control-label">
              提示：请您准备好以下材料
            </label>
          </div>
        </div>-->
        <!--<div class="row form-group">
          <div v-for="material in bizTripApplyMaterial" class="col-sm-offset-1 col-sm-23">
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
    <app-select-employee :display.sync="displayEmployeeSelect" v-if="displayEmployeeSelect" :callback="employeeSelected"></app-select-employee>
  </ui-modal>
</template>
<script>
import store from '../store'
import vue from 'Vue'
export default {
  data() {
      return {
        displayEmployeeSelect: false,
        bizTripApplyMaterial: [],
        bizTripReason: [],
        bizTripApply: {
          userID: null,
          userName: null,
          userNum: null,
          sDate: vue.Tool.iDate(new Date(), 'yy-mm-dd').string + ' 00:00:00',
          eDate: vue.Tool.iDate(new Date(), 'yy-mm-dd').string + ' 00:00:00'
        },
        userNum: null,
        empDurationUnit: null,

        categoryList: [],

        showAreaSelect: false,

        selectedProvinceFrom: null,
        selectedCityFrom: null,
        selectedAreaFrom: null,

        selectedProvinceTo: null,
        selectedCityTo: null,
        selectedAreaTo: null,

        provinceList: [],
        cityListFrom: [],
        areaListFrom: [],
        cityListTo: [],
        areaListTo: []
      };
    },
    methods: {
      employeeSelected(emp) {
        if (!emp || emp.length <= 0) {
          this.bizTripApply.userName = null;
          this.bizTripApply.userID = null;
          this.bizTripApply.userNum = null;
          return;
        }
        store.actions.loadEmployeeBizTripDurationUnit(emp[0].ID, (data) => {
          this.empDurationUnit = data;
        }, (error) => {
          this.$root.showTip({
            type: 'danger',
            msg: error,
            duration: 2000
          });
        });
        this.bizTripApply.userName = emp[0].userName;
        this.bizTripApply.userID = emp[0].ID;
        this.bizTripApply.userNum = emp[0].userNum;
      },
      close() {
        this.display = false;
      },
      loadCityByProvince(pID, cityListName) {
        store.actions.loadBizTripCityList(pID, (data) => {
          this.$set(cityListName, data);
        }, (error) => {
          this.$root.showTip({
            type: 'danger',
            msg: error
          });
        });
      },
      loadAreaByCity(cID, areaListName) {
        store.actions.loadBizTripAreaList(cID, (data) => {
          this.$set(areaListName, data);
        }, (error) => {
          this.$root.showTip({
            type: 'danger',
            msg: error
          });
        });
      }
    },
    props: {
      display: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      'bizTripApply.actbusType': function(val) {
        if(val == '160001') {
          this.showAreaSelect = false;
        } else if(val == '160002') {
          this.showAreaSelect = true;
        }
      },
      selectedProvinceFrom(val) {
        if(!val) return;
        this.selectedCityFrom = null;
        this.selectedAreaFrom = null;
        // this.showAreaSelect = false;
        this.$nextTick(() => {
          this.$refs.validator.refresh();
        });
        this.loadCityByProvince(val, 'cityListFrom');
      },
      selectedCityFrom(val) {
        if(!val) return;
        // this.showAreaSelect = (this.selectedCityTo && val == this.selectedCityTo);
        this.selectedAreaFrom = null;
        this.$nextTick(() => {
          this.$refs.validator.refresh();
        });
        this.loadAreaByCity(val, 'areaListFrom');
      },
      selectedProvinceTo(val) {
        if(!val) return;
        this.selectedCityTo = null;
        this.selectedAreaTo = null;
        // this.showAreaSelect = false;
        this.$nextTick(() => {
          this.$refs.validator.refresh();
        });
        this.loadCityByProvince(val, 'cityListTo');
      },
      selectedCityTo(val) {
        if(!val) return;
        // this.showAreaSelect = (this.selectedCityFrom && val == this.selectedCityFrom);
        this.selectedAreaTo = null;
        this.$nextTick(() => {
          this.$refs.validator.refresh();
        });
        this.loadAreaByCity(val, 'areaListTo');
      }
    },
    events: {
      submitedCall() {
        if (this.bizTripApply.sDate >= this.bizTripApply.eDate) {
          this.$root.showTip({
            type: 'danger',
            msg: '返程时间应大于出发时间！',
            duration: 2000
          });
          return;
        }

        // var elapsedHours = (new Date(this.bizTripApply.eDate) - new Date(this.bizTripApply.sDate)) / (1000 * 60 * 60.0);

        // if (this.empDurationUnit == "小时") {
        //   if (elapsedHours < parseFloat(this.bizTripApply.dayOrHours)) {
        //     this.$root.showTip({
        //       type: 'danger',
        //       msg: '时长应小于结束时间到开始时间的间隔小时数！',
        //       duration: 2000
        //     });
        //     return;
        //   }
        // } else if (this.empDurationUnit == "天") {
        //   if (elapsedHours / 24.0 < parseFloat(this.bizTripApply.dayOrHours)) {
        //     this.$root.showTip({
        //       type: 'danger',
        //       msg: '时长应小于结束时间到开始时间的间隔天数！',
        //       duration: 2000
        //     });
        //     return;
        //   }
        // }

        if(this.bizTripApply.actbusType == '160001') { // 出差
          if(this.selectedCityFrom == this.selectedCityTo) {
            this.$root.showTip({
              type: 'danger',
              msg: '出差出发地与目的地不能相同！'
            });
            return;
          }
        } else if(this.bizTripApply.actbusType == '160002') { // 外出
          if(this.selectedCityFrom != this.selectedCityTo) {
            this.$root.showTip({
              type: 'danger',
              msg: '外出出发地与目的地应相同！'
            });
            return;
          }
        }

        this.bizTripApply.startAddr = (this.showAreaSelect ? this.selectedAreaFrom : this.selectedCityFrom);
        this.bizTripApply.towhere = (this.showAreaSelect ? this.selectedAreaTo : this.selectedCityTo);

        this.bizTripApply.startAddrName = this.provinceList.find(p => { return p.code == this.selectedProvinceFrom }).name + '-' +
          this.cityListFrom.find(p => { return p.code == this.selectedCityFrom }).name + 
          (this.showAreaSelect ? '-' + this.areaListFrom.find(p => { return p.code == this.selectedAreaFrom }).name : '');

        this.bizTripApply.towhereName = this.provinceList.find(p => { return p.code == this.selectedProvinceTo }).name + '-' +
          this.cityListTo.find(p => { return p.code == this.selectedCityTo }).name + 
          (this.showAreaSelect ? '-' + this.areaListTo.find(p => { return p.code == this.selectedAreaTo }).name : '');

        this.bizTripApply.unit = this.empDurationUnit;

        store.actions.addBizTripApply(this.bizTripApply, () => {
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
      store.actions.loadBizTripProvinceList((data) => {
        this.provinceList = data;
      }, (error) => {
        this.$root.showTip({
          type: 'danger',
          msg: error
        });
      });

      store.actions.findSystemConfig(store.config.BizTripCategoryCode, (data) => {
        this.categoryList = data;
      }, (error) => {
        this.$root.showTip({
          type: 'danger',
          msg: error,
          duration: 2000
        });
      });

      // 查询出差申请材料
      store.actions.findSystemConfig(store.config.BizTripApplyMaterialCode, (data) => {
        this.bizTripApplyMaterial = data;
      }, (error) => {
        this.$root.showTip({
          type: 'danger',
          msg: error,
          duration: 2000
        });
      });
      // 查询出差原因
      store.actions.findSystemConfig(store.config.BizTripReasonCode, (data) => {
        this.bizTripReason = data;
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
