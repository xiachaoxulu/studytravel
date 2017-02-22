<template>

	<div class="iTimePicker" >
		<div class="input-group clockpicker">
            <input readonly type="text" class="form-control" v-model="time" @focus="showTimePicker(true)">
			<span class="input-group-addon">
			<i class="material-icons pointer md-16" @click="showTimePicker(true)">access_time</i>
			</span>
		</div>
		<div class="popover clockpicker-popover bottom clockpicker-align-left" v-show="showPopcover">
			<!-- <div v-el:arrow class="arrow"></div> -->
			<div class="popover-title">
				<span @click="toogleTime('h')" :class="['clockpicker-span-hours', {'text-primary':showH}]">{{time|timeSplit 0}}</span>
				:
				<span @click="toogleTime('m')" :class="['clockpicker-span-minutes', {'text-primary':showM}]">{{time|timeSplit 1}}</span>
				<!-- <span class="clockpicker-span-am-pm"></span> -->
			</div>
			<div class="popover-content">
				<div class="clockpicker-plate">
					<div class="clockpicker-dial clockpicker-hours" v-show="showH" @click="selectTime($event,'h')">
						<div class="clockpicker-name">小时</div>
						<div class="clockpicker-circle"></div>
						<div class="clockpicker-tick" time="00" style="left: 87px; top: 7px;">00</div>
						<div class="clockpicker-tick" time="01" style="left: 114px; top: 40.2346px; font-size: 120%;">1</div>
						<div class="clockpicker-tick" time="02" style="left: 133.765px; top: 60px; font-size: 120%;">2</div>
						<div class="clockpicker-tick" time="03" style="left: 141px; top: 87px; font-size: 120%;">3</div>
						<div class="clockpicker-tick" time="04" style="left: 133.765px; top: 114px; font-size: 120%;">4</div>
						<div class="clockpicker-tick" time="05" style="left: 114px; top: 133.765px; font-size: 120%;">5</div>
						<div class="clockpicker-tick" time="06" style="left: 87px; top: 141px; font-size: 120%;">6</div>
						<div class="clockpicker-tick" time="07" style="left: 60px; top: 133.765px; font-size: 120%;">7</div>
						<div class="clockpicker-tick" time="08" style="left: 40.2346px; top: 114px; font-size: 120%;">8</div>
						<div class="clockpicker-tick" time="09" style="left: 33px; top: 87px; font-size: 120%;">9</div>
						<div class="clockpicker-tick" time="10" style="left: 40.2346px; top: 60px; font-size: 120%;">10</div>
						<div class="clockpicker-tick" time="11" style="left: 60px; top: 40.2346px; font-size: 120%;">11</div>
						<div class="clockpicker-tick" time="12" style="left: 87px; top: 33px; font-size: 120%;">12</div>
						<div class="clockpicker-tick" time="13" style="left: 127px; top: 17.718px;">13</div>
						<div class="clockpicker-tick" time="14" style="left: 156.282px; top: 47px;">14</div>
						<div class="clockpicker-tick" time="15" style="left: 167px; top: 87px;">15</div>
						<div class="clockpicker-tick" time="16" style="left: 156.282px; top: 127px;">16</div>
						<div class="clockpicker-tick" time="17" style="left: 127px; top: 156.282px;">17</div>
						<div class="clockpicker-tick" time="18" style="left: 87px; top: 167px;">18</div>
						<div class="clockpicker-tick" time="19" style="left: 47px; top: 156.282px;">19</div>
						<div class="clockpicker-tick" time="20" style="left: 17.718px; top: 127px;">20</div>
						<div class="clockpicker-tick" time="21" style="left: 7px; top: 87px;">21</div>
						<div class="clockpicker-tick" time="22" style="left: 17.718px; top: 47px;">22</div>
						<div class="clockpicker-tick" time="23" style="left: 47px; top: 17.718px;">23</div>
					</div>
					<div class="clockpicker-dial clockpicker-minutes" v-show="showM" @click="selectTime($event,'m')">
						<div class="clockpicker-name">分钟</div>
						<div class="clockpicker-tick" time="00" style="left: 87px; top: 7px; font-size: 120%;">00</div>
						<!-- <div class="clockpicker-tick" time="05" style="left: 127px; top: 17.718px; font-size: 120%;">05</div> -->
						<!-- <div class="clockpicker-tick" time="10" style="left: 156.282px; top: 47px; font-size: 120%;">10</div> -->
						<!-- <div class="clockpicker-tick" time="15" style="left: 167px; top: 87px; font-size: 120%;">15</div> -->
						<!-- <div class="clockpicker-tick" time="20" style="left: 156.282px; top: 127px; font-size: 120%;">20</div> -->
						<!-- <div class="clockpicker-tick" time="25" style="left: 127px; top: 156.282px; font-size: 120%;">25</div> -->
						<div class="clockpicker-tick" time="30" style="left: 87px; top: 167px; font-size: 120%;">30</div>
						<!-- <div class="clockpicker-tick" time="35" style="left: 47px; top: 156.282px; font-size: 120%;">35</div> -->
						<!-- <div class="clockpicker-tick" time="40" style="left: 17.718px; top: 127px; font-size: 120%;">40</div> -->
						<!-- <div class="clockpicker-tick" time="45" style="left: 7px; top: 87px; font-size: 120%;">45</div> -->
						<!-- <div class="clockpicker-tick" time="50" style="left: 17.718px; top: 47px; font-size: 120%;">50</div> -->
						<!-- <div class="clockpicker-tick" time="55" style="left: 47px; top: 17.718px; font-size: 120%;">55</div> -->
					</div>
				</div>
				<span class="clockpicker-am-pm-block"></span>
			</div>
			<button class="btn btn-sm btn-default btn-block clockpicker-button" @click="showTimePicker(false)">完成</button>
		</div>
	</div>

