<!--
* @Created Date       : 2016-08-28T15:36:04+08:00
* @Last Modified time : 2016-12-02T16:32:21+08:00
 -->


<template>
  <section class="ui-module-content pos-content app-schedule-week">
    <div class="ui-module-row ui-panel app-schedulebody">
      <div class="text-center" style="position: relative;">
        <div class="pull-left" style="margin-right: 20px;">
          <div class="btn-group btn-dropgroup" style="margin-right: 20px;">
            <button type="button" class="btn btn-default" @click="changeDate(-1)"><i class="icon-tool icon-tool-keyboardarrowleft" style="font-size:14px;"></i></button>
            <button type="button" class="btn btn-default" data-toggle="dropdown" style="width:200px;">{{deteSelectedString.date}}</button>
            <button type="button" class="btn btn-default" @click="changeDate(1)"><i class="icon-tool icon-tool-keyboardarrowright" style="font-size:14px;"></i></button>
          </div>
          <button  type="button" class="btn btn-default" @click="changeDate(0)">回到今天</button>
          <span class="updatetime">上次更新时间:&nbsp;&nbsp;{{lastupdatetime}}</span>
        </div>
        <div class="pull-right" style="margin-right: 20px;">
          <button   type="button" class="btn btn-default" @click="ScheduleRepairCard">排班补卡</button>
          <v-dropdown class="ui-tool-dropdown" trigger="click" style="vertical-align:middle">
              <button type="button" data-toggle="dropdown" class="btn btn-default">
                <span class="_name pull-left">更多</span>
              </button>
              <ul class="dropdown-menu">
                <li>
                  <a href="javascript:void(0)" @click="CustomRepairCard">自定义补卡</a>
                </li>
                <li>
                  <div style="border-bottom:1px #ccc solid;margin:5px 0px"></div>
                </li>
                <li>
                  <a href="javascript:void(0)" @click="datasync">考勤数据同步</a>
                </li>
                <li>
                  <a href="javascript:void(0)" @click="exportDay">导出考勤数据</a>
                </li>
                <li>
                  <a href="javascript:void(0)">导入考勤数据</a>
                </li>

              </ul>
            </v-dropdown>

        </div>
        <div class="check">
          <ui-radio name="sex" value="1" :model.sync="model" label="异常"></ui-radio>
          <ui-radio name="sex" value="2" :model.sync="model" label="正常"></ui-radio>
          <ui-radio name="sex" value="3" :model.sync="model" label="全部" checked></ui-radio>
        </div>
      </div>
      <div class="grid01">
        <ui-grid v-ref:grid :total.sync="total" :url="attendenceUrl" checked="multi" selectable="multi" class="testtable" :fields="fields" :perpage="50" :pages="[50,100,200]" :btrefresh="true" height="auto" :append-params="queryParam" tdheight="50px" :selected.sync="selected">
        </ui-grid>
      </div>
    </div>
    <components :is="what" :display.sync="whatShow" :ids="selected" v-if="whatShow" :call-back="callback">
    </components>
  </section>
</template>
<script>
import store from '../store'
import Vue from 'vue'
import scheduleRepair from './scheduleRepair'
import customRepair from './customRepair'


