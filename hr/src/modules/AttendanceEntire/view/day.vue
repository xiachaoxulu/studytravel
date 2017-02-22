<!--
* @Created Date       : 2016-10-17T13:34:36+08:00
* @Last Modified time : 2016-12-02T15:36:35+08:00
 -->


<template>
  <section class="ui-module-content pos-content" @click="wrapclick">

    <div class="daycontent" :class="{'isFullscreen':isFullscreen}">
      <div class="text-center daycontent-top">
        <div class="pull-left" style="margin-right: 20px;">
          <div class="btn-group btn-dropgroup" style="margin-right: 20px;">
            <button type="button" class="btn btn-default" @click="changeDate(-1)"><i class="icon-tool-keyboardarrowleft icon-tool" style='font-size:14px;'></i></button>
            <div class="calendarwrap">
              <button type="button" class="btn btn-default" data-toggle="dropdown" @click.stop="showcalendar">{{deteSelectedString.date}}</button>
              <ui-calendar v-ref:calendar v-show="showcalendarflag" class="calendar" :itemclickcallback="calendaritemclickcallback" :controllastcallback="controllastcallback" :controlnextcallback="controlnextcallback" :formatter="calendarformatter"></ui-calendar>
            </div>
            <button type="button" class="btn btn-default" @click="changeDate(1)"><i class="icon-tool-keyboardarrowright icon-tool" style='font-size:14px;'></i></button>
          </div>
          <button v-else type="button" class="btn btn-default" @click="toggleFullscreen" title="全屏模式"><i class="icon-tool-fullscreen icon-tool" style='font-size:16px;'></i></button>
          <button v-else type="button" class="btn btn-default" @click="changeDate(0)">回到今天</button>
        </div>
        <div class="pull-right lasttime">
          <span>上次更新时间:&nbsp;{{lasttime}}</span>
        </div>
      </div>
      <div class="reportquick">
        <div class="item" @click="chuqinClick" __code="attendanceEntire-day-attendance/出勤按钮">
          <div class="num">{{chuqin}}</div>
          <div class="note">打卡 (人)</div>
        </div>
        <div class="item" :class={'danger':yichang!==0} @click="exceptionClick" __code="attendanceEntire-day-exception/考勤异常按钮">
          <div class="num">{{yichang}}</div>
          <div class="note">考勤异常 (人)</div>
        </div>
        <div class="item" :class={'danger':diaobo!==0} @click="allotClick" __code="attendanceEntire-day-allot/调拨按钮">
          <div class="num">{{diaobo}}</div>
          <div class="note">调拨未确认 (人)</div>
        </div>
        <div class="item" :class={'danger':chuchai!==0} @click="chuchaiClick" __code="attendanceEntire-day-chuchai/出差按钮">
          <div class="num">{{chuchai}}</div>
          <div class="note">出差/外出 (人)</div>
        </div>
        <div class="item" :class={'danger':xiujia!==0} @click="xiujiaClick" __code="attendanceEntire-day-xiujia/休假按钮">
          <div class="num">{{xiujia}}</div>
          <div class="note">休假 (人)</div>
        </div>
        <div class="item" :class={'danger':jiaban!==0} @click="jiabanClick" __code="attendanceEntire-day-jiaban/加班按钮">
          <div class="num">{{jiaban}}</div>
          <div class="note">加班 (人)</div>
        </div>
      </div>
      <ui-grid v-ref:grid :total.sync="total" :url="attendenceUrl" checked="multi" class="testtable day-grid" :fields="fields" :perpage="50" :pages="[50,100,200]" :btrefresh="true" height="auto" :append-params="queryParam" tdheight="60px" thheight="60px" :selected.sync="selected" :before-render="beforeRender" :auto-load="false" :load-fail="loadFail" table-title="日考勤" table-name="dayCheckWorkTable" :column-config="$root.columnConfig">
      </ui-grid>
      <div class="daycontent-bottom">
        <div>
          <ui-button color="success" class="large" __code="attendanceEntire-day-submit/提交本日考勤" @click="submitDay">提交本日考勤</ui-button>
        </div>
      </div>
      <div class="submitstatu ui-table-status _submited" v-show="quanbutijiao"></div>
    </div>

    <div class="dayreport">
      <ui-scrollview>
        <div class="form-group  row rule">
          <span class="col-sm-6 label"><strong>日工时概览</strong></span>
          <div class="col-sm-18">
            <select v-model="rule" class="form-control">
              <option value="">请选择考勤规则</option>
              <template v-for="item in rules">
                <option value="{{item.ID}}" :selected="item.ID==rule">{{item.checkworkName}}</option>
              </template>
            </select>
          </div>
        </div>
        <div class="splashReport"></div>
        <div class="pieReport"></div>
      </ui-scrollview>
    </div>
    <ui-sidebar :show.sync="showSidebar " :title="showSidebartitle " layout="header-content">
      <div slot="content">
        <components :is="what" v-if="showSidebar" :query="queryParam" :componentcallback="componentcallback">
      </div>
    </ui-sidebar>
    <ui-sidecontent :show.sync="bigdymicshow" background="#fff">
      <components :is="bigwhat" v-if="bigdymicshow" :query="queryParam">
      </components>
    </ui-sidecontent>
  </section>
