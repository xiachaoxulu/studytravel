<!--动态数据图表-chart004-->
<template>
  <div id="moving"></div>
</template>
<script>
export default {
  ready() {
    var echarts = require('echarts');
    // 基于准备好的dom，初始化echarts实例
    var myChart= echarts.init(document.getElementById('moving'));
    // 绘制图表
    myChart.setOption({
      title: {
        text: '动态数据',
        textStyle:{
          color:'#fff',
          fontSize:14
        },
        x:10,
        y:10
      },
      tooltip: {
        trigger: 'axis'
      },
      //绘制坐标轴；
      xAxis: {
        type: 'category',
        boundaryGap: false,
        axisTick: {
          lineStyle:{
              color:'#fff'
          },
          inside:true,
          length:3
        },
        //网格竖线
        splitLine:{show:false},
        //横轴数据
        data:['1月', "2月", "3月", "4月", "5月"],
        //横轴文字
        axisLabel: {textStyle: {color:"#fff"}},
        //横轴线
        axisLine:{
          lineStyle:{
              color:"#fff"
          }
        },
      },

      //绘制纵轴线；
      yAxis: {
        //纵轴线
        axisLine: {show: false},
        //纵轴刻度
        axisTick: {show: false},
        //纵轴文字
        axisLabel: {show: false},
        //网格横线
        splitLine:{show:false},
      },
      backgroundColor:"#27C9B4",
      //线性数据配置
      series: [
        {
          name: '薪资',
          type: 'line',
          lineStyle:{
            normal:{
              color:'#fff'
            }
          },
          itemStyle:{
            normal:{
              borderColor:'#fff'
            }
          },
          data: [2000, 2069, 3236, 4256, 5036]
        }]
      });
    }
  }
</script>
<style scoped>
  #moving{
    width: 410px;
    height: 255px;
  }
</style>
