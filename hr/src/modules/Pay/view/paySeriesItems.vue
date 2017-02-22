<template>
<div>
    <ui-grid v-ref:itemstable class="gridTable" :fields="fields" url="api.Pay.selectPayItems" :perpage="30" :pages="[10,20,30,50]" :btrefresh="true" selectable="multi" :selected.sync="selected" :selected-data.sync="selectedData" :append-params="searchParams"
        height="auto" :auto-refresh-dely="100" table-title="工资项目"  table-name="paySeriesItemsTable" :column-config="$root.columnConfig"></ui-grid>

    <!-- 添加，修改，删除，导入 -->
    <ui-modal :header="modalTitle" :show.sync="modalShow">
        <components v-if="modalShow" :is="modalComponents" :ctrltype="ctrltype" @close="modalShow=false" @callback="ctrlCallback"></components>
        <div slot="footer"></div>
    </ui-modal>

</div>
</template>
<script>
import store from '../store'
import editPayItems from './editPayItems'
export default {
    data() {
        return {
            state: store.state,
            modalShow: false,
            modalTitle: '',
            modalComponents: '',
            ctrltype: '',

            selected: [],
            selectedData: {},
            fields: [{
                name: 'order',
                title: '序号',
                locked: 'first',
                width: '60px',
                formater: function(value, data, index) {
                    return index + 1
                }
            }, {
                name: 'itemName',
                title: '工资项目名称',
                locked: 'first',
                width: '200px'
            }, {
                name: 'category',
                title: '所属类别',
                tdClass: 'showTip',
                formater: (value, data, index, lastIndex) => {
                    let codeItem = this.state.commonData.payItemTypes[value];
                    return codeItem && codeItem.codeName ? codeItem.codeName : '';
                }
            }, {
                name: 'valueType',
                title: '数值类型',
                tdClass: 'showTip',
                formater: (value, data, index, lastIndex) => {
                    let codeItem = this.state.commonData.payItemDataType[value];
                    return codeItem && codeItem.codeName ? codeItem.codeName : '';
                }
            },{
                name: 'des',
                title: '备注',
                formater: (value, data, index) => {
                    return (data.isSys ? '[系统内置项] ' : '') + (value ? value : '')
                }
            }, {
                name: 'changeName',
                title: '修改人',
            }, {
                name: 'changeTime',
                title: '修改时间'
            }, ],

            /* 搜索工资项目 */
            searchParams: {}
        }
    },
    ready() {
        console.info('this.$root',this.$root)
    },
    components: {
        editPayItems,
    },
    methods: {
        // 监听操作的成功回调
        ctrlCallback(ctrltype, resultType, callback) {

            // 添加，修改 ， 删除 回调
            if (ctrltype == 'add' || ctrltype == 'update' || ctrltype == 'delete') {
                this.$refs.itemstable.refresh();
            }

        },
    },
    events: {
        // 显示弹窗
        showModalOfItems(type) {
            if (type == 'add') {
                this.modalTitle = '添加工资项目';
            }
            if (type == 'update') {

                if (this.selected.length == 0) {

                    this.$root.showTip({
                        type: 'warning',
                        msg: '请先选择要操作的项目'
                    })

                    return;
                } else if (this.selected.length > 1) {

                    this.$root.showTip({
                        type: 'warning',
                        msg: '只能针对一个工资项目进行修改操作'
                    })

                    return;
                }


                // console.log(this.selected)
                // console.log(this.selectedData)

                store.actions.setPayItemInfo(this.selectedData[this.selected[0]]);

                this.modalTitle = '修改工资项目';
            }
            if (type == 'delete') {


                if (this.selected.length == 0) {

                    this.$root.showTip({
                        type: 'warning',
                        msg: '请先选择要操作的项目'
                    })

                    return;
                }
                // 系统内置项不能删除
                if (this.state.payItemInfo.category == '142003') {

                    this.$root.showTip({
                        type: 'warning',
                        msg: '系统内置项目不能删除'
                    })

                    return;
                }

                // 记录要操作的工资项目列表
                store.actions.setPayItemIDs(this.selected);

                this.modalTitle = '删除工资项目';
            }
            if (type == 'import') {
                this.modalTitle = '导入工资项目';
            }
            if (type == 'export') {

                let fileName = '工资项目导出';
                let tableTitle = '工资项目名称,类别,类型,备注,修改人,修改时间';
                let tableID = 'itemName,category,valueType,des,changeName,changeTime';

                let params = `expType=item&fileName=${fileName}&titles=${tableTitle}&fields=${tableID}`

                this.$root.downloadFile('Pay/export', encodeURI(params))

                return;

            }

            this.modalShow = true;
            this.modalComponents = 'editPayItems';
            this.ctrltype = type;

        },
        searchPayItems(val) {
            this.searchParams.name = val;
            this.$refs.itemstable.refresh();
        }
    }
}
</script>
<style type="text/css" scoped>

.gridTable {
    top: 15px;
    right: 15px;
    bottom: 15px;
    left: 15px;
}
</style>