</template>

<script>
import EventListener from 'libs/utils/EventListener'

export default{
	data(){
		return {
			showH:true,// 显示h list
			showM:false,// 显示 m list
			showPopcover:false, // 显示 popcover
		}
	},
	filters:{
		timeSplit(t,i){
			console.log(t)
			if(!t || typeof(t)!='string') return;
			return t.split(':')[i] || '00'
		}
	},
	props:{
		// 时间
		time:{
			// type:String,
			twoWay:true,
			default:'00:00'
		},
		// 格式
		format:{
			type:String,
			default:'hh:mm'
		},
		// 时间格式
		timeStyle:{
			type:Number,
			default:24
		},
		// 分钟最小间隔
		minuteInterval:{
			type:Number,
			default:15
		}
	},
	methods:{
		showTimePicker(t){

			this.showPopcover = t;
			console.log(this.showPopcover)

			if (t) {
				this.showH = true;
				this.showM = false;
			}


			/* 位置调整 */

            function getPosition(el){

                var _parent = document.querySelector('body');

                var _elRect = el.getBoundingClientRect();
                var _parentRect = _parent.getBoundingClientRect();

                return {
                    width:el.offsetWidth,
                    height:el.offsetHeight,
                    left: _elRect.left-_parentRect.left,
                    top: _elRect.top-_parentRect.top,
                    right: -(_elRect.right-_parentRect.right),
                    bottom:-(_elRect.bottom-_parentRect.bottom)
                }

            }


            this.$nextTick(()=>{

            	let pop = this.$el.querySelector('div.popover');
	            var elPos = getPosition(this.$el);
	            var popPos =  pop.getBoundingClientRect();

	            pop.style.left=elPos.left+'px';
	            pop.style.top=(elPos.top+elPos.height)+'px';

	            if(elPos.bottom>popPos.height){
		            pop.style.top=(elPos.top+elPos.height)+'px';
		            pop.style.bottom='auto';
	            }else{
		            pop.style.top='auto';
		            pop.style.bottom='20px';
	            }

	            if(elPos.right< elPos.right - (popPos.width-elPos.width)){
		            pop.style.left='auto'
		            pop.style.right='20px';
	            }else{
		            pop.style.left=elPos.left+'px';
		            pop.style.right='auto';
	            }

            })



		},
		// 切换 h/m 列表
		toogleTime(type){

			if(type=='h'){
				this.showH = true;
				this.showM = false;
			}
			else if(type=='m'){
				this.showH = false;
				this.showM = true;
			}

		},
		// 选择时间
		selectTime(e,t){

			console.log(e.target.getAttribute('time'))

			if(e.target.className=='clockpicker-tick'){

				let time = this.time.split(':');


				if(t=='h'){
					time[0] = e.target.getAttribute('time');

					// 选完h，自动切换至m
					this.toogleTime('m');
				}

				else if(t=='m'){
					time[1] = e.target.getAttribute('time')

					// 选完m，自动关闭

					this.showTimePicker(false)
				}

				this.time = time.join(":")


			}

		}
	},
    ready() {
      const el = this.$el
      this._closeEvent = EventListener.listen(window, 'click', (e)=> {
        if (!el.contains(e.target)) this.showPopcover = false;
      })
    },
    beforeDestroy() {
      if (this._closeEvent) this._closeEvent.remove()
    }

}


</script>

<style scoped>
.popover{
	position: fixed;
    z-index: 10000;
}
.iTimePicker{
	display: inline-block;
	position: relative;
	width: 110px;
}

/*!
 * ClockPicker v{package.version} for Bootstrap (http://weareoutman.github.io/clockpicker/)
 * Copyright 2014 Wang Shenwei.
 * Licensed under MIT (https://github.com/weareoutman/clockpicker/blob/gh-pages/LICENSE)
 */