</template>
<script>
import store from '../store'
import Vue from 'vue'
import exception from './exception'
import evection from './evection'
import allot from './allot'
import attendance from './attendance'
import overtime from './overtime'
import vacation from './vacation'
import echarts from 'echarts'

export default {
  data() {
      return {
          isFullscreen:false,
        showcalendarflag: false,

        rules: [],
        rule: '', //所选考勤规则,默认第一个
        path: 'acewill/checkwork/exportDayCheckwork.htm', //导出日考勤


        lasttime: '',
        attendenceUrl: 'api.AttendanceEntire.getDailyworktime', //日考勤url
        state: store.state,
        selected: [], //表格选中项
        total: 0,


        calendarlist: [], //日历信息
        statu: '详情',
        show: 'titletip',


        chuqin: 0, //出勤列表
        yichang: 0, //异常列表
        diaobo: 0, //调拨列表
        chuchai: 0, //出差列表
        xiujia: 0, //休假列表
        jiaban: 0, //加班列表
        chaoshi: 0, //超时列表

        what: '',
        showSidebartitle: '考勤异常(12)人',
        showSidebarlist: [],
        showSidebar: false,

        bigwhat: '', //全屏弹出窗
        bigdymicshow: false,

        quanbutijiao: false,


        dateSelected: '',
        deteSelectedString: {
          date: ''
        },

        fields: [{
          name: 'name',
          title: '姓名',
          width: '100px',
          locked: 'first',
          formater: function(value, data, index) {
            if (data.jiediao) {
              return value + '&nbsp;&nbsp;(借调)';
            } else {
              return value;
            }
          }
        }, {
          name: 'userNum',
          title: '员工工号',
          width: '150px',
        }, {
          name: 'userType',
          title: '用工类型',
          width: '150px'
        },
        {
          name: 'bc',
          title: '班次',
          width: '150px',
          formater: function(value, data, index) {
              if (value) {
                  var sData = (((value.replace(/\//g, '-')).replace('[', ' ')).replace(']', ' ')).replace(/"/g, ' ');
                  var sDataArr = sData.split(',');
                  var div = document.createElement('div');
                  for (var i = 0; i < sDataArr.length; i++) {
                      let p = document.createElement('p');
                      p.innerText = sDataArr[i];
                      p.style.fontSize = '12px';
                      p.style.margin = '0';
                      p.style.textAlign = 'center';
                      div.appendChild(p)
                  }
                  return div.innerHTML;
              }

          }
        },
        {
          name: 'dkbc',
          title: '打卡时间',
          width: '150px',
          formater: function(value, data, index) {
              if (value) {
                  var sData = (((value.replace(/\//g, '-')).replace('[', ' ')).replace(']', ' ')).replace(/"/g, ' ');
                  var sDataArr = sData.split(',');
                  var div = document.createElement('div');
                  for (var i = 0; i < sDataArr.length; i++) {
                      let p = document.createElement('p');
                      p.innerText = sDataArr[i];
                      p.style.fontSize = '12px';
                      p.style.margin = '0';
                      p.style.textAlign = 'center';
                      div.appendChild(p)
                  }
                  return div.innerHTML;
              }

          }
        },
        {
          name: 'dkAddress',
          title: '打卡地点',
          width: '150px'
        },
        {
          name: 'ztTimes',
          title: '早退次数',
          width: '150px'
        },
        {
          name: 'ztTime',
          title: '早退分钟',
          width: '150px'
        },
        {
          name: 'ltTimes',
          title: '迟到次数',
          width: '150px'
        },
        {
          name: 'ltTime',
          title: '迟到分钟',
          width: '150px'
        },
        {
          name: 'kgTime',
          title: '旷工时间',
          width: '150px'
        },
        {
          name: 'toWorkType',
          title: '加班类型',
          width: '150px'
        },
        {
          name: 'overTime',
          title: '加班工时',
          width: '150px'
        },
        {
          name: 'hoursForDay',
          title: '日总工时',
          width: '150px',
          required: true,
          formater: function(value, data, index) {
            if (data.chaoshi  && data.chaoshi > 0) {
              return '<span style="color:red">' + value + '</span>'
            } else {
              return value;
            }
          }
        }, {
          name: 'hoursForMonth',
          title: '月总工时',
          width: '100px'
        }]
      };
    },
    computed: {
      queryParam: {
        get: function() {
          let p = {};
          Object.assign(p, this.state.searchParam, {
            date: this.deteSelectedString.date
          });
          //因为 要求在 在公用的筛选控件上加考勤规则的选择，不得已在不需要考勤规则的参数的callback中删除它
          p.checkworkRuleId && delete p.checkworkRuleId;
          return p;
        }
      }
    },
    watch: {

      'deteSelectedString.date':function(a,b){
        if(a!=""){
          store.actions.setDayTime(a);
        }
      },
      'state.cardRefresh': function(a, b) {
        var self = this;
        if (a) {
          self.$root.toggleMask(true);
          store.actions.getPushCard({
            date: self.queryParam.date
          }, function(data) {
            self.$refs.grid.refresh();
            self.refreshReport();
            self.refreshCalendar();

            self.$root.toggleMask(false);
            store.actions.SetRefresh(false);
          }, function(error) {
            self.$root.showTip({
              type: 'danger',
              msg: error,
              duration: 2000
            });

            self.$root.toggleMask(false);
          })
        }
      },
      'state.searchParam': function(a, b) {

        this.$refs.grid.refresh();
        this.refreshReport();
        this.refreshCalendar();
      },
      'state.downloadExcel': function(a, b) {
        if (a) {
          store.actions.Setdownload(false);
          if (this.total == 0) {
            this.$root.showTip({
              type: 'danger',
              msg: "数据为空不能导出",
              duration: 2000
            });
            return;
          }
          var param = Object.keys(this.queryParam).map((item) => {
            return item + "=" + this.queryParam[item];
          }).join('&');
          this.$root.downloadFile(this.path, param);
        }
      },
      rule(a, b) {
        if (a != "") {
          this.loadShape();
        }
      }
    },
    methods: {
        toggleFullscreen(){
            this.isFullscreen = !this.isFullscreen;
            this.$nextTick(()=>{
                this.$refs.grid.refreshTable();
            })
        },
      loadFail(msg){
        this.$root.toggleMask(false);
      },
      beforeRender(data){
        this.refreshReport();
        return data;
      },
      loadShape() {
        var self = this;
        var piePromise = new Promise((resolve, reject) => {
          store.actions.getDayEchartPie({
            ruleId: self.rule,
            sDate: self.deteSelectedString.date
          }, function(data) {
            resolve(data);
          }, function(error) {
            reject(error);
          })
        });
        Promise.all([piePromise]).then((val) => {

          var piecolors = ['#399cef', '#38e1e6', '#71f0bc', '#3663c3'];
          var flag=false;
          val[0] = val[0].map((item, index) => {

            if(item.value-0!==0){
              flag=true;
            }
            if (index < piecolors.length) {
              item.itemStyle = {
                normal: {
                  color: piecolors[index]
                }
              }
            }
            return item;
          });
          if(!flag){
            return;
          }
          // 基于准备好的dom，初始化echarts实例
          var myChart = echarts.init(this.$el.querySelector('.pieReport'));
          // 绘制图表
          myChart.setOption({
            backgroundColor: "#fff",
            calculable: true,
            legend: {
              orient: 'vertical',
              x: 'right',
              y: 'center',
              data: val[0].map((item) => {
                return item.name
              })
            },
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            series: [{
              name: '日工时饼状图',
              type: 'pie',
              radius: [30, 80],
              center: ['40%', 180],
              roseType: 'radius',
              startAngle: 90,
              label: {
                normal: {
                  show: false,
                }
              },
              data: val[0]
            }],
          });
        }).catch((e) => {
          console.log(e);
          self.$root.showTip({
            type: 'danger',
            msg: "加载日考勤饼图失败",
            duration: 2000
          });
        });

        var splashPromise = new Promise((resolve, reject) => {
          store.actions.getDayEchartSplash({
            ruleId: self.rule,
            sDate: self.deteSelectedString.date

          }, function(data) {
            resolve(data);
          }, function(error) {
            reject(error);
          })
        });
        Promise.all([splashPromise]).then((val) => {
          if (!Array.isArray(val[0].data)) {
            self.$root.showTip({
              type: 'danger',
              msg: "日考勤散点图无数据",
              duration: 2000
            });
            return;
          }

          var xdata = ['半个月', '1个月', '1个月半', '2个月', '2个月半', '3个月', '3个月半', '4个月', '4个月半', '5个月', '5个月半', '6个月', '7个月', '8个月', '9个月', '10个月', '11个月', '1年', '2年', '3年', '4年', '5年', '5年以上'];
          var displayxdata = ['半个月', '3个月', '6个月', '1年'];

          var map = new Map();
          val[0].data.forEach((item) => {
            if (map.has(item.userType)) {
              map.get(item.userType).push(item);
            } else {
              map.set(item.userType, []);
              map.get(item.userType).push(item);
            }
          });
          var y = [];
          var datas = [];
          for (let o of map) {
            var data = [];
            o[1].forEach((item) => {
              var i = [];
              i.push(item.userMonth);
              i.push(item.hoursForDay - 0);
              i.push(item.userName);
              y.push(item.hoursForDay - 0);
              data.push(i);
            })
            datas.push(data);
          }
          var ymax = y.sort((a, b) => {
            return a - b
          }).pop();
          ymax = ymax > val[0].dayWarningTime ? ymax : val[0].dayWarningTime;

          var colors = ['#fff', '#27C7b4', '#f0df2a', '#fc7370'];
          var series = [];

          for (var o in datas) {
            var obj = {
              name: Array.from(map.keys())[o],
              type: 'scatter',
              symbolSize: "6",
              data: datas[o]
            };
            if (o < colors.length) {
              obj.itemStyle = {
                normal: {
                  color: colors[o]
                }
              }
            }
            series.push(obj);
          }


          series.push({
            type: 'line',
            lineStyle: {
              normal: {
                color: '#fff',
                width: 1
              }
            },
            label: {
              normal: {
                show: true,
                position: 'insideTopLeft',
                textStyle: {
                  color: '#fff',
                },
                formatter: function(a, b) {

                  if (a.value[0] == '5年以上') {
                    return '';
                  } else {

                    return "平均线(" + val[0].average + "小时)"
                  }
                }
              }
            },
            data: [
              ['半月', val[0].average],
              ['5年以上', val[0].average]
            ],
          })
          series.push({
            type: 'line',
            lineStyle: {
              normal: {
                color: '#c26299',
                width: 1
              }
            },
            label: {
              normal: {
                show: true,
                position: 'insideTopLeft',
                textStyle: {
                  color: '#fff',
                },
                formatter: function(a, b) {
                  if (a.value[0] == '5年以上') {
                    return '';
                  } else {

                    return '警戒线(' + val[0].dayWarningTime + '小时)'
                  }
                }
              }
            },
            data: [
              ['半月', val[0].dayWarningTime],
              ['5年以上', val[0].dayWarningTime]
            ],
          })
          var myChart2 = echarts.init(this.$el.querySelector('.splashReport'));
          myChart2.setOption({
            backgroundColor: "#5F6BEC",
            title: {
              text: '日总工时',
              textStyle: {
                color: '#fff',
                fontStyle: 14,
                fontWeight: 200,
                fontSize: 14
              },
              left: '10px',
              top: '10px'
            },
            tooltip: {
              padding: 10,
              backgroundColor: '#222',
              borderColor: '#777',
              borderWidth: 1,
              formatter: function(obj) {
                var value = obj.value;
                if (!value || value.length !== 3) {
                  return '';
                }

                var items = [];
                val[0].data.filter((item) => {
                  if (item.userMonth == value[0] && item.hoursForDay == value[1]) {
                    return item;
                  }
                }).forEach((item) => {

                  var itemhtml = '<p> ' + item.userName + ': ' + item.hoursForDay + ' 小时</p>';
                  items.push(itemhtml);
                })

                items = items.join('');

                var html = `<div>${items}</div>`;

                return html;
              }
            },
            legend: {
              data: Array.from(map.keys()),
              bottom: '1%',
              right: '0',
              textStyle: {
                color: '#fff',
                fontSize: 13,
                fontWeight: 50
              },
              itemHeight: 6,
              itemWidth: 6
            },
            grid: {
              width: "100%",
              height: "60%",
              top: "20%",
              bottom: '20%',
              left: 0,
              rigth: 0,
              // containLabel: true
            },
            xAxis: {
              name: '工作年限',
              nameLocation: 'start',
              nameGap: 6,
              nameTextStyle: {
                color: "#fff",
                fontSize: "12",
                fontWeight: "10"
              },
              splitLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: "#fff",
                  width: 0.5
                }
              },
              type: 'category',

              axisLabel: {
                textStyle: {
                  color: "#fff",
                  fontSize: 12,
                  fontWeight: 50
                },
                formatter: function(a, b) {
                  if (a == '半个月') {
                    return '工作年限'
                  }
                  var flag = displayxdata.find((item) => {
                    if (item == a) {
                      return true
                    }
                  });
                  if (!!flag) {
                    return a;
                  }
                },
                interval: 0,
              },
              data: xdata
            },
            yAxis: [{
              max: ymax,
              axisLine: {
                show: false
              },
              axisLabel: {
                show: false
              },
              axisTick: {
                show: false
              },
              splitLine: {
                show: false
              },

            }],
            series: series
          })
        }).catch((e) => {
          self.$root.showTip({
            type: 'danger',
            msg: "加载日考勤散点图失败",
            duration: 2000
          });
        });

      },
      //弹出回调
      componentcallback(type) {
        if (type == 'exception') {
          this.$refs.grid.refresh();
          this.refreshReport();
          this.refreshCalendar();
          if (this.yichang + '' == '0') {
            this.showSidebar = false;
          }
          this.showSidebartitle = "考勤异常(" + this.yichang + "人)";
        }
        if (type == "allot") {
          this.$refs.grid.refresh();
          this.refreshReport();
          this.refreshCalendar();
          if (this.diaobo + '' == '0') {
            this.showSidebar = false;
          }
          this.showSidebartitle = "调拨(" + this.diaobo + "人)";
        }
      },
      //提交日考勤
      submitDay() {
        var self = this;
        if (!!self.quanbutijiao) {
          self.$root.showTip({
            type: 'info',
            msg: "当前已是提交状态,无需重复提交",
            duration: 2000
          });
          return;
        }

        if (self.yichang - 0 != 0) {
          self.$root.showTip({
            type: 'danger',
            msg: "有未处理异常,不能提交",
            duration: 2000
          });
          return;
        }

        self.$root.toggleMask(true);
        this.queryParam.daystr = this.queryParam.date.replace(/-/g, '');
        store.actions.submitDay(this.queryParam, function(data) {
          self.$root.showTip({
            type: 'success',
            msg: "日考勤提交成功",
            duration: 2000
          });
          self.refreshReport();
          self.loadShape();
          self.$refs.grid.refresh();
          self.refreshCalendar();

          self.$root.toggleMask(false);

        }, function(error) {
          self.$root.showTip({
            type: 'danger',
            msg: error,
            duration: 2000
          });
          self.$root.toggleMask(false);
        });
      },
      //调拨点击
      allotClick() {
        this.showSidebartitle = "调拨(" + this.diaobo + "人)";
        this.showSidebar = true;
        this.what = 'allot';
      },
      //点击出勤人数
      chuqinClick() {
        this.bigwhat = 'attendance';
        this.bigdymicshow = true;
      },
      //点击出差人数
      chuchaiClick() {
        this.bigwhat = 'evection';
        this.bigdymicshow = true;
      },
      //点击休假人数
      xiujiaClick() {
        this.bigwhat = 'vacation';
        this.bigdymicshow = true;
      },
      //点击加班人数
      jiabanClick() {
        this.bigwhat = 'overtime';
        this.bigdymicshow = true;
      },
      getLastTime() {
        var self = this;
        store.actions.getLasttime(function(data) {
          self.lasttime = data;
        }, function(error) {
          self.$root.showTip({
            type: 'danger',
            msg: error,
            duration: 2000
          });
        })
      },
      //页面点击，隐藏日历页面
      wrapclick() {
        if (this.showcalendarflag) {
          this.showcalendarflag = false;
        }
      },
      //日历点击下月回调
      controlnextcallback() {
        this.refreshCalendar();
      },
      //日历点击上月回调
      controllastcallback() {
        this.refreshCalendar();
      },
      //日历模板
      calendarformatter(year, month, day) {
        let date = year + '-' + this.$Tool.padleft(month, '0', 2) + '-' + this.$Tool.padleft(day, '0', 2);

        if (this.calendarlist.indexOf(date) != '-1') {
          return '<div><span>' + day + '</span>&nbsp;<span style="color:red;">!</span></div>'
        } else {
          return day;
        }
      },
      showcalendar() {
        this.showcalendarflag = !this.showcalendarflag;
      },
      //日历item点击事件
      calendaritemclickcallback(year, month, day) {
        var t = this.$Tool.iDate(year + "-" + month + "-" + day, 'yy-mm-dd');
        this.dateSelected = this.$Tool.iDate(t.time, 'yy-mm-dd');
        this.deteSelectedString.date = t.string;
        this.showcalendarflag = !this.showcalendarflag;

        setTimeout(() => {
          this.loadShape();
          this.$refs.grid.refresh()
          this.refreshReport();
        }, 200);
      },
      //加载日历信息
      refreshCalendar() {
        var self = this;
        var arr = self.$refs.calendar.getRange();
        arr.start = this.$Tool.iDate(arr.start.year + "-" + arr.start.month + "-" + arr.start.day, 'yymmdd').string;
        arr.end = this.$Tool.iDate(arr.end.year + "-" + arr.end.month + "-" + arr.end.day, 'yymmdd').string;
        var obj = Object.assign({}, this.queryParam);
        Object.assign(obj, arr);

        store.actions.getCalendar(obj, function(data) {
          self.calendarlist = data.map((item) => {
            return self.$Tool.iDate(item.day, 'yy-mm-dd').string;
          });
          self.$refs.calendar.reRender();
        }, function(error) {
          self.$root.showTip({
            type: 'danger',
            msg: error,
            duration: 2000
          });
        });
      },
      //加载报表信息
      refreshReport() {
        var self = this;
        store.actions.getDayReport(this.queryParam, function(data) {
          self.chaoshi = data.chaoshi;
          self.chuchai = data.chuchai;
          self.chuqin = data.chuqin;
          self.diaobo = data.diaobo;
          self.jiaban = data.jiaban;
          self.xiujia = data.xiujia;
          self.yichang = data.yichang;
          self.quanbutijiao = data.quanbutijiao;

          self.changeFormattertitle();

           self.$root.toggleMask(false);
        }, function(error) {

          self.$root.toggleMask(false);
          self.$root.showTip({
            type: 'danger',
            msg: error,
            duration: 2000
          });
        });
      },
      //异常
      exceptionClick() {
        this.showSidebartitle = "考勤异常(" + this.yichang + "人)";
        this.showSidebar = true;
        this.what = 'exception';
      },
      //点击详细
      detail() {
        if (this.statu == "概览") {

          $('.daycontent').animate({
            right: '410px'
          }, () => {
            this.statu = "详情";
            this.fields.splice(14, 3);
            this.changeFormattertitle();
          });
        } else {

          $('.daycontent').animate({
            right: '0px'
          }, () => {
            this.statu = "概览";
            this.fields.splice(14, 0, {
              name: 'dakaGs',
              title: '打卡工时',
              parent: 'hoursForDay',
              width: '100px'
            }, {
              name: 'buluGs',
              title: '补录工时',
              parent: 'hoursForDay',
              width: '100px'
            }, {
              name: 'diaoboTime',
              title: '调拨工时',
              parent: 'hoursForDay',
              width: '100px'
            });
            this.changeFormattertitle();
          });
        }

      },
      changeDate(diff) {
        // 日
        if (diff == 0) {
          this.dateSelected = this.dateNow;
        } else if (diff < 0) {
          this.dateSelected = this.$Tool.iDate(this.dateSelected.time, 'yy-mm-dd', -1);
        } else if (diff > 0) {
          this.dateSelected = this.$Tool.iDate(this.dateSelected.time, 'yy-mm-dd', 1);
        }
        this.deteSelectedString.date = this.dateSelected.string;
        var self = this;
        setTimeout(() => {
          self.loadShape();
          self.$refs.grid.refresh();
          this.refreshReport();
        }, 200);
      },
      changeFormattertitle() {
        var personcount = this.chaoshi;
        if (this.chaoshi == "0") {
          this.show = 'notshow';
        } else {
          this.show = 'titletip';
        }
        var show = this.show;
        var statu = this.statu;

        var title = `<style>.tip {margin: 0px; color: red; } .title {position: relative;height: 24px;line-height: 24px;}.titletip {position: absolute;bottom: 24px;left: 0px;width: 100px;height: 24px;line-height: 24px;text-align: center;color: white;box-sizing: content-box;background: red;border: 1px red solid;border-radius: 15px;}.tipmsg {display: inline-block; width: 100%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; } .arrow {position: absolute; top: 24px; left: 45px; border-left: 5px solid transparent; border-right: 5px solid transparent; border-top: 10px solid red; } .notshow {display:none} .titlecontent {vertical-align: middle; } .title>a {text-decoration: none; color: #aaa; } .circle {display: inline-block; width: 16px; height: 16px; background: transparent; border: 2px solid white; border-radius: 8px; margin-right: 5px; vertical-align: middle; } .note {vertical-align: middle; }</style><div class="title"><div class="${show}"><div class="arrow"></div><span class="tipmsg ">超时${personcount}人</span></div> <span class="titlecontent">日总工时&nbsp;&nbsp;</span><a href="javascript:void(0)" onclick="attendanceday.detail()"><span class="circle"></span><span class="note">${statu}</span></a></div>`;

        this.fields.find((item) => {
          if (item.name == "hoursForDay") {
            return true;
          }
        }).title = title;

      }
    },
    created() {
      this.dateNow = this.$Tool.iDate(new Date(), 'yy-mm-dd');
      this.dateSelected = this.dateNow;
      this.deteSelectedString.date = this.dateSelected.string;

    },

    attached() {
      window.attendanceday = this;

      this.$root.toggleMask(true);
      this.$refs.grid.refresh();
      // this.refreshReport(); //统计报表信息
      this.refreshCalendar(); //加载日历内信息
      this.getLastTime();

      var self = this;

      //加载考勤规则
      store.actions.getAllRules(function(data) {
        self.rules = data;
        if (self.rules.length > 0) {
          self.rule = self.rules[0].ID;
        }
      }, function(error) {
        self.$root.showTip({
          type: 'danger',
          msg: error,
          duration: 2000
        });
      });
    },
    ready() {
      console.log(this.$router)
    },
    components: {
      exception,
      evection,
      allot,
      attendance,
      overtime,
      vacation
    }
};
</script>
<style lang="css" scoped>
.calendarwrap {
  display: inline-block;
  width: 160px;
  float: left;
  position: relative;
}

.calendarwrap button {
  width: 100%;
  border-radius: 0px;
}

.calendarwrap .calendar {
  width: 400px;
  height: 350px;
  position: absolute;
  top: 35px;
  left: -53px;
  z-index: 4;
}

.daycontent {
  position: absolute;
  right: 410px;
  left: 0px;
  top: 0px;
  bottom: 0px;
  background: #fff;
  z-index: 2;
}

.submitstatu {
  position: absolute;
  width: 206px;
  height: 86px;
  right: -50px;
  top: 7px;
  transform: rotateZ(15deg);
}

.daycontent-top {
  position: absolute;
  height: 60px;
  left: 20px;
  right: 20px;
  top: 0px;
  padding: 10px 0px;
}

.testtable {
  position: absolute;
  top: 160px;
  left: 20px;
  right: 20px;
  bottom: 80px;
  z-index: 3;
}


.daycontent-bottom {
  position: absolute;
  height: 80px;
  left: 20px;
  right: 20px;
  bottom: 0px;
  display: -webkit-flex;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.lasttime {
  font-size: 14px;
  color: #aaa;
  padding-top: 5px;
}

.reportquick {
  position: absolute;
  left: 20px;
  top: 60px;
  height: 100px;
  right: 20px;
  background: #525D6B;
  border-radius: 5px 5px 0 0;
  overflow: hidden;
}

.reportquick > .item {
  width: 16.65%;
  float: left;
  display: -webkit-flex;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: white;
  background-origin: padding-box;
  cursor: pointer;
}

.reportquick > .item:hover {
  background: #3e475b;
}

.reportquick > .danger {
  color: rgb(253, 109, 90);
}

.item .num {
  font-size: 32px;
}

.dayreport {
  position: absolute;
  width: 400px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  background: #fff;
  z-index: 1;
}

.scorllView {
  overflow-x: hidden;
}

.rule {
  padding: 15px;
}

.label {
  margin-top: 10px;
  float: left;
  color: black;
  font-style: bold;
  font-size: 16px;
}

.splashReport,
.pieReport {
  box-sizing: border-box;
  /*padding: 0px 15px;*/
  width: 400px;
  height: 350px;
}
</style>
<style>
.day-grid .ui-table{
    border-radius: 0 0 6px 6px!important;
}
</style>
