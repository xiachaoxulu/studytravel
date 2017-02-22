<!--日工时概况-饼状图-chart006-->
<template>
	<div>
		<div class="main"></div>
	</div>
</template>
<script>
export default {
	ready() {
		var echarts = require('echarts');
		// 基于准备好的dom，初始化echarts实例
		var myChart = echarts.init(this.$el.querySelector('.main'));
		// 绘制图表
		myChart.setOption({
			backgroundColor:"#fff",
			calculable:true,
			legend: {
				orient: 'vertical',
				x: 'right',
				y: 'center',
				data:['培训工时','调拨工时','加班工时','打卡工时']
			},
			series:[{
				name: '日工时饼状图',
				type: 'pie',
				radius: [30, 80],
				center: ['40%', 180],
				roseType: 'radius',
				startAngle: 90,
				data:[
					{value: 46,name: '培训工时'},
					{value: 50,	name: '调拨工时'},
					{value: 34,name: '加班工时'},
					{value: 50,name: '打卡工时'}
				]
			}],
		});
		myChart.showLoading();
		myChart.hideLoading();
	},
}
</script>
<style scoped>
.main{
	width: 410px;
	height:344px;
	background-color: #FFFFFF;
}
</style>
