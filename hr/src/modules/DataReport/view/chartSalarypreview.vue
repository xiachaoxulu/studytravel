<!---薪水概况-折线图-chart005-->
<template>
		<div id="salary"></div>
</template>
<script>
export default {
	ready() {
		var echarts = require('echarts');
		// 基于准备好的dom，初始化echarts实例
		var myChart = echarts.init(document.getElementById('salary'));
		// 绘制图表
		myChart.setOption({
			title: {
				text: '薪水概览',
				textStyle: {
					color: '#fff',
					fontStyle: 'normal',
					fontWeight: 'normal',
					fontSize: 14,
				},
				left: '10px',
				top: '10px'
			},
			legend: {
				show:true,
				data:['王经理','宋经理','李经理','苏经理','均线'],
				textStyle: {
					color: '#fff'
				},
				bottom:'2%',
				x:'center',

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
				},
				axisTick:{
					lineStyle:{
						color:'#fff'
					},
					inside:true,
					length:3
				},
				axisLine: {
					lineStyle: {
						color: '#fff'
					},
				},
				splitLine: {
					show: false
				},
				data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月']
			},
			backgroundColor: '#27C9B4',
			yAxis: {
				axisLine: {
					show:false
				},
				axisLabel: {
					show:false
				},
				axisTick:{
					show:false
				},
				splitLine: {
					show: false
				}
			},
			series: [
				{
					name: '王经理',
					type: 'line',
					data: [1000, 1500, 2000, 2500, 3000, 3500]
				},
				{
					name: '宋经理',
					type: 'line',
					data: [1500, 2000, 2500, 3000, 3500, 4000]
				},
				{
					name: '李经理',
					type: 'line',
					data: [2000, 2500, 3000, 3500, 4000, 4500]
				},
				{
					name: '苏经理',
					type: 'line',
					data: [2500, 3000, 3500, 4000, 4500, 5000]
				},{
					name: '均线',
					type: 'line',
					data: [3500, 4500, 5500, 6500, 7500, 8500]
				}]
			});
	}
};
</script>
<style scoped>
#salary{
	width: 410px;
	height: 303px;
}
</style>
