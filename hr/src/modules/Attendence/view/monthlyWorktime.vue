<!--
* @Created Date       : 2016-08-28T15:36:04+08:00
* @Last Modified time : 2016-12-02T16:32:37+08:00
 -->


<template>
  <section class="ui-module-content pos-content app-schedule-week">
    <div class="ui-module-row ui-panel app-schedulebody">
      <div class="text-center" style="position: relative;">
        <div class="pull-left" style="margin-right: 20px;">
          <div class="btn-group btn-dropgroup" style="margin-right: 20px;">
            <button type="button" class="btn btn-default" @click="changeMonth(-1)"><i class="icon-tool icon-tool-keyboardarrowleft" style="font-size:14px;"></i></button>
            <button type="button" class="btn btn-default" data-toggle="dropdown" style="width:200px;">{{dateSelected.y+'年'+dateSelected.m+'月'}}</button>
            <button type="button" class="btn btn-default" @click="changeMonth(1)"><i class="icon-tool icon-tool-keyboardarrowright" style="font-size:14px;"></i></button>
          </div>
          <button v-else type="button" class="btn btn-default" @click="changeMonth(0)">回到本月</button>
          <button v-else type="button" class="btn btn-default" @click="exportExcel">导出考勤明细</button>
        </div>
      </div>
      <div class="grid02">
        <ui-grid v-ref:grid :total.sync="total" :url="attendenceUrl" class="testtable" :fields="fields" :perpage="30" :pages="[10,20,30,50]" :btrefresh="true" height="auto" :append-params="queryParam" tdheight="50px">
        </ui-grid>
      </div>
    </div>
  </section>
</template>
<script>
import store from '../store'
import Vue from 'vue'
const Tool = Vue.tool;
export default {
  data() {
      return {
        state: store.state,

        total: 0,
        type: 'month',
        dateNow: '',
        dateSelected: '',
        dateSelectedString: {
          date: ''
        },
        attendenceUrl: 'api.Attendence.getMonthworktime',
        pageParams: {},
        fields: [{
          name: 'userNum',
          title: '员工编号',
          width: '150px',
          locked: 'first'
        }, {
          name: 'userName',
          title: '姓名',
          width: '100px',
          locked: 'first'
        }, {
          name: 'deptName',
          title: '部门',
          width: '200px',
          locked: 'first'
        }, {
          name: 'lateNum',
          title: '迟到次数',
          width: '150px'
        }, {
          name: 'leaveNum',
          title: '早退次数',
          width: '150px'
        }, {
          name: 'lateTotalTime',
          title: '迟到总时间',
          width: '150px'
        }, , {
          name: 'leaveTotalTime',
          title: '早退总时间',
          widht: '150px'
        }, ]
      }
    },
    created() {
      this.dateNow = this.$Tool.iDate(new Date(), 'yy-mm-dd');
      this.dateSelected = this.dateNow; //当前时间赋给选择的时间对象；
      this.dateSelectedString.date = this.dateSelected.string; //把时间赋给页面button元素
    },
    ready() {

    },
    watch: {
      'state.searchParam': function(a, b) {
        this.$refs.grid.refresh();
      }
    },
    computed: {
      queryParam: {
        get: function() {
          let p = {};
          Object.assign(p, this.state.searchParam, {
            date: this.dateSelectedString.date
          })
          return p;
        }
      }
    },
    methods: {
      //导出Excel
      exportExcel() {
        //postc参数转get
        var param = Object.keys(this.queryParam).map((item) => {
          return item + "=" + this.queryParam[item];
        }).join('&');
        this.$root.downloadFile('acewill/temp/exportDayAttendanceToExcel.htm',param);
      },
      changestate(arg) {
        if (arg == 'day') {
          this.type = 'day';
        } else if (arg == 'month') {
          this.type = 'month';
        }
      },
      // 切换月份 >> 更新时间列表 >> 设置当前时间 >> 初始化新数据
      changeMonth(n) {
        let now = this.dateSelected;
        console.log(now);
        var next;
        // 前一年
        if (now.m + n <= 0) {
          next = (this.dateSelected.y - 1) + '-' + '12-01';
        }
        // 后一年
        else if (now.m + n > 12) {
          next = (this.dateSelected.y + 1) + '-' + '01-01';
        } else {
          next = this.dateSelected.y + '-' + (this.dateSelected.m + n) + '-01';
        }
        if (n == 0) {
          this.dateSelected = this.$Tool.iDate(new Date(), 'yy-mm-dd');
          this.dateSelectedString.date = this.dateSelected.string;
          console.log(this.dateSelectedString.date);
        } else {
          this.dateSelected = this.$Tool.iDate(new Date(next), 'yy-mm-dd');
          this.dateSelectedString.date = next;
          console.log(this.dateSelectedString.date);
        }
        var self = this;
        setTimeout(() => {
          self.$refs.grid.refresh()
        }, 200);
      },
    },
}
</script>
<style scoped>
.grid02 {
  top: 60px;
  bottom: 15px;
  left: 15px;
  right: 15px;
  position: absolute;
}
</style>
