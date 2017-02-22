<template>
  <div style="position: relative">
    <approval-condition v-ref:condition :refresh-conditions="refreshGrid" :display="showResolvedCondition" :dict-workflow-status="dictWorkflowStatus"></approval-condition>
    <div class="grid-pos" :style="{ top: gridTop + 'px' }">
      <ui-grid v-ref:table :url="url" :append-params="searchFor" :fields="fields" :perpage="30" selectable="single" :pages="[10,20,30,50]" :btrefresh="true" checked="single" :selected.sync="selectedWorkflow" height="auto" table-title="已审批列表" :table-name="tableName" :column-config="$root.columnConfig"></ui-grid>
    </div>
  </div>
</template>
<script>
import vue from 'vue'
import store from '../store'
import approvalCondition from './ApprovalCondition'
export default {
  data() {
      return {
        state: store.state,
        url: '',
        searchFor: {},
        fields: [],
        selectedWorkflow: [],
        showResolvedCondition: false,
        gridTop: 10,
        dictWorkflowStatus: [{
            code: '150005',
            codeName: '同意'
          }, {
            code: '150004',
            codeName: '驳回'
          }
          // , {
          //   code: '',
          //   codeName: '转审'
          // }
      ],
        tableName:''//表格名称 for列选
      };
    },
    components: {
      approvalCondition
    },

    methods: {
      refreshGrid(conditions) {
        Object.assign(this.searchFor, conditions);
        this.searchFor.userName = this.state.searchParams.userName;
        this.tableName = 'apply_'+conditions.bizType+'Table';
        this.searchFor.type = 1; // 已审批
        delete this.searchFor.bizType;
        this.fields = store.config[store.config.fieldsWorkflow[conditions.bizType]];
        this.$refs.table.url = store.config.WorkflowReferAPI[conditions.bizType];
        this.$refs.table.refresh();
      }
    },
    events: {
      showConditions() {
        var tabIdx = this.state.approvalTabIdx;
        if (tabIdx != 1) return true;
        this.showResolvedCondition = !this.showResolvedCondition;
        this.gridTop = this.showResolvedCondition ? 240 : 10;
      },
      exportApprovalResolved() {
        var conditions = this.$refs.condition.getConditions();
        Object.assign(this.searchFor, conditions);
        this.searchFor.userName = this.state.searchParams.userName;
        this.searchFor.type = 1; // 已审批
        var url = vue.apiConfig.api.Workflow[store.config.exportWorkflow[conditions.bizType]];
        console.log(conditions.bizType)
        delete this.searchFor.bizType;
        var queryString = Object.keys(this.searchFor).map((item) => {
          return item + '=' + this.searchFor[item]
        }).join('&');
        this.$root.downloadFile(url, queryString);
      }
    },
    ready() {
      store.mutations.SetApprovalTabIdx(1);
    }
};
</script>
<style lang="css" scoped>
.grid-pos {
  position: absolute;
  bottom: 24px;
  left: 24px;
  right: 24px;
}
</style>
