<!--
* @Created Date       : 2016-08-28T15:36:04+08:00
* @Last Modified time : 2016-12-02T16:40:04+08:00
 -->


<template>
  <div class="ui-card ui-card-col1 ui-card-row1" orderid="5">
    <div class="ui-card-content ui-panel">
      <div class="ui-panel-title clear-both">
        <span>薪酬分布</span>
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
// require('echarts/lib/chart/pie');
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
    //   tooltip: {
    //     trigger: 'item',
    //     formatter: "{a} <br/>{b}: {c}人 (占比{d}%)"
    //   },
    //   legend: {
    //     orient: 'horizontal',
    //     x: 'left',
    //     y: 'bottom',
    //     data:['1000-2000元','2000-3000元','3000-4000元','4000-5000元','5000以上']
    //   },
    //   series: [
    //     {
    //       name:'薪酬分布',
    //       type:'pie',
    //       radius: ['30%', '50%'],
    //       center:['50%','40%'],
    //       avoidLabelOverlap: true,
    //       label: {
    //         normal: {
    //           show: true,
    //         },
    //         emphasis: {
    //           show: true,
    //           textStyle: {
    //             fontSize: '16',
    //             fontWeight: 'bold'
    //           }
    //         }
    //       },
    //       labelLine: {
    //         normal: {
    //           show: true
    //         }
    //       },
    //       data:[
    //         {value:40, name:'1000-2000元'},
    //         {value:20, name:'2000-3000元'},
    //         {value:33, name:'3000-4000元'},
    //         {value:20, name:'4000-5000元'},
    //         {value:10, name:'5000以上'}
    //       ]
    //     }
    //   ]
    // });
  }
}
</script>

<style scoped>

.echart{
  height: 250px;
}
</style>
