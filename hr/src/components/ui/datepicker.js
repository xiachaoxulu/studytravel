/*!
 * vue-datepicker v0.1.0
 * https://github.com/weifeiyue/vue-datepicker
 * (c) 2016 weifeiyue
 * Released under the MIT License.
 */

import EventListener from 'libs/utils/EventListener'

(function(factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['vue'], factory);
    } else if (typeof exports === 'object') {
        factory(require('vue'));
    } else {
        factory(Vue);
    }
}(function(Vue) {
    //:class="{\'popup-left\':left,\'popup-right\':right,\'popup-top\':top,\'popup-bottom\':bottom,}"
    Vue.component('ui-datepicker', {
        template: '<div class="mz-datepicker" :style="{width:width}" >' +
            '<input :value="value" readonly :disabled="disabled" class="form-control" @click="click"/><a v-if="clearable&&value" @click.stop="clear" class="material-icons">highlight_off</a><i class="material-icons">date_range</i>' +
            '<div class="mz-datepicker-popup" style="position:fixed;z-index:100000" :class="{focus:show}"  :style="{left:leftpx,top:toppx}" v-if="show" transition="mz-datepicker-popup" tabindex="-1" @keyup.up="changeMonth(-1,1)" @keyup.down="changeMonth(1,1)" @keyup.left="changeYear(-1,1)" @keyup.right="changeYear(1,1)" v-el:popup>' +
            '<div class="mz-calendar-top" v-if="range">'+
				'<template v-for="item in ranges">'+
					'<i v-if="$index" ></i><a v-text="item.name" @click="selectRange(item)"></a>'+
				'</template>'+
            '</div>'+
            '<div :class="{\'mz-calendar-range\':range}" style="color:#666;">' +
				'<template v-for="no in count">'+
					'<div class="mz-calendar">' +
						'<div class="mz-calendar-header">'+
							'<a v-if="showType===\'yy\'?false:true" class="mz-calendar-prev-year" title="上一年" @click="changeYear(-1,no+1)">«</a>'+
							'<a v-if="showType===\'dd\'?true:false" class="mz-calendar-prev-month" title="上个月" @click="changeMonth(-1,no+1)">‹</a>'+

							'<a v-if="showType===\'yy\'?false:true"class="mz-calendar-year-select" title="选择年份" @click="showYear(no+1)">{{this[\'now\'+(no+1)].getFullYear()}}年</a>'+
                            '<a v-if="showType===\'yy\'?true:false" class="mz-calendar-year-select" title="选择年份" >选择年份</a>'+

							'<a v-if="showType===\'dd\'?true:false" class="mz-calendar-month-select" title="选择月份" @click="showMonth(no+1)">{{months[this[\'now\'+(no+1)].getMonth()]}}月</a>'+
							'<a v-if="showType===\'dd\'?true:false" class="mz-calendar-next-month" title="下个月" @click="changeMonth(1,no+1)">›</a>'+
							'<a v-if="showType===\'yy\'?false:true" class="mz-calendar-next-year" title="下一年" @click="changeYear(1,no+1)">»</a>'+
						'</div>'+
						'<table cellspacing="0" cellpadding="0">' +
						'<tr><th v-for="day in days" v-text="day"></th></tr>' +
						'<tr v-if="this[\'date\'+(no+1)]" v-for="i in 6"><td v-for="j in 7" v-text="this[\'date\'+(no+1)][i * 7 + j].text" :title="this[\'date\'+(no+1)][i * 7 + j].title" :class="this[\'date\'+(no+1)][i * 7 + j].status" @click="select(this[\'date\'+(no+1)][i * 7 + j], no+1)"></td></tr>' +
						'</table>' +
                        '<div class="mz-calendar-year-panel" transition="mz-calendar-panel" v-if="this[\'showYear\'+(no+1)]"><a class="mz-calendar-year-panel-prev" @click="changeYearRange(no+1,-1)"></a><a class="mz-calendar-year-panel-year" v-for="item in this[\'years\'+(no+1)]" :class="item.status" @click="selectYear(item,no+1)">{{item.year}}年</a><a class="mz-calendar-year-panel-next" @click="changeYearRange(no+1,1)"></a></div>'+
                        '<div class="mz-calendar-month-panel" transition="mz-calendar-panel" v-if="this[\'showMonth\'+(no+1)]"><a v-for="item in this[\'months\'+(no+1)]" class="mz-calendar-month-panel-month" :class="item.status" @click="selectMonth(item,no+1)">{{item.month}}月</a></div>'+
                        '<div class="timepicker" v-if="!range&&showHHMM">' +
                            '<div class="hm"><select v-model="hhmm[0]"><option v-for="h in hourLen" :value="h|hm">{{h|hm}}</option></select><span>点</span></div>'+
                            '<div class="hm"><select v-model="hhmm[1]"><option v-for="m in minutesLen" :value="m|hm">{{m|hm}}</option></select><span>分</span></div>'+
                            '<div class="bt"><button type="button" class="btn btn-default" @click="setHourMinute">确定</button></div>'+
                        '</div>' +

                    '</div>' +
					'<div class="mz-calendar-separator" v-if="range&&no===0"></div>' +
				'</template>'+
            '</div>' +
            '<div class="mz-calendar-bottom" v-if="range"><a class="mz-calendar-btn ok" @click="show=false">确定</a></div>' +
            '</div>' +
            '<div class="mz-calendar-bg" v-if="false"></div></div>',

        ready(){
            let _this = this;
            window.addEventListener('mousewheel',function(e){
                if(_this.show){
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }
            },true);

            const el = this.$el
            this._closeEvent = EventListener.listen(window, 'click', (e) => {
                if (!el.contains(e.target)) {
                    this.show = false
                    if(this.hhmm) this.showHHMM = false;
                };
            })
        },
        beforeDestroy() {
          if (this._closeEvent) this._closeEvent.remove()
        },
        props: {
            //是否显示范围
            range: {
                type: Boolean,
                default: false
            },
            //显示宽度
            width: {
                default: '200px'
            },
            //输入的时间
            time: {
                twoWay: true
            },
            //输入的开始时间
            startTime: {
                twoWay: true
            },
            //输入的结束时间
            endTime: {
                twoWay: true
            },
            //是否可以清除
            clearable: {
                type: Boolean,
                default: false
            },
            //显示格式
            format: {
                type: String,
                default: 'yyyy-MM-dd'
            },
            //禁用
            disabled: {
                type: Boolean,
                default: false
            },
            // 是否显示在左侧
            left:{
                type:Boolean,
                default:false
            },
            right:{
                type:Boolean,
                default:false
            },
            top:{
                type:Boolean,
                default:false
            },
            bottom:{
                type:Boolean,
                default:false
            },
            callback:{
                type:Function,
                default(){}
            },
            HHMM:{
                type:Boolean,
                default:false
            },
            // 显示类型 默认显示日，可选月 年
            showType:{
                type:String,
                default:'dd' // dd mm yy
            }
        },
        data: function() {
            return {
                showHHMM:false,
                show: false,
                showYear1: false,
                showYear2: false,
                showMonth1: false,
                showMonth2: false,
                ranges: [], //选择范围
                days: ['一', '二', '三', '四', '五', '六', '日'],
                months: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
                years1:  [],
                years2:  [],
                months1: [],
                months2: [],
                date1: null,
                date2: null,
                time1: this.parse(this.startTime, false) || this.parse(this.time, false),
                time2: this.parse(this.endTime, true),
                now1: this.parse(new Date(), false),
                now2: this.parse(new Date(), true),
                hourLen: 24,
                minutesLen:60,
                hhmm:['00','00'],
                count: this.range ? 2 : 1, //日历数量
                leftpx:0,
                toppx:0,
                activeChange:false,
            };
        },
        computed: {
            value: function() {
                console.log('value',this.stringify(this.time1))
                if (this.range) {
                    if (this.time1 && this.time2) {
                        return this.stringify(this.time1) + ' ~ ' + this.stringify(this.time2);
                    } else {
                        return '';
                    }
                } else {
                    return this.stringify(this.time1)+(this.HHMM ? ' '+ (this.time? this.hhmm.join(':') : '') : '');
                }
            },
        },
        filters:{
            hm(val){
                return val<10 ? '0'+val : val;
            }
        },
        events:{
            formReset(){
                this.time1=''
                this.time2=''
            }
        },
        watch: {
            show: function(val) {
                this.hidePanel();
                val && this.$els.popup.focus();

                if(!val&&this.value){
                    let date = this.time;
                    if(this.range){
                        date = [this.stringify(this.time1) , this.stringify(this.time2)]
                    }else{
                    }
                    this.callback(date,this.$el);
                }

                if(!val&&this.HHMM&&!this.range){
                    this.activeChange = true;

                    console.log(this.stringify(this.time1));
                    this.time=this.stringify(this.time1) ? this.stringify(this.time1)+' '+this.hhmm.join(':')+':00' : '';
                    this.$nextTick(function(){
                        this.activeChange = false;
                    })
                }

                // 判断显示类型，默认显示相应的面板
                if(val && this.showType==='mm'){
                    this.showMonth(1)
                    this.range && this.showMonth(2);
                }
                else if(val && this.showType==='yy'){
                    this.showYear(1)
                    this.range && this.showYear(2);
                }


            },
            now1: function() {
                this.updateAll();
            },
            now2: function() {
                this.updateAll();
            },
            time(val){

                console.log(val)
                // 如果是选择时间时time改变，则activeChange=true,跳过
                // 否则传入的time参数在外部改变时，组件内相应变化
                if(this.activeChange) return;

                if(!val || val==''){
                    this.time1=''
                    this.time2=''
                }
                else{

                    // var self = this;
                    this.time1 = this.parse(this.time);
                    this.now1 = this.parse(this.time1) || new Date();

                    if (this.range) {
                        this.initRanges();
                        this.time2 = this.parse(this.time2);
                        this.now2 = this.parse(this.time2) || new Date();
                    }


                }
                console.log('time',val,this.time1)
            },
            startTime(val){

                if(this.activeChange) return;

                this.time1=this.parse(val, false);

            },
            endTime(val){

                if(this.activeChange) return;

                this.time2=this.parse(val, false);

            },
        },
        methods: {

            setHourMinute(){
                this.show = false;
            },

            //转换输入的时间
            parse: function(time, isLast) {
                if (time) {

                    // for 20160102
                    // if (time.length == 8 && !/[-\/]/.test(time)) {
                    //     time = time.substring(0, 4) + '-' + time.substring(4, 6) + '-' + time.substring(6);
                    // }

                    if (time.length == 8 && (time-0)>0) {
                        time = time.substring(0, 4) + '-' + time.substring(4, 6) + '-' + time.substring(6);
                    }

                    // console.log(time)


                    var tmpTime = new Date(time);
                    if (isLast === undefined) {
                        return tmpTime;
                    } else if (isLast) {
                        return new Date(tmpTime.getFullYear(), tmpTime.getMonth(), tmpTime.getDate(), 23, 59, 59, 999);
                    } else {
                        return new Date(tmpTime.getFullYear(), tmpTime.getMonth(), tmpTime.getDate());
                    }
                }
                return null;
            },
            //初始化时间范围
            initRanges: function() {
                var time = new Date(),
                    ranges = [];

                time = new Date();
                time.setDate(time.getDate() + 6);
                ranges.push({
                    name: '7天',
                    start: this.parse(new Date(), true),
                    end: this.parse(time, false)
                });

                time = new Date();
                time.setMonth(time.getMonth() + 1, 0);
                ranges.push({
                    name: '本月',
                    start: this.parse(new Date(), true),
                    end: this.parse(time, true)
                });

                time = new Date();
                time.setDate(time.getDate());
                time.setMonth(time.getMonth() + 1);
                ranges.push({
                    name: '一个月',
                    start: this.parse(new Date(), true),
                    end: this.parse(time, true)
                });

                time = new Date();
                time.setDate(time.getDate() + 366);
                ranges.push({
                    name: '一年',
                    start: this.parse(new Date(), true),
                    end: this.parse(time, false)
                });

                time = new Date();
                time.setDate(time.getDate() + 365*100);
                ranges.push({
                    name: '永久',
                    start: this.parse(new Date(), true),
                    end: this.parse(time, false)
                });
                this.ranges = ranges;
            },
            //更新所有的日历
            updateAll: function() {
                this.update(new Date(this.now1), 1);
                this.range && this.update(new Date(this.now2), 2);
            },
            //点击时间输入框的时候触发
            click: function() {
                var self = this;
                self.time1 = self.parse(self.time1) || self.parse(self.time);
                self.now1 = self.parse(self.time1) || new Date();
                if (self.range) {
                    self.initRanges();
                    self.time2 = self.parse(self.time2);
                    self.now2 = self.parse(self.time2) || new Date();
                }
                var rect = this.$el.getBoundingClientRect(),
                    right = document.documentElement.clientWidth - rect.left;
                // (right < (self.range?441:214) && right < rect.left)?(self.left=true):(self.left=false);



                /* 控制显示方向 */
                function getPosition(el){

                    var _parent = el.parentNode;

                    // console.log(_parent.classList.toString())

                    for(var i=0;i<100;i++){
                        if(_parent.tagName.toLowerCase() =='body' || _parent.classList.toString().indexOf('_offsetParent_')>-1){
                            continue;
                        }
                        _parent = _parent.parentNode;
                    }

                    var _elRect = el.getBoundingClientRect();
                    var _parentRect = _parent.getBoundingClientRect();

                    // console.log(_elRect)
                    // console.log(_parentRect)

                    return {
                        width:el.offsetWidth,
                        height:el.offsetHeight,
                        left: _elRect.left-_parentRect.left,
                        top: _elRect.top-_parentRect.top,
                        right: -(_elRect.right-_parentRect.right),
                        bottom:-(_elRect.bottom-_parentRect.bottom)
                    }

                }

                var elPos = getPosition(this.$el);
                var elRect =  this.$el.getBoundingClientRect();

                // console.log(elPos)
                // console.log(elRect)
                // console.log((self.range?441:214)-elPos.width)

                // top
                let boxH = self.range?310:250;
                let boxW = self.range?441:214;
                if(elPos.bottom<boxH){

                    if(elRect.top<boxH){
                        this.toppx = (elRect.top-boxH + (boxH-elRect.top) +elRect.height) +'px'
                    }else{
                        this.toppx = (elRect.top-boxH+elRect.height) +'px'
                    }

                    this.top = true;
                    this.bottom = false;
                }
                else {

                    this.toppx = (elRect.top + elRect.height) +'px'

                    this.top = false;
                    this.bottom = true;
                }
                if(elPos.right<boxW-elPos.width){

                    this.leftpx = (elRect.left-boxW+elRect.width) +'px'

                    this.left = true;
                    this.right = false;
                }
                else{

                    this.leftpx = elRect.left+'px';

                    this.left = false;
                    this.right = true;
                }

                self.show = !self.show;

            },
            //选择时间
            select: function(item, no) {
                var self = this;
                self.hidePanel();
                if (item.status.indexOf('mz-calendar-disabled') !== -1) {
                    return;
                }
                self['now' + no] = new Date(item.time);
                self['time' + no] = new Date(item.time);
                if (!self.range) {
                    this.activeChange = true;
                    self.time = self.getOutTime(item.time);
                    this.$nextTick(function(){
                        this.activeChange = false;
                    })
                    if (!self.HHMM) self.show = false;
                } else {
                    self[no === 1 ? 'startTime' : 'endTime'] = self.getOutTime(item.time);
                }

                if(self.HHMM)this.showHHMM=true;

            },
            //选择范围
            selectRange: function(item) {

                this.activeChange = true;
                this.$nextTick(function(){
                    this.activeChange = false;
                })

                var self = this;
                self.now1 = new Date(item.start);
                self.now2 = new Date(item.end);
                self.time1 = new Date(item.start);
                self.time2 = new Date(item.end);
                self.startTime = self.getOutTime(item.start);
                self.endTime = self.getOutTime(item.end);

                self.hidePanel();
            },
            //根据输出类型，获取输出的时间
            getOutTime: function(time) {
                var type = this.time ? typeof(this.time) : typeof(this.startTime);
                if (type === 'number') {
                    return time.getTime();
                } else if (type === 'object') {
                    return new Date(time);
                } else {
                    return this.stringify(time);
                }
            },
            //更新时间
            update: function(time, no) {
                var i, tmpTime, curFirstDay, lastDay, curDay, day, arr = [];
                time.setDate(0); //切换到上个月最后一天
                curFirstDay = time.getDay(); //星期几
                lastDay = time.getDate(); //上个月的最后一天
                for (i = curFirstDay; i > 0; i--) {
                    day = lastDay - i + 1;
                    tmpTime = new Date(time.getFullYear(), time.getMonth(), day);
                    tmpTime = this.parse(tmpTime, no === 2);
                    arr.push({
                        status: this.getTimeStatus(tmpTime, no) || 'mz-calendar-lastmonth',
                        title: this.stringify(tmpTime),
                        text: day,
                        time: tmpTime
                    });
                }
                time.setMonth(time.getMonth() + 2, 0); //切换到当前月的最后一天
                curDay = time.getDate(); //当前月的最后一天
                time.setDate(1);
                for (i = 1; i <= curDay; i++) {
                    tmpTime = new Date(time.getFullYear(), time.getMonth(), i);
                    tmpTime = this.parse(tmpTime, no === 2);
                    arr.push({
                        status: this.getTimeStatus(tmpTime, no),
                        title: this.stringify(tmpTime),
                        text: i,
                        time: tmpTime
                    });
                }
                //下个月的前几天
                for (i = 1; arr.length < 42; i++) {
                    tmpTime = new Date(time.getFullYear(), time.getMonth() + 1, i);
                    tmpTime = this.parse(tmpTime, no === 2);
                    arr.push({
                        status: this.getTimeStatus(tmpTime, no) || 'mz-calendar-nextmonth',
                        title: this.stringify(tmpTime),
                        text: i,
                        time: tmpTime
                    });
                }
                this['date' + no] = arr;
            },
            //获取时间状态
            getTimeStatus: function(time, no, format) {
                var status = '',
                    curTime = new Date(),
                    selTime = this['time' + no],
                    tmpTimeVal = this.stringify(time, format || 'yyyy-MM-dd'), //需要查询状态的时间字符串值
                    curTimeVal = this.stringify(curTime, format || 'yyyy-MM-dd'), //当前时间字符串值
                    selTimeVal = this.stringify(selTime, format || 'yyyy-MM-dd'); //选中时间字符串值
                if (tmpTimeVal === selTimeVal) {
                    status = 'mz-calendar-selected';
                } else if (tmpTimeVal === curTimeVal) {
                    status = 'mz-calendar-today';
                }
                if (this.time1 && this.time2 && time >= this.time1 && time <= this.time2) {
                    status += ' mz-calendar-inrange';
                }
                if (no == 1 && this.time2 && time > this.time2) {
                    status += ' mz-calendar-disabled';
                }
                if (no == 2 && this.time1 && time < this.time1) {
                    status += ' mz-calendar-disabled';
                }
                return status;
            },
            //将Date转化为指定格式的String
            stringify: function(time, format) {
                if (!time) {
                    return '';
                }
                format = format || this.format;
                var year = time.getFullYear(), //年份
                    month = time.getMonth() + 1, //月份
                    day = time.getDate(), //日
                    hours24 = time.getHours(), //小时
                    hours = hours24 % 12 === 0 ? 12 : hours24 % 12,
                    minutes = time.getMinutes(), //分
                    seconds = time.getSeconds(), //秒
                    milliseconds = time.getMilliseconds(); //毫秒
                var map = {
                    yyyy: year,
                    MM: ('0' + month).slice(-2),
                    M: month,
                    dd: ('0' + day).slice(-2),
                    d: day,
                    HH: ('0' + hours24).slice(-2),
                    H: hours24,
                    hh: ('0' + hours).slice(-2),
                    h: hours,
                    mm: ('0' + minutes).slice(-2),
                    m: minutes,
                    ss: ('0' + seconds).slice(-2),
                    s: seconds,
                    S: milliseconds
                };
                return format.replace(/y+|M+|d+|H+|h+|m+|s+|S+/g, function(str) {
                    return map[str];
                });
            },
            //显示年份选择器
            showYear: function(no) {
                var name = 'showYear' + no;

                // 如果只显示年份时且范围选择时，禁止关闭显示年份面板
                this.showType==='yy'&&this.range ?  '' : this.hidePanel(name);

                this[name] = !this[name];
                var time = new Date(this['now' + no] || new Date()),
                    num = Math.floor(time.getFullYear() % 10), //获取当前时间个位数
                    arr = [];
                time.setDate(1);//先设置为第一天，因为月份天数不一样，要不存在bug
                time.setFullYear(time.getFullYear() - num);
                while (arr.length < 10) {
                    no === 2 && time.setMonth(time.getMonth() + 1, 0);
                    arr.push({
                        year: time.getFullYear(),
                        status: this.getTimeStatus(time, no, 'yyyy'),
                    });
                    time.setDate(1);
                    time.setFullYear(time.getFullYear() + 1);
                }
                this['years' + no] = arr;
            },
            //显示月份选择器
            showMonth: function(no) {
                console.info('showMonth',no)
                var name = 'showMonth' + no;

                // 如果只显示月份时且范围选择时，禁止关闭其他月份面板
                this.showType==='mm'&&this.range ?  '' : this.hidePanel(name);

                this[name] = !this[name];
                var time = new Date(this['now' + no] || new Date()),
                    arr = [];
                while (arr.length < 12) {
                    time.setDate(1);//先设置为第一天，因为月份天数不一样，要不存在bug
                    time.setMonth(arr.length);
                    no === 2 && time.setMonth(time.getMonth() + 1, 0);
                    arr.push({
                        month: arr.length + 1,
                        status: this.getTimeStatus(time, no, 'yyyy-MM'),
                    });
                }
                this['months' + no] = arr;
            },
            //切换年份选择器
            changeYearRange: function(no, flag) {
                var arr = this['years' + no],
                    time = new Date(this['time' + no] || new Date());
                for (var i in arr) {
                    var item = arr[i],
                        year = item.year + 10 * flag;
                    time.setDate(1);//先设置为第一天，因为月份天数不一样，要不存在bug
                    time.setFullYear(year);
                    no === 2 && time.setMonth(time.getMonth() + 1, 0);
                    item.year = year;
                    item.status = this.getTimeStatus(time, no);
                }
            },
            //改变年份
            changeYear: function(flag, no) {
                var now = this['now' + no];
                now.setDate(1);//先设置为第一天，因为月份天数不一样，要不存在bug
                now.setFullYear(now.getFullYear() + flag);
                no === 2 && now.setMonth(now.getMonth() + 1, 0);
                this['now' + no] = new Date(now);
                // this.hidePanel();

                var name = this.showType==='mm' ? 'showMonth' + no : '';
                this.hidePanel(name);

            },
            //改变月份
            changeMonth: function(flag, no) {
                var now = this['now' + no];
                now.setDate(1);//先设置为第一天，因为月份天数不一样，要不存在bug
                now.setMonth(now.getMonth() + flag);
                no === 2 && now.setMonth(now.getMonth() + 1, 0);
                this['now' + no] = new Date(now);

                this.hidePanel();
            },
            //选择年份
            selectYear: function(item, no) {
                if (item.status.indexOf('mz-calendar-disabled') !== -1) {
                    return;
                }
                var now = this['now' + no];
                now.setFullYear(item.year);
                this['now' + no] = new Date(now);
                this.hidePanel();

                // 只显示年份时，设置选中的时间
                if(this.showType==='yy'){
                    console.log('选择年份',this['now' + no])
                    this['time'+no] = new Date(now);
                    this.show = false;

                    if(!this.range){
                        this.activeChange = true;
                        this.time = this.getOutTime(this['time'+no]);
                        this.$nextTick(()=>{
                            this.activeChange = false;
                        })
                    } else {
                        this[no === 1 ? 'startTime' : 'endTime'] = this.getOutTime(this['time'+no]);
                    }

                }
                // 当只显示月份时，选择年份后重新显示月份列表
                if(this.showType==='mm'){
                    this.showMonth(1)
                    this.range && this.showMonth(2);
                }
            },
            //选择月份
            selectMonth: function(item, no) {
                if (item.status.indexOf('mz-calendar-disabled') !== -1) {
                    return;
                }
                var now = this['now' + no];
                now.setMonth(item.month - 1);
                this['now' + no] = new Date(now);
                this.hidePanel();

                // 只显示月份时，设置选中的时间
                if(this.showType==='mm'){
                    console.log('选择月份',this['now' + no])
                    this['time'+no] = new Date(now);
                    this.show = false;

                    if(!this.range){
                        this.activeChange = true;
                        this.time = this.getOutTime(this['time'+no]);
                        this.$nextTick(()=>{
                            this.activeChange = false;
                        })
                    } else {
                        this[no === 1 ? 'startTime' : 'endTime'] = this.getOutTime(this['time'+no]);
                    }

                }

            },
            //隐藏所有面板
            hidePanel: function(name) {
                ['showYear1', 'showYear2', 'showMonth1', 'showMonth2'].map(function(item) {
                    if (item !== name) {
                        this[item] = false;
                    }
                }.bind(this));
            },
            //清除时间
            clear: function() {
                this.activeChange = true;
                this.$nextTick(function(){
                    this.activeChange = false;
                })

                var self = this;
                self.time1 = self.time2 = self.startTime = self.endTime = self.time = null;
                self.now1 = new Date();
                self.now2 = new Date();

            }
        }
    });
}));
