<template>
  <div class="panel warp">
    <div class="content">
      <ui-scrollview>
        <div class="exceptionContainer">
          <div class="top">
            <div class="form-group   row">
              <label class="col-sm-4 control-label">{{userName}}</label>
              <div class="col-sm-12">
                <p v-for="item in list">
                  {{item.effectiveTime}} - {{item.endTime}}
                </p>
              </div>
              <div class="col-sm-8">
                调拨总工时:&nbsp;&nbsp;{{monthTotal}}
              </div>
            </div>
          </div>
          <ui-calendar v-ref:calendar class="calendar" :itemclickcallback="calendaritemclickcallback" :controllastcallback="controllastcallback" :controlnextcallback="controlnextcallback" :formatter="calendarformatter" cstyle=".wrap{box-shadow:none !important;}.header{background-color:#F55B48;color:white;text-align:center !important;}"></ui-calendar>
          <div class="tip">
            <div>
              <span class="banci-label">工作时间:&nbsp;&nbsp;</span>
              <div class="banci">
                <div v-for="item in worktime">
                  {{item}}
                </div>
              </div>
            </div>
            <p><span>休息时间:&nbsp;&nbsp;</span>{{restTime}}</p>
            <p><span>总&nbsp;工&nbsp;&nbsp;时:&nbsp;&nbsp;</span>{{hoursForDay}}</p>
          </div>
        </div>
      </ui-scrollview>
    </div>
  </div>
</template>
<script>
import store from '../store.js'

export default {
  data() {
      return {
        userName: '',
        list: [],
        calendarlist: [],
        monthTotal: '', //月总工时

        worktime: [],
        restTime: '',
        hoursForDay: '',
      };
    },
    watch: {

    },
    methods: {

      getTitle() {
        var self = this;
        store.actions.getAllotTitle({
          userID: this.userid,
          dateStr: self.date
        }, function(data) {
          self.userName = data.userName;
          self.monthTotal = data.transferTime;
          self.list = data.transferworkList;
        }, function(error) {
          self.$root.showTip({
            type: 'danger',
            msg: error,
            duration: 2000
          });
        })
      },
      //日历点击某一天回调
      calendaritemclickcallback(year, month, day) {
        let date = year + '-' + this.$Tool.padleft(month, '0', 2) + '-' + this.$Tool.padleft(day, '0', 2);
        var obj = this.calendarlist.find((item) => {
          if (item.date == date) {
            return true;
          }
        });
        if (!!obj) {
          if (!!obj.dkbc) {
            this.worktime = JSON.parse(obj.dkbc);
          } else {
            this.worktime = [];
          }
          this.hoursForDay = obj.hoursForDay;
          this.restTime = obj.restTime;
        } else {
          this.worktime = [];
          this.hoursForDay = '';
        }
      },
      //点击下月
      controllastcallback(year, month) {
        this.refresh();
      },
      //点击上月
      controlnextcallback(year, month) {
        this.refresh();
      },
      //日历模板
      calendarformatter(year, month, day) {
        let date = year + '-' + this.$Tool.padleft(month, '0', 2) + '-' + this.$Tool.padleft(day, '0', 2);

        if (this.calendarlist.map((item) => {
            return item.date
          }).indexOf(date) != '-1') {
          var obj = this.calendarlist.find((item) => {
            if (item.date == date) {
              return true;
            }
          });
          if (!!obj.transferwork) {
            return '<div title="非调拨工时' + obj.hoursForDay + '小时"><div><span>' + day + '</span></div><div><span style="color:#0078D7;font-size:12px;">' + obj.hoursForDay + '</span></div></div>'
          } else {
            return '<div title="调拨工时' + obj.hoursForDay + '小时"><div><span>' + day + '</span></div><div><span style="color:#ccc;font-size:12px;">' + obj.hoursForDay + '</span></div></div>'

          }
        } else {
          return day;
        }
      },
      refresh() {
        var self = this;
        var arr = self.$refs.calendar.getRange();
        arr.start = self.$Tool.iDate(arr.start.year + "-" + arr.start.month + "-" + arr.start.day, 'yy-mm-dd').string;
        arr.end = self.$Tool.iDate(arr.end.year + "-" + arr.end.month + "-" + arr.end.day, 'yy-mm-dd').string;
        store.actions.getAllotMonthInfo({
          userID: self.userid,
          startDateStr: arr.start,
          endDateStr: arr.end
        }, function(data) {
          data.forEach((item) => {
            item.date = self.$Tool.iDate(item.date, 'yyyy-mm-dd').string;
          });
          self.calendarlist = data;
        }, function(error) {
          self.$root.showTip({
            type: 'danger',
            msg: error,
            duration: 2000
          });
        })
      }
    },

    ready() {
      var self = this;
      if (this.userid != "") {
        self.refresh();
        self.getTitle();
      }
    },
    props: {
      userid: {
        type: String,
        default: ''
      },
      date: {
        type: String,
        default: ''
      }
    }
};
</script>
<style lang="css" scoped>
.warp {
  top: 0px;
  bottom: 0px;
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden;
}

.top {
  padding: 10px;
}

.calendar {
  width: 100%;
  height: 350px;
}

.content {
  position: absolute;
  bottom: 65px;
  left: 0px;
  right: 0px;
  top: 0px;
}

.exceptionContainer {
  height: 100%;
  overflow-x: hidden;
}

.tip {
  color: black;
  margin-top: 20px;
  padding-left: 30px;
}

.banci-label {
  vertical-align: top;
}

.banci {
  display: inline-block;
}
</style>
