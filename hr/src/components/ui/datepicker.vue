<template>
<div class="mz-datepicker" :style="{width:width+px}">
	<input :value="value" readonly :disabled="disabled" :class="{focus:show}" @click="click" @mousedown="$event.preventDefault()"/>
	<a v-if="clearable&&value" @click.stop="clear"></a> <i></i>
	<div class="mz-datepicker-popup" :class="{mz-datepicker-popup-left:left}" v-if="show" transition="mz-datepicker-popup" tabindex="-1" @blur="show = false" @mousedown="$event.preventDefault()" @keyup.up="changeMonth(-1,1)" @keyup.down="changeMonth(1,1)" @keyup.left="changeYear(-1,1)" @keyup.right="changeYear(1,1)" v-el:popup>
		<div class="mz-calendar-top" v-if="range">
			<template v-for="item in ranges"> <i v-if="$index"></i>
				<a v-text="item.name" @click="selectRange(item)"></a>
			</template>
		</div>
		<div :class="{mz-calendar-range:range}">
			<template v-for="no in count">
				<div class="mz-calendar">
					<div class="mz-calendar-header">
						<a class="mz-calendar-prev-year" title="上一年" @click="changeYear(-1,no+1)">«</a>
						<a class="mz-calendar-prev-month" title="上个月" @click="changeMonth(-1,no+1)">‹</a>
						<a class="mz-calendar-year-select" title="选择年份" @click="showYear(no+1)">{{vm[now+(no+1)].getFullYear()}}年</a>
						<a class="mz-calendar-month-select" title="选择月份" @click="showMonth(no+1)">{{months[vm[now+(no+1)].getMonth()]}}月</a>
						<a class="mz-calendar-next-month" title="下个月" @click="changeMonth(1,no+1)">›</a>
						<a class="mz-calendar-next-year" title="下一年" @click="changeYear(1,no+1)">»</a>
					</div>
					<table cellspacing="0" cellpadding="0">
						<tr>
							<th v-for="day in days" v-text="day"></th>
						</tr>
						<tr v-if="vm[date+(no+1)]" v-for="i in 6">
							<td v-for="j in 7" v-text="vm[date+(no+1)][i * 7 + j].text" :title="vm[date+(no+1)][i * 7 + j].title" :class="vm[date+(no+1)][i * 7 + j].status" @click="select(vm[date+(no+1)][i * 7 + j], no+1)"></td>
						</tr>
					</table>
					<div class="mz-calendar-year-panel" transition="mz-calendar-panel" v-if="vm[showYear+(no+1)]">
						<a class="mz-calendar-year-panel-prev" @click="changeYearRange(no+1,-1)"></a>
						<a class="mz-calendar-year-panel-year" v-for="item in vm[years+(no+1)]" :class="item.status" @click="selectYear(item,no+1)">{{item.year}}年</a>
						<a class="mz-calendar-year-panel-next" @click="changeYearRange(no+1,1)"></a>
					</div>
					<div class="mz-calendar-month-panel" transition="mz-calendar-panel" v-if="vm[showMonth+(no+1)]">
						<a v-for="item in vm[months+(no+1)]" class="mz-calendar-month-panel-month" :class="item.status" @click="selectMonth(item,no+1)">{{item.month}}月</a>
					</div>
				</div>
				<div class="mz-calendar-separator" v-if="range&&no===0"></div>
			</template>
		</div>
		<div class="mz-calendar-bottom" v-if="range">
			<a class="mz-calendar-btn ok" @click="show=false">确定</a>
		</div>
	</div>
</div>

