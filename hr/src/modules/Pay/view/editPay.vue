<template>
  <ui-modal :show.sync="display" hide-footer header="修改工资项" type="large">
    <ui-validator>
      <form class="form-horizontal container-fluid" role="form" vali-submit="submitBtn|submitedCall">
        <div class="form-group row">
          <label class="col-sm-8 control-label">员工工号</label>
          <div class="col-sm-16">
            <input type="text" class="form-control" readonly="readonly" disabled value="{{pay.userCode}}">
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-8 control-label">姓名</label>
          <div class="col-sm-16">
            <input type="text" class="form-control" readonly="readonly" disabled value="{{pay.userName}}">
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-8 control-label">工资年月</label>
          <div class="col-sm-16">
            <input type="text" class="form-control" readonly="readonly" disabled value="{{payYearMonth}}">
          </div>
        </div>
        <!-- 148001: 数值, 148002: 文本, 148003: 日期 -->
        <template v-for="item in pay.payItems">
          <div class="form-group row">
            <label class="col-sm-8 control-label">{{item.itemName}}</label>
            <div class="col-sm-16">
              <input v-if="item.valueType==148001" type="text" class="form-control" v-model="item.money" vali="required|minNum:0" vali-msg="必填项||应为不小于0的数字" />
              <input v-if="item.valueType==148002" type="text" class="form-control" v-model="item.money" vali="required" maxlength="255" vali-msg="必填项(最长255)" />
              <ui-datepicker v-if="item.valueType==148003" :time.sync="item.money" format="yyyyMMdd" vali="required" vali-msg="请选择" width="70"></ui-datepicker>
            </div>
          </div>
        </template>
        <div class="form-actions">
          <div class="row">
            <div class="text-center">
              <ui-button color="accent" id="submitBtn">提交</ui-button>
              <ui-button color="default" @click="display=false">取消</ui-button>
            </div>
          </div>
        </div>
      </form>
    </ui-validator>
  </ui-modal>
</template>
<script>
import store from '../store.js'
export default {
  data() {
      return {
        state: store.state,
      };
    },
    computed: {
      payYearMonth: () => {
        var month = store.state.payYearMonth.find((p) => {
          if (p.ID == store.state.searchPayEmployee.monthID) return true;
          return false;
        })
        if (!month) return null;
        var str = month.month.substr(0, 4) + '年' + month.month.substr(4, 2) + '月';
        return str;
      }
    },
    props: {
      display: {
        twoWay: true,
        type: Boolean,
        default: false
      },
      pay: {
        twoWay: true
      }
    },
    events: {
      submitedCall() {
        var payItems = this.pay.payItems.map((item) => {
          return {
            payID: this.pay.ID,
            payItemID: item.payItemID,
            money: item.money
          };
        });
        store.actions.editPayItemAmount(payItems, () => {
          this.$root.showTip({
            type: 'info',
            msg: '修改工资项成功！',
            duration: 2000
          });
          this.$parent.$refs.t1.refresh();
          this.$parent.$refs.t2.refresh();
          this.pay = {};
          this.display = false;
        }, (error) => {
          this.$root.showTip({
            type: 'danger',
            msg: error,
            duration: 2000
          });
        });
      }
    }
};
</script>
<style lang="css" scoped>
</style>
