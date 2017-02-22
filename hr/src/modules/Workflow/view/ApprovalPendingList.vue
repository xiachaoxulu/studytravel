<template>
<div style="position: relative;">
    <approval-condition :refresh-conditions="refreshGrid" :display="showPendingCondition"></approval-condition>
    <div class="grid-pos" :style="{ top: gridTop + 'px' }">
        <ui-grid v-ref:table :url="url" :append-params="searchFor" :reader="reader" :fields="fields" :perpage="30" selectable="multi" :pages="[10,20,30,50]" :btrefresh="true" checked="multi" :selected.sync="selectedWorkflow" height="auto" table-title="待审批列表" :table-name="tableName" :column-config="$root.columnConfig"></ui-grid>
    </div>
    <approval-resolve :display.sync="showResolve" :wkid.sync="resolveIDs"></approval-resolve>
    <approval-reject :display.sync="showReject" :wkid.sync="rejectIDs"></approval-reject>
    <approval-transfer :display.sync="showTransfer" :wkid.sync="transferIDs"></approval-transfer>
</div>
</template>
<script>
import store from '../store'
import approvalCondition from './ApprovalCondition'
import approvalResolve from './ApprovalResolve'
import approvalReject from './ApprovalReject'
import approvalTransfer from './ApprovalTransfer'

export default {
    data() {
        return {
            state: store.state,
            url: '',
            searchFor: {},
            fields: [],
            selectedWorkflow: [],
            resolveIDs: null,
            rejectIDs: null,
            transferIDs: null,
            showResolve: false,
            showReject: false,
            showTransfer: false,
            reader: {
                idProperty: 'taskId',
                successProperty: 'success', // 成功
                errmsgProperty: 'err_msg', // 失败提示
                totalProperty: 'result.recordCount', // 数据总量
                rootProperty: 'result.recordList', // 数据
            },
            showPendingCondition: false,
            gridTop: 10,
            tableName:''
        };
    },
    components: {
        approvalCondition,
        approvalResolve,
        approvalReject,
        approvalTransfer
    },

    methods: {
        refreshGrid(conditions) {
            console.error('123')
            console.dir(conditions)
            Object.assign(this.searchFor, conditions);
            this.tableName = 'apply_'+conditions.bizType+'Table';
            this.searchFor.userName = this.state.searchParams.userName;
            this.searchFor.type = 0; // 待审批
            delete this.searchFor.bizType;
            this.fields = store.config[store.config.fieldsWorkflow[conditions.bizType]];
            this.url = store.config.WorkflowReferAPI[conditions.bizType];
            this.$nextTick(() => {
                this.$refs.table.refresh();
            });
        }
    },
    events: {
        showConditions() {
            var tabIdx = this.state.approvalTabIdx;
            if (tabIdx != 0) return true;
            this.showPendingCondition = !this.showPendingCondition;
            this.gridTop = this.showPendingCondition ? 200 : 10;
        },
        resolveApproval() {
            if (!Array.isArray(this.selectedWorkflow) || this.selectedWorkflow.length <= 0) {
                this.$root.showTip({
                    type: 'warning',
                    msg: '请先在下方列表选择要操作的审批！'
                });
                return;
            }
            this.resolveIDs = this.selectedWorkflow;
            this.showResolve = true;
        },
        rollbackApproval() {
            if (!Array.isArray(this.selectedWorkflow) || this.selectedWorkflow.length <= 0) {
                this.$root.showTip({
                    type: 'warning',
                    msg: '请先在下方列表选择要操作的审批！'
                });
                return;
            }
            this.rejectIDs = this.selectedWorkflow;
            this.showReject = true;
        },
        transferApproval() {
            if (!Array.isArray(this.selectedWorkflow) || this.selectedWorkflow.length <= 0) {
                this.$root.showTip({
                    type: 'warning',
                    msg: '请先在下方列表选择要操作的审批！'
                });
                return;
            }
            this.transferIDs = this.selectedWorkflow;
            this.showTransfer = true;
        }
    },
    ready() {
        store.mutations.SetApprovalTabIdx(0);
    }
};
</script>
<style lang="css" scoped>
.grid-pos {
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
}
</style>
