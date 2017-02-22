<!--
-title:人力成本概览-图表
-author:wumingwei
-data:2016-06-07
-->
<template>
	<div  id="costpreview"></div>
</template>
<script>
export default {
	ready() {
		var echarts = require('echarts');
		// 基于准备好的dom，初始化echarts实例
		var myChart = echarts.init(document.getElementById('costpreview'));
		// 绘制图表
		myChart.setOption({
			backgroundColor: '#27C9B4',
			title: {
				text: '人力成本概览',
				x: "10",
				y: "10",
				textStyle: {
					color: '#fff',
					fontStyle: 'normal',
					fontWeight: 'normal',
					fontSize: 14,
				},
			},
			tooltip: {
				trigger: 'axis'
			},
			xAxis: {
				type: 'category',
				boundaryGap: false,
				axisLabel: {
					textStyle: {
						color: '#fff'
					},
					axisTick:{
						lineStyle:{
							color:'#fff'
						},
						inside:true,
						length:3
					},
				},
				axisLine: {
					lineStyle: {
						color: '#fff',
						width:1
					},
				},
				axisTick: {
					lineStyle: {
						color: '#fff',
						type:"solid",
						width:1,
					},
					inside:true,
					length:3
				},
				splitLine: {show: false},
				data: ['12月','1月','2月','3月','4月']
			},
			yAxis: {
				axisLine: {show: false},
				axisLabel: {show: false},
				axisTick:{show: false},
				splitLine: {show: false},
			},
			series: [{
				name: '本地',
				type: 'line',
				symbol: 'emptyCircle',
				itemStyle:{
					normal:{
						color:"#fff",
						opacity:"1",
						borderColor:"#fff",
						borderWidth:1,
					}
				},
				data:['1000','1230','1030','1090','1100']
			},
			{
				name: '北京地区',
				type: 'line',
				symbol: 'emptyCircle',
				itemStyle:{
					normal:{
						borderWidth:1
					}
				},
					data:['1200','1400','1410','1500','1652']
				}]
		});
	},
}
</script>
<style scoped>
#costpreview{
	width: 410px;
	height: 278px;
}
</style>
