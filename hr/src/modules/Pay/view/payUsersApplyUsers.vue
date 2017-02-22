<template>
    <div class="module-payUsersSub">
        <div class="date-search">
            <ul>
                <li><p>开始时间：</p>
                    <ui-datepicker format="yyyy/MM/dd" :time.sync="state.startTime" width="120px"></ui-datepicker>
                </li>
                <li><p>结束时间：</p>
                    <ui-datepicker format="yyyy/MM/dd" :time.sync="state.endTime" width="120px"></ui-datepicker>
                </li>
                <li>
                    <p>员工业务：</p>
                    <div class="input-inline input-medium " style="float: left;">
                        <select v-model="state.selectedInput" class="form-control">
                            <option value="">请选择</option>
                            <template v-for="item in state.optionList">
                                <option value="{{item.value+','+item.name}}" :selected="item.value==state.selectedInput">{{item.name}}
                                </option>
                            </template>
                        </select>

                        <!-- <v-select :options="state.optionList" :value.sync="state.selectedInput" :fluid="true" :multiple="true" placeholder="请选择">
                        </v-select> -->

                    </div>

                    <!--<v-select :value.sync="state.selectedInput">-->
                    <!--<v-option v-for="item in optionList" :value="item.value" :name="item.name" >{{item.name}}</v-option>-->
                    <!--</v-select>-->
                </li>
                <li>
                    <ui-button color="success " @click="goApplyUsersSearch()" style="margin-left: 10px;">查询</ui-button>
                </li>
            </ul>
        </div>
        <ui-grid v-ref:table :total.sync="total" class="dataTable"
                 :url="url"
                 :auto-load="false"
                 :fields.sync="fields"
                 :append-params="searchFor"
                 :selected.sync="selected"
                 :selected-data.sync="selectedData"
                 :reader="reader"
                 :btrefresh="true"
                 :perpage="30"
                 :pages="[10,20,30,50]"
                 selectable="multi"
                 height="auto"
                 tdheight="50px"
                 table-title="应用人员"  table-name="payUsersApplyUsersTable" :column-config="$root.columnConfig"
                 >
        </ui-grid>
    </div>
</template>
<script>
    import store from '../store'
    import Vue from 'vue'
    export default{
        data(){
            return {
                state: store.state,
                url: 'api.Pay.selectPayUsers',
                selected: [],
                selectedData: {},
                total: 0,
                searchFor: {
                    typ: 'y',
                    userName:''
                },
                reader: {
                    idProperty: 'id',
                    successProperty: 'success', // 成功
                    errmsgProperty: 'err_msg', // 失败提示
                    totalProperty: 'result.recordCount', // 数据总量
                    rootProperty: 'result.recordList', // 数据
                },
                fields: [
                    {
                        name: 'userNum',
                        title: '员工工号',
                    },
                    {
                        name: 'userName',
                        title: '姓名',
                        locked: 'first'
                    },
                    {
                        name: 'userBusiness',
                        title: '员工业务',
                        formater: function () {
                            var selectInputData=store.state.selectedInput.split(',');
                            return "<div>"+selectInputData[1]+"</div>";

                        }
                    },
                    {
                        name: 'startDate',
                        title: '生效日期',
                        formater: function (value, data, index) {
                            if (value) {
                                return Vue.Tool.iDate(value, 'yy-mm-dd hh:mm:ss').string;
                            } else {
                                return ''
                            }

                        }
                    },
                    {
                        name: 'organization',
                        title: '组织',
                    },
                ],
            }
        },
        watch: {
            'state.startTime'(){
                if (Vue.Tool.iDate(this.state.startTime).time > Vue.Tool.iDate(this.state.endTime).time) {
                    Vue.Tool.showTip({
                        type: 'danger',
                        msg: '开始时间大于结束时间',
                        duration: 2000
                    });
                    store.actions.resetCommitFlag(false);
                } else {
                    store.actions.resetCommitFlag(true);
                }
            },
            'state.endTime'(){
                if (Vue.Tool.iDate(this.state.startTime).time > Vue.Tool.iDate(this.state.endTime).time) {
                    Vue.Tool.showTip({
                        type: 'danger',
                        msg: '开始时间大于结束时间',
                        duration: 2000
                    });
                    store.actions.resetCommitFlag(false);
                } else {
                    store.actions.resetCommitFlag(true);
                }
            },
            'state.selectedInput'(){
                this.goApplyUsersSearch();
            }

        },
        events: {
            // 应用员工
            applyBtnFn(){
                store.actions.applyUsers(this.selectedData,()=>{
                    this.$refs.table.refresh();
                });
            },
            // 搁置员工
            shelveBtnFn(){
                store.actions.shelveUsers(this.selectedData,()=>{
                    this.$refs.table.refresh();
                });
            },
            loadPayUsersData(ID){
                var self = this;
                store.actions.setPayrangeID(ID);
                this.goApplyUsersSearch();
            }
        },
        methods: {
            goApplyUsersSearch(){
                // var self=this;
                if (store.actions.checkTimeOrSelect()) {
                    if (this.state.commitFlag) {
                        var selectInputData=this.state.selectedInput.split(',');
                        Object.assign(this.searchFor, {
                            startTime: (this.state.startTime.replace('/', '-')).replace('/', '-'),
                            endTime: (this.state.endTime.replace('/', '-')).replace('/', '-'),
                            userBusiness: selectInputData[0],
                            payrangeid: this.state.payRangeID,
                            userName:this.state.payUserSearch
                        })
                        this.$refs.table.refresh();
                    }
                }
            }
        },
        attached(){
            this.goApplyUsersSearch();
        }

    }
</script>