const Tool = Vue.tool;
export default {
  data() {
      return {
        what: '',
        whatShow: false,
        state: store.state,
        model: '3', //默认全部
        lastupdatetime: '', //上次更新数据时间
        selected: [], //表格选中项
        total: 0,
        type: 'day',
        dateNow: '',
        dateSelected: '',
        deteSelectedString: {
          date: ''
        },
        attendenceUrl: 'api.Attendence.getDailyworktime',
        pageParams: {},
        fields: [{
          name: 'userNum',
          title: '员工工号',
          width: '150px',
          locked: 'first'
        }, {
          name: 'userName',
          title: '姓名',
          width: '100px',
          locked: 'first'
        }, {
          name: 'departmentName',
          title: '部门',
          width: '150px'
        }, {
          name: 'onWork',
          title: '上班时间',
          width: '200px',
          formater: function(value, data, index) {
            if (value) {
              return Tool.iDate(value, 'yy-mm-dd hh:mm:ss').string;
            } else {
              return ''
            }
          }
        }, {
          name: 'offWork',
          title: '下班时间',
          width: '200px',
          formater: function(value, data, index) {
            if (value) {
              return Tool.iDate(value, 'yy-mm-dd hh:mm:ss').string;
            } else {
              return ''
            }
          }
        }, {
          name: 'firstClockTime',
          title: '上班打卡时间',
          width: '200px',
          formater: function(value, data, index) {
            if (value) {
              return Tool.iDate(value, 'yy-mm-dd hh:mm:ss').string;
            } else {
              return ''
            }
          }
        }, {
          name: 'lastClockTime',
          title: '下班打卡时间',
          width: '200px',
          formater: function(value, data, index) {
            if (value) {
              return Tool.iDate(value, 'yy-mm-dd hh:mm:ss').string;
            } else {
              return ''
            }
          }
        }, {
          name: 'lateTime',
          title: '迟到时间(分钟)',
          width: '150px',
        }, {
          name: 'leaveTime',
          title: '早退时间(分钟)',
          width: '150px',
        }, {
          name: 'state',
          title: '备注',
          width: '100px',
          formater: function(value, data, index) {
            switch (value) {
              case '1':
                return '异常'
              case '2':
                return '正常'
              case '3':
                return '无排班'
            }
          }
        }, {
          name: 'cause',
          title: '补卡原因',
          width: '150px',
          formater: function(value, data, index) {
            if (value) {
              return value;
            } else {
              return '未补卡';
            }
          }
        }]
      }
    },
    created() {
      this.dateNow = this.$Tool.iDate(new Date(), 'yy-mm-dd');
      this.dateSelected = this.dateNow;
      this.deteSelectedString.date = this.dateSelected.string;
    },
    computed: {
      queryParam: {
        get: function() {
          let p = {};
          Object.assign(p, this.state.searchParam, {
            date: this.deteSelectedString.date,
            model: this.model
          })
          return p;
        }
      }
    },
    watch: {
      'state.searchParam': function(a, b) {
        this.$refs.grid.refresh();
        this.getLastTime();
      },
      model() {
        this.$refs.grid.refresh();
        this.getLastTime();
      }
    },
    attached() {
      if (this.$route.query && this.$route.query.model) {
        if (this.$route.query.model) {
          this.model = this.$route.query.model;
          this.$refs.table.refresh();
        }
      }
    },
    ready() {
      this.getLastTime();
    },
    methods: {
      exportDay(){
        //postc参数转get
        var param = Object.keys(this.queryParam).map((item) => {
          return item + "=" + this.queryParam[item];
        }).join('&');
        this.$root.downloadFile('acewill/temp/exportDayAttendance.htm',param);
      },
      getLastTime() {
        var self = this;
        store.actions.getLastTime(function(data) {
          if (data && data.createDate) {
            self.lastupdatetime = Tool.iDate(data.createDate, 'yy-mm-dd hh:mm:ss').string;
          }
        }, function(error) {
          self.$root.showTip({
            type: 'danger',
            msg: error,
            duration: 2000
          });
          return;
        });
      },
      datasync() {
        var self = this;
        store.actions.dataSync(this.deteSelectedString.date, function(data) {
          self.$root.showTip({
            type: 'danger',
            msg: "正在同步数据,请稍后刷新查询",
            duration: 2000
          });
          self.getLastTime();
        }, function(error) {
          self.$root.showTip({
            type: 'danger',
            msg: error,
            duration: 2000
          });
        })
      },
      //补卡回调
      callback() {
        this.$refs.grid.refresh();
      },
      //排班补卡
      ScheduleRepairCard() {
        var self = this;
        if (self.selected.length == 0) {
          self.$root.showTip({
            type: 'danger',
            msg: "请选择要操作的记录",
            duration: 2000
          });
          return;
        }

        this.what = 'scheduleRepair';
        this.whatShow = true;
      },
      //自定义补卡
      CustomRepairCard() {
        var self = this;
        if (self.selected.length == 0) {
          self.$root.showTip({
            type: 'danger',
            msg: "请选择要操作的记录",
            duration: 2000
          });
          return;
        }
        if (self.selected.length > 1) {
          self.$root.showTip({
            type: 'danger',
            msg: "自定义补卡只能选择单条记录操作",
            duration: 2000
          });
          return;
        }

        this.what = 'customRepair';
        this.whatShow = true;

      },
      changestate(arg) {
        if (arg == 'day') {
          this.type = 'day';
        } else if (arg == 'month') {
          this.type = 'month';
        }
      },
      changeDate(diff) {
        // 日
        if (this.type == 'day') {
          if (diff == 0) {
            this.dateSelected = this.dateNow;
          } else if (diff < 0) {
            this.dateSelected = this.$Tool.iDate(this.dateSelected.time, 'yy-mm-dd', -1);
          } else if (diff > 0) {
            this.dateSelected = this.$Tool.iDate(this.dateSelected.time, 'yy-mm-dd', 1);
          }
        }
        this.deteSelectedString.date = this.dateSelected.string;
        var self = this;
        setTimeout(() => {
          self.$refs.grid.refresh()
        }, 200);
      },
    },
    components: {
      scheduleRepair,
      customRepair
    }
}
</script>
<style>
.grid01 {
  top: 60px;
  bottom: 15px;
  left: 15px;
  right: 15px;
  position: absolute;
}

.check {
  display: inline-block;
  margin-top: 7px;
  float: right;
}

.updatetime {
  vertical-align: middle;
  color: #BFC1C5;
  font-size: 14px;
  padding: 0px 10px;

position: fixed;
right: 50px;
top: 20px;
z-index: 1000;
display: block;

}

/* @media screen and (max-width:1400px) {
  .updatetime {
    display: none;
  }
} */
</style>
