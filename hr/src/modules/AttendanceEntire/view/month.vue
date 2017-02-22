<!--
* @Created Date       : 2016-12-02T11:08:37+08:00
* @Last Modified time : 2016-12-02T15:48:58+08:00
 -->


<template>
  <section class="ui-module-content pos-content" @click="wrapclick">
    <div class="daycontent" :class="{'isFullscreen':isFullscreen}">
      <div class="text-center daycontent-top">
        <div class="pull-left" style="margin-right: 20px;">
          <div class="btn-group btn-dropgroup" style="margin-right: 20px;">
            <button type="button" class="btn btn-default" @click="changeMonth(-1)"><i class="icon-tool-keyboardarrowleft icon-tool" style='font-size:14px;'></i></button>
            <div class="calendarwrap">
              <button type="button" class="btn btn-default" data-toggle="dropdown" @click.stop="showcalendar">{{dateSelected.y+'年'+dateSelected.m+'月'}}</button>
              <ui-month v-ref:month v-show="showcalendarflag" class="monthcalendar" :itemclickcallback="calendaritemclickcallback"></ui-month>
            </div>
            <button type="button" class="btn btn-default" @click="changeMonth(1)"><i class="icon-tool-keyboardarrowright icon-tool" style='font-size:14px;'></i></button>
          </div>
          <button v-else type="button" class="btn btn-default" @click="toggleFullscreen" title="全屏模式"><i class="icon-tool-fullscreen icon-tool" style='font-size:16px;'></i></button>
          <button v-else type="button" class="btn btn-default" @click="changeMonth(0)">回到本月</button>
        </div>
        <div class="pull-right lasttime">
          <span>上次更新时间:&nbsp;{{lasttime}}</span>
        </div>
      </div>
      <div class="reportquick">
        <div class="item">
          <div class="num">{{chuqin}}</div>
          <div class="note">出勤 (人)</div>
        </div>
        <div class="item">
          <div class="num">{{chidaozaotui}}</div>
          <div class="note">迟到早退 (人)</div>
        </div>
        <div class="item">
          <div class="num">{{chuchai}}</div>
          <div class="note">出差/外出 (人)</div>
        </div>
        <div class="item">
          <div class="num">{{jiaban}}</div>
          <div class="note">加班 (人)</div>
        </div>
         <div class="item">
          <div class="num">{{qj}}</div>
          <div class="note">请假 (人)</div>
        </div>
      </div>
      <ui-grid v-ref:grid :total.sync="total" :url="attendenceMonthUrl" checked="multi" class="testtable month-grid" :fields="fields" :perpage="50" :pages="[50,100,200]" :btrefresh="true" height="auto" :append-params="queryParam" tdheight="60px" thheight="60px" :selected.sync="selected" table-title="月考勤" table-name="monthCheckWorkTable" :column-config="$root.columnConfig">
      </ui-grid>
      <div class="daycontent-bottom">
        <div>
          <ui-button color="success" class="large" @click="submitMonth" __code="attendanceEntire-month-submit/提交本月考勤">提交本月考勤</ui-button>
        </div>
      </div>
      <div class="submitstatu ui-table-status _submited" v-show="quanbutijiao"></div>
    </div>
    <div class="dayreport">
      <ui-scrollview>
        <div class="form-group  row rule">
          <span class="col-sm-6 label"><strong>月工时概览</strong></span>
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
    <ui-sidecontent :show.sync="bigdymicshow" background="#fff">
      <components :is="bigwhat" v-if="bigdymicshow" :query="queryParam">
      </components>
    </ui-sidecontent>
  </section>
</template>
<script>
import store from '../store'
import Vue from 'vue'
import echarts from 'echarts'


