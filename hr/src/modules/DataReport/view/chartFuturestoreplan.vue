<!--
-title:未来门店规划-图表
-author:FE-wumingwei
-data:2016-06-07
-->
<template>
	<div class="container001" id="main001"></div>
</template>
<script>
// var echarts = require('echarts/lib/echarts');
// require('echarts/lib/chart/line');
// require('echarts/lib/component/tooltip');
// require('echarts/lib/component/title');
import store from '../store';
export default {
	ready(){
		// var echarts = require('echarts');
		// var myChart= echarts.init(document.getElementById('main001'));
		// // 绘制图表
		// myChart.setOption({
		// 	title: {
		// 		text: '未来门店规划',
		// 		textStyle: {
		// 			color: '#fff',
		// 			fontStyle: 'normal',
		// 			fontWeight: 'normal',
		// 			fontSize: 14,
		// 		},
		// 		left: '20px',
		// 		top: '10px'
		// 	},
		// 	tooltip: {
		// 		trigger: 'axis'
		// 	},
		// 	xAxis: {
		// 		type: 'category',
		// 		boundaryGap: false,
		// 		axisLabel: {
		// 			textStyle: {
		// 				color: '#fff'
		// 			},
		// 		},
		// 		axisLine: {
		// 			lineStyle: {
		// 				color: '#fff'
		// 			},
		// 		},
		// 		axisTick:{
		// 			lineStyle:{
		// 				color:'#fff'
		// 			},
		// 			inside:true,
		// 			length:3
		// 		},
		// 		splitLine: {
		// 			show: false
		// 		},
		// 		data: ['12月', '1月', '2月', '3月', '4月']
		// 	},
		// 	backgroundColor: '#27C9B4',
		// 	yAxis: {
		// 		axisLine: {
		// 			show:false
		// 		},
		// 		axisLabel: {
		// 			show:false
		// 		},
		// 		axisTick:{
		// 			show:false,
		// 		},
		// 		splitLine: {
		// 			show: false
		// 		}
		// 	},
		// 	series: [{
		// 		name: '门店数',
		// 		type: 'line',
		// 		lineStyle:{
		// 			normal:{
		// 				color:'#fff'
		// 			}
		// 		},
		// 		itemStyle:{
		// 			normal:{
		// 				borderColor:'#fff',
		// 				color:'red'
		// 			}
		// 		},
		// 		symbol:'emptyCircle',
		// 		data: [5, 20, 36, 10, 10]
		// 	}]
		// });
	}
};
</script>
<style scoped>
.container001{
	width: 410px;
	height: 255px;
	background-color: #FFFFFF;
	margin:0;
}
</style>