.clockpicker-popover{
	display: block;
	top: 30px;
}
.clockpicker .input-group-addon {
	cursor: pointer;
}
.clockpicker-moving {
	cursor: move;
}
.clockpicker-align-left.popover > .arrow {
	left: 25px;
}
.clockpicker-align-top.popover > .arrow {
	top: 17px;
}
.clockpicker-align-right.popover > .arrow {
	left: auto;
	right: 25px;
}
.clockpicker-align-bottom.popover > .arrow {
	top: auto;
	bottom: 6px;
}
.clockpicker-popover .popover-title {
	background-color: #fff;
	color: #999;
	font-size: 24px;
	font-weight: bold;
	line-height: 30px;
	text-align: center;
}
.clockpicker-popover .popover-title span {
	display: inline-block;
	cursor: pointer;
	background: #eee;
	border-radius: 6px;
	padding: 5px;
	min-width: 50px;
	min-height: 40px;
}
.clockpicker-popover .popover-content {
	background-color: #f8f8f8;
	padding: 12px;
}
.popover-content:last-child {
	border-bottom-left-radius: 5px;
	border-bottom-right-radius: 5px;
}
.clockpicker-plate {
	background-color: #fff;
	border: 1px solid #ccc;
	border-radius: 50%;
	width: 200px;
	height: 200px;
	overflow: visible;
	position: relative;
	/* Disable text selection highlighting. Thanks to Hermanya */
	-webkit-touch-callout: none;
	-webkit-user-select: none;
	-khtml-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
}
.clockpicker-canvas,
.clockpicker-dial {
	width: 200px;
	height: 200px;
	position: absolute;
	left: -1px;
	top: -1px;
}
.clockpicker-name{
	position: absolute;
	z-index: 0;
	left: 75px;
	top: 75px;
	width: 50px;
	height: 50px;
	border-radius: 50px;
	text-align: center;
	line-height: 50px;
	border: 1px solid #ddd;
}
.clockpicker-circle{
	position: absolute;
	z-index: 0;
	left: 32px;
	top: 32px;
	width: 136px;
	height: 136px;
	border-radius: 136px;
	border: 1px solid #efefef;
}

.clockpicker-minutes {
	/*visibility: hidden;*/
}
.clockpicker-tick {
	border-radius: 50%;
	color: #666;
	line-height: 26px;
	text-align: center;
	width: 26px;
	height: 26px;
	position: absolute;
	cursor: pointer;
}
.clockpicker-tick.active,
.clockpicker-tick:hover {
	background-color: rgb(192, 229, 247);
	background-color: rgba(0, 149, 221, .25);
}
.clockpicker-button {
	background-image: none;
	background-color: #fff;
	border-width: 1px 0 0;
	border-top-left-radius: 0;
	border-top-right-radius: 0;
	margin: 0;
	padding: 10px 0;
}
.clockpicker-button:hover {
	background-image: none;
	background-color: #ebebeb;
}
.clockpicker-button:focus {
	outline: none!important;
}
.clockpicker-dial {
	-webkit-transition: -webkit-transform 350ms, opacity 350ms;
	-moz-transition: -moz-transform 350ms, opacity 350ms;
	-ms-transition: -ms-transform 350ms, opacity 350ms;
	-o-transition: -o-transform 350ms, opacity 350ms;
	transition: transform 350ms, opacity 350ms;
}
.clockpicker-dial-out {
	opacity: 0;
}
.clockpicker-hours.clockpicker-dial-out {
	-webkit-transform: scale(1.2, 1.2);
	-moz-transform: scale(1.2, 1.2);
	-ms-transform: scale(1.2, 1.2);
	-o-transform: scale(1.2, 1.2);
	transform: scale(1.2, 1.2);
}
.clockpicker-minutes.clockpicker-dial-out {
	-webkit-transform: scale(.8, .8);
	-moz-transform: scale(.8, .8);
	-ms-transform: scale(.8, .8);
	-o-transform: scale(.8, .8);
	transform: scale(.8, .8);
}
.clockpicker-canvas {
	-webkit-transition: opacity 175ms;
	-moz-transition: opacity 175ms;
	-ms-transition: opacity 175ms;
	-o-transition: opacity 175ms;
	transition: opacity 175ms;
}
.clockpicker-canvas-out {
	opacity: 0.25;
}
.clockpicker-canvas-bearing,
.clockpicker-canvas-fg {
	stroke: none;
	fill: rgb(0, 149, 221);
}
.clockpicker-canvas-bg {
	stroke: none;
	fill: rgb(192, 229, 247);
}
.clockpicker-canvas-bg-trans {
	fill: rgba(0, 149, 221, .25);
}
.clockpicker-canvas line {
	stroke: rgb(0, 149, 221);
	stroke-width: 1;
	stroke-linecap: round;
	/*shape-rendering: crispEdges;*/
}
.clockpicker-button.am-button {
	margin: 1px;
	padding: 5px;
	border: 1px solid rgba(0, 0, 0, .2);
	border-radius: 4px;

}
.clockpicker-button.pm-button {
	margin: 1px 1px 1px 136px;
	padding: 5px;
	border: 1px solid rgba(0, 0, 0, .2);
	border-radius: 4px;
}


</style>
