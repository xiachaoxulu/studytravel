<template>
  <ui-modal :show.sync="display" header="选择需要重新计算的工资项目" type="medium" hide-footer>
    <ui-validator>
      <form class="form-horizontal container-fluid" role="form" vali-submit="submitBtn|submitedCall">
        <div class="row form-group">
          <div class="col-sm-24">
            <label class="col-sm-3 control-label title">选择：</label>
            <div class="col-sm-21">
              <!-- <ui-checkbox>全选</ui-checkbox> -->
              <!-- <ui-checkbox>反选</ui-checkbox> -->
            </div>
          </div>
        </div>
        <div class="row form-group">
          <div class="col-sm-24">
            <ui-checkboxgroup :list="salaryItemList" id="ID" name="name" :value.sync="itemChecked"></ui-checkboxgroup>
          </div>
        </div>
        <div class="form-actions">
          <div class="row">
            <div class="text-center">
              <ui-button id="submitBtn" color="accent">确定</ui-button>
            </div>
          </div>
        </div>
      </form>
    </ui-validator>
  </ui-modal>
</template>
<script>
export default {
  data() {
      return {
        itemChecked: [],
        salaryItemList: [{
          ID: 1,
          name: '基本工资'
        }, {
          ID: 2,
          name: '公积金'
        }, {
          ID: 3,
          name: '迟到扣款'
        }, {
          ID: 4,
          name: '请假扣款'
        }, {
          ID: 5,
          name: '早退扣款'
        }, {
          ID: 6,
          name: '出差补助'
        }, {
          ID: 7,
          name: '交通补助'
        }, {
          ID: 8,
          name: '实发工资'
        }, {
          ID: 9,
          name: '房屋补助'
        }, {
          ID: 10,
          name: '养老保险'
        }]
      };
    },
    props: {
      display: {
        twoWay: true,
        type: Boolean,
        default: false
      },
      id: {
        twoWay: true,
        type: String
      }
    },
    events: {
      submitedCall() {
        this.display = false;
      }
    }
};
</script>
<style lang="css" scoped>
.title {
  padding: 0;
  text-align: left;
}
</style>
