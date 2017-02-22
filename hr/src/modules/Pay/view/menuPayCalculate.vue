<template>
  <div class="pull-right">
    <!--  <button class="ui-tool-button">
      <span class="icon icon-tool icon-tool-add2 pull-left"></span>
      <span class="_name pull-left">添加</span>
    </button> -->
    <button __code="pay-calculate-editPay/修改" class="ui-tool-button" @click="$parent.$parent.$broadcast('editPay')">
      <span class="icon icon-tool icon-tool-edit pull-left"></span>
      <span class="_name pull-left">修改</span>
    </button>
    <button __code="pay-calculate-computePay/计算" class="ui-tool-button" @click="$parent.$parent.$broadcast('computePay')">
      <span class="icon icon-tool icon-tool-save pull-left"></span>
      <span class="_name pull-left">计算</span>
    </button>
    <button __code="pay-calculate-submitPay/提交" class="ui-tool-button" @click="$parent.$parent.$broadcast('submitPay')">
      <span class="icon icon-tool icon-tool-save pull-left"></span>
      <span class="_name pull-left">提交</span>
    </button>
    <v-dropdown class="ui-tool-dropdown" trigger="click">
      <button type="button" data-toggle="dropdown" class="ui-tool-button">
        <span class="icon icon-tool icon-tool-more pull-left"></span>
        <span class="_name pull-left">更多</span>
      </button>
      <ul class="dropdown-menu">
        <!-- 列选先屏蔽别打开 -->
        <!-- <li>
          <a href="javascript:void(0)" name="dropdown-item">列选</a>
        </li> -->
        <li __code="pay-calculate-suspend/停发">
          <a href="javascript:void(0)" name="dropdown-item" @click="$parent.$parent.$broadcast('showSuspendConfirm')">停发</a>
        </li>
        <li __code="pay-calculate-recover/恢复">
          <a href="javascript:void(0)" name="dropdown-item" @click="$parent.$parent.$broadcast('showRecoverConfirm')">恢复</a>
        </li>
        <li>
          <div class="border"></div>
        </li>
        <li __code="pay-calculate-import/导入">
          <a href="javascript:void(0)" name="dropdown-item" @click="uploadShow=true">导入</a>
        </li>
        <li __code="pay-calculate-export/导出">
          <a href="javascript:void(0)" name="dropdown-item" @click="exportPay">导出</a>
        </li>
        <li __code="pay-calculate-rollback/撤回">
          <a href="javascript:void(0)" name="dropdown-item" @click="$parent.$parent.$broadcast('rollbackPay')">撤回</a>
        </li>
      </ul>
    </v-dropdown>
  </div>
  <ui-modal :show.sync="uploadShow" v-if="uploadShow" header="上传工资Excel文件" hide-footer type="large">
    <ui-upload :filecountlimit="1" filetypelimit="xls,xlsx" :submiturl="fileUrl" :callback="uploadDone" :errortime="1000*60"></ui-upload>
  </ui-modal>
</template>
<script>
import Vue from 'vue'
import store from '../store'
import paySuspended from './paySuspended'
export default {
  data() {
      return {
        state: store.state,
        uploadShow: false,
        fileUrl: 'api.Pay.payExcelImport',
      }
    },
    methods: {
      exportPay() {
        if (!this.state.searchPayEmployee.payrangeID) {
          this.$root.showTip({
            type: 'danger',
            msg: '请先在左侧列表中点击选择工资套！',
            duration: 2000
          });
          return;
        }
        if (!this.state.searchPayEmployee.monthID) {
          this.$root.showTip({
            type: 'danger',
            msg: '请先选择工资月份！',
            duration: 2000
          });
          return;
        }
        var params = {
          paysuitId: this.state.searchPayEmployee.payrangeID,
          monthId: this.state.searchPayEmployee.monthID
        };
        var queryString = Object.keys(params).map((item) => {
          return item + '=' + params[item]
        }).join('&');
        this.$root.downloadFile(Vue.apiConfig.api.Pay.payExcelExport, queryString);
      },
      uploadDone(data) {
        this.uploadShow = false;
        this.$root.showTip({
          type: 'info',
          msg: '导入完成!',
          duration: 2000
        });
        this.$parent.$parent.$broadcast('refreshPay', data);
      }
    }
}
</script>
