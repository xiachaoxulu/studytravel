<!--日工时概况-离散图-->
<template>
	<div class="right-charts">
		<div class="charts-title-container">
			<span class="charts-title">{{title}}</span>
			<select class="charts-select">
				<option>规则1</option>
				<option>考勤规则1</option>
			</select>
		</div>
		<div class="main"></div>
	</div>
</template>
<script>
export default {
	data(){
		return{
			title:"日工时概览"
		}
	},
	ready() {
		var echarts = require('echarts');
		// 基于准备好的dom，初始化echarts实例
		var myChart= echarts.init(this.$el.querySelector('.main'));


        // 加载数据
        this.$Tool.ajax({
            url:'api.DataReport.getCardList',
            success(data,res){


            },
            error(res){
                ///console.log(res)
            }
        })




		// 配置图表
		// var rule_data={};
		// var now="2016/06/08";
		// rule_data.sDate=now;
		//get方法请求考勤规则
		// function set_rule(){
		// 	$.ajax({
		// 		type:"get",
		// 		url:"http://192.168.1.42:8080/acewill/checkwork/checkworkrule/selectall.htm?orgID=92&orgType=store&checkworkName=%E8%A7%84%E5%88%99",
		// 		success:function(data){
		// 			var result=data.result;
		// 			for(var i=0;i<result.length;i++){
		// 				console.log(result[i].ID);
		// 				console.log(result[i].checkworkName);
		// 				if(result[i].checkworkName==$('.charts-select').value){
		// 					rule_data.checkworkId=result[i].ID;
		// 				}
		// 			}
		// 		}
		// 	});
		// 	console.log(rule_data.checkworkId);
		// 	$.ajax({
		// 		type: "POST",
		// 		url: "http://192.168.1.6:8080/Facade-APP/acewill/common/countDayWorkTimeReportInfo.htm",
		// 		data: "rule_data",
		// 		success: function(data){
		// 			console.log("请求成功！");
		// 			console.log(data.result);
		// 		}
		// 	});
		// }
		//在select中选择完之后，把option中的数值提取出来，等待给后台post数据
		// $(".charts-select").change(function(){
		// 	console.log(this.value);
		// 	set_rule();
		// });

		//图表相关配置
		myChart.setOption({
			backgroundColor:"#6269ed",
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
			tooltip : {
				trigger: 'axis',
				axisPointer:{
					type:'line'
				}
			},
			legend: {
				data:['小时工','全职','兼职','计件'],
				bottom:'1%',
				right:'0',
				textStyle:{
					color:'#fff',
					fontSize:13,
					fontWeight:50
				},
				itemHeight:6,
				itemWidth:6
			},
			grid: {
				width:"90%",
				height:"58%",
				top:"30%",
				bottom:'3%',
				left:'10%',
				rigth:0,
				containLabel:true
			},
			xAxis:
			{
				name:'工作年限',
				nameLocation:'start',
				nameGap:6,
				nameTextStyle:{
				color:"#fff",
				fontSize:"12",
				fontWeight:"10"
				},
				type : 'category',
				splitLine:{show: false},
				axisTick: {show: false},
				axisLine: {
					show: true,
					lineStyle:{
						color:"#fff",
						width:0.5
					}
				},
				axisLabel:{
					textStyle:{
						color:"#fff",
						fontSize:12,
						fontWeight:50
					},
					interval:0
				},
				data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']/////////////////////////////////////////////
			},
			yAxis: [{
				axisLine:{show: false},
				axisLabel:{show: false},
				axisTick:{show: false},
				splitLine:{show: false}
			}],
			series : [
				{
					name:'小时工',
					type:'scatter',
					symbolSize:"6",
					itemStyle:{normal:{color:'#fff'}},
					data:[6, 4, 8.2, 10.0, 1.3, 8.1, 8.2,9.4, 9.3,11, 10.2, 8.0],////////////////////////////////////
					markLine:{
						label:{
							normal:{
								formatter:'均线\n(9.3小时)',
								position:'start',
								textStyle: {align:'right'}
							}
						},
						lineStyle:{
							normal: {type: 'solid',color:'#ff0000'}
						},
						data:[
							[
							{coord: ['1月',10],symbol:'none'},
							{coord: ['12月',10],symbol:'none'}
						],
						[
						{coord: ['1月',8],symbol:'none'},
						{coord: ['12月',8],symbol:'none'}
					]
					]}
					},
					{
						name:'全职',
						type:'scatter',
						symbolSize:"6",
						itemStyle:{
							normal:{
								color:"#28c7b3"
							}
						},
						data:[13, 12, 15, 9.3, 12, 10.5, 1.3,15.0, 11.9, 9.3, 11.2,10.3],
					},
					{
						name:'兼职',
						type:'scatter',
						symbolSize:"6",
						itemStyle:{
							normal:{
								color:"#f0e02b"
							}
						},
						data:[10, 9.9, 8.3, 11.3, 12.6, 12.8,8.0, 8, 9.2, 9.6, 8.6,10.3],
					},
					{
						name:'计件',
						type:'scatter',
						symbolSize:"6",
						itemStyle:{
							normal:{
								color:"#f0e02b"
							}
						},
						data:[9.5, 10.2, 9.1, 10.3, 11.6, 11.8,9.0, 10.3, 9.5, 9.8, 8.9,11.3],
					},
				]
			})
		}
	}
	</script>
	<!-- 图表样式设置 -->
	<style scoped>
	.right-charts{
		margin:6px;
		width:410px;
		height:886px;
		background-color: #fff;
		overflow: hidden;
	}
	.charts-title-container{
		width:100%;
		height:62px;
		display: flex;
		justify-content: space-between;
		line-height: 62px;
	}
	.charts-title{
		font-size: 14px;
		margin-left:23px;
		font-weight: 300;
	}
	.charts-select{
		width:147px;
		height:27px;
		margin: 17px 13px 17px 0;
	}
	.main{
		width: 410px;
		height: 294px;
	}
	</style>