export default {
  data() {
      return {
          isFullscreen:false,
        showcalendarflag: false,
        //api.AttendanceEntire.getMonthworktime
        lasttime: '',
        attendenceMonthUrl: '', //月考勤url
        state: store.state,
        selected: [], //表格选中项
        total: 0,

        rules: [],
        rule: '', //所选考勤规则,默认第一个

        path: 'acewill/checkwork/exportMonthCheckwork.htm', //导出月考勤

        statu: '详情',
        zaotuistatu: '详情',
        vacationstatu: '详情',


        chuqin: '', //出勤列表
        chidaozaotui: '', //迟到早退列表
        chuchai: '', //休假列表
        jiaban: '', //加班列表
        qj:'',//请假

        quanbutijiao: false,

        bigwhat: '', //全屏弹出窗
        bigdymicshow: false,

        dateSelected: '',


        fields: [{
          name: 'userName',
          title: '姓名',
          width: '100px',
          locked: 'first'
        }, {
          name: 'userNum',
          title: '员工工号',
          width: '150px',
        }, {
          name: 'userTypeName',
          title: '用工类型',
          width: '100px'
        }, {
          name: 'total_work_hours',
          title: '月总工时',
          width: '150px'
        }, {
          name: 'delay',
          title: '迟到早退',
          width: '150px',
          // formater: function(value, data, index) {
          //   var count = 0;
          //   var count1 = 0;
          //   count += data.late ? data.late : 0;
          //   count += data.leave_early ? data.leave_early : 0;
          //   count += data.stay_away_times ? data.stay_away_times : 0;
          //   count += data.overtime_work_times ? data.overtime_work_times : 0;


          //   count1 += data.late_time ? data.late_time : 0;
          //   count1 += data.leave_early_time ? data.leave_early_time : 0;
          //   count1 += data.overtime_work_hours ? data.overtime_work_hours : 0;
          //   count1 += data.stay_away_hours ? data.stay_away_hours : 0;
          //   return count + '/' + count1;
          // }
        }, {
          name: 'vacation',
          title: '休假',
          width: '150px'
        }, {
          name: 'exp_days',
          title: '应出勤天数',
          width: '150px'
        }, {
          name: 'act_days',
          title: '实际出勤天数',
          width: '150px'
        }, ]
      };
    },
    computed: {
      queryParam: {
        get: function() {
          let p = {};
          var self = this;
          Object.assign(p, this.state.searchParam, {
            month: self.dateSelected.y + '-' + self.$Tool.padleft(self.dateSelected.m, '0', 2)
          })
          return p;
        }
      }
    },
    watch: {
      'state.cardRefresh': function(a, b) {
        var self = this;
        if (a) {
          store.actions.SetRefresh(false);
          self.$root.showTip({
            type: 'danger',
            msg: '请在日考勤中,刷新打卡数据',
            duration: 2000
          });
        }
      },
      'state.searchParam': function(a, b) {
          this.attendenceMonthUrl = "api.AttendanceEntire.getMonthworktime";
          setTimeout(() => {
            this.$refs.grid.refresh();
            this.refreshReport();
          }, 200);

      },
      'state.downloadExcel': function(a, b) {
        store.actions.Setdownload(false);
        if (a) {
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

      //页面点击，隐藏日历页面
      wrapclick() {
        if (this.showcalendarflag) {
          this.showcalendarflag = false;
        }
      },
      showcalendar() {
        this.showcalendarflag = !this.showcalendarflag;
      },
      calendaritemclickcallback(year, month) {
        var t = this.$Tool.iDate(year + "-" + month, 'yy-mm');
        this.dateSelected = this.$Tool.iDate(t.time, 'yy-mm');
        this.showcalendarflag = !this.showcalendarflag;

        // if (!!this.state.searchParam.checkworkRuleId) {
          setTimeout(() => {
            this.loadShape();
            this.$refs.grid.refresh()
            this.refreshReport();
          }, 200);
        // } else {
        //   this.$root.showTip({
        //     type: 'danger',
        //     msg: "请在筛选中选择考勤规则",
        //     duration: 2000
        //   });
        // }
      },
      //提交月考勤
      submitMonth() {
        var self = this;
        if (!!self.quanbutijiao) {
          self.$root.showTip({
            type: 'info',
            msg: "当前已是提交状态,无需重复提交",
            duration: 2000
          });
          return;
        }

        // if (!this.queryParam.checkworkRuleId) {
        //   self.$root.showTip({
        //     type: 'danger',
        //     msg: "请在筛选中选择考勤规则",
        //     duration: 2000
        //   });
        //   return;
        // }

        self.$root.toggleMask(true);
        store.actions.submitMonth(this.queryParam, function(data) {
          self.$root.showTip({
            type: 'success',
            msg: "月考勤提交成功",
            duration: 2000
          });
          self.refreshReport();
          self.$refs.grid.refresh();
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
      //加载报表信息
      refreshReport() {
        var self = this;
        // if (!!this.state.searchParam.checkworkRuleId) {
          store.actions.getMonthReport(this.queryParam, function(data) {
            self.chuqin = data.cq ? data.cq : 0;
            self.chidaozaotui = data.cdzt ? data.cdzt : 0;
            self.chuchai = data.cc ? data.cc : 0;
            self.jiaban = data.jb ? data.jb : 0;
            self.qj=data.qj ? data.qj : 0;
            if (data.upd != null && data.upd == 0) {
              self.quanbutijiao = true;
            } else {
              self.quanbutijiao = false;
            }

            self.changeMonthFormattertitle();
          }, function(error) {
            self.$root.showTip({
              type: 'danger',
              msg: error,
              duration: 2000
            });
          });
        // }
      },
      //点击详细
      monthdetail() {
        var index = 0;
        this.fields.find((item, i) => {
          if (item.name == "total_work_hours") {
            index = i;
            return true;
          }
        });

        if (this.statu == "概览") {
          if (this.zaotuistatu == "概览" || this.vacationstatu == '概览') {
            this.statu = "详情";
            this.fields.splice(index + 1, 5);
            this.changeMonthFormattertitle();
          } else {
            $('.daycontent').animate({
              right: '410px'
            }, () => {
              this.statu = "详情";
              this.fields.splice(index + 1, 5);
              this.changeMonthFormattertitle();
            });
          }
        } else {
          if (this.zaotuistatu == "概览" || this.vacationstatu == '概览') {
            this.statu = "概览";
            this.fields.splice(index + 1, 0, {
              name: 'clock_work_hours',
              parent:'total_work_hours',
              title: '打卡工时',
              width: '100px'
            }, {
              name: 'night_work_hours',
              parent:'total_work_hours',
              title: '夜班工时',
              width: '100px'
            }, {
              name: 'other_work_hours',
              parent:'total_work_hours',
              title: '补录工时',
              width: '100px'
            },{
              name:'transfer_work_hours',
              parent:'total_work_hours',
              title:'调拨工时',
              width:'100px'
            },{
              name:'overtime_work_hours',
              parent:'total_work_hours',
              title:'加班工时',
              width:'100px'
            });
            this.changeMonthFormattertitle();
          } else {
            $('.daycontent').animate({
              right: '0px'
            }, () => {
              this.statu = "概览";
              this.fields.splice(index + 1, 0, {
                name: 'clock_work_hours',
                parent:'total_work_hours',
                title: '打卡工时',
                width: '100px'
              }, {
                name: 'night_work_hours',
                parent:'total_work_hours',
                title: '夜班工时',
                width: '100px'
              }, {
                name: 'other_work_hours',
                parent:'total_work_hours',
                title: '补录工时',
                width: '100px'
              },{
              name:'transfer_work_hours',
              parent:'total_work_hours',
              title:'调拨工时',
              width:'100px'
            },{
              name:'overtime_work_hours',
              parent:'total_work_hours',
              title:'加班工时',
              width:'100px'
            });
              this.changeMonthFormattertitle();
            });
          }
        }
      },
      chidaodetail() {
        var index = 0;
        this.fields.find((item, i) => {
          if (item.name == "delay") {
            index = i;
            return true;
          }
        });


        if (this.zaotuistatu == "概览") {
          if (this.statu == "概览" || this.vacationstatu == '概览') {
            this.zaotuistatu = "详情";
            this.fields.splice(index + 1, 6);
            this.changeMonthFormattertitle();
          } else {
            $('.daycontent').animate({
              right: '410px'
            }, () => {
              this.zaotuistatu = "详情";
              this.fields.splice(index + 1, 6);
              this.changeMonthFormattertitle();
            });
          }
        } else {
          if (this.statu == "概览" || this.vacationstatu == '概览') {
            this.zaotuistatu = "概览";

            this.fields.splice(index + 1, 0, {
              name: 'stay_away_times',
              parent:'delay',
              title: '旷工次数',
              width: '100px'
            }, {
              name: 'stay_away_hours',
              parent:'delay',
              title: '旷工时间',
              width: '100px'
            }, {
              name: 'late',
              parent:'delay',
              title: '迟到次数',
              width: '100px'
            }, {
              name: 'late_time',
              parent:'delay',
              title: '迟到时间',
              width: '100px'
            }, {
              name: 'leave_early',
              parent:'delay',
              title: '早退次数',
              width: '100px'
            }, {
              name: 'leave_early_time',
              parent:'delay',
              title: '早退时间',
              width: '100px'
            },
             );
            // {
            //   name: 'overtime_work_hours',
            //   title: '加班工时/天',
            //   width: '100px',
            //   formater: function(value, data, index) {
            //     if (data.overtime_work_hours_type) {
            //       return value + '(' + data.overtime_work_hours_type + ')'
            //     } else {
            //       return value;
            //     }
            //   }
            // }, {
            //   name: 'overtime_work_times',
            //   title: '加班次数',
            //   width: '100px'
            // }
            this.changeMonthFormattertitle();
          } else {
            $('.daycontent').animate({
              right: '0px'
            }, () => {
              this.zaotuistatu = "概览";
              this.fields.splice(index + 1, 0, {
                name: 'stay_away_times',
                parent:'delay',
                title: '旷工次数',
                width: '100px'
              }, {
                name: 'stay_away_hours',
                parent:'delay',
                title: '旷工时间',
                width: '100px'
              }, {
                name: 'late',
                parent:'delay',
                title: '迟到次数',
                width: '100px'
              }, {
                name: 'late_time',
                parent:'delay',
                title: '迟到时间',
                width: '100px'
              }, {
                name: 'leave_early',
                parent:'delay',
                title: '早退次数',
                width: '100px'
              }, {
                name: 'leave_early_time',
                parent:'delay',
                title: '早退时间',
                width: '100px'
              });
              this.changeMonthFormattertitle();
            });
          }

        }

      },
      vacationdetail() {
        var index = 0;
        this.fields.find((item, i) => {
          if (item.name == "vacation") {
            index = i;
            return true;
          }
        });


        if (this.vacationstatu == "概览") {
          if (this.statu == "概览" || this.zaotuistatu == '概览') {
            this.vacationstatu = "详情";
            this.fields.splice(index + 1, 7);
            this.changeMonthFormattertitle();
          } else {
            $('.daycontent').animate({
              right: '410px'
            }, () => {
              this.vacationstatu = "详情";
              this.fields.splice(index + 1, 7);
              this.changeMonthFormattertitle();
            });
          }
        } else {
          if (this.statu == "概览" || this.zaotuistatu == '概览') {
            this.vacationstatu = "概览";
            this.fields.splice(index + 1, 0, {
              name: 'business_travel_day',
              parent:'vacation',
              title: '出差/外出时长',
              width: '100px'
            }, {
              name: 'business_leave_day',
              parent:'vacation',
              title: '事假时长',
              width: '100px'
            }, {
              name: 'annual_leave_day',
              parent:'vacation',
              title: '年假时长',
              width: '100px'
            }, {
              name: 'wedding_leave_day',
              parent:'vacation',
              title: '婚假时长',
              width: '100px'
            }, {
              name: 'sick_leave_day',
              parent:'vacation',
              title: '病假时长',
              width: '100px'
            }, {
              name: 'funeral_leave_day',
              parent:'vacation',
              title: '丧假时长',
              width: '100px'
            }, {
              name: 'swap_day',
              title: '调休时长',
              width: '100px'

            });
            this.changeMonthFormattertitle();
          } else {
            $('.daycontent').animate({
              right: '0px'
            }, () => {
              this.vacationstatu = "概览";
              this.fields.splice(index + 1, 0, {
                name: 'business_travel_day',
                parent:'vacation',
                title: '出差天数',
                width: '100px'
              }, {
                name: 'business_leave_day',
                parent:'vacation',
                title: '事假天数',
                width: '100px'
              }, {
                name: 'annual_leave_day',
                parent:'vacation',
                title: '年假天数',
                width: '100px'
              }, {
                name: 'wedding_leave_day',
                parent:'vacation',
                title: '婚假天数',
                width: '100px'
              }, {
                name: 'sick_leave_day',
                parent:'vacation',
                title: '病假天数',
                width: '100px'
              }, {
                name: 'funeral_leave_day',
                parent:'vacation',
                title: '丧假天数',
                width: '100px'
              }, {
                name: 'swap_day',
                title: '调休天数',
                width: '100px'

              });
              this.changeMonthFormattertitle();
            });
          }

        }
      },
      changeMonth(n) {
        let now = this.dateSelected;
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

        } else {
          this.dateSelected = this.$Tool.iDate(new Date(next), 'yy-mm-dd');

        }
        var self = this;
        //if (!!this.state.searchParam.checkworkRuleId) {
          setTimeout(() => {
            self.loadShape();
            self.$refs.grid.refresh()
            self.refreshReport();
          }, 200);
        // } else {
        //   this.$root.showTip({
        //     type: 'danger',
        //     msg: "请在筛选中选择考勤规则",
        //     duration: 2000
        //   });
        // }
      },
      changeMonthFormattertitle() {
        var statu = this.statu;

        var title = `<style>.tip {margin: 0px; color: red; } .title {position: relative;height: 24px;line-height: 24px;}.titletip {position: absolute;bottom: 24px;left: 0px;width: 100px;height: 24px;line-height: 24px;text-align: center;color: white;box-sizing: content-box;background: red;border: 1px red solid;border-radius: 15px;}.tipmsg {display: inline-block; width: 100%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; } .arrow {position: absolute; top: 24px; left: 45px; border-left: 5px solid transparent; border-right: 5px solid transparent; border-top: 10px solid red; } .notshow {display:none} .titlecontent {vertical-align: middle; } .title>a {text-decoration: none; color: #aaa; } .circle {display: inline-block; width: 16px; height: 16px; background: transparent; border: 2px solid white; border-radius: 8px; margin-right: 5px; vertical-align: middle; } .note {vertical-align: middle; }</style><div class="title"> <span class="titlecontent">月总工时&nbsp;&nbsp;</span><a href="javascript:void(0)" onclick="attendanceMonth.monthdetail()"><span class="circle"></span><span class="note">${statu}</span></a> </div> `;

        this.fields.find((item) => {
          if (item.name == "total_work_hours") {
            return true;
          }
        }).title = title;

        var zaotuistatu = this.zaotuistatu;
        var title = `<div class="title"> <span class="titlecontent">迟到早退&nbsp;&nbsp;</span><a href="javascript:void(0)" onclick="attendanceMonth.chidaodetail()"><span class="circle"></span><span class="note">${zaotuistatu}</span></a> </div> `;

        this.fields.find((item) => {
          if (item.name == "delay") {
            return true;
          }
        }).title = title;


        var vacationstatu = this.vacationstatu;
        var title = `<div class="title"> <span class="titlecontent">休假&nbsp;&nbsp;</span><a href="javascript:void(0)" onclick="attendanceMonth.vacationdetail()"><span class="circle"></span><span class="note">${vacationstatu}</span></a> </div> `;

        this.fields.find((item) => {
          if (item.name == "vacation") {
            return true;
          }
        }).title = title;

      },
      loadShape() {
        var self = this;
        var piePromise = new Promise((resolve, reject) => {
          store.actions.getMonthEchartPie({
            ruleId: self.rule,
            sDate: self.queryParam.month
          }, function(data) {
            resolve(data);
          }, function(error) {
            reject(error);
          })
        });
        Promise.all([piePromise]).then((val) => {

          var piecolors = ['#399cef', '#38e1e6', '#71f0bc', '#3663c3'];
          val[0] = val[0].map((item, index) => {
            if (index < piecolors.length) {
              item.itemStyle = {
                normal: {
                  color: piecolors[index]
                }
              }
            }
            return item;
          });
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
              name: '月工时饼状图',
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
          self.$root.showTip({
            type: 'danger',
            msg: "加载月考勤饼图失败",
            duration: 2000
          });
        });

        var splashPromise = new Promise((resolve, reject) => {
          store.actions.getMonthEchartSplash({
            ruleId: self.rule,
            sDate: self.queryParam.month
          }, function(data) {
            resolve(data);
          }, function(error) {
            reject(error);
          })
        });
        Promise.all([splashPromise]).then((val) => {
          if (!Array.isArray(val[0].data)) {
            this.$root.showTip({
              type: 'danger',
              msg: "月考勤散点图无数据",
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
          var ymax = 0;

          ymax = y.sort((a, b) => {
            return a - b
          }).pop();

          ymax = ymax > val[0].monthWarningTime ? ymax : val[0].monthWarningTime;

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
                color: '#7880ec',
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

                    return "加班工时(" + val[0].overtimeLimitTime + "小时)"
                  }
                }
              }
            },
            data: [
              ['半月', val[0].overtimeLimitTime],
              ['5年以上', val[0].overtimeLimitTime]
            ],
          })


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

                    return '月工时(' + val[0].monthWarningTime + '小时)'
                  }
                }
              }
            },
            data: [
              ['半月', val[0].monthWarningTime],
              ['5年以上', val[0].monthWarningTime]
            ],
          })
          var myChart2 = echarts.init(this.$el.querySelector('.splashReport'));
          myChart2.setOption({
            backgroundColor: "#5F6BEC",
            title: {
              text: '月总工时',
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

                // return '<div style="  font-size: 14px;padding-bottom: 7px;">' + value[2] + ':' + value[1] + '小时,<br>' + obj.seriesName + ',' + value[0] + '</div>';
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
            msg: "加载月考勤散点图失败",
            duration: 2000
          });
        });

      }
    },
    created() {
      this.dateNow = this.$Tool.iDate(new Date(), 'yy-mm-dd');
      this.dateSelected = this.dateNow;

    },
    attached() {
      console.log(55555555555555)
      window.attendanceMonth = this;
      this.refreshReport(); //统计报表信息
      this.getLastTime();
      // if (!!this.state.searchParam.checkworkRuleId) {
        this.attendenceMonthUrl = "api.AttendanceEntire.getMonthworktime";

        setTimeout(() => {
          this.$refs.grid.refresh()
        }, 200);
      // }
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

.reporttitle {
  padding: 20px;
}

.splashReport,
.pieReport {
  /*padding: 0px 15px;*/
  box-sizing: border-box;
  width: 400px;
  height: 350px;
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

.monthcalendar {
  width: 300px;
  height: 250px;
  position: absolute;
  top: 35px;
  left: -53px;
  z-index: 4;
}
</style>
<style>
.month-grid .ui-table{
    border-radius: 0 0 6px 6px!important;
}
</style>