</template>
<script type="text/javascript">
export default {

    props: {
        //是否显示范围
        range: {
            type: Boolean,
            default: false
        },
        //显示宽度
        width: {
            default: 214
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
        }
    },
    data: function() {
        return {
            vm:this,
            show: false,
            showYear1: false,
            showYear2: false,
            showMonth1: false,
            showMonth2: false,
            left: false,
            ranges: [], //选择范围
            days: ['一', '二', '三', '四', '五', '六', '日'],
            months: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
            years1: [],
            years2: [],
            months1: [],
            months2: [],
            date1: null,
            date2: null,
            time1: this.parse(this.startTime, false) || this.parse(this.time, false),
            time2: this.parse(this.endTime, true),
            now1: this.parse(new Date(), false),
            now2: this.parse(new Date(), true),
            count: this.range ? 2 : 1 //日历数量
        };
    },
    computed: {
        value: function() {
            if (this.range) {
                if (this.time1 && this.time2) {
                    return this.stringify(this.time1) + ' ~ ' + this.stringify(this.time2);
                } else {
                    return '';
                }
            } else {
                return this.stringify(this.time1);
            }
        }
    },
    watch: {
        show: function(val) {
            this.hidePanel();
            val && this.$els.popup.focus();
        },
        now1: function() {
            this.updateAll();
        },
        now2: function() {
            this.updateAll();
        }
    },
    methods: {
        //转换输入的时间
        parse: function(time, isLast) {
            if (time) {
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
            ranges.push({
                name: '今天',
                start: this.parse(time, false),
                end: this.parse(time, true)
            });
            time.setDate(time.getDate() - 1);
            ranges.push({
                name: '昨天',
                start: this.parse(time, false),
                end: this.parse(time, true)
            });
            time = new Date();
            time.setDate(time.getDate() - 6);
            ranges.push({
                name: '最近7天',
                start: this.parse(time, false),
                end: this.parse(new Date(), true)
            });
            time = new Date();
            time.setMonth(time.getMonth() + 1, 0);
            ranges.push({
                name: '本月',
                start: new Date(time.getFullYear(), time.getMonth(), 1),
                end: this.parse(time, true)
            });
            time = new Date();
            time.setMonth(time.getMonth(), 0);
            ranges.push({
                name: '上个月',
                start: new Date(time.getFullYear(), time.getMonth(), 1),
                end: this.parse(time, true)
            });
            time = new Date();
            time.setDate(time.getDate() - 29);
            ranges.push({
                name: '最近一个月',
                start: this.parse(time, false),
                end: this.parse(new Date(), true)
            });
            time = new Date();
            time.setDate(time.getDate() - 365);
            ranges.push({
                name: '最近一年',
                start: this.parse(time, false),
                end: this.parse(new Date(), true)
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
            (right < (self.range?441:214) && right < rect.left)?(self.left=true):(self.left=false);
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
                self.time = self.getOutTime(item.time);
                self.show = false;
            } else {
                self[no === 1 ? 'startTime' : 'endTime'] = self.getOutTime(item.time);
            }
        },
        //选择范围
        selectRange: function(item) {
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
            this.hidePanel(name);
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
            var name = 'showMonth' + no;
            this.hidePanel(name);
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
            this.hidePanel();
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
            var self = this;
            self.time1 = self.time2 = self.startTime = self.endTime = self.time = null;
            self.now1 = new Date();
            self.now2 = new Date();
        }
    },
    created(){
        this.vm = this.$data;
    }

}
</script>
<style type="text/css" scoped>
.mz-datepicker {
    display: inline-block;
    vertical-align: middle;
    position: relative;
    font-family: 'Microsoft YaHei', serif;
}
.mz-datepicker > input {
    font-family: 'Microsoft YaHei', serif;
    color: #666;
    border: 1px solid #d9d9d9;
    height: 30px;
    box-sizing: border-box;
    outline: none;
    padding: 0 30px 0 7px;
    font-size: 13px;
    width: 100%;
    cursor: pointer;
}
.mz-datepicker > input:disabled {
    cursor: not-allowed;
    background-color: #ebebe4;
}
.mz-datepicker > input:focus, .mz-datepicker > input.focus {
    border-color: #3bb4f2;
    -webkit-box-shadow: 0 0 5px rgba(59, 180, 242, .3);
    box-shadow: 0 0 5px rgba(59, 180, 242, .3);
}
.mz-datepicker > i {
    display: inline-block;
    position: absolute;
    width: 30px;
    height: 30px;
    top: 0;
    right: 0;
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAACZmZl+9SADAAAAAXRSTlMAQObYZgAAAB9JREFUCNdjEBSAov//GSYKMjQwAhlAEoTaHyIzIFIAFm0NVxDW3twAAAAASUVORK5CYII=') no-repeat 50% 50%;
}
.mz-datepicker > a {
    display: none;
    position: absolute;
    width: 30px;
    height: 30px;
    top: 0;
    right: 0;
    cursor: pointer;
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARBAMAAADJQ1rJAAAAMFBMVEUAAACZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmy/KNBAAAAD3RSTlMAeQfv0sgfSr2XgBXh4Em9LfYxAAAAdElEQVQI12NgYGAqXFgEpIAM4f//PwuBWFv/A8HXDUCh+P8gEMTAwPjf9v//P/YfGRiU/7v5A9FnBYb6/z9SvmT8/1/AIP//f9g0oFoBhvX////kBGpZgBBDqEPoBZpn8///X6B5CDsQ9iLcAmI+XPgISAEABvtVL6xNmm0AAAAASUVORK5CYII=') no-repeat 50% 50%;
}
.mz-datepicker > a:hover {
    opacity: 0.8;
}
.mz-datepicker:hover > a {
    display: block;
}
.mz-datepicker:hover > a + i {
    display: none;
}
.mz-datepicker-popup {
    font-size: 12px;
    position: absolute;
    top: 100%;
    margin-top: 1px;
    border: 1px solid #d9d9d9;
    box-shadow: 0 1px 6px rgba(99, 99, 99, 0.2);
    padding: 8px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background: #fff;
    outline: none;
    z-index: 1;
}
.mz-datepicker-popup-left{
    right: 0;
}
.mz-datepicker-popup-transition {
    transition: all 200ms ease;
    opacity: 1;
    transform: scaleY(1);
    transform-origin: center top;
}
.mz-datepicker-popup-enter, .mz-datepicker-popup-leave {
    opacity: 0;
    transform: scaleY(0)
}
.mz-calendar {
    width: 196px;
    display: inline-block;
    vertical-align: middle;
    position: relative;
}
.mz-calendar-header {
    text-align: center;
    color: #999;
    position: relative;
    line-height: 34px;
}
.mz-calendar-header a {
    cursor: pointer;
}
.mz-calendar-header a:hover {
    color: #1284e7;
}
.mz-calendar-prev-year, .mz-calendar-prev-month, .mz-calendar-next-month, .mz-calendar-next-year {
    position: absolute;
    font-size: 16px;
}
.mz-calendar-prev-year {
    left: 4px;
}
.mz-calendar-prev-month {
    left: 24px;
}
.mz-calendar-next-month {
    right: 24px;
}
.mz-calendar-next-year {
    right: 4px;
}
.mz-calendar-year-select, .mz-calendar-month-select {
    font-weight: 700;
    color: #666;
    padding: 0 2px;
}
.mz-calendar-footer {}
.mz-calendar th, .mz-calendar td {
    width: 28px;
    height: 28px;
    text-align: center;
    box-sizing: border-box;
}
.mz-calendar th {
    font-weight: normal;
}
.mz-calendar td {
    cursor: pointer;
}
.mz-calendar td:hover, .mz-calendar-inrange {
    background: #eaf8fe;
}
.mz-calendar-lastmonth, .mz-calendar-nextmonth {
    color: #ccc;
}
.mz-calendar-today {
    border: solid 1px #1284e7;
    font-weight: bold;
    color: #1284e7;
}
.mz-calendar-selected {
    color: #fff;
    font-weight: bold;
    background: #1284e7 !important;
}
.mz-calendar-disabled {
    cursor: not-allowed !important;
    color: #bcbcbc !important;
    background: #f3f3f3 !important;
}
.mz-calendar-top {
    color: #616161;
    padding-bottom: 8px;
    margin-bottom: 8px;
    border-bottom: 1px solid #f3f3f3;
}
.mz-calendar-top a {
    display: inline-block;
    vertical-align: middle;
    height: 16px;
    cursor: pointer;
}
.mz-calendar-top a:hover {
    color: #77BDFB;
}
.mz-calendar-top a.on {
    font-weight: bold;
    color: #1284e7;
}
.mz-calendar-top i {
    content: '|';
    display: inline-block;
    width: 1px;
    margin: 0 10px;
    height: 16px;
    background: #616161;
    vertical-align: middle;
}
.mz-calendar-bottom {
    margin-top: 8px;
    padding-top: 8px;
    border-top: 1px solid #f3f3f3;
    text-align: right;
}
.mz-calendar-btn {
    display: inline-block;
    height: 22px;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    border-radius: 2px;
    -webkit-transition: all .3s ease;
    transition: all .3s ease;
    padding: 0 10px;
    line-height: 22px;
    color: #1284e7;
    margin-left: 5px;
}
.mz-calendar-btn:hover {
    color: #60B3FB;
}
.mz-calendar-btn:active {
    color: #006CCA;
}
.mz-calendar-btn.ok {
    background: #1284e7;
    color: #fff;
}
.mz-calendar-btn.ok:hover {
    background: #60B3FB;
}
.mz-calendar-btn.ok:active {
    background: #006CCA;
}
.mz-calendar-range {
    width: 423px;
}
.mz-calendar-separator {
    display: inline-block;
    vertical-align: middle;
    width: 31px;
    position: relative;
}
.mz-calendar-separator::before {
    content: "";
    position: absolute;
    width: 1px;
    height: 180px;
    background: #e0e0e0;
    left: 50%;
    top: 50%;
    margin-top: -90px;
}
.mz-calendar-separator::after {
    content: "至";
    position: absolute;
    width: 100%;
    text-align: center;
    height: 30px;
    line-height: 30px;
    background: #fff;
    top: 50%;
    margin-top: -15px;
}
.mz-calendar-year-panel {
    position: absolute;
    left: 0;
    top: 34px;
    width: 100%;
    height: 196px;
    background: #fff;
}
.mz-calendar-year-panel-year, .mz-calendar-year-panel-prev,.mz-calendar-year-panel-next {
    display: inline-block;
    text-align: center;
    width: 50%;
    height: 32px;
    line-height: 32px;
    vertical-align: middle;
    box-sizing: border-box;
}
.mz-calendar-year-panel-prev, .mz-calendar-year-panel-next {
    width: 100%;
    height: 18px;
    position: relative;
    display: block;
}
.mz-calendar-year-panel-prev::before,.mz-calendar-year-panel-next::before{
    content: '';
    display: inline-block;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -3px;
    margin-top: -3px;
}
.mz-calendar-year-panel-prev::before{
    border-bottom: 5px solid #999;
}
.mz-calendar-year-panel-next::before{
    border-top: 5px solid #999;
}
.mz-calendar-year-panel-year:hover,.mz-calendar-month-panel-month:hover, .mz-calendar-year-panel-prev:hover,.mz-calendar-year-panel-next:hover {
    background: #eaf8fe;
    cursor: pointer;
}
.mz-calendar-month-panel {
    position: absolute;
    left: 0;
    top: 34px;
    width: 100%;
    height: 196px;
    background: #fff;
}
.mz-calendar-month-panel-month {
    display: inline-block;
    text-align: center;
    width: 33.33%;
    height: 25%;
    line-height: 49px;
    vertical-align: middle;
    box-sizing: border-box;
}
.mz-calendar-panel-transition {
    transition: all 200ms ease;
    opacity: 1;
    transform: scale(1);
    transform-origin: center center;
}
.mz-calendar-panel-enter, .mz-calendar-panel-leave {
    opacity: 0;
    transform: scale(0)
}
</style>
