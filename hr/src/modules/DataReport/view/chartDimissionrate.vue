<!--
-title:离职率-图表
-author:FE-wumingwei
-data:2016-06-10
-->
<template>
		<div id="chart"></div>
</template>
<script>
export default {
  ready(){
		var echarts = require('echarts');
		// 基于准备好的dom，初始化echarts实例
		var myChart= echarts.init(document.getElementById('chart'));
	    myChart.setOption({
				backgroundColor: '#27C9B4',
				title: {
					text: '离职率',
					x: "10",
					y: "10",
					textStyle: {
						color: '#fff',
						fontStyle: 'normal',
						fontWeight: 200,
						fontSize: 14
					},
				},
				tooltip: {
					trigger: 'axis'
				},
				legend: {
					data:['本地','北京区域均线'],
					bottom:'2%',
					x:'center',
					textStyle: {
						color: '#fff',
						fontStyle: 14,
						fontWeight: 200,
						fontSize: 14
					},

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
					lineStyle:{
							normal:{
								color:'#fff'
							}
					},
					data:['100','123','103','109','110']
				},
				{
					name: '北京区域均线',
					type: 'line',
					symbol: 'emptyCircle',
					data:['120','130','150','140','136']
				}
			]
	    });
  }
};
</script>
<style scoped>
	#chart{
		width: 410px;
		height: 300px;
		background-color: #FFFFFF;
		margin:0;
	}
</style>
