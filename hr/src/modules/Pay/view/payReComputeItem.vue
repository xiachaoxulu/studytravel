<template>
  <ui-modal :show.sync="display" hide-footer header="选择需要新计算工资项目" type="medium">
    <div class="ui-panel">
      <div class="ui-panel-content">
        <div>
          <ui-checkbox :value.sync="allCheck">全选</ui-checkbox>
          <!-- <ui-checkbox :value.sync="converseCheck">反选</ui-checkbox> -->
        </div>
        <div>
          <ui-checkboxgroup :list="payItems" name="willChangeName" id="ID" :value.sync="payItemsChecked"></ui-checkboxgroup>
        </div>
        <div class="form-actions">
          <div class="row">
            <div class="text-center">
              <ui-button color="accent" @click="submit">提交</ui-button>
              <ui-button color="default" @click="display=false">取消</ui-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <v-spinner :size="md" :fixed="false" text="" v-ref:spinner></v-spinner>
  </ui-modal>
</template>
<script>
import store from '../store'
export default {
  data() {
      return {
        state: store.state,
        allCheck: false,
        converseCheck: false,
        payItemsChecked: []
      };
    },
    watch: {
      'allCheck': function(val, oldVal) {
        this.payItemsChecked = [];
        if (val) {
          this.payItems.forEach((item) => {
            this.payItemsChecked.push(item.ID);
          });
        }
      },
      'converseCheck': function(val, oldVal) {
        if (val) {
          var len = this.payItemsChecked.length;
          this.payItems.forEach((item) => {
            if (this.payItemsChecked.indexOf(item.ID) < 0) {
              this.payItemsChecked.push(item.ID);
            }
          });
          if (len > 0) this.payItemsChecked = this.payItemsChecked.slice(len - 1);
        }
      }
    },
    props: {
      display: {
        twoWay: true,
        type: Boolean,
        default: true
      },
      payids: {
        twoWay: true,
        type: Array,
        default: []
      },
      payItems: {
        type: Array,
        default: []
      }
    },
    methods: {
      submit() {
        if (this.payItemsChecked.length <= 0) {
          this.$root.showTip({
            type: 'warning',
            msg: "没有选择重新计算的工资项！",
            duration: 2000
          });
          return;
        }
        this.$refs.spinner.show();
        store.actions.reComputePayItems(this.payids, this.payItemsChecked, () => {
          this.$root.showTip({
            type: 'info',
            msg: "重新计算成功！",
            duration: 2000
          });
          this.$parent.$refs.t1.refresh();
          this.$parent.$refs.t2.refresh();
          this.display = false;
          this.$refs.spinner.hide();
        }, (error) => {
          this.$root.showTip({
            type: 'error',
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
