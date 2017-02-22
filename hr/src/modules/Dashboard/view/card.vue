<!--
* @Created Date       : 2016-11-10T18:31:54+08:00
* @Last Modified time : 2016-12-02T16:41:40+08:00
 -->


<template>
  <div class="app-card">
    <div class="ui-panel">
      <header class="ui-panel-header">
        <h2 class="ui-panel-title clear-both">
                    <span>{{state.cardConfig.list[this.cardID].name}}</span>
                    <div class="pull-right">
                        <v-dropdown placement="dropleft">
                          <div data-toggle="dropdown"><i class="icon-tool icon-tool-expandmore"></i></div>
                          <ul slot="dropdown-menu" class="dropdown-menu">
                              <li>
                                  <a name="dropdown-item" href="javascript:;" @click="modalConfig=true">卡片数据设置</a>
                              </li>
                              <!-- <li>
                                  <a name="dropdown-item" href="javascript:;" @click="$dispatch('cardDelete',this.cardID)">删除卡片</a>
                              </li> -->
                              <!-- <li role="separator" class="divider"></li> -->
                              <li>
                                  <a name="dropdown-item" href="javascript:;" @click="$dispatch('cardManage','cardStore')">管理所有卡片</a>
                              </li>
                          </ul>
                        </v-dropdown>
                    </div>
                </h2>
      </header>
      <section class="ui-panel-content">
        <!-- 数字展示 -->
        <div class="ui n{{configData.items | getNumber}} statistics">
          <div v-for="i in configData.itemsOrder" v-show="configData.items[i].show" class="statistic {{'grey' | showClass}}" @click="clickItemData(configData.items[i])" style="cursor: pointer;">
            <div class="value">
              <!-- <span class="_link" @click="showDetails(configData.items[i].name,configData.items[i].id)">{{configData.itmesData[configData.items[i].id]}} -->
              <!-- <i class="material-icons">{{'up' | showIcon}}</i> -->
              <!-- </span> -->
              <!-- <span v-if="configData.items[i].ctrl&&configData.itmesData[configData.items[i].id]-0>0 ? true : false" class="_link" @click="$root.openFn(configData.items[i].ctrl.type,configData.items[i].ctrl.link,configData.items[i].ctrl.name)" v-link="{path:configData.items[i].link}">{{configData.itmesData[configData.items[i].id]}}</span>

                            <span v-else class="_link" style="cursor: default;" @click="showDetails(configData.items[i].name,configData.items[i].id)">{{configData.itmesData[configData.items[i].id]}}</span> -->
              <span class="_link" >{{configData.itmesData[configData.items[i].id]}}</span>
              <!-- <a class="_icon_detail" href="javascript:;">B</a> -->
            </div>
            <div class="label">
              {{configData.items[i].name}}
            </div>
          </div>
        </div>
        <!-- 日程 -->
      </section>
    </div>
    <!-- 数据设置 -->
    <ui-modal :show.sync="modalConfig" :header="configTitle" :backdrop-dismissible="false" :show-close-button="false">
      <div class="app-card-modal">
        <!-- <h4>我关注的数据</h4> -->
        <ui-dragdrop :order.sync="configData._itemsOrder" itemselector="li.dragitem" dragselector="._order">
          <!-- {{configData._itemsOrder}} -->
          <ul>
            <li class="dragitem" v-for="i in configData._itemsOrder" orderid="{{i}}">
              <div class="_order">
                <i class="material-icons">reorder</i>
              </div>
              <div class="_info">
                {{configData.items[i].name}} <span>({{configData.items[i].info}})</span>
              </div>
              <div class="_switch">
                <ui-switch :value.sync="configData.items[i]._show"></ui-switch>
              </div>
            </li>
          </ul>
        </ui-dragdrop>
      </div>
      <div slot="footer" class="text-center">
        <ui-button color="success" @click="cardSetting(true)">确定</ui-button>
        <ui-button color="default" @click="cardSetting()">取消</ui-button>
      </div>
    </ui-modal>
    <!-- 详细数据 -->
    <ui-modal :show.sync="modalDataDetails" :header="modalDataDetailsTitle">
      <div class="app-card-modal">
        暂无数据
      </div>
      <div slot="footer" class="text-center">
        <ui-button color="success" @click="modalDataDetails=false">确定</ui-button>
      </div>
    </ui-modal>
  </div>
</template>
<script type="text/javascript">
import store from '../store'

export default {
  attached() {
      //
      store.actions.loadCardData(this.cardID);

    },

    props: {
      cardID: {},
      store: {}
    },
    data() {
      return {
        state: store.state,
        configData: store.state.cardConfig.list[this.cardID],
        configTitle: store.state.cardConfig.list[this.cardID].name + ' 数据设置',
        showNumber: 3,
        modalConfig: false,
        modalDataDetails: false,
        modalDataDetailsTitle: '详细数据'
      }
    },

    filters: {
      getNumber(data) {
        var n = 0;

        for (let key in data) {

          if (data[key].show - 0 == 1) {
            n++
          }

        }

        return n;
      },

      // 根据数据显示上升下降图标及class
      showIcon(type) {


        if (this.cardID == 'cardStore') {
          return type == 'up' ? 'vertical_align_top' : type == 'down' ? 'vertical_align_bottom' : '';
        } else {
          return ''
        }

      },
      showClass(type) {

        // if(this.cardID=='cardStore'){
        //     return type=='up' ? 'red' : type=='down' ? 'teal': '';
        // }
        // else if(this.cardID=='cardWarning'){
        //     return 'red'
        // }
        // else{
        //     return 'grey'
        // }
        return 'grey'

      },

    },
    methods: {

      /* 设置数据 */
      cardSetting(toSet) {

        this.modalConfig = false;

        if (toSet) {
          store.actions.updateCardItemConfig(this.cardID);
        } else {
          store.actions.resetCardItemConfig(this.cardID);
        }

      },

      /* 显示详细数据 */
      showDetails(title) {

        this.$Tool.showTip({
          type: 'success',
          msg: '暂无数据'
        })

        // this.modalDataDetailsTitle = title;
        // this.modalDataDetails = true;
      },

      // 获取卡片数据
      getData() {


        if (this.cardID == 'cardStore') {
          return Math.ceil(Math.random(10) * 10) + '%'
        } else {
          return Math.ceil(Math.random(10) * 10)
        }

      },
      clickItemData(val) {
        this.$dispatch('cardItemClick', val.id, this.cardID);
      }
    },
    ready() {

    }
}
</script>
