<template>
  <!-- 模块 vue -->
  <div class="ui-module app-report" >
    <!-- 模块功能条 -->
    <header class="ui-module-navbar pos-topbar-fixed">
      <app-header :show="showNavbar"></app-header>
    </header>
    <!-- 模块主内容 -->
    <section class="ui-module-content pos-content demoShow">
      <ui-scrollview>
        <!-- <ui-dragdrop :order.sync="order" itemselector="div.ui-card"> -->
        <div class="ui-module-row ui-card-list clear-both">
          <report-overview></report-overview>
          <report-renlichengben></report-renlichengben>
          <report-xinchouyingye></report-xinchouyingye>
          <report-age></report-age>
          <report-payment></report-payment>

          <div class="ui-card ui-card-col3 ui-card-row1" orderid="4">
            <div class="ui-card-content ui-panel">
              <div class="ui-panel-title clear-both">
                <span>项目所有图表</span>
              </div>
              <div class="ui-panel-content001">
                  <chart-futurestoreplan></chart-futurestoreplan>
                  <chart-humancostpreview></chart-humancostpreview>
                  <chart-dimissionrate></chart-dimissionrate>
                  <chart-movingdata></chart-movingdata>
                  <chart-salarypreview></chart-salarypreview>
                  <chartpie-dailyworktimepreview></chartpie-dailyworktimepreview>
                  <chart-dailyworktimepreview></chart-dailyworktimepreview>
                </div>
              </div>
            </div>
          </div>
          <!-- </ui-dragdrop> -->
        </ui-scrollview>
      </section>
    </div>
  </template>

  <script>

  import store from '../store'

  import reportOverview from './reportOverview'
  import reportRenlichengben from './reportRenlichengben'
  import reportXinchouyingye from './reportXinchouyingye'

  //年龄分布饼状图
  import reportAge from './reportAge'
  import reportPayment from './reportPayment'

  //未来门店规划图表
  import chartFuturestoreplan from './chartFuturestoreplan'
  //日工时概览
  import chartDailyworktimepreview from './chartDailyworktimepreview'
  //离职率图表
  import chartDimissionrate from './chartDimissionrate'
  //人力成本预览
  import chartHumancostpreview from './chartHumancostpreview'
  //动态数据图表
  import chartMovingdata from './chartMovingdata'
  //日工时饼状图表
  import chartpieDailyworktimepreview from './chartpieDailyworktimepreview'
  //薪资预览
  import chartSalarypreview from './chartSalarypreview'
  export default {
    data(){
      return{
        state:store.state,
        order:[],
        showNavbar:false,
        showSidebar:false,
        sliderView:'',
        sliderViewTitle:'',
        sliderViewLayOut:'header-content'
      }
    },
    components:{
      reportOverview,
      reportRenlichengben,
      reportXinchouyingye,
      reportAge,
      reportPayment,

      chartFuturestoreplan,
      chartDailyworktimepreview,
      chartDimissionrate,
      chartHumancostpreview,
      chartMovingdata,
      chartpieDailyworktimepreview,
      chartSalarypreview

    },
    methods:{

    },
    ready(){
      var vm = this;
      setTimeout(function(){
        vm.showNavbar = true;
      },500)
    }
  }
  </script>

  <style>
  .ui-card-list{
  }
  .ui-card{
    float: left;
    padding: 5px;
  }
  .ui-card-col1{
    width: 33.3%;
  }
  .ui-card-col2{
    width: 66.6%;
  }
  .ui-card-col3{
    width: 100%;
  }
  .ui-card-row1{
    height: 350px;
  }
  .ui-card-row2{
    height: 700px;
  }
  .ui-card ._icon_more{
    cursor:pointer;
  }
  .ui-card ._icon_more:hover{
    color:#27c9b4;
  }
  .ui-card-content{
    height: 100%;
  }
  /* report-card-overview */
  .report-card-overview .ui-panel-content{
    position: relative;
  }
  .report-card-overview .statistics{
    margin-bottom: -10px!important;
  }
  .report-card-overview ._midline{
    position: absolute;
    left: 50%;
    top: 0;
    width: 1px;
    height: 100%;
    border-right: 1px solid #ddd;
  }

  /*所有图表-CSS*/
  .ui-panel-content001{
    display:block;
  }
  </style>
