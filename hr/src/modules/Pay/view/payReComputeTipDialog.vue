<template>
  <ui-modal v-if="display" :show.sync="display" header="工资套重新计算提醒" type="large" hide-footer>
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
        <div class="col-sm-11" style="text-align:right">
          <ui-button color="success" @click="lookupPay">查看</ui-button>
        </div>
        <div class="col-sm-2"></div>
        <div class="col-sm-11">
          <ui-button color="accent" @click="this.display=false">取消</ui-button>
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
    methods: {
      lookupPay() {
        this.$router.go({
          path: '/Pay/payCalculate'
        });
        this.display = false;
      }
    },
    ready() {
      store.actions.payToDoValidate((data) => {
        if (Array.isArray(data) && data.length > 0) {
          this.displayMsg = data;
          this.display = true;
        }
      }, (error) => {
        this.$root.showTip({
          type: 'warning',
          msg: '工资套重新计算检查失败！'
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
