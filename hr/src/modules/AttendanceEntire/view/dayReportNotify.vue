<template>
  <ui-modal v-if="display" :show.sync="display" header="未完成日结提醒" type="large" hide-footer>
    <ui-scrollview>
      
    </ui-scrollview>

    <template v-for="msg in displayMsg">
      <div class="tip-title">{{$index+1}}、{{msg.event.eventTitle}}</div>
      <ul class="msg-list">
        <li v-for="item in msg.msgList">
          {{item.msgTitle}}
        </li>
      </ul>
    </template>
    <div class="form-actions">
      <div class="row">
        <div class="col-sm-24">
          <ui-button color="success" @click="this.display=false">确定</ui-button>
        </div>
      </div>
    </div>
  </ui-modal>
</template>
<script>
import store from '../store'
export default {
  data() {
      return {
        state: store.state,
        display: false,
        displayMsg: []
      };
    },
    ready() {
      store.actions.getDayReportNotifyList((data) => {
        if (Array.isArray(data) && data.length > 0) {
          this.displayMsg = data;
          this.display = true;
        }
      }, (error) => {
        this.$root.showTip({
          type: 'warning',
          msg: '未完成日结提醒检查失败！'
        });
      })
    }
};
</script>
<style lang="css" scoped>
.tip-title {
  padding: 20px;
  font-size: 17px;
}

.msg-list {
  font-size: 15px;
  padding-left: 50px;
  padding-bottom: 20px;
}

.msg-list li {
  padding-bottom: 10px;
}
</style>
