<template>
  <!-- 主面板 -->
  <div id="app-dashboard" class="ui-module">
    <div class="ui-module-content pos-l-content">
      <template v-if="showCardSetting">
        <div class="text-center" style="padding-top: 30px;">
          <button class="btn btn-default" @click="modalManage=true">管理卡片</button>
        </div>
      </template>
      <ui-scrollview>
        <!-- 卡片列表 -->
        <div id="app-cardList" class="clear-both">
          <ui-dragdrop v-if="state.cardConfig.order.length>0?true:false" :order.sync="state.cardConfig.order" itemselector="div.app-card" :callback="cardOrderCallback">
            <!-- 卡片列表 -->
            <template v-if="state.cardConfig.order.length>0?true:false" class="app-card" v-for="cardID in state.cardConfig.order">
              <component is="card" v-if="state.cardConfig.list[cardID].show" :card-id="cardID" orderid="{{cardID}}"></component>
            </template>
          </ui-dragdrop>
        </div>
      </ui-scrollview>
      <v-spinner :size="md" :fixed="false" text="" v-ref:spinner></v-spinner>
    </div>
    <ui-modal :show.sync="modalManage" header="卡片管理" :backdrop-dismissible="false" :show-close-button="false">
      <div class="app-card-modal">
        <h4>我的卡片</h4>
        <ui-dragdrop v-if="modalManage && state.cardConfig.order.length>0" :order.sync="state.cardConfig._order" itemselector="li" dragselector="._order">
          <ul>
            <li v-if="state.cardConfig.order.length>0" v-for="cardID in state.cardConfig._order" orderid="{{cardID}}" dragItem>
              <div class="_order">
                <i class="material-icons">reorder</i>
              </div>
              <div class="_info">
                {{state.cardConfig.list[cardID].name}} <span>({{state.cardConfig.list[cardID].info}})</span>
              </div>
              <div class="_switch">
                <ui-switch :value.sync="state.cardConfig.list[cardID]._show"></ui-switch>
              </div>
            </li>
          </ul>
        </ui-dragdrop>
        <!-- <h4>其他卡片</h4> -->
      </div>
      <div slot="footer" class="text-center">
        <ui-button color="success" @click="setCardConfig(true)">确定</ui-button>
        <ui-button color="default" @click="setCardConfig()">取消</ui-button>
      </div>
    </ui-modal>
    <ui-confirm header="提示" confirm-button-text="是" deny-button-text="否" @confirmed="cardDelete(false,true)" @denied="confirmDelete=false" :show.sync="confirmDelete" close-on-confirm>
      你确定要删除该卡片吗？
    </ui-confirm>
    <!-- 功能列表 -->
    <app-functions v-ref:appFnList></app-functions>
    <ui-sidecontent :show.sync="bigdymicshow" background="#fff">
      <components :is="bigwhat" v-if="bigdymicshow">
      </components>
    </ui-sidecontent>
    <ui-sidebar :show.sync="showSlide" :title="sidebarTitle" layout="header-content">
      <div slot="content">
        <components :is="whatSlide" v-if="showSlide" :card-id="cardId"></components>
      </div>
    </ui-sidebar>
    <!-- <day-report-notify></day-report-notify> -->
  </div>
</template>
<script>
import store from '../store'
import appFunctions from './functions'
import card from './card'

import healthCardWarning from './healthCardWarning'
import countOvertimeLimit from './countOvertimeLimit'
import countOvertimeWarning from './countOvertimeWarning'
import dayCheckWorkWarning from './dayCheckWorkWarning'
import monthCheckWorkWarning from './monthCheckWorkWarning'

import pcount from '../../Workflow/view/ApprovalList'
import allcount from '../../Workflow/view/ApprovalList'

import dayReportNotify from '../../AttendanceEntire/view/dayReportNotify'

