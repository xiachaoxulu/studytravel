<!--
* @Created Date       : 2016-08-28T15:36:04+08:00
* @Last Modified time : 2016-12-02T16:40:19+08:00
 -->


<template>
<div class="ui-card ui-card-col2 ui-card-row2" orderid="3">
    <div class="ui-card-content ui-panel">
        <div class="ui-panel-title clear-both">
            <span>薪酬营业额占比排行</span>
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

        </div>
    </div>

</div>
</template>
