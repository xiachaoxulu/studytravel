<!--
* @Created Date       : 2016-08-28T15:36:04+08:00
* @Last Modified time : 2016-12-02T16:37:28+08:00
 -->


<template>
  <div class="report-card-overview ui-card ui-card-col1 ui-card-row1" orderid="1">
    <div class="ui-card-content ui-panel">
      <div class="ui-panel-title clear-both">
        <span>数据概览</span>
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
      <div class="_midline"></div>
      <div class="ui n2 statistics">
        <div class="statistic red">
          <div class="value">
            <span class="_link">18%<i class="material-icons">vertical_align_top</i></span>
          </div>
          <div class="label">
            薪酬营业额占比
          </div>
        </div>
        <div class="statistic red">
          <div class="value">
            <span class="_link">2.1<i class="material-icons">vertical_align_bottom</i></span>
          </div>
          <div class="label">
            人员效率
          </div>
        </div>
      </div>
      <div class="ui n2 statistics">
        <div class="statistic grey statistic_small">
          <div class="value">
            <span class="_link">29.3<i class="material-icons">vertical_align_top</i></span>
          </div>
          <div class="label">
            营业额（万元）
          </div>
        </div>
        <div class="statistic grey statistic_small">
          <div class="value">
            <span class="_link">120<i class="material-icons">vertical_align_bottom</i></span>
          </div>
          <div class="label">
            员工工时（时）
          </div>
        </div>
      </div>
      <div class="ui n2 statistics">
        <div class="statistic grey statistic_small">
          <div class="value">
            <span class="_link">50020<i class="material-icons">vertical_align_top</i></span>
          </div>
          <div class="label">
            薪酬（元）
          </div>
        </div>
        <div class="statistic grey statistic_small">
          <div class="value">
            <span class="_link">1300<i class="material-icons">vertical_align_bottom</i></span>
          </div>
          <div class="label">
            客流量（人）
          </div>
        </div>
      </div>

    </div>
  </div>
</div>
</template>
<style>
.statistic_small ._link{
  font-size: 3rem!important;
}
</style>
