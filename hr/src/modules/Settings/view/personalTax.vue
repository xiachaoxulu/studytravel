<template>
  <div class="paymentSubview">
    <div class="paymentStatus">
      <div class="pull-left">
        <ui-buttongroup active-class="btn-primary">
          <button type="button" class="btn btn-primary" @click="taxIdx=0">本国</button>
          <button type="button" class="btn btn-default" @click="taxIdx=1">外籍</button>
        </ui-buttongroup>
      </div>
      <div class="pull-right">
        <label class="start-point">起征点：{{state.personalTaxRuleList[taxIdx].taxType.startpoint}}元</label>
      </div>
    </div>
    <ui-table v-ref:table height="auto" class="paymentTable">
      <template slot="headerLockedFirst">
        <table class="table table-bordered">
          <colgroup>
            <col width="100px" />
          </colgroup>
          <thead>
            <tr>
              <th>级数</th>
            </tr>
          </thead>
        </table>
      </template>
      <template slot="headerNormal">
        <table class="table table-bordered">
          <colgroup>
            <col width="300px" />
            <col width="300px" />
            <col width="300px" />
            <col width="300px" />
          </colgroup>
          <thead>
            <th>全月应纳税所得额（含税级距）</th>
            <th>全月应纳税所得额（不含税级距）</th>
            <th>税率</th>
            <th>速算扣除法</th>
          </thead>
        </table>
      </template>
      <template slot="bodyLockedFirst">
        <table class="table table-bordered">
          <colgroup>
            <col width="100px" />
          </colgroup>
          <tbody>
            <tr v-for="(index, tax) in state.personalTaxRuleList[taxIdx].taxList">
              <td>{{index+1}}</td>
            </tr>
          </tbody>
        </table>
      </template>
      <template slot="bodyNormal">
        <table class="table table-bordered">
          <colgroup>
            <col width="300px" />
            <col width="300px" />
            <col width="300px" />
            <col width="300px" />
          </colgroup>
          <tbody>
            <tr v-for="(index, tax) in state.personalTaxRuleList[taxIdx].taxList">
              <td>{{tax.taxableNameAll}}</td>
              <td>{{tax.taxableName}}</td>
              <td>{{tax.taxRate}}</td>
              <td>{{tax.deduct}}</td>
            </tr>
          </tbody>
        </table>
      </template>
    </ui-table>
  </div>
</template>
<script>
import store from '../store'
export default {
  data() {
      return {
        state: store.state,
        taxIdx: 0
      };
    },
    ready() {
      store.actions.loadPersonalTaxRuleList(null, (error) => {
        this.$root.showTip({
          type: "danger",
          msg: error
        });
      });
    }
};
</script>
<style lang="css" scoped>
.start-point {
  padding-top: 5px;
  color: #fd6551;
}
</style>