export default {
  attached() {
      this.$root.checkHome(true);
      store.actions.loadCardList(() => {
        this.$refs.spinner.hide();
      });
      this.$refs.spinner.show();
    },
    data() {
      return {
        store: store,
        state: store.state,
        // 显示管理modal
        modalManage: false,
        // 显示删除确认框
        confirmDelete: false,
        delateCardId: '',
        cardOrderCallbackTimer: null,

        //已经实现的弹窗组件列表
        alReadyComponent: ['healthCardWarning', 'countOvertimeLimit', 'countOvertimeWarning', 'dayCheckWorkWarning', 'monthCheckWorkWarning'],
        alReadySlide: ['pcount', 'allcount'],
        bigdymicshow: false,
        bigwhat: '',

        showSlide: false,
        sidebarTitle: null,
        whatSlide: null,
        cardId: null
      }
    },
    computed: {
      showCardSetting() {

        let _this = this;
        let len = 0;

        this.state.cardConfig.order.forEach(function(id) {
          if (_this.state.cardConfig.list[id].show) {
            len++;
          }
        })

        console.log(len)

        return len == 0;

      }
    },
    methods: {

      // 卡片设置回调
      setCardConfig(toSet) {

        this.modalManage = false;

        if (toSet) {
          store.actions.updateCardConfig();
        } else {
          store.actions.resetCardConfig();
        }

      },

      // 卡片拖动排序回调
      cardOrderCallback() {
        console.log('cardOrderCallback order')
          // 2秒后更新数据
        if (this.cardOrderCallbackTimer) clearTimeout(this.cardOrderCallbackTimer);
        this.cardOrderCallbackTimer = setTimeout(() => {
          store.actions.updateCardConfig('order');
        }, 2000)

      },

      cardManage(id) {
        this.modalManage = true;
      },

      cardDelete(id, del) {

        if (!!id && !del) {
          this.confirmDelete = true;
          this.delateCardId = id;
        } else if (del) {
          this.confirmDelete = false;
          this.state.cardConfig.list[this.delateCardId].show = false;
        }

      }
    },
    events: {
      cardManage(id) {
        this.modalManage = true;
      },

      cardDelete(id, del) {

        if (!!id && !del) {
          this.confirmDelete = true;
          this.delateCardId = id;
        } else if (del) {
          this.confirmDelete = false;
          this.state.cardConfig.list[this.delateCardId].show = false;
        }

      },
      //卡片内容项目点击的回调事件
      cardItemClick(id, cardID) {
        if (this.alReadyComponent.indexOf(id) != -1) {
          this.bigdymicshow = true;
          this.bigwhat = id;
        } else if (this.alReadySlide.indexOf(id) != -1) {
          this.showSlide = true;
          this.whatSlide = id;
          this.cardId = cardID;
        } else {
          this.$root.showTip({
            type: 'info',
            msg: '正在开发中...',
            duration: 2000
          });
        }
      },
      refreshCardSlideTitle(title, componentNames) {
        if (!this.showSlide) return true;
        if (Array.isArray(componentNames)) {
          if (componentNames.indexOf(this.whatSlide) > -1) {
            this.sidebarTitle = title;
          }
          return true;
        }
        return true;
      },
      refreshApprovalCard: function(id) {
        console.log('cardIDcardID: ', id)
        // *** 回传 CardID, 接收到消息卡片刷新
        store.actions.loadCardData(id);
      }
    },
    components: {
      appFunctions,
      card,

      healthCardWarning, //健康证预警
      countOvertimeLimit,
      countOvertimeWarning,
      dayCheckWorkWarning,
      monthCheckWorkWarning,

      pcount,
      allcount,

      dayReportNotify
    },
    ready() {

    }
}
</script>
<style>
/* 面板 */

.app-card .ui-panel {
  min-height: 220px;
}

.app-card .ui-panel-title {
  font-size: 16px;
}

.app-card .ui-panel-title ._icon_more {
  float: right;
  cursor: pointer;
}

.app-card .ui-panel-title ._icon_more:hover {
  color: #27c9b4;
}

.app-card .statistic ._link {
  display: inline-block;
  cursor: pointer;
  /*padding-left: 50px;*/
}

.app-card .statistic:hover ._link {
  animation-name: bounceIn2;
  animation-duration: .75s;
}

.app-card .statistic ._icon_detail {
  position: relative;
  top: -5px;
  left: 5px;
  display: inline-block;
  cursor: pointer;
  color: #666;
  border-radius: 5px;
  background: #e9eaed;
  width: 30px;
  height: 30px;
  line-height: 30px;
  font-size: 20px;
  font-family: 'Lato', 'Helvetica Neue', Arial, Helvetica, sans-serif;
}

.app-card .statistic ._icon_detail:hover,
.app-card .statistic ._icon_detail:focus {
  background: #27c9b4;
  color: #fff;
  text-decoration: none;
}

.app-card .ui-panel-title .icon_more:hover {
  color: #27c9b4;
}

.app-card .ui-panel-content {
  padding: 30px 0;
}

html body .app-card .ui.statistics .statistic > .value,
html body .ui.statistic > .value {
  position: relative;
  font-size: 2.5rem;
  font-family: 'DINCond'!important;
}

.app-card .ui.statistics .statistic > .label,
.ui.statistic > .label {
  color: #787878;
  font-family: '微软雅黑';
  font-weight: normal;
  padding-top: 10px;
}


/*  */

.app-card-modal {
  user-select: none;
}

.app-card-modal h4 {
  font-size: 14px;
}

.app-card-modal li {
  overflow: hidden;
  padding: 5px 0;
  border-bottom: 1px solid #ddd;
}

.app-card-modal li ._order {
  float: left;
  padding-top: 5px;
  padding-right: 10px;
  color: #666;
  cursor: pointer;
}

.app-card-modal li ._order:hover {
  color: #333;
}

.app-card-modal li ._info {
  float: left;
  line-height: 35px;
  font-size: 14px;
  color: #666;
}

.app-card-modal li ._info span {
  font-size: 12px;
}

.app-card-modal li ._switch {
  float: right;
}
</style>
