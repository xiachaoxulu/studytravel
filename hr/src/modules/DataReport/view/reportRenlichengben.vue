<!--
* @Created Date       : 2016-08-28T15:36:04+08:00
* @Last Modified time : 2016-12-02T16:40:11+08:00
 -->


<template>
  <div class="ui-card ui-card-col2 ui-card-row1" orderid="2">
    <div class="ui-card-content ui-panel">
      <div class="ui-panel-title clear-both">
        <span>人力成本</span>
        <div class="pull-right">
          <v-dropdown placement="dropleft">
            <div data-toggle="dropdown"><i class="icon-tool icon-tool-expandmore"></i></div>
            <ul slot="dropdown-menu" class="dropdown-menu">
              <!-- <li>
              <a name="dropdown-item" href="javascript:;" @click="cardSetting(true)">数据设置</a>
            </li> -->
            <li>
              <a name="dropdown-item" href="javascript:;" @click="$dispatch('cardDelete','cardStore')">删除卡片</a>
            </li>
            <li role="separator" class="divider"></li>
            <li>
              <a name="dropdown-item" href="javascript:;" @click="$dispatch('cardManage','cardStore')">管理卡片</a>
            </li>
          </ul>
        </v-dropdown>
      </div>

    </div>

    <div class="ui-panel-content">
      <div class="echart"></div>
    </div>
  </div>

</div>
</template>
<script>
// // 引入 ECharts 主模块
// var echarts = require('echarts/lib/echarts');
// // 引入图
// require('echarts/lib/chart/bar');
// require('echarts/lib/chart/line');
// // 引入提示框和标题组件
// require('echarts/lib/component/tooltip');
// require('echarts/lib/component/legend');

export default {
  data(){
    return{
    }
  },
  components:{

  },
  methods:{

  },
  ready(){

    // var myChart = echarts.init(this.$el.querySelector('.echart'));
    // // 绘制图表
    // myChart.setOption({
    //   backgroundColor: '#27C9B4',
    //   tooltip: {
    //     trigger: 'axis',
    //     axisPointer : {            // 坐标轴指示器，坐标轴触发有效
    //       type : 'shadow',        // 默认为直线，可选为：'line' | 'shadow'
    //       shadowStyle:{
    //         color:'#fff',
    //         opacity:0.2
    //       }
    //     }
    //   },
    //   legend: {

    //     x: 'center',
    //     y: 'bottom',
    //     data:['上周','预估','薪酬','营业额']
    //   },
    //   // toolbox: {
    //   //     show: true,
    //   //     right:'20px',
    //   //     feature: {
    //   //         saveAsImage: {}
    //   //     },
    //   //     iconStyle:{
    //   //         normal:{
    //   //             borderColor:'#fff'
    //   //         },
    //   //         emphasis:{
    //   //             borderColor:'#fff'
    //   //         },
    //   //     }
    //   // },
    //   grid: {
    //     top:'3%',
    //     left: '0%',
    //     right: '0%',
    //     bottom: '10%',
    //     containLabel: true
    //   },
    //   xAxis:  {
    //     type: 'category',
    //     data: ['周一','周二','周三','周四','周五','周六','周日'],
    //     axisLabel: {
    //       textStyle: {
    //         color: 'white'
    //       },
    //     },
    //     axisLine: {
    //       lineStyle: {
    //         color: 'white'
    //       },
    //     },
    //     axisTick:{
    //       lineStyle: {
    //         color: 'white'
    //       },
    //     },
    //     splitLine:{
    //       show:false,
    //     }
    //   },
    //   yAxis: {
    //     type: 'value',
    //     max:30,
    //     axisLabel: {
    //       formatter: '{value} w',
    //       textStyle: {
    //         color: 'white'
    //       },

    //     },
    //     axisLine: {
    //       lineStyle: {
    //         color: 'white'
    //       },
    //     },
    //     axisTick:{
    //       lineStyle: {
    //         color: 'white'
    //       },
    //     },
    //     splitLine:{
    //       lineStyle: {
    //         color: '#23b5a2',
    //       },

    //     }
    //   },
    //   series: [
    //     {
    //       name:'上周',
    //       type:'line',
    //       barWidth:'20',
    //       itemStyle:{
    //         normal:{
    //           color:'#333',
    //           borderColor:'#fff',

    //         }
    //       },
    //       lineStyle:{
    //         normal:{
    //           color:'#fff',
    //           opacity:0.5
    //         }
    //       },
    //       data:[15, 13, 17, 16, 11, 10, 15]
    //     },
    //     {
    //       name:'预估',
    //       type:'line',
    //       barWidth:'20',
    //       itemStyle:{
    //         normal:{
    //           color:'#000',
    //           borderColor:'#000',
    //           opacity:0.2
    //         }
    //       },
    //       lineStyle:{
    //         normal:{
    //           color:'#000',
    //           opacity:0.2
    //         }
    //       },
    //       data:[17, 15, 22, 20, 13, 12, 18]
    //     },
    //     {
    //       name:'薪酬',
    //       type:'bar',
    //       barWidth:'15',
    //       data:[11, 11, 15, 13, 12, 13, 10],
    //       itemStyle:{
    //         normal:{
    //           color:'#eafaf8',
    //         }
    //       },
    //     },
    //     {
    //       name:'营业额',
    //       type:'bar',
    //       barWidth:'15',
    //       data:[13, 10, 18, 13, 15, 11, 13],
    //       itemStyle:{
    //         normal:{
    //           color:'#a9e9e1',
    //         }
    //       },
    //     }
    //   ]
    // });
  }
}
</script>

<style scoped>
.ui-panel{
  background: #27c9b4;
  color: #fff;
}
.echart{
  height: 260px;
}
</style>
